"use client";

import { useAssets } from "@hooks/useAssets";

export function AssetsPanel() {
  const { balances } = useAssets();

  return (
    <div className="flex flex-col h-full bg-bg-secondary text-xs">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border-default shrink-0">
        <span className="text-text-primary font-medium text-xs">Assets</span>
        <button className="text-2xs text-brand-yellow hover:text-brand-yellow-dim transition-colors">
          Deposit
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="text-text-muted text-2xs">
              <th className="text-left px-3 py-1 font-normal">Asset</th>
              <th className="text-right px-3 py-1 font-normal">Available</th>
              <th className="text-right px-3 py-1 font-normal">In Order</th>
              <th className="text-right px-3 py-1 font-normal">Total</th>
            </tr>
          </thead>
          <tbody>
            {balances.map((b) => {
              const total = (parseFloat(b.free) + parseFloat(b.locked)).toFixed(6);
              return (
                <tr key={b.asset} className="hover:bg-bg-elevated transition-colors">
                  <td className="px-3 py-1 text-text-primary font-medium">{b.asset}</td>
                  <td className="px-3 py-1 text-right font-mono text-text-primary tabular-nums">
                    {parseFloat(b.free).toFixed(6)}
                  </td>
                  <td className="px-3 py-1 text-right font-mono text-text-secondary tabular-nums">
                    {parseFloat(b.locked).toFixed(6)}
                  </td>
                  <td className="px-3 py-1 text-right font-mono text-text-primary tabular-nums">
                    {total}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
