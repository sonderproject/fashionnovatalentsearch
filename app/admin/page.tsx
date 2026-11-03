import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { fetchRegistrations } from "@/lib/supabase";
import { login, logout } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  if (!(await isAdmin())) {
    return (
      <main className="flex min-h-dvh items-center justify-center px-6">
        <form action={login} className="w-full max-w-sm space-y-4">
          <h1 className="font-display text-3xl">Admin</h1>
          <input
            type="password"
            name="password"
            required
            autoFocus
            placeholder="Password"
            className="w-full border border-white/25 bg-transparent px-4 py-3 outline-none focus:border-pink"
          />
          {error && <p className="text-sm text-pink">Incorrect password.</p>}
          <button className="w-full bg-pink py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black hover:bg-white">
            Sign in
          </button>
        </form>
      </main>
    );
  }

  let rows: Awaited<ReturnType<typeof fetchRegistrations>> = [];
  let loadError = "";
  try {
    rows = await fetchRegistrations();
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Failed to load registrations.";
  }
  const optedIn = rows.filter((r) => r.marketing_consent).length;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl">Registrations</h1>
        <div className="flex gap-3">
          <a
            href="/admin/export"
            className="bg-pink px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black hover:bg-white"
          >
            Export opted-in CSV
          </a>
          <form action={logout}>
            <button className="border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-pink">
              Log out
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 flex gap-8 text-sm text-white/70">
        <p><span className="text-2xl font-semibold text-white">{rows.length}</span> total</p>
        <p><span className="text-2xl font-semibold text-pink">{optedIn}</span> opted in</p>
      </div>

      {loadError && <p className="mt-6 text-sm text-pink">{loadError}</p>}

      <div className="mt-6 overflow-x-auto border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.15em] text-white/60">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Marketing consent</th>
              <th className="px-4 py-3">Submitted (UTC)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="px-4 py-3">{r.email}</td>
                <td className="px-4 py-3">{r.marketing_consent ? <span className="text-pink">Yes</span> : "No"}</td>
                <td className="whitespace-nowrap px-4 py-3 text-white/60">
                  {new Date(r.created_at).toISOString().replace("T", " ").slice(0, 16)}
                </td>
              </tr>
            ))}
            {rows.length === 0 && !loadError && (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-white/50">No registrations yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
