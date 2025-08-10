// scripts/seedFootball.ts
import { PrismaClient } from "@prisma/client";
import { fetchStandings } from "../src/lib/adapters/football";

const prisma = new PrismaClient();
const SEASON = 2024 as const;

const META = {
  epl: { leagueId: "epl", name: "English Premier League" },
  laliga: { leagueId: "laliga", name: "La Liga" },
} as const;

type LeagueKey = keyof typeof META;

async function seedLeague(key: LeagueKey) {
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
    create: {
      id: seasonId,
      yearStart: SEASON,
      yearEnd: SEASON + 1,
      leagueId: leagueMeta.leagueId,
    },
  });

  const standings = await fetchStandings(key, SEASON);

  for (const row of standings) {
    const teamId = String(row.team.id);
    const name = row.team.name as string;
    const short = (row.team.code ?? null) as string | null;
    const logo = (row.team.logo ?? null) as string | null;

    const team = await prisma.team.upsert({
      where: { id: teamId },
      update: {
        name,
        short: short ?? undefined,
        leagueId: leagueMeta.leagueId,
        logoUrl: logo ?? undefined,
      },
      create: {
        id: teamId,
        name,
        short,
        leagueId: leagueMeta.leagueId,
        logoUrl: logo,
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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
