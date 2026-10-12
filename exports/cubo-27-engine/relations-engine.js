/* CUBO 27 ENGINE · relaciones enchufables */

export function createRelationsEngine({cube,traces=null}={}){
  if(!cube)throw new TypeError('cube es obligatorio');
  const providers=new Map();

  function register(name,provider){
    if(!name||typeof provider!=='function')throw new TypeError('nombre y provider son obligatorios');
    providers.set(name,provider);
    return api;
  }

  function unregister(name){providers.delete(name);}

  function relationsAt(point,context={}){
    const meta=cube.meta(point);
    const out=[
      {type:'CENTER',active:meta.isCenter,value:meta.isCenter?cube.centerPoint():null},
      {type:'MIRROR',active:true,value:meta.mirror},
      {type:'ENVELOPE',active:true,value:{k:meta.envelope,side:meta.envelopeSide}},
      {type:'NEIGHBORS',active:true,value:meta.neighbors},
      {type:'SUBSTRATE_CELL',active:meta.cell!==undefined,value:meta.cell}
    ];

    if(traces){
      const hits=traces.tracesAt(meta);
      out.push({type:'TRACES',active:hits.length>0,value:hits});
    }

    for(const [name,provider] of providers){
      const value=provider({point:{x:meta.x,y:meta.y,z:meta.z},meta,cube,traces,context});
      if(value===undefined||value===null)continue;
      if(Array.isArray(value))value.forEach(v=>out.push({type:name,active:true,value:v}));
      else out.push({type:name,active:true,value});
    }

    return Object.freeze({
      point:Object.freeze({x:meta.x,y:meta.y,z:meta.z}),
      meta,
      relations:Object.freeze(out),
      total:out.length
    });
  }

  const api=Object.freeze({register,unregister,relationsAt,listProviders:()=>[...providers.keys()]});
  return api;
}
