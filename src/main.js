import './styles.css';
import { createPlan, formatPlanForText, getMissingFields } from './planner.js';

const app = document.querySelector('#app');

app.innerHTML = `
  <section class="shell" aria-labelledby="workspace-title">
    <header class="topbar">
      <div class="brand-lockup" aria-label="ShortsJarvis home">
        <span class="brand-mark" aria-hidden="true">SJ</span>
        <div>
          <p class="eyebrow">SHORT-FORM CONTENT WORKSPACE</p>
          <p class="brand-name">ShortsJarvis</p>
        </div>
      </div>
      <div class="topbar-meta">
        <span class="status-pill"><span class="status-dot" aria-hidden="true"></span>Local-first MVP</span>
        <span class="topbar-note">No account needed</span>
      </div>
    </header>

    <main class="dashboard">
      <section class="dashboard-intro" aria-labelledby="workspace-title">
        <div>
          <p class="eyebrow accent-eyebrow">CREATOR WORKSPACE / 01</p>
          <h1 id="workspace-title">Make the next short easier to <span>shoot.</span></h1>
          <p class="intro">Shape the idea first. Then turn it into a practical, shoot-ready draft.</p>
        </div>
        <div class="workflow-card" aria-label="Three step workflow">
          <p class="card-label">YOUR WORKFLOW</p>
          <ol class="workflow-list">
            <li class="workflow-step is-active"><span>01</span><strong>Shape</strong><small>Set the brief</small></li>
            <li class="workflow-step"><span>02</span><strong>Generate</strong><small>Use templates</small></li>
            <li class="workflow-step"><span>03</span><strong>Refine</strong><small>Make it yours</small></li>
          </ol>
        </div>
      </section>

      <div class="workspace-grid">
        <section class="panel brief-panel" aria-labelledby="planner-title">
          <div class="panel-heading">
            <div>
              <p class="card-label">START WITH A BRIEF</p>
              <h2 id="planner-title">Build your video plan</h2>
            </div>
            <span class="template-badge">Rule-driven templates</span>
          </div>
          <p class="panel-description">Give the idea a little shape. Your inputs stay in this browser and guide the draft.</p>

          <form id="planner-form" class="planner-form">
            <div class="field field-full">
              <label for="idea">Video idea <span class="required-mark">*</span></label>
              <textarea id="idea" name="idea" rows="4" placeholder="e.g. Three ways I plan a week of content in 30 minutes" required></textarea>
              <p class="field-hint">Start with the rough idea — it does not need to be polished.</p>
            </div>

            <div class="field-grid">
              <div class="field">
                <label for="platform">Platform</label>
                <select id="platform" name="platform">
                  <option>TikTok</option>
                  <option>Instagram Reels</option>
                  <option>YouTube Shorts</option>
                </select>
              </div>
              <div class="field">
                <label for="category">Content category</label>
                <select id="category" name="category">
                  <option>Education</option>
                  <option>Behind the scenes</option>
                  <option>Storytelling</option>
                  <option>Review</option>
                  <option>Personal brand</option>
                </select>
              </div>
              <div class="field">
                <label for="audience">Audience</label>
                <input id="audience" name="audience" type="text" placeholder="e.g. first-time creators" />
              </div>
              <div class="field">
                <label for="tone">Tone</label>
                <select id="tone" name="tone">
                  <option>Clear & direct</option>
                  <option>Playful</option>
                  <option>Bold</option>
                  <option>Calm & thoughtful</option>
                </select>
              </div>
            </div>

            <div class="form-footer">
              <p class="form-disclosure"><span aria-hidden="true">✦</span>Templates, not real AI. No API key required.</p>
              <button class="primary-button" type="submit">Generate draft plan <span aria-hidden="true">↗</span></button>
            </div>
            <p class="form-feedback" id="form-feedback" role="alert" hidden></p>
          </form>
        </section>

        <aside class="panel guide-panel" aria-labelledby="guide-title">
          <div class="panel-heading compact-heading">
            <div>
              <p class="card-label">KEEP IT MOVING</p>
              <h2 id="guide-title">A useful draft beats a blank page.</h2>
            </div>
          </div>
          <div class="guide-copy">
            <p>Start with one clear viewer problem. The first draft is a place to edit, not a finished script.</p>
            <div class="guide-rule"><span>01</span><span>Lead with a specific tension.</span></div>
            <div class="guide-rule"><span>02</span><span>Give one useful next step.</span></div>
            <div class="guide-rule"><span>03</span><span>End with a reason to return.</span></div>
          </div>
        </aside>
      </div>

      <section class="panel planner-panel" aria-labelledby="plan-title">
        <div class="panel-heading planner-heading">
          <div>
            <p class="card-label">YOUR PLANNER</p>
            <h2 id="plan-title">Draft output</h2>
          </div>
          <span class="result-status" id="result-status">Waiting for your brief</span>
        </div>

        <div class="empty-planner" id="empty-planner">
          <div class="empty-icon" aria-hidden="true">✦</div>
          <h3>Your plan will appear here</h3>
          <p>Fill in the brief above to create a first pass for your hooks, outline, and call to action.</p>
          <div class="empty-tags" aria-hidden="true"><span>Hooks</span><span>Outline</span><span>CTA</span></div>
        </div>

        <div class="plan-result" id="plan-result" hidden aria-live="polite">
          <div class="plan-meta" id="plan-meta"></div>
          <div class="outputs-grid">
            <section class="output-card hooks-output" aria-labelledby="hooks-title">
              <div class="output-heading"><span class="output-number">01</span><div><p class="card-label">OPEN STRONG</p><h3 id="hooks-title">Hook options</h3></div></div>
              <div class="editable-list" id="hook-list"></div>
            </section>
            <section class="output-card outline-output" aria-labelledby="outline-title">
              <div class="output-heading"><span class="output-number">02</span><div><p class="card-label">KEEP THE THREAD</p><h3 id="outline-title">Simple outline</h3></div></div>
              <div class="editable-list" id="outline-list"></div>
            </section>
            <section class="output-card cta-output" aria-labelledby="cta-title">
              <div class="output-heading"><span class="output-number">03</span><div><p class="card-label">CLOSE WITH INTENT</p><h3 id="cta-title">Call to action</h3></div></div>
              <label class="sr-only" for="cta-editor">Call to action draft</label>
              <textarea id="cta-editor" class="output-editor cta-editor" rows="3"></textarea>
            </section>
            <section class="output-card script-output" aria-labelledby="script-title">
              <div class="output-heading"><span class="output-number">04</span><div><p class="card-label">SAY IT OUT LOUD</p><h3 id="script-title">Full script</h3></div></div>
              <label class="sr-only" for="script-editor">Full video script</label>
              <textarea id="script-editor" class="output-editor script-editor" rows="10"></textarea>
            </section>
            <section class="output-card scenes-output" aria-labelledby="scenes-title">
              <div class="output-heading"><span class="output-number">05</span><div><p class="card-label">SEE THE BEATS</p><h3 id="scenes-title">Scene breakdown</h3></div></div>
              <div class="scene-list" id="scene-list"></div>
            </section>
          </div>
          <div class="plan-actions">
            <p class="edit-note"><span aria-hidden="true">↳</span> Edit any field before you copy or export the plan.</p>
            <div class="action-buttons">
              <button class="secondary-button" id="copy-plan" type="button">Copy full plan</button>
              <button class="secondary-button secondary-button-accent" id="export-plan" type="button">Export .txt <span aria-hidden="true">↓</span></button>
            </div>
          </div>
          <p class="action-feedback" id="action-feedback" role="status" aria-live="polite" hidden></p>
        </div>
      </section>
    </main>

    <footer class="disclosure">
      <span class="disclosure-dot" aria-hidden="true"></span>
      <p>ShortsJarvis uses transparent, rule-driven templates — not real AI generation.</p>
    </footer>
  </section>
`;

