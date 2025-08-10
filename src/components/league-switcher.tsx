"use client";

import { usePathname, useRouter, useParams } from "next/navigation";

const LEAGUES = [
  { key: "epl", label: "EPL" },
  { key: "laliga", label: "La Liga" },
];

export default function LeagueSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ league: string }>();
  const current = String(params.league || "").toLowerCase();

  function switchTo(key: string) {
    const parts = pathname.split("/"); // ["", "football", "epl", "standings"...]
    if (parts.length >= 3) parts[2] = key; // replace league segment
    router.push(parts.join("/"));
  }

  return (
    <div className="flex gap-2">
      {LEAGUES.map((l) => {
        const active = l.key === current;
        return (
          <button
            key={l.key}
            onClick={() => switchTo(l.key)}
            className={`rounded-md px-3 py-1 text-sm ${
              active
                ? "bg-[var(--accent)] text-white"
                : "bg-neutral-900 text-neutral-300 hover:bg-neutral-800"
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
