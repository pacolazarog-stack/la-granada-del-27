/* CUBO 27 ENGINE · navegación determinista tipo ATLAS */

export function createAtlasEngine({cube,traces=null,relations=null}={}){
  if(!cube)throw new TypeError('cube es obligatorio');
  let state=cube.centerPoint();
  const listeners=new Set();

  const snapshot=()=>{
    const meta=cube.meta(state);
    return Object.freeze({
      point:Object.freeze({...state}),
      meta,
      traceHits:traces?traces.tracesAt(state):[],
      relationBundle:relations?relations.relationsAt(state):null
    });
  };

  const emit=()=>{
    const snap=snapshot();
    listeners.forEach(fn=>fn(snap));
    return snap;
  };

  function goTo(x,y,z){state=cube.assertPoint({x,y,z});return emit();}
  function goCenter(){state=cube.centerPoint();return emit();}
  function setAxis(axis,value){
    axis=String(axis||'').toLowerCase();
    if(!['x','y','z'].includes(axis))throw new RangeError('axis debe ser x, y o z');
    return goTo(axis==='x'?value:state.x,axis==='y'?value:state.y,axis==='z'?value:state.z);
  }
  function goMirror(){const m=cube.mirror(state);return goTo(m.x,m.y,m.z);}
  function random(rng=Math.random){const p=cube.randomPoint(rng);return goTo(p.x,p.y,p.z);}
  function subscribe(fn){
    if(typeof fn!=='function')throw new TypeError('listener debe ser función');
    listeners.add(fn);fn(snapshot());
    return ()=>listeners.delete(fn);
  }

  return Object.freeze({snapshot,goTo,goCenter,setAxis,goMirror,random,subscribe});
}
