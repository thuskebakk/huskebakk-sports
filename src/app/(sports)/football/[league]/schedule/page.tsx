// src/app/(sports)/football/[league]/schedule/page.tsx
import { fetchFixtures } from "@/lib/adapters/football";
import { getLeague } from "@/lib/league";
import FixtureList from "./fixture-list";

function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default async function SchedulePage({ params }: { params: { league: string } }) {
  const league = getLeague("football", params.league);

  const start = new Date();
  const end = new Date();
  end.setDate(start.getDate() + 7);

  const fixtures = await fetchFixtures(league.id as "epl" | "laliga", {
    fromISO: toISO(start),
    toISO: toISO(end),
  });

  return (
    <main className="mx-auto max-w-screen-md px-3 py-6">
      <h1 className="text-2xl font-bold">{league.name} — Schedule (next 7 days)</h1>
      <FixtureList fixtures={fixtures} />
    </main>
  );
}
