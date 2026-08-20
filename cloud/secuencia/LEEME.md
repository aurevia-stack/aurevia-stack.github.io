# Secuencia cinematográfica de /cloud — recursos PROVISIONALES

Los archivos de esta carpeta son los fotogramas que consume la sección
cinematográfica de `/cloud` (`src/pages/cloud.astro`, sección `#experiencia`).
**Son provisionales**: los generó `scripts/generar-secuencia-cloud.mjs`
(render procedural SVG → WebP, determinista) mientras no exista un render
definitivo. Se pueden reemplazar sin tocar una línea de código si se respeta
el contrato de abajo.

## El contrato (lo que el reproductor espera)

| Cosa                  | Valor                                                        |
| --------------------- | ------------------------------------------------------------ |
| Carpeta escritorio    | `public/cloud/secuencia/escritorio/`                         |
| Carpeta móvil         | `public/cloud/secuencia/movil/`                              |
| Poster                | `public/cloud/secuencia/poster.webp`                         |
| Cantidad              | **120 fotogramas por carpeta** (≈5 s a 24 fps)               |
| Nombres               | `fotograma-0001.webp` … `fotograma-0120.webp` (4 dígitos)    |
| Resolución escritorio | **1600×900** (16:9). Recomendado máximo: 1920×1080           |
| Resolución móvil      | **800×450** (misma imagen, mitad de lado)                    |
| Formato               | **WebP** (AVIF también sirve si se cambia la extensión en `cloud.astro` y aquí) |
| Peso objetivo         | ≤ 25 KB por fotograma de escritorio (hoy: ~9 KB, 1,1 MB el total) |
| Color                 | sRGB. Extremos superior e inferior fundidos a `#02040A` (el negro del sitio), para que el lienzo empalme sin costura |

El reproductor elige la carpeta **una sola vez al cargar**: `movil/` si el
viewport es ≤ 820 px, `escritorio/` si no. El fotograma pintado es función
directa del avance del scroll (0 → fotograma 1, 1 → fotograma 120), con
interpolación por `requestAnimationFrame`.

## Qué cuenta la secuencia (para que el render definitivo calce con los textos)

Los textos superpuestos viven en el DOM (no van "quemados" en los fotogramas)
y aparecen en estas ventanas del recorrido. El render definitivo debería
respetar más o menos estos actos:

| Avance      | Acto                                                | Texto superpuesto                        |
| ----------- | --------------------------------------------------- | ---------------------------------------- |
| 0,00 – 0,28 | El isotipo Λ se traza sobre la rejilla              | "La infraestructura con la que…"         |
| 0,26 – 0,60 | Construcción: partículas → artefacto hexagonal      | "Conectas tu repositorio."               |
| 0,52 – 0,80 | Despliegue: red de nodos, anillos de salud          | "Se despliega, se vigila, se revierte."  |
| 0,78 – 1,00 | En producción: la red brilla, el Λ reaparece grande | "Tu proyecto, en producción." + precio   |

Los textos se leen abajo a la izquierda (el final, centrado): conviene que el
render deje esa zona relativamente despejada y oscura.

## Cómo reemplazarlos

1. Producir los 120 cuadros nuevos en 1600×900 (o 1920×1080) y convertirlos:

   ```bash
   # desde un video (elige 120 cuadros repartidos en toda la duración):
   ffmpeg -i render.mp4 -vf "select='not(mod(n\,round(N/120)))',scale=1600:900" -vsync vsync_drop -frames:v 120 -c:v libwebp -quality 64 escritorio/fotograma-%04d.webp

   # la variante móvil, desde los de escritorio:
   for f in escritorio/*.webp; do ffmpeg -i "$f" -vf scale=800:450 -c:v libwebp -quality 58 "movil/$(basename "$f")"; done
   ```

2. Copiarlos encima de `escritorio/` y `movil/` respetando los nombres.
3. Elegir un cuadro representativo y guardarlo como `poster.webp` (1600×900).
4. Si cambia la CANTIDAD de cuadros, actualizar `TOTAL` en el script de
   `src/pages/cloud.astro` (y esta tabla).
5. Probar `/cloud` bajando Y subiendo, en escritorio y móvil, y con
   `prefers-reduced-motion` activado (la sección debe quedar estática con el
   poster y los cuatro textos).

## Cómo regenerar los provisionales

```bash
node scripts/generar-secuencia-cloud.mjs
```

Es determinista: regenera exactamente la misma secuencia (mismo seed, sin
fechas ni azar). Los parámetros (cantidad, tamaños, calidades, escena) están
al comienzo del script.
