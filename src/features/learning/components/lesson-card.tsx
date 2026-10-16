import Link from "next/link";
import { LessonProgressBadge } from "./lesson-progress-badge";
import { type Lesson, getLessonHref } from "../data/lessons";
import { LessonThumbnail } from "./lesson-thumbnail";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const href = getLessonHref(lesson);
  const topics = lesson.topics.map((topic) => ({
    slug: topic.slug,
    total: topic.pages.length,
  }));

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-neutral-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
    >
      <LessonThumbnail
        lesson={lesson}
        className="aspect-[3/2] w-full transition duration-300 group-hover:brightness-110"
      />
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          {lesson.level} · {topics.length} steps
        </p>
        <h2 className="mt-1.5 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {lesson.title}
        </h2>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {lesson.description}
        </p>
        <LessonProgressBadge lessonSlug={lesson.slug} topics={topics} />
        <p className="mt-3 text-sm font-medium text-indigo-600 group-hover:text-indigo-500 dark:text-indigo-400">
          Start learning
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
          >
            {" "}
            →
          </span>
        </p>
      </div>
    </Link>
  );
}
