// src/app/(sports)/football/[league]/layout.tsx
import Link from "next/link";
import { getLeague } from "@/lib/league";
import LeagueSwitcher from "@/components/league-switcher";

export default function LeagueLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { league: string };
}) {
  const league = getLeague("football", params.league);

  const tabs = [
    { href: `/football/${league.id}/standings`, label: "Standings" },
    { href: `/football/${league.id}/schedule`, label: "Schedule" },
  ];

  return (
    <div data-league={league.id}>
      <div className="sticky top-0 z-10 border-b border-neutral-800 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-screen-md items-center justify-between gap-4 px-3 py-3">
          <nav className="flex gap-4">
            {tabs.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="text-sm text-neutral-300 hover:text-white"
              >
                {t.label}
              </Link>
            ))}
          </nav>
          <LeagueSwitcher />
        </div>
      </div>
      {children}
    </div>
  );
}