const form = document.querySelector('#planner-form');
const feedback = document.querySelector('#form-feedback');
const emptyPlanner = document.querySelector('#empty-planner');
const planResult = document.querySelector('#plan-result');
const resultStatus = document.querySelector('#result-status');
const planMeta = document.querySelector('#plan-meta');
const hookList = document.querySelector('#hook-list');
const outlineList = document.querySelector('#outline-list');
const ctaEditor = document.querySelector('#cta-editor');
const scriptEditor = document.querySelector('#script-editor');
const sceneList = document.querySelector('#scene-list');
const copyPlanButton = document.querySelector('#copy-plan');
const exportPlanButton = document.querySelector('#export-plan');
const actionFeedback = document.querySelector('#action-feedback');
let activePlan = null;

const createEditor = (label, value, className = '', data = {}) => {
  const wrapper = document.createElement('label');
  wrapper.className = 'editor-row';

  const rowLabel = document.createElement('span');
  rowLabel.className = 'editor-label';
  rowLabel.textContent = label;

  const editor = document.createElement('textarea');
  editor.className = `output-editor ${className}`.trim();
  editor.rows = 2;
  editor.value = value;
  editor.setAttribute('aria-label', label);
  Object.entries(data).forEach(([key, dataValue]) => {
    editor.dataset[key] = dataValue;
  });

  wrapper.append(rowLabel, editor);
  return wrapper;
};

