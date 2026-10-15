import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlan, getMissingFields } from '../src/planner.js';

test('the planner requires a video idea but provides defaults for optional context', () => {
  assert.deepEqual(getMissingFields({}), ['idea']);
  assert.deepEqual(getMissingFields({ idea: '  ' }), ['idea']);
  assert.deepEqual(getMissingFields({ idea: 'A quick idea' }), []);

  const plan = createPlan({ idea: 'A quick idea' });
  assert.equal(plan.input.platform, 'TikTok');
  assert.equal(plan.input.category, 'Education');
  assert.equal(plan.input.audience, 'curious viewers');
  assert.equal(plan.input.tone, 'Clear & direct');
});

test('rule-based generation uses the brief and returns hooks, outline, and CTA', () => {
  const input = {
    idea: 'Plan a week of content in 30 minutes',
    platform: 'YouTube Shorts',
    category: 'Behind the scenes',
    audience: 'first-time creators',
    tone: 'Playful',
  };

  const plan = createPlan(input);
  const output = [...plan.hooks, ...plan.outline, plan.cta].join(' ');

  assert.deepEqual(createPlan(input), plan);
  assert.equal(plan.hooks.length, 3);
  assert.equal(plan.outline.length, 4);
  assert.match(output, /Plan a week of content in 30 minutes/);
  assert.match(output, /YouTube Shorts/);
  assert.match(output, /behind the scenes/i);
  assert.match(output, /first-time creators/);
  assert.match(output, /playful/i);
  assert.match(plan.cta, /save/i);
});

test('generation safely treats special characters as text data', () => {
  const plan = createPlan({ idea: '<script>alert("x")</script>' });

  assert.match(plan.hooks[0], /<script>alert\("x"\)<\/script>/);
  assert.doesNotMatch(plan.hooks[0], /&lt;script/);
});
