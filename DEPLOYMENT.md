# Homepage deployment handoff

Updated 29 October 2026. Applies to **allintoai.ai**, not the separate GitHub Pages app at allxaiapp.com or the Cloudflare Pages company site.

## Reproducible deployment from this repository

The UI source now has a deployable Cloudflare Workers configuration. No proprietary build tooling, Vercel project, database migration or third-party runtime secret is required for this static homepage.

| Setting | Value |
| --- | --- |
| Existing Worker | `allintoai-ai` |
| Connected repository | `Allintoai/Allintoai.ai` (old `vansvan17/Allintoai.ai` redirects here) |
| Production branch | `main` |
| Root directory | Repository root (`/`) |
| Node | 22 or newer |
| Dependency install | `npm ci` (lockfile supplied) |
| Build command | `npm run build` |
| Deploy command | `npm run deploy` (or default `npx wrangler deploy`) |
| Wrangler config | `wrangler.json` |
| Public asset directory | `dist/` |
| Worker entry point | `worker.mjs` |

`wrangler.json` also sets `build.command`, so deploying directly still rebuilds the assets even if the dashboard build command is blank. Running the dashboard build first is harmless. `workers_dev: false` and omitted routes leave the production domain routes under dashboard control; `keep_vars: true` preserves dashboard variables. The existing Worker name must be used in the owning account. Do not run this as a replacement project in a different account and expect DNS to follow automatically.

The Worker retains the reported 301 from `www.allintoai.ai` to `allintoai.ai`, preserving paths and queries. All other requests use `ASSETS.fetch`. Static-asset HTML handling supports existing `.html` links and extensionless routes; missing pages return 404 rather than displaying an unrelated SPA. Only public HTML, styles, images, fonts and scripts enter `dist/`. Git metadata, archives, docs, build code and credentials are excluded.

Validate without Cloudflare access:

```sh
npm ci
npm test
npm run deploy:check
```

For a local Cloudflare runtime: `npm run dev`. To publish from an authenticated machine: `npm run deploy`. Authentication must belong to the account that owns the existing Worker; neither DNS zone exports nor GitHub repository write access grants that permission. Do not place credentials in this repository.

Validation on 29 October: all four deployment tests passed and Wrangler 4.155.0 successfully completed the deployment dry run, reading 16 public assets and bundling the Worker with its ASSETS binding. Local `wrangler dev` was blocked by this execution environment's `uv_interface_addresses` system error before serving requests; a full local workerd HTTP check is not claimed. No production publish is claimed without a successful Cloudflare result and live-domain verification.

## Access

The owner should invite Shivansh's Cloudflare account to the existing account/project with permission to inspect settings/logs and deploy **allintoai-ai**. An invitation avoids sharing the owner's password. GitHub access does not grant Cloudflare access.

Project evidence: [successful Workers build check](https://github.com/Allintoai/Allintoai.ai/runs/109754261924) for commit 21f5bce. Do not create replacement hosting or change DNS to troubleshoot this release.

## Inspect and publish

1. Open the existing **allintoai-ai** project in Cloudflare Workers & Pages. Record current production version/deployment and custom-domain bindings as the rollback target.
2. Verify connected repository **Allintoai/Allintoai.ai** and production branch **main**. Inspect automatic triggers, GitHub integration permissions and build logs, including skipped/failed builds.
3. Compare production source SHA with GitHub main. UI changes are present through **bdef8ec**; later documentation commits may be newer. Publish the latest reviewed main using the existing project configuration.
4. Use the settings table above. Inspect existing bindings before the first publish; Vanshika reported no additional bindings. This is static HTML with an asset-copy build, not React/Vite. Save the previous production Worker version before replacing its code.
5. Repair the actual identified issue or trigger a production build. Wait for success and record the source SHA, deployment URL and timestamp. A GitHub upload alone is not deployment.
6. Check the deployment URL and https://allintoai.ai/ in fresh desktop and phone browser sessions. If stale, compare the two responses before deciding whether a targeted cache purge is needed.

The previous live check served the earlier homepage. As of 29 October, main at fbb2e953 had no GitHub check run and this browser had no authenticated Cloudflare session. **The cause of stopped/missing publication is not yet established.** A reproducible build fixes the source-side deployment gap but cannot restore a disabled Git connection or supply account authorization. After pushing this setup, check for a new build; if none appears, repair the connection/trigger in Settings > Builds, then deploy. Record the actual cause after inspection.

## Production acceptance

- New heading: “What are we working on today?” with ModRecx guided introduction.
- Category chips change questions without clearing the typed brief.
- Short briefs show validation; valid brief/category reach the real ModRecx app.
- Clearly labelled sponsored placeholder is **inside the prompt panel**.
- Sarvam-105B and Param2 17B names/logos appear above global models.
- Product equation, Enterprise security line and ALLINTOAI attribution appear on homepage.
- No embedded lead-triage demo. /app.html and /login.html reach the actual app.
- Header, company/contact links, keyboard focus and mobile spacing work.

After verification update the homepage README and application acceptance checklist with deployed SHA and verification outcome.

## Rollback

Restore the recorded previous production deployment/version in the existing Cloudflare project if behaviour breaks. Revert the offending source through a normal GitHub commit so a later build does not reintroduce it. Preserve unrelated changes; do not force-push. These homepage changes have no database migration.

## Separate application

The **vansvan17/allxai-demo / master** repository publishes **allxaiapp.com through GitHub Pages**. Verify its deployment in that repository's Actions tab. App commits cannot publish this homepage; homepage commits cannot deploy app changes.

## Separate ownership migration

Changing hosting ownership is not required to publish this UI release. If a migration is arranged, use Chandan/company-owned accounts. The company site is `allintoai-company` on Cloudflare Pages (`npm run build`, output `dist`), with its current source branch still to be confirmed. Its deployed-only contact strip and responsive CSS must be ported into source before rebuilding that separate site. Supabase is owned by Chandan. Preserve Google Workspace MX/SPF/DKIM on `allxaiapp.com`. Test replacement hosting before nameserver changes and keep the old services running until all three sites, login and email pass verification.
