/**
 * AUREVIA — service worker mínimo y honesto.
 *
 * Su función es habilitar la instalación como aplicación (PWA) y dar un
 * mensaje claro sin conexión. NO cachea páginas de la plataforma ni llamadas
 * a la API: los datos clínicos son en vivo y privados, y fingir que la app
 * funciona sin internet sería mentirle al equipo de la clínica.
 */
const CACHE = "aurevia-estatico-v1";
const ESTATICOS = ["/logo-mark.svg", "/icon-192.png", "/icon-512.png", "/favicon-32.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ESTATICOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Estáticos de marca: caché primero (no cambian y aceleran el arranque).
  if (url.origin === location.origin && ESTATICOS.includes(url.pathname)) {
    event.respondWith(caches.match(event.request).then((hit) => hit ?? fetch(event.request)));
    return;
  }

  // Todo lo demás va SIEMPRE a la red. Sin conexión, una navegación recibe
  // un aviso claro en vez de un error críptico del navegador.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(
          `<!doctype html><html lang="es"><head><meta charset="utf-8">
           <meta name="viewport" content="width=device-width, initial-scale=1">
           <title>Sin conexión · AUREVIA</title>
           <style>body{font-family:system-ui,sans-serif;background:#071523;color:#f2f7fb;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center;padding:24px}
           h1{font-size:1.4rem}p{color:#8aa0b4;max-width:38ch}</style></head>
           <body><div><h1>Sin conexión a internet</h1>
           <p>AUREVIA trabaja con los datos en vivo de tu clínica, así que necesita conexión. Revisa tu red y vuelve a intentarlo.</p>
           </div></body></html>`,
          { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } },
        ),
      ),
    );
  }
});
