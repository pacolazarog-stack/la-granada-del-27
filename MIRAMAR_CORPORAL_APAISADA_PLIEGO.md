# LA TERRAZA DEL MIRAMAR · VERSIÓN CORPORAL APAISADA
## Pliego técnico canónico · 18/09/2026

**Autoría visible:** Flag  
**Superficie:** versión corporal · teatro gestual y de objetos  
**Principio visual:** USO REAL · DEFORMACIÓN · SIGNIFICADO NUEVO

---

## 1. Regla maestra

Toda la versión corporal se proyecta en **formato apaisado 16:9**, a pantalla completa y sin aspecto de póster vertical encajado.

Cada escena se presenta como **una sola lámina horizontal** que contiene simultáneamente sus **40 fotogramas**, la información sonora/verbal de la escena y su identificación.

La **partitura sonora comienza en el IN exacto de cada escena**. La cartela identificativa ocupa los primeros **0,9 s dentro de ese mismo tiempo**; después entra la lámina horizontal, sin detener ni desplazar el audio.

Al terminar la pista en el OUT exacto:

**ESCENA → CARTELA DE LA SIGUIENTE ESCENA DENTRO DE SU NUEVO TIEMPO → ESCENA SIGUIENTE**

Antes de la escena 01:

**ANUNCIO DE LA OBRA → ANUNCIO DE LA PRIMERA ESCENA → ESCENA 01**

Después de la escena 30:

**OSCURO FINAL → FIN → CRÉDITOS**

---

## 2. Formato técnico maestro

- Proporción: **16:9**
- Máster de diseño: **1920 × 1080 px**
- Color de fondo: negro
- Color de sistema: cian
- Texto principal: blanco
- Exportación web preferente: **WebP**
- Exportación archivo/máster: **PNG**
- No deformar imágenes para llenar pantalla.
- No conservar bordes de póster ni márgenes externos propios de las versiones verticales.

### Área segura

Aunque la imagen debe ocupar toda la pantalla, los textos y elementos críticos deberán quedar dentro de una zona segura de aproximadamente **6 % lateral** y **5 % vertical**, para tolerar recortes menores en proyectores y pantallas con relaciones ligeramente distintas.

---

## 3. Plantilla maestra de escena · 1920 × 1080

### 3.1. Cabecera
Zona aproximada: **y = 40–140 px**

- LA TERRAZA DEL MIRAMAR
- Teatro gestual y de objetos
- a la derecha: USO REAL · DEFORMACIÓN · SIGNIFICADO NUEVO

### 3.2. Identificación de escena
Zona aproximada: **y = 150–230 px**

- número de escena
- título
- subtítulo o función dramática breve

Ejemplo:

**23 · INNOVAR**  
Construir. Desarmar. Volver a empezar.

### 3.3. Banda sonora/verbal
Zona aproximada: **y = 240–330 px**

Orden fijo, nunca intercambiable:

1. **PERCUSIÓN**
2. **SONIDO / MÚSICA**
3. **ONOMATOPEYA**
4. **PALABRA / FRASE**

Los cuatro campos deben conservar siempre la misma posición.

### 3.4. Contacto visual
Zona aproximada: **y = 346–984 px**

Retícula canónica:

**8 columnas × 5 filas = 40 fotogramas**

- numeración estricta: 01–40
- lectura izquierda → derecha / arriba → abajo
- continuidad temporal real entre fotogramas
- misma intérprete, objetos, vestuario y espacio dentro de cada secuencia
- cada fotograma debe ser suficientemente grande para ser legible en proyección

La proporción de cada celda debe mantenerse próxima a **16:9**.

### 3.5. Pie
Zona aproximada: **y = 996–1040 px**

- regla cian
- identificación discreta de la obra
- firma visual: **La terraza del Miramar**
- sin introducir información nueva que compita con el contacto

---

## 4. Cartelas / intermedios

Todas las cartelas comparten exactamente el mismo formato **1920 × 1080 · 16:9** que las escenas.

### 4.1. Apertura de la obra

