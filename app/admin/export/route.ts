import { isAdmin } from "@/lib/auth";
import { fetchRegistrations } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function csvCell(v: string) {
  // Quote and neutralise spreadsheet formula injection
  const safe = /^[=+\-@]/.test(v) ? `'${v}` : v;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });

  const rows = await fetchRegistrations(true);
  const lines = [
    "email,marketing_consent,submitted_at",
    ...rows.map((r) => [csvCell(r.email), String(r.marketing_consent), csvCell(r.created_at)].join(",")),
  ];
  const date = new Date().toISOString().slice(0, 10);

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="opted-in-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
