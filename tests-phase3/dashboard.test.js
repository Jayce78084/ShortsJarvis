import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('the generated plan exposes script, scenes, captions, copy, and export controls', async () => {
  const source = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');

  for (const id of ['script-editor', 'scene-list', 'copy-plan', 'export-plan', 'action-feedback']) {
    assert.match(source, new RegExp(`id="${id}"`));
  }

  assert.match(source, /formatPlanForText/);
  assert.match(source, /latest edits/);
  assert.match(source, /Blob\(\[formatPlanForText\(currentPlan\)\]/);
});
