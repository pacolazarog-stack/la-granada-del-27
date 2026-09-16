(()=>{
  const KEY='miramarReaderMode';
  const tools=document.querySelector('.reader-tools');
  const article=document.querySelector('#readerPage');
  const text=document.querySelector('#readerText');
  const cover=document.querySelector('#readerCover');
  if(!tools||!article||!text||document.body.dataset.bookId!=='miramar')return;

  /* 30 escenografías extraídas sin regeneración del cuaderno canónico
     LA_TERRAZA_DEL_MIRAMAR_30_IMAGENES_CANONICAS_20260905. */
  const SCENE_IMAGES={
    1:'https://gcdn.picsart.com/editing-temp/610fd0a1-2d4f-4a66-b6a2-3462f3f82ea3.jpeg',
    2:'https://gcdn.picsart.com/editing-temp/1449ef24-9ca7-4b19-b371-4dbe7a5f5abb.jpeg',
    3:'https://gcdn.picsart.com/editing-temp/39a8a79b-c3d1-4eb9-8921-0d0414f0ae51.jpeg',
    4:'https://gcdn.picsart.com/editing-temp/cb8b1d80-6a71-4f41-94bc-6d6b68991d00.jpeg',
    5:'https://gcdn.picsart.com/editing-temp/4107fb70-3aea-4e4d-824e-7e83fdf4ebcf.jpeg',
    6:'https://gcdn.picsart.com/editing-temp/8f1fe7ed-1392-437a-8471-1a00e2268070.jpeg',
    7:'https://gcdn.picsart.com/editing-temp/a50667d7-8938-4997-80b2-df6934f31f65.jpeg',
    8:'https://gcdn.picsart.com/editing-temp/edb58897-ca18-4360-9306-2fc612c1112e.jpeg',
    9:'https://gcdn.picsart.com/editing-temp/0265b767-9af7-416c-98d2-98fa658715e7.jpeg',
    10:'https://gcdn.picsart.com/editing-temp/5519b5c5-7a6b-4e05-bec0-5ab1e38ed4a5.jpeg',
    11:'https://gcdn.picsart.com/editing-temp/c35ba401-94c0-429c-965a-3ca4dcc7b3f7.jpeg',
    12:'https://gcdn.picsart.com/editing-temp/0de49273-34dd-4a61-b5fd-121f22e03033.jpeg',
    13:'https://gcdn.picsart.com/editing-temp/4bc18cef-8e74-4ccd-8b01-c9e05e3d1afd.jpeg',
    14:'https://gcdn.picsart.com/editing-temp/33ea629c-b533-436f-b1d3-c63f7dea8c84.jpeg',
    15:'https://gcdn.picsart.com/editing-temp/94cc7150-93ce-4bb8-b629-dcdd01d7990b.jpeg',
    16:'https://gcdn.picsart.com/editing-temp/376884fa-7717-448c-8526-6e38f774051c.jpeg',
    17:'https://gcdn.picsart.com/editing-temp/4e13ae66-c58d-4e8d-86a5-da3f234ed76b.jpeg',
    18:'https://gcdn.picsart.com/editing-temp/a226cef7-be26-4170-a8d7-ff5effb01ab8.jpeg',
    19:'https://gcdn.picsart.com/editing-temp/711ca3f8-7260-492a-8bef-4bb680c0be8d.jpeg',
    20:'https://gcdn.picsart.com/editing-temp/73e72514-9a4d-4cd1-b3c6-e1ddb390d46e.jpeg',
    21:'https://gcdn.picsart.com/editing-temp/f3891a43-5f61-4d85-bf5d-17cc7bc9bab8.jpeg',
    22:'https://gcdn.picsart.com/editing-temp/5b5b1393-6ceb-4856-b080-de5064f953ba.jpeg',
    23:'https://gcdn.picsart.com/editing-temp/281148b7-360b-4b72-8ade-cda19101541e.jpeg',
    24:'https://gcdn.picsart.com/editing-temp/dcc0f6d5-c48d-4568-944a-1fa331f57581.jpeg',
    25:'https://gcdn.picsart.com/editing-temp/7cbca70a-7742-4fb3-bda3-41ae74093e16.jpeg',
    26:'https://gcdn.picsart.com/editing-temp/8f8bfae7-7342-48df-9c45-97e9aed1367f.jpeg',
    27:'https://gcdn.picsart.com/editing-temp/02876fbb-5331-4279-b401-e68d568aa04e.jpeg',
    28:'https://gcdn.picsart.com/editing-temp/282f729c-2cca-4273-a342-220f1deec611.jpeg',
    29:'https://gcdn.picsart.com/editing-temp/53f68a36-701e-4bb6-affa-9628447845cc.jpeg',
    30:'https://gcdn.picsart.com/editing-temp/402d0469-2e95-40a0-bb2f-fe89174f8988.jpeg'
  };

  let mode='text';
  try{mode=sessionStorage.getItem(KEY)==='illustrated'?'illustrated':'text';}catch(_){}
  let lastState={state:'cover',scene:null};
  let inheritedScene=null;
  const preloaded=new Set();

  const switcher=document.createElement('div');
  switcher.className='miramar-mode-switch';
  switcher.setAttribute('role','group');
  switcher.setAttribute('aria-label','Modalidad de lectura');
  const textBtn=document.createElement('button');
  const illBtn=document.createElement('button');
  [textBtn,illBtn].forEach(btn=>{btn.type='button';btn.className='miramar-mode-btn';});
  textBtn.textContent='TEXTO';
  textBtn.setAttribute('aria-label','Lectura textual');
  illBtn.textContent='ILUSTRADA';
  illBtn.setAttribute('aria-label','Lectura ilustrada');
  switcher.append(textBtn,illBtn);
  tools.prepend(switcher);

  let coverTextBtn=null,coverIllBtn=null;
  if(cover){
    const chooser=document.createElement('div');
    chooser.className='miramar-cover-choice';
    chooser.setAttribute('role','group');
    chooser.setAttribute('aria-label','Escoger modalidad de lectura de La terraza del Miramar');
    const label=document.createElement('div');
    label.className='miramar-cover-choice-label';
    label.textContent='ESCOGE LA LECTURA';
    coverTextBtn=document.createElement('button');
    coverIllBtn=document.createElement('button');
    [coverTextBtn,coverIllBtn].forEach(btn=>{btn.type='button';btn.className='miramar-cover-choice-btn';});
    coverTextBtn.textContent='LECTURA TEXTUAL';
    coverIllBtn.textContent='LECTURA ILUSTRADA';
    chooser.append(label,coverTextBtn,coverIllBtn);
    cover.appendChild(chooser);
  }

  const figure=document.createElement('figure');
  figure.id='miramarIllustration';
  figure.className='miramar-illustration';
  figure.hidden=true;
  const image=document.createElement('div');
  image.className='miramar-scene-image';
  image.setAttribute('role','img');
  const caption=document.createElement('figcaption');
  caption.className='miramar-scene-caption';
  figure.append(image,caption);
  article.appendChild(figure);

  function sceneTitle(n){return window.MIRAMAR_SCENE_TITLES?.[n]||'';}
  function preloadScene(n){
    const src=SCENE_IMAGES[n];
    if(!src||preloaded.has(n))return;
    preloaded.add(n);
    const im=new Image();im.decoding='async';im.src=src;
  }
  function setSceneImage(scene){
    if(!Number.isInteger(scene)||scene<1||scene>30||!SCENE_IMAGES[scene])return;
    inheritedScene=scene;
    const title=sceneTitle(scene);
    image.style.backgroundImage=`url("${SCENE_IMAGES[scene]}")`;
    image.style.backgroundSize='contain';
    image.style.backgroundPosition='center';
    image.style.backgroundRepeat='no-repeat';
    image.setAttribute('aria-label',title?`Escenografía canónica de la escena ${String(scene).padStart(2,'0')} · ${title}`:`Escenografía canónica de la escena ${String(scene).padStart(2,'0')}`);
    caption.textContent=title?`ESCENA ${String(scene).padStart(2,'0')} · ${title} · IMAGEN CANÓNICA`:`ESCENA ${String(scene).padStart(2,'0')} · IMAGEN CANÓNICA`;
    preloadScene(scene);preloadScene(scene+1);preloadScene(scene-1);
  }
  function syncButtons(){
    document.body.dataset.miramarMode=mode;
    const illustrated=mode==='illustrated';
    textBtn.classList.toggle('is-active',!illustrated);
    illBtn.classList.toggle('is-active',illustrated);
    textBtn.setAttribute('aria-pressed',String(!illustrated));
    illBtn.setAttribute('aria-pressed',String(illustrated));
    if(coverTextBtn&&coverIllBtn){
      coverTextBtn.classList.toggle('is-active',!illustrated);
      coverIllBtn.classList.toggle('is-active',illustrated);
      coverTextBtn.setAttribute('aria-pressed',String(!illustrated));
      coverIllBtn.setAttribute('aria-pressed',String(illustrated));
    }
  }
  function render(){
    syncButtons();
    const incoming=Number(lastState.scene);
    if(lastState.state==='text'&&Number.isInteger(incoming)&&incoming>=1&&incoming<=30)setSceneImage(incoming);
    const valid=lastState.state==='text'&&Number.isInteger(inheritedScene)&&inheritedScene>=1&&inheritedScene<=30;
    const show=mode==='illustrated'&&valid;
    article.classList.toggle('miramar-illustrated-page',show);
    figure.hidden=!show;
    if(show&&SCENE_IMAGES[inheritedScene])setSceneImage(inheritedScene);
  }
  function setMode(next){
    mode=next==='illustrated'?'illustrated':'text';
    try{sessionStorage.setItem(KEY,mode);}catch(_){}
    render();
    document.dispatchEvent(new CustomEvent('miramar:modechange',{detail:{mode}}));
  }
  textBtn.addEventListener('click',()=>setMode('text'));
  illBtn.addEventListener('click',()=>setMode('illustrated'));
  coverTextBtn?.addEventListener('click',()=>setMode('text'));
  coverIllBtn?.addEventListener('click',()=>setMode('illustrated'));
  document.addEventListener('book:state',ev=>{
    const state=ev.detail?.state||'';
    const scene=ev.detail?.scene??null;
    lastState={state,scene};
    if(state==='text'&&Number.isInteger(Number(scene))&&Number(scene)>=1&&Number(scene)<=30)inheritedScene=Number(scene);
    render();
  });
  syncButtons();preloadScene(1);preloadScene(2);
})();

