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
    mirror:ontology.mirrorMeaning(point,meta.mirror)
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
    return Object.freeze({
      point:p,
      meta:cube.meta(p),
      semantics:ontology.pointSemantics(p),
      relations:relations.relationsAt(p)
    });
  }

  return Object.freeze({
    cube,traces,relations,atlas,chance,geometry,ontology,
    horizon,
    inspect,
    inspectHorizon:()=>horizon
  });
}

/*
Ejemplo de uso:

const machine=createMuseumShadowsMachine({
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

machine.atlas.goCenter();
const apparition=machine.chance.roll();
const worldPoint=machine.geometry.toWorld(apparition.point);
const state=machine.inspect(apparition.point);

// X = MATERIALIDAD
// Y = INSCRIPCIÓN
// Z = PROFUNDIDAD DE SOMBRA
// ROOM_ZERO permanece fuera del cubo.
*/
