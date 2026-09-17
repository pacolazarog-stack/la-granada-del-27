(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  const isMusical=()=>window.MIRAMAR_ACTIVE_CANON==='musical';
  if(!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;
  window.__MIRAMAR_MUSICAL_FRONTMATTER_LOADED__=true;

  const MARKERS=['@@MUSICAL_PORTADA@@','@@MUSICAL_CREDITOS@@','@@MUSICAL_ESCENAS@@'];
  if(isMusical()){
    const already=MARKERS.every((m,i)=>String(window.WORK_DATA.pages[i]||'').trim()===m);
    if(!already&&window.WORK_DATA.pages.length>=30)window.WORK_DATA.pages.unshift(...MARKERS);
    window.WORK_DATA.subtitle='Tragicomedia multimedia · Canon musical · 30 escenas';
    window.MIRAMAR_CANON={
      ...(window.MIRAMAR_CANON||{}),
      version:'musical-2026-09-17-frontmatter-01-30',
      pages:window.WORK_DATA.pages.length,
      scenes:30,
      validated:true
    };
  }

  const SCENES=[
    '01 · MIRAMAR COMUNIDAD','02 · OK','03 · EL CUERPO','04 · CLAC','05 · NADIE',
    '06 · NACE EL CONFLICTO','07 · PRIMERA INCURSIÓN TERRESTRE','08 · TERRITORIO','09 · MAYORÍA SIMPLE','10 · VOTEN',
    '11 · SIEMPRE SE HA HECHO','12 · DERECHO','13 · BANDERA','14 · PROCLAMO','15 · ESTADO',
    '16 · EL VIENTO','17 · EL SOL','18 · CONFORME A DERECHO','19 · GARANTE','20 · MIRAMAR',
    '21 · INNOVAR','22 · SILENCIO','23 · ARCHIVO','24 · AUSENCIA','25 · QUIÉN MIRA A QUIÉN',
    '26 · CÓMO SEGUIMOS','27 · UMBRAL','28 · EH COMUNIDAD','29 · DIEZ MINUTOS','30 · FINAL'
  ];

  const style=document.createElement('style');
  style.id='miramar-musical-frontmatter-style';
  style.textContent=`
    html[data-media-mode="musical"] .reader-page.miramar-musical-frontmatter-page{
      width:min(620px,92vw,calc((100vh - 148px) * 148 / 210))!important;
      height:min(calc(100vh - 148px),880px,calc(92vw * 210 / 148))!important;
      aspect-ratio:148/210!important;display:block!important;overflow:auto!important;padding:0!important;
      background:#f4eee4!important;color:#211d19!important;box-shadow:0 18px 42px #0008!important;
    }
    html[data-media-mode="musical"] .reader-page.miramar-musical-frontmatter-page #readerText{
      width:100%!important;height:100%!important;max-width:none!important;margin:0!important;padding:0!important;
      background:transparent!important;white-space:normal!important;overflow:visible!important;
      font-family:Georgia,'Times New Roman',serif!important;color:#211d19!important;
    }
    .miramar-musical-front{min-height:100%;box-sizing:border-box;padding:42px 46px;display:flex;flex-direction:column}
    .miramar-musical-front.cover{justify-content:center;text-align:center;background:linear-gradient(180deg,#657688 0 37%,#314c59 37% 55%,#262b25 55% 67%,#15120f 67%);color:#f7f0e6}
    .miramar-musical-front .kicker{font-size:10px;letter-spacing:.19em;text-transform:uppercase;font-weight:700;opacity:.8;margin-bottom:22px}
    .miramar-musical-front.cover h1{font-size:42px;line-height:.94;font-weight:400;letter-spacing:.02em;margin:0}
    .miramar-musical-front.cover h1 span{display:block;font-size:.62em;margin-top:.22em}
    .miramar-musical-front.cover .subtitle{margin:34px auto 28px;padding:9px 13px;background:#17242bd9;border-radius:4px;font-size:13px;letter-spacing:.2em;font-weight:700}
    .miramar-musical-front.cover .tag{font-size:15px;line-height:1.5;font-style:italic;margin:0 auto 36px}
    .miramar-flag-btn{display:inline-block;border:1px solid currentColor;border-radius:999px;padding:7px 16px;color:inherit;text-decoration:none;font-size:11px;letter-spacing:.12em;font-weight:400;background:transparent;text-transform:none!important}
    .miramar-musical-front.credits h2,.miramar-musical-front.scenes h2{font-size:27px;font-weight:400;letter-spacing:.04em;margin:0 0 26px;padding-bottom:13px;border-bottom:1px solid #b9aa98}
    .miramar-credit-row{margin:0 0 24px;font-size:14px;line-height:1.55}
    .miramar-credit-label{display:block;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:#806f60;font-weight:700;margin-bottom:7px}
    .miramar-musical-front.credits .miramar-flag-btn{color:#211d19;border-color:#9b8978;background:#fff8ef}
    .miramar-scenes-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:24px;row-gap:0;border-top:1px solid #d5c8bb;padding-top:12px}
    .miramar-scene-index-item{font-size:10.5px;line-height:1.26;padding:4px 0;border-bottom:1px solid #e3d9cf}
    .miramar-front-footer{margin-top:auto;padding-top:20px;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:#806f60;text-align:center}
    @media(max-width:760px){
      html[data-media-mode="musical"] .reader-page.miramar-musical-frontmatter-page{width:min(94vw,560px)!important;height:min(calc(100vh - 130px),calc(94vw * 210 / 148))!important}
      .miramar-musical-front{padding:30px 28px}.miramar-musical-front.cover h1{font-size:34px}.miramar-scenes-grid{column-gap:16px}.miramar-scene-index-item{font-size:9.5px}
    }
  `;
  document.head.appendChild(style);

  function flagButton(){
    const a=document.createElement('a');
    a.href='autor.html';a.className='miramar-flag-btn';a.textContent='flag';a.setAttribute('aria-label','flag');
    return a;
  }

  function renderFront(marker){
    const text=document.querySelector('#readerText');
    const page=document.querySelector('#readerPage');
    const figure=document.querySelector('#miramarIllustration');
    if(!text||!page||text.hidden)return;
    page.classList.remove('miramar-illustrated-page','miramar-domestica-musical');
    page.classList.add('miramar-musical-frontmatter-page');
    if(figure)figure.hidden=true;
    text.replaceChildren();text.className='reader-text';

    const wrap=document.createElement('div');
    if(marker===MARKERS[0]){
      wrap.className='miramar-musical-front cover';
      const kicker=document.createElement('div');kicker.className='kicker';kicker.textContent='MIRAMAR · 2026 · CANON MUSICAL';
      const h1=document.createElement('h1');h1.innerHTML='LA TERRAZA<span>DEL MIRAMAR</span>';
      const sub=document.createElement('div');sub.className='subtitle';sub.textContent='TRAGICOMEDIA MULTIMEDIA';
      const tag=document.createElement('div');tag.className='tag';tag.innerHTML='El suelo conoce la linde.<br>La mirada no sabe nada.';
      const author=document.createElement('div');author.appendChild(flagButton());
      const foot=document.createElement('div');foot.className='miramar-front-footer';foot.textContent='VERSIÓN MUSICAL · 30 ESCENAS';
      wrap.append(kicker,h1,sub,tag,author,foot);
    }else if(marker===MARKERS[1]){
      wrap.className='miramar-musical-front credits';
      const h2=document.createElement('h2');h2.textContent='CRÉDITOS';
      const row1=document.createElement('div');row1.className='miramar-credit-row';
      const lab1=document.createElement('span');lab1.className='miramar-credit-label';lab1.textContent='Texto dramático · concepción escénica · partitura dramatúrgica';
      row1.append(lab1,flagButton());
      const row2=document.createElement('div');row2.className='miramar-credit-row';
      const lab2=document.createElement('span');lab2.className='miramar-credit-label';lab2.textContent='Edición';
      row2.append(lab2,document.createTextNode('Versión musical y multimedia · Granada · 2026'));
      const row3=document.createElement('div');row3.className='miramar-credit-row';
      const lab3=document.createElement('span');lab3.className='miramar-credit-label';lab3.textContent='Canon';
      row3.append(lab3,document.createTextNode('30 escenas · texto, imagen y música sincronizados'));
      const foot=document.createElement('div');foot.className='miramar-front-footer';foot.textContent='LA TERRAZA DEL MIRAMAR · CANON MUSICAL';
      wrap.append(h2,row1,row2,row3,foot);
    }else{
      wrap.className='miramar-musical-front scenes';
      const h2=document.createElement('h2');h2.textContent='ESCENAS';
      const grid=document.createElement('div');grid.className='miramar-scenes-grid';
      SCENES.forEach(label=>{const d=document.createElement('div');d.className='miramar-scene-index-item';d.textContent=label;grid.appendChild(d);});
      const foot=document.createElement('div');foot.className='miramar-front-footer';foot.textContent='30 ESCENAS · CANON MUSICAL';
      wrap.append(h2,grid,foot);
    }
    text.appendChild(wrap);
  }

  function replaceAuthorName(root){
    if(!root)return;
    const re=/Francisco Javier L[aá]zaro Guil/gi;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()){
      re.lastIndex=0;
      if(re.test(walker.currentNode.nodeValue||''))nodes.push(walker.currentNode);
    }
    nodes.forEach(node=>{
      const value=node.nodeValue||'';const frag=document.createDocumentFragment();let last=0;
      value.replace(re,(m,offset)=>{
        if(offset>last)frag.appendChild(document.createTextNode(value.slice(last,offset)));
        frag.appendChild(flagButton());last=offset+m.length;return m;
      });
      if(last<value.length)frag.appendChild(document.createTextNode(value.slice(last)));
      node.parentNode?.replaceChild(frag,node);
    });
  }

  function normalizeExistingFlag(root){
    root?.querySelectorAll?.('.miramar-flag-btn,.cover-author').forEach(a=>{a.textContent='flag';a.setAttribute('aria-label','flag');});
  }

  document.addEventListener('book:state',ev=>{
    const text=document.querySelector('#readerText');
    const page=document.querySelector('#readerPage');
    if(ev.detail?.state!=='text'){
      if(!isMusical())page?.classList.remove('miramar-musical-frontmatter-page');
      setTimeout(()=>{normalizeExistingFlag(document);replaceAuthorName(document.querySelector('#readerCover'));replaceAuthorName(document.querySelector('#readerBack'));},0);
      return;
    }
    const raw=String(text?.textContent||'').trim();
    const marker=isMusical()&&MARKERS.includes(raw)?raw:null;
    setTimeout(()=>{
      if(marker)renderFront(marker);else page?.classList.remove('miramar-musical-frontmatter-page');
      replaceAuthorName(text);normalizeExistingFlag(document);
    },0);
  });

  const observer=new MutationObserver(()=>{
    const text=document.querySelector('#readerText');
    replaceAuthorName(text);normalizeExistingFlag(document);
  });
  const textRoot=document.querySelector('#readerText');
  if(textRoot)observer.observe(textRoot,{childList:true,subtree:true,characterData:true});
  setTimeout(()=>{replaceAuthorName(textRoot);normalizeExistingFlag(document);},0);
})();
