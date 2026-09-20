/* La Granada del 27 · cubo canónico 27×27×27 · Atlas / Azar */
(()=>{
  const SIZE=27,CENTER=14;
  const WEIGHTS={musicality:.50,semantics:.20,semiotics:.15,affinity:.10,novelty:.05};
  const INDEX_27=[
    'Alemania','Bélgica','Francia','Irlanda','Dinamarca','Finlandia','Letonia','Polonia','Eslovaquia','Eslovenia','Rumanía','Grecia','Italia','España','Portugal','Chipre','Bulgaria','Croacia','Hungría','República Checa','Lituania','Estonia','Suecia','Malta','Luxemburgo','Países Bajos','Austria'
  ];
  const POEM_ROUTE=[
    'Países Bajos','Polonia','Alemania','Austria','Rumanía','Hungría','Bulgaria','Grecia','Chipre','Malta','Dinamarca','Letonia','Francia','España','Lituania','Finlandia','Suecia','Estonia','Croacia','República Checa','Bélgica','Eslovaquia','Portugal','Luxemburgo','Italia','Eslovenia','Irlanda'
  ];
  const IDX=Object.fromEntries(INDEX_27.map((name,i)=>[name,i+1]));

  /* 27 lenguas del sistema: 24 oficiales de la UE + catalán, gallego y euskera.
     El español ya forma parte de las 24 oficiales; por tanto hay 4 lenguas españolas
     en total. Los perfiles son heurísticos: ponderan el azar, no sustituyen una traducción literaria. */
  const LANGUAGES=[
    ['bg','bg-BG','Búlgaro','slavic',['Bulgaria'],.43,.58],
    ['hr','hr-HR','Croata','slavic',['Croacia'],.45,.62],
    ['cs','cs-CZ','Checo','slavic',['República Checa'],.42,.55],
    ['da','da-DK','Danés','germanic',['Dinamarca'],.44,.48],
    ['nl','nl-NL','Neerlandés','germanic',['Países Bajos','Bélgica'],.42,.50],
    ['en','en-IE','Inglés','germanic',['Irlanda','Malta'],.40,.47],
    ['et','et-EE','Estonio','uralic',['Estonia'],.49,.69],
    ['fi','fi-FI','Finés','uralic',['Finlandia'],.51,.76],
    ['fr','fr-FR','Francés','romance',['Francia','Bélgica','Luxemburgo'],.46,.57],
    ['de','de-DE','Alemán','germanic',['Alemania','Austria','Bélgica','Luxemburgo'],.40,.50],
    ['el','el-GR','Griego','hellenic',['Grecia','Chipre'],.48,.66],
    ['hu','hu-HU','Húngaro','uralic',['Hungría'],.51,.75],
    ['ga','ga-IE','Irlandés','celtic',['Irlanda'],.49,.61],
    ['it','it-IT','Italiano','romance',['Italia'],.52,.80],
    ['lv','lv-LV','Letón','baltic',['Letonia'],.46,.68],
    ['lt','lt-LT','Lituano','baltic',['Lituania'],.47,.68],
    ['mt','mt-MT','Maltés','semitic',['Malta'],.45,.62],
    ['pl','pl-PL','Polaco','slavic',['Polonia'],.40,.54],
    ['pt','pt-PT','Portugués','romance',['Portugal'],.47,.70],
    ['ro','ro-RO','Rumano','romance',['Rumanía'],.48,.72],
    ['sk','sk-SK','Eslovaco','slavic',['Eslovaquia'],.43,.58],
    ['sl','sl-SI','Esloveno','slavic',['Eslovenia'],.45,.63],
    ['es','es-ES','Español','romance',['España'],.50,.79],
    ['sv','sv-SE','Sueco','germanic',['Suecia','Finlandia'],.47,.59],
    ['ca','ca-ES','Catalán','romance',['España'],.49,.74],
    ['gl','gl-ES','Gallego','romance',['España'],.50,.76],
    ['eu','eu-ES','Euskera','isolate',['España'],.50,.71]
  ].map(x=>({code:x[0],tag:x[1],name:x[2],family:x[3],countries:x[4],vowelTarget:x[5],rhythm:x[6]}));

  const TRACE_SUMMARY={
    names:['POEMA','AGUA','ARTISTAS','LEGADO','1927↔2027'],
    nodesPerTrace:27,
    sharedCenter:{x:14,y:14,z:14,label:'España · La Vega · verso central'},
    xyCoincidences:11,
    envelopeDensity:{8:18,9:18,11:18,13:24},
    exactRoutesAvailable:['POEMA']
  };

  const clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,n));
  const random=()=>{
    if(globalThis.crypto&&crypto.getRandomValues){const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]/4294967296;}
    return Math.random();
  };
  const countryAtIndex=i=>INDEX_27[Math.max(1,Math.min(27,Number(i)||1))-1];
  const poemPoint=z=>{
    z=Math.max(1,Math.min(27,Number(z)||1));
    const country=POEM_ROUTE[z-1],mirrorVerse=28-z,mirrorCountry=POEM_ROUTE[mirrorVerse-1];
    return {x:IDX[country],y:IDX[mirrorCountry],z,country,mirrorCountry,mirrorVerse};
  };
  const mirrorPoint=p=>({x:p.y,y:p.x,z:28-p.z});
  const envelope=(x,y,z)=>Math.max(Math.abs(x-CENTER),Math.abs(y-CENTER),Math.abs(z-CENTER));
  const cubeMeta=(x,y,z)=>{
    x=Math.max(1,Math.min(27,Number(x)||1));y=Math.max(1,Math.min(27,Number(y)||1));z=Math.max(1,Math.min(27,Number(z)||1));
    const k=envelope(x,y,z),trace=poemPoint(z);
    return {x,y,z,k,side:2*k+1,countryX:countryAtIndex(x),countryY:countryAtIndex(y),mirror:mirrorPoint({x,y,z}),trace,onPoemTrace:x===trace.x&&y===trace.y,isCenter:x===14&&y===14&&z===14};
  };

  const letters=s=>Array.from(String(s||'').toLocaleLowerCase()).filter(c=>/\p{L}/u.test(c));
  const words=s=>String(s||'').toLocaleLowerCase().match(/\p{L}+/gu)||[];
  const spanishVowels=new Set(Array.from('aeiouáéíóúü'));
  function soundFeatures(text,vowelSet=spanishVowels){
    const ls=letters(text),ws=words(text),v=ls.filter(c=>vowelSet.has(c)).length;
    const initials=ws.map(w=>Array.from(w)[0]).filter(Boolean);
    const tails=ws.map(w=>{const a=Array.from(w);for(let i=a.length-1;i>=0;i--)if(vowelSet.has(a[i]))return a[i];return '';}).filter(Boolean);
    const repetition=a=>a.length?1-new Set(a).size/a.length:0;
    return {vowelRatio:v/Math.max(1,ls.length),alliteration:repetition(initials),assonance:repetition(tails),wordMean:ws.length?ls.length/ws.length:0};
  }
  const familySemantic={romance:96,germanic:87,slavic:84,baltic:83,hellenic:81,uralic:78,celtic:79,semitic:77,isolate:74};
  function scoresFor(text,lang,context,usage={}){
    const f=soundFeatures(text);
    const musicality=clamp(100-Math.abs(f.vowelRatio-lang.vowelTarget)*145-Math.abs(f.wordMean/10-lang.rhythm)*25+f.alliteration*16+f.assonance*13);
    const semantics=familySemantic[lang.family]||80;
    const cx=context&&context.countryX,cy=context&&context.countryY,cz=context&&context.trace&&context.trace.country;
    const matchX=lang.countries.includes(cx),matchY=lang.countries.includes(cy),matchZ=lang.countries.includes(cz);
    const semiotics=clamp(55+(matchZ?24:0)+(matchX||matchY?16:0)+(lang.family!=='romance'?8:0));
    const affinity=clamp(42+(matchZ?36:0)+(matchX?14:0)+(matchY?14:0));
    const novelty=clamp(40+(100-semantics)*1.25+(lang.family!=='romance'?18:0));
    const base=WEIGHTS.musicality*musicality+WEIGHTS.semantics*semantics+WEIGHTS.semiotics*semiotics+WEIGHTS.affinity*affinity+WEIGHTS.novelty*novelty;
    const count=Number(usage[lang.code]||0);
    const counts=LANGUAGES.map(l=>Number(usage[l.code]||0)),min=Math.min(...counts);
    const exploration=clamp(12/(1+count),0,12)+(count===min?3:0);
    return {musicality,semantics,semiotics,affinity,novelty,base,exploration,total:base+exploration};
  }
  function textMusicScore(text,lang){
    const vowels=new Set(Array.from('aeiouyáéíóúüàèìòùâêîôûäëïöüåæøõ'));
    const f=soundFeatures(text,vowels);
    return clamp(100-Math.abs(f.vowelRatio-lang.vowelTarget)*135+f.alliteration*18+f.assonance*18-Math.abs(f.wordMean/10-lang.rhythm)*22);
  }

  const USAGE_KEY='granada27.languageReward.v1';
  const usage=()=>{try{return JSON.parse(localStorage.getItem(USAGE_KEY)||'{}')||{};}catch(_){return {};}};
  const markUse=code=>{try{const u=usage();u[code]=(u[code]||0)+1;localStorage.setItem(USAGE_KEY,JSON.stringify(u));}catch(_){}};
  function pickWeighted(list){
    const max=Math.max(...list.map(x=>x.score));
    const weighted=list.map(x=>({...x,w:Math.exp((x.score-max)/12)}));
    const total=weighted.reduce((s,x)=>s+x.w,0);let r=random()*total;
    for(const x of weighted){r-=x.w;if(r<=0)return x;}return weighted[weighted.length-1];
  }

  const translators=new Map(),translationCache=new Map();
  async function translate(text,lang){
    if(lang.code==='es')return text;
    const key=lang.code+'\u0000'+text;
    if(translationCache.has(key))return translationCache.get(key);
    const T=globalThis.Translator;if(!T||!T.create)return null;
    try{
      const opts={sourceLanguage:'es',targetLanguage:lang.code};
      if(T.availability){const a=await T.availability(opts);if(a==='unavailable'||a==='no')return null;}
      if(!translators.has(lang.code))translators.set(lang.code,T.create(opts));
      const tr=await translators.get(lang.code),out=await tr.translate(text);
      if(out){translationCache.set(key,out);return out;}
    }catch(_){}
    return null;
  }
  async function chooseLanguageReward(text,context){
    const u=usage(),all=LANGUAGES.map(lang=>({lang,parts:scoresFor(text,lang,context,u)}));
    const sorted=[...all].sort((a,b)=>b.parts.total-a.parts.total),shortlist=sorted.slice(0,3);
    const under=[...all].sort((a,b)=>(u[a.lang.code]||0)-(u[b.lang.code]||0)||b.parts.total-a.parts.total)[0];
    if(under&&!shortlist.some(x=>x.lang.code===under.lang.code))shortlist.push(under);
    const refined=[];
    for(const c of shortlist){
      const translation=await translate(text,c.lang);
      const actualMusicality=translation?textMusicScore(translation,c.lang):null;
      const score=actualMusicality==null?c.parts.total:c.parts.total*.62+actualMusicality*.38;
      refined.push({...c,translation,actualMusicality,score});
    }
    const chosen=pickWeighted(refined.length?refined:all.map(c=>({...c,translation:null,actualMusicality:null,score:c.parts.total})));
    markUse(chosen.lang.code);return chosen;
  }
  function speak(text,lang){
    if(!('speechSynthesis' in globalThis)||!text)return false;
    try{
      speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang.tag;
      const voice=speechSynthesis.getVoices().find(v=>String(v.lang||'').toLowerCase().startsWith(lang.code.toLowerCase()));
      if(voice)u.voice=voice;u.rate=.88;u.pitch=1;speechSynthesis.speak(u);return true;
    }catch(_){return false;}
  }

  window.GRANADA_CUBE_27={
    size:SIZE,center:CENTER,positions:SIZE**3,envelopes:13,
    weights:WEIGHTS,index27:INDEX_27,poemRoute:POEM_ROUTE,languages:LANGUAGES,traces:TRACE_SUMMARY,
    countryAtIndex,poemPoint,mirrorPoint,envelope,cubeMeta,scoresFor,chooseLanguageReward,translate,speak,usage
  };
})();