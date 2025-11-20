interface Props {
  value: number; // 0-5
  count?: number;
  size?: "sm" | "md";
  showCount?: boolean;
}

export default function Rating({ value, count, size = "md", showCount = true }: Props) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  const starClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className="inline-flex items-center gap-1" aria-label={`Rating ${value} out of 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} className={starClass} variant="full" />
      ))}
      {half && <Star className={starClass} variant="half" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} className={starClass} variant="empty" />
      ))}
      {showCount && typeof count === "number" ? (
        <span className="text-xs text-gray-500 dark:text-gray-400">({count})</span>
      ) : null}
    </div>
  );
}

function Star({ className, variant }: { className?: string; variant: "full" | "half" | "empty" }) {
  if (variant === "full") {
    return (
      <svg className={`${className} text-amber-500`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path d="M9.049 2.927a1 1 0 011.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.922-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.176 0l-2.802 2.035c-.784.57-1.838-.196-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
      </svg>
    );
  }
  if (variant === "half") {
    return (
      <svg className={`${className}`} viewBox="0 0 20 20" aria-hidden>
        <defs>
          <linearGradient id="half-grad">
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M9.049 2.927a1 1 0 011.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.922-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.176 0l-2.802 2.035c-.784.57-1.838-.196-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z"
          fill="url(#half-grad)"
          stroke="#F59E0B"
        />
      </svg>
    );
  }
  return (
    <svg className={`${className} text-gray-300 dark:text-gray-600`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M9.049 2.927a1 1 0 011.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.922-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.176 0l-2.802 2.035c-.784.57-1.838-.196-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
    </svg>
  );
}
