/* CUBO 27 ENGINE · adaptador geométrico para render 3D */

export function createGeometryAdapter({cube,spacing=1,invertY=false}={}){
  if(!cube)throw new TypeError('cube es obligatorio');
  spacing=Number(spacing);
  if(!Number.isFinite(spacing)||spacing<=0)throw new RangeError('spacing debe ser > 0');

  const c=cube.center,extent=cube.maxEnvelope||1;

  function toWorld(point){
    const p=cube.assertPoint(point);
    return Object.freeze({
      x:(p.x-c)*spacing,
      y:(invertY?c-p.y:p.y-c)*spacing,
      z:(p.z-c)*spacing
    });
  }

  function toNormalized(point){
    const p=cube.assertPoint(point);
    return Object.freeze({
      x:(p.x-c)/extent,
      y:(invertY?c-p.y:p.y-c)/extent,
      z:(p.z-c)/extent
    });
  }

  function layer(z){
    z=Number(z);
    if(!Number.isInteger(z)||z<1||z>cube.size)throw new RangeError('z fuera de rango');
    const out=[];
    for(let x=1;x<=cube.size;x++)for(let y=1;y<=cube.size;y++){
      const point={x,y,z};out.push({point,world:toWorld(point),normalized:toNormalized(point),cell:cube.cell(x,y)});
    }
    return out;
  }

  function envelope(k){
    k=Number(k);
    if(!Number.isInteger(k)||k<0||k>cube.maxEnvelope)throw new RangeError('k fuera de rango');
    const out=[];
    for(const point of cube.everyPoint())if(cube.envelope(point)===k){
      out.push({point,world:toWorld(point),normalized:toNormalized(point)});
    }
    return out;
  }

  function traceVertices(traceEngine,name){
    const trace=traceEngine?.get?.(name);
    if(!trace)return [];
    return trace.nodes.map((node,i)=>({
      step:i+1,
      point:{x:node.x,y:node.y,z:node.z},
      world:toWorld(node),
      normalized:toNormalized(node),
      metadata:node
    }));
  }

  function mirrorSegment(point){
    const p=cube.assertPoint(point),m=cube.mirror(p);
    return Object.freeze({
      from:{point:p,world:toWorld(p),normalized:toNormalized(p)},
      to:{point:m,world:toWorld(m),normalized:toNormalized(m)}
    });
  }

  function axisLine(axis,a,b){
    axis=String(axis||'').toLowerCase();
    if(!['x','y','z'].includes(axis))throw new RangeError('axis debe ser x, y o z');
    const points=[];
    for(let i=1;i<=cube.size;i++){
      const p=axis==='x'?{x:i,y:a,z:b}:axis==='y'?{x:a,y:i,z:b}:{x:a,y:b,z:i};
      cube.assertPoint(p);points.push({point:p,world:toWorld(p),normalized:toNormalized(p)});
    }
    return points;
  }

  const bounds=Object.freeze({
    min:-cube.maxEnvelope*spacing,
    max:cube.maxEnvelope*spacing,
    side:(cube.size-1)*spacing
  });

  return Object.freeze({toWorld,toNormalized,layer,envelope,traceVertices,mirrorSegment,axisLine,bounds,spacing,invertY});
}
