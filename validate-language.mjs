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
for(const file of ['language-granada-1927-a.js','language-granada-1927-b.js','language-granada-1927-c.js','language-granada-2027-a.js','language-granada-2027-b.js','language-granada-2027-c.js']){
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

const granadaHtml=fs.readFileSync('granada.html','utf8');
for(const file of ['language-granada-1927-a.js','language-granada-1927-b.js','language-granada-1927-c.js','language-granada-2027-a.js','language-granada-2027-b.js','language-granada-2027-c.js'])
  assert(granadaHtml.includes(file),'granada.html no carga '+file);

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
