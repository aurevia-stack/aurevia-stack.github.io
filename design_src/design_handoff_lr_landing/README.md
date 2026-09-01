# Handoff: Landing L&R Abogados y Asociados (Chile)

## Overview
Landing de captación para L&R ABOGADOS Y ASOCIADOS. Objetivo único: que el visitante identifique su problema en segundos y contacte por WhatsApp o formulario. Dirección de arte: **FUTURE LEGAL × PREMIUM LAW × DIGITAL LUXURY × EDITORIAL** — oscura, cinemática, con luz champagne, glassmorphism y tipografía editorial serif+sans.

## About the Design Files
`LR Landing Cinematica.dc.html` es una **referencia de diseño construida en HTML** (prototipo navegable), no código de producción. La tarea es **recrear este diseño fielmente** en el stack que se elija (recomendado: Next.js/Astro + Tailwind o CSS vanilla). No reinterpretar ni "mejorar" el diseño: reproducirlo. `image-slot.js` es solo el placeholder de fotos del prototipo — en producción usar `<img>` estáticas.

## Fidelity
**High-fidelity.** Colores, tipografía, espaciados, copy e interacciones son finales. Recrear pixel-perfect.

## ⚠ REGLA PERMANENTE — FOTOGRAFÍAS DEL EQUIPO
> **LAWYER PHOTOS ARE IMMUTABLE VISUAL ASSETS. NEVER APPLY scale, transform, zoom, parallax, pan, rotation, mouse tracking or hover movement directly to these images. Any animation must occur exclusively on their container, border, background or surrounding decorative layers.**

En hover del card de equipo: solo cambia el borde del marco (`rgba(244,241,234,.13)` → `rgba(199,167,108,.65)`) y aparece glow exterior (`box-shadow: 0 0 50px rgba(199,167,108,.12)`). La `<img>` no recibe ninguna transición ni transform. Nunca filtros sobre caras.

## Design Tokens

### Colores
| Token | Hex | Uso |
|---|---|---|
| `--negro-profundo` | `#080909` | Fondo base, footer |
| `--carbon` | `#0B0C0C` / `#111313` | Secciones oscuras alternas, superficies |
| `--marfil` | `#F4F1EA` | Secciones claras, texto sobre oscuro, botón primario |
| `--champagne` | `#C7A76C` | Acentos: líneas, kickers, glow, bordes activos. NUNCA dominante |
| `--oro-oscuro` | `#8A7046` | Acento sobre marfil (itálicas, líneas) |
| `--texto-secundario-oscuro` | `#9C978A` | Párrafos sobre oscuro |
| `--texto-terciario` | `#6E6A5F` | Metadatos, microcopy |
| `--texto-claro-body` | `#5C584D` | Párrafos sobre marfil |
| `--texto-tarjeta` | `#EDEAE0` / `#DDD9CE` | Texto en tarjetas glass |
| Bordes glass | `rgba(244,241,234,.09–.14)` | Tarjetas, inputs |
| Bordes champagne | `rgba(199,167,108,.14–.55)` | Hairlines, hovers, nav |
| Glass fill | `rgba(244,241,234,.025–.045)` + `backdrop-filter: blur(10–14px)` | Tarjetas, panel, form |

### Tipografía (Google Fonts)
- **Cormorant Garamond** (400–700 + itálicas) — display serif: titulares, números gigantes, logo, teléfono, preguntas FAQ.
- **Archivo** (300–700) — sans: UI, labels letterspaced, párrafos, botones.
- Escala: H1 hero serif `clamp(72px, 7.8vw, 116px)` line-height .98 + línea sans `clamp(30px,3.1vw,46px)` tracking `.14em`; H2 sección `clamp(40px,4vw,58px)`; CTA cinemático `clamp(64px,7vw,104px)`; título panel área 34px serif; ítems lista áreas 42px serif; párrafos 14–17px Archivo 300, line-height 1.7; labels/kickers 9.5–12px, tracking `.14em–.34em`, uppercase.

### Espaciado / Layout
- Contenedor máx: **1340px** (nav 1440px), padding lateral 48px.
- Padding vertical secciones: 120–150px. Hero: `min-height:100vh`. CTA cinemático: `min-height:82vh`.
- Gap tarjetas problemas: 14px (grid 4 col). Radios: **0px en todo** (esquinas rectas; solo burbujas chat 14px y círculos). 
- Breakpoints: desktop ≥1200, tablet 768–1199 (grids 4→2, áreas apiladas), mobile ≤767 (390×844 de referencia).

