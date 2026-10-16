import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Roadmap } from "@/features/learning/components/roadmap";
import { LessonThumbnail } from "@/features/learning/components/lesson-thumbnail";
import {
  ResumeLink,
  TopicProgressLabel,
} from "@/features/learning/components/lesson-progress-labels";
import { getLesson, LESSONS } from "@/features/learning/data/lessons";

type Props = PageProps<"/lessons/[slug]">;

export const instant = false;

export function generateStaticParams() {
  return LESSONS.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = getLesson((await params).slug);
  if (!lesson) return {};
  return {
    title: lesson.title,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: Props) {
  const lesson = getLesson((await params).slug);
  if (!lesson) notFound();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-20 sm:px-6">
      <nav aria-label="Breadcrumb" className="py-5 text-sm">
        <Link
          href="/"
          className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Lessons
        </Link>
        <span aria-hidden="true" className="mx-2 text-neutral-400">
          /
        </span>
        <span className="font-medium text-neutral-900 dark:text-neutral-100">
          {lesson.title}
        </span>
      </nav>

      <div className="overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800">
        <LessonThumbnail lesson={lesson} className="aspect-[16/5] w-full" />
        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            {lesson.level} track · {lesson.topics.length} steps
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-100">
            {lesson.title}
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-400">
            {lesson.description}
          </p>
          <div className="mt-4">
            <ResumeLink
              lessonSlug={lesson.slug}
              topics={lesson.topics.map((topic) => ({
                slug: topic.slug,
                total: topic.pages.length,
              }))}
            />
          </div>
        </div>
      </div>

      <section aria-labelledby="roadmap-heading" className="mt-12">
        <h2
          id="roadmap-heading"
          className="mb-8 text-center text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          Your learning roadmap
        </h2>
        <div className="mb-10 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-6 dark:border-neutral-800 dark:bg-neutral-900/50">
          <Roadmap lesson={lesson} />
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {lesson.topics.map((topic, index) => (
            <li key={topic.slug}>
              <Link
                href={`/lessons/${lesson.slug}/learn/${topic.slug}/1`}
                className="group flex h-full items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-indigo-700"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-bold text-indigo-600 transition group-hover:bg-indigo-500 group-hover:text-white dark:text-indigo-400"
                >
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {topic.name}
                    </span>
                    <TopicProgressLabel
                      lessonSlug={lesson.slug}
                      topicSlug={topic.slug}
                      total={topic.pages.length}
                    />
                  </span>
                  <span className="mt-1 block text-sm text-neutral-600 dark:text-neutral-400">
                    {topic.blurb} {topic.pages.length} page
                    {topic.pages.length === 1 ? "" : "s"}.
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
