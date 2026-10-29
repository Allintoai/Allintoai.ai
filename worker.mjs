export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // Preserve the production www -> apex redirect, including deep links
    // and query strings. This Worker serves assets directly, without Vercel.
    if (url.hostname === 'www.allintoai.ai') {
      url.hostname = 'allintoai.ai';
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  }
};
