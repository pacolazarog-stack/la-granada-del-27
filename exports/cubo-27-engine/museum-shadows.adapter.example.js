/* EL INVENTARIO DE LAS SOMBRAS · adaptador canónico del motor 27³ */

import {createCubeEngine} from './cube-engine.js';
import {createTraceEngine} from './trace-engine.js';
import {createRelationsEngine} from './relations-engine.js';
import {createAtlasEngine} from './atlas-engine.js';
import {createChanceEngine} from './chance-engine.js';
import {createGeometryAdapter} from './geometry-adapter.js';
import {createMuseumOntology} from './museum-ontology.js';

export function createMuseumShadowsMachine({
  inventory,
  metadataProvider=null,
  traces:traceDefinitions=[],
  relationProviders=[],
  projectZ=null,
  rng,
  spacing=1,
  invertY=false,
  roomZero=null
}={}){
  if(!inventory)throw new TypeError('inventory es obligatorio');

  const ontology=createMuseumOntology({size:27});
  const architecture=Object.freeze({
    place:ontology.nomenclature.archive,
    machine:ontology.nomenclature.machine,
    core:ontology.nomenclature.resonator
  });

  const substrate={
    get(x,y){
      if(typeof inventory.get==='function')return inventory.get(x,y);
      if(Array.isArray(inventory))return inventory[y-1]?.[x-1];
      return undefined;
    }
  };

  const cube=createCubeEngine({
    size:27,
    substrate,
    metadataProvider(meta){
      const semantics=ontology.pointSemantics(meta);
      const custom=typeof metadataProvider==='function'?metadataProvider(meta):null;
      return Object.freeze({
        semantics,
        ...(custom&&typeof custom==='object'?custom:{})
      });
    }
  });

  const traces=createTraceEngine({cube});
  for(const def of traceDefinitions){
    traces.register(def.name,def);
  }

  const relations=createRelationsEngine({cube,traces});
  relations.register('MUSEUM_SEMANTICS',({point,meta})=>({
    axes:meta.semantics??ontology.pointSemantics(point),
    mirror:ontology.mirrorMeaning(point,meta.mirror),
    resonator:{
      ...ontology.nomenclature.resonator,
      intensity:(meta.semantics??ontology.pointSemantics(point)).resonance
    }
  }));
  for(const def of relationProviders){
    relations.register(def.name,def.provider);
  }

  const atlas=createAtlasEngine({cube,traces,relations});
  const chance=createChanceEngine({
    cube,
    traces,
    relations,
    projectZ:projectZ||ontology.projectZ,
    rng
  });
  const geometry=createGeometryAdapter({cube,spacing,invertY});

  const horizon=Object.freeze({
    ...ontology.roomZero,
    ...(roomZero&&typeof roomZero==='object'?roomZero:{}),
    insideCube:false,
    coordinate:null
  });

  function inspect(point){
    const p=cube.assertPoint(point);
    const semantics=ontology.pointSemantics(p);
    return Object.freeze({
      point:p,
      meta:cube.meta(p),
      semantics,
      resonator:Object.freeze({
        ...ontology.nomenclature.resonator,
        intensity:semantics.resonance
      }),
      relations:relations.relationsAt(p)
    });
  }

  return Object.freeze({
    cube,traces,relations,atlas,chance,geometry,ontology,
    architecture,
    archive:architecture.place,
    traceMachine:architecture.machine,
    resonator:architecture.core,
    horizon,
    inspect,
    inspectHorizon:()=>horizon
  });
}

/*
Ejemplo de uso:

const museum=createMuseumShadowsMachine({
  inventory,
  metadataProvider(meta){
    const item=meta.cell;
    return {
      objectId:item?.id??null,
      absence:item?.absence??null,
      room:item?.room??null
    };
  }
});

// EL ARCHIVO PROFUNDO → LA MÁQUINA DE LAS HUELLAS → EL RESONADOR
console.log(museum.archive.title);
console.log(museum.traceMachine.title);
console.log(museum.resonator.title);

museum.atlas.goCenter();
const apparition=museum.chance.roll();
const worldPoint=museum.geometry.toWorld(apparition.point);
const state=museum.inspect(apparition.point);

// X = MATERIALIDAD
// Y = INSCRIPCIÓN
// Z = PROFUNDIDAD DE SOMBRA
// ROOM_ZERO permanece fuera del cubo.
*/
