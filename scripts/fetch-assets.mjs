// Build de Vercel: arma /public con los archivos estáticos del repo y
// descarga las imágenes (binarios) desde el espejo de GitHub Pages,
// para que el deploy por MCP solo necesite enviar archivos de texto.
import { mkdir, copyFile, writeFile, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const MIRROR = 'https://aurevia-stack.github.io';
const OUT = 'public';

const textCopies = [
  'index.html',
  '404.html',
  'gracias.html',
  'robots.txt',
  'sitemap.xml',
];

const binaries = [
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

for (const f of textCopies) {
  if (existsSync(f)) await copyFile(f, `${OUT}/${f}`);
}
await cp('assets/css', `${OUT}/assets/css`, { recursive: true });
await cp('assets/js', `${OUT}/assets/js`, { recursive: true });
await copyFile('assets/img/favicon.svg', `${OUT}/assets/img/favicon.svg`);

for (const path of binaries) {
  const url = `${MIRROR}/${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo descargar ${url}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 100) throw new Error(`Descarga sospechosamente pequeña: ${url}`);
  await writeFile(`${OUT}/${path}`, buf);
  console.log(`ok ${path} (${buf.length} bytes)`);
}
console.log('public/ listo');
