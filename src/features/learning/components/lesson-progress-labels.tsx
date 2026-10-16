"use client";

import Link from "next/link";
import {
  useLessonProgressStats,
  useResumeTopic,
  useTopicPagesVisited,
} from "../lib/progress";

export function ResumeLink({
  lessonSlug,
  topics,
}: {
  lessonSlug: string;
  topics: { slug: string; total: number }[];
}) {
  const nextUp = useResumeTopic(lessonSlug, topics);
  const { visited, total } = useLessonProgressStats(lessonSlug, topics);
  if (total === 0 || visited === 0) return null;

  const allDone = visited >= total;
  if (allDone) {
    return (
      <p className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
        <span aria-hidden="true">✓</span> Track completed — review any step below
      </p>
    );
  }
  if (!nextUp) return null;

  return (
    <Link
      href={`/lessons/${lessonSlug}/learn/${nextUp.topicSlug}/${nextUp.page}`}
      className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
    >
      Resume <span aria-hidden="true">→</span>
    </Link>
  );
}

export function TopicProgressLabel({
  lessonSlug,
  topicSlug,
  total,
}: {
  lessonSlug: string;
  topicSlug: string;
  total: number;
}) {
  const visited = useTopicPagesVisited(lessonSlug, topicSlug);
  const count = Math.min(visited.size, total);
  if (count === 0) return null;
  const complete = count === total;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
        complete
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
      }`}
    >
      {complete && <span aria-hidden="true">✓</span>}
      {count}/{total}
    </span>
  );
}
