export function Mark({ size = 34, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <line x1="60" y1="8" x2="60" y2="112" stroke="currentColor" strokeWidth="3" />
      <line x1="8" y1="60" x2="112" y2="60" stroke="currentColor" strokeWidth="3" />
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
          fill="var(--color-night)"
          stroke="currentColor"
          strokeWidth="2.6"
        />
      ))}
      <path d="M60 28 Q60 60 92 60 Q60 60 60 92 Q60 60 28 60 Q60 60 60 28 Z" fill="#2563EB" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark />
      <span className="font-display text-[1.05rem] font-semibold tracking-[-0.02em]">
        Avenir <span className="font-normal opacity-70">Store</span>
      </span>
    </span>
  );
}
