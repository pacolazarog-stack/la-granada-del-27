window.GRANADA_TITLES=["GRANADA, 1927", "EL RINCONCILLO", "DON MANUEL", "FEDERICO", "HERMENEGILDO", "MANUEL ÁNGELES", "LOS TÍTERES", "LA PUERTA DEL VINO", "ANTES DE SABERLO", "AGOSTO", "EL BARRANCO", "LA CIUDAD CALLÓ", "LA CASA CERRADA", "LA VEGA", "GRAN VÍA", "ALHAMBRA S. A.", "HABITACIÓN CON TURISTAS", "CIEN AÑOS", "GRANADA, 2027", "EL NUEVO RINCONCILLO", "GALLO VUELVE A CANTAR", "LOS OTROS", "LAS QUE FALTABAN", "CANCIÓN PARA QUIEN ACABA DE LLEGAR", "LA CIUDAD QUE TODAVÍA PUEDE SER", "QUE VUELVA A OCURRIR", "UN SIGLO DESPUÉS"];
window.GRANADA_ROWS=[];

(function(){
  const STYLE_ID='granada-telestico-style';
  const lastLetter=text=>{
    const m=String(text||'').match(/([A-Za-zÁÉÍÓÚÜÑáéíóúüñ])(?=[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]*$)/);
    return m?m[1]:'';
  };
  function installStyle(){
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .verticalreader .vline{
        display:grid!important;
        grid-template-columns:minmax(0,1fr) 1.45em;
        align-items:baseline;
        column-gap:14px;
        white-space:normal!important;
      }
      .verticalreader .vtext{
        min-width:0;
        white-space:nowrap;
      }
      .verticalreader .vtel{
        align-self:stretch;
        display:flex;
        align-items:baseline;
        justify-content:center;
        color:#8b2f2a;
        font-weight:600;
        border-left:1px solid rgba(139,47,42,.22);
        padding-left:10px;
      }
      @media(max-width:580px){
        .verticalreader .vline{grid-template-columns:minmax(0,1fr) 1.35em;column-gap:9px}
        .verticalreader .vtext{white-space:normal}
        .verticalreader .vtel{padding-left:7px}
      }
    `;
    document.head.appendChild(style);
  }
  function enhance(){
    const box=document.getElementById('vpoem');
    if(!box) return;
    box.querySelectorAll('.vline:not([data-tel-ready])').forEach(line=>{
      const text=line.textContent;
      const txt=document.createElement('span');
      txt.className='vtext';
      txt.textContent=text;
      const tel=document.createElement('span');
      tel.className='vtel';
      tel.setAttribute('aria-hidden','true');
      tel.textContent=lastLetter(text);
      line.textContent='';
      line.dataset.telReady='1';
      line.append(txt,tel);
    });
  }
  window.addEventListener('load',()=>{
    installStyle();
    enhance();
    const box=document.getElementById('vpoem');
    if(!box) return;
    const observer=new MutationObserver(()=>enhance());
    observer.observe(box,{childList:true,subtree:true});
  });
})();
