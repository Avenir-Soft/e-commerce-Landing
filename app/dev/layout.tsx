import { notFound } from "next/navigation";
import "../globals.css";

/**
 * Developer-only routes (/dev/render renders one product model on a
 * transparent canvas so `tools/pw/render.mjs` can save stills into
 * public/renders). Never reachable in production.
 */
export default function DevLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <html lang="en">
      <body style={{ background: "transparent" }}>{children}</body>
    </html>
  );
}
