# ShortsJarvis

ShortsJarvis is a focused planning workspace for creators making TikTok videos,
Instagram Reels, and YouTube Shorts.

The MVP uses transparent, rule-driven templates rather than external AI
services. It does not require an API key, account, or paid service.

## Requirements

- Node.js `22.23.3` (see `.nvmrc`)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Verify the project

```bash
npm test
npm run build
```

The production bundle is written to `build/`.

## Current scope

Phase 3 provides a responsive creator dashboard and a focused idea-to-plan flow.
Creators can enter a video idea, platform, category, audience, and tone, then
generate an editable first draft containing hook options, a simple outline, a
full script, a timed scene breakdown with visual suggestions and captions, and a
call to action. The current plan can be copied or exported as a TXT file.
Generation is local and rule-driven using transparent templates; it is not real
AI generation.

Accounts, paid APIs, external AI services, local saved plans, readiness scoring,
Hook Lab, video rendering, and subtitle-file export remain out of scope for this
phase.
