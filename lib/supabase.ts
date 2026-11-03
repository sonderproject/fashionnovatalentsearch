import "server-only";
import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key, { auth: { persistSession: false } });
}

export type Registration = {
  id: string;
  email: string;
  marketing_consent: boolean;
  created_at: string;
};

export async function fetchRegistrations(optedInOnly = false): Promise<Registration[]> {
  const supabase = getSupabase();
  const pageSize = 1000;
  const rows: Registration[] = [];
  for (let from = 0; ; from += pageSize) {
    let q = supabase
      .from("registrations")
      .select("id,email,marketing_consent,created_at")
      .order("created_at", { ascending: false })
      .range(from, from + pageSize - 1);
    if (optedInOnly) q = q.eq("marketing_consent", true);
    const { data, error } = await q;
    if (error) throw error;
    rows.push(...(data ?? []));
    if (!data || data.length < pageSize) break;
  }
  return rows;
}
