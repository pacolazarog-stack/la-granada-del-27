# La Granada del 27 · Un siglo después

Edición digital de **La Granada del 27 · Un siglo después**, concebida como una **matriz 27 × 27**: 27 poemas verticales de 27 versos, 27 poemas horizontales formados por las filas de la misma matriz y una lectura radial central en H14.

## Estado canónico

- Matriz canónica: **v2.3**.
- Dimensión: **27 × 27 = 729 posiciones**.
- Lectura vertical: **27 poemas**.
- Lectura horizontal: **27 poemas titulados**.
- Lectura radial: **2 ramas poéticas** desde P14/V14.
- Total matricial para la edición en papel: **56 poemas**.
- Con prólogo y epílogo: **58 piezas poéticas**.
- H14: **BAJO LA CAL**.
- Centro común: `Late bajo la cal la acequia hundida.`
- Inscripción radial: **LA GRANADA DEL DOS SIETE / LA GRANADA DEL 27**.
- No existe una capa teléstica canónica.

## Lecturas

### Vertical

Los 27 poemas originales se leen de P01 a P27. Cada poema contiene 27 versos y conserva su título propio, desde **GRANADA, 1927** hasta **UN SIGLO DESPUÉS**.

### Horizontal

Cada fila H01–H27 constituye un poema autónomo de 27 versos. Sus títulos canónicos son:

1. LA PRIMERA MAÑANA
2. ANTES DEL NOMBRE
3. UNA VOZ NUEVA
4. LA LUZ ANTIGUA
5. LA MANO QUE MUEVE
6. EL NOMBRE EN EL PORTAL
7. LO QUE NO FIGURA
8. NINGUNA VOZ SOLA
9. LO QUE SE PRESIENTE
10. LA SOMBRA EN LA PARED
11. LA HUELLA
12. DEBAJO
13. EL UMBRAL
14. BAJO LA CAL
15. EL OTRO LADO
16. LO QUE REGRESA
17. LA MUESCA
18. LA FORMA QUE CAMBIA
19. LO QUE VENDRÁ
20. EL AGUA ANTIGUA
21. TODAVÍA
22. LO QUE QUEDA
23. HACER SITIO
24. OTRA LUZ
25. LA PUERTA ABIERTA
26. VOLVER A EMPEZAR
27. EL PORVENIR

### Radial

La lectura radial parte de **P14/V14** y abre dos ramas de catorce versos, ambas iniciadas por el mismo centro:

- **I · HACIA LO ENTERRADO**: P14 → P13 → … → P01.
- **II · HACIA LO ABIERTO**: P14 → P15 → … → P27.

Las iniciales de las dos ramas forman `LAGRANADADELDS`, con `D = DOS` y `S = SIETE`, de modo que la inscripción completa se lee **LA GRANADA DEL DOS SIETE**, es decir, **LA GRANADA DEL 27**.

## Edición en papel

La arquitectura canónica de la edición física es:

1. **Prólogo** en verso libre.
2. **LIBRO I · LA GRANADA DEL 27** — 27 poemas verticales.
3. Página de silencio.
4. **LIBRO II · BAJO LA CAL** — 27 poemas horizontales.
5. Página de silencio.
6. **LIBRO III · LA GRANADA DEL 27** — dos poemas radiales: **HACIA LO ENTERRADO** y **HACIA LO ABIERTO**.
7. Página de revelación: **LA GRANADA DEL DOS SIETE / LA GRANADA DEL 27**.
8. **Epílogo · GRANADA QUEDA**, romance octosílabo.
9. Nota final sobre la matriz 27 × 27 y colofón.

El índice inicial de la edición en papel **no debe revelar el Libro III ni el mecanismo radial**. La lectura está concebida como descubrimiento progresivo: primero los 27 verticales, después los otros 27 poemas atravesándolos y, finalmente, el centro secreto.

## Aplicación digital

La web ofrece cuatro modos:

- **LIBRO**: facsímil de la edición gráfica actualmente publicada.
- **VERTICAL**: los 27 poemas verticales canónicos.
- **HORIZONTAL**: los 27 poemas horizontales con sus títulos canónicos.
- **RADIAL**: las dos ramas **HACIA LO ENTERRADO** y **HACIA LO ABIERTO** y la inscripción estructural.

La matriz canónica se distribuye en `matrix-1.js`, `matrix-2.js` y `matrix-3.js`.

## Estructura del repositorio

```text
.
├── .nojekyll
├── index.html
├── manifest.webmanifest
├── matrix-core.js
├── matrix-1.js
├── matrix-2.js
├── matrix-3.js
├── EDICION-PAPEL.md
├── README.md
└── pages/
    ├── page-01.webp
    ├── ...
    └── page-38.webp
```

## Publicación

GitHub Pages sirve la rama `main` desde la raíz `/`. La aplicación es estática y no necesita servidor, base de datos ni proceso de compilación.

## Derechos

© 2026 Francisco Javier Lázaro Guil. Todos los derechos reservados.

Los textos, la edición, la composición gráfica y las imágenes de esta publicación no se ofrecen bajo una licencia de software libre ni de contenidos abiertos. La presencia del proyecto en un repositorio público no implica autorización para reproducir, redistribuir, modificar o explotar comercialmente la obra fuera de los límites permitidos por la legislación aplicable.
