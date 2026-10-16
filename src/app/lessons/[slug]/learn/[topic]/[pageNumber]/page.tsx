import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgressBar } from "@/features/learning/components/progress-bar";
import { Roadmap } from "@/features/learning/components/roadmap";
import { TrackPageVisit } from "@/features/learning/components/track-page-visit";
import { KeyboardPageNav } from "@/features/learning/components/keyboard-page-nav";
import {
  getLearnHref,
  getLesson,
  getTopic,
  LESSONS,
} from "@/features/learning/data/lessons";

type Props = PageProps<"/lessons/[slug]/learn/[topic]/[pageNumber]">;

export const instant = false;

export function generateStaticParams() {
  return LESSONS.flatMap((lesson) =>
    lesson.topics.flatMap((topic) =>
      topic.pages.map((_, i) => ({
        slug: lesson.slug,
        topic: topic.slug,
        pageNumber: String(i + 1),
      })),
    ),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, topic: topicSlug, pageNumber } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return {};
  const found = getTopic(lesson, topicSlug);
  if (!found) return {};
  const skillPage = found.topic.pages[Number(pageNumber) - 1];
  if (!skillPage) return {};
  return {
    title: `${skillPage.title} · ${found.topic.name}`,
  };
}

export default async function LearnPage({ params }: Props) {
  const { slug, topic: topicSlug, pageNumber } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const found = getTopic(lesson, topicSlug);
  if (!found) notFound();
  const { topic, index: topicIndex } = found;

  const pageIndex = Number(pageNumber) - 1;
  if (
    !Number.isInteger(pageIndex) ||
    pageIndex < 0 ||
    pageIndex >= topic.pages.length
  )
    notFound();
  const skillPage = topic.pages[pageIndex];

  const lessonSlug = lesson.slug;
  const lessonTopics = lesson.topics;
  const flat = lessonTopics.flatMap((t, ti) =>
    t.pages.map((_, pi) => ({ ti, pi })),
  );
  const currentPos = flat.findIndex(
    (p) => p.ti === topicIndex && p.pi === pageIndex,
  );
  const neighbors = {
    prev: currentPos > 0 ? flat[currentPos - 1] : null,
    next: currentPos < flat.length - 1 ? flat[currentPos + 1] : null,
  };
  const prev = neighbors.prev && navStep(neighbors.prev, false);
  const next = neighbors.next && navStep(neighbors.next, true);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-20 sm:px-6">
      <TrackPageVisit lessonSlug={lesson.slug} topicSlug={topic.slug} page={pageIndex + 1} />
      <KeyboardPageNav prevHref={prev?.href} nextHref={next?.href} />
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
        <Link
          href={`/lessons/${lesson.slug}`}
          className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          {lesson.title}
        </Link>
        <span aria-hidden="true" className="mx-2 text-neutral-400">
          /
        </span>
        <span className="font-medium text-neutral-900 dark:text-neutral-100">
          {topic.name}
        </span>
      </nav>

      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900/50">
        <p className="mb-2 flex items-baseline justify-between text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          <span>
            {topic.name} · step {topicIndex + 1} of {lesson.topics.length}
          </span>
          <span className="tabular-nums">
            Page {pageIndex + 1} / {topic.pages.length}
          </span>
        </p>
        <ProgressBar
          value={pageIndex + 1}
          max={topic.pages.length}
          label={`${topic.name} learning progress`}
        />
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {topic.pages.map((p, i) => (
            <Link
              key={p.title}
              aria-label={`Go to page ${i + 1}: ${p.title}`}
              href={getLearnHref(lesson.slug, topic.slug, i + 1)}
              aria-current={i === pageIndex ? "page" : undefined}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === pageIndex
                  ? "bg-indigo-500 ring-2 ring-indigo-500/30"
                  : "bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto pb-2">
        <Roadmap lesson={lesson} activeTopicSlug={topic.slug} />
      </div>

      <article className="mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-100">
          {skillPage.title}
        </h1>
        {skillPage.body.map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            className="mt-5 text-base leading-relaxed text-pretty text-neutral-700 sm:text-lg dark:text-neutral-300"
          >
            {paragraph}
          </p>
        ))}
        {skillPage.code && (
          <figure className="mt-7 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
            <figcaption className="flex items-center justify-between border-b border-neutral-800 px-4 py-2 text-xs font-medium text-neutral-400">
              <span>{skillPage.code.language}</span>
              <span aria-hidden="true">example</span>
            </figcaption>
            <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-neutral-200">
              <code>{skillPage.code.snippet}</code>
            </pre>
          </figure>
        )}
      </article>

      <nav
        aria-label="Lesson pages"
        className="mt-10 flex items-center justify-between gap-4"
      >
        {prev ? (
          <Link
            href={prev.href}
            className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium transition hover:border-indigo-300 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 dark:border-neutral-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40"
          >
            <span aria-hidden="true">← </span>
            {prev.label}
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}
        {next ? (
          <Link
            href={next.href}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500"
          >
            {next.label}
            <span aria-hidden="true"> →</span>
          </Link>
        ) : (
          <Link
            href={`/lessons/${lesson.slug}`}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
          >
            Roadmap complete · Back to steps
          </Link>
        )}
      </nav>
    </div>
  );

  function navStep(
    target: { ti: number; pi: number },
    isNext: boolean,
  ): { href: string; label: string } {
    const targetTopic = lessonTopics[target.ti];
    const label =
      target.ti !== topicIndex
        ? isNext
          ? `Next: ${targetTopic.name}`
          : `Back: ${targetTopic.name}`
        : isNext
          ? "Next"
          : "Previous";
    return {
      href: getLearnHref(lessonSlug, targetTopic.slug, target.pi + 1),
      label,
    };
  }
}
