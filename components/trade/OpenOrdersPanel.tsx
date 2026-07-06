"use client";

import { useState } from "react";
import { useOpenOrders } from "@hooks/useOpenOrders";
import clsx from "clsx";
import type { Order } from "@stores/useOpenOrdersStore";

type Tab = "open" | "history";

interface Props {
  symbol: string;
}

export function OpenOrdersPanel({ symbol }: Props) {
  const [tab, setTab] = useState<Tab>("open");
  const { openOrders, orderHistory, cancelOrder } = useOpenOrders(symbol);

  const rows = tab === "open" ? openOrders : orderHistory;

  return (
    <div className="flex flex-col h-full bg-bg-secondary text-xs">
      {/* Tab bar */}
      <div className="flex items-center border-b border-border-default shrink-0 px-2">
        {(["open", "history"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              "px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap",
              tab === t
                ? "text-text-primary border-b-2 border-brand-yellow"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {t === "open" ? `Open Orders (${openOrders.length})` : "Order History"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        {rows.length === 0 ? (
          <div className="flex items-center justify-center h-full text-text-muted text-xs">
            No orders
          </div>
        ) : (
          <table className="w-full">
            <thead className="sticky top-0 bg-bg-secondary">
              <tr className="text-text-muted text-2xs">
                <th className="text-left px-3 py-1 font-normal">Date</th>
                <th className="text-left px-3 py-1 font-normal">Pair</th>
                <th className="text-left px-3 py-1 font-normal">Type</th>
                <th className="text-left px-3 py-1 font-normal">Side</th>
                <th className="text-right px-3 py-1 font-normal">Price</th>
                <th className="text-right px-3 py-1 font-normal">Amount</th>
                <th className="text-right px-3 py-1 font-normal">Filled</th>
                <th className="text-right px-3 py-1 font-normal">Status</th>
                {tab === "open" && <th className="text-right px-3 py-1 font-normal">Action</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((order) => (
                <OrderRow
                  key={order.orderId}
                  order={order}
                  showCancel={tab === "open"}
                  onCancel={cancelOrder}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

interface RowProps {
  order: Order;
  showCancel: boolean;
  onCancel: (id: string) => void;
}

function OrderRow({ order, showCancel, onCancel }: RowProps) {
  const filledPct =
    parseFloat(order.origQty) > 0
      ? ((parseFloat(order.executedQty) / parseFloat(order.origQty)) * 100).toFixed(0)
      : "0";

  return (
    <tr className="hover:bg-bg-elevated transition-colors border-b border-border-subtle">
      <td className="px-3 py-1.5 text-text-secondary tabular-nums">
        {new Date(order.time).toLocaleString([], {
          month: "2-digit", day: "2-digit",
          hour: "2-digit", minute: "2-digit",
        })}
      </td>
      <td className="px-3 py-1.5 text-text-primary font-medium">{order.symbol}</td>
      <td className="px-3 py-1.5 text-text-secondary">{order.type}</td>
      <td className={clsx("px-3 py-1.5 font-medium", order.side === "BUY" ? "text-bull-green" : "text-bear-red")}>
        {order.side}
      </td>
      <td className="px-3 py-1.5 text-right font-mono text-text-primary tabular-nums">
        {parseFloat(order.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </td>
      <td className="px-3 py-1.5 text-right font-mono text-text-primary tabular-nums">
        {parseFloat(order.origQty).toFixed(6)}
      </td>
      <td className="px-3 py-1.5 text-right font-mono text-text-secondary tabular-nums">
        {filledPct}%
      </td>
      <td className={clsx("px-3 py-1.5 text-right", {
        "text-brand-yellow": order.status === "NEW",
        "text-bull-green": order.status === "FILLED",
        "text-text-muted": order.status === "CANCELED",
        "text-text-secondary": order.status === "PARTIALLY_FILLED",
      })}>
        {order.status}
      </td>
      {showCancel && (
        <td className="px-3 py-1.5 text-right">
          <button
            onClick={() => onCancel(order.orderId)}
            className="text-bear-red hover:text-red-400 transition-colors text-2xs"
          >
            Cancel
          </button>
        </td>
      )}
    </tr>
  );
}
