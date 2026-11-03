import Link from "next/link";

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/" className="text-xs uppercase tracking-[0.3em] text-white/50 hover:text-pink">← Back</Link>
      <h1 className="mt-8 font-display text-4xl">{title}</h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-white/70 [&_h2]:pt-4 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-white">
        {children}
      </div>
    </main>
  );
}
