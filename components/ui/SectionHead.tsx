export function SectionHead({
  heading,
  lead,
  id,
  className = "",
}: {
  heading: string;
  lead?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <h2 id={id} className="t-h2">
        {heading}
      </h2>
      {lead && <p className="t-lead mt-4">{lead}</p>}
    </div>
  );
}
