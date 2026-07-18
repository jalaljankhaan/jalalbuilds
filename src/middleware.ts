import { NextResponse, type NextRequest } from "next/server";

const APEX_HOST = "jnovasystems.com";
const WWW_HOST = "www.jnovasystems.com";

/**
 * Canonical host: redirect www → apex (308 preserves method for POST forms).
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (host === WWW_HOST) {
    const url = request.nextUrl.clone();
    url.hostname = APEX_HOST;
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Skip static assets and Next internals — only redirect page/API traffic
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
