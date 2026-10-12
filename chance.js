(()=>{
  const $=s=>document.querySelector(s),C=window.GRANADA_CUBE_27;
  if(!C)return;
  const rand=n=>{
    if(window.crypto&&crypto.getRandomValues){const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%n}
    return Math.floor(Math.random()*n);
  };
  const soundEnabled=()=>window.VOLUME_AUDIO?window.VOLUME_AUDIO.isEnabled():localStorage.getItem('volumeSoundMode')!=='off';
  const rows=()=>window.GRANADA_STONE_ROWS||window.GRANADA_ROWS;
  const cell=(r,c)=>rows()[r-1].verses[c-1];
  const vTitle=c=>GRANADA_TITLES[c-1];
  const hTitle=r=>GRANADA_H_TITLES[r-1];
  const coord2=(r,c)=>`(${String(r).padStart(2,'0')}, ${String(c).padStart(2,'0')})`;
  const coord3=p=>`(${String(p.x).padStart(2,'0')}, ${String(p.y).padStart(2,'0')}, ${String(p.z).padStart(2,'0')})`;
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>c==='&'?'&amp;':c==='<'?'&lt;':c==='>'?'&gt;':'&quot;');
  const slotFx=new Audio('audio/slot-hit.mp3');slotFx.preload='auto';slotFx.volume=.14;

  let hit=null,focus=0,lines=[],reward=null,rewardToken=0;

  function playSlotFx(){
    if(!soundEnabled())return;
    try{const fx=slotFx.cloneNode();fx.volume=.14;fx.playbackRate=1.12;fx.play().then(()=>setTimeout(()=>{try{fx.pause();fx.currentTime=0}catch(_){}},125)).catch(()=>{});}catch(_){}
  }
  const lineMeta=(kind,h,p,m)=>{
    if(kind==='X')return `${coord3(h)} · POSICIÓN ELEGIDA · k=${m.k} · celda XY ${coord2(h.x,h.y)} · ${C.countryAtIndex(h.x)} / ${C.countryAtIndex(h.y)} · H${String(h.x).padStart(2,'0')} ${hTitle(h.x)} × P${String(h.y).padStart(2,'0')} ${vTitle(h.y)}`;
    if(kind==='Y'){
      const mp=C.mirrorPoint(h);
      return `${coord2(h.y,h.x)} · ESPEJO DE LA CELDA XY · espejo XYZ ${coord3(mp)} · ${C.countryAtIndex(h.y)} / ${C.countryAtIndex(h.x)} · H${String(h.y).padStart(2,'0')} ${hTitle(h.y)} × P${String(h.x).padStart(2,'0')} ${vTitle(h.x)}`;
    }
    if(kind==='CENTRO')return '(14, 14, 14) · CENTRO ABSOLUTO · ESPAÑA · LA VEGA · «Late bajo la cal la acequia hundida.»';
    return `Z=${String(h.z).padStart(2,'0')} · PROFUNDIDAD · TRAZA POEMA · ${p.country} ↔ ${p.mirrorCountry} · proyección (${p.x}, ${p.y})`;
  };
  function buildLines(){
    const p=C.poemPoint(hit.z),m=C.cubeMeta(hit.x,hit.y,hit.z);
    lines=[
      {key:'X',text:cell(hit.x,hit.y)},
      {key:'Y',text:cell(hit.y,hit.x)},
      {key:'CENTRO',text:cell(14,14)},
      {key:'Z',text:cell(p.x,p.y)}
    ].map(x=>({...x,meta:lineMeta(x.key,hit,p,m)}));
  }
  function paint(){
    const m=C.cubeMeta(hit.x,hit.y,hit.z),current=$('#chance-current');if(!current)return;
    current.innerHTML=lines.map((l,i)=>`<div class="chance-line${i===focus?' active':''}" data-key="${l.key}"><span class="chance-line-key">${l.key}</span><span>${esc(l.text)}</span></div>`).join('');
    $('#chance-stage-label').textContent='AZAR⁴ · ATRAVESAR EL CUBO · X → Y → CENTRO → Z';
    $('#chance-pos').textContent=lines[focus]?.meta||'';
    const lang=reward?.lang,mp=C.mirrorPoint(hit);
    $('#chance-seed').textContent=`27³ · ${coord3(hit)} · k=${m.k} · M=${coord3(mp)}${lang?` · ${lang.name}`:''}`;
    $('#chance-prev').disabled=false;$('#chance-next').disabled=false;
    const box=$('#chance-language');
    if(box){
      if(!reward)box.innerHTML='<span class="chance-language-wait">Buscando una segunda vida sonora para Z dentro del mismo recorrido…</span>';
      else{
        const txt=reward.translation||lines[3].text;
        const status=reward.translation?'versión traducida disponible':'capa sonora · original conservado';
        box.innerHTML=`<div class="chance-language-head"><strong>${esc(lang.name)}</strong><span>${esc(lang.code.toUpperCase())} · ${status}</span></div><div class="chance-language-text">${esc(txt)}</div><div class="chance-language-foot">recompensa azarosa: musicalidad 50 % · semántica 20 % · semiótica 15 % · afinidad 10 % · extrañeza 5 %</div>`;
      }
    }
  }
  async function rewardLanguage(){
    const token=++rewardToken,p=C.poemPoint(hit.z),m=C.cubeMeta(hit.x,hit.y,hit.z);
    reward=null;paint();
    const r=await C.chooseLanguageReward(lines[3].text,{...m,trace:p});
    if(token!==rewardToken)return;reward=r;paint();
  }
  function roll(){hit={x:rand(27)+1,y:rand(27)+1,z:rand(27)+1};focus=0;buildLines();rewardLanguage();paint();}
  function listen(){
    if(!reward)return;
    const text=reward.translation||lines[3].text;
    C.speak(text,reward.lang);
  }

  $('#chance-roll')?.addEventListener('click',()=>{playSlotFx();roll();});
  $('#chance-prev')?.addEventListener('click',()=>{focus=(focus+3)%4;paint();});
  $('#chance-next')?.addEventListener('click',()=>{focus=(focus+1)%4;paint();});
  $('#chance-listen')?.addEventListener('click',listen);
  roll();

  const baseMode=window.mode;
  if(typeof baseMode==='function')window.mode=function(id){baseMode(id);document.dispatchEvent(new CustomEvent('view:mode',{detail:{id}}));};
  const h=location.hash.slice(1);if(h==='chance'&&typeof window.mode==='function')window.mode('chance');
})();
