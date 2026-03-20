'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

type CheckoutStep = 'payment' | 'processing' | 'success';

export default function CheckoutPage() {
  const { items, total, savings, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('payment');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [zip, setZip] = useState('');

  // Format card number with spaces
  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  // Format expiry
  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + ' / ' + digits.slice(2);
    return digits;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !cardNumber || !expiry || !cvc || !name) return;

    setStep('processing');

    // Simulate Stripe processing
    setTimeout(() => {
      setStep('success');
      clearCart();
    }, 2500);
  };

  // Redirect if no items
  if (items.length === 0 && step !== 'success') {
    return (
      <div className="pt-24">
        <div className="mx-auto max-w-lg px-6 py-32 text-center">
          <h1 className="text-[24px] font-bold text-white/80">Your cart is empty</h1>
          <p className="mt-3 text-[15px] text-white/55">Add some plugins before checking out.</p>
          <Link href="/pricing" className="mt-6 inline-block rounded-xl bg-prism-cyan px-6 py-3 text-[14px] font-semibold text-[#14152E]">
            Browse Plugins
          </Link>
        </div>
      </div>
    );
  }

  // Processing animation
  if (step === 'processing') {
    return (
      <div className="pt-24">
        <div className="mx-auto max-w-lg px-6 py-32 text-center">
          <div className="mx-auto mb-8 h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-prism-cyan" />
          <h2 className="text-[22px] font-bold text-white/80">Processing your payment...</h2>
          <p className="mt-3 text-[15px] text-white/55">Please don&apos;t close this window.</p>
          <div className="mt-6 flex items-center justify-center gap-2 text-[13px] text-white/60">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secured by Stripe
          </div>
        </div>
      </div>
    );
  }

  // Success
  if (step === 'success') {
    return (
      <div className="pt-24">
        <div className="mx-auto max-w-lg px-6 py-32 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-prism-cyan/10">
            <svg className="h-10 w-10 text-prism-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-[28px] font-bold text-white/90">Payment Successful!</h2>
          <p className="mt-3 text-[16px] text-white/60">
            Thank you for your purchase. Your license key and download links have been sent to <strong className="text-white/70">{email || 'your email'}</strong>.
          </p>

          <div className="mt-8 rounded-2xl border border-white/[0.06] bg-[#14152E] p-6 text-left">
            <div className="flex items-center justify-between text-[14px]">
              <span className="text-white/55">Order number</span>
              <span className="font-mono text-white/60">PAL-{Math.random().toString(36).slice(2, 8).toUpperCase()}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[14px]">
              <span className="text-white/55">Amount charged</span>
              <span className="font-bold text-white/80">${total.toFixed(2)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[14px]">
              <span className="text-white/55">Payment method</span>
              <span className="text-white/60">**** {cardNumber.replace(/\s/g, '').slice(-4) || '4242'}</span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button className="w-full rounded-xl bg-prism-cyan py-3 text-[15px] font-bold text-[#14152E] transition hover:bg-prism-cyan/85">
              Download Plugins
            </button>
            <Link href="/" className="block text-[14px] text-white/55 transition hover:text-white/55">
              Return to homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Payment form
  return (
    <div className="pt-24">
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-2 text-[14px] text-white/65 mb-8">
            <Link href="/cart" className="transition hover:text-white/65">Cart</Link>
            <span>/</span>
            <span className="text-white/65">Checkout</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-5">
            {/* Payment Form */}
            <div className="lg:col-span-3">
              <h1 className="text-[28px] font-bold text-white/90 mb-8">Checkout</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="mb-2 block text-[13px] font-medium text-white/65">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="stripe-input w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[15px] text-white/90 placeholder:text-white/55 transition"
                  />
                  <p className="mt-1.5 text-[12px] text-white/60">License key and download link will be sent here</p>
                </div>

                {/* Card Section */}
                <div className="rounded-2xl border border-white/[0.06] bg-[#14152E] p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-white/70">Payment Details</h3>
                    <div className="flex items-center gap-2">
                      {/* Card brand icons */}
                      <div className="rounded bg-white/[0.06] px-2 py-1 text-[10px] font-bold text-white/65">VISA</div>
                      <div className="rounded bg-white/[0.06] px-2 py-1 text-[10px] font-bold text-white/65">MC</div>
                      <div className="rounded bg-white/[0.06] px-2 py-1 text-[10px] font-bold text-white/65">AMEX</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Card Number */}
                    <div>
                      <label className="mb-2 block text-[13px] font-medium text-white/55">Card number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="stripe-input w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[15px] font-mono text-white/90 placeholder:text-white/55 tracking-wider transition"
                      />
                    </div>

                    {/* Expiry + CVC */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-[13px] font-medium text-white/55">Expiry</label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          placeholder="MM / YY"
                          required
                          className="stripe-input w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[15px] font-mono text-white/90 placeholder:text-white/55 transition"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-[13px] font-medium text-white/55">CVC</label>
                        <input
                          type="text"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="123"
                          required
                          className="stripe-input w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[15px] font-mono text-white/90 placeholder:text-white/55 transition"
                        />
                      </div>
                    </div>

                    {/* Cardholder name */}
                    <div>
                      <label className="mb-2 block text-[13px] font-medium text-white/55">Cardholder name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name on card"
                        required
                        className="stripe-input w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[15px] text-white/90 placeholder:text-white/55 transition"
                      />
                    </div>

                    {/* Zip/Postal */}
                    <div>
                      <label className="mb-2 block text-[13px] font-medium text-white/55">ZIP / Postal code</label>
                      <input
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value.slice(0, 10))}
                        placeholder="10001"
                        className="stripe-input w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[15px] font-mono text-white/90 placeholder:text-white/55 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-prism-cyan py-4 text-[16px] font-bold text-[#14152E] transition hover:bg-prism-cyan/85"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Pay ${total.toFixed(2)}
                </button>

                {/* Stripe branding */}
                <div className="flex items-center justify-center gap-2 text-[12px] text-white/55">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
                  </svg>
                  Powered by Stripe — Secure 256-bit SSL encryption
                </div>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-28 rounded-2xl border border-white/[0.06] bg-[#14152E] p-6">
                <h3 className="mb-5 text-[16px] font-semibold text-white/70">Order Summary</h3>

                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-lg ${item.gradient ? `bg-gradient-to-br ${item.gradient}` : 'bg-prism-blue/20'}`} />
                        <div>
                          <span className="text-[13px] text-white/70">{item.name}</span>
                          <span className="block text-[11px] text-white/60">
                            {item.type === 'plugin' ? 'Plugin' : item.type === 'collection' ? 'Collection' : 'Suite'}
                          </span>
                        </div>
                      </div>
                      <span className="text-[14px] font-medium text-white/70">${item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/[0.06] pt-4 space-y-2">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-white/55">Subtotal</span>
                    <span className="text-white/60">${total.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-[14px]">
                      <span className="text-prism-cyan/50">Savings</span>
                      <span className="text-prism-cyan">-${savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[16px] font-bold pt-2 border-t border-white/[0.06]">
                    <span className="text-white/70">Total</span>
                    <span className="text-white">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="mt-6 space-y-3">
                  {[
                    'Instant download after purchase',
                    '30-day money-back guarantee',
                    'Lifetime free updates',
                    '2 computer activations',
                  ].map((g) => (
                    <div key={g} className="flex items-center gap-2 text-[12px] text-white/65">
                      <svg className="h-3.5 w-3.5 shrink-0 text-prism-cyan/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
