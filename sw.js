// Kill-switch: el sitio anterior de aureviasystem.cl registraba un service worker
// en /sw.js con caché "aurevia-estatico-v1". Esta versión se instala en su lugar,
// borra todas las cachés, se desinstala y recarga las pestañas abiertas para que
// los visitantes antiguos vean la landing actual.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    var keys = await caches.keys();
    await Promise.all(keys.map(function (k) { return caches.delete(k); }));
    await self.registration.unregister();
    var clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(function (c) { c.navigate(c.url); });
  })());
});