### Sombras / Luz
- Elevación tarjeta hover: `0 20px 44px -18px rgba(0,0,0,.6)`.
- Glow champagne: `0 0 36–50px rgba(199,167,108,.12–.35)` según intensidad.
- Grain: SVG feTurbulence tileado, `opacity:.05`, `mix-blend-mode:overlay` (hero y CTA).

## Screens / Componentes

### 1. Navbar (fixed, z-60)
- Inicial: transparente. Tras `scrollY > 40`: fondo `rgba(8,9,9,.72)` + `backdrop-filter: blur(16px)` + borde inferior `1px rgba(199,167,108,.16)`, fade-in 350ms.
- Izq: logo L + gavel dorado (SVG stroke `#C7A76C` 1.6) + R en Cormorant 27px; separador vertical; "ABOGADOS Y ASOCIADOS" 9px tracking .3em + "CHILE" 7.5px champagne.
- Links 11px tracking .14em color `#9C978A` → hover `#F4F1EA`. CTA outline champagne "CONSULTA TU CASO" → hover fill `rgba(199,167,108,.14)` + glow.

### 2. Hero (100vh)
Capas de fondo (orden):
1. Radial base `radial-gradient(120% 90% at 70% 10%, #101212, #0A0B0B 45%, #080909)`.
2. Dos blobs mesh: 820–900px, radial champagne `.10–.12`, `blur(70–80px)`, keyframes translate±70px/scale 1.12–1.18, **30s y 38s** ease-in-out infinite.
3. Grid arquitectónico: líneas 1px `rgba(244,241,234,.022)` cada 130px, ambos ejes.
4. Anillo geométrico derecha (760px): círculo exterior borde `rgba(199,167,108,.20)` rotando **180s** linear con nodo luminoso 5px (`box-shadow 0 0 14px 3px`); anillo interior `rgba(244,241,234,.07)` contra-rotación 220s; anillo estático champagne .12; elipse `rotateX(68deg)`; núcleo glow blur 24px.
5. Grain overlay.
- Contenido grid `1.15fr / .85fr`. Kicker con línea 30px champagne. H1: "EL DERECHO," (serif) / "CUANDO MÁS LO NECESITAS." (sans, punto champagne). Sub 17px. CTA primario marfil→hover champagne + glow; secundario ghost "EXPLORAR SERVICIOS". Fila meta: teléfono serif 22px + dots "ATENCIÓN CONFIDENCIAL" y "TRAMITACIÓN A LO LARGO DEL PAÍS", borde superior champagne .18.
- **Burbujas WhatsApp** (columna derecha, 3): glass `rgba(244,241,234,.045)` borde `.12` blur 14px, radius 14px con esquina apuntada, flotación vertical ±9px (**7–8.5s** ease-in-out infinite, delays escalonados), meta champagne (inicial + ciudad) + hora ✓✓. Caption: "◆ MENSAJES REFERENCIALES — SUSTITUIR POR RESEÑAS REALES VERIFICABLES". **No publicar testimonios inventados: reemplazar por reseñas reales o eliminar.**
- Indicador scroll: línea vertical gradiente champagne, pulso 2.6s.
- Luz de cursor (desktop): div fixed 640px radial `rgba(199,167,108,.075)`, sigue el mouse vía `transform: translate()` en rAF. Solo `pointer: fine` y sin reduced-motion.

### 3. ProblemSelector — "¿QUÉ NECESITAS RESOLVER?"
- Header: kicker "EMPIEZA POR TU SITUACIÓN" + H2 sans con "resolver" en serif itálica champagne + párrafo derecha 360px.
- Grid 4×14 tarjetas glass: número champagne + tag área (8.5px tracking .2em gris) arriba; problema 15.5px; flecha champagne abajo. La 14ª ("Tengo otro problema") lleva fill champagne `.07` y borde `.35` — es la catch-all destacada.
- Hover: `translateY(-4px)`, borde `rgba(199,167,108,.55)`, fondo `rgba(199,167,108,.06)`, sombra elevación. Transición **300ms cubic-bezier(.22,.6,.2,1)**.
- Los 14 ítems (con área): Me quiero divorciar·FAMILIA / No pagan la pensión·FAMILIA / Necesito cobrar alimentos·FAMILIA / Modificar o cesar alimentos·FAMILIA / Problemas con las visitas·FAMILIA / Regular el cuidado personal·FAMILIA / Me despidieron·LABORAL / Mi arrendatario no paga·CIVIL / Necesito cobrar una deuda·CIVIL / Tengo un problema penal·PENAL / Necesito hacer una compraventa·INMOBILIARIO / Tengo una herencia pendiente·CIVIL / Quiero registrar mi marca·MARCAS / Tengo otro problema·TODAS.
- Click → scroll a `#contacto` con el área preseleccionada en el select (en producción: también setear query param).

