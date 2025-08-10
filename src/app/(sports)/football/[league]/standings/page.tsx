import { prisma } from "@/lib/db";
import { getLeague } from "@/lib/league";
import Link from "next/link";

export default async function StandingsPage({ params }: { params: { league: string } }) {
  const league = getLeague("football", params.league);
  const rows = await prisma.standingRow.findMany({
    where: { seasonId: league.seasonId },
    include: { team: true },
    orderBy: { rank: "asc" },
  });

  return (
    <main className="mx-auto max-w-screen-md px-3 py-6">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{league.name} — Standings</h1>
        <nav className="text-sm">
          <Link href={`/football/${league.id}/standings`} className="font-semibold">Standings</Link>
          <span className="mx-2 text-neutral-400">·</span>
          <Link href={`/football/${league.id}/schedule`} className="text-neutral-500 hover:text-white">Schedule</Link>
        </nav>
      </header>

      <div className="overflow-x-auto rounded-lg border border-neutral-800">
        <table className="w-full text-sm">
          <thead className="bg-neutral-900">
            <tr className="[&>th]:px-3 [&>th]:py-2 text-left">
              <th>#</th><th>Team</th>
              <th className="text-right">W</th>
              <th className="text-right">D</th>
              <th className="text-right">L</th>
              <th className="text-right">GD</th>
              <th className="text-right">Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t border-neutral-800 [&>td]:px-3 [&>td]:py-2">
                <td className="w-10">{r.rank}</td>
                <td className="font-medium">{r.team.name}</td>
                <td className="text-right">{r.wins}</td>
                <td className="text-right">{r.draws ?? 0}</td>
                <td className="text-right">{r.losses}</td>
                <td className="text-right">{r.gd ?? 0}</td>
                <td className="text-right font-bold">{r.points ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
