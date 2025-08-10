// src/app/(sports)/football/[league]/standings/page.tsx
import { prisma } from "@/lib/db";
import { getLeague } from "@/lib/league";

export default async function StandingsPage({
  params,
}: { params: { league: string } }) {
  const league = getLeague("football", params.league);

  // standings page query
  const rows = await prisma.standingRow.findMany({
    where: { seasonId: league.seasonId },
    include: { team: true },
    orderBy: { rank: "asc" },
  });


  return (
    <main className="mx-auto max-w-screen-md px-3 py-6">
      <h1 className="mb-4 text-2xl font-bold">{league.name} — Standings</h1>

      <div className="overflow-x-auto rounded-lg border border-neutral-800">
        <table className="w-full text-sm">
          <thead className="bg-neutral-900">
            <tr className="[&>th]:px-3 [&>th]:py-2 text-left">
              <th>#</th>
              <th>Team</th>
              <th className="text-right">W</th>
              <th className="text-right">D</th>
              <th className="text-right">L</th>
              <th className="text-right">GD</th>
              <th className="text-right">Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-t border-neutral-800 [&>td]:px-3 [&>td]:py-2"
              >
                <td className="w-10">{r.rank}</td>
                <td className="font-medium">
                  <span className="inline-flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {(r.team as any).logoUrl && (
                      <img
                        src={(r.team as any).logoUrl}
                        alt=""
                        className="h-5 w-5 rounded-sm object-contain"
                      />
                    )}
                    {r.team.name}
                  </span>
                </td>
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
