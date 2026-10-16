import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-24 text-center">
      <p className="font-mono text-sm font-semibold text-indigo-600 dark:text-indigo-400">
        404
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Page not found
      </h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-400">
        That lesson or page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
      >
        Back to all lessons
      </Link>
    </div>
  );
}
