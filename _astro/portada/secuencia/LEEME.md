# Secuencia cinematográfica de la PORTADA — recursos PROVISIONALES

Los archivos de esta carpeta son los fotogramas que consume la sección
cinematográfica de la portada (`src/pages/index.astro`, sección
`#experiencia`, ubicada como CIERRE de la página: después de todo el
contenido comercial —franja de precio, planes, servicios profesionales,
producto, soluciones— y del CTA final `#demo`, justo antes del formulario
de contacto). **Son provisionales**: los generó
`scripts/generar-secuencia-portada.mjs` (render procedural SVG → WebP,
determinista) mientras no exista un render definitivo. Se pueden reemplazar
sin tocar una línea de código si se respeta el contrato de abajo.

Es la MISMA arquitectura que la sección cinematográfica de `/cloud`
(`public/cloud/secuencia/LEEME.md`): reproductor idéntico, carpetas y
convenciones equivalentes.

## Por qué viven bajo `public/_astro/` y no bajo `public/portada/`

No es un detalle cosmético: `@astrojs/node` (el adaptador, modo standalone)
le pone `Cache-Control: public, max-age=31536000, immutable` a TODO lo que
cuelga de `/_astro/` — es la misma regla con la que sirve sus propios
bundles con hash (`node_modules/@astrojs/node/dist/serve-static.js`). Los
fotogramas son inmutables por NOMBRE (ver el contrato abajo: reemplazar el
contenido nunca cambia `fotograma-0001.webp` por otro nombre), así que
califican igual sin escribir un servidor propio. Antes vivían bajo
`public/portada/` y se servían con `max-age=0`: quien volvía a la portada
revalidaba sus 121 peticiones en vez de leerlas de la caché del navegador.

Si el día de mañana cambia el adaptador o `build.assets` deja de ser
`_astro` (su valor por defecto), esta regla deja de aplicar sola y hay que
revisarla — no es magia de Astro, es un detalle de implementación de
`@astrojs/node` que conviene volver a comprobar (`curl -I` a un fotograma
y mirar la cabecera `Cache-Control`).

## El contrato (lo que el reproductor espera)

| Cosa                  | Valor                                                        |
| --------------------- | ------------------------------------------------------------ |
| Carpeta escritorio    | `public/_astro/portada/secuencia/escritorio/`                |
| Carpeta móvil         | `public/_astro/portada/secuencia/movil/`                     |
| Poster                | `public/_astro/portada/secuencia/poster.webp`                |
| Cantidad              | **120 fotogramas por carpeta** (≈5 s a 24 fps)               |
| Nombres               | `fotograma-0001.webp` … `fotograma-0120.webp` (4 dígitos)    |
| Resolución escritorio | **1600×900** (16:9). Recomendado máximo: 1920×1080           |
| Resolución móvil      | **800×450** (misma imagen, mitad de lado)                    |
| Formato               | **WebP** (AVIF también sirve si se cambia la extensión en `index.astro` y aquí) |
| Peso objetivo         | escritorio ≤ 1,5 MB el total (hoy: ~977 KB) · móvil ≤ 500 KB el total (hoy: ~306 KB) |
| Color                 | sRGB. Extremos superior e inferior fundidos a `#02040A` (el negro del sitio), para que el lienzo empalme sin costura |
| Sin texto dentro      | Los fotogramas NO llevan texto renderizado: los textos viven en el DOM como overlays |

El reproductor elige la carpeta **una sola vez al cargar**: `movil/` si el
ancho es ≤ 820 px (el corte de siempre, para retrato) O el alto es ≤ 500 px
(para apaisado), `escritorio/` si no. Así un teléfono en apaisado
(844-926 px de ancho, ~390-428 px de alto) sigue pidiendo la variante
liviana en vez de la de escritorio, y un viewport de escritorio normal
—hasta uno bajo, tipo 1280×800— no cae por debajo del corte de alto. El
fotograma pintado es
función directa del avance del scroll (0 → fotograma 1, 1 → fotograma 120),
con interpolación por `requestAnimationFrame`. La descarga no empieza hasta
que la página terminó de cargar (evento `load`) Y el visitante está a
menos de 25% de un viewport de distancia (`IntersectionObserver` con
`rootMargin: '0px 0px 25% 0px'`) — con el scroll en 0, tras el load, la
sección no pide un solo fotograma.

## Qué cuenta la secuencia (para que el render definitivo calce con los textos)

Los textos superpuestos viven en el DOM (no van "quemados" en los fotogramas)
y aparecen en estas ventanas del recorrido, DELIBERADAMENTE solapadas entre
sí (mientras uno se apaga el siguiente ya se está encendiendo, así que
nunca hay un tramo del recorrido sin ningún texto legible). El render
definitivo debería respetar más o menos estos actos:

| Avance         | Acto                                                  | Texto superpuesto                          |
| -------------- | ------------------------------------------------------ | ------------------------------------------ |
| −0,04 – 0,30   | WhatsApp: la conversación se arma sola (globos, pulso)| "Te escriben a las 22:07…"                 |
| 0,26 – 0,57    | Agenda: las filas se llenan y se confirman            | "Tu agenda se llena sola."                 |
| 0,53 – 0,83    | Seguimiento: arcos que reencienden pacientes fríos    | "Ningún paciente se enfría."               |
| 0,79 – 1,00    | El isotipo Λ en grande, con su órbita viva            | "Tú diriges. AUREVIA opera."               |

Los textos se leen abajo a la izquierda (el final, centrado): conviene que el
render deje esa zona relativamente despejada y oscura.

## Cómo reemplazarlos

1. Producir los 120 cuadros nuevos en 1600×900 (o 1920×1080) y convertirlos:

   ```bash
   # desde un video (elige 120 cuadros repartidos en toda la duración):
   ffmpeg -i render.mp4 -vf "select='not(mod(n\,round(N/120)))',scale=1600:900" -vsync vsync_drop -frames:v 120 -c:v libwebp -quality 62 escritorio/fotograma-%04d.webp

   # la variante móvil, desde los de escritorio:
   for f in escritorio/*.webp; do ffmpeg -i "$f" -vf scale=800:450 -c:v libwebp -quality 46 "movil/$(basename "$f")"; done
   ```

2. Copiarlos encima de `escritorio/` y `movil/` respetando los nombres
   (y la carpeta: `public/_astro/portada/secuencia/`, no `public/portada/` —
   ver la sección de arriba sobre por qué).
3. Elegir un cuadro representativo y guardarlo como `poster.webp` (1600×900).
   El poster es lo único que se ve con `prefers-reduced-motion` y sin
   JavaScript: tiene que sostenerse solo.
4. Si cambia la CANTIDAD de cuadros, actualizar `TOTAL` en el script de
   `src/pages/index.astro` (y esta tabla).
5. Probar la portada bajando Y subiendo, en escritorio y móvil (ancho
   ≤ 820 px, o alto ≤ 500 px en apaisado, pide `movil/`), y con
   `prefers-reduced-motion` activado (la sección debe quedar estática con
   el poster y los cuatro textos). El ensayo automatizado es
   `qa/ensayo-portada-cine.js`.

## Cómo regenerar los provisionales

```bash
node scripts/generar-secuencia-portada.mjs
```

Es determinista: regenera exactamente la misma secuencia (mismo seed, sin
fechas ni azar). Los parámetros (cantidad, tamaños, calidades, escena) están
al comienzo del script. Escribe directo en
`public/_astro/portada/secuencia/`.
