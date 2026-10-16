import { type Lesson } from "../data/lessons";

export function LessonThumbnail({
  lesson,
  className = "",
}: {
  lesson: Pick<Lesson, "gradient" | "glyph">;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${lesson.gradient} ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-15"
        viewBox="0 0 200 120"
        preserveAspectRatio="none"
      >
        <circle cx="170" cy="15" r="40" fill="white" />
        <circle cx="15" cy="110" r="55" fill="white" />
      </svg>
      <code className="relative text-4xl font-bold tracking-tight text-white drop-shadow-md transition-transform duration-300 group-hover:scale-125 sm:text-5xl">
        {lesson.glyph}
      </code>
    </div>
  );
}
