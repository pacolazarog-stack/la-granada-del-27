/* Poética del límite · idioma global ES/EN/FR/IT/DE */
(()=>{
  const KEY='poeticaLanguage';
  const LANGS=[
    {code:'es',tag:'es-ES',label:'ESPAÑOL',short:'ES'},
    {code:'en',tag:'en-GB',label:'ENGLISH',short:'EN'},
    {code:'fr',tag:'fr-FR',label:'FRANÇAIS',short:'FR'},
    {code:'it',tag:'it-IT',label:'ITALIANO',short:'IT'},
    {code:'de',tag:'de-DE',label:'DEUTSCH',short:'DE'}
  ];
  const byCode=Object.fromEntries(LANGS.map(function(x){return [x.code,x];}));
  const PACK=window.POETICA_LANGUAGE_PACKS||{};
  const clean=function(s){return String(s==null?'':s).replace(/\s+/g,' ').trim();};
  const isChosen=function(){return Boolean(localStorage.getItem(KEY));};
  const initial=byCode[localStorage.getItem(KEY)]?localStorage.getItem(KEY):'es';
  const originals=new WeakMap(),cache=new Map(),sessions=new Map();
  let active=initial,seq=0,gate=null;

  const style=document.createElement('style');
  style.textContent='.lang-switch{position:fixed;top:12px;right:12px;z-index:9999;font-family:Georgia,serif}.lang-switch-toggle{border:1px solid #ffffff38;background:#17130fef;color:#f4ede5;border-radius:999px;padding:8px 11px;font-size:10px;letter-spacing:.1em;cursor:pointer;box-shadow:0 6px 20px #0006}.lang-switch-menu{display:none;margin-top:7px;padding:7px;background:#17130ff4;border:1px solid #ffffff25;border-radius:16px;box-shadow:0 10px 30px #0008}.lang-switch.open .lang-switch-menu{display:grid;gap:5px}.lang-switch-menu button,.lang-gate button{border:1px solid #ffffff30;background:#211d19;color:#f4ede5;border-radius:999px;padding:8px 12px;font:10px Georgia,serif;letter-spacing:.08em;cursor:pointer}.lang-switch-menu button.active,.lang-gate button.active{background:#f4ede5;color:#211d19}.lang-gate{margin:14px 0 4px;padding:14px;border:1px solid #ffffff22;background:#15120f80;text-align:center}.lang-gate-title{font:11px Georgia,serif;letter-spacing:.12em;color:#f4ede5;margin-bottom:10px}.lang-gate-sub{font:10px Georgia,serif;line-height:1.4;color:#b7a99b;margin-top:10px}.lang-gate-buttons{display:flex;justify-content:center;gap:7px;flex-wrap:wrap}.lang-translation-state{position:fixed;right:12px;top:58px;z-index:9998;background:#17130fef;color:#d8cbbd;border:1px solid #ffffff20;border-radius:999px;padding:6px 10px;font:9px Georgia,serif;letter-spacing:.06em;display:none}.lang-translation-state.show{display:block}@media(max-width:720px){.lang-switch{top:auto;bottom:12px;right:12px}.lang-translation-state{top:auto;bottom:56px}}';
  document.head.appendChild(style);

  const ui=document.createElement('div');ui.className='lang-switch';ui.setAttribute('data-lang-ui','1');
  ui.innerHTML='<button class="lang-switch-toggle" type="button" aria-label="Language">ES</button><div class="lang-switch-menu"></div>';
  const menu=ui.querySelector('.lang-switch-menu');
  LANGS.forEach(function(l){const b=document.createElement('button');b.type='button';b.dataset.lang=l.code;b.textContent=l.label;menu.appendChild(b);});
  document.body.appendChild(ui);
  const state=document.createElement('div');state.className='lang-translation-state';state.setAttribute('data-lang-ui','1');document.body.appendChild(state);

  function shouldSkip(node){
    const p=node.parentElement;if(!p)return true;
    if(p.closest('[data-lang-ui],script,style,noscript,code,pre[data-lang-skip],svg,a.author,a.cover-author,[data-author],[data-fli],#chance-language,[data-random-language]'))return true;
    const t=clean(node.nodeValue);
    return !t||t==='flag'||t==='fli'||/^[\d\s·×↔→←↑↓()[\],.:;/%+-]+$/.test(t);
  }
  function sourceOf(node){if(!originals.has(node))originals.set(node,node.nodeValue);return originals.get(node);}
  function fixed(source,lang){
    if(lang==='es')return source;
    const hit=PACK[clean(source)]&&PACK[clean(source)][lang];if(!hit)return null;
    const a=(source.match(/^\s*/)||[''])[0],b=(source.match(/\s*$/)||[''])[0];
    return a+hit+b;
  }
  async function session(lang){
    if(lang==='es')return null;
    if(sessions.has(lang))return sessions.get(lang);
    const T=globalThis.Translator;if(!T||!T.create)throw new Error('translator-unavailable');
    const opts={sourceLanguage:'es',targetLanguage:lang};
    if(T.availability){const a=await T.availability(opts);if(a==='unavailable'||a==='no')throw new Error('translator-unavailable');}
    const p=T.create(opts);sessions.set(lang,p);return p;
  }
  async function translateText(source,lang){
    if(lang==='es')return source;
    const f=fixed(source,lang);if(f)return f;
    const key=lang+'\u0000'+source;if(cache.has(key))return cache.get(key);
    const tr=await session(lang),out=await tr.translate(source);cache.set(key,out);return out;
  }
  function busy(on,msg){state.textContent=msg||'';state.classList.toggle('show',Boolean(on));}
  async function translateNode(node,lang,token){
    if(shouldSkip(node))return;
    const src=sourceOf(node);
    if(lang==='es'){node.nodeValue=src;return;}
    const f=fixed(src,lang);if(f){node.nodeValue=f;return;}
    if(clean(src).length<2)return;
    try{const out=await translateText(src,lang);if(token===seq&&active===lang)node.nodeValue=out;}
    catch(_){if(token===seq&&active===lang)node.nodeValue=src;}
  }
  function textNodes(root){
    const out=[],w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
    while((n=w.nextNode()))if(!shouldSkip(n))out.push(n);return out;
  }
  async function apply(root){
    root=root||document.body;
    const lang=active,token=++seq;
    document.documentElement.lang=(byCode[lang]&&byCode[lang].tag)||lang;
    Array.from(menu.querySelectorAll('button')).forEach(function(b){b.classList.toggle('active',b.dataset.lang===lang);});
    ui.querySelector('.lang-switch-toggle').textContent=(byCode[lang]&&byCode[lang].short)||lang.toUpperCase();
    const nodes=textNodes(root);
    if(lang!=='es')busy(true,lang==='en'?'TRANSLATING…':lang==='fr'?'TRADUCTION…':lang==='it'?'TRADUZIONE…':'ÜBERSETZUNG…');
    for(let i=0;i<nodes.length;i+=18){
      await Promise.all(nodes.slice(i,i+18).map(function(n){return translateNode(n,lang,token);}));
      if(token!==seq)return;
    }
    if(token===seq)busy(false);
    document.dispatchEvent(new CustomEvent('poetica:languageapplied',{detail:{language:lang}}));
  }
  async function setLanguage(code,opt){
    opt=opt||{};if(!byCode[code])return;
    active=code;if(opt.persist!==false)localStorage.setItem(KEY,code);
    document.dispatchEvent(new CustomEvent('volume:languagechange',{detail:{language:code,chosen:isChosen()}}));
    await apply(document.body);paintGate();
  }

  ui.querySelector('.lang-switch-toggle').addEventListener('click',function(){ui.classList.toggle('open');});
  menu.addEventListener('click',function(e){const b=e.target.closest('button[data-lang]');if(!b)return;ui.classList.remove('open');setLanguage(b.dataset.lang);});

  function createGate(){
    const audioGate=document.querySelector('#audioGate');if(!audioGate)return;
    gate=document.createElement('div');gate.className='lang-gate';gate.setAttribute('data-lang-ui','1');
    gate.innerHTML='<div class="lang-gate-title">ELIJA LENGUA · CHOOSE LANGUAGE · CHOISISSEZ LA LANGUE · SCEGLI LA LINGUA · SPRACHE WÄHLEN</div><div class="lang-gate-buttons"></div><div class="lang-gate-sub">La elección no interrumpe la música obligatoria. Podrá cambiar de lengua en cualquier momento.</div>';
    const wrap=gate.querySelector('.lang-gate-buttons');
    LANGS.forEach(function(l){const b=document.createElement('button');b.type='button';b.dataset.lang=l.code;b.textContent=l.label;wrap.appendChild(b);});
    audioGate.insertBefore(gate,audioGate.querySelector('p'));
    wrap.addEventListener('click',function(e){const b=e.target.closest('button[data-lang]');if(!b)return;setLanguage(b.dataset.lang);});
    paintGate();
  }
  function paintGate(){
    if(!gate)return;const is=isChosen();
    Array.from(gate.querySelectorAll('button[data-lang]')).forEach(function(b){b.classList.toggle('active',b.dataset.lang===active&&is);});
    if(is){const l=byCode[active],sub=gate.querySelector('.lang-gate-sub');sub.textContent=l.label+' · seleccionado. La música continúa. Puede cambiar de lengua en cualquier momento.';}
  }
  createGate();

  const observer=new MutationObserver(function(muts){
    const added=[];
    muts.forEach(function(m){m.addedNodes.forEach(function(n){
      if(n.nodeType===Node.TEXT_NODE)added.push(n);
      else if(n.nodeType===Node.ELEMENT_NODE&&!n.closest('[data-lang-ui]'))added.push.apply(added,textNodes(n));
    });});
    if(!added.length)return;
    const lang=active,token=seq;
    Promise.all(added.map(function(n){return translateNode(n,lang,token);})).catch(function(){});
  });
  observer.observe(document.body,{childList:true,subtree:true});

  window.POETICA_LANGUAGE={languages:LANGS,isChosen:isChosen,current:function(){return active;},setLanguage:setLanguage,apply:apply,canonical:'es',minimum:['es','en','fr','it','de']};
  apply(document.body);
})();