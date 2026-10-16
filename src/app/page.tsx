import { LessonCard } from "@/features/learning/components/lesson-card";
import { LESSONS } from "@/features/learning/data/lessons";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
      <section className="py-14 text-center sm:py-20">
        <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-balance text-neutral-900 sm:text-5xl dark:text-neutral-100">
          Learn programming, one step at a time
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-pretty text-neutral-600 dark:text-neutral-400">
          Guided roadmaps from your first HTML tag to full applications.
          Pick a track and follow the path.
        </p>
        <a
          href="#lessons"
          className="mt-8 inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500"
        >
          Explore tracks
        </a>
      </section>

      <section id="lessons" aria-labelledby="lessons-heading" className="scroll-mt-24">
        <h2
          id="lessons-heading"
          className="mb-6 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          All learning tracks
        </h2>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LESSONS.map((lesson) => (
            <li key={lesson.slug}>
              <LessonCard lesson={lesson} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
