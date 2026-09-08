/*
 * The Avenir lockup exactly as avenir.uz draws it (components/v2/header.tsx
 * there): a four-point star on a reticle whose horizontal axis runs on under
 * the wordmark to a hollow diamond, "AVENIR" set above the axis in tracked
 * capitals. Owner decision, 2026-09-08: the landing carries the company
 * logo, not a derived "AVENIR / STORE" lockup.
 */

export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg className={`brand ${className}`} viewBox="0 0 210 120" fill="none" role="img" aria-label="Avenir Store">
      <line className="brand__axis" x1="60" y1="10" x2="60" y2="110" />
      <line className="brand__axis" x1="10" y1="60" x2="200" y2="60" />
      <rect className="brand__tip" x="57" y="7" width="6" height="6" transform="rotate(45 60 10)" />
      <rect className="brand__tip" x="57" y="107" width="6" height="6" transform="rotate(45 60 110)" />
      <rect className="brand__tip" x="7" y="57" width="6" height="6" transform="rotate(45 10 60)" />
      <rect className="brand__tip" x="197" y="57" width="6" height="6" transform="rotate(45 200 60)" />
      <path className="brand__star" d="M60 28 Q60 60 82.7 60 Q60 60 60 92 Q60 60 37.3 60 Q60 60 60 28 Z" />
      <text className="brand__word" x="72" y="46">
        AVENIR
      </text>
    </svg>
  );
}

/** The bare reticle mark, for small places such as the phone mock. */
export function Mark({ size = 34, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true" className={className}>
      <line x1="60" y1="8" x2="60" y2="112" stroke="currentColor" strokeWidth="2.6" />
      <line x1="8" y1="60" x2="112" y2="60" stroke="currentColor" strokeWidth="2.6" />
      {[
        [60, 8],
        [60, 112],
        [8, 60],
        [112, 60],
      ].map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x - 3.2}
          y={y - 3.2}
          width="6.4"
          height="6.4"
          transform={`rotate(45 ${x} ${y})`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        />
      ))}
      <path d="M60 28 Q60 60 92 60 Q60 60 60 92 Q60 60 28 60 Q60 60 60 28 Z" fill="currentColor" />
    </svg>
  );
}
