import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import worker from './worker.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
execFileSync(process.execPath, ['build.mjs'], { cwd: root });

test('www redirect retains path and query and does not fetch an asset', async () => {
  const response = await worker.fetch(new Request('https://www.allintoai.ai/x-layer?utm_source=handoff'), {
    ASSETS: { fetch() { throw new Error('Redirect should bypass asset fetch'); } }
  });
  assert.equal(response.status, 301);
  assert.equal(response.headers.get('location'), 'https://allintoai.ai/x-layer?utm_source=handoff');
});

test('apex and local requests retain original URL/method and asset response including 404', async () => {
  for (const url of ['https://allintoai.ai/', 'https://allintoai.ai/app.html?go=models', 'http://localhost:8787/missing']) {
    const request = new Request(url, { method: 'HEAD' });
    const expected = new Response(null, { status: url.endsWith('missing') ? 404 : 200 });
    const actual = await worker.fetch(request, { ASSETS: { fetch(received) { assert.equal(received, request); return expected; } } });
    assert.equal(actual, expected);
  }
});

test('built pages are byte-identical and all local HTML asset references resolve', async () => {
  for (const name of ['index.html', 'app.html', 'login.html', 'loading.html', 'x-layer.html']) {
    const source = await readFile(path.join(root, name), 'utf8');
    assert.equal(await readFile(path.join(root, 'dist', name), 'utf8'), source);
    for (const match of source.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
      const ref = match[1];
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(ref)) continue;
      const asset = decodeURIComponent(ref.split(/[?#]/)[0]);
      if (!asset || !path.extname(asset)) continue;
      await access(path.join(root, 'dist', asset.replace(/^\//, '')));
    }
  }
});

test('public build excludes archives, docs, credentials and Worker source', async () => {
  const names = await readdir(path.join(root, 'dist'), { recursive: true });
  for (const name of names) {
    assert.ok(!/(?:^|\/)(?:\.|node_modules|README|DEPLOYMENT|package|worker|build|deployment)|\.(?:zip|md|mjs|json|toml|env)$/i.test(name), name);
  }
  const config = JSON.parse(await readFile(path.join(root, 'wrangler.json'), 'utf8'));
  assert.equal(config.name, 'allintoai-ai');
  assert.equal(config.assets.directory, './dist');
  assert.equal(config.assets.run_worker_first, true);
  assert.equal(config.workers_dev, false);
  assert.ok(!('routes' in config) && !('route' in config));
});
