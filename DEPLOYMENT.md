# Homepage deployment handoff

Verified 27 October 2026. Applies to **allintoai.ai**, not the separate GitHub Pages app at allxaiapp.com.

## Access

The owner should invite Shivansh's Cloudflare account to the existing account/project with permission to inspect settings/logs and deploy **allintoai-ai**. An invitation avoids sharing the owner's password. GitHub access does not grant Cloudflare access.

Project evidence: [successful Workers build check](https://github.com/Allintoai/Allintoai.ai/runs/109754261924) for commit 21f5bce. Do not create replacement hosting or change DNS to troubleshoot this release.

## Inspect and publish

1. Open the existing **allintoai-ai** project in Cloudflare Workers & Pages. Record current production version/deployment and custom-domain bindings as the rollback target.
2. Verify connected repository **Allintoai/Allintoai.ai** and production branch **main**. Inspect automatic triggers, GitHub integration permissions and build logs, including skipped/failed builds.
3. Compare production source SHA with GitHub main. UI changes are present through **bdef8ec**; later documentation commits may be newer. Publish the latest reviewed main using the existing project configuration.
4. This is static HTML. Inspect the existing asset/upload configuration and preserve a working setup. Do not add a React/Vite build command from the retired README.
5. Repair the actual identified issue or trigger a production build. Wait for success and record the source SHA, deployment URL and timestamp. A GitHub upload alone is not deployment.
6. Check the deployment URL and https://allintoai.ai/ in fresh desktop and phone browser sessions. If stale, compare the two responses before deciding whether a targeted cache purge is needed.

The last live check served the earlier homepage and bdef8ec had no GitHub check run. **The cause of stopped/missing publication is not yet established.** Record the actual cause after inspecting Cloudflare.

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
