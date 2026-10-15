import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('the application shell has a ShortsJarvis entry point', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /<title>ShortsJarvis<\/title>/);
  assert.match(html, /src="\/src\/main\.js"/);
});
