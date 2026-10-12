/* CUBO 27 ENGINE · núcleo geométrico neutro
   Extraído de La Granada del 27 · 13/10/2026 */

const asInt=(value,name)=>{
  const n=Number(value);
  if(!Number.isInteger(n))throw new TypeError(`${name} debe ser entero`);
  return n;
};

export function createCubeEngine(options={}){
  const size=asInt(options.size??27,'size');
  if(size<3||size%2===0)throw new RangeError('size debe ser impar y >= 3');

  const center=(size+1)/2;
  const maxEnvelope=center-1;
  const substrate=options.substrate||null;
  const metadataProvider=typeof options.metadataProvider==='function'?options.metadataProvider:null;
  const mirrorFn=typeof options.mirror==='function'
    ? options.mirror
    : ({x,y,z})=>({x:y,y:x,z:size+1-z});

  const inBounds=({x,y,z})=>
    Number.isInteger(x)&&Number.isInteger(y)&&Number.isInteger(z)&&
    x>=1&&x<=size&&y>=1&&y<=size&&z>=1&&z<=size;

  const assertPoint=(point)=>{
    const p={x:asInt(point?.x,'x'),y:asInt(point?.y,'y'),z:asInt(point?.z,'z')};
    if(!inBounds(p))throw new RangeError(`coordenada fuera del cubo: ${p.x},${p.y},${p.z}`);
    return p;
  };

  const centerPoint=()=>({x:center,y:center,z:center});

  const envelope=(point)=>{
    const {x,y,z}=assertPoint(point);
    return Math.max(Math.abs(x-center),Math.abs(y-center),Math.abs(z-center));
  };

  const shellSide=k=>{
    k=asInt(k,'k');
    if(k<0||k>maxEnvelope)throw new RangeError('envolvente fuera de rango');
    return 2*k+1;
  };

  const shellPopulation=k=>{
    k=asInt(k,'k');
    if(k<0||k>maxEnvelope)throw new RangeError('envolvente fuera de rango');
    if(k===0)return 1;
    return (2*k+1)**3-(2*k-1)**3;
  };

  const mirror=(point)=>{
    const p=assertPoint(point);
    const m=mirrorFn({...p,size,center});
    return assertPoint(m);
  };

  const isMirrorFixed=(point)=>{
    const p=assertPoint(point),m=mirror(p);
    return p.x===m.x&&p.y===m.y&&p.z===m.z;
  };

  const isCenter=(point)=>{
    const p=assertPoint(point);
    return p.x===center&&p.y===center&&p.z===center;
  };

  const cell=(x,y)=>{
    x=asInt(x,'x');y=asInt(y,'y');
    if(x<1||x>size||y<1||y>size)throw new RangeError('celda XY fuera de rango');
    if(!substrate)return undefined;
    if(typeof substrate.get==='function')return substrate.get(x,y);
    if(Array.isArray(substrate))return substrate[y-1]?.[x-1];
    return undefined;
  };

  const neighbors=(point)=>{
    const p=assertPoint(point);
    return [
      {x:p.x-1,y:p.y,z:p.z,axis:'X-',delta:-1},
      {x:p.x+1,y:p.y,z:p.z,axis:'X+',delta:1},
      {x:p.x,y:p.y-1,z:p.z,axis:'Y-',delta:-1},
      {x:p.x,y:p.y+1,z:p.z,axis:'Y+',delta:1},
      {x:p.x,y:p.y,z:p.z-1,axis:'Z-',delta:-1},
      {x:p.x,y:p.y,z:p.z+1,axis:'Z+',delta:1}
    ].filter(q=>inBounds(q));
  };

  const randomPoint=(rng=Math.random)=>({
    x:Math.floor(rng()*size)+1,
    y:Math.floor(rng()*size)+1,
    z:Math.floor(rng()*size)+1
  });

  const meta=(point)=>{
    const p=assertPoint(point);
    const k=envelope(p);
    const base={
      ...p,
      size,
      center,
      positions:size**3,
      substrateCells:size**2,
      envelope:k,
      envelopeSide:shellSide(k),
      mirror:mirror(p),
      mirrorFixed:isMirrorFixed(p),
      isCenter:isCenter(p),
      cell:cell(p.x,p.y),
      neighbors:neighbors(p)
    };
    const extra=metadataProvider?metadataProvider({...base}):null;
    return extra&&typeof extra==='object'?{...base,...extra}:base;
  };

  const everyPoint=function*(){
    for(let x=1;x<=size;x++)for(let y=1;y<=size;y++)for(let z=1;z<=size;z++)yield {x,y,z};
  };

  const everyCell=function*(){
    for(let x=1;x<=size;x++)for(let y=1;y<=size;y++)yield {x,y,value:cell(x,y)};
  };

  return Object.freeze({
    size,center,maxEnvelope,
    positions:size**3,
    substrateCells:size**2,
    inBounds,assertPoint,centerPoint,envelope,shellSide,shellPopulation,
    mirror,isMirrorFixed,isCenter,cell,neighbors,randomPoint,meta,everyPoint,everyCell
  });
}
