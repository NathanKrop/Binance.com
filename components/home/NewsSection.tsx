const stories = [
  { title: "U.S. President Donald Trump Says Bitcoin Inclusion Is Possible for $1,000 Newborn Support Program", href: "#" },
  { title: "Canada Issues More Oil Drilling Permits as Alberta Targets Clearwater Play", href: "#" },
  { title: "WORLD CUP | Barcelona Relieved as Raphinha Not Risked in Brazil’s Round of 16 Loss vs Norway", href: "#" },
  { title: "Klarna applies to regulators to set up FDIC-backed U.S. bank subsidiary in Utah", href: "#" },
];

export function NewsSection() {
  return (
    <section className="mt-12 rounded-[2rem] border border-border-default bg-bg-secondary/90 p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-yellow">News</p>
          <h2 className="text-2xl font-semibold text-white">Latest market stories</h2>
          <p className="mt-3 text-text-secondary">Stay up to date with crypto headlines and market-moving news from around the world.</p>
        </div>
        <a href="#" className="inline-flex items-center rounded-full border border-border-default px-4 py-2 text-sm text-text-secondary transition hover:border-brand-yellow hover:text-text-primary">
          View All News
        </a>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stories.map((story) => (
          <a key={story.title} href={story.href} className="rounded-[1.75rem] border border-border-default bg-bg-primary/90 p-5 transition hover:border-brand-yellow hover:bg-bg-secondary">
            <p className="text-sm font-semibold text-white">{story.title}</p>
            <p className="mt-3 text-xs text-text-secondary">Read the latest updates and insights across crypto and markets.</p>
          </a>
        ))}
      </div>
    </section>
  );
}
