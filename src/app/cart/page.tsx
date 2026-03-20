'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, clearCart, subtotal, savings, total, itemCount } = useCart();

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-4xl px-6 pb-28">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Cart</h1>
            <p className="mt-1 text-sm text-slate-400">
              {itemCount === 0 ? 'No items yet' : `${itemCount} item${itemCount > 1 ? 's' : ''}`}
            </p>
          </div>
          {items.length > 0 && (
            <button onClick={clearCart} className="text-sm text-slate-400 transition hover:text-red-400">
              Clear all
            </button>
          )}
        </div>

        {/* Empty */}
        {items.length === 0 && (
          <div className="rounded-2xl border border-white/[0.06] bg-[#14152E] px-8 py-20 text-center">
            <svg className="mx-auto mb-4 h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-slate-300">Nothing here yet</h3>
            <p className="mt-2 text-sm text-slate-400">Browse our collections to get started.</p>
            <div className="mt-8 flex justify-center gap-3">
              <Link href="/collections/dragonbreath" className="rounded-xl bg-prism-cyan px-6 py-2.5 text-sm font-semibold text-[#14152E]">
                Browse Collections
              </Link>
              <Link href="/pricing" className="rounded-xl border border-white/[0.08] px-6 py-2.5 text-sm text-slate-400 hover:text-white">
                View Pricing
              </Link>
            </div>
          </div>
        )}

        {/* Items */}
        {items.length > 0 && (
          <>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#14152E] px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-lg shrink-0 ${item.gradient ? `bg-gradient-to-br ${item.gradient}` : 'bg-prism-blue/20'}`} />
                    <div>
                      <h3 className="text-[15px] font-medium text-slate-200">{item.name}</h3>
                      <p className="text-sm text-slate-400">
                        {item.type === 'plugin' ? 'Individual Plugin' : item.type === 'collection' ? 'Full Collection' : 'All Collections'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="text-base font-bold text-slate-200">${item.price}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex h-7 w-7 items-center justify-center rounded text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 rounded-xl border border-white/[0.06] bg-[#14152E] p-8">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-slate-300">${subtotal.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-prism-cyan/60">Bundle savings</span>
                    <span className="text-prism-cyan">-${savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-white/[0.06] pt-3 flex justify-between text-base font-bold">
                  <span className="text-slate-300">Total</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-prism-cyan py-3.5 text-[15px] font-bold text-[#14152E] transition hover:bg-prism-cyan/85"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Proceed to Checkout
              </Link>
              <p className="mt-3 text-center text-xs text-slate-400">
                Secure payment via Stripe. 30-day money-back guarantee.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
