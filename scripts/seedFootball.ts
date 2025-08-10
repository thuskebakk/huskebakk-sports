import { PrismaClient } from "@prisma/client";
import { fetchStandings } from "../src/lib/adapters/football";

const prisma = new PrismaClient();
const SEASON = 2024;

const META = {
  epl:    { leagueId: "epl",    name: "English Premier League" },
  laliga: { leagueId: "laliga", name: "La Liga" },
} as const;

async function seedLeague(key: keyof typeof META) {
  const leagueMeta = META[key];
  const seasonId = `${SEASON}-${leagueMeta.leagueId}`;

  await prisma.league.upsert({
    where: { id: leagueMeta.leagueId },
    update: {},
    create: { id: leagueMeta.leagueId, name: leagueMeta.name, sport: "football" },
  });

  await prisma.season.upsert({
    where: { id: seasonId },
    update: {},
    create: { id: seasonId, yearStart: SEASON, yearEnd: SEASON + 1, leagueId: leagueMeta.leagueId },
  });

  const standings = await fetchStandings(key, SEASON);

  for (const row of standings) {
    const team = await prisma.team.upsert({
      where: { id: String(row.team.id) },
      update: { name: row.team.name, short: row.team.code },
      create: {
        id: String(row.team.id),
        name: row.team.name,
        short: row.team.code,
        leagueId: leagueMeta.leagueId,
      },
    });

    await prisma.standingRow.upsert({
      where: { id: `${team.id}-${SEASON}` },
      update: {
        rank: row.rank,
        wins: row.all.win,
        losses: row.all.lose,
        draws: row.all.draw,
        points: row.points,
        gd: row.goalsDiff,
      },
      create: {
        id: `${team.id}-${SEASON}`,
        seasonId,
        teamId: team.id,
        rank: row.rank,
        wins: row.all.win,
        losses: row.all.lose,
        draws: row.all.draw,
        points: row.points,
        gd: row.goalsDiff,
      },
    });
  }

  console.log(`✅ Seeded ${leagueMeta.name}`);
}

async function main() {
  await seedLeague("epl");
  await seedLeague("laliga");
}

main().catch(console.error).finally(() => prisma.$disconnect());