Texto principal:

**COMIENZA LA OBRA**  
**LA TERRAZA DEL MIRAMAR**  
Versión corporal · teatro gestual y de objetos

### 4.2. Primera escena

**PRIMERA ESCENA**  
**01 · MIRAMAR COMUNIDAD**  
Un mar. Un límite. Una comunidad.

### 4.3. Cambios de escena

Para escenas 02–30:

**PRÓXIMA ESCENA**  
**NN · TÍTULO**  
Subtítulo correspondiente.

### 4.4. Fin

**FIN**  
LA TERRAZA DEL MIRAMAR  
Oscuro final.

### 4.5. Créditos

Debe figurar:

- Obra: La terraza del Miramar
- Versión: Corporal · teatro gestual y de objetos
- Autoría, dramaturgia y concepto: **Flag**
- Storyboard canónico: 30 escenas · 40 fotogramas por escena
- Sistema visual: Uso real · deformación · significado nuevo
- Partitura sonora corporal: 30 pistas incorporadas · matriz exacta 42:40

No debe aparecer ninguna autoría distinta de **Flag**.

---

## 5. Número total de láminas de proyección

### Escenas
- 30 láminas de escena

### Cartelas
- 1 apertura de obra
- 1 anuncio de primera escena
- 29 anuncios de próxima escena (02–30)
- 1 FIN
- 1 CRÉDITOS

**Total del sistema visual: 63 láminas.**

---

## 6. Nomenclatura canónica de archivos

### Escenas

`assets/miramar-corporal/scenes/scene-01.webp`  
…  
`assets/miramar-corporal/scenes/scene-30.webp`

Másteres PNG:

`masters/miramar-corporal/scenes/scene-01.png`  
…  
`masters/miramar-corporal/scenes/scene-30.png`

### Cartelas

`assets/miramar-corporal/intertitles/obra.webp`  
`assets/miramar-corporal/intertitles/anuncio-01.webp`  
…  
`assets/miramar-corporal/intertitles/anuncio-30.webp`  
`assets/miramar-corporal/intertitles/fin.webp`  
`assets/miramar-corporal/intertitles/creditos.webp`

### Música corporal

`audio/corporal/01.mp3`  
…  
`audio/corporal/30.mp3`

01–30: **partitura sonora canónica vigente**. No quedan slots pendientes.  
Duración total exacta: **42:40 = 2.560 s**.  
Manifiesto de tiempos y SHA-256: `audio/corporal/manifest.json`.

---

## 7. Correspondencia canónica de escenas

01 · MIRAMAR COMUNIDAD  
02 · OK  
03 · EL CUERPO  
04 · CLAC  
05 · NADIE  
06 · NACE EL CONFLICTO  
07 · PRIMERA INCURSIÓN TERRESTRE  
08 · TERRITORIO  
09 · MAYORÍA SIMPLE  
10 · VOTEN  
11 · MAYORÍA SIMPLE  
12 · NOSOTROS  
13 · DERECHO  
14 · TOGA · BANDERA · REINA  
15 · MÍRENME  
16 · ESTADO  
17 · VIENTO  
18 · EL SOL  
19 · CONFORME A DERECHO  
20 · QUE CONSTE  
21 · EL REINO CABE EN UNA CARPETA  
22 · MIRAMAR  
23 · INNOVAR  
24 · ¿QUIÉN GOBIERNA?  
25 · RUMOR  
26 · CENTRO DE DATOS  
27 · MIRA QUIÉN MIRA QUIÉN  
28 · CÓMO SEGUIMOS  
29 · DESARMAR A LA REINA  
30 · DIEZ MINUTOS

---

## 8. Ritmo de transición

El oscuro no es un adorno sino parte del dispositivo.

Secuencia técnica recomendada entre escenas:

1. termina el MP3 exactamente en el OUT de la escena;
2. comienza inmediatamente el MP3 de la escena siguiente en su IN canónico;
3. durante los primeros **0,9 s** de ese nuevo tiempo aparece la cartela;
4. la lámina entra a continuación sin reiniciar ni desplazar el audio;
5. el proceso se repite hasta 30 · DIEZ MINUTOS.

