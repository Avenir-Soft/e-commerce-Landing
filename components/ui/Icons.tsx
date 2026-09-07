/** Small line icons shared by buttons and tiles. All are decorative (aria-hidden). */

const stroke = { stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" {...stroke} />
    </svg>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="m5 12 5 5L20 7" {...stroke} strokeWidth={2.4} />
    </svg>
  );
}

export function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" {...stroke} />
      <circle cx="12" cy="10" r="2.2" {...stroke} />
    </svg>
  );
}

export function SendIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M21 3 3 10.5l7.5 3L13.5 21 21 3Z" {...stroke} />
      <path d="m10.5 13.5 4.5-4.5" {...stroke} />
    </svg>
  );
}

export function SparkIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M12 3c.6 4.8 3.2 7.4 8 8-4.8.6-7.4 3.2-8 8-.6-4.8-3.2-7.4-8-8 4.8-.6 7.4-3.2 8-8Z" {...stroke} />
    </svg>
  );
}

export function CardIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="6" width="18" height="12" rx="2.5" {...stroke} />
      <path d="M3 10h18M7 14.5h4" {...stroke} />
    </svg>
  );
}

export function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="5" y="11" width="14" height="10" rx="2" {...stroke} />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" {...stroke} />
    </svg>
  );
}
