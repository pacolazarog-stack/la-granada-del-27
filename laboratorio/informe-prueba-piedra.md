# Prueba de carga · matriz pétrea

La capa profunda se construye desde la matriz heredada de `matrix-1/2/3`, anterior a la superficie nueva de los poemas visibles. Solo se sustituye H14 por el nuevo **BAJO LA CAL**.

La superficie y la piedra coinciden de manera absoluta en una sola celda:

> **14×14 · Late bajo la cal la acequia hundida.**

Esto permite conservar la máquina profunda sin obligar a los poemas nuevos a volver a convertirse en sus columnas literales.

## Resultado ejecutado

La prueba automática `validate-stone.mjs`, ejecutada por GitHub Actions, termina correctamente.

- matriz profunda: **27×27 · 729 celdas**;
- horizontales: **27/27**;
  - 26 heredadas;
  - H14 sustituida por el nuevo **BAJO LA CAL**;
- diagonales: **2/2 intactas**;
- centro 14×14: **intacto**;
- radial: **válido**;
  - **HACIA LO ENTERRADO**;
  - **HACIA LO ABIERTO**;
- Loa I / acróstico: **válida**;
- Loa II / teléstico: **válida**;
  - una sola marca, P26/H14, se desplaza a otra E ya existente sin cambiar el verso;
- mesósticos: **54/54 válidos**.

## Cinco voces rediseñadas

La renovación de H14 dejó cinco mensajes antiguos sin extracción completa. No se modificó ningún verso para recuperarlos. Se redactaron nuevas voces exclusivamente con las letras interiores ya presentes en sus trayectorias.

### P03

Antes:

> VOZ NACE MEMORIA

Ahora:

> **NOTA NACE DENTRO**

14 letras alfabéticas. La nueva voz se ajusta a la escucha de **DON MANUEL** y desplaza el énfasis desde una memoria declarada hacia el nacimiento interior de la nota.

### P05

Antes:

> MANO ABRE EL HILO

Ahora:

> **LA FORMA RESPIRA**

14 letras alfabéticas. La materia y la talla dejan de describirse como mecanismo y adquieren respiración.

### H14

Antes:

> TIERRA GUARDA LA PUERTA ANTIGUA

Ahora:

> **EL SILENCIO SUENA BAJO LA TIERRA**

27 letras alfabéticas, una por cada verso de **BAJO LA CAL**. La voz central ya no se superpone al nuevo poema: nace de él.

### P19

Antes:

> GRANADA MIRA AÚN

Ahora:

> **AÚN NACE MEMORIA**

14 letras alfabéticas. El presente de 2027 deja de contemplarse a sí mismo y empieza a convertirse en memoria mientras todavía sucede.

### P27

Antes:

> TIERRA PRESENTE

Ahora:

> **AGUA CRUZA SIGLO**

14 letras alfabéticas. La continuidad del agua atraviesa directamente la puerta 1927↔2027 y enlaza con el cauce enterrado del núcleo.

## Loa II · único reajuste de marca

El teléstico P26 conserva **VUELVE** desplazando su marca en H14 al carácter E ya presente en:

> Se abre la puerta; cruza aire del patio.

Nueva localización:

- `start: 31`
- `end: 33`
- `keyOffset: 0`

No se cambia texto alguno.

## Validación final

La comprobación automática exige y confirma simultáneamente:

- matriz 27×27;
- 27 horizontales;
- 2 diagonales;
- núcleo radial;
- Loa I;
- Loa II;
- **54/54 mesósticos**;
- identidad exacta de las cinco voces nuevas.

## Conclusión constructiva

La estructura profunda queda completa sin regresión poética:

**superficie poética nueva + matriz heredada independiente + nuevo H14 + encuentro absoluto en 14×14.**

No queda ningún mesóstico pendiente. La campaña de letras puede considerarse resuelta en la capa pétrea.

La regla demostrada es la misma que gobierna el libro:

> **rediseñar el mensaje con la materia disponible; nunca deformar el poema para recuperar una letra antigua.**