### 4. Marquee de áreas
- Banda entre hairlines champagne `.16`, fondo `#0B0C0C`, padding 30px.
- Texto Cormorant 62px **outline** (`-webkit-text-stroke: 1px rgba(244,241,234,.28)`, fill transparente), separadores ◆ champagne 11px. Contenido duplicado 2×, `translateX(-50%)` loop **80s linear infinite**. Pausable, decorativo (aria-hidden).

### 5. Frase editorial (marfil)
- Fondo `#F4F1EA`, texto `#111313`, 150px padding, centrado.
- "NO TODOS LOS PROBLEMAS" Archivo 700 `clamp(44px,4.6vw,68px)` tracking .05em / "necesitan la misma estrategia." Cormorant itálica `#8A7046`. Reveal por líneas (delay 160ms entre líneas). Caption con líneas que se dibujan (scaleX 0→1, 1.1s).

### 6. PracticeAreas — "NUESTRAS ÁREAS" (interactiva)
- Grid `1fr / 1.05fr` gap 70px. Anillo decorativo 700px arriba-derecha rotando 240s.
- Izquierda: 6 filas (Familia, Civil, Laboral, Penal, Inmobiliario, Propiedad Industrial) — número champagne 10.5px + nombre Cormorant 42px + rombo indicador champagne rotado 45° con glow en la activa. Hover fila: `padding-left: 14px` (300ms). `mouseenter` cambia el panel.
- Derecha (sticky top 110px, min-height 520px): panel glass borde `.1`, blur 12px, padding 52px, "§" gigante 260px `rgba(244,241,234,.04)` de fondo. Contenido por área: kicker "ÁREA 0X — NOMBRE", claim serif 34px, párrafo, chips de servicios (borde champagne .3, 10px tracking .14em, padding 9×14), link "CUÉNTANOS TU CASO →" (hover: gap 10→16px).
- Transición de panel: entrada `opacity 0→1 + blur(10px)→0 + translateY(14px)→0`, **500ms cubic-bezier(.22,.6,.2,1)**. Sin zoom.
- Contenidos exactos de chips por área: ver prototipo (Familia 8 chips, Civil 7, Laboral 5, Penal 5, Inmobiliario 4, Marcas 2).
- **Mobile: acordeón** — cada área expande su detalle debajo (mismo contenido de panel).

### 7. Process — "PRIMERO ENTENDEMOS. Después actuamos." (marfil)
- Título centrado dos líneas (sans 700 + serif itálica oro).
- 4 columnas con `border-left: 1px rgba(17,19,19,.15)` (última también border-right): número Cormorant **130px** `rgba(138,112,70,.14)`, label 12px tracking .24em superpuesto (-28px), párrafo 14px `#5C584D` máx 230px.
- Pasos: 01 NOS CUENTAS / 02 ANALIZAMOS / 03 DEFINIMOS / 04 ACTUAMOS (copy exacto en prototipo). Reveal escalonado 120ms.
- Fila de valores al pie: ATENCIÓN PERSONALIZADA ◆ COMUNICACIÓN CLARA ◆ CONFIDENCIALIDAD ◆ ESTRATEGIA JURÍDICA ◆ SEGUIMIENTO DEL CASO (9.5px tracking .22em).

### 8. Team — "Quienes toman tu caso."
- 2 cards máx 900px: marco `padding:12px`, borde `rgba(244,241,234,.13)`, esquinas champagne en L (26px, top-left y bottom-right), foto 440px alto.
- Rainier Daroch — ABOGADO · SOCIO FUNDADOR. Lucas Orellana Garrido — ASESOR JURÍDICO.
- Hover: SOLO marco y glow (ver regla inmutable arriba).
- Cierre itálico: "Defendemos tus derechos. Protegemos tus intereses."

### 9. ConversionBanner — CTA cinemático (82vh)
- Fondo radial cálido desde abajo + blob champagne animado + medio anillo gigante (820px) asomando desde abajo rotando 200s con nodo luminoso + grain.
- "CONVERSEMOS" kicker → "HABLEMOS DE TU CASO." serif `clamp(64px,7vw,104px)` → párrafo → **botón border-beam**: contenedor `padding:1px; overflow:hidden` con capa `conic-gradient(transparent 0 68%, rgba(199,167,108,.9) 82%, transparent)` rotando **5s linear infinite**; interior `#0B0C0C` padding 20×38, "HABLAR POR WHATSAPP ↗". Teléfono serif 24px debajo.

