(()=>{
  const KEY='miramarReaderMode';
  const tools=document.querySelector('.reader-tools');
  const article=document.querySelector('#readerPage');
  const text=document.querySelector('#readerText');
  if(!tools||!article||!text||document.body.dataset.bookId!=='miramar')return;

  let mode='text';
  try{mode=sessionStorage.getItem(KEY)==='illustrated'?'illustrated':'text';}catch(_){}
  let lastState={state:'cover',scene:null};

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

  const spriteFor=scene=>Math.floor((scene-1)/10)+1;
  const slotFor=scene=>(scene-1)%10;
  const preload=new Set();
  const preloadSprite=n=>{
    if(n<1||n>3||preload.has(n))return;
    preload.add(n);
    const img=new Image();
    img.src=`images/miramar-scenes-${n}.webp`;
  };

  function syncButtons(){
    document.body.dataset.miramarMode=mode;
    const illustrated=mode==='illustrated';
    textBtn.classList.toggle('is-active',!illustrated);
    illBtn.classList.toggle('is-active',illustrated);
    textBtn.setAttribute('aria-pressed',String(!illustrated));
    illBtn.setAttribute('aria-pressed',String(illustrated));
  }

  function render(){
    syncButtons();
    const scene=Number(lastState.scene);
    const valid=lastState.state==='text'&&Number.isInteger(scene)&&scene>=1&&scene<=30;
    const show=mode==='illustrated'&&valid;
    article.classList.toggle('miramar-illustrated-page',show);
    figure.hidden=!show;
    if(!show)return;

    const sprite=spriteFor(scene);
    const slot=slotFor(scene);
    const pos=slot===0?0:(slot===9?100:(slot/9)*100);
    image.style.backgroundImage=`url("images/miramar-scenes-${sprite}.webp")`;
    image.style.backgroundSize='100% 1000%';
    image.style.backgroundPosition=`center ${pos}%`;
    image.setAttribute('aria-label',`Escenografía canónica de la escena ${String(scene).padStart(2,'0')}`);
    caption.textContent=`ESCENA ${String(scene).padStart(2,'0')} · IMAGEN CANÓNICA`;
    preloadSprite(sprite);
    if(slot>=7)preloadSprite(sprite+1);
    if(slot<=2)preloadSprite(sprite-1);
  }

  function setMode(next){
    mode=next==='illustrated'?'illustrated':'text';
    try{sessionStorage.setItem(KEY,mode);}catch(_){}
    render();
  }

  textBtn.addEventListener('click',()=>setMode('text'));
  illBtn.addEventListener('click',()=>setMode('illustrated'));
  document.addEventListener('book:state',ev=>{
    lastState={state:ev.detail?.state||'',scene:ev.detail?.scene??null};
    render();
  });
  syncButtons();
})();