export function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-secondary/80 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-yellow">Binance</p>
            <p className="text-sm text-text-secondary">Buy, sell, and trade crypto with the most trusted exchange platform.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-text-secondary">
              <span className="rounded-full border border-border-default px-3 py-2">Community</span>
              <span className="rounded-full border border-border-default px-3 py-2">English</span>
              <span className="rounded-full border border-border-default px-3 py-2">USD-$</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Products</p>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-text-primary">Spot</a></li>
              <li><a href="#" className="hover:text-text-primary">Derivatives</a></li>
              <li><a href="#" className="hover:text-text-primary">Earn</a></li>
              <li><a href="#" className="hover:text-text-primary">Wallet</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Support</p>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-text-primary">API Docs</a></li>
              <li><a href="#" className="hover:text-text-primary">Announcements</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Community</p>
            <div className="mt-4 grid gap-3 text-sm text-text-secondary">
              <a href="#" className="hover:text-text-primary">Discord</a>
              <a href="#" className="hover:text-text-primary">Twitter</a>
              <a href="#" className="hover:text-text-primary">Instagram</a>
              <a href="#" className="hover:text-text-primary">YouTube</a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border-default pt-6 text-sm text-text-secondary">
          <p>© 2026 Binance Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
