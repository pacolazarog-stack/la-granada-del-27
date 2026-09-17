(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;

  const DOMESTICA_IMAGES={
    1:'https://d2jqrm6oza8nb6.cloudfront.net/datasets/0ccb1d11-2cd3-4020-af49-50ae093a4428.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNWFmZTAwZmVlNDFlNGIyMSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTc3MDIzOH0.hp83r3yhMSYW207JsY0fHarSDbbnF3Ebk7jR-3x14uU',
    2:'https://d2jqrm6oza8nb6.cloudfront.net/datasets/b42443bc-927e-4bb4-ade3-0a16ce29c806.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMTJmNGQ0NjkyMjg0OTc5OCIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTc3MjY0OX0.7pDfdZSDyH6iT791jblSBJvlROyv_3akLVwVUoKOr3k',
    3:'https://d2jqrm6oza8nb6.cloudfront.net/datasets/65c1cee2-61de-4a06-af98-74ae50cbacd2.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYTRlYmVkOTYxYThhMWQ1YSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTc0MTIwNn0.2yI7fL-Kac83-G2LMLcr6luFHoMFg0lrP1QMYSFv1Hs',
    4:'https://d2jqrm6oza8nb6.cloudfront.net/datasets/3933f5da-a214-4aba-b0b0-8c05f7afcc7a.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNDZmN2ZjMGRiYzQ2ZTY5NiIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTc1NDYzN30.yWR4fGyBPufG0Lb-tZUtASzf0s2_nm0YtBIA_uQaO3U',
    5:'https://d2jqrm6oza8nb6.cloudfront.net/datasets/a00e2860-3b01-4d4d-92c5-6e58e85470a6.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMzhiODVjZWY3Njc0NmEyOSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTc3MjkxMX0.fgHYwIzlR-pFYOw71Q90FTzr704Z4f9Mgin699vA9AM',
    6:'https://d2jqrm6oza8nb6.cloudfront.net/datasets/2a26c338-da98-43f8-8b60-ec77b3d3db2b.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMWNjZmIyY2U4ZmI1ODYzOCIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTc0MTc3NH0.s6QqigRBJjNQzfxJqj63LH6SBjzOxJsDe_ji-Zp7kM4',
    7:'https://d2jqrm6oza8nb6.cloudfront.net/datasets/80e2b81c-e909-4081-b280-b63dab411328.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMTViNDk1MzY0NmE1YzBiMiIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTc1NjIxNH0.4ps48MCod-63lFEkZMCRUolU_7VCa3e8EiiFQIVxzu8',
    8:'https://d2jqrm6oza8nb6.cloudfront.net/datasets/50f0303e-10c1-4213-b3ae-d5571d2c7616.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZjIxMzA2MGEzNjk0YTk5NCIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTcwNDIwMn0.uOYzBOx-VHR9RugR3XcLgfjyK-eCFdDjeawfkFyXgX4',
    9:'https://d2jqrm6oza8nb6.cloudfront.net/datasets/4ee6b771-0a9b-42a9-9626-80643c204edd.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYjNjYTc0MjJkYWMxM2QwZSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4OTc2ODg2Nn0.Rfym_bnUdzvmDwiqD_dmwmXqfCVFU4WU-PvVrxnU9Qk'
  };

  const page=document.querySelector('#readerPage');
  const figure=document.querySelector('#miramarIllustration');
  const image=document.querySelector('#miramarIllustration .miramar-scene-image');
  const text=document.querySelector('#readerText');
  if(!page||!figure||!image||!text)return;

  let currentScene=null;
  const isMusical=()=>window.MIRAMAR_ACTIVE_CANON==='musical'||document.documentElement.dataset.mediaMode==='musical';

  const style=document.createElement('style');
  style.id='miramar-musical-domestica-style';
  style.textContent=`
    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-illustrated-page.miramar-domestica-musical{
      width:min(94vw,calc(82vh * .7070707),820px)!important;
      height:auto!important;
      min-height:0!important;
      aspect-ratio:210/297;
      padding:0!important;
      display:grid!important;
      grid-template-columns:1fr!important;
      grid-template-rows:1fr 1fr!important;
      overflow:hidden!important;
      transform:none!important;
      background:#f7f1e8!important;
      box-shadow:0 18px 48px rgba(0,0,0,.34);
    }
    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-domestica-musical .miramar-illustration{
      grid-column:1!important;
      grid-row:1!important;
      width:100%!important;
      height:100%!important;
      min-width:0!important;
      min-height:0!important;
      padding:0!important;
      margin:0!important;
      display:flex!important;
      background:#090c10!important;
      overflow:hidden!important;
    }
    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-domestica-musical .miramar-scene-image{
      width:100%!important;
      height:100%!important;
      max-width:none!important;
      aspect-ratio:auto!important;
      background-size:100% auto!important;
      background-position:top center!important;
      background-repeat:no-repeat!important;
      box-shadow:none!important;
    }
    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-domestica-musical .miramar-scene-caption{display:none!important}
    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-domestica-musical .reader-text{
      grid-column:1!important;
      grid-row:2!important;
      width:100%!important;
      height:100%!important;
      max-height:none!important;
      overflow:hidden!important;
      box-sizing:border-box!important;
      padding:17px 26px 15px!important;
      margin:0!important;
      background:#f7f1e8!important;
      color:#211b17!important;
    }
    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-domestica-musical #readerText.miramar-script.miramar-musical-script{
      max-width:none!important;
      padding-top:0!important;
      font-size:clamp(8.2px,.74vw,10.8px)!important;
      line-height:1.24!important;
      font-family:Georgia,'Times New Roman',serif!important;
    }
    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-domestica-musical .miramar-script-line{
      margin:.13em 0!important;
      min-height:0!important;
      color:#211b17!important;
    }
    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-domestica-musical .miramar-script-line.rhythm{
      margin:.42em 0!important;
      color:#211b17!important;
      font-size:.94em!important;
      font-style:italic!important;
      letter-spacing:.025em!important;
      word-spacing:.04em!important;
    }
    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-domestica-musical .miramar-script-line.impact{
      margin:.38em 0!important;
      color:#211b17!important;
      letter-spacing:.04em!important;
    }
    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-domestica-musical[data-domestica-scene="7"] #readerText.miramar-script{
      font-size:clamp(7.1px,.63vw,9.3px)!important;
      line-height:1.17!important;
    }
    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-domestica-musical[data-domestica-scene="7"] .miramar-script-body{
      column-count:2;
      column-gap:24px;
      column-rule:1px solid rgba(44,35,29,.16);
    }
    html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-domestica-musical[data-domestica-scene="9"] #readerText.miramar-script{
      font-size:clamp(7.6px,.67vw,9.7px)!important;
      line-height:1.19!important;
    }
    @media(max-width:900px){
      html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-illustrated-page.miramar-domestica-musical{
        width:min(96vw,calc(84vh * .7070707))!important;
        height:auto!important;
        display:grid!important;
        grid-template-columns:1fr!important;
        grid-template-rows:1fr 1fr!important;
        overflow:hidden!important;
      }
      html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-domestica-musical .miramar-illustration,
      html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-domestica-musical .reader-text{
        width:100%!important;
        height:100%!important;
        flex:none!important;
      }
      html[data-media-mode="musical"] body[data-miramar-mode="illustrated"] .reader-page.miramar-domestica-musical .reader-text{padding:12px 17px 10px!important}
    }
  `;
  document.head.appendChild(style);

  function clear(){
    page.classList.remove('miramar-domestica-musical');
    delete page.dataset.domesticaScene;
  }

  function apply(scene){
    const n=Number(scene);
    currentScene=Number.isInteger(n)?n:currentScene;
    if(!isMusical()||!Number.isInteger(currentScene)||currentScene<1||currentScene>9||!DOMESTICA_IMAGES[currentScene]){
      clear();
      return;
    }
    page.classList.add('miramar-domestica-musical');
    page.dataset.domesticaScene=String(currentScene);
    image.style.backgroundImage=`url("${DOMESTICA_IMAGES[currentScene]}")`;
    image.style.backgroundSize='100% auto';
    image.style.backgroundPosition='top center';
    image.style.backgroundRepeat='no-repeat';
  }

  document.addEventListener('book:state',ev=>{
    if(ev.detail?.state==='text')queueMicrotask(()=>apply(ev.detail?.scene));
    else clear();
  });
  document.addEventListener('miramar:modechange',()=>queueMicrotask(()=>apply(currentScene)));
  new MutationObserver(()=>queueMicrotask(()=>apply(currentScene))).observe(document.documentElement,{attributes:true,attributeFilter:['data-media-mode','data-miramar-canon']});
})();
