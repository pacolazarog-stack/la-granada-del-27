# CUBO 27 ENGINE · EXPORTACIÓN NEUTRA

Motor tridimensional extraído de la arquitectura de **La Granada del 27** para ser reutilizado en otras obras.

## Principio

Este paquete separa estrictamente **maquinaria** y **contenido**.

La maquinaria conserva:

- cubo impar configurable, por defecto **27 × 27 × 27 = 19.683 posiciones**;
- centro geométrico único, por defecto **(14,14,14)**;
- sustrato bidimensional **27 × 27 = 729 celdas**;
- tercera coordenada Z como profundidad relacional, no como duplicación de 729 textos;
- envolventes concéntricas `k = max(|x-c|, |y-c|, |z-c|)`;
- espejo tridimensional por defecto `M(x,y,z)=(y,x,N+1-z)`;
- puntos fijos del espejo;
- trazas exactas, parciales o declarativas;
- proveedores de relaciones enchufables;
- navegación determinista tipo **ATLAS**;
- recorrido probabilístico tipo **AZAR**;
- recorrido de cuatro tiempos configurable, heredado como `X → Y → CENTRO → Z`;
- selección ponderada reutilizable;
- validación automática de invariantes geométricos.

No se exportan como núcleo:

- poemas de Granada;
- países de la UE;
- ruta POEMA;
- lista de 27 lenguas;
- escrituras relacionales granadinas;
- estilos o textos editoriales de `atlas.html`.

Esos elementos son **adaptadores de contenido**, no arquitectura.

---

## Archivos

- `cube-engine.js` — núcleo geométrico 3D.
- `atlas-engine.js` — navegación y lectura determinista.
- `chance-engine.js` — azar, recorrido de cuatro tiempos y elección ponderada.
- `relations-engine.js` — registro de relaciones enchufables.
- `trace-engine.js` — trazas exactas/parciales/declarativas.
- `museum-shadows.adapter.example.js` — adaptador inicial para **El inventario de las sombras**.
- `validate-engine.mjs` — invariantes del motor.
- `MIGRATION.md` — correspondencia entre el sistema original y el motor neutro.

---

## Uso mínimo

```js
import { createCubeEngine } from './cube-engine.js';
import { createAtlasEngine } from './atlas-engine.js';
import { createChanceEngine } from './chance-engine.js';

const cube = createCubeEngine({ size: 27 });
const atlas = createAtlasEngine({ cube });
const chance = createChanceEngine({ cube });

atlas.goTo(14,14,14);
const hit = chance.roll();
```

---

## Modelo de datos

El cubo no exige que existan 19.683 textos distintos.

Puede trabajar con un sustrato 27×27 y proyectarlo en profundidad:

```js
const cube = createCubeEngine({
  size: 27,
  substrate: {
    get(x,y){ return inventario[y-1][x-1]; }
  }
});
```

Cada posición `(x,y,z)` puede adquirir además metadatos de sala, objeto, ausencia, recuerdo, grado de olvido, espejo, relación o cualquier otra dimensión propia de la obra.

---

## Aplicación a EL INVENTARIO DE LAS SOMBRAS

La máquina del museo puede reutilizar el cubo como **arquitectura de memoria y ausencia**:

- **X/Y**: dos ejes del inventario o del espacio museístico;
- **Z**: profundidad de lectura, persistencia, borrado o relación —su significado debe fijarse en la obra, no en el motor;
- **ATLAS**: inspección consciente del museo;
- **AZAR**: irrupción no controlada de una ausencia o relación;
- **espejo**: posición contrapuesta;
- **envolvente**: distancia estructural respecto del centro;
- **trazas**: recorridos temáticos o curatoriales;
- **relaciones**: red entre objetos, ausencias, testimonios, salas y huellas.

### Restricción canónica importante

**LA HABITACIÓN NÚMERO CERO no debe modelarse automáticamente como `z=0`, como una vigésimo octava capa ni como el último paso de una cronología.**

Debe permanecer fuera de la numeración ordinaria del cubo, como **límite / horizonte / riesgo**. El adaptador de ejemplo la expone como un umbral externo al espacio 27³.

---

## Fórmulas conservadas

Para `N=27`, `c=14`:

```text
posiciones = N³ = 19.683
celdas del sustrato = N² = 729
centro = (14,14,14)
k(x,y,z) = max(|x-14|, |y-14|, |z-14|)
M(x,y,z) = (y,x,28-z)
```

El espejo tiene 27 puntos fijos: `x=y` y `z=14`.

---

## Regla de diseño

> El motor define el espacio. La obra decide qué significa ocuparlo.

Este paquete debe ser la base técnica de la futura máquina tridimensional del museo, no una traslación temática de Granada.
