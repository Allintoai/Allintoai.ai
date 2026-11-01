# Public navigation and policy update — 1 November 2026

The public homepage now exposes ModRecx, WorPrex and AIxplorers in the desktop header and an accessible phone menu. WorPrex has its own footer column and a public `worprex.html` overview, with a canonical URL, accurate beta explanation, app links and a sitemap entry. Copyright reads `ALLINTOAI` without spaces. Colours are retained.

`navigation.css` is shared by the homepage and WorPrex overview. Both it and the new HTML page are explicitly included in `build.mjs`. The build tests cover the new page and its local references. Structured metadata describes actual pages and products, without fabricated ratings or claims of search-index inclusion.

The companion application update changes `terms.html`, `privacy.html`, `cookies.html` and `refunds.html` in `vansvan17/allxai-demo`. The homepage continues to link to these canonical policy pages. The policy copy describes WorPrex planning/storage, account insights, browser-only fallback records, provider links, manual payments, ad placeholders and WhatsApp sharing. Groq is identified only as proposed testing, not an active integration. Existing plan prices, quotas, cancellation and refund rules are preserved.

## Release boundary

The application policies use the existing master → GitHub Pages deployment. The homepage source uses the separate company Cloudflare Worker `allintoai-ai`. A source merge does not verify a Worker release or automatic GitHub builds. From the already authenticated company WSL checkout, pull the source, run `npm test`, and use `npm run deploy`, preserving the local company custom-domain configuration. Verify the public homepage, WorPrex URL, header links, footer and HTTPS after deployment.

No database, authentication, provider-billing, payment-gateway or DNS settings change in this update. Live LLM calls and automated workflow execution remain unconnected. The copy does not claim a completed security audit, all data staying in India, or automatic team membership.
