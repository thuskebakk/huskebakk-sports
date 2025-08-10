import Link from "next/link";
export default function Home() {
  return (
    <main className="mx-auto max-w-screen-md px-3 py-10">
      <h1 className="text-3xl font-bold">Huskebakk Sports</h1>
      <div className="mt-6 grid gap-3">
        <Link href="/football/epl/standings" className="underline">Football · Premier League</Link>
        <Link href="/football/laliga/standings" className="underline">Football · La Liga</Link>
      </div>
    </main>
  );
}
