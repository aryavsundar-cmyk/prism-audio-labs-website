'use client';

import { collections, totalPluginCount, completeSuitePrice, effectsSynthsCollections, worldCollections } from '@/data/plugins';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function PricingPage() {
  const { addCollection, addSuite, isInCart } = useCart();

  const individualTotal = collections.reduce((sum, c) => sum + c.price, 0);
  const savings = individualTotal - completeSuitePrice;

  return (
    <div className="pt-28">
      {/* Header */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-bold text-white">Choose Your Path</h1>
          <p className="mt-3 text-base text-slate-400">Individual collections or the complete suite.</p>
        </div>
      </section>

      {/* Complete Suite */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-prism-violet/15 bg-gradient-to-br from-prism-navy/40 to-[#14152E] p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-prism-cyan/60">Best Value</div>
                <h2 className="text-3xl font-bold text-white">Complete Suite</h2>
                <p className="mt-2 text-base text-slate-400">
                  All {totalPluginCount} plugins across all {collections.length} collections. One purchase, unlimited creativity.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {collections.map((c) => (
                    <span key={c.id} className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-slate-400">
                      {c.name} ({c.plugins.length})
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-center md:text-right">
                <div className="text-4xl font-bold text-prism-cyan">${completeSuitePrice}</div>
                <div className="mt-1 text-sm text-slate-400 line-through">${individualTotal}</div>
                <div className="mt-1 text-sm text-prism-cyan/60">Save ${savings}</div>
                <button
                  onClick={() => { if (!isInCart('complete-suite')) addSuite(); }}
                  className={`mt-4 rounded-xl px-8 py-3 text-sm font-bold transition ${
                    isInCart('complete-suite')
                      ? 'bg-prism-cyan/10 text-prism-cyan'
                      : 'bg-prism-cyan text-[#14152E] hover:bg-prism-cyan/85'
                  }`}
                >
                  {isInCart('complete-suite') ? 'In Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Effects & Synths Collections */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="mb-6 text-lg font-semibold text-slate-300">Effects & Synthesis</h3>
          <div className="grid gap-6 sm:grid-cols-3">
            {effectsSynthsCollections.map((col) => {
              const inCart = isInCart(`collection-${col.id}`) || isInCart('complete-suite');
              return (
                <div key={col.id} className="rounded-2xl border border-white/[0.06] bg-[#14152E] p-8">
                  <div className={`mb-5 h-1 w-12 rounded-full bg-gradient-to-r ${col.gradient}`} />
                  <h4 className="text-xl font-bold text-slate-200">{col.name}</h4>
                  <p className="mt-1 text-sm text-slate-400">{col.subtitle} &mdash; {col.plugins.length} plugins</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{col.description}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-2xl font-bold text-slate-200">${col.price}</span>
                    <button
                      onClick={() => { if (!inCart) addCollection(col); }}
                      className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
                        inCart ? 'bg-prism-cyan/10 text-prism-cyan' : 'bg-white/[0.06] text-slate-300 hover:bg-white/[0.1]'
                      }`}
                    >
                      {inCart ? 'In Cart' : 'Add to Cart'}
                    </button>
                  </div>
                  <Link href={`/collections/${col.id}`} className="mt-4 block text-sm text-slate-400 transition hover:text-slate-300">
                    View all plugins &rarr;
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* World Instrument Collections */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="mb-6 text-lg font-semibold text-slate-300">World Instruments</h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {worldCollections.map((col) => {
              const inCart = isInCart(`collection-${col.id}`) || isInCart('complete-suite');
              return (
                <div key={col.id} className="rounded-2xl border border-white/[0.06] bg-[#14152E] p-6">
                  <div className={`mb-4 h-1 w-10 rounded-full bg-gradient-to-r ${col.gradient}`} />
                  <h4 className="text-lg font-bold text-slate-200">{col.name}</h4>
                  <p className="mt-0.5 text-xs text-slate-400">{col.subtitle} &mdash; {col.plugins.length} plugins</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-2">{col.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-200">${col.price}</span>
                    <button
                      onClick={() => { if (!inCart) addCollection(col); }}
                      className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                        inCart ? 'bg-prism-cyan/10 text-prism-cyan' : 'bg-white/[0.06] text-slate-300 hover:bg-white/[0.1]'
                      }`}
                    >
                      {inCart ? 'In Cart' : 'Add'}
                    </button>
                  </div>
                  <Link href={`/collections/${col.id}`} className="mt-3 block text-xs text-slate-400 transition hover:text-slate-300">
                    View plugins &rarr;
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pb-20 border-t border-white/[0.04] pt-16">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="text-center text-lg font-semibold text-slate-200 mb-10">Every Purchase Includes</h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'VST3 & AU', desc: 'Compatible with all major DAWs on macOS' },
              { title: 'Free Updates', desc: 'Lifetime access to all future updates' },
              { title: 'Factory Presets', desc: 'Professionally designed starting points' },
              { title: '2 Activations', desc: 'Install on studio and laptop' },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-prism-cyan/[0.08]">
                  <svg className="h-5 w-5 text-prism-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-sm font-semibold text-slate-200">{f.title}</h4>
                <p className="mt-1 text-sm text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-28">
        <div className="mx-auto max-w-3xl px-6">
          <h3 className="text-center text-xl font-bold text-slate-200 mb-8">FAQ</h3>
          <div className="space-y-3">
            {[
              { q: 'How do I install the plugins?', a: 'Download the DMG installer, drag the plugin files to your AU or VST3 folder, and rescan plugins in your DAW.' },
              { q: 'Do you offer educational discounts?', a: 'Yes — students and educators get 50% off with valid academic credentials.' },
              { q: 'Can I upgrade to the complete suite?', a: 'Absolutely. Pay the difference at any time. Previous purchases are always credited.' },
              { q: 'What is your refund policy?', a: '30-day money-back guarantee, no questions asked.' },
              { q: 'Will Windows be supported?', a: 'Windows support is planned for Q3 2026. Join our newsletter to be notified.' },
            ].map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-white/[0.06] bg-white/[0.015]">
                <summary className="cursor-pointer px-6 py-4 text-[15px] text-slate-300 transition hover:text-white">
                  {faq.q}
                </summary>
                <div className="px-6 pb-4 text-sm text-slate-400">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
