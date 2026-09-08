import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { defaultLang, isLang } from "@/lib/languages";

/*
 * "/" carries no content: it picks a language and sends the visitor to
 * /uz, /ru or /en.
 *
 * This used to be `proxy.ts` (Next 16's rename of middleware), and it moved
 * here to be deployable. A proxy defaults to the Node.js runtime in Next 16
 * and the `runtime` option is not allowed in proxy files, so it cannot be put
 * back on the edge runtime; Netlify's Next.js Runtime wraps that Node proxy in
 * a Deno edge function and then fails to bundle it — the built middleware
 * requires a sibling chunk the copier leaves behind ("Cannot find module
 * './webpack-runtime.js'"). A root page needs no edge function at all, runs
 * the same way under `next dev` and on Netlify, and is one implementation
 * instead of a proxy plus a redirect rule.
 *
 * `redirect()` answers 307, which is what the proxy sent.
 */
export const dynamic = "force-dynamic";

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

export default async function RootPage() {
  const lang = pickLang((await headers()).get("accept-language"));
  redirect(`/${isLang(lang) ? lang : defaultLang}`);
}
