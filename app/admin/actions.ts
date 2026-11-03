"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, checkPassword, getSessionToken } from "@/lib/auth";

export async function login(formData: FormData) {
  const pw = String(formData.get("password") ?? "");
  const token = getSessionToken();
  if (!token || !checkPassword(pw)) redirect("/admin?error=1");

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/admin" });
  redirect("/admin");
}
