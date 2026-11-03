import Link from "next/link";
import SignupForm from "./SignupForm";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="px-6 pt-8 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-white/60">
          Independent Talent Search
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <h1 className="max-w-4xl text-center font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          THE NEXT FACE
          <br />
          COULD BE <span className="text-pink">YOU.</span>
        </h1>
        <div className="mx-auto mt-8 h-px w-16 bg-pink" />
        <p className="mt-8 max-w-md text-center text-sm leading-relaxed text-white/70 sm:text-base">
          Independent Talent Search — Register to receive updates about upcoming opportunities.
        </p>

        <div className="mt-12 w-full max-w-md">
          <SignupForm />
        </div>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-[11px] leading-relaxed text-white/45">
        <p>Independent Talent Search. Not affiliated with, endorsed by, or sponsored by Fashion Nova.</p>
        <nav className="mt-3 flex justify-center gap-6 uppercase tracking-[0.2em]">
          <Link href="/privacy" className="hover:text-pink">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-pink">Terms</Link>
        </nav>
      </footer>
    </div>
  );
}
