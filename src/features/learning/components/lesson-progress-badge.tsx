"use client";

import { useIsClient, useLessonProgressStats } from "../lib/progress";

export function LessonProgressBadge({
  lessonSlug,
  topics,
}: {
  lessonSlug: string;
  topics: { slug: string; total: number }[];
}) {
  const progress = useLessonProgressStats(lessonSlug, topics);
  const mounted = useIsClient();

  const done = progress.visited === progress.total && progress.total > 0;

  return (
    <p className="flex items-center gap-2 text-xs font-medium tabular-nums text-neutral-500 dark:text-neutral-400">
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${
          !mounted || progress.visited === 0
            ? "bg-neutral-300 dark:bg-neutral-600"
            : done
              ? "bg-emerald-500"
              : "bg-indigo-500"
        }`}
      />
      {mounted
        ? done
          ? "Completed"
          : `${progress.visited} / ${progress.total} pages visited`
        : "···"}
      <span className="sr-only">
        {mounted ? " pages" : ""} in this lesson
      </span>
    </p>
  );
}
