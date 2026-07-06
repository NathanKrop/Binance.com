const safuStats = [
  { label: "SAFU Reserve", value: "15,000 BTC", detail: "As of February 2026" },
  { label: "Users helped", value: "7,488,223", detail: "Recoveries supported" },
  { label: "Funds recovered", value: "$229,433,449", detail: "Real user reimbursements" },
];

export function SafuSection() {
  return (
    <section className="mt-12 rounded-[2rem] border border-border-default bg-bg-secondary/90 p-6">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-yellow">Funds ARESAFU</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Your funds are protected with SAFU.</h2>
          <p className="mt-4 max-w-2xl text-sm text-text-secondary">
            The Security Asset Fund for Users (SAFU) was established in 2018 to protect user assets in rare emergency situations.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {safuStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-border-default bg-bg-primary/80 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">{stat.label}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-text-secondary">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-border-default bg-bg-primary/80 p-6 text-sm text-text-secondary">
          <p className="uppercase tracking-[0.3em] text-brand-yellow">Proof of reserve</p>
          <p className="mt-4 text-white">Verified wallet address</p>
          <a href="https://www.blockchain.com/explorer/addresses/btc/1BAuq7Vho2CEkVkUxbfU26LhwQjbCmWQkD" className="mt-4 block rounded-2xl border border-border-default bg-bg-secondary/90 px-4 py-3 text-sm text-brand-yellow transition hover:border-brand-yellow-dim hover:bg-bg-secondary">
            View Wallet on Blockchain Explorer
          </a>
        </div>
      </div>
    </section>
  );
}
