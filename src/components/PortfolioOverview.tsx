import React, { useState, useMemo } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { PERFORMANCE_TIMEFRAMES } from '../data/mockData';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  Wallet, 
  Layers,
  ChevronRight,
  SlidersHorizontal,
  Coins
} from 'lucide-react';

export const PortfolioOverview: React.FC = () => {
  const { 
    totalNetWorth, 
    portfolioValue, 
    cashBalance, 
    hysaApy,
    dayChange, 
    dayChangePercent, 
    totalGainLoss, 
    totalGainLossPercent,
    holdings,
    setIsTradeModalOpen,
    setIsTransferModalOpen,
    setIsAuditModalOpen,
    setIsBtcWalletModalOpen,
    rebalancePortfolio
  } = useInvestment();

  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1M');
  const [showBenchmark, setShowBenchmark] = useState<boolean>(true);
  const [hoveredPoint, setHoveredPoint] = useState<{ date: string; value: number; benchmark: number } | null>(null);
  const [rebalanceToast, setRebalanceToast] = useState<string | null>(null);

  const historyData = PERFORMANCE_TIMEFRAMES[selectedTimeframe];

  // SVG Chart Dimensions & Scalers
  const chartHeight = 220;
  const chartWidth = 720;
  const paddingX = 20;
  const paddingTop = 25;
  const paddingBottom = 30;

  const { minVal, maxVal, points, benchmarkPoints } = useMemo(() => {
    const allValues = historyData.map(d => d.value).concat(showBenchmark ? historyData.map(d => d.benchmark) : []);
    const min = Math.min(...allValues) * 0.995;
    const max = Math.max(...allValues) * 1.005;
    const range = max - min || 1;

    const pts = historyData.map((d, i) => {
      const x = paddingX + (i / (historyData.length - 1)) * (chartWidth - paddingX * 2);
      const y = paddingTop + (1 - (d.value - min) / range) * (chartHeight - paddingTop - paddingBottom);
      return { x, y, ...d };
    });

    const bPts = historyData.map((d, i) => {
      const x = paddingX + (i / (historyData.length - 1)) * (chartWidth - paddingX * 2);
      const y = paddingTop + (1 - (d.benchmark - min) / range) * (chartHeight - paddingTop - paddingBottom);
      return { x, y, ...d };
    });

    return { minVal: min, maxVal: max, points: pts, benchmarkPoints: bPts };
  }, [historyData, showBenchmark]);

  // Construct SVG Path
  const linePath = useMemo(() => {
    if (points.length === 0) return '';
    return points.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, '');
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const first = points[0];
    const last = points[points.length - 1];
    return `${linePath} L ${last.x} ${chartHeight - paddingBottom} L ${first.x} ${chartHeight - paddingBottom} Z`;
  }, [linePath, points]);

  const benchmarkPath = useMemo(() => {
    if (benchmarkPoints.length === 0) return '';
    return benchmarkPoints.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, '');
  }, [benchmarkPoints]);

  // Asset class breakdown
  const assetDistribution = useMemo(() => {
    const total = totalNetWorth || 1;
    let equities = 0;
    let etfs = 0;
    let crypto = 0;
    let bonds = 0;
    let commodities = 0;

    holdings.forEach(h => {
      if (h.assetClass === 'Equity') equities += h.totalValue;
      else if (h.assetClass === 'ETF') etfs += h.totalValue;
      else if (h.assetClass === 'Crypto') crypto += h.totalValue;
      else if (h.assetClass === 'Bond') bonds += h.totalValue;
      else if (h.assetClass === 'Commodity') commodities += h.totalValue;
    });

    return [
      { label: 'Equities', amount: equities, percent: +((equities / total) * 100).toFixed(1), color: 'bg-emerald-500' },
      { label: 'ETFs', amount: etfs, percent: +((etfs / total) * 100).toFixed(1), color: 'bg-cyan-500' },
      { label: 'Crypto', amount: crypto, percent: +((crypto / total) * 100).toFixed(1), color: 'bg-amber-500' },
      { label: 'Bonds', amount: bonds, percent: +((bonds / total) * 100).toFixed(1), color: 'bg-indigo-500' },
      { label: 'Commodities', amount: commodities, percent: +((commodities / total) * 100).toFixed(1), color: 'bg-rose-500' },
      { label: 'Cash Sweep (4.85%)', amount: cashBalance, percent: +((cashBalance / total) * 100).toFixed(1), color: 'bg-teal-400' }
    ];
  }, [holdings, totalNetWorth, cashBalance]);

  const handleRebalance = () => {
    const res = rebalancePortfolio();
    setRebalanceToast(res.message);
    setTimeout(() => setRebalanceToast(null), 5000);
  };

  const isDayPositive = dayChange >= 0;
  const isTotalPositive = totalGainLoss >= 0;

  const activeDisplayValue = hoveredPoint ? hoveredPoint.value : totalNetWorth;
  const activeDisplayDate = hoveredPoint ? hoveredPoint.date : 'Current Net Worth';

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {rebalanceToast && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between animate-fade-in shadow-lg">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{rebalanceToast}</span>
          </div>
          <button onClick={() => setRebalanceToast(null)} className="text-emerald-400 hover:text-white font-mono text-sm">✕</button>
        </div>
      )}

      {/* Main Net Worth & Performance Card */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800 p-6 backdrop-blur-md shadow-xl relative overflow-hidden">
        {/* Glow ambient background effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 relative z-10">
          {/* Net Worth Metrics */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-slate-400">
              <span>{activeDisplayDate}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="flex items-baseline space-x-3 mt-1.5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-mono">
                ${activeDisplayValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h1>
            </div>

            {/* Performance Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mt-3">
              {/* Day Change */}
              <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold font-mono ${
                isDayPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {isDayPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                <span>
                  {isDayPositive ? '+' : ''}${Math.abs(dayChange).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({isDayPositive ? '+' : ''}{dayChangePercent}%)
                </span>
                <span className="text-slate-400 font-sans font-normal ml-0.5">Today</span>
              </div>

              {/* All-time Gain */}
              <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold font-mono ${
                isTotalPositive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-slate-800 text-slate-300'
              }`}>
                <span>Total Return:</span>
                <span>{isTotalPositive ? '+' : ''}${totalGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })} ({isTotalPositive ? '+' : ''}{totalGainLossPercent}%)</span>
              </div>

              {/* Cash Sweep Available (Actual Liquid Balance) */}
              <div 
                onClick={() => setIsTransferModalOpen(true)}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/40 text-xs text-slate-300 cursor-pointer transition-colors"
                title="Actual liquid deposited funds available for withdrawal or trade"
              >
                <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Actual Liquid Cash:</span>
                <span className="font-mono font-semibold text-white">${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">(Verified)</span>
              </div>
            </div>
          </div>

          {/* Action Button Ribbon */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsTradeModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center space-x-1.5 cursor-pointer"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Quick Trade</span>
            </button>

            <button
              onClick={() => setIsTransferModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Coins className="w-4 h-4 text-amber-400" />
              <span>Crypto Spot Deposit</span>
            </button>

            <button
              onClick={() => setIsBtcWalletModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-semibold text-xs sm:text-sm transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm shadow-amber-500/10 active:scale-95"
              title="View dedicated Bitcoin (BTC) deposit address & QR code"
            >
              <span className="font-mono font-bold text-xs">₿</span>
              <span>BTC Address</span>
            </button>

            <button
              onClick={handleRebalance}
              title="Align portfolio to institutional model allocation"
              className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white font-medium text-xs sm:text-sm transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">1-Click</span> Rebalance
            </button>

            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-950/60 to-cyan-950/60 hover:from-emerald-900/60 hover:to-cyan-900/60 border border-emerald-500/30 text-emerald-300 font-medium text-xs sm:text-sm transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Audit</span>
            </button>
          </div>
        </div>

        {/* Chart Header & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-800/60">
          {/* Timeframe Toggles */}
          <div className="flex items-center bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                  selectedTimeframe === tf
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Benchmark comparison pill */}
          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={() => setShowBenchmark(!showBenchmark)}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                showBenchmark
                  ? 'bg-slate-800/80 border-slate-600 text-slate-200'
                  : 'bg-slate-950/40 border-slate-800 text-slate-500'
              }`}
            >
              <div className={`w-2.5 h-1 rounded-full ${showBenchmark ? 'bg-amber-400' : 'bg-slate-600'}`} />
              <span className="font-mono">S&P 500 Benchmark</span>
            </button>
            <div className="flex items-center space-x-1.5 text-slate-400">
              <div className="w-2.5 h-1 rounded-full bg-emerald-400" />
              <span>Aura Portfolio</span>
            </div>
          </div>
        </div>

        {/* SVG Interactive Performance Chart */}
        <div 
          className="relative w-full mt-4 select-none"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-48 sm:h-56 overflow-visible"
          >
            <defs>
              <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1={paddingX} y1={paddingTop} x2={chartWidth - paddingX} y2={paddingTop} stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
            <line x1={paddingX} y1={chartHeight / 2} x2={chartWidth - paddingX} y2={chartHeight / 2} stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
            <line x1={paddingX} y1={chartHeight - paddingBottom} x2={chartWidth - paddingX} y2={chartHeight - paddingBottom} stroke="#334155" strokeWidth="1" />

            {/* Benchmark Path (S&P 500) */}
            {showBenchmark && (
              <path
                d={benchmarkPath}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.8"
                strokeDasharray="4 3"
                opacity="0.75"
              />
            )}

            {/* Area Fill */}
            <path
              d={areaPath}
              fill="url(#emeraldGradient)"
            />

            {/* Primary Portfolio Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Hover Points & Scrubbing */}
            {points.map((pt, i) => (
              <g key={i}>
                {/* Invisible hit targets */}
                <rect
                  x={pt.x - (chartWidth / points.length) / 2}
                  y={0}
                  width={chartWidth / points.length}
                  height={chartHeight}
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => setHoveredPoint(pt)}
                />
              </g>
            ))}

            {/* Active Crosshair */}
            {hoveredPoint && (
              <g>
                <line
                  x1={points.find(p => p.date === hoveredPoint.date)?.x || 0}
                  y1={paddingTop}
                  x2={points.find(p => p.date === hoveredPoint.date)?.x || 0}
                  y2={chartHeight - paddingBottom}
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
                <circle
                  cx={points.find(p => p.date === hoveredPoint.date)?.x || 0}
                  cy={points.find(p => p.date === hoveredPoint.date)?.y || 0}
                  r="5"
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </g>
            )}

            {/* X-axis date labels */}
            {points.map((pt, i) => {
              // Show evenly spaced labels
              if (i % Math.ceil(points.length / 5) === 0 || i === points.length - 1) {
                return (
                  <text
                    key={i}
                    x={pt.x}
                    y={chartHeight - 10}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {pt.date}
                  </text>
                );
              }
              return null;
            })}
          </svg>
        </div>
      </div>

      {/* Asset Allocation Breakdown Banner */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Asset Allocation & Capital Deployment
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Target Balanced Growth Model
          </span>
        </div>

        {/* Horizontal Stacked Bar */}
        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
          {assetDistribution.map((item, idx) => (
            <div
              key={idx}
              style={{ width: `${item.percent}%` }}
              className={`${item.color} h-full transition-all duration-500 hover:opacity-85 cursor-pointer relative group`}
              title={`${item.label}: ${item.percent}% ($${item.amount.toLocaleString()})`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
          {assetDistribution.map((item, idx) => (
            <div key={idx} className="flex flex-col p-2 rounded-lg bg-slate-950/40 border border-slate-800/60">
              <div className="flex items-center space-x-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                <span className="text-xs font-medium text-slate-300 truncate">{item.label}</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-xs font-mono font-bold text-white">{item.percent}%</span>
                <span className="text-[11px] font-mono text-slate-400">${Math.round(item.amount).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