/* Maquetación escénica: convierte el volcado de texto del lector en una página
   teatral legible, sin alterar el texto canónico almacenado en WORK_DATA. */
(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  const text=document.querySelector('#readerText');
  const progress=document.querySelector('#readerProgress');
  if(!text)return;
  const style=document.createElement('style');
  style.textContent=`
    #readerText.miramar-script{white-space:normal;overflow-wrap:normal;max-width:690px;margin:0 auto;font-size:clamp(14px,1.18vw,17px);line-height:1.46}
    .miramar-scene-head{margin:0 0 1.65rem;padding:0 0 1rem;border-bottom:1px solid rgba(124,33,29,.24)}
    .miramar-section-kicker{font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:#806f60;margin:0 0 .7rem;font-weight:700}
    .miramar-scene-no{font-size:.72rem;letter-spacing:.16em;color:#8a7564;margin-bottom:.3rem}
    .miramar-scene-title{font-size:clamp(24px,2.4vw,36px);line-height:1.06;letter-spacing:.035em;margin:0;font-weight:400;color:#241d18;text-transform:uppercase}
    .miramar-script-body{display:block}.miramar-script-line{margin:.31em 0;min-height:1em}
    .miramar-script-line.rhythm{margin:.9em 0;color:#7c211d;font-size:.9em;font-style:italic;letter-spacing:.055em;word-spacing:.08em}
    .miramar-script-line.impact{margin:.72em 0;font-weight:700;letter-spacing:.09em;color:#33251f}
    .miramar-script-line.speaker{margin:1.1em 0 .25em;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.82em;color:#6f5746}
    body[data-miramar-mode="illustrated"] #readerText.miramar-script{max-width:none;white-space:normal!important}
    body[data-miramar-mode="illustrated"] .miramar-scene-title{font-size:clamp(21px,1.8vw,30px)}
    @media(max-width:760px){#readerText.miramar-script{font-size:14px}.miramar-scene-head{margin-bottom:1.2rem}.miramar-scene-title{font-size:24px}}
  `;
  document.head.appendChild(style);
  const sceneRE=/^(0[1-9]|[12]\d|30)\s*·\s*(.+)$/;
  const sectionRE=/^(I{1,3}|IV)\s*·\s*(.+)$/;
  const speakerRE=/^(FRANCISCA|VICENTE(?:\s*\/\s*MENSAJE)?|COMUNIDAD|PRESIDENCIA|PRESIDENTE|VECINA|VECINO|VOCES?|CORO|MENSAJE|WHATSAPP|CAROCA\s*\d+|MANIQU[IÍ](?:ES)?(?:\s*\d+)?)$/i;
  const rhythmWords=new Set(['mmm','mar','rrr','ah','tum','ta','tan','ka','pa','ra','du','ba','ts','tik','ya','clac','ram']);
  function isRhythm(line){
    const words=line.toLowerCase().replace(/[.,;:!?…"“”«»()]/g,' ').split(/\s+/).filter(Boolean);
    return words.length>0&&words.length<=18&&words.every(w=>rhythmWords.has(w));
  }
  function isImpact(line){
    const letters=line.replace(/[^A-ZÁÉÍÓÚÜÑ]/g,'');
    return line.length<32&&letters.length>=2&&line===line.toUpperCase();
  }
  function formatCurrent(){
    if(text.hidden)return;
    const raw=String(text.textContent||'').replace(/\r/g,'');
    if(!raw.trim())return;
    const lines=raw.split('\n').map(s=>s.trim()).filter(Boolean);
    const sceneIndex=lines.findIndex(l=>sceneRE.test(l));
    if(sceneIndex<0){text.classList.remove('miramar-script');return;}
    let section='';
    for(let i=0;i<sceneIndex;i++){
      const m=lines[i].match(sectionRE);
      if(m){section=`${m[1]} · ${m[2]}`;break;}
    }
    const sm=lines[sceneIndex].match(sceneRE);
    const scene=Number(sm[1]);
    const title=(window.MIRAMAR_SCENE_TITLES?.[scene]||sm[2]).trim();
    text.replaceChildren();text.classList.add('miramar-script');
    const head=document.createElement('header');head.className='miramar-scene-head';
    if(!section&&scene>=1&&scene<=9)section='I · DOMÉSTICA';
    if(section){const k=document.createElement('div');k.className='miramar-section-kicker';k.textContent=section;head.appendChild(k);}
    const no=document.createElement('div');no.className='miramar-scene-no';no.textContent=`ESCENA ${String(scene).padStart(2,'0')}`;
    const h=document.createElement('h2');h.className='miramar-scene-title';h.textContent=title;
    head.append(no,h);text.appendChild(head);
    const body=document.createElement('div');body.className='miramar-script-body';
    for(const line of lines.slice(sceneIndex+1)){
      if(sectionRE.test(line)||sceneRE.test(line))continue;
      const p=document.createElement('div');p.className='miramar-script-line';p.textContent=line;
      if(isRhythm(line))p.classList.add('rhythm');
      if(isImpact(line))p.classList.add('impact');
      if(speakerRE.test(line.replace(/:$/,'')))p.classList.add('speaker');
      body.appendChild(p);
    }
    text.appendChild(body);
    if(progress)progress.textContent=`ESCENA ${String(scene).padStart(2,'0')} · ${title}`;
    const cap=document.querySelector('#miramarIllustration .miramar-scene-caption');
    if(cap)cap.textContent=`ESCENA ${String(scene).padStart(2,'0')} · ${title} · IMAGEN CANÓNICA`;
  }
  document.addEventListener('book:state',ev=>{if(ev.detail?.state==='text')queueMicrotask(formatCurrent);});
})();