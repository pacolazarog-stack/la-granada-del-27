/* LIBRO VERTICAL · restauración canónica de la matriz profunda.
   VERTICAL vuelve a leer las 27 columnas de la matriz 27×27 y esas mismas
   27 piezas reaparecen dentro de LIBRO antes de los horizontales.
   Los títulos verticales son propios de la matriz y NO repiten los títulos
   literarios de los 27 poemas de superficie.
*/
(()=>{
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>c==='&'?'&amp;':c==='<'?'&lt;':c==='>'?'&gt;':'&quot;');
  const rows=()=>window.GRANADA_STONE_ROWS||window.GRANADA_ROWS||[];
  const VERTICAL_TITLES=[
    'SIETE ALBORADAS',
    'DOS VOCES LABRAN',
    'LA GRANADA FALLA',
    'EN LORCA GRANADA',
    'DE LANZ GRANADAS',
    'ARISTAS DE ORTIZ',
    'DANZAN LOS HILOS',
    'ABRE OTRO TIEMPO',
    'NADIE SABE: SURGE',
    'AGOSTO PARTE DOS',
    'RAÍZ EN SILENCIO',
    'GRANADA CALLADA',
    'AUSENCIA HABITA',
    'CENTRO 14 × 14',
    'ASFALTO Y PIEDRA',
    'GRANADA SE VENDE',
    'RAÍCES VIAJERAS',
    'AÚN EL SIGLO GIRA',
    'NACE GRANADA HOY',
    'AQUÍ LA MESA ARDE',
    'DESPIERTA EL DÍA',
    'AQUÍ CABEN OTROS',
    'DE ELLAS EL MUNDO',
    'ENTRA Y ECHA RAÍZ',
    'LUGAR PARA TODOS',
    'DOS VECES RENACE',
    'SIGUE OTRO SIGLO'
  ];
  const vertical=n=>rows().map(r=>r?.verses?.[n]??'');
  const telestic=n=>(window.GRANADA_STONE_TELESTIC||window.GRANADA_TELESTIC||{})[`P${String(n).padStart(2,'0')}`]||null;
  const mesostic=n=>(window.GRANADA_STONE_MESOSTIC||{})[`P${String(n).padStart(2,'0')}`]||null;
  const alpha=/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/;

  window.GRANADA_VERTICAL_TITLES=Object.freeze([...VERTICAL_TITLES]);

  function decorated(line,pNo,rowNo){
    const chars=Array.from(String(line||''));
    const slots=chars.map(()=>new Set());
    const add=(i,cls)=>{if(Number.isInteger(i)&&i>=0&&i<slots.length)slots[i].add(cls)};
    const letters=[];
    chars.forEach((c,i)=>{if(alpha.test(c))letters.push(i)});
    if(letters.length){
      add(letters[0],'acrostic-letter');
      add(letters[letters.length-1],'telestic-letter');
    }

    const t=telestic(pNo);
    const tm=(t?.marks||[]).find(m=>Number(m.row)===rowNo);
    if(tm){
      const a=Number(tm.start),b=Number(tm.end),k=Number(tm.keyOffset||0);
      if(Number.isInteger(a)&&Number.isInteger(b)&&a>=0&&b>a&&b<=chars.length){
        for(let i=a;i<b;i++)add(i,'loa2-word');
        add(a+Math.max(0,Math.min(b-a-1,k)),'loa2-key');
      }
    }

    const m=mesostic(pNo);
    const mm=(m?.valid&&m.marks||[]).find(z=>Number(z.row)===rowNo);
    if(mm)add(Number(mm.offset),'mesostic-letter');

    return chars.map((ch,i)=>slots[i].size
      ? `<span class="${[...slots[i]].join(' ')}">${esc(ch)}</span>`
      : esc(ch)).join('');
  }

  const canvas=document.createElement('canvas');
  const ctx=canvas.getContext('2d');
  function fit(host,verses){
    if(!host||!verses?.length)return;
    requestAnimationFrame(()=>{
      const mobile=window.matchMedia('(max-width:780px)').matches;
      const base=mobile?14:17,min=mobile?11.2:12.5;
      const available=Math.max(220,(host.clientWidth||520)-8);
      const family='Georgia, "Times New Roman", serif';
      let widths=[];
      if(ctx){ctx.font=`${base}px ${family}`;widths=verses.map(v=>ctx.measureText(v).width)}
      else widths=verses.map(v=>String(v).length*base*.52);
      let max=0,maxIndex=0;
      widths.forEach((w,i)=>{if(w>max){max=w;maxIndex=i}});
      const size=Math.max(min,Math.min(base,base*(available/Math.max(1,max))));
      const measure=Math.min(available,max*(size/base));
      host.classList.add('fit-poem');
      host.style.setProperty('--poem-font-size',`${size.toFixed(2)}px`);
      host.style.setProperty('--poem-measure',`${Math.ceil(measure)}px`);
      host.dataset.widestVerse=String(maxIndex+1);
      host.title=`Medida gobernada por el verso ${maxIndex+1}: «${verses[maxIndex]}»`;
    });
  }

  function addRegister(host,pNo){
    host.querySelector('.structure-register')?.remove();
    const secret=telestic(pNo),mes=mesostic(pNo);
    const voices=window.GRANADA_STONE_MESOSTIC_VOICES||window.GRANADA_MESOSTIC_VOICES||{};
    const pair=voices[pNo]||{};
    const d=document.createElement('details');
    d.className='structure-register';
    d.innerHTML=`<summary>CAPAS INTERIORES · VERTICAL</summary>
      <div class="structure-register-body">
        ${pNo===14?'<div class="structure-role structure-role-origin"><span>PUNTO DE PARTIDA Y DE REGRESO</span><strong>LA VEGA · verso 14 = centro 14 × 14</strong></div>':''}
        <div class="structure-row"><span>P${String(pNo).padStart(2,'0')} · CLAVE TELÉSTICA</span><strong>${esc(secret?.word||'—')}</strong></div>
        <div class="structure-dialogue"><div><span>P${String(pNo).padStart(2,'0')} · MESÓSTICO</span><strong>${esc(pair.v||mes?.text||'—')}</strong></div></div>
      </div>`;
    host.appendChild(d);
  }

  function renderVertical(){
    if(typeof pi!=='number')return;
    pi=(pi+27)%27;
    const pNo=pi+1,verses=vertical(pi);
    if(verses.length!==27)return;
    $('#vi').textContent=`P${String(pNo).padStart(2,'0')} / 27 · VERTICAL · MATRIZ PROFUNDA`;
    $('#vt').textContent=VERTICAL_TITLES[pi]||`P${String(pNo).padStart(2,'0')}`;
    const host=$('#vl');
    if(!host)return;
    host.innerHTML='';
    const guide=document.createElement('div');
    guide.className='poem-guide';
    guide.innerHTML='<div class="poem-guide-title">LIBRO VERTICAL · PIEDRA</div><div class="structure-legend"><span class="acrostic-letter">A</span><span>ACRÓSTICO</span><span class="mesostic-letter">M</span><span>MESÓSTICO</span><span class="telestic-letter">T</span><span>TELÉSTICO</span></div>';
    host.appendChild(guide);
    verses.forEach((z,i)=>{
      let text=decorated(z,pNo,i+1);
      if(pNo===14&&i===13)text=`<span class="loa-center-origin" title="Centro 14 × 14">${text}</span>`;
      const d=document.createElement('div');
      d.className='poem-line vline'+(pNo===14&&i===13?' poem-center':'');
      d.innerHTML=`<span class="poem-verse">${text}</span>`;
      host.appendChild(d);
    });
    fit(host,verses);
    addRegister(host,pNo);
  }

  function installVerticalBook(){
    if(typeof items==='undefined'||!Array.isArray(items))return;
    if(items.some(x=>x?.side==='vertical-stone'))return;
    const at=items.findIndex(x=>x?.k==='s'&&x?.t==='LIBRO II · BAJO LA CAL');
    if(at<0)return;
    const block=[{k:'s',t:'LIBRO VERTICAL · MATRIZ PROFUNDA',sub:'27 poemas verticales · 27 × 27',layer:'stone'}];
    for(let i=0;i<27;i++)block.push({
      k:'p',
      e:`P${String(i+1).padStart(2,'0')} · VERTICAL · MATRIZ PROFUNDA`,
      t:VERTICAL_TITLES[i]||`P${String(i+1).padStart(2,'0')}`,
      l:vertical(i),
      n:i+1,
      layer:'stone',
      side:'vertical-stone'
    });
    items.splice(at,0,...block);
  }

  const baseBook=window.book;
  if(typeof baseBook==='function'){
    window.book=function(){
      baseBook();
      if(typeof items==='undefined'||typeof bi!=='number')return;
      const x=items[bi];
      if(!x||x.side!=='vertical-stone'||!Array.isArray(x.l))return;
      const host=$('#page .lines');
      if(!host)return;
      const lines=[...host.querySelectorAll('.line')];
      lines.forEach((el,i)=>{
        let text=decorated(x.l[i],x.n,i+1);
        if(x.n===14&&i===13)text=`<span class="loa-center-origin" title="Centro 14 × 14">${text}</span>`;
        el.innerHTML=text;
      });
      fit(host,x.l);
      if(x.n===14&&$('#page'))$('#page').classList.add('origin-book-page');
    };
  }

  installVerticalBook();
  window.vert=renderVertical;
  $('#vp')&&( $('#vp').onclick=()=>{pi--;renderVertical()} );
  $('#vn')&&( $('#vn').onclick=()=>{pi++;renderVertical()} );
  window.addEventListener('resize',()=>{
    const v=$('#verticalreader');
    if(v&&!v.classList.contains('hidden'))renderVertical();
  });
  renderVertical();
  window.book?.();
})();
