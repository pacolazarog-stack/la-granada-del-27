(async()=>{
  async function decodeWork(){
    const b64=window.WORK_B64||'';
    if(!b64) throw new Error('No hay datos de obra');
    const bin=atob(b64);
    const bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i);
    if(typeof DecompressionStream==='undefined') throw new Error('Este navegador no admite la descompresión necesaria.');
    const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    const text=await new Response(stream).text();
    return JSON.parse(text);
  }
  const $=s=>document.querySelector(s);
  try{
    const data=await decodeWork();
    let page=0;
    const text=$('#readerText'), progress=$('#readerProgress'), jump=$('#readerJump');
    const title=$('#readerWork'), sub=$('#readerSub');
    title.textContent=data.title||''; sub.textContent=data.subtitle||data.author||'';
    jump.max=data.pages.length;
    function render(){
      page=Math.max(0,Math.min(data.pages.length-1,page));
      text.textContent=data.pages[page]||'';
      $('#readerPage').scrollTop=0;
      progress.textContent=`${page+1} / ${data.pages.length}`;
      jump.value=page+1;
      $('#readerPrev').disabled=page===0;
      $('#readerNext').disabled=page===data.pages.length-1;
      history.replaceState(null,'',`#p${page+1}`);
    }
    $('#readerPrev').onclick=()=>{page--;render()};
    $('#readerNext').onclick=()=>{page++;render()};
    jump.onchange=()=>{const n=parseInt(jump.value,10);if(Number.isFinite(n)){page=n-1;render()}};
    $('#readerFull').onclick=()=>!document.fullscreenElement?document.documentElement.requestFullscreen?.():document.exitFullscreen?.();
    addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){page--;render()}else if(e.key==='ArrowRight'){page++;render()}else if(e.key==='Home'){page=0;render()}else if(e.key==='End'){page=data.pages.length-1;render()}});
    const m=location.hash.match(/^#p(\d+)$/); if(m) page=parseInt(m[1],10)-1;
    render();
  }catch(err){
    $('#readerText').textContent='No se ha podido cargar esta obra.\n\n'+err.message;
    $('#readerProgress').textContent='';
  }
})();
