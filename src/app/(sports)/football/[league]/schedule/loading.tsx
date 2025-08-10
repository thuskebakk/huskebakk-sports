export default function Loading() {
    return (
      <main className="mx-auto max-w-screen-md px-3 py-6">
        <div className="mb-4 h-7 w-80 animate-pulse rounded bg-neutral-800" />
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, d) => (
            <section key={d}>
              <div className="mb-2 h-4 w-24 animate-pulse rounded bg-neutral-800" />
              <div className="divide-y divide-neutral-800 rounded-lg border border-neutral-800">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-10 animate-pulse px-3" />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    );
  }
  