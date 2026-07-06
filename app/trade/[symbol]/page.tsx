import { TradingTerminal } from "@components/layout/TradingTerminal";

interface Props {
  params: Promise<{ symbol: string }>;
}

export default async function TradePage({ params }: Props) {
  const { symbol } = await params;
  return <TradingTerminal symbol={symbol.toUpperCase()} />;
}

export function generateStaticParams() {
  return [{ symbol: "BTCUSDT" }, { symbol: "ETHUSDT" }, { symbol: "BNBUSDT" }];
}
