# Prueba de carga · matriz pétrea

La capa profunda se construye desde la matriz heredada de `matrix-1/2/3`, antes de aplicar la superficie de **LA VEGA**. Solo se sustituye H14 por el nuevo **BAJO LA CAL**.

La superficie y la piedra coinciden de manera absoluta en una sola celda:

> **14×14 · Late bajo la cal la acequia hundida.**

Esto evita que los nuevos poemas tengan que volver a convertirse en columnas literales de la retícula.

## Resultado ejecutado

La prueba automática `validate-stone.mjs`, ejecutada por GitHub Actions, da resultado satisfactorio.

- matriz profunda: **27×27 · 729 celdas**;
- horizontales: **27/27**;
  - 26 heredadas;
  - H14 sustituida por el nuevo **BAJO LA CAL**;
- diagonales: **2/2 intactas**;
- centro 14×14: **intacto**;
- radial: **válido**;
  - HACIA LO ENTERRADO;
  - HACIA LO ABIERTO;
- Loa I / acróstico: **válida**;
- Loa II / teléstico: **válida**;
  - solo se desplaza una marca, P26/H14, sin cambiar el verso;
- mesósticos: **49/54 válidos**;
- mesósticos que necesitan rediseño: **5**.

## Las cinco voces pendientes

### P03 · VOZ NACE MEMORIA

El recorrido necesita **V** en su paso por H14/P03, pero el verso 3 de BAJO LA CAL es:

> Cede una losa; asoma tierra negra.

No contiene V interior. No se modifica el verso.

### P05 · MANO ABRE EL HILO

El recorrido necesita **M** en H14/P05, pero el verso 5 es:

> La raíz ha torcido una baldosa.

No contiene M interior. No se modifica el verso.

### H14 · TIERRA GUARDA LA PUERTA ANTIGUA

El antiguo mensaje horizontal de 27 letras no puede extraerse completo del nuevo BAJO LA CAL. Faltan tres letras en sus posiciones heredadas:

- verso 1: necesita **T**;
- verso 7: necesita **G**;
- verso 23: necesita **T**.

Los versos afectados son:

> Bajo la cal respira un muro viejo.  
> Sale del muro un clavo sin cabeza.  
> La piedra húmeda devuelve su color.

El mensaje H14 debe rediseñarse alrededor del poema, no el poema alrededor del mensaje.

### P19 · GRANADA MIRA AÚN

El recorrido necesita **G** en H14/P19, pero el verso 19 es:

> Un niño mira el hilo entre sus botas.

No contiene G interior. No se modifica el verso.

### P27 · TIERRA PRESENTE

El recorrido necesita **T** en H14/P27, pero el verso 27 es:

> Bajo la casa el agua sigue andando.

No contiene T interior. No se modifica el verso.

## Loa II · único reajuste de marca

El teléstico P26 conserva la palabra **VUELVE** desplazando su marca de H14 al carácter E ya existente en:

> Se abre la puerta; cruza aire del patio.

Nueva localización:

- `start: 31`
- `end: 33`
- `keyOffset: 0`

No se cambia texto alguno.

## Conclusión constructiva

La prueba confirma el equilibrio buscado:

**superficie poética nueva + matriz heredada independiente + núcleo común en 14×14.**

La pérdida real no es de la arquitectura general. Se reduce a cinco mensajes mesósticos que pueden rediseñarse usando únicamente las letras disponibles.

La siguiente operación debe limitarse a esas cinco voces. No se reabre ningún poema para satisfacerlas.
