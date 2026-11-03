"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputClass =
  "w-full border border-white/25 bg-transparent px-4 py-4 text-base text-white placeholder-white/35 outline-none transition-colors focus:border-pink";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setError("");

    const a = email.trim().toLowerCase();
    const b = confirm.trim().toLowerCase();
    if (!EMAIL_RE.test(a)) return setError("Please enter a valid email address.");
    if (a !== b) return setError("Email addresses do not match.");

    setStatus("loading");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: a, confirmEmail: b, marketingConsent: consent }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("done");
    } catch {
      setError("Network error. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-pink px-6 py-10 text-center" role="status">
        <p className="font-display text-3xl">Thank you.</p>
        <p className="mt-3 text-sm text-white/70">
          Your registration has been received. We&apos;ll be in touch about upcoming opportunities.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <label className="block">
        <span className="sr-only">Email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="sr-only">Password</span>
        <input
          type="email"
          name="confirmEmail"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          onPaste={(e) => e.preventDefault()}
          className={inputClass}
        />
      </label>

      <label className="flex cursor-pointer items-start gap-3 pt-1 text-left text-xs leading-relaxed text-white/60">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#ff2d87]"
        />
        <span>(Optional) Yes, send me marketing emails about future talent searches and opportunities. Unsubscribe anytime.</span>
      </label>

      {error && (
        <p className="text-sm text-pink" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-pink px-6 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-black transition-colors hover:bg-white disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
