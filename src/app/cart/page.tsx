import Link from 'next/link';

export default function CartPage() {
  return (
    <div className="pt-28">
      <div className="mx-auto max-w-4xl px-6 pb-28">
        <div className="rounded-2xl border border-white/[0.06] bg-[#14152E] px-8 py-20 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-prism-cyan/20 bg-prism-cyan/[0.06] px-5 py-2">
            <div className="h-1.5 w-1.5 rounded-full bg-prism-cyan animate-pulse-glow" />
            <span className="text-sm font-medium text-prism-cyan">Coming 2026</span>
          </div>
          <h1 className="text-3xl font-bold text-white">We&apos;re Not Quite Ready Yet</h1>
          <p className="mt-3 text-base text-slate-400 max-w-md mx-auto">
            Our plugins are still in development. Join the waitlist and we&apos;ll let you know the moment they&apos;re available.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <a href="/#waitlist" className="rounded-xl bg-prism-cyan px-6 py-2.5 text-sm font-semibold text-[#14152E] transition hover:bg-prism-cyan/85">
              Join Waitlist
            </a>
            <Link href="/collections/dragonbreath" className="rounded-xl border border-white/[0.08] px-6 py-2.5 text-sm text-slate-400 hover:text-white transition">
              Browse Collections
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
