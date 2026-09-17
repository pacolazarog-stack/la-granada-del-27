(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;

  const isTextual=()=>{
    const canon=window.MIRAMAR_ACTIVE_CANON||localStorage.getItem('miramarCanonMode')||'';
    const media=document.documentElement.dataset.mediaMode||'';
    return canon==='textual'||media==='textual';
  };

  const style=document.createElement('style');
  style.id='miramar-textual-a5-style';
  style.textContent=`
    /* CANON TEXTUAL: libro A5, sólo texto. Sin escenografías aparejadas. */
    html[data-media-mode="textual"] body[data-book-id="miramar"] .miramar-mode-switch,
    html[data-media-mode="textual"] body[data-book-id="miramar"] .miramar-cover-choice,
    html[data-miramar-canon="textual"] body[data-book-id="miramar"] .miramar-mode-switch,
    html[data-miramar-canon="textual"] body[data-book-id="miramar"] .miramar-cover-choice,
    html[data-media-mode="textual"] body[data-book-id="miramar"] #miramarIllustration,
    html[data-miramar-canon="textual"] body[data-book-id="miramar"] #miramarIllustration{
      display:none!important;
    }

    html[data-media-mode="textual"] body[data-book-id="miramar"] .reader-page:not(.cover-mode),
    html[data-miramar-canon="textual"] body[data-book-id="miramar"] .reader-page:not(.cover-mode){
      width:min(92vw,620px,calc((100vh - 148px) * 148 / 210))!important;
      height:min(calc(100vh - 148px),880px,calc(92vw * 210 / 148))!important;
      aspect-ratio:148 / 210!important;
      display:block!important;
      overflow:auto!important;
      padding:42px 48px!important;
      background:var(--paper)!important;
      color:var(--ink)!important;
      box-shadow:0 18px 42px #0008!important;
    }

    html[data-media-mode="textual"] body[data-book-id="miramar"] #readerText,
    html[data-miramar-canon="textual"] body[data-book-id="miramar"] #readerText{
      width:100%!important;
      max-width:none!important;
      margin:0!important;
      background:transparent!important;
    }

    @media(max-width:760px){
      html[data-media-mode="textual"] body[data-book-id="miramar"] .reader-page:not(.cover-mode),
      html[data-miramar-canon="textual"] body[data-book-id="miramar"] .reader-page:not(.cover-mode){
        width:min(94vw,560px)!important;
        height:min(calc(100vh - 130px),calc(94vw * 210 / 148))!important;
        padding:28px 24px!important;
      }
    }
  `;
  document.head.appendChild(style);

  function enforce(){
    if(!isTextual())return;
    const page=document.querySelector('#readerPage');
    const figure=document.querySelector('#miramarIllustration');
    const switcher=document.querySelector('.miramar-mode-switch');
    const chooser=document.querySelector('.miramar-cover-choice');

    page?.classList.remove('miramar-illustrated-page','miramar-domestica-musical');
    if(page)delete page.dataset.domesticaScene;
    if(figure)figure.hidden=true;
    if(switcher)switcher.hidden=true;
    if(chooser)chooser.hidden=true;
    document.body.dataset.miramarMode='text';
    try{sessionStorage.setItem('miramarReaderMode','text');}catch(_){}
  }

  function releaseForMusical(){
    if(isTextual())return;
    const switcher=document.querySelector('.miramar-mode-switch');
    const chooser=document.querySelector('.miramar-cover-choice');
    if(switcher)switcher.hidden=false;
    if(chooser)chooser.hidden=false;
  }

  const sync=()=>{isTextual()?enforce():releaseForMusical();};
  document.addEventListener('book:state',()=>queueMicrotask(sync));
  document.addEventListener('volume:soundchange',()=>setTimeout(sync,0));
  document.addEventListener('volume:voicechange',()=>setTimeout(sync,0));
  document.addEventListener('miramar:modechange',()=>queueMicrotask(sync));
  new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['data-media-mode','data-miramar-canon']});
  new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['data-miramar-mode']});
  queueMicrotask(sync);
})();