La cartela **no añade duración** a la matriz: forma parte del tiempo exacto de su propia escena.

---

## 9. Regla música / imagen

- una pista = una escena;
- una escena = una lámina de 40 fotogramas;
- el audio comienza en el **IN exacto** de la escena;
- la cartela ocupa los primeros **0,9 s dentro de ese tiempo** y no añade segundos;
- la lámina aparece después sin detener la pista;
- no se animan internamente los 40 fotogramas;
- el final de la pista coincide con el **OUT exacto** de la escena;
- las 30 pistas existen y pertenecen exclusivamente a la versión corporal.

**La versión corporal no utiliza música de la versión musical.**

---

## 10. Criterio web

La superficie `miramar-corporal.html` debe evolucionar hacia el uso de archivos horizontales individuales.

### Regla de pantalla

La escena debe ocupar todo el viewport útil:

- ancho: 100 %
- alto: 100 %
- sin marco de póster
- sin proporción 3:4
- sin atlas vertical visible
- fondo negro

Para pantallas 16:9, la lámina llena el viewport.

En relaciones distintas, se prioriza la integridad de la composición y de la zona segura; nunca se deforma la imagen.

---

## 11. Orden de producción

### BLOQUE A · 01–10
1. construir plantilla maestra;
2. rehacer escenas 01–10 en 1920 × 1080;
3. rehacer anuncios 01–10;
4. continuidad sonora 01–10 validada con la partitura 42:40;
5. integrar y comprobar en web.

### BLOQUE B · 11–20
1. escenas 11–20;
2. anuncios 11–20;
3. integración sonora 11–15 completada;
4. pistas 16–20 incorporadas;
5. validación web.

### BLOQUE C · 21–30
1. escenas 21–30;
2. anuncios 21–30;
3. FIN;
4. CRÉDITOS;
5. pistas 21–30 incorporadas;
6. validación completa 01–30.

---

## 12. Control de calidad

Cada lámina debe superar estas comprobaciones antes de incorporarse:

- [ ] 1920 × 1080 / 16:9
- [ ] título correcto
- [ ] subtítulo correcto
- [ ] 40 fotogramas exactos
- [ ] numeración 01–40 sin saltos ni duplicados
- [ ] retícula 8 × 5
- [ ] continuidad corporal y objetual
- [ ] percusión correcta
- [ ] sonido/música correcto
- [ ] onomatopeya correcta
- [ ] palabra/frase correcta
- [ ] negro/cian/blanco homogéneo
- [ ] textos dentro del área segura
- [ ] sin objetos no canónicos
- [ ] sin autoría distinta de Flag
- [ ] legible a pantalla completa
- [ ] transición al siguiente cartel comprobada

---

## 13. Sustitución en GitHub

La sustitución debe hacerse sin romper la versión corporal publicada.

Orden:

1. crear `assets/miramar-corporal/scenes/`;
2. crear `assets/miramar-corporal/intertitles/`;
3. subir primero las 10 escenas del bloque;
4. subir las cartelas del mismo bloque;
5. cambiar el reproductor para utilizar archivos individuales;
6. mantener durante la migración un fallback temporal al atlas existente;
7. comprobar escritorio y móvil;
8. retirar el atlas únicamente cuando estén validadas las 30 escenas horizontales.

---

## 14. Definición canónica breve

> La versión corporal de *La terraza del Miramar* es una secuencia audiovisual de treinta escenas apaisadas a pantalla completa. Cada escena reúne cuarenta fotogramas de una única acción corporal y una pista sonora propia. Las treinta pistas forman una matriz continua exacta de **42:40**. La cartela de cada escena ocupa los primeros 0,9 s de su propio tiempo y la lámina entra después, sin añadir duración. El sistema completo utiliza una única gramática horizontal 16:9 y una partitura de onomatopeyas, percusión, respiración y palabra mínima.

**Flag · 2026**
