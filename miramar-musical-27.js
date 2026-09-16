(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  if(window.MIRAMAR_ACTIVE_CANON!=='musical')return;
  if(!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;

  const scene=`27 · UMBRAL

mar ram`;

  if(window.WORK_DATA.pages.length===26)window.WORK_DATA.pages.push(scene);
  else if(window.WORK_DATA.pages.length<27)window.WORK_DATA.pages[26]=scene;

  window.WORK_DATA.subtitle='Tragicomedia multimedia · Canon musical · escenas 01–27';
  window.MIRAMAR_SCENE_TITLES={...(window.MIRAMAR_SCENE_TITLES||{}),27:'UMBRAL'};
  window.MIRAMAR_CANON={version:'musical-2026-09-16-01-27',pages:27,validated:true};
})();
