"use client";

import { useEffect, useRef, useState } from "react";
import { createChart, ColorType, CrosshairMode } from "lightweight-charts";
import { useKlines } from "@hooks/useKlines";
import clsx from "clsx";

type Interval = "1m" | "5m" | "15m" | "1h" | "4h" | "1D";
const INTERVALS: Interval[] = ["1m", "5m", "15m", "1h", "4h", "1D"];

interface Props {
  symbol: string;
}

export function ChartPanel({ symbol }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [interval, setInterval] = useState<Interval>("1h");
  const { candles } = useKlines(symbol, interval);

  useEffect(() => {
    if (!containerRef.current || candles.length === 0) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#0B0E11" },
        textColor: "#848E9C",
      },
      grid: {
        vertLines: { color: "#1E2329" },
        horzLines: { color: "#1E2329" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: "#2B3139" },
      timeScale: { borderColor: "#2B3139", timeVisible: true, secondsVisible: false },
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#0ECB81",
      downColor: "#F6465D",
      borderUpColor: "#0ECB81",
      borderDownColor: "#F6465D",
      wickUpColor: "#0ECB81",
      wickDownColor: "#F6465D",
    });

    candleSeries.setData(candles);
    chart.timeScale().fitContent();

    const ro = new ResizeObserver(() => {
      if (containerRef.current) {
        chart.applyOptions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      chart.remove();
    };
  }, [candles]);

  return (
    <div className="flex flex-col h-full bg-bg-primary">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-secondary border-b border-border-default shrink-0">
        {INTERVALS.map((tf) => (
          <button
            key={tf}
            onClick={() => setInterval(tf)}
            className={clsx(
              "text-xs px-1.5 py-0.5 rounded transition-colors",
              interval === tf
                ? "text-brand-yellow bg-bg-elevated"
                : "text-text-secondary hover:text-brand-yellow"
            )}
          >
            {tf}
          </button>
        ))}
        <div className="w-px h-3 bg-border-default mx-1" />
        <button className="text-xs text-text-secondary hover:text-text-primary transition-colors">
          Indicators
        </button>
      </div>
      <div ref={containerRef} className="flex-1 w-full" />
    </div>
  );
}
