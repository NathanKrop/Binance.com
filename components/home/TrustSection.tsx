const awards = [
  { label: "Forbes' Most Trusted Crypto Exchanges 2025" },
  { label: "Fortune FinTech Innovators Asia 2024" },
  { label: "CNBC World's Top Fintech Companies 2025" },
];

export function TrustSection() {
  return (
    <section className="mt-12 rounded-[2rem] border border-border-default bg-bg-secondary/90 p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-yellow">Recognized worldwide</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Award-winning security and trust.</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {awards.map((award) => (
            <div key={award.label} className="rounded-3xl border border-border-default bg-bg-primary/80 px-4 py-3 text-sm text-text-secondary">
              {award.label}
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-border-default bg-bg-primary/80 p-5">
          <p className="text-sm uppercase tracking-[0.3em] text-text-secondary">Award</p>
          <p className="mt-4 text-lg font-semibold text-white">Industry recognition for security and innovation.</p>
        </div>
        <div className="rounded-3xl border border-border-default bg-bg-primary/80 p-5">
          <p className="text-sm uppercase tracking-[0.3em] text-text-secondary">Trust</p>
          <p className="mt-4 text-lg font-semibold text-white">Trusted by millions worldwide with billions in volume.</p>
        </div>
        <div className="rounded-3xl border border-border-default bg-bg-primary/80 p-5">
          <p className="text-sm uppercase tracking-[0.3em] text-text-secondary">Security</p>
          <p className="mt-4 text-lg font-semibold text-white">Market-leading protection and reserve transparency.</p>
        </div>
      </div>
    </section>
  );
}
