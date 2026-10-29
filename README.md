# ALL×AI — public homepage

Static marketing website for **https://allintoai.ai**, separate from the ModRecx/WorPrex application.

## Repositories and hosting

| Website | Repository / branch | Host |
| --- | --- | --- |
| allintoai.ai — public homepage | [Allintoai/Allintoai.ai](https://github.com/Allintoai/Allintoai.ai), `main` | Existing **Cloudflare Workers** project **allintoai-ai** |
| allxaiapp.com — application, login, results and workflows | [vansvan17/allxai-demo](https://github.com/vansvan17/allxai-demo), `master` | **GitHub Pages**, custom domain |

Verified 29 October 2026. Vanshika confirmed the Worker serves the homepage directly, including the www-to-apex redirect. The old `vansvan17/Allintoai.ai` URL redirects to this repository. The project also has a successful GitHub check **Workers Builds: allintoai-ai** on [commit 21f5bce](https://github.com/Allintoai/Allintoai.ai/commit/21f5bcea0c5dbe953d958779c373c3ba040e02c0). Cloudflare proxy headers/DNS alone do not establish the origin host.

**The previous Vercel/Render, React/Vite and Express instructions were inaccurate template documentation.** Those frontend/backend directories and build setup are absent here. Do not migrate hosts or replace DNS for these UI changes. The repository About panel may still contain a historical Vercel preview link; it is not the verified production deployment path above.

## Release status — 29 October 2026

Homepage UI source is pushed through [bdef8ec](https://github.com/Allintoai/Allintoai.ai/commit/bdef8ec37ae2cf7e15878dbad73c1aca20fcf7fc): conversational guided introduction, advertisement space inside the prompt panel, Indian model names/logos, and the ALL×AI product equation. The embedded lead-triage demo is removed; old app/login entry points redirect to the real application.

**Production publication remains unverified.** GitHub main had no Cloudflare check on 29 October, and the Cloudflare dashboard requires sign-in. The actual trigger/integration failure is not established. This repository now includes a complete static-asset build, Worker entry point, www redirect, pinned Wrangler dependency and deployment tests. We do not need the former developer's Worker source to reproduce these documented behaviours. Follow [DEPLOYMENT.md](DEPLOYMENT.md) to publish through the existing project.

## Source map

| Path | Purpose |
| --- | --- |
| index.html | Homepage, styling, guided prompt interactions and application links |
| app.html | Retired demo entry; redirects to allxaiapp.com/app.html?go=models |
| login.html | Redirects to allxaiapp.com/login.html |
| loading.html | Legacy loading page, eventually follows the login redirect |
| x-layer.html, styles.css, image assets | Supporting marketing content and styling |
| robots.txt, sitemap.xml | Search indexing metadata |

Root HTML files are website source. Archive ZIPs are historical material and are excluded from the public deployment. `build.mjs` copies an explicit public-file list and checked assets into `dist/`; it does not transform the UI. `worker.mjs` implements the www redirect and delegates other requests to Cloudflare's static-asset binding. `wrangler.json` targets the existing `allintoai-ai` Worker and leaves domain routes managed in the dashboard.

## Build, check and deploy

Use Node.js 22 or newer:

```sh
npm ci
npm test
npm run deploy:check
```

The dry run builds and bundles without publishing or requiring Cloudflare credentials. Once authenticated to the account that owns the existing Worker, `npm run deploy` builds and publishes it. Existing Cloudflare Builds can use repository root `/`, branch `main`, build command `npm run build`, and deploy command `npm run deploy` (the default `npx wrangler deploy` also runs the configured build). DNS exports and GitHub access do not authorize a Cloudflare production deploy. No Vercel project is required.

## Local preview

From the repository directory:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/. On Windows use `py -m http.server 8000` if Python is installed through the Windows launcher. Login and valid prompt submissions intentionally open the real application; use a disposable test brief.

Check desktop and phone layout, keyboard navigation, category changes without erasing typed text, short-brief validation and brief/category handoff to ModRecx. Verify the sponsored placeholder stays inside the prompt panel, Indian model cards have names/logos, and the old demo is absent.

## Product boundaries

The homepage provides a guided introduction; it does not call an LLM. The application currently uses rule-based recommendations and proposed workflow templates. Live LLM conversation needs company-funded provider access and server-side integration.

Indian cards are discovery links, not proof of API integration or evaluated ranking. Advertisements are labelled placeholders. “Enterprise security” is product branding, not evidence of a completed audit/certification.

See the [application README](https://github.com/vansvan17/allxai-demo#readme) and [acceptance checklist](https://github.com/vansvan17/allxai-demo/blob/master/UI_ACCEPTANCE_CHECKLIST.md) for application tests, saving and outstanding work.
