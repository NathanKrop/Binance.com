export function BottomCta() {
  return (
    <section className="mt-12 rounded-[2rem] border border-border-default bg-gradient-to-r from-[#0D1015] via-[#121720] to-[#0D1015] p-8 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-brand-yellow">Ready to trade?</p>
      <h2 className="mt-4 text-3xl font-semibold text-white">Secure, low-fee trading on Binance.</h2>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button className="rounded-full bg-brand-yellow px-7 py-3 text-sm font-semibold text-bg-primary transition hover:bg-brand-yellow-dim">
          Sign Up Now
        </button>
        <button className="rounded-full border border-border-default px-7 py-3 text-sm text-text-secondary transition hover:border-brand-yellow hover:text-text-primary">
          Learn More
        </button>
      </div>
    </section>
  );
}
