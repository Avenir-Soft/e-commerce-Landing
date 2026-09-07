import { notFound } from "next/navigation";
import { Manrope, Unbounded } from "next/font/google";
import "../globals.css";

const unbounded = Unbounded({ subsets: ["latin", "cyrillic"], variable: "--font-unbounded", display: "swap" });
const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", display: "swap" });

/**
 * Developer-only routes: /dev/render (one model on a transparent canvas for
 * public/renders) and /dev/screens (one platform screen at native size for
 * public/screens). Never reachable in production.
 */
export default function DevLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <html lang="uz" className={`${unbounded.variable} ${manrope.variable}`}>
      <body style={{ background: "transparent" }}>{children}</body>
    </html>
  );
}
