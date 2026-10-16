import Link from "next/link";
import { type Lesson, getLearnHref } from "../data/lessons";

export function Roadmap({
  lesson,
  activeTopicSlug,
}: {
  lesson: Lesson;
  activeTopicSlug?: string;
}) {
  return (
    <ol className="flex flex-wrap items-center justify-center gap-y-4 px-0">
      {lesson.topics.map((topic, index) => {
        const isFirst = index === 0;
        const isActive = topic.slug === activeTopicSlug;
        return (
          <li key={topic.slug} className="flex items-center">
            {!isFirst && (
              <span
                aria-hidden="true"
                className="mx-1 h-px w-4 bg-neutral-300 sm:mx-2 sm:w-8 dark:bg-neutral-700"
              />
            )}
            <Link
              href={getLearnHref(lesson.slug, topic.slug, 1)}
              className={`group rounded-full py-1 pr-1 pl-1 transition-colors sm:px-2 ${
                isActive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-semibold transition-all duration-200 group-hover:scale-110 group-focus-visible:scale-110 ${
                  isActive
                    ? "border-indigo-500 bg-indigo-500 text-white"
                    : "border-neutral-300 bg-white group-hover:border-indigo-400 dark:border-neutral-700 dark:bg-neutral-900"
                }`}
              >
                {index + 1}
              </span>
              <span className="mt-1.5 block text-center text-xs font-medium sm:text-sm">
                {topic.name}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
