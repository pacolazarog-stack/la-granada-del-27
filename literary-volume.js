(()=>{
  const $=s=>document.querySelector(s);
  const SOURCES=[
    'texto-canonico/01_LIBRO_I_1927.md',
    'texto-canonico/02_LIBRO_I_2027.md',
    'texto-canonico/03_LIBRO_II_AGUA_TIERRAS.md',
    'texto-canonico/04_LIBRO_II_MANOS_COSTURAS.md',
    'texto-canonico/05_LIBRO_II_REGRESO.md',
    'texto-canonico/06_CONTRAPORTADA.md'
  ];
  let pages=[];
  let index=0;
  let anchors={book1:0,vega:0,book2:0};

  const clean=s=>String(s||'')
    .replace(/\s{2,}$/,'')
    .replace(/^>\s?/,'')
    .replace(/\*\*/g,'')
    .replace(/^\*|\*$/g,'')
    .trimEnd();

  function parseMarkdown(text){
    const out=[];
    let current=null;
    const flush=()=>{
      if(!current)return;
      while(current.lines.length && current.lines[0]==='')current.lines.shift();
      while(current.lines.length && current.lines[current.lines.length-1]==='')current.lines.pop();
      out.push(current);current=null;
    };
    text.replace(/\r/g,'').split('\n').forEach(raw=>{
      const m=raw.match(/^(#{1,3})\s+(.+)$/);
      if(m){flush();current={level:m[1].length,title:clean(m[2]),lines:[]};return;}
      if(!current)return;
      const line=clean(raw);
      if(line==='' && current.lines[current.lines.length-1]==='')return;
      current.lines.push(line);
    });
    flush();
    return out;
  }

  function classify(section){
    const t=section.title;
    if(/^CONTRAPORTADA/i.test(t))return 'back';
    if(section.level===1)return 'divider';
    if(/^[IVX]+\s*·\s*/.test(t))return 'divider';
    return 'text';
  }

  function addSections(sections){
    sections.forEach(s=>pages.push({...s,kind:classify(s)}));
  }

  function findAnchors(){
    anchors.book1=Math.max(1,pages.findIndex(p=>p.title==='LIBRO I · LA GRANADA DEL 27'));
    anchors.vega=Math.max(1,pages.findIndex(p=>/^14\s*·\s*LA VEGA$/i.test(p.title)));
    anchors.book2=Math.max(1,pages.findIndex(p=>p.title==='LIBRO II · COSIENDO EUROPA'));
  }

  function front(){
    return `<div class="book-cover canonical-cover" aria-label="Portada de La Granada del 27. Un siglo después. Cosiendo Europa">
      <div class="cover-top"><span>GRANADA · 1927—2027</span><span>EDICIÓN TEXTUAL</span></div>
      <div class="cover-center">
        <h1 class="cover-title"><span>LA GRANADA</span><span>DEL 27</span></h1>
        <div class="cover-subtitle">UN SIGLO DESPUÉS</div>
        <div class="cover-rule"></div>
        <div class="cover-europe">COSIENDO EUROPA</div>
        <p class="cover-motto">Dos tiempos se miran.<br>Debajo, todavía pasa el agua.</p>
      </div>
      <div class="cover-bottom"><span class="cover-author">flag</span></div>
    </div>`;
  }

  function lineHTML(line){
    if(line==='')return '<div class="literary-space">&nbsp;</div>';
    return `<div class="literary-line">${line.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>`;
  }

  function render(){
    const page=$('#page'),p=pages[index];
    page.scrollTop=0;
    page.className='page literary-page';
    if(index===0){
      page.className='page cover-page literary-page';
      page.innerHTML=front();
      $('#prog').textContent='PORTADA · EDICIÓN TEXTUAL CANÓNICA';
    }else if(p.kind==='divider'){
      page.innerHTML=`<div class="section literary-divider"><div><div class="eyebrow">${p.level===1?'LIBRO':'SECCIÓN'}</div><h2>${p.title}</h2>${p.lines.length?`<div class="text">${p.lines.map(lineHTML).join('')}</div>`:''}</div></div>`;
      $('#prog').textContent=`${index} / ${pages.length-1}`;
    }else if(p.kind==='back'){
      page.className='page back-cover-page literary-page';
      page.innerHTML=`<div class="book-back canonical-back"><div class="back-copy"><div class="back-kicker">LA GRANADA DEL 27 · UN SIGLO DESPUÉS · COSIENDO EUROPA</div><h2>CONTRAPORTADA</h2><div class="literary-back-text">${p.lines.map(lineHTML).join('')}</div><div class="back-credit">flag · 2026</div></div></div>`;
      $('#prog').textContent='CONTRAPORTADA';
    }else{
      const bits=p.title.match(/^((?:\d{2}|PRÓLOGO|EPÍLOGO)\s*(?:·\s*)?)(.*)$/i);
      const eyebrow=bits?bits[1].trim():'';
      const title=bits&&bits[2]?bits[2]:p.title;
      page.innerHTML=`${eyebrow?`<div class="eyebrow">${eyebrow}</div>`:''}<h2>${title}</h2><div class="literary-text">${p.lines.map(lineHTML).join('')}</div>`;
      $('#prog').textContent=`${index} / ${pages.length-1}`;
    }
    $('#bp').disabled=index===0;
    $('#bn').disabled=index===pages.length-1;
    $('#bp').textContent=index===1?'← Portada':'← Anterior';
    $('#bn').textContent=index===0?'Abrir libro →':(index===pages.length-2?'Contraportada →':'Siguiente →');
    history.replaceState(null,'',index===0?'#bookview':`#p${index}`);
  }

  function go(n){index=Math.max(0,Math.min(pages.length-1,n));render();}
  window.GRANADA_LITERARY={go,front:()=>go(0),book1:()=>go(anchors.book1),vega:()=>go(anchors.vega),book2:()=>go(anchors.book2)};

  async function init(){
    const responses=await Promise.all(SOURCES.map(src=>fetch(`${src}?v=20260917`,{cache:'no-store'})));
    const texts=await Promise.all(responses.map((r,i)=>{if(!r.ok)throw new Error(`No se pudo cargar ${SOURCES[i]}`);return r.text();}));
    pages=[{kind:'cover',title:'PORTADA',level:0,lines:[]}];
    texts.forEach(t=>addSections(parseMarkdown(t)));
    findAnchors();
    const hash=location.hash.match(/^#p(\d+)$/);
    if(hash)index=Math.min(pages.length-1,Number(hash[1]));
    render();
  }

  $('#bp').onclick=()=>go(index-1);
  $('#bn').onclick=()=>go(index+1);
  $('#to-cover').onclick=()=>window.GRANADA_LITERARY?.front();
  $('#to-book1').onclick=()=>window.GRANADA_LITERARY?.book1();
  $('#to-vega').onclick=()=>window.GRANADA_LITERARY?.vega();
  $('#to-book2').onclick=()=>window.GRANADA_LITERARY?.book2();
  $('#full').onclick=()=>!document.fullscreenElement?document.documentElement.requestFullscreen?.():document.exitFullscreen?.();

  init().catch(err=>{
    console.error(err);
    $('#page').innerHTML='<div class="section"><div><h2>Error de carga</h2><p>No se ha podido cargar el corpus textual canónico.</p></div></div>';
  });
})();