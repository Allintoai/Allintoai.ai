# ALL×AI — public homepage

Static marketing website for **https://allintoai.ai**, separate from the ModRecx/WorPrex application.

## Repositories and hosting

| Website | Repository / branch | Host |
| --- | --- | --- |
| allintoai.ai — public homepage | [Allintoai/Allintoai.ai](https://github.com/Allintoai/Allintoai.ai), `main` | Existing **Cloudflare Workers** project **allintoai-ai** |
| allxaiapp.com — application, login, results and workflows | [vansvan17/allxai-demo](https://github.com/vansvan17/allxai-demo), `master` | **GitHub Pages**, custom domain |

Verified 27 October 2026. The homepage Workers project is identified by the successful GitHub check **Workers Builds: allintoai-ai** on [commit 21f5bce](https://github.com/Allintoai/Allintoai.ai/commit/21f5bcea0c5dbe953d958779c373c3ba040e02c0). Cloudflare proxy headers/DNS alone do not establish the origin host.

**The previous Vercel/Render, React/Vite and Express instructions were inaccurate template documentation.** Those frontend/backend directories and build setup are absent here. Do not migrate hosts or replace DNS for these UI changes. The repository About panel may still contain a historical Vercel preview link; it is not the verified production deployment path above.

## Release status — 27 October 2026

Homepage UI source is pushed through [bdef8ec](https://github.com/Allintoai/Allintoai.ai/commit/bdef8ec37ae2cf7e15878dbad73c1aca20fcf7fc): conversational guided introduction, advertisement space inside the prompt panel, Indian model names/logos, and the ALL×AI product equation. The embedded lead-triage demo is removed; old app/login entry points redirect to the real application.

**Publication remains pending.** At the last check the live domain still served the previous homepage and the new UI commit had no Cloudflare check run. A commit is not proof of deployment; the cause needs inspection in the existing Cloudflare project. Follow [DEPLOYMENT.md](DEPLOYMENT.md) and update this status after verifying production.

## Source map

| Path | Purpose |
| --- | --- |
| index.html | Homepage, styling, guided prompt interactions and application links |
| app.html | Retired demo entry; redirects to allxaiapp.com/app.html?go=models |
| login.html | Redirects to allxaiapp.com/login.html |
| loading.html | Legacy loading page, eventually follows the login redirect |
| x-layer.html, styles.css, image assets | Supporting marketing content and styling |
| robots.txt, sitemap.xml | Search indexing metadata |

Root HTML files are website source. Archive ZIPs are historical material. There is no npm production build step.

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
