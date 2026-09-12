(()=>{
  function cleanBranch(el, verses){
    [...el.querySelectorAll('.rrow')].forEach(n=>n.remove());
    verses.forEach(z=>{
      const d=document.createElement('div');
      d.className='rrow radial-poem-row';
      const t=document.createElement('div');
      t.className='rtext';
      t.textContent=z;
      d.appendChild(t);
      el.appendChild(d);
    });
  }

  window.radial=function(){
    const v=GRANADA_ROWS[13].verses;
    cleanBranch($('#rl'),[v[13],...v.slice(0,13).reverse()]);
    cleanBranch($('#rr'),[v[13],...v.slice(14)]);
  };

  if(!$('#radial').classList.contains('hidden')) window.radial();
})();
