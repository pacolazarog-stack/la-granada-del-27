/* EL INVENTARIO DE LAS SOMBRAS · ontología canónica del museo 27³ */

export const MUSEUM_RELATION_TYPES=Object.freeze([
  'ECO',
  'CONTRADICCION',
  'SUSTITUCION',
  'PROCEDENCIA',
  'TESTIMONIO',
  'BORRADO',
  'ERROR',
  'ESPEJO',
  'CONTAGIO',
  'AUSENCIA',
  'REAPARICION',
  'DUPLICADO',
  'SOMBRA'
]);

export const MUSEUM_AXES=Object.freeze({
  x:Object.freeze({
    key:'MATERIALIDAD',
    title:'Materialidad',
    low:'casi ninguna presencia física',
    high:'presencia material máxima'
  }),
  y:Object.freeze({
    key:'INSCRIPCION',
    title:'Inscripción',
    low:'apenas documentado',
    high:'exhaustivamente registrado'
  }),
  z:Object.freeze({
    key:'PROFUNDIDAD_DE_SOMBRA',
    title:'Profundidad de sombra',
    low:'casi presente',
    high:'casi irrecuperable'
  })
});

const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));

export function createMuseumOntology({size=27}={}){
  size=Number(size);
  if(!Number.isInteger(size)||size<3||size%2===0)throw new RangeError('size debe ser impar y >= 3');
  const center=(size+1)/2;
  const maxEnvelope=center-1;

  const level=n=>clamp((Number(n)-1)/(size-1),0,1);

  function shadowBand(z){
    const p=level(z);
    if(p<.18)return 'PRESENTE';
    if(p<.38)return 'ATENUADO';
    if(p<.58)return 'DOCUMENTAL';
    if(p<.77)return 'INDIRECTO';
    if(p<.94)return 'RESIDUAL';
    return 'UMBRAL_DE_LO_REPRESENTABLE';
  }

  function pointSemantics(point){
    const {x,y,z}=point||{};
    for(const [name,value] of Object.entries({x,y,z})){
      if(!Number.isInteger(value)||value<1||value>size)throw new RangeError(`${name} fuera de rango`);
    }
    const envelope=Math.max(Math.abs(x-center),Math.abs(y-center),Math.abs(z-center));
    return Object.freeze({
      point:Object.freeze({x,y,z}),
      materiality:Object.freeze({level:x,normalized:level(x),axis:MUSEUM_AXES.x}),
      inscription:Object.freeze({level:y,normalized:level(y),axis:MUSEUM_AXES.y}),
      shadowDepth:Object.freeze({level:z,normalized:level(z),band:shadowBand(z),axis:MUSEUM_AXES.z}),
      isCenter:x===center&&y===center&&z===center,
      centerMeaning:'Punto de máxima ambigüedad: materia, inscripción y olvido en equilibrio.',
      envelope,
      resonance:1-(envelope/maxEnvelope),
      certaintyDistance:envelope
    });
  }

  function projectZ(z,{point,context={}}={}){
    const semantics=pointSemantics(point||{x:center,y:center,z});
    return Object.freeze({
      point:{...semantics.point},
      value:Object.freeze({
        depth:z,
        normalized:semantics.shadowDepth.normalized,
        band:semantics.shadowDepth.band,
        meaning:MUSEUM_AXES.z.title,
        context
      }),
      metadata:Object.freeze({semantics})
    });
  }

  function mirrorMeaning(point,mirror){
    return Object.freeze({
      from:{...point},
      to:{...mirror},
      assertion:'lo que el museo afirma',
      counterreading:'lo que la misma evidencia permite afirmar al revés'
    });
  }

  const roomZero=Object.freeze({
    id:'ROOM_ZERO',
    title:'LA HABITACIÓN NÚMERO CERO',
    kind:'horizon',
    insideCube:false,
    coordinate:null,
    meaning:'Aquello de lo que ya no queda siquiera la posibilidad de decir que se perdió.',
    rule:'No es z=0, z=28, una capa adicional ni un final cronológico.'
  });

  return Object.freeze({
    size,
    center,
    maxEnvelope,
    axes:MUSEUM_AXES,
    relationTypes:MUSEUM_RELATION_TYPES,
    roomZero,
    level,
    shadowBand,
    pointSemantics,
    projectZ,
    mirrorMeaning
  });
}
