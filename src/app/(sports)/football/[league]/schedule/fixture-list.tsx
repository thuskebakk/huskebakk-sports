// src/app/(sports)/football/[league]/schedule/fixture-list.tsx
"use client";

import { useMemo } from "react";

function toLocalHM(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function FixtureList({ fixtures }: { fixtures: any[] }) {
  const days = useMemo(() => {
    const map = new Map<string, any[]>();
    for (const f of fixtures) {
      const k = f.fixture.date.slice(0, 10); // YYYY-MM-DD
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(f);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [fixtures]);

  return (
    <div className="mt-4 space-y-6">
      {days.length === 0 && (
        <p className="text-sm text-neutral-400">No fixtures in this window.</p>
      )}
      {days.map(([date, games]) => (
        <section key={date}>
          <h2 className="mb-2 text-sm font-semibold text-neutral-300">{date}</h2>
          <div className="divide-y divide-neutral-800 rounded-lg border border-neutral-800">
            {games.map((g: any) => {
              const status = g.fixture.status.short; // NS, 1H, HT, FT, etc.
              const home = g.teams.home.name;
              const away = g.teams.away.name;
              const hs = g.goals.home ?? 0;
              const as = g.goals.away ?? 0;
              return (
                <div key={g.fixture.id} className="flex items-center justify-between px-3 py-2">
                  <div className="min-w-0">
                    <div className="truncate">{home} vs {away}</div>
                    <div className="text-xs text-neutral-400">{status}</div>
                  </div>
                  <div className="text-right font-semibold tabular-nums">
                    {status === "NS" ? toLocalHM(g.fixture.date) : `${hs} - ${as}`}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
