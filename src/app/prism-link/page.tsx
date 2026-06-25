import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Prism Link & Fuse',
  description:
    'Prism Link is a shared modulation bus that lets Prism instruments drive each other at the parameter and timbral level — not sidechaining. Seismic and Void form a coupled percussion-and-noise system for electronic music.',
  openGraph: {
    title: 'Prism Link & Fuse — Prism Audio Labs',
    description:
      'A cross-instrument modulation bus. One groove, set once in Seismic, moves the whole rack.',
  },
};

export default function PrismLinkPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="relative py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-prism-cyan/[0.06] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-2 text-[14px] text-white/65 mb-8">
            <Link href="/" className="transition hover:text-white/65">Home</Link>
            <span>/</span>
            <span className="text-white/65">Prism Link</span>
          </div>
          <div className="max-w-4xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-1.5 w-14 rounded-full animated-border" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/65">Prism Link &amp; Fuse</span>
            </div>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tight text-white leading-[1.05]">
              Set the groove once.<br />
              <span className="text-gradient-prism">The whole rack inherits it.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-[18px] leading-[1.8] text-white/65">
              Prism Link is a shared modulation bus across the instrument suite. When two or more Prism instruments are linked, they exchange control data in real time — so one instrument&apos;s internal dynamics can shape another&apos;s sound. It is not sidechaining, and it is not a stem bus. It is the wiring between instruments that usually only exists inside a single synth.
            </p>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="py-16 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="max-w-xl">
              <h2 className="text-[28px] font-bold text-white/90">What it carries</h2>
              <p className="mt-6 text-[17px] leading-[1.9] text-white/65">
                A linked instrument continuously publishes its working state: the envelope, trigger, and pitch of each of its voices, the sequencer&apos;s current step, the project tempo, a performance mod-wheel, and a shared carrier frequency — the <span className="text-white/85">Fuse</span> signal. Any other linked instrument can read those streams and route them onto its own controls.
              </p>
              <p className="mt-6 text-[17px] leading-[1.9] text-white/65">
                It runs over a lightweight shared-memory channel, so it works even though most hosts run each plugin in its own sandboxed process. No audio crosses the link — only control data — so there is nothing to route, no added latency, and no bleed. You enable it; the instruments find each other.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[
                { n: '01', t: 'Per-voice envelopes', d: 'Each of Seismic&apos;s eight voices broadcasts its amplitude envelope — a modulation source per drum.' },
                { n: '02', t: 'Triggers & step', d: 'Voice triggers and the sequencer position let receivers gate or accent in lockstep with the pattern.' },
                { n: '03', t: 'Pitch & Fuse carrier', d: 'A broadcast pitch the ring modulator can lock to, so tuned textures stay in key with the kit.' },
                { n: '04', t: 'Tempo & mod-wheel', d: 'Shared transport and a single performance control that moves the whole rack at once.' },
              ].map((c) => (
                <div key={c.n} className="rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/[0.04] to-transparent p-7">
                  <div className="text-[28px] font-bold text-gradient-cosmos">{c.n}</div>
                  <h4 className="mt-3 text-[16px] font-semibold text-white/85" dangerouslySetInnerHTML={{ __html: c.t }} />
                  <p className="mt-2 text-[14px] leading-relaxed text-white/65" dangerouslySetInnerHTML={{ __html: c.d }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Not sidechaining */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-[28px] font-bold text-white/90">Why it&apos;s more than sidechaining</h2>
            <p className="mt-4 text-[16px] text-white/55">The difference is dimensionality.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.06] bg-[#14152E] p-9">
              <h4 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-white/45">Sidechain compression</h4>
              <p className="mt-4 text-[16px] leading-[1.85] text-white/65">
                Takes one audio signal&apos;s loudness and uses it to push another signal&apos;s level. One source, one destination, one dimension: gain. The pumping is a by-product of a gain reduction stage.
              </p>
            </div>
            <div className="rounded-2xl border border-prism-cyan/15 bg-gradient-to-br from-prism-cyan/[0.05] to-transparent p-9">
              <h4 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-prism-cyan/70">Prism Link</h4>
              <p className="mt-4 text-[16px] leading-[1.85] text-white/75">
                Carries many control sources — each voice&apos;s envelope, its pitch, the step grid, the carrier — into many destinations: filter cutoff, resonance, ring-mod frequency, gate timing, amplitude. It is a modulation matrix between instruments, acting on the parameters that shape <span className="text-white">timbre</span>, not just the fader. The instruments are coupled, not merely ducked.
            </p>
            </div>
          </div>
        </div>
      </section>

      {/* The value chain */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-[28px] font-bold text-white/90">The value chain starts at Seismic</h2>
            <p className="mt-4 text-[16px] leading-[1.8] text-white/55">
              Seismic is the source. Its eight synthesized voices generate sound and, at the same time, a stream of control signals. Everything downstream borrows that motion.
            </p>
          </div>
          <div className="space-y-5">
            {[
              { step: 'Seismic', role: 'The engine', body: 'Eight voices — kick, snare, hats, toms, percussion — each publishing its envelope, trigger, and pitch, plus the sequencer step and tempo. The rhythm is also a set of modulation curves.' },
              { step: '+ Void', role: 'Percussion-reactive texture', body: 'Void&apos;s three band-pass filters track the drum envelopes, so its noise opens and closes with the kit; its ring modulator locks to the Fuse carrier, producing tuned metallic hits that stay in key and on the grid. Seismic + Void become one self-contained electronic percussion-and-noise system.' },
              { step: '+ Cosmos synths', role: 'The groove reaches the harmony', body: 'Pads that pulse with the kick, leads gated to the pattern, a bass whose filter moves on the snare. Because every instrument is moving on the same envelopes that define the beat, the mix begins to cohere before you touch a fader — internal mixing at the parameter level.' },
            ].map((s, i) => (
              <div key={s.step} className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#14152E] p-8 sm:flex-row sm:items-start sm:gap-8">
                <div className="flex shrink-0 items-center gap-4 sm:w-64">
                  <div className="text-[28px] font-bold text-gradient-prism">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <div className="text-[17px] font-semibold text-white/90">{s.step}</div>
                    <div className="text-[13px] uppercase tracking-[0.12em] text-prism-cyan/55">{s.role}</div>
                  </div>
                </div>
                <p className="text-[16px] leading-[1.85] text-white/65" dangerouslySetInnerHTML={{ __html: s.body }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For electronic music */}
      <section className="py-20 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="max-w-xl">
              <h2 className="text-[28px] font-bold text-white/90">Built for rhythm-led music</h2>
              <p className="mt-6 text-[17px] leading-[1.9] text-white/65">
                In techno, house, breaks, IDM, bass music, and ambient, rhythm and timbre are the same idea. Prism Link is built for that: rather than drawing the same envelope into five plugins by hand and hoping they stay aligned, you set the motion once in Seismic and the rest of the rack inherits it — sample-locked, tempo-aware, and re-usable across a whole arrangement.
              </p>
              <p className="mt-6 text-[17px] leading-[1.9] text-white/65">
                Re-time the pattern and everything follows. Swap the kit and the textures re-voice with it. The link is the difference between a stack of separate plugins and a single, responsive instrument.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-[#14152E] p-9">
              <h4 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.15em] text-prism-cyan/60">In practice</h4>
              <ul className="space-y-4 text-[15px] leading-relaxed text-white/65">
                <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-prism-cyan/40" /> A noise hat from Void that articulates on Seismic&apos;s closed-hat envelope — no separate programming.</li>
                <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-prism-cyan/40" /> Ring-modulated percussion tuned to the Fuse carrier, locked to the key of the track.</li>
                <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-prism-cyan/40" /> A pad whose filter opens on every kick, so the low end stays clear without a compressor.</li>
                <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-prism-cyan/40" /> One mod-wheel gesture that opens the whole linked rack at once in a performance.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-white/[0.06] bg-[#14152E] p-10 text-center">
            <h2 className="text-[24px] font-bold text-white/90">Prism Link ships across the suite</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-[1.7] text-white/55">
              Every Prism instrument can link. Seismic and Void are the system&apos;s rhythmic core; the Cosmos synths extend it into harmony and lead. No hub, no setup — just enable the link.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/#waitlist" className="rounded-xl bg-prism-cyan px-6 py-3 text-[14px] font-semibold text-[#14152E] transition hover:bg-prism-cyan/85">
                Join the Waitlist
              </Link>
              <Link href="/" className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-6 py-3 text-[15px] text-white/65 transition hover:text-white">
                Explore the instruments
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
