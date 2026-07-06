const faqs = [
  { question: "What makes Binance one of the world's leading cryptocurrency exchanges?", answer: "Binance offers deep liquidity, fast execution, and a wide range of crypto services backed by industry-leading security." },
  { question: "Where can I buy cryptocurrency?", answer: "You can buy crypto directly from the Binance app, web platform, or via our fiat on-ramp partners in supported regions." },
  { question: "How can I start cryptocurrency trading on Binance?", answer: "Register for an account, complete verification, deposit funds, then choose from spot, derivatives, or savings products." },
  { question: "Can I buy and trade cryptocurrency on the Binance app?", answer: "Yes, the Binance app supports buying, trading, staking, and asset management across mobile devices." },
];

export function FAQSection() {
  return (
    <section className="mt-12 rounded-[2rem] border border-border-default bg-bg-secondary/90 p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-yellow">FAQs</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Frequently Asked Questions</h2>
          <p className="mt-4 text-sm text-text-secondary">Find quick answers to common questions about Binance products, trading, and security.</p>
        </div>
        <div className="w-full lg:w-[45%] space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-border-default bg-bg-primary/80 p-5">
              <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
              <p className="mt-3 text-sm text-text-secondary">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
