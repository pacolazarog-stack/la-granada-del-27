# MIGRATION · DE LA GRANADA DEL 27 AL MOTOR NEUTRO

## Qué se ha extraído

| Sistema original | Motor exportado | Observación |
|---|---|---|
| `cube-canon.js` | `cube-engine.js` | Se conserva la geometría; se eliminan países, lenguas y POEMA. |
| `atlas-cube.js` | `atlas-engine.js` | Se conserva navegación X/Y/Z, centro, espejo y estado; se elimina DOM. |
| `chance.js` | `chance-engine.js` | Se conserva azar y secuencia de cuatro tiempos; se elimina texto/sonido específico. |
| `relations-canon.js` | `relations-engine.js` | Se convierte en registro de proveedores de relación. |
| POEMA / cinco trazas | `trace-engine.js` | Se generaliza a trazas exactas, parciales o declarativas. |
| matriz 27×27 | `substrate` | El sustrato puede ser texto, objeto, ficha, ausencia, imagen o metadato. |
| centro LA VEGA | centro geométrico | El motor conserva `(14,14,14)` pero no su significado literario. |
| 27 lenguas | plugin externo | No pertenece al núcleo geométrico. |
| interfaz Atlas | consumidor externo | El motor no impone HTML/CSS. |

---

## Invariantes que sí pasan a la nueva obra

1. `27² = 729` celdas de sustrato.
2. `27³ = 19.683` posiciones relacionales.
3. Centro geométrico único `(14,14,14)`.
4. Trece envolventes alrededor del centro.
5. Espejo por defecto `M(x,y,z)=(y,x,28-z)`.
6. 27 puntos fijos del espejo en `x=y, z=14`.
7. Navegación consciente (Atlas).
8. Navegación probabilística (Azar).
9. Registro de trazas superpuestas al cubo.
10. Red extensible de relaciones.
11. Posibilidad de proyectar el sustrato XY en profundidad Z sin generar 19.683 textos distintos.

---

## Elementos que NO deben heredarse automáticamente

- España como centro.
- LA VEGA como centro semántico.
- países de la UE como ejes.
- el año 1927/2027.
- la ruta POEMA.
- las 27 lenguas.
- los 27 tipos de relación granadinos.
- la semántica temporal de Z.

Todo ello era contenido de **La Granada del 27**, no propiedad de la máquina.

---

## Traducción inicial al museo

La transferencia correcta no es:

`poema → objeto`, `país → sala`, `lengua → sombra`.

Eso sería una sustitución superficial.

La transferencia correcta es estructural:

```text
SUTRATO 27×27
        ↓
CUBO RELACIONAL 27×27×27
        ↓
ATLAS = inspección consciente
AZAR  = irrupción / recorrido no elegido
        ↓
TRAZAS + RELACIONES + ESPEJO + ENVOLVENTES
```

El museo podrá decidir después qué son X, Y y Z.

---

## Habitación Número Cero

En el sistema exportado se trata como un **horizonte externo**.

No forma parte de `1…27` y no altera `27³`.

No debe implementarse como:

- `(0,0,0)`;
- `z=0`;
- `z=28`;
- capa 28;
- último nivel;
- destino obligatorio del recorrido.

Puede actuar como condición de borde, salida imposible, riesgo de desaparición, umbral o evento excepcional según quede fijado en la obra.

---

## Próxima fase recomendada

Construir una configuración propia del museo con tres decisiones autorales:

1. **qué contienen las 729 celdas del sustrato**;
2. **qué significa Z**;
3. **qué relaciones pueden activar las 19.683 posiciones**.

Cuando esas tres decisiones estén fijadas, la máquina tridimensional puede implementarse sin modificar el motor.
