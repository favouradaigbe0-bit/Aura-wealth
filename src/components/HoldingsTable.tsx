import React, { useState, useMemo } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { Holding, AssetClass } from '../types/investment';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Sparkles, 
  TrendingUp, 
  ArrowUpDown,
  Filter,
  Eye
} from 'lucide-react';

export const HoldingsTable: React.FC = () => {
  const { holdings, assets, openTrade, setSelectedAsset, setIsBtcWalletModalOpen } = useInvestment();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'totalValue' | 'gainLoss' | 'symbol'>('totalValue');
  const [sortAsc, setSortAsc] = useState(false);

  const filteredHoldings = useMemo(() => {
    return holdings
      .filter(h => {
        const matchesQuery = 
          h.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.assetName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesClass = selectedClass === 'ALL' || h.assetClass === selectedClass;
        return matchesQuery && matchesClass;
      })
      .sort((a, b) => {
        let valA = a.totalValue;
        let valB = b.totalValue;

        if (sortField === 'gainLoss') {
          valA = a.totalGainLossPercent;
          valB = b.totalGainLossPercent;
        } else if (sortField === 'symbol') {
          return sortAsc ? a.symbol.localeCompare(b.symbol) : b.symbol.localeCompare(a.symbol);
        }

        return sortAsc ? valA - valB : valB - valA;
      });
  }, [holdings, searchQuery, selectedClass, sortField, sortAsc]);

  const handleInspect = (symbol: string) => {
    const asset = assets.find(a => a.symbol === symbol);
    if (asset) {
      setSelectedAsset(asset);
    }
  };

  const handleTrade = (symbol: string) => {
    const asset = assets.find(a => a.symbol === symbol);
    if (asset) {
      openTrade(asset, 'BUY');
    }
  };

  return (
    <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-5 backdrop-blur-md shadow-xl">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <span>Portfolio Positions</span>
            <span className="text-xs font-mono font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
              {holdings.length} Assets
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Real-time valuation, cost-basis accounting, and position metrics</p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search holding..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950/70 border border-slate-800 focus:border-emerald-500 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors w-40 sm:w-48 font-mono"
            />
          </div>

          {/* Asset Class Filter */}
          <div className="flex items-center bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs">
            {['ALL', 'Equity', 'ETF', 'Crypto', 'Bond'].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedClass === cls
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cls === 'ALL' ? 'All' : cls}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800/80 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="pb-3 pl-2">Asset</th>
              <th className="pb-3 text-right">Shares</th>
              <th className="pb-3 text-right">Avg Cost / Price</th>
              <th className="pb-3 text-right">24h Change</th>
              <th 
                className="pb-3 text-right cursor-pointer hover:text-white"
                onClick={() => {
                  setSortField('gainLoss');
                  setSortAsc(!sortAsc);
                }}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Total Return</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="pb-3 text-right cursor-pointer hover:text-white"
                onClick={() => {
                  setSortField('totalValue');
                  setSortAsc(!sortAsc);
                }}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Market Value</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="pb-3 text-center pr-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredHoldings.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500 font-mono">
                  No matching holdings found.
                </td>
              </tr>
            ) : (
              filteredHoldings.map((h) => {
                const liveAsset = assets.find(a => a.symbol === h.symbol);
                const isDayPositive = (liveAsset?.change || 0) >= 0;
                const isGainPositive = h.totalGainLoss >= 0;

                return (
                  <tr 
                    key={h.id}
                    className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                    onClick={() => handleInspect(h.symbol)}
                  >
                    {/* Asset Symbol & Name */}
                    <td className="py-3.5 pl-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-white group-hover:border-emerald-500/50 transition-colors">
                          {h.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="font-bold text-white text-sm font-mono tracking-tight">{h.symbol}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-slate-800 text-slate-400 border border-slate-700/60">
                              {h.assetClass}
                            </span>
                          </div>
                          <span className="text-slate-400 text-xs truncate max-w-[140px] sm:max-w-[200px] block">
                            {h.assetName}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Shares */}
                    <td className="py-3.5 text-right font-mono font-medium text-slate-200">
                      {h.shares < 1 ? h.shares.toFixed(4) : h.shares.toLocaleString()}
                    </td>

                    {/* Avg Cost vs Current Price */}
                    <td className="py-3.5 text-right font-mono">
                      <div className="text-white font-medium">
                        ${h.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Cost: ${h.avgCostPrice.toFixed(2)}
                      </div>
                    </td>

                    {/* 24h Change */}
                    <td className="py-3.5 text-right font-mono">
                      <span className={`inline-flex items-center space-x-0.5 px-1.5 py-0.5 rounded text-xs font-semibold ${
                        isDayPositive ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                      }`}>
                        {isDayPositive ? '+' : ''}{liveAsset?.changePercent ?? 0}%
                      </span>
                    </td>

                    {/* Total Gain / Loss */}
                    <td className="py-3.5 text-right font-mono">
                      <div className={`font-semibold ${isGainPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isGainPositive ? '+' : ''}${h.totalGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                      <div className={`text-[11px] ${isGainPositive ? 'text-emerald-500/80' : 'text-rose-500/80'}`}>
                        {isGainPositive ? '+' : ''}{h.totalGainLossPercent}%
                      </div>
                    </td>

                    {/* Total Value */}
                    <td className="py-3.5 text-right font-mono font-bold text-white text-sm">
                      ${h.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 text-center pr-2" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center space-x-1.5">
                        {h.symbol === 'BTC' && (
                          <button
                            onClick={() => setIsBtcWalletModalOpen(true)}
                            title="View Bitcoin Deposit Wallet Address & QR Code"
                            className="px-2 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-mono text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1"
                          >
                            <span>₿</span>
                            <span className="hidden sm:inline">Address</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleTrade(h.symbol)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-semibold text-xs border border-emerald-500/20 transition-all cursor-pointer"
                        >
                          Trade
                        </button>
                        <button
                          onClick={() => handleInspect(h.symbol)}
                          title="AI Deep Dive"
                          className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-slate-700 transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
