window.GRANADA_TITLES=["GRANADA, 1927","EL RINCONCILLO","DON MANUEL","FEDERICO","HERMENEGILDO","MANUEL ÁNGELES","LOS TÍTERES","LA PUERTA DEL VINO","ANTES DE SABERLO","AGOSTO","EL BARRANCO","LA CIUDAD CALLÓ","LA CASA CERRADA","LA VEGA","GRAN VÍA","ALHAMBRA S. A.","HABITACIÓN CON TURISTAS","CIEN AÑOS","GRANADA, 2027","EL NUEVO RINCONCILLO","GALLO VUELVE A CANTAR","LOS OTROS","LAS QUE FALTABAN","CANCIÓN PARA QUIEN ACABA DE LLEGAR","LA CIUDAD QUE TODAVÍA PUEDE SER","QUE VUELVA A OCURRIR","UN SIGLO DESPUÉS"];
window.GRANADA_ROWS=[];

(function(){
  const STYLE_ID='granada-reading-refine-v11';
  function installStyle(){
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      /* VERTICAL · teléstico claramente legible */
      .verticalreader .vsheet{
        width:min(860px,100%)!important;
        padding-left:clamp(34px,4.6vw,68px)!important;
        padding-right:clamp(34px,4.6vw,68px)!important;
      }
      .verticalreader .vpoem-grid{
        grid-template-columns:minmax(0,1fr) 64px!important;
        column-gap:26px!important;
        align-items:start!important;
      }
      .verticalreader .vpoem{
        gap:5px!important;
      }
      .verticalreader .vline{
        font-size:clamp(14px,1.18vw,18px)!important;
        line-height:1.36!important;
        white-space:nowrap!important;
      }
      .verticalreader .vtelcol{
        display:grid!important;
        gap:5px!important;
        border-left:1px solid rgba(139,47,42,.55)!important;
        background:transparent!important;
        padding:0 0 0 18px!important;
        min-width:64px!important;
      }
      .verticalreader .vtelrow{
        font-size:clamp(15px,1.24vw,19px)!important;
        line-height:1.36!important;
        height:1.36em!important;
        display:flex!important;
        align-items:baseline!important;
        justify-content:center!important;
        color:#7c211d!important;
        font-weight:700!important;
        letter-spacing:.08em!important;
        text-transform:uppercase!important;
      }

      /* RADIAL · doble página editorial */
      .radial{
        padding:clamp(28px,4vw,58px)!important;
        background:radial-gradient(circle at 50% 34%,rgba(142,106,72,.08),transparent 38%),#100f0d!important;
      }
      .radial-stage{
        width:min(1260px,96%)!important;
        min-width:820px!important;
        margin:0 auto!important;
        display:grid!important;
        grid-template-columns:1fr 1fr!important;
        gap:0!important;
        align-items:stretch!important;
        position:relative!important;
        background:var(--paper)!important;
        box-shadow:0 24px 58px rgba(0,0,0,.42)!important;
      }
      .radial-stage::after{
        content:"";
        position:absolute;
        top:0;bottom:0;left:50%;
        width:18px;
        transform:translateX(-50%);
        pointer-events:none;
        background:linear-gradient(90deg,rgba(65,50,38,.06),rgba(0,0,0,.12) 48%,rgba(255,255,255,.10) 52%,rgba(65,50,38,.04));
      }
      .radial .rpoem{
        background:var(--paper)!important;
        color:var(--ink)!important;
        box-shadow:none!important;
        min-height:720px!important;
        padding:clamp(46px,4.8vw,70px) clamp(42px,4.3vw,64px)!important;
        display:block!important;
      }
      .radial .rpoem:first-child{
        border-right:1px solid rgba(80,62,48,.16)!important;
      }
      .radial .rline{
        font-size:clamp(18px,1.32vw,22px)!important;
        line-height:1.52!important;
        margin:0 0 .72em!important;
        letter-spacing:-.006em!important;
      }
      .radial .rline:first-child{
        font-size:clamp(20px,1.48vw,24px)!important;
        line-height:1.44!important;
        text-align:left!important;
        margin:0 0 1.55em!important;
        padding:0 0 1.25em!important;
        border-bottom:1px solid rgba(80,62,48,.20)!important;
      }

      @media(max-width:900px){
        .verticalreader .vpoem-grid{grid-template-columns:minmax(0,1fr) 54px!important;column-gap:18px!important}
        .verticalreader .vtelcol{min-width:54px!important;padding-left:13px!important}
        .radial-stage{min-width:760px!important}
        .radial .rpoem{padding:40px 34px!important}
      }
      @media(max-width:580px){
        .verticalreader .vsheet{padding-left:20px!important;padding-right:20px!important}
        .verticalreader .vpoem-grid{grid-template-columns:minmax(0,1fr) 42px!important;column-gap:10px!important}
        .verticalreader .vline{white-space:normal!important}
        .verticalreader .vtelcol{min-width:42px!important;padding-left:8px!important}
        .verticalreader .vtelrow{font-size:13px!important}
        .radial{padding:12px!important}
        .radial-stage{min-width:700px!important}
        .radial .rpoem{padding:34px 28px!important}
        .radial .rline{font-size:18px!important}
      }
    `;
    document.head.appendChild(style);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',installStyle,{once:true});
  else installStyle();
})();
