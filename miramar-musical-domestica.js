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

  /* 01–09 usan las láminas canónicas completas; en pantalla se conserva sólo
     su mitad escenográfica. La tipografía y la caja textual ya son exactamente
     las mismas que en el resto del canon musical. */
  const DOMESTICA_CROP={1:206,2:227,3:203,4:207,5:208,6:208,7:234,8:213,9:229};

  const page=document.querySelector('#readerPage');
  const image=document.querySelector('#miramarIllustration .miramar-scene-image');
  if(!page||!image)return;

  let currentScene=null;
  const isMusical=()=>window.MIRAMAR_ACTIVE_CANON==='musical'||document.documentElement.dataset.mediaMode==='musical';

  function clear(){
    page.classList.remove('miramar-domestica-musical');
    delete page.dataset.domesticaScene;
    image.style.removeProperty('background-size');
    image.style.removeProperty('background-position');
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
    image.style.setProperty('background-size',`auto ${DOMESTICA_CROP[currentScene]||208}%`,'important');
    image.style.setProperty('background-position','top center','important');
    image.style.backgroundRepeat='no-repeat';
  }

  document.addEventListener('book:state',ev=>{
    if(ev.detail?.state==='text')queueMicrotask(()=>apply(ev.detail?.scene));
    else clear();
  });
  document.addEventListener('miramar:modechange',()=>queueMicrotask(()=>apply(currentScene)));
  new MutationObserver(()=>queueMicrotask(()=>apply(currentScene))).observe(document.documentElement,{attributes:true,attributeFilter:['data-media-mode','data-miramar-canon']});
})();