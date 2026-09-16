(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  if(window.MIRAMAR_ACTIVE_CANON!=='musical')return;
  if(!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;

  const i=27;
  if(typeof window.WORK_DATA.pages[i]==='string'){
    window.WORK_DATA.pages[i]=window.WORK_DATA.pages[i].replace(/^28 · ESCENA 28/,'28 · EH COMUNIDAD');
  }
  window.MIRAMAR_SCENE_TITLES={...(window.MIRAMAR_SCENE_TITLES||{}),28:'EH COMUNIDAD'};
})();
