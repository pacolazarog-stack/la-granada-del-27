(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  const re=/Francisco Javier L[aá]zaro Guil/gi;
  const pages=window.MIRAMAR_SPOKEN_PAGES;
  if(pages&&typeof pages==='object'){
    Object.keys(pages).forEach(k=>{
      if(typeof pages[k]==='string')pages[k]=pages[k].replace(re,'flag');
    });
  }
})();
