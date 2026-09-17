(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  if(window.MIRAMAR_ACTIVE_CANON!=='musical')return;
  if(!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;

  /* Versión musical vigente: se retiran de la lectura las 16 primeras páginas.
     Se conservan intactos los archivos fuente para poder revertir o reutilizar el material. */
  if(window.WORK_DATA.pages.length>=30){
    window.WORK_DATA.pages=window.WORK_DATA.pages.slice(16);
  }

  window.WORK_DATA.subtitle='Tragicomedia multimedia · Canon musical · escenas 17–30';
  window.MIRAMAR_CANON={
    version:'musical-2026-09-17-17-30',
    pages:window.WORK_DATA.pages.length,
    validated:true
  };

  const m=location.hash.match(/^#p(\d+)$/);
  if(m&&Number(m[1])>window.WORK_DATA.pages.length){
    history.replaceState(null,'','#p1');
  }
})();
