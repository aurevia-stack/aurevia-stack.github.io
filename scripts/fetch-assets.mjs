// Build de Vercel: arma /public descargando el sitio estático desde el
// espejo de GitHub Pages (mismo repositorio, ya desplegado). Así el deploy
// por MCP solo envía archivos de texto pequeños. Para publicar cambios:
// push al espejo primero, luego redeploy en Vercel.
import { mkdir, writeFile } from 'node:fs/promises';

const MIRROR = 'https://aurevia-stack.github.io';
const OUT = 'public';

const files = [
  'index.html',
  '404.html',
  'gracias.html',
  'robots.txt',
  'sitemap.xml',
  'assets/css/main.css',
  'assets/js/main.js',
  'assets/img/favicon.svg',
  'assets/img/team/rainier-daroch.jpg',
  'assets/img/team/lucas-orellana.jpg',
  'assets/img/team/marcelo-avila.jpg',
  'assets/img/og-cover.jpg',
  'assets/img/favicon-32.png',
  'assets/img/apple-touch-icon.png',
];

await mkdir(`${OUT}/assets/img/team`, { recursive: true });
await mkdir(`${OUT}/assets/css`, { recursive: true });
await mkdir(`${OUT}/assets/js`, { recursive: true });

for (const path of files) {
  const url = `${MIRROR}/${path}?build=${Date.now()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo descargar ${url}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 60) throw new Error(`Descarga sospechosamente pequeña: ${url} (${buf.length}B)`);
  await writeFile(`${OUT}/${path}`, buf);
  console.log(`ok ${path} (${buf.length} bytes)`);
}

// Verificación: el index descargado debe ser la landing con el canonical correcto
const idx = (await import('node:fs')).readFileSync(`${OUT}/index.html`, 'utf8');
if (!idx.includes('lr-abogados.vercel.app') || !idx.includes('EL DERECHO,')) {
  throw new Error('index.html descargado no es la versión esperada (canonical o contenido incorrecto)');
}
console.log('public/ listo y verificado');
