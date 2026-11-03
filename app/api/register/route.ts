import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: { email?: unknown; confirmEmail?: unknown; marketingConsent?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const confirm = typeof body.confirmEmail === "string" ? body.confirmEmail.trim().toLowerCase() : "";
  const consent = body.marketingConsent === true;

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (email !== confirm) {
    return NextResponse.json({ error: "Email addresses do not match." }, { status: 400 });
  }

  try {
    const { error } = await getSupabase()
      .from("registrations")
      .insert({ email, marketing_consent: consent });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "This email is already registered." }, { status: 409 });
      }
      console.error("Supabase insert error", error);
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
