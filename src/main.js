import './styles.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <section class="shell" aria-labelledby="page-title">
    <header class="topbar">
      <div class="brand-lockup" aria-label="ShortsJarvis home">
        <span class="brand-mark" aria-hidden="true">SJ</span>
        <div>
          <p class="eyebrow">SHORT-FORM CONTENT WORKSPACE</p>
          <p class="brand-name">ShortsJarvis</p>
        </div>
      </div>
      <span class="status-pill"><span class="status-dot" aria-hidden="true"></span>Local-first MVP</span>
    </header>

    <main class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow accent-eyebrow">YOUR NEXT SHORT, UNSTUCK</p>
        <h1 id="page-title">Turn rough ideas into <span>shoot-ready plans.</span></h1>
        <p class="intro">
          ShortsJarvis keeps the thinking clear, the hooks sharper, and the next
          recording step within reach.
        </p>
        <div class="foundation-note" role="note">
          <span class="note-icon" aria-hidden="true">✦</span>
          <div>
            <p class="card-label">FOUNDATION READY</p>
            <p class="note-copy">The planning workspace is ready for the next build step.</p>
          </div>
        </div>
      </div>

      <aside class="preview-card" aria-label="ShortsJarvis product preview">
        <div class="preview-header">
          <div>
            <p class="card-label">WORKSPACE PREVIEW</p>
            <p class="preview-title">Plan with intent</p>
          </div>
          <span class="preview-spark" aria-hidden="true">✦</span>
        </div>
        <div class="preview-lines" aria-hidden="true">
          <span class="preview-line preview-line-long"></span>
          <span class="preview-line preview-line-medium"></span>
          <span class="preview-line preview-line-short"></span>
        </div>
        <div class="preview-footer">
          <span>Planner</span>
          <span>Hook Lab</span>
          <span>Ready when you are</span>
        </div>
      </aside>
    </main>

    <footer class="disclosure">
      <span class="disclosure-dot" aria-hidden="true"></span>
      <p>Template-based generation will be rule-driven, not real AI generation.</p>
    </footer>
  </section>
`;
