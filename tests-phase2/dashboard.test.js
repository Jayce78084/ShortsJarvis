import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('the Phase 2 dashboard exposes the planner brief and output sections', async () => {
  const source = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');

  for (const field of ['idea', 'platform', 'category', 'audience', 'tone']) {
    assert.match(source, new RegExp(`id="${field}"`));
  }

  assert.match(source, /id="planner-form"/);
  assert.match(source, /id="hook-list"/);
  assert.match(source, /id="outline-list"/);
  assert.match(source, /id="cta-editor"/);
  assert.match(source, /rule-driven templates/i);
  assert.match(source, /not real AI/i);
});
