export default function Loading() {
    return (
      <main className="mx-auto max-w-screen-md px-3 py-6">
        <div className="mb-4 h-7 w-56 animate-pulse rounded bg-neutral-800" />
        <div className="overflow-x-auto rounded-lg border border-neutral-800">
          <div className="divide-y divide-neutral-800">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="grid grid-cols-7 gap-2 px-3 py-2">
                {Array.from({ length: 7 }).map((__, j) => (
                  <div key={j} className="h-4 animate-pulse rounded bg-neutral-800" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }
  