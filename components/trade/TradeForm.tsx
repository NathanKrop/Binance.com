"use client";

import { useTradeForm } from "@hooks/useTradeForm";
import clsx from "clsx";

interface Props {
  symbol: string;
}

export function TradeForm({ symbol }: Props) {
  const {
    side, setSide,
    orderType, setOrderType,
    price, setPrice,
    amount, setAmount,
    stopPrice, setStopPrice,
    ticker,
    quoteBalance, baseBalance,
    baseAsset, quoteAsset,
    total,
    fillByPercent,
    submit,
  } = useTradeForm(symbol);

  return (
    <div className="flex flex-col bg-bg-secondary h-full p-3 gap-3">
      {/* Buy / Sell toggle */}
      <div className="flex rounded overflow-hidden border border-border-default">
        <button
          onClick={() => setSide("buy")}
          className={clsx(
            "flex-1 py-1.5 text-xs font-semibold transition-colors",
            side === "buy" ? "bg-bull-green text-bg-primary" : "text-text-secondary hover:text-bull-green"
          )}
        >
          Buy
        </button>
        <button
          onClick={() => setSide("sell")}
          className={clsx(
            "flex-1 py-1.5 text-xs font-semibold transition-colors",
            side === "sell" ? "bg-bear-red text-white" : "text-text-secondary hover:text-bear-red"
          )}
        >
          Sell
        </button>
      </div>

      {/* Order type selector */}
      <div className="flex gap-1">
        {(["Limit", "Market", "Stop-Limit"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setOrderType(t)}
            className={clsx(
              "text-2xs px-2 py-1 rounded transition-colors",
              orderType === t ? "text-text-primary bg-bg-elevated" : "text-text-muted hover:text-text-secondary"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Available balance */}
      <div className="flex justify-between text-2xs text-text-secondary">
        <span>Avbl</span>
        <span className="font-mono text-text-primary">
          {side === "buy"
            ? `${parseFloat(quoteBalance?.free ?? "0").toFixed(2)} ${quoteAsset}`
            : `${parseFloat(baseBalance?.free ?? "0").toFixed(6)} ${baseAsset}`}
        </span>
      </div>

      {/* Stop price — Stop-Limit only */}
      {orderType === "Stop-Limit" && (
        <InputField
          label="Stop"
          value={stopPrice}
          onChange={setStopPrice}
          suffix="USDT"
          placeholder={ticker?.lastPrice ?? "0.00"}
        />
      )}

      {/* Price input */}
      {orderType !== "Market" ? (
        <InputField
          label="Price"
          value={price}
          onChange={setPrice}
          suffix="USDT"
          placeholder={ticker?.lastPrice ?? "0.00"}
        />
      ) : (
        <div className="flex items-center justify-between border border-border-default rounded px-2 py-1.5 bg-bg-tertiary">
          <span className="text-2xs text-text-muted">Price</span>
          <span className="text-2xs text-text-secondary">Market Price</span>
        </div>
      )}

      {/* Amount input */}
      <InputField
        label="Amount"
        value={amount}
        onChange={setAmount}
        suffix={baseAsset}
        placeholder="0.00000"
      />

      {/* Percentage quick-fill */}
      <div className="flex gap-1">
        {[25, 50, 75, 100].map((pct) => (
          <button
            key={pct}
            onClick={() => fillByPercent(pct)}
            className="flex-1 text-2xs py-0.5 border border-border-default rounded text-text-muted hover:border-brand-yellow hover:text-brand-yellow transition-colors"
          >
            {pct}%
          </button>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between text-2xs text-text-secondary">
        <span>Total</span>
        <span className="font-mono text-text-primary">{total ? `≈ ${total} USDT` : "—"}</span>
      </div>

      {/* Submit */}
      <button
        onClick={submit}
        className={clsx(
          "w-full py-2 rounded text-xs font-semibold transition-colors mt-auto",
          side === "buy"
            ? "bg-bull-green hover:bg-emerald-500 text-bg-primary"
            : "bg-bear-red hover:bg-rose-500 text-white"
        )}
      >
        {side === "buy" ? `Buy ${baseAsset}` : `Sell ${baseAsset}`}
      </button>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix: string;
  placeholder?: string;
}

function InputField({ label, value, onChange, suffix, placeholder }: InputFieldProps) {
  return (
    <div className="flex items-center border border-border-default rounded px-2 py-1.5 bg-bg-tertiary focus-within:border-brand-yellow transition-colors gap-2">
      <span className="text-2xs text-text-muted shrink-0">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "0"}
        className="flex-1 bg-transparent text-xs text-text-primary font-mono text-right outline-none placeholder:text-text-muted tabular-nums"
      />
      <span className="text-2xs text-text-secondary shrink-0">{suffix}</span>
    </div>
  );
}
