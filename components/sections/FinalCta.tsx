import QRCode from "qrcode";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { TelegramIcon } from "@/components/layout/Header";

export async function FinalCta({ t }: { t: Dictionary["cta"] }) {
  const qr = await QRCode.toString(site.botUrl, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#f3f6fb", light: "#0000" },
  });

  return (
    <section className="pb-24 md:pb-32" aria-labelledby="cta-title">
      <div className="shell">
        <div
          className="tile relative overflow-hidden px-6 py-14 sm:px-10 md:px-16 md:py-20"
          style={{ "--gx": "85%", "--gy": "50%" } as React.CSSProperties}
        >
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <h2 id="cta-title" className="t-display">
                {t.heading}
              </h2>
              <p className="t-lead mt-6">{t.lead}</p>
              <a href={site.botUrl} target="_blank" rel="noopener" className="btn btn-solid mt-8">
                <TelegramIcon />
                {t.button}
              </a>
            </div>
            <figure className="hidden flex-col items-center gap-3 md:flex">
              <div
                className="w-40 rounded-2xl bg-night/70 p-4 ring-1 ring-line [&_svg]:h-auto [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: qr }}
              />
              <figcaption className="max-w-[11rem] text-center text-ink-3 t-small">{t.qr}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
