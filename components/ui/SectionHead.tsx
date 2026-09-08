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
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <p className={`t-eyebrow ${centered ? "t-eyebrow--center" : ""}`} data-reveal="write">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="t-h2 mt-4" data-split>
        {heading}
      </h2>
      {lead && (
        <p className={`t-lead mt-4 ${centered ? "mx-auto" : ""}`} data-reveal>
          {lead}
        </p>
      )}
    </div>
  );
}
