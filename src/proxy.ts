import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n";

// Picks /en for browsers whose preferred language is English, /fr otherwise.
function preferredLocale(request: NextRequest) {
  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const first = accept.split(",")[0]?.trim() ?? "";
  return first.startsWith("en") ? "en" : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // One canonical address: www.sahama-services.com -> sahama-services.com
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = host.slice(4);
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\.).*)"],
};
