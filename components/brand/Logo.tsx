/*
 * The Avenir lockup, drawn to the proportions of the company's raster logo
 * (avenir.uz/public/Avenir-logo.png, 1027x590): a four-point star on a
 * reticle whose horizontal axis runs on under the wordmark to a hollow
 * diamond, "AVENIR" set above the axis in bold tracked capitals. Measured
 * against the half-axis (tip to centre = 50 units here): star radius 0.57,
 * right tip at 2.58, cap height 0.33, baseline 0.29 above the axis.
 *
 * Static on purpose (owner, 2026-09-08): no hover rotation, no colour play.
 */

const C = 60;
const HALF = 50;
const STAR_R = 28.5;
const RIGHT_TIP = C + HALF * 2.58;
const TIP = 2.6;

function Diamond({ x, y, className }: { x: number; y: number; className: string }) {
  return (
    <rect
      className={className}
      x={x - TIP}
      y={y - TIP}
      width={TIP * 2}
      height={TIP * 2}
      transform={`rotate(45 ${x} ${y})`}
    />
  );
}

export function Logo({ className = "" }: { className?: string }) {
  const star = `M${C} ${C - STAR_R} Q${C} ${C} ${C + STAR_R} ${C} Q${C} ${C} ${C} ${C + STAR_R} Q${C} ${C} ${C - STAR_R} ${C} Q${C} ${C} ${C} ${C - STAR_R} Z`;
  return (
    <svg className={`brand ${className}`} viewBox="0 0 200 120" fill="none" role="img" aria-label="Avenir Store">
      <line className="brand__axis" x1={C} y1={C - HALF} x2={C} y2={C + HALF} />
      <line className="brand__axis" x1={C - HALF} y1={C} x2={RIGHT_TIP} y2={C} />
      <Diamond className="brand__tip" x={C} y={C - HALF} />
      <Diamond className="brand__tip" x={C} y={C + HALF} />
      <Diamond className="brand__tip" x={C - HALF} y={C} />
      <Diamond className="brand__tip" x={RIGHT_TIP} y={C} />
      <path className="brand__star" d={star} />
      <text className="brand__word" x={C + 14} y={C - 14.5} textLength={110} lengthAdjust="spacing">
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
