# Homepage deployment and company-account handoff

Updated 29 October 2026. Applies to allintoai.ai, not the separate GitHub Pages app.

## Verified state

Replacement Worker: **allintoai-ai**, company account `684b42baa118130d88e96339a4e6bcbd`. Authenticated WSL deployment succeeded at https://allintoai-ai.allxai-ai-com.workers.dev/ (initial version 70d9a35f-2612-48e1-87da-ce09155e6053). The new architecture update requires another deployment after pulling source.

Namecheap now has the new assigned nameservers, aisha.ns.cloudflare.com and titan.ns.cloudflare.com. The latest Cloudflare screenshot showed Pending; public resolver checks can lag. Check the account's actual current zone state before attaching custom domains. No claim of completed production cutover or working automatic builds is made here.

## Finish the prepared WSL deployment

1. Cloudflare → Domains → allintoai.ai → Overview → Check nameservers now. Wait for **Active**. Custom-domain attachment requires an active zone.
2. In WSL, keep the prepared local wrangler.json: workers_dev=true; routes for allintoai.ai and www.allintoai.ai, both custom_domain=true. The checked-in base still has the old dashboard-managed defaults. Preserve the local override; do not reset it to the base during a UI pull.
3. Pull and deploy:

```bash
cd ~/allintoai-cloudflare
git pull --ff-only
npm test
export CLOUDFLARE_ACCOUNT_ID="684b42baa118130d88e96339a4e6bcbd"
npm run deploy
```

The deployment tests accept both the tracked dashboard-managed base and the prepared company override with the two exact custom domains. They reject unexpected routing configurations. npm run deploy:check validates the local bundle without publishing.

4. Confirm both custom domains in Worker → Domains and verify HTTPS certificate status. A successful upload is not proof that certificates and public DNS have finished propagating.
5. Check the real apex, www redirect (path/query retained), prompt/category handoff, ad placement, Indian model cards, agent architecture disclosures and product links. Check the company subdomain and app login separately. Record the actual deployment version and outcome.

## DNS retained in the new zone

The automatic scan captured the former Cloudflare proxy A/AAAA addresses. Those eight apex/www rows were removed. The company CNAME was restored to allintoai-company.pages.dev; Google verification and existing TXT records were retained. The Worker custom-domain setup creates the apex/www records. Do not point the new zone back at the former Cloudflare proxy IPs.

Keep the former company's Pages project and its existing company.allintoai.ai custom-domain association running until its replacement is tested. A CNAME alone does not create a Pages custom-domain association. The company Vite/React site builds with npm run build to dist; its deployed-only contact strip/mobile fix must be moved into source before a rebuild.

allxaiapp.com has a separate zone with Google Workspace email. Its registrar/nameservers/mail records have not been part of this homepage switch. Preserve MX, SPF and DKIM during its later handoff.

## Enable automatic deployment later

The new account's repository picker cannot access the company repository through a personal-only GitHub App installation. The repository owner must authorize Cloudflare Workers and Pages for this repository. Use selected-repository access. Then connect the new allintoai-ai Worker to Allintoai/Allintoai.ai, branch main, repository root, Node 22+, build npm run build and deploy npm run deploy. First commit/validate the intended company routing configuration so future builds do not disable the temporary testing URL or lose domain bindings. Trigger a real build and verify its deployed source SHA.

## Rollback

Keep the previous Worker deployment version. Roll back the Worker version for a code regression, then revert the offending source through normal Git history so the next deploy does not restore it. DNS/account migration and TLS provisioning are separate from code rollback; changing nameservers back is not an instantaneous rollback. No database migration is included in this UI update.
