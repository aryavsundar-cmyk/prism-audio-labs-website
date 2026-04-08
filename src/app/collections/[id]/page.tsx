import { collections, getCollectionById, completeSuitePrice } from '@/data/plugins';
import { notFound } from 'next/navigation';
import CollectionSection from '@/components/CollectionSection';
import Link from 'next/link';
import AddCollectionButton from '@/components/AddCollectionButton';

export function generateStaticParams() {
  return collections.map((col) => ({ id: col.id }));
}

export default async function CollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const collection = getCollectionById(id);
  if (!collection) return notFound();

  const otherCollections = collections.filter((c) => c.id !== collection.id && c.group === collection.group).slice(0, 6);

  return (
    <div className="pt-28">
      {/* Header */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="transition hover:text-slate-300">Home</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-400">{collection.name}</span>
          </div>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${collection.gradient}`} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">{collection.subtitle}</span>
            </div>
            <h1 className={`text-4xl font-bold tracking-tight ${collection.textGradientClass}`}>
              {collection.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              {collection.longDescription}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-200">${collection.price}</span>
                <span className="text-sm text-slate-400">collection</span>
              </div>
              <span className="text-sm text-slate-400">{collection.plugins.length} plugins</span>
              <AddCollectionButton collection={collection} />
            </div>
          </div>
        </div>
      </section>

      {/* Plugins */}
      <CollectionSection collection={collection} />

      {/* Related Collections */}
      {otherCollections.length > 0 && (
        <section className="py-20 border-t border-white/[0.04]">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-8 text-xl font-bold text-slate-200">
              More {collection.group === 'world' ? 'World Instrument' : 'Effects & Synth'} Collections
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherCollections.map((col) => (
                <Link key={col.id} href={`/collections/${col.id}`} className="group">
                  <div className="rounded-2xl border border-white/[0.06] bg-[#14152E] p-6 transition hover:border-white/[0.1]">
                    <div className={`mb-4 h-1 w-10 rounded-full bg-gradient-to-r ${col.gradient}`} />
                    <h3 className={`text-lg font-bold ${col.textGradientClass}`}>{col.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{col.plugins.length} plugins &mdash; ${col.price}</p>
                    <p className="mt-3 text-sm text-slate-400 line-clamp-2">{col.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-prism-violet/[0.1] bg-prism-navy/30 p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div>
                <h3 className="text-lg font-semibold text-slate-200">Want it all?</h3>
                <p className="mt-1 text-sm text-slate-400">Every plugin across all {collections.length} collections.</p>
              </div>
              <Link href="/pricing" className="shrink-0 rounded-xl bg-prism-cyan px-7 py-3 text-sm font-bold text-[#14152E] transition hover:bg-prism-cyan/85">
                Complete Suite &mdash; ${completeSuitePrice}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
