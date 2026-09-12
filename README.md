# La Granada del 27 · Un siglo después

Edición digital del poemario **La Granada del 27 · Un siglo después**, concebida como una **Matriz 27**: 27 poemas de 27 versos, con 729 posiciones y tres direcciones de lectura.

## Publicación

Este repositorio está preparado para publicarse directamente mediante **GitHub Pages** desde la rama `main` y la raíz `/`.

La aplicación es completamente estática: no necesita servidor, base de datos ni proceso de compilación.

## Estructura

```text
.
├── .nojekyll
├── index.html
├── manifest.webmanifest
├── matrix-core.js
├── matrix-1.js
├── matrix-2.js
├── matrix-3.js
├── README.md
└── pages/
    ├── page-01.webp
    ├── page-02.webp
    ├── ...
    └── page-38.webp
```

## Tres direcciones de lectura

### Vertical

Lectura editorial ordinaria del libro, conservando las 38 páginas de la edición digital. Permite avanzar y retroceder mediante botones, zonas laterales, teclado y gesto de deslizamiento.

### Horizontal

El corpus forma una matriz **27 × 27**. La fila `H01` reúne el verso 1 de los poemas 01–27; `H02`, el verso 2; y así sucesivamente hasta `H27`.

La interfaz permite seleccionar cualquiera de las 27 filas y recorrer lateralmente sus 27 versos. El poema 14, **LA VEGA**, queda señalado como eje central.

### Radial

La lectura radial toma el **verso 14** de los 27 poemas. Parte del centro `P14/V14` —**LA VEGA**— y avanza por parejas equidistantes:

`13/15 · 12/16 · 11/17 · ... · 01/27`

Las iniciales de cada pareja son simétricas y condensan la inscripción estructural **LA GRANADA DEL 27**; la última pareja `D/S` se lee «dos / siete».

## Controles

- Selector superior: **VERTICAL · HORIZONTAL · RADIAL**.
- Flechas izquierda/derecha: navegación vertical.
- Flechas arriba/abajo: cambio de fila en lectura horizontal.
- Pantalla completa disponible desde la cabecera.
- El botón `?` explica la arquitectura de lectura.

## Despliegue en GitHub Pages

En **Settings → Pages**, seleccionar:

- **Branch:** `main`
- **Folder:** `/ (root)`

La página principal es `index.html`.

## Derechos

© 2026 Francisco Javier Lázaro Guil. Todos los derechos reservados.

Los textos, la edición, la composición gráfica y las imágenes de esta publicación no se ofrecen bajo una licencia de software libre ni de contenidos abiertos. La presencia del proyecto en un repositorio público no implica autorización para reproducir, redistribuir, modificar o explotar comercialmente la obra fuera de los límites permitidos por la legislación aplicable.
