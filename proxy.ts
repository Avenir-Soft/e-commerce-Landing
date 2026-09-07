import { NextResponse, type NextRequest } from "next/server";
import { defaultLang, isLang, languages } from "@/lib/languages";

/** Pick a language from Accept-Language: exact match on the primary subtag, else the default (uz). */
function pickLang(header: string | null): string {
  if (!header) return defaultLang;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.toLowerCase().split("-")[0], q: q ? Number(q.split("=")[1]) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const hit = ranked.find((r) => isLang(r.tag));
  return hit ? hit.tag : defaultLang;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname !== "/") return NextResponse.next();
  const lang = pickLang(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${languages.includes(lang as (typeof languages)[number]) ? lang : defaultLang}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: "/",
};
