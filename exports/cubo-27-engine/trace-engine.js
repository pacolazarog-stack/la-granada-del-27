/* CUBO 27 ENGINE · trazas reutilizables */

export function createTraceEngine({cube}={}){
  if(!cube)throw new TypeError('cube es obligatorio');
  const traces=new Map();
  const allowed=new Set(['exact','partial','declarative']);

  const normalizeNode=(node,index)=>{
    const point=cube.assertPoint(node);
    return Object.freeze({...node,...point,index:index+1});
  };

  function register(name,definition={}){
    if(!name)throw new TypeError('nombre de traza obligatorio');
    const status=definition.status||'exact';
    if(!allowed.has(status))throw new RangeError('status debe ser exact, partial o declarative');
    const nodes=(definition.nodes||[]).map(normalizeNode);
    if(status==='exact'&&definition.requireFull!==false&&nodes.length!==cube.size){
      throw new Error(`la traza exacta ${name} debe tener ${cube.size} nodos`);
    }
    const trace=Object.freeze({
      name,
      status,
      nodes:Object.freeze(nodes),
      metadata:Object.freeze({...definition.metadata}),
      resolver:typeof definition.resolver==='function'?definition.resolver:null
    });
    traces.set(name,trace);
    return trace;
  }

  const get=name=>traces.get(name)||null;
  const list=()=>[...traces.values()];
  const unregister=name=>traces.delete(name);

  function pointAt(name,step){
    const trace=get(name);
    if(!trace)return null;
    if(trace.resolver)return cube.assertPoint(trace.resolver(step,{cube,trace}));
    const i=Number(step)-1;
    return Number.isInteger(i)&&i>=0&&i<trace.nodes.length?trace.nodes[i]:null;
  }

  function tracesAt(point){
    const p=cube.assertPoint(point),hits=[];
    for(const trace of traces.values()){
      trace.nodes.forEach((node,i)=>{
        if(node.x===p.x&&node.y===p.y&&node.z===p.z)hits.push({trace:trace.name,status:trace.status,step:i+1,node});
      });
    }
    return hits;
  }

  function validate(name){
    const trace=get(name);
    if(!trace)return {ok:false,errors:['traza inexistente']};
    const errors=[];
    trace.nodes.forEach((n,i)=>{if(!cube.inBounds(n))errors.push(`nodo ${i+1} fuera del cubo`);});
    if(trace.status==='exact'&&trace.nodes.length!==cube.size)errors.push(`ruta exacta incompleta: ${trace.nodes.length}/${cube.size}`);
    return {ok:errors.length===0,errors,trace};
  }

  return Object.freeze({register,get,list,unregister,pointAt,tracesAt,validate});
}
