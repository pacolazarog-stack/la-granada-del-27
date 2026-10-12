/* CUBO 27 ENGINE · recorrido probabilístico tipo AZAR */

const defaultRng=()=>{
  if(globalThis.crypto?.getRandomValues){
    const a=new Uint32Array(1);globalThis.crypto.getRandomValues(a);return a[0]/4294967296;
  }
  return Math.random();
};

export function weightedChoice(items,{weight=x=>x.weight??1,rng=defaultRng}={}){
  if(!Array.isArray(items)||!items.length)return null;
  const weighted=items.map(item=>({item,w:Math.max(0,Number(weight(item))||0)}));
  const total=weighted.reduce((s,x)=>s+x.w,0);
  if(total<=0)return weighted[Math.floor(rng()*weighted.length)]?.item??null;
  let r=rng()*total;
  for(const x of weighted){r-=x.w;if(r<=0)return x.item;}
  return weighted.at(-1).item;
}

export function createChanceEngine({cube,traces=null,relations=null,projectZ=null,rng=defaultRng}={}){
  if(!cube)throw new TypeError('cube es obligatorio');

  const resolveZ=(point,context={})=>{
    if(typeof projectZ!=='function')return {point:{...point},value:cube.cell(point.x,point.y),metadata:null};
    const out=projectZ(point.z,{point:{...point},cube,traces,relations,context});
    if(out&&typeof out==='object'&&Number.isInteger(out.x)&&Number.isInteger(out.y)&&Number.isInteger(out.z)){
      const p=cube.assertPoint(out);
      return {point:p,value:out.value??cube.cell(p.x,p.y),metadata:out.metadata??null};
    }
    if(out&&typeof out==='object'&&out.point){
      const p=cube.assertPoint(out.point);
      return {point:p,value:out.value??cube.cell(p.x,p.y),metadata:out.metadata??null};
    }
    return {point:{...point},value:out,metadata:null};
  };

  function fourStep(point,context={}){
    const p=cube.assertPoint(point),c=cube.centerPoint(),z=resolveZ(p,context);
    return Object.freeze([
      Object.freeze({key:'X',point:{...p},value:cube.cell(p.x,p.y),role:'posición'}),
      Object.freeze({key:'Y',point:{x:p.y,y:p.x,z:p.z},value:cube.cell(p.y,p.x),role:'espejo XY'}),
      Object.freeze({key:'CENTER',point:c,value:cube.cell(c.x,c.y),role:'centro'}),
      Object.freeze({key:'Z',point:z.point,value:z.value,metadata:z.metadata,role:'profundidad/proyección'})
    ]);
  }

  function roll(context={}){
    const point=cube.randomPoint(rng),meta=cube.meta(point);
    return Object.freeze({
      point:Object.freeze(point),
      meta,
      mirror:Object.freeze(cube.mirror(point)),
      traceHits:traces?traces.tracesAt(point):[],
      relationBundle:relations?relations.relationsAt(point,context):null,
      sequence:fourStep(point,context)
    });
  }

  function rollOnEnvelope(k,context={}){
    k=Number(k);
    if(!Number.isInteger(k)||k<0||k>cube.maxEnvelope)throw new RangeError('envolvente fuera de rango');
    if(k===0){
      const point=cube.centerPoint();
      return Object.freeze({point,meta:cube.meta(point),mirror:cube.mirror(point),sequence:fourStep(point,context)});
    }
    let point;
    do{point=cube.randomPoint(rng);}while(cube.envelope(point)!==k);
    return Object.freeze({
      point,
      meta:cube.meta(point),
      mirror:cube.mirror(point),
      traceHits:traces?traces.tracesAt(point):[],
      relationBundle:relations?relations.relationsAt(point,context):null,
      sequence:fourStep(point,context)
    });
  }

  function chooseWeighted(candidates,options={}){
    return weightedChoice(candidates,{...options,rng:options.rng||rng});
  }

  return Object.freeze({roll,rollOnEnvelope,fourStep,chooseWeighted});
}
