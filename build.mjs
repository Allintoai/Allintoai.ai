import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, 'dist');
// An explicit public-file list prevents publishing archives, Git metadata,
// deployment configuration, dependencies or future credentials as assets.
const publicFiles = [
  'index.html', 'app.html', 'login.html', 'loading.html', 'x-layer.html',
  'styles.css', 'agent-flow.css', 'agent-flow.js', 'logo.svg', 'favicon.png', 'apple-touch-icon.png',
  'robots.txt', 'sitemap.xml',
  'Modern Creative Logo Instagram Post_20250621_114837_0000.svg'
];
const assetTypes = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.ico', '.woff', '.woff2', '.css', '.js']);
async function copyAssets(directory, destination) {
  await mkdir(destination, { recursive: true });
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const source = path.join(directory, entry.name);
    const target = path.join(destination, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Public assets cannot be symlinks: ${source}`);
    if (entry.isDirectory()) await copyAssets(source, target);
    else if (assetTypes.has(path.extname(entry.name).toLowerCase())) await cp(source, target);
    else throw new Error(`Review unexpected public asset type: ${source}`);
  }
}
// Verify source files before replacing the generated output.
for (const file of publicFiles) {
  if (!(await stat(path.join(root, file))).isFile()) throw new Error(`Missing public file: ${file}`);
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of publicFiles) await cp(path.join(root, file), path.join(output, file));
await copyAssets(path.join(root, 'assets'), path.join(output, 'assets'));
console.log('Built homepage static assets in dist/ (source HTML copied unchanged).');
