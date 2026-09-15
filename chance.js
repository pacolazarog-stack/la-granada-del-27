(()=>{
  const $=s=>document.querySelector(s);
  const rand=n=>{
    if(window.crypto&&crypto.getRandomValues){const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%n}
    return Math.floor(Math.random()*n);
  };
  const perspectives=[
    {name:'1927',question:'¿Qué llegará a ser aquello que estamos viendo?'},
    {name:'2027',question:'¿Qué queda todavía de aquello que ocurrió?'},
    {name:'LA VEGA',question:'¿Qué permanece debajo de los dos tiempos?'}
  ];
  const rows=()=>window.GRANADA_STONE_ROWS||window.GRANADA_ROWS;
  const cell=(r,c)=>rows()[r-1].verses[c-1];
  const vTitle=c=>GRANADA_TITLES[c-1];
  const hTitle=r=>GRANADA_H_TITLES[r-1];
  const coord=(r,c)=>`(${String(r).padStart(2,'0')}, ${String(c).padStart(2,'0')})`;
  const side=(r,c)=>r===14&&c===14?'GOZNE':r===c?'DIAGONAL AUTORREFLEXIVA':r<c?'ESPEJO SUPERIOR':'ESPEJO INFERIOR';
  const meta=(r,c)=>`${coord(r,c)} · COLUMNA ${String(c).padStart(2,'0')} · ${vTitle(c)} · HORIZONTAL ${String(r).padStart(2,'0')} · ${hTitle(r)}`;
  const slotFx=new Audio('audio/slot-hit.mp3');
  slotFx.preload='auto';
  slotFx.volume=.48;

  let hit=null,stage=0,stages=[];

  function playSlotFx(){
    try{
      const fx=slotFx.cloneNode();
      fx.volume=slotFx.volume;
      fx.play().catch(()=>{});
    }catch(_){}
  }

  function buildStages(){
    const {r,c,p}=hit;
    const center=r===14&&c===14;
    const diagonal=r===c;
    if(center){
      stages=[{label:'GOZNE · 14 × 14',current:cell(14,14),pos:'LA VEGA ↔ BAJO LA CAL · centro, diagonal y bisagra temporal'}];
      return;
    }
    stages=[
      {label:`GOLPE · ${side(r,c)}`,current:cell(r,c),pos:`${meta(r,c)} · el azar ha caído en la piedra`},
      {label:diagonal?'ESPEJO · EL MISMO PUNTO':`REFLEJO · ${side(c,r)}`,current:cell(c,r),pos:diagonal?`${coord(r,c)} · r = c · el punto se refleja sobre sí mismo`:`${meta(c,r)} · reflejo de ${coord(r,c)}`},
      {label:`PUERTA · ${p.name}`,current:p.question,pos:'La perspectiva decide desde qué tiempo se contempla el par; no altera los versos.'},
      {label:'GOZNE · REFERENCIA AXIAL · 14 × 14',current:cell(14,14),pos:'LA VEGA ↔ BAJO LA CAL · el centro organiza el sistema, pero no es el destino obligatorio del golpe.'}
    ];
  }

  function paint(){
    if(!stages.length)return;
    stage=(stage+stages.length)%stages.length;
    const s=stages[stage];
    $('#chance-stage-label').textContent=s.label;
    $('#chance-current').textContent=s.current;
    $('#chance-pos').textContent=s.pos;
    $('#chance-seed').textContent=stages.length===1?'GOLPE: GOZNE · 14 × 14':`GOLPE: ${side(hit.r,hit.c)} ↔ ${side(hit.c,hit.r)} · perspectiva: ${hit.p.name} · ${stage+1}/${stages.length}`;
    $('#chance-prev').disabled=stages.length===1;
    $('#chance-next').disabled=stages.length===1;
  }

  function roll(){hit={r:rand(27)+1,c:rand(27)+1,p:perspectives[rand(3)]};stage=0;buildStages();paint()}

  $('#chance-roll')?.addEventListener('click',()=>{playSlotFx();roll()});
  $('#chance-prev')?.addEventListener('click',()=>{stage--;paint()});
  $('#chance-next')?.addEventListener('click',()=>{stage++;paint()});
  roll();

  const h=location.hash.slice(1);
  if(h==='chance'&&typeof mode==='function')mode('chance');
})();
