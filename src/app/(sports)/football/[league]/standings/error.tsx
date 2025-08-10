"use client";

export default function Error({
  error,
  reset,
}: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto max-w-screen-md px-3 py-10">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-sm text-neutral-400">
        {error.message || "Failed to load data."}
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </main>
  );
}
