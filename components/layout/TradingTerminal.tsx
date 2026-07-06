"use client";

import { useState } from "react";
import { TopBar } from "./TopBar";
import { OrderBook } from "@components/orderbook/OrderBook";
import { ChartPanel } from "@components/chart/ChartPanel";
import { TradeForm } from "@components/trade/TradeForm";
import { AssetsPanel } from "@components/assets/AssetsPanel";
import { RecentTrades } from "@components/orderbook/RecentTrades";
import { OpenOrdersPanel } from "@components/trade/OpenOrdersPanel";
import clsx from "clsx";

type MobileTab = "chart" | "orderbook" | "trade";

interface Props {
  symbol: string;
}

export function TradingTerminal({ symbol }: Props) {
  const [activeTab, setActiveTab] = useState<MobileTab>("chart");

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-bg-primary">
      <TopBar symbol={symbol} />

      {/* ── Desktop Layout (md+) ── */}
      <div className="hidden md:flex flex-1 overflow-hidden min-h-0">

        {/* Left column: Order Book + Recent Trades */}
        <div className="flex flex-col w-[220px] shrink-0 border-r border-border-default overflow-hidden">
          {/* Order book takes ~60%, recent trades ~40% */}
          <div className="flex-[3] overflow-hidden min-h-0">
            <OrderBook symbol={symbol} />
          </div>
          <div className="flex-[2] border-t border-border-default overflow-hidden min-h-0">
            <RecentTrades symbol={symbol} />
          </div>
        </div>

        {/* Center + Right columns */}
        <div className="flex flex-col flex-1 overflow-hidden min-h-0">

          {/* Top row: Chart + Trade Form */}
          <div className="flex flex-1 overflow-hidden min-h-0">
            {/* Chart */}
            <div className="flex-1 overflow-hidden min-h-0">
              <ChartPanel symbol={symbol} />
            </div>
            {/* Trade Form */}
            <div className="w-[280px] shrink-0 border-l border-border-default overflow-y-auto">
              <TradeForm symbol={symbol} />
            </div>
          </div>

          {/* Bottom strip: Open Orders + Assets */}
          <div className="h-44 shrink-0 border-t border-border-default flex overflow-hidden min-h-0">
            <div className="flex-1 overflow-hidden min-h-0">
              <OpenOrdersPanel symbol={symbol} />
            </div>
            <div className="w-[280px] shrink-0 border-l border-border-default overflow-hidden min-h-0">
              <AssetsPanel />
            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile Layout (<md): Tabbed ── */}
      <div className="flex md:hidden flex-col flex-1 overflow-hidden">
        <div className="flex border-b border-border-default bg-bg-secondary shrink-0">
          {(["chart", "orderbook", "trade"] as MobileTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "flex-1 py-2 text-xs font-medium transition-colors",
                activeTab === tab
                  ? "text-brand-yellow border-b-2 border-brand-yellow"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              {tab === "orderbook" ? "Order Book" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-hidden">
          {activeTab === "chart" && <ChartPanel symbol={symbol} />}
          {activeTab === "orderbook" && (
            <div className="flex flex-col h-full overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <OrderBook symbol={symbol} />
              </div>
              <div className="h-1/2 border-t border-border-default overflow-hidden">
                <RecentTrades symbol={symbol} />
              </div>
            </div>
          )}
          {activeTab === "trade" && (
            <div className="flex flex-col h-full overflow-hidden">
              <div className="flex-1 overflow-y-auto">
                <TradeForm symbol={symbol} />
              </div>
              <div className="h-40 border-t border-border-default overflow-hidden shrink-0">
                <OpenOrdersPanel symbol={symbol} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
