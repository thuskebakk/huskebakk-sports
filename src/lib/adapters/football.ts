import axios from "axios";

const API_BASE = "https://api-football-v1.p.rapidapi.com/v3";
const API_KEY = process.env.FOOTBALL_API_KEY!;
const API_HOST = "api-football-v1.p.rapidapi.com";

export const FOOTBALL_LEAGUE_IDS = {
  epl: 39,
  laliga: 140,
} as const;

export async function fetchStandings(leagueKey: keyof typeof FOOTBALL_LEAGUE_IDS, season = 2024) {
  const res = await axios.get(`${API_BASE}/standings`, {
    params: { league: FOOTBALL_LEAGUE_IDS[leagueKey], season },
    headers: { "X-RapidAPI-Key": API_KEY, "X-RapidAPI-Host": API_HOST },
  });
  return res.data.response[0].league.standings[0] as any[];
}

export async function fetchFixtures(
  leagueKey: keyof typeof FOOTBALL_LEAGUE_IDS,
  opts: { season?: number; fromISO: string; toISO: string }
) {
  const { season = 2024, fromISO, toISO } = opts;
  const res = await axios.get(`${API_BASE}/fixtures`, {
    params: {
      league: FOOTBALL_LEAGUE_IDS[leagueKey],
      season,
      from: fromISO, // YYYY-MM-DD
      to: toISO,     // YYYY-MM-DD
    },
    headers: { "X-RapidAPI-Key": API_KEY, "X-RapidAPI-Host": API_HOST },
  });
  return res.data.response as any[];
}
