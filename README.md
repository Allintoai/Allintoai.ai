# ALL×AI — public homepage

Static marketing website for **allintoai.ai**. The separate ModRecx/WorPrex application is in [vansvan17/allxai-demo](https://github.com/vansvan17/allxai-demo), branch `master`, published through GitHub Pages at allxaiapp.com. Changes to one repository do not publish the other site.

## Company hosting handoff — 29 October 2026

The replacement Cloudflare Worker **allintoai-ai** was successfully deployed to the new company account and its temporary address was checked:

https://allintoai-ai.allxai-ai-com.workers.dev/

Initial replacement version: `70d9a35f-2612-48e1-87da-ce09155e6053`. That version predates the agent-flow update. Public checks on 30 October confirmed the new nameservers, `aisha.ns.cloudflare.com` and `titan.ns.cloudflare.com`, and a working HTTPS homepage with www redirecting to the apex. The homepage still lacked the newer agent-flow release. Do not describe nameserver propagation as pending on that evidence; verify the deployed source version separately. The 1 November navigation/footer update is source-ready and needs a confirmed company Worker deployment before it is called live.

**Automatic GitHub builds are not connected to the new account yet.** Deployments currently use Wrangler from Shivansh's authenticated WSL session. The former developer's Cloudflare Worker served the site directly, not through Vercel. The old Vercel link in the repository About panel is legacy.

## Navigation and policies — 1 November 2026

WorPrex and AIxplorers are in the desktop and phone header navigation. WorPrex has a separate footer column and a crawlable overview at `/worprex`, with its own metadata and sitemap entry. Copyright uses `ALLINTOAI`. Policies remain canonical on allxaiapp.com and are updated in the companion application PR. See [FOOTER_POLICY_UPDATE.md](FOOTER_POLICY_UPDATE.md) for scope, validation and separate release paths. Sitemap submission and search-engine inclusion are not verified.

## Current UI

- Guided conversational introduction, original palette and clearly labelled partner ad space inside the prompt panel.
- Indian model names/logos above global options; provider discovery is separate from an API integration.
- ALL×AI = (ModRecx + WorPrex), Enterprise security and proprietary attribution.
- ModRecx → WorPrex → Results architecture, expandable agent explanations, model/workflow refinement links, Dashboard and Analytics destinations. Phone layouts stack vertically.
- Old embedded triage demo removed; retired app/login entry points lead to the actual application.

See [AGENT_FLOW_UPDATE.md](AGENT_FLOW_UPDATE.md) for the architecture update and [DEPLOYMENT.md](DEPLOYMENT.md) for the active handoff procedure.

## Build and validate

Use Linux Node.js 22+ inside WSL (`npm`, not `npm.cmd`):

```bash
npm ci
npm test
npm run deploy:check
```

Four deployment/build tests cover asset packaging, source integrity, request passthrough and the www redirect. The shared architecture is also exercised by the app's 54-test regression suite, including navigation without losing a brief or consuming a recommendation. Browser previews cover the desktop diagram and phone-width layouts; preview fixtures do not prove production Supabase permissions or provider responses.

`build.mjs` copies an explicit public-file list and validated assets into `dist/`, excluding archives, source/configuration, dependencies, documentation and credentials. `worker.mjs` redirects www to the apex and serves other requests through the static-asset binding. Include both agent-flow.css and agent-flow.js whenever changing packaging.

## Routing configuration

The checked-in `wrangler.json` retains the former dashboard-managed-routing defaults (`workers_dev: false`, no routes). **The new company deployment currently uses a local override** with `workers_dev: true` and custom-domain entries for both allintoai.ai and www.allintoai.ai. Preserve that local file when pulling UI updates. A normal `git pull --ff-only` retains it while upstream does not change the same file. Resolve any Git conflict before deploying; do not discard the prepared routes.

Before enabling automatic builds, deliberately move the confirmed company routing settings into version control and validate against the new account. Simply connecting GitHub with the old default file is not the completed automation setup.

## Product boundaries

The introduction is guided and the app currently uses rules for recommendations and proposed pipelines. A live LLM, automatic workflow execution, measured token savings and provider telemetry need separate backend integration and company-funded access. Ads are placeholders. Enterprise security is the architecture/branding layer, not a completed security audit or certification.

## Other services

- company.allintoai.ai still depends on the former developer's Pages project, allintoai-company. Keep its existing CNAME and custom-domain association until its replacement is tested. Its deployed-only contact strip and mobile fix must be ported before rebuilding from source.
- allxaiapp.com remains on its existing GitHub Pages deployment; its Google Workspace MX/SPF/DKIM records belong to that separate zone.
- Supabase is owned by Chandan. Cloudflare or GitHub access does not grant database, authentication or SMTP administration.
