/* EL INVENTARIO DE LAS SOMBRAS · adaptador inicial del motor 27³
   Este archivo NO fija todavía la semántica definitiva de los ejes. */

import {createCubeEngine} from './cube-engine.js';
import {createTraceEngine} from './trace-engine.js';
import {createRelationsEngine} from './relations-engine.js';
import {createAtlasEngine} from './atlas-engine.js';
import {createChanceEngine} from './chance-engine.js';

export function createMuseumShadowsMachine({
  inventory,
  metadataProvider=null,
  traces:traceDefinitions=[],
  relationProviders=[],
  projectZ=null,
  rng,
  roomZero={
    id:'ROOM_ZERO',
    title:'LA HABITACIÓN NÚMERO CERO',
    kind:'horizon',
    insideCube:false
  }
}={}){
  if(!inventory)throw new TypeError('inventory es obligatorio');

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
    metadataProvider
  });

  const traces=createTraceEngine({cube});
  for(const def of traceDefinitions){
    traces.register(def.name,def);
  }

  const relations=createRelationsEngine({cube,traces});
  for(const def of relationProviders){
    relations.register(def.name,def.provider);
  }

  const atlas=createAtlasEngine({cube,traces,relations});
  const chance=createChanceEngine({cube,traces,relations,projectZ,rng});

  const horizon=Object.freeze({
    ...roomZero,
    insideCube:false,
    coordinate:null,
    note:'Umbral externo al cubo 27³: no es z=0, z=28 ni una capa cronológica.'
  });

  return Object.freeze({
    cube,traces,relations,atlas,chance,
    horizon,
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
  },
  projectZ(z,{point}){
    // La obra decidirá qué significa Z. Este ejemplo no impone cronología.
    return {point,value:{depth:z,origin:point}};
  }
});

machine.atlas.goCenter();
const apparition=machine.chance.roll();
*/
