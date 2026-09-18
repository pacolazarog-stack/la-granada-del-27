import fs from 'node:fs';
import vm from 'node:vm';

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
for(const file of ['language-packs.js','language-system.js','audio-gate.js','voice-reader.js']){
  new Function(fs.readFileSync(file,'utf8'));
}

const sandbox={window:{}};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('language-packs.js','utf8'),sandbox,{filename:'language-packs.js'});
const packs=sandbox.window.POETICA_LANGUAGE_PACKS;
assert(packs&&Object.keys(packs).length>=25,'el pack inicial debe contener traducciones autorales de entrada e interfaz');
for(const lang of ['en','fr','it','de']){
  assert(packs['POÉTICA DEL LÍMITE']?.[lang],'falta título raíz en '+lang);
  assert(packs['La terraza del Miramar']?.[lang],'falta Miramar en '+lang);
  assert(packs['La poética del archivo']?.[lang],'falta ensayo en '+lang);
}



/* Primera versión literaria completa de LIBRO I · 1927 */
for(const file of ['language-granada-1927-a.js','language-granada-1927-b.js','language-granada-1927-c.js','language-granada-2027-a.js','language-granada-2027-b.js','language-granada-2027-c.js','language-cosiendo-europa-a.js','language-cosiendo-europa-b.js','language-cosiendo-europa-c.js','language-cosiendo-europa-d.js','language-cosiendo-europa-e.js']){
  new Function(fs.readFileSync(file,'utf8'));
  vm.runInContext(fs.readFileSync(file,'utf8'),sandbox,{filename:file});
}
const literary=sandbox.window.POETICA_LANGUAGE_PACKS;
const cleanLine=raw=>String(raw||'')
  .replace(/\s{2,}$/,'')
  .replace(/^>\s?/,'')
  .replace(/^\s*#{1,3}\s+/,'')
  .replace(/\*\*/g,'')
  .replace(/^\*|\*$/g,'')
  .trimEnd();
const source1927=fs.readFileSync('texto-canonico/01_LIBRO_I_1927.md','utf8')
  .replace(/\r/g,'')
  .split('\n')
  .map(cleanLine)
  .filter(Boolean);
const unique1927=[...new Set(source1927)];
for(const line of unique1927){
  assert(literary[line],'falta traducción literaria para: '+line);
  for(const lang of ['en','fr','it','de'])assert(literary[line][lang],'falta '+lang+' para: '+line);
}


const source2027=fs.readFileSync('texto-canonico/02_LIBRO_I_2027.md','utf8')
  .replace(/\r/g,'')
  .split('\n')
  .map(cleanLine)
  .filter(Boolean);
const unique2027=[...new Set(source2027)];
for(const line of unique2027){
  assert(literary[line],'falta traducción literaria Libro I 2027 para: '+line);
  for(const lang of ['en','fr','it','de'])assert(literary[line][lang],'falta '+lang+' en Libro I 2027 para: '+line);
}



const sourceAguaTierras=fs.readFileSync('texto-canonico/03_LIBRO_II_AGUA_TIERRAS.md','utf8')
  .replace(/\r/g,'')
  .split('\n')
  .map(cleanLine)
  .filter(Boolean);
const uniqueAguaTierras=[...new Set(sourceAguaTierras)];
for(const line of uniqueAguaTierras){
  assert(literary[line],'falta traducción literaria Cosiendo Europa I-II para: '+line);
  for(const lang of ['en','fr','it','de'])assert(literary[line][lang],'falta '+lang+' en Cosiendo Europa I-II para: '+line);
}



const sourceManosCosturas=fs.readFileSync('texto-canonico/04_LIBRO_II_MANOS_COSTURAS.md','utf8')
  .replace(/\r/g,'')
  .split('\n')
  .map(cleanLine)
  .filter(Boolean);
const uniqueManosCosturas=[...new Set(sourceManosCosturas)];
for(const line of uniqueManosCosturas){
  assert(literary[line],'falta traducción literaria Cosiendo Europa III-IV para: '+line);
  for(const lang of ['en','fr','it','de'])assert(literary[line][lang],'falta '+lang+' en Cosiendo Europa III-IV para: '+line);
}

const sourceRegreso=fs.readFileSync('texto-canonico/05_LIBRO_II_REGRESO.md','utf8')
  .replace(/\r/g,'')
  .split('\n')
  .map(cleanLine)
  .filter(Boolean);
const uniqueRegreso=[...new Set(sourceRegreso)];
for(const line of uniqueRegreso){
  assert(literary[line],'falta traducción literaria Cosiendo Europa V para: '+line);
  for(const lang of ['en','fr','it','de'])assert(literary[line][lang],'falta '+lang+' en Cosiendo Europa V para: '+line);
}

const sourceBack=fs.readFileSync('texto-canonico/06_CONTRAPORTADA.md','utf8')
  .replace(/\r/g,'')
  .split('\n')
  .map(cleanLine)
  .filter(Boolean)
  .filter(line=>line!=='flag');
const uniqueBack=[...new Set(sourceBack)];
for(const line of uniqueBack){
  assert(literary[line],'falta traducción literaria de contraportada para: '+line);
  for(const lang of ['en','fr','it','de'])assert(literary[line][lang],'falta '+lang+' en contraportada para: '+line);
}

const granadaHtml=fs.readFileSync('granada.html','utf8');
for(const file of ['language-granada-1927-a.js','language-granada-1927-b.js','language-granada-1927-c.js','language-granada-2027-a.js','language-granada-2027-b.js','language-granada-2027-c.js','language-cosiendo-europa-a.js','language-cosiendo-europa-b.js','language-cosiendo-europa-c.js','language-cosiendo-europa-d.js','language-cosiendo-europa-e.js'])
  assert(granadaHtml.includes(file),'granada.html no carga '+file);



/* Paco Olmo · bloque literario inicial */
const pacoSandbox={window:{}};
vm.createContext(pacoSandbox);
for(const file of ['paco-pages-en-a.js','paco-pages-fr-a.js','paco-pages-it-a.js','paco-pages-de-a.js','paco-pages-b.js','paco-pages-en-b.js','paco-pages-fr-b.js','paco-pages-it-b.js','paco-pages-de-b.js','paco-pages-c.js']){
  new Function(fs.readFileSync(file,'utf8'));
  vm.runInContext(fs.readFileSync(file,'utf8'),pacoSandbox,{filename:file});
}
const pacoTranslations=pacoSandbox.window.WORK_PAGE_TRANSLATIONS;
for(const lang of ['en','fr','it','de']){
  assert(Array.isArray(pacoTranslations?.[lang]),'falta array Paco '+lang);
  for(let i=0;i<=23;i++) assert(typeof pacoTranslations[lang][i]==='string'&&pacoTranslations[lang][i].trim(),'falta Paco página '+(i+1)+' en '+lang);
}
const pacoHtml=fs.readFileSync('paco.html','utf8');
for(const file of ['paco-pages-en-a.js','paco-pages-fr-a.js','paco-pages-it-a.js','paco-pages-de-a.js','paco-pages-b.js','paco-pages-en-b.js','paco-pages-fr-b.js','paco-pages-it-b.js','paco-pages-de-b.js','paco-pages-c.js'])
  assert(pacoHtml.includes(file),'paco.html no carga '+file);
const lector=fs.readFileSync('lector.js','utf8');
assert(lector.includes('WORK_PAGE_TRANSLATIONS'),'lector.js debe priorizar traducciones literarias por página');
assert(lector.includes('volume:languagechange'),'lector.js debe rerenderizar al cambiar de lengua');

const sys=fs.readFileSync('language-system.js','utf8');
for(const lang of ['es','en','fr','it','de'])assert(sys.includes("code:'"+lang+"'"),'falta idioma '+lang);
assert(sys.includes("KEY='poeticaLanguage'"),'la lengua debe persistir');
assert(sys.includes('volume:languagechange'),'debe existir evento global de cambio');
assert(sys.includes('MutationObserver'),'el idioma debe alcanzar contenido renderizado dinámicamente');
assert(sys.includes('Translator'),'debe existir traducción completa bajo demanda');

const mainPages=['index.html','granada.html','atlas.html','paco.html','miramar.html','ensayo.html','final.html','autor.html','fli.html'];
for(const page of mainPages){
  const html=fs.readFileSync(page,'utf8');
  assert(html.includes('language-packs.js'),'falta language-packs.js en '+page);
  assert(html.includes('language-system.js'),'falta language-system.js en '+page);
}
const index=fs.readFileSync('index.html','utf8');
assert(index.indexOf('language-system.js')<index.indexOf('audio-gate.js'),'el idioma debe cargarse antes del umbral sonoro');

const gate=fs.readFileSync('audio-gate.js','utf8');
assert(gate.includes('languageReady'),'el acceso debe depender de una lengua elegida');
assert(gate.includes('volume:languagechange'),'la selección de lengua debe poder iniciar/reanudar el preludio');
assert(gate.includes('IDIOMA PENDIENTE'),'el volumen debe permanecer bloqueado sin idioma');

const voice=fs.readFileSync('voice-reader.js','utf8');
assert(voice.includes('voiceLang'),'la voz debe seguir el idioma');
assert(voice.includes('voiceTag'),'la síntesis debe usar BCP-47 del idioma');
assert(voice.includes('poetica:languageapplied'),'la voz debe refrescarse al cambiar idioma');

console.log('OK · ES / EN / FR / IT / DE');
console.log('OK · elección inicial durante preludio obligatorio');
console.log('OK · cambio de idioma permanente en 9 superficies principales');
console.log('OK · texto dinámico + voz siguen el idioma seleccionado');
console.log(`OK · Granada 1927: ${unique1927.length} unidades literarias × 4 lenguas revisadas`);
console.log(`OK · Granada 2027 + epílogo: ${unique2027.length} unidades literarias × 4 lenguas revisadas`);
console.log(`OK · Cosiendo Europa I-II: ${uniqueAguaTierras.length} unidades literarias × 4 lenguas revisadas`);
console.log(`OK · Cosiendo Europa III-IV: ${uniqueManosCosturas.length} unidades literarias × 4 lenguas revisadas`);
console.log(`OK · Cosiendo Europa V: ${uniqueRegreso.length} unidades literarias × 4 lenguas revisadas`);
console.log(`OK · Contraportada: ${uniqueBack.length} unidades literarias × 4 lenguas revisadas`);
console.log('OK · Paco Olmo: páginas 1–24 × EN/FR/IT/DE en versión literaria');