### 10. ContactForm (`#contacto`)
- Grid `.9fr/1.1fr` gap 80px. Izquierda: kicker + título serif + párrafo + 3 bullets de privacidad/confidencialidad/país.
- Derecha: panel glass padding 46px. Campos: NOMBRE, WHATSAPP, EMAIL (OPCIONAL) — inputs `rgba(8,9,9,.6)`, borde `rgba(244,241,234,.14)`, padding 15×16; ÁREA select (Familia/Civil/Laboral/Penal/Inmobiliario/Marcas/Otro); textarea "CUÉNTANOS BREVEMENTE" 4 filas.
- **Focus**: borde `#C7A76C` + `box-shadow: 0 0 0 3px rgba(199,167,108,.12)`, 300ms. Labels 9.5px tracking .22em.
- Submit "ENVIAR CONSULTA →" marfil→hover champagne+glow. Comportamiento: componer mensaje y abrir `https://wa.me/56945995534?text=...` (URL-encoded: nombre, área, relato, email). Microcopy legal debajo.
- Validación: nombre y whatsapp requeridos; email opcional con formato; nunca pedir datos sensibles adicionales.

### 11. FAQ (marfil)
- Máx 860px, filas con `border-bottom rgba(17,19,19,.16)`: pregunta Cormorant 24px + "+" oro (rotar a "×" al abrir). Hover: `padding-left:14px`.
- Respuesta expande con fade+blur-in 400ms (en producción: animar height con grid-template-rows o similar). Un solo ítem abierto a la vez. 5 preguntas/respuestas exactas en el prototipo.

### 12. Footer
- 4 columnas: logo+tagline / NAVEGACIÓN / CONTACTO (WhatsApp, "Chile · Tramitación a lo largo del país", CTA) / REDES·LEGAL (Facebook — LR Abg Inmobiliarios; Instagram — @I.r.abogados_; Privacidad·Términos placeholders).
- Barra final: © 2026 + "ATENCIÓN CONFIDENCIAL ◆ ESTRATEGIA JURÍDICA".

### 13. WhatsAppCTA flotante
- Desktop: pill fixed bottom/right 26px, glass oscuro borde champagne .45, icono chat + dot pulsante + "¿NECESITAS ORIENTACIÓN? / WHATSAPP ↗". Hover: borde champagne sólido + glow.
- **Mobile: reemplazar por barra inferior sticky** full-width: botón champagne "HABLAR POR WHATSAPP" + botón outline "FORMULARIO" (ver sección Mobile).

## Interactions & Behavior — resumen de animaciones

| Animación | Qué | Duración/Easing | Trigger | Clase |
|---|---|---|---|---|
| Scroll reveal | opacity 0→1, translateY 26→0 | 900ms cubic-bezier(.22,.6,.2,1), stagger 40–160ms | IntersectionObserver threshold .1, una vez | ESSENTIAL |
| Line draw | scaleX 0→1 origin left | 1100ms mismo easing | IO threshold .4 | ENHANCEMENT |
| Navbar solidify | fade fondo blur | 350ms ease | scrollY > 40 | ESSENTIAL |
| Mesh blobs | translate/scale loop | 26–38s ease-in-out | siempre | ENHANCEMENT |
| Anillos | rotate 360° | 180–240s linear | siempre | ENHANCEMENT |
| Cursor glow | translate rAF | inmediato | mousemove | DESKTOP ONLY |
| Marquee | translateX -50% loop | 80s linear | siempre | ENHANCEMENT |
| Burbujas bob | translateY ±9px | 7–8.5s ease-in-out | siempre | ENHANCEMENT |
| Card hover | lift+borde+glow | 300ms cubic-bezier(.22,.6,.2,1) | hover | ESSENTIAL |
| Panel áreas | fade+blur+translateY in | 500ms | mouseenter/acordeón | ESSENTIAL |
| Border beam CTA | conic-gradient rotate | 5s linear | siempre | ENHANCEMENT |
| FAQ expand | fade+blur in (height en prod) | 400ms | click | ESSENTIAL |
| Focus inputs | borde+ring champagne | 300ms | focus | ESSENTIAL |

**prefers-reduced-motion**: desactivar TODO lo continuo (mesh, anillos, marquee queda estático, burbujas quietas, cursor glow off) y los reveals (contenido visible directamente). El diseño debe verse completo y premium sin animación.

**Performance**: solo `transform`/`opacity` en loops; blobs y glow con `will-change: transform`; grain como tile SVG pequeño; pausar loops fuera de viewport (`IntersectionObserver`); en mobile desactivar cursor glow y reducir blobs a 1.

