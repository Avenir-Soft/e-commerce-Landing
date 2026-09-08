/**
 * Root layout for "/" alone.
 *
 * The app has no `app/layout.tsx`: `[lang]/layout.tsx` and `dev/layout.tsx`
 * are each the root of their own branch, because only they know the language
 * to put on `<html>`. "/" needs a third one — a page directly under `app/`
 * has no layout above it, and a webpack build stops with "page.tsx doesn't
 * have a root layout" (a Turbopack build does not; it let this through).
 * The route group keeps the URL as "/".
 *
 * Nothing here ever reaches a browser: the page redirects before it renders.
 */
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
