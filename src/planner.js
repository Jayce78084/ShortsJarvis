const FALLBACKS = {
  platform: 'TikTok',
  category: 'Education',
  audience: 'curious viewers',
  tone: 'Clear & direct',
};

const clean = (value) => String(value ?? '').trim();

const withFallback = (value, fallback) => clean(value) || fallback;

export function getMissingFields(input = {}) {
  return clean(input.idea) ? [] : ['idea'];
}

export function createPlan(input = {}) {
  const idea = clean(input.idea);
  const platform = withFallback(input.platform, FALLBACKS.platform);
  const category = withFallback(input.category, FALLBACKS.category);
  const audience = withFallback(input.audience, FALLBACKS.audience);
  const tone = withFallback(input.tone, FALLBACKS.tone);
  const topic = idea || 'your next short';
  const audienceLabel = audience;

  const hooks = [
    `The ${category.toLowerCase()} mistake ${audienceLabel} make with ${topic}.`,
    `If ${audienceLabel} want ${topic}, start with this ${tone.toLowerCase()} shift.`,
    `Try this ${platform} angle for ${topic} before you hit record.`,
  ];

  const outline = [
    `Hook (0–3s): Open with “${topic}” and the tension your viewer already feels.`,
    `Context (3–8s): Name the ${category.toLowerCase()} problem in one ${tone.toLowerCase()} sentence.`,
    `Value (8–25s): Give ${audienceLabel} one practical step they can try today.`,
    `Payoff (25–35s): Show the intended result, then bridge to the next action.`,
  ];

  const scenes = [
    {
      timing: '0–3s',
      purpose: 'Hook',
      narration: `Open on the tension around “${topic}”: “${hooks[0]}”`,
      visual: `Face-to-camera for ${platform}; put “${topic}” in the first frame with a quick ${category.toLowerCase()} visual.`,
      caption: `${category}: ${topic}`,
    },
    {
      timing: '3–8s',
      purpose: 'Context',
      narration: `Tell ${audienceLabel} why ${topic} matters, using a ${tone.toLowerCase()} explanation that makes the problem feel specific.`,
      visual: `Cut to a simple example of ${topic} that ${audienceLabel} would recognize on ${platform}.`,
      caption: `Why ${topic} matters to ${audienceLabel}`,
    },
    {
      timing: '8–25s',
      purpose: 'Value',
      narration: `Show ${audienceLabel} one practical step for ${topic}, then demonstrate what that step looks like in a ${tone.toLowerCase()} way.`,
      visual: `Demonstrate the step with a close-up, screen recording, or before-and-after tied to ${category.toLowerCase()}.`,
      caption: `${tone} step: try this next`,
    },
    {
      timing: '25–35s',
      purpose: 'Payoff + CTA',
      narration: `Close the ${category.toLowerCase()} example on ${platform}: “${outline[3]}” Then invite ${audienceLabel} to save it for later.`,
      visual: `Return to camera, show the finished result, and leave room for a clear ${platform} follow or save prompt.`,
      caption: `Save this ${category.toLowerCase()} plan`,
    },
  ];

  const script = scenes
    .map((scene) => `[${scene.timing}] ${scene.purpose}: ${scene.narration}`)
    .join('\n\n');

  return {
    input: { idea, platform, category, audience, tone },
    hooks,
    outline,
    cta: `Invite ${audienceLabel} to save this ${category.toLowerCase()} idea and follow for the next step.`,
    script,
    scenes,
    captions: scenes.map(({ timing, caption }) => ({ timing, text: caption })),
  };
}

export function formatPlanForText(plan = {}) {
  const input = plan.input ?? {};
  const hooks = Array.isArray(plan.hooks) ? plan.hooks : [];
  const outline = Array.isArray(plan.outline) ? plan.outline : [];
  const scenes = Array.isArray(plan.scenes) ? plan.scenes : [];

  const lines = [
    'SHORTSJARVIS — DRAFT VIDEO PLAN',
    'Generated with transparent, rule-driven templates — not real AI generation.',
    '',
    'BRIEF',
    `Idea: ${input.idea ?? ''}`,
    `Platform: ${input.platform ?? ''}`,
    `Category: ${input.category ?? ''}`,
    `Audience: ${input.audience ?? ''}`,
    `Tone: ${input.tone ?? ''}`,
    '',
    'HOOK OPTIONS',
    ...hooks.map((hook, index) => `${index + 1}. ${hook}`),
    '',
    'FULL SCRIPT',
    plan.script ?? '',
    '',
    'SCENE BREAKDOWN',
  ];

  scenes.forEach((scene, index) => {
    lines.push(
      `${index + 1}. ${scene.timing ?? ''} — ${scene.purpose ?? ''}`,
      `Narration: ${scene.narration ?? ''}`,
      `Suggested visual: ${scene.visual ?? ''}`,
      `On-screen caption: ${scene.caption ?? ''}`,
      '',
    );
  });

  lines.push('OUTLINE', ...outline.map((step, index) => `${index + 1}. ${step}`), '', 'CALL TO ACTION', plan.cta ?? '');

  return lines.join('\n');
}
