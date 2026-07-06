const platforms = [
  { name: "MacOS", href: "#" },
  { name: "Windows", href: "#" },
  { name: "Linux", href: "#" },
];

export function DownloadSection() {
  return (
    <section className="mt-12 rounded-[2rem] border border-border-default bg-bg-secondary/90 p-6">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_0.55fr] items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-yellow">Download</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Trade on the go. Anywhere, anytime.</h2>
          <p className="mt-4 max-w-2xl text-sm text-text-secondary">
            Download the Binance app or desktop client for secure trading anytime with fast markets and convenient access.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {platforms.map((platform) => (
              <a key={platform.name} href={platform.href} className="rounded-full border border-border-default px-5 py-3 text-sm text-text-secondary transition hover:border-brand-yellow hover:text-text-primary">
                {platform.name}
              </a>
            ))}
          </div>
          <a href="#" className="mt-6 inline-flex items-center rounded-full border border-border-default px-5 py-3 text-sm text-text-secondary transition hover:border-brand-yellow hover:text-text-primary">
            More Download Options
          </a>
        </div>
        <div className="rounded-[2rem] border border-border-default bg-bg-primary/80 p-6">
          <div className="aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-brand-yellow/20 via-transparent to-[#0B0E11]" />
        </div>
      </div>
    </section>
  );
}