const showFeedback = (message) => {
  feedback.textContent = message;
  feedback.hidden = false;
};

const showActionFeedback = (message, type = 'success') => {
  actionFeedback.textContent = message;
  actionFeedback.className = `action-feedback is-${type}`;
  actionFeedback.hidden = false;
};

const createSceneCard = (scene, index) => {
  const card = document.createElement('article');
  card.className = 'scene-card';
  card.dataset.timing = scene.timing;
  card.dataset.purpose = scene.purpose;

  const heading = document.createElement('div');
  heading.className = 'scene-heading';

  const number = document.createElement('span');
  number.className = 'scene-number';
  number.textContent = String(index + 1).padStart(2, '0');

  const title = document.createElement('h4');
  title.textContent = scene.purpose;

  const timing = document.createElement('span');
  timing.className = 'scene-timing';
  timing.textContent = scene.timing;

  heading.append(number, title, timing);

  const fields = document.createElement('div');
  fields.className = 'scene-fields';
  fields.append(
    createEditor('Narration', scene.narration, 'scene-editor', { kind: 'scene-narration' }),
    createEditor('Suggested visual', scene.visual, 'scene-editor', { kind: 'scene-visual' }),
    createEditor('On-screen caption', scene.caption, 'scene-editor', { kind: 'scene-caption' }),
  );

  card.append(heading, fields);
  return card;
};

const renderPlan = (plan) => {
  hookList.replaceChildren(...plan.hooks.map((hook, index) => createEditor(`Hook option ${index + 1}`, hook)));
  outlineList.replaceChildren(...plan.outline.map((step, index) => createEditor(`Outline step ${index + 1}`, step, 'outline-editor')));
  ctaEditor.value = plan.cta;
  scriptEditor.value = plan.script;
  sceneList.replaceChildren(...plan.scenes.map(createSceneCard));
  planMeta.textContent = `${plan.input.platform} · ${plan.input.category} · ${plan.input.audience || 'curious viewers'} · ${plan.input.tone}`;
  activePlan = plan;
  emptyPlanner.hidden = true;
  planResult.hidden = false;
  resultStatus.textContent = 'Draft generated locally';
  feedback.hidden = true;
  actionFeedback.hidden = true;
};

const collectCurrentPlan = () => {
  if (!activePlan) return null;

  return {
    input: { ...activePlan.input },
    hooks: [...hookList.querySelectorAll('textarea')].map((editor) => editor.value),
    outline: [...outlineList.querySelectorAll('textarea')].map((editor) => editor.value),
    cta: ctaEditor.value,
    script: scriptEditor.value,
    scenes: [...sceneList.querySelectorAll('.scene-card')].map((card) => ({
      timing: card.dataset.timing,
      purpose: card.dataset.purpose,
      narration: card.querySelector('[data-kind="scene-narration"]').value,
      visual: card.querySelector('[data-kind="scene-visual"]').value,
      caption: card.querySelector('[data-kind="scene-caption"]').value,
    })),
  };
};

const copyText = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const fallback = document.createElement('textarea');
  fallback.value = text;
  fallback.setAttribute('readonly', '');
  fallback.style.position = 'fixed';
  fallback.style.opacity = '0';
  document.body.append(fallback);
  fallback.select();

  const copied = typeof document.execCommand === 'function' && document.execCommand('copy');
  fallback.remove();

  if (!copied) {
    throw new Error('Clipboard access is unavailable.');
  }
};

const getPlanFilename = (plan) => {
  const slug = plan.input.idea
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 42);

  return `${slug || 'shortsjarvis'}-plan.txt`;
};

copyPlanButton.addEventListener('click', async () => {
  const currentPlan = collectCurrentPlan();
  if (!currentPlan) return;

  try {
    await copyText(formatPlanForText(currentPlan));
    showActionFeedback('Full plan copied with your latest edits.');
  } catch {
    showActionFeedback('Copy was blocked by the browser. Select the editable text manually.', 'error');
  }
});

exportPlanButton.addEventListener('click', () => {
  const currentPlan = collectCurrentPlan();
  if (!currentPlan) return;

  const blob = new Blob([formatPlanForText(currentPlan)], { type: 'text/plain;charset=utf-8' });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = getPlanFilename(currentPlan);
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
  showActionFeedback('TXT export is ready with your latest edits.');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(form).entries());
  const missingFields = getMissingFields(values);

  if (missingFields.length > 0) {
    showFeedback('Add a video idea before generating your draft plan.');
    document.querySelector('#idea').focus();
    return;
  }

  renderPlan(createPlan(values));
});
