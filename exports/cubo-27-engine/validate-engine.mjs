import {createCubeEngine} from './cube-engine.js';
import {createTraceEngine} from './trace-engine.js';
import {createRelationsEngine} from './relations-engine.js';
import {createAtlasEngine} from './atlas-engine.js';
import {createChanceEngine} from './chance-engine.js';
import {createGeometryAdapter} from './geometry-adapter.js';
import {createMuseumOntology,MUSEUM_AXES,MUSEUM_RELATION_TYPES} from './museum-ontology.js';
import {createMuseumShadowsMachine} from './museum-shadows.adapter.example.js';

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};

const substrate=Array.from({length:27},(_,y)=>
  Array.from({length:27},(_,x)=>`C${String(y+1).padStart(2,'0')}-${String(x+1).padStart(2,'0')}`)
);

const cube=createCubeEngine({size:27,substrate});
assert(cube.size===27,'size');
assert(cube.center===14,'center');
assert(cube.positions===19683,'positions');
assert(cube.substrateCells===729,'substrateCells');
assert(cube.maxEnvelope===13,'maxEnvelope');
assert(cube.cell(14,14)==='C14-14','substrate lookup');

let total=0;
for(let k=0;k<=13;k++)total+=cube.shellPopulation(k);
assert(total===19683,'las envolventes deben particionar todo el cubo');
assert(cube.shellPopulation(0)===1,'centro');
assert(cube.shellPopulation(13)===4058,'envolvente exterior');

let fixed=0,count=0;
for(const p of cube.everyPoint()){
  count++;
  const m=cube.mirror(p),back=cube.mirror(m);
  assert(back.x===p.x&&back.y===p.y&&back.z===p.z,'espejo no involutivo');
  if(cube.isMirrorFixed(p))fixed++;
}
assert(count===19683,'everyPoint');
assert(fixed===27,'27 puntos fijos del espejo');

const traces=createTraceEngine({cube});
const nodes=Array.from({length:27},(_,i)=>({x:i+1,y:28-(i+1),z:i+1}));
traces.register('TEST',{status:'exact',nodes});
assert(traces.validate('TEST').ok,'traza exacta');
assert(traces.pointAt('TEST',14).z===14,'pointAt');

const relations=createRelationsEngine({cube,traces});
relations.register('TEST_REL',({meta})=>({mirrorFixed:meta.mirrorFixed}));
const rel=relations.relationsAt({x:14,y:14,z:14});
assert(rel.total>=6,'relaciones base + plugin');

const atlas=createAtlasEngine({cube,traces,relations});
assert(atlas.snapshot().meta.isCenter,'Atlas debe iniciar en el centro');
atlas.goTo(1,27,14);
assert(atlas.snapshot().point.x===1&&atlas.snapshot().point.y===27,'Atlas goTo');
atlas.goMirror();
assert(atlas.snapshot().point.x===27&&atlas.snapshot().point.y===1&&atlas.snapshot().point.z===14,'Atlas mirror');

const deterministic=()=>0;
const chance=createChanceEngine({cube,traces,relations,rng:deterministic});
const hit=chance.roll();
assert(hit.point.x===1&&hit.point.y===1&&hit.point.z===1,'Azar determinista');
assert(hit.sequence.map(x=>x.key).join('>')==='X>Y>CENTER>Z','secuencia de cuatro tiempos');
assert(hit.sequence[2].point.x===14&&hit.sequence[2].point.y===14&&hit.sequence[2].point.z===14,'CENTRO en secuencia');

const geometry=createGeometryAdapter({cube,spacing:2});
const centerWorld=geometry.toWorld({x:14,y:14,z:14});
assert(centerWorld.x===0&&centerWorld.y===0&&centerWorld.z===0,'centro world');
const corner=geometry.toNormalized({x:27,y:27,z:27});
assert(corner.x===1&&corner.y===1&&corner.z===1,'normalización 3D');
assert(geometry.layer(14).length===729,'cada capa Z debe contener 729 posiciones XY');
assert(geometry.envelope(13).length===4058,'adaptador 3D debe materializar la envolvente exterior');
assert(geometry.traceVertices(traces,'TEST').length===27,'traza renderizable');
const segment=geometry.mirrorSegment({x:3,y:21,z:13});
assert(segment.to.point.x===21&&segment.to.point.y===3&&segment.to.point.z===15,'segmento espejo 3D');

const ontology=createMuseumOntology();
assert(MUSEUM_AXES.x.key==='MATERIALIDAD','X = materialidad');
assert(MUSEUM_AXES.y.key==='INSCRIPCION','Y = inscripción');
assert(MUSEUM_AXES.z.key==='PROFUNDIDAD_DE_SOMBRA','Z = profundidad de sombra');
assert(MUSEUM_RELATION_TYPES.length===13,'vocabulario inicial de 13 relaciones');
const centerMeaning=ontology.pointSemantics({x:14,y:14,z:14});
assert(centerMeaning.isCenter,'centro ontológico');
assert(centerMeaning.resonance===1,'resonancia máxima en el centro');
assert(ontology.pointSemantics({x:1,y:1,z:1}).shadowDepth.band==='PRESENTE','Z1 casi presente');
assert(ontology.pointSemantics({x:27,y:27,z:27}).shadowDepth.band==='UMBRAL_DE_LO_REPRESENTABLE','Z27 umbral representable');
assert(ontology.roomZero.coordinate===null&&!ontology.roomZero.insideCube,'Habitación Número Cero externa');

const museum=createMuseumShadowsMachine({inventory:substrate,rng:deterministic});
assert(museum.cube.positions===19683,'museo reutiliza cubo íntegro');
assert(museum.ontology.axes.x.key==='MATERIALIDAD','museo expone ontología');
assert(museum.horizon.insideCube===false,'Habitación Número Cero debe quedar fuera del cubo');
assert(museum.horizon.coordinate===null,'Habitación Número Cero no recibe coordenada');
const museumCenter=museum.inspect({x:14,y:14,z:14});
assert(museumCenter.semantics.isCenter,'inspect devuelve semántica del centro');
assert(museumCenter.relations.relations.some(r=>r.type==='MUSEUM_SEMANTICS'),'relación semántica canónica');
const museumChance=museum.chance.roll();
assert(museumChance.sequence[3].metadata?.semantics?.shadowDepth?.level===1,'AZAR proyecta Z como profundidad de sombra');

console.log('OK · motor neutro 27³');
console.log('OK · 729 celdas → 19.683 posiciones');
console.log('OK · 13 envolventes · espejo involutivo · 27 puntos fijos');
console.log('OK · trazas · relaciones · Atlas · Azar');
console.log('OK · geometría renderizable 3D · capas · envolventes · trazas · espejo');
console.log('OK · ontología museo: X materialidad · Y inscripción · Z profundidad de sombra');
console.log('OK · centro ambiguo · 13 relaciones · Habitación Número Cero fuera del cubo');
