'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { collections } from '@/data/plugins';
import { useCart } from '@/context/CartContext';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#08091A]/70 backdrop-blur-2xl saturate-150">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-9 w-9">
            <div className="animated-border absolute inset-0 rounded-lg opacity-60" />
            <div className="absolute inset-[1px] flex items-center justify-center rounded-lg bg-[#14152E]">
              {/* Prism triangle */}
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 20h20L12 2z" stroke="url(#prism-nav)" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
                <defs>
                  <linearGradient id="prism-nav" x1="2" y1="20" x2="20" y2="4">
                    <stop offset="0%" stopColor="#3730A3"/>
                    <stop offset="50%" stopColor="#7C5CFC"/>
                    <stop offset="100%" stopColor="#A78BFA"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div>
            <span className="text-lg font-bold tracking-wide text-white" style={{ letterSpacing: '0.15em' }}>PRISM</span>
            <span className="ml-1.5 text-lg font-light tracking-tight text-prism-violet">Audio Labs</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {/* Products dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className={`flex items-center gap-1.5 text-[15px] transition ${
              pathname.startsWith('/collections') ? 'font-medium text-white' : 'text-white/70 hover:text-white'
            }`}>
              Collections
              <svg className={`h-3.5 w-3.5 transition ${productsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>

            {productsOpen && (
              <div className="absolute left-1/2 top-full mt-3 w-[340px] -translate-x-1/2 rounded-xl border border-prism-violet/10 bg-[#14152E]/98 p-5 shadow-2xl backdrop-blur-xl">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">Browse Collections</div>
                {collections.map((col) => (
                  <Link
                    key={col.id}
                    href={`/collections/${col.id}`}
                    className="group flex items-center gap-3 rounded-lg p-3 transition hover:bg-white/5"
                    onClick={() => setProductsOpen(false)}
                  >
                    <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${col.gradient} opacity-80`} />
                    <div>
                      <div className="text-[15px] font-medium text-white/90">{col.name}</div>
                      <div className="text-[13px] text-white/50">{col.subtitle} — {col.plugins.length} plugins</div>
                    </div>
                  </Link>
                ))}
                <div className="mt-3 border-t border-white/5 pt-3">
                  <Link
                    href="/pricing"
                    className="block rounded-lg p-3 text-[15px] font-medium text-prism-cyan transition hover:bg-white/5"
                    onClick={() => setProductsOpen(false)}
                  >
                    View All Pricing →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/pricing" className={`text-[15px] transition ${isActive('/pricing') ? 'font-medium text-white' : 'text-white/70 hover:text-white'}`}>
            Pricing
          </Link>
          <Link href="/about" className={`text-[15px] transition ${isActive('/about') ? 'font-medium text-white' : 'text-white/70 hover:text-white'}`}>
            About
          </Link>
        </div>

        {/* Right side: Cart + CTA */}
        <div className="flex items-center gap-4">
          {/* Cart icon */}
          <Link href="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-white/5">
            <svg className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="cart-bounce absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-prism-cyan text-[10px] font-bold text-[#14152E]">
                {itemCount}
              </span>
            )}
          </Link>

          <Link
            href="/pricing"
            className="hidden rounded-lg bg-prism-cyan px-5 py-2.5 text-[14px] font-semibold text-[#14152E] transition hover:bg-prism-cyan/85 lg:block"
          >
            Get the Suite
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <div className="space-y-1.5">
              <div className={`h-0.5 w-5 bg-white transition ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <div className={`h-0.5 w-5 bg-white transition ${mobileOpen ? 'opacity-0' : ''}`} />
              <div className={`h-0.5 w-5 bg-white transition ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-white/5 bg-[#14152E]/98 p-6 backdrop-blur-xl lg:hidden">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.id}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-white/5"
            >
              <div className={`h-7 w-7 rounded bg-gradient-to-br ${col.gradient} opacity-80`} />
              <span className="text-[15px] text-white/80">{col.name}</span>
            </Link>
          ))}
          <div className="mt-4 border-t border-white/5 pt-4 space-y-1">
            <Link href="/pricing" onClick={() => setMobileOpen(false)} className="block p-3 text-[15px] text-white/70">Pricing</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block p-3 text-[15px] text-white/70">About</Link>
            <Link href="/cart" onClick={() => setMobileOpen(false)} className="block p-3 text-[15px] text-white/70">
              Cart {itemCount > 0 && <span className="ml-1 text-prism-cyan">({itemCount})</span>}
            </Link>
          </div>
          <Link
            href="/pricing"
            onClick={() => setMobileOpen(false)}
            className="mt-4 block rounded-lg bg-prism-cyan px-5 py-3 text-center text-[14px] font-semibold text-[#14152E]"
          >
            Get the Suite
          </Link>
        </div>
      )}
    </nav>
  );
}
