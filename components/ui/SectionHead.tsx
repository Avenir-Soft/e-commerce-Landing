export function SectionHead({
  eyebrow,
  heading,
  lead,
  id,
  className = "",
  align = "left",
}: {
  eyebrow?: string;
  heading: string;
  lead?: string;
  id?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <p className="t-eyebrow" data-reveal="write">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="t-h2 mt-3" data-split>
        {heading}
      </h2>
      {lead && (
        <p className={`t-lead mt-4 ${align === "center" ? "mx-auto" : ""}`} data-reveal>
          {lead}
        </p>
      )}
    </div>
  );
}
