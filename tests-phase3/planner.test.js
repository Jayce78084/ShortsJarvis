import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlan, formatPlanForText } from '../src/planner.js';

test('the generated script, scenes, and captions reflect the complete brief', () => {
  const input = {
    idea: 'Plan a week of content in 30 minutes',
    platform: 'YouTube Shorts',
    category: 'Behind the scenes',
    audience: 'first-time creators',
    tone: 'Playful',
  };
  const plan = createPlan(input);

  assert.equal(plan.scenes.length, 4);
  assert.deepEqual(plan.scenes.map((scene) => scene.timing), ['0–3s', '3–8s', '8–25s', '25–35s']);
  assert.equal(plan.captions.length, 4);
  assert.match(plan.script, /Plan a week of content in 30 minutes/);
  assert.match(plan.script, /first-time creators/);
  assert.match(plan.script, /playful/i);
  assert.match(plan.script, /YouTube Shorts/);
  assert.match(plan.script, /behind the scenes/i);

  for (const scene of plan.scenes) {
    assert.ok(scene.narration);
    assert.ok(scene.visual);
    assert.ok(scene.caption);
  }
});

test('the plan text formatter includes current edited output values', () => {
  const original = createPlan({ idea: 'A simple lighting setup' });
  const edited = {
    ...original,
    hooks: ['My edited hook'],
    outline: ['My edited outline'],
    script: 'Edited script line one\nEdited script line two',
    cta: 'My edited CTA',
    scenes: original.scenes.map((scene, index) => ({
      ...scene,
      narration: `Edited narration ${index + 1}`,
      visual: `Edited visual ${index + 1}`,
      caption: index === 0 ? '' : `Edited caption ${index + 1}`,
    })),
  };

  const text = formatPlanForText(edited);

  assert.match(text, /My edited hook/);
  assert.match(text, /My edited outline/);
  assert.match(text, /Edited script line one\nEdited script line two/);
  assert.match(text, /Edited narration 1/);
  assert.match(text, /Edited visual 1/);
  assert.match(text, /On-screen caption: \n/);
  assert.match(text, /My edited CTA/);
  assert.match(text, /not real AI generation/);
  assert.doesNotMatch(text, /My edited hook.*The education mistake/si);
});
