export const LEAGUES = {
    football: {
      epl:    { id: "epl", name: "Premier League", seasonId: "2024-epl" },
      laliga: { id: "laliga", name: "La Liga",    seasonId: "2024-laliga" },
    },
  } as const;
  
  
  export function getLeague(sport: string, league: string) {
    const s = sport.toLowerCase();
    const l = league.toLowerCase();
    const sportMap = (LEAGUES as any)[s];
    if (!sportMap) throw new Error(`Unknown sport: ${sport}`);
    const meta = sportMap[l];
    if (!meta) throw new Error(`Unknown league: ${league}`);
    return { sport: s, ...meta };
  }
  