## Responsive — Desktop → Tablet → Mobile (390×844)
- **Navbar**: mobile = logo + hamburguesa; CTA "Consulta tu caso" dentro del menú; menú overlay oscuro blur.
- **Hero**: 1 columna; H1 42–48px serif + 24px sans; burbujas → 2 apiladas bajo el contenido (o carrusel), caption referencial se mantiene; anillo reducido y parcial tras el texto; sin cursor glow.
- **Problemas**: grid 4→2 (tablet) →1–2 col scroll natural (mobile), tarjetas táctiles ≥56px alto, tap = ir al formulario con área preseleccionada.
- **Marquee**: 40px de tipo, misma velocidad.
- **Áreas**: acordeón premium (fila 28px serif + expandir panel debajo).
- **Proceso**: columnas apiladas con línea vertical continua a la izquierda.
- **Equipo**: cards apiladas, foto alto 400px.
- **CTA cinemático**: titular 56px, botón full-width.
- **Formulario**: 1 columna, inputs full-width, altura táctil ≥52px.
- **Barra WhatsApp sticky inferior** (reemplaza pill flotante): fondo `rgba(23,21,15,.97)` blur, borde superior champagne, botones "HABLAR POR WHATSAPP" (champagne) + "FORMULARIO" (outline). Padding seguro iOS (`env(safe-area-inset-bottom)`).
- Texto mínimo mobile 12px; hit targets ≥44px.

## Landing dinámica por campaña (`/consulta?area=…`)
El prototipo lo simula con el tweak `campana`. En producción: leer query param `area` (`despido|alimentos|divorcio|arriendos|penal`) y:
1. Mostrar badge pill en hero (borde champagne, dot pulsante) con el texto del mapa: despido→"DESPIDOS Y DERECHOS LABORALES · REVISA TU CASO"; alimentos→"PENSIÓN DE ALIMENTOS · SOLICITUD, COBRO Y MODIFICACIÓN"; divorcio→"DIVORCIO Y FAMILIA · TE ACOMPAÑAMOS CON DISCRECIÓN"; arriendos→"ARRENDATARIOS MOROSOS · RECUPERA TU PROPIEDAD"; penal→"DEFENSA PENAL · ACTUAR A TIEMPO MARCA LA DIFERENCIA".
2. Preseleccionar el área en el select del formulario.
3. Opcional: reordenar el grid de problemas poniendo primero los del área.

## State Management
- `scrolled: boolean` (navbar).
- `areaActiva: 0–5` (panel de áreas; mouseenter en desktop, click en acordeón mobile).
- `faqAbierta: number|null` (un ítem a la vez).
- Form: valores de 5 campos; submit compone URL wa.me. Sin backend requerido en v1 (todo va a WhatsApp); si luego se agrega backend, POST + fallback a WhatsApp.
- Query param `area` → badge + preselección.

## Reglas de credibilidad (obligatorias)
- No inventar: casos ganados, años de experiencia, nº de clientes, premios, porcentajes, tarifas, plazos garantizados.
- Prohibido: "Ganamos tu caso", "Resultados garantizados", "100% de éxito", "Los mejores abogados de Chile", "Consulta gratuita" (salvo confirmación real).
- Burbujas/testimonios: SOLO reseñas reales y verificables; los textos del prototipo son referenciales.

## Assets
- Logo: lockup tipográfico L + gavel SVG (stroke `#C7A76C`, 1.6px) + R en Cormorant Garamond, con "ABOGADOS Y ASOCIADOS" letterspaced. Existe versión oficial en los flyers del cliente (carpeta `uploads/` del proyecto de diseño) — pedir el archivo vectorial original si existe.
- Fotos abogados: PENDIENTES (slots en el prototipo). Blanco y negro cálido, fondo arquitectónico, como la portada de Facebook existente.
- Grain: SVG inline feTurbulence (en el prototipo, reutilizable).
- ⚠ **Teléfono**: el brief indica **+56 9 4599 5534** (usado en el diseño); los flyers existentes dicen +56 9 4590 5534. **Confirmar con el cliente antes de publicar.**
- Redes: Facebook "LR Abg Inmobiliarios" · Instagram "@I.r.abogados_".

## Files
- `LR Landing Cinematica.dc.html` — prototipo completo (desktop). El bloque `<script>` final contiene la lógica de interacción de referencia (reveals, glow, áreas, FAQ, submit).
- `image-slot.js` — helper de placeholders de foto del prototipo (no portar a producción).
