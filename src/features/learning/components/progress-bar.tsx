export function ProgressBar({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label: string;
}) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={1}
      aria-valuemax={max}
      aria-valuetext={`${label}: page ${value} of ${max}`}
      className="flex items-center gap-3"
    >
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p
        aria-hidden="true"
        className="shrink-0 text-xs font-semibold tabular-nums text-neutral-600 sm:text-sm dark:text-neutral-400"
      >
        {percent}%
      </p>
    </div>
  );
}
