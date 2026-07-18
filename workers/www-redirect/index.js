/**
 * Tiny edge Worker: permanent redirect www → apex.
 * Needed because static OpenNext assets can bypass Next middleware on `/`.
 */
export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    const target = new URL(incoming.pathname + incoming.search, "https://jnovasystems.com");
    return Response.redirect(target.toString(), 301);
  },
};
