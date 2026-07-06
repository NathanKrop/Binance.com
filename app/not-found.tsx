import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bg-primary gap-4">
      <span className="text-brand-yellow text-4xl font-bold">404</span>
      <p className="text-text-secondary text-sm">Trading pair not found.</p>
      <Link
        href="/trade/BTCUSDT"
        className="text-xs bg-brand-yellow text-bg-primary px-4 py-2 rounded font-semibold hover:bg-brand-yellow-dim transition-colors"
      >
        Go to BTC/USDT
      </Link>
    </div>
  );
}
