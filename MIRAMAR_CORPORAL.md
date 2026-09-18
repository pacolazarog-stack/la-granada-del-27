# La terraza del Miramar · versión corporal

Nueva superficie independiente del lector canónico de **La terraza del Miramar**.

## Dispositivo

- 30 escenas.
- 40 fotogramas por escena, reunidos en un único contacto visual por escena.
- La imagen de cada escena permanece visible durante toda su música.
- Entre escenas: oscuro breve + anuncio tipográfico de la escena siguiente.
- Antes de la escena 01: anuncio de la obra + anuncio de la primera escena.
- Después de la escena 30: FIN + créditos.
- Autoría visible: **Flag**.

## Música

Estado de esta versión al 18/09/2026:

- Escenas 01–15: música incorporada mediante los quince primeros segmentos del máster sonoro actualmente publicado por el proyecto.
- Escenas 16–30: preparadas para incorporación progresiva.

Para incorporar una música pendiente no es necesario modificar el reproductor. Basta añadir:

`audio/corporal/16.mp3`
…
`audio/corporal/30.mp3`

La página comprueba automáticamente la existencia del archivo correspondiente. Si existe, lo reproduce y al terminar ejecuta el oscuro y el anuncio de la escena siguiente. Si todavía no existe, muestra **MÚSICA PENDIENTE · AVANCE MANUAL**.

## Navegación

La versión se abre desde el botón **CORPORAL** añadido a `miramar.html`.

Entrada directa:

`miramar-corporal.html`

## Sistema visual

**Uso real · deformación · significado nuevo.**

El atlas `assets/miramar-corporal-atlas.jpg` contiene los 30 contactos canónicos en orden 01→30 (5 columnas × 6 filas). El reproductor utiliza el atlas como sprite sin alterar las imágenes fuente.
