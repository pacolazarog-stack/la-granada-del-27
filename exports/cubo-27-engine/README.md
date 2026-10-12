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
- `geometry-adapter.js` — conversión a geometría tridimensional real/normalizada.
- `museum-ontology.js` — ontología canónica de **El inventario de las sombras**.
- `museum-shadows.adapter.example.js` — adaptador canónico del museo.
- `MUSEUM_ONTOLOGY.md` — definición narrativa completa de ejes, centro, envolventes, espejo, relaciones y Habitación Número Cero.
- `validate-engine.mjs` — invariantes del motor y de la ontología del museo.
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

## Aplicación canónica a EL INVENTARIO DE LAS SOMBRAS

La máquina del museo queda fijada como **arquitectura de memoria, inscripción y ausencia**.

### 729 huellas, no 19.683 objetos

Las 729 celdas X×Y son **huellas museográficas elementales**: objetos, fotografías, fichas, frases, ausencias, personas recordadas, fechas, vitrinas vacías, correcciones o cualquier indicio que aún permita afirmar que algo estuvo allí.

Las 19.683 posiciones son los estados relacionales posibles de esas 729 huellas.

> El museo no contiene 19.683 cosas. Contiene 729 huellas capaces de ocupar 19.683 estados de verdad.

### X = MATERIALIDAD

De `1` a `27`:

- `1` → casi ninguna presencia física;
- `27` → presencia material máxima.

### Y = INSCRIPCIÓN

De `1` a `27`:

- `1` → apenas documentado;
- `27` → exhaustivamente registrado.

### Z = PROFUNDIDAD DE SOMBRA

Z **no es tiempo**.

Mide la distancia respecto de aquello que ocurrió:

- `Z1` → casi presente;
- `Z27` → casi irrecuperable.

Las bandas operativas son `PRESENTE`, `ATENUADO`, `DOCUMENTAL`, `INDIRECTO`, `RESIDUAL` y `UMBRAL_DE_LO_REPRESENTABLE`.

No existe `Z28`.

### CENTRO = máxima ambigüedad

`(14,14,14)` no es el objeto principal ni la verdad final. Es el punto donde materia, inscripción y olvido quedan en equilibrio.

El recorrido `X → Y → CENTRO → Z` pasa por una cámara de incertidumbre antes de proyectar la profundidad.

### Envolventes = distancia de una certeza

Las trece envolventes son grados de resonancia respecto del centro, no trece salas físicas.

### Espejo = lectura inversa de la misma evidencia

Una posición y su espejo expresan:

- lo que el museo afirma;
- lo que la misma evidencia permite afirmar al revés.

### Vecinos = contaminación inmediata

Los vecinos permiten que una fecha corregida, una identificación errónea, una etiqueta intercambiada o un testimonio tardío alteren la interpretación de otras huellas.

### Relaciones canónicas iniciales

`ECO`, `CONTRADICCION`, `SUSTITUCION`, `PROCEDENCIA`, `TESTIMONIO`, `BORRADO`, `ERROR`, `ESPEJO`, `CONTAGIO`, `AUSENCIA`, `REAPARICION`, `DUPLICADO`, `SOMBRA`.

La activación concreta de estas relaciones sigue siendo enchufable y puede depender de Z, del recorrido y del estado previo del visitante.

### Restricción canónica: LA HABITACIÓN NÚMERO CERO

**LA HABITACIÓN NÚMERO CERO no es `z=0`, `z=28`, una vigésimo octava capa ni el último paso de una cronología.**

Permanece fuera del cubo como horizonte externo.

> No guarda lo que se ha perdido. Guarda aquello de lo que ya no queda siquiera la posibilidad de decir que se perdió.

La definición completa está en `MUSEUM_ONTOLOGY.md` y su proyección ejecutable en `museum-ontology.js`.

---

## Uso del adaptador del museo

```js
import { createMuseumShadowsMachine } from './museum-shadows.adapter.example.js';

const museum = createMuseumShadowsMachine({ inventory });

const center = museum.inspect({x:14,y:14,z:14});
const apparition = museum.chance.roll();
const roomZero = museum.inspectHorizon();
```

El adaptador expone simultáneamente `cube`, `atlas`, `chance`, `traces`, `relations`, `geometry`, `ontology` y el horizonte externo `ROOM_ZERO`.

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

En **El inventario de las sombras**, esa semántica ya queda fijada: **materialidad × inscripción × profundidad de sombra**.

Este paquete es la base técnica de la futura máquina tridimensional del museo, no una traslación temática de Granada.
