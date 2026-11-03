import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";

function sessionToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHmac("sha256", pw).update("admin-session-v1").digest("hex");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function checkPassword(input: string) {
  const pw = process.env.ADMIN_PASSWORD;
  return !!pw && safeEqual(input, pw);
}

export function getSessionToken() {
  return sessionToken();
}

export async function isAdmin() {
  const token = sessionToken();
  if (!token) return false;
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  return !!value && safeEqual(value, token);
}
