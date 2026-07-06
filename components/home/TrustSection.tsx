const awards = [
  "Recognized as Forbes' Most Trusted Crypto Exchanges 2025",
  "Listed #1 in Fortune's FinTech Innovators Asia 2024 in Blockchain & Crypto",
  "Named CNBC's World's Top Fintech Companies 2025 in Digital Assets",
];

export function TrustSection() {
  return (
    <section className="mt-12 rounded-[2rem] border border-border-default bg-bg-secondary/90 p-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {awards.map((award) => (
          <div key={award} className="rounded-3xl border border-border-default bg-bg-primary/80 p-5">
            <p className="text-sm text-text-secondary">Award</p>
            <p className="mt-4 text-lg font-semibold text-white">{award}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
