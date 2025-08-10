export default function SchedulePage({ params }: { params: { league: string } }) {
    return (
      <main className="mx-auto max-w-screen-md px-3 py-6">
        <h1 className="text-2xl font-bold capitalize">{params.league} — Schedule</h1>
        <p className="mt-2 text-sm text-neutral-400">Coming soon.</p>
      </main>
    );
  }
  