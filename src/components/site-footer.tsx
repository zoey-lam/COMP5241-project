export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-neutral-200 py-8 dark:border-neutral-800">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-neutral-500 sm:flex-row sm:px-6 dark:text-neutral-400">
        <p>
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
            CodePath
          </span>{" "}
          — learn programming, one step at a time.
        </p>
        <p aria-hidden="true" className="font-mono text-xs">
          {"console.log('happy coding');"}
        </p>
      </div>
    </footer>
  );
}
