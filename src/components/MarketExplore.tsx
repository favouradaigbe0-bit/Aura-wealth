import React, { useState, useMemo } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { Asset, AssetClass } from '../types/investment';
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  SlidersHorizontal,
  Flame,
  CheckCircle,
  Eye,
  BarChart2
} from 'lucide-react';

export const MarketExplore: React.FC = () => {
  const { assets, openTrade, setSelectedAsset } = useInvestment();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'gainers' | 'marketCap' | 'rating' | 'alphabetical'>('gainers');

  const categories = [
    { id: 'ALL', label: 'All Markets' },
    { id: 'Equity', label: 'US Stocks' },
    { id: 'ETF', label: 'Index & Sector ETFs' },
    { id: 'Crypto', label: 'Crypto & Digital' },
    { id: 'Bond', label: 'Fixed Income' },
    { id: 'Commodity', label: 'Commodities' }
  ];

  const filteredAssets = useMemo(() => {
    return assets
      .filter(a => {
        const matchesSearch = 
          a.symbol.toLowerCase().includes(search.toLowerCase()) ||
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.sector.toLowerCase().includes(search.toLowerCase());
        const matchesCat = selectedCategory === 'ALL' || a.assetClass === selectedCategory;
        return matchesSearch && matchesCat;
      })
      .sort((a, b) => {
        if (sortBy === 'gainers') {
          return b.changePercent - a.changePercent;
        }
        if (sortBy === 'rating') {
          return b.analystRating.buy - a.analystRating.buy;
        }
        if (sortBy === 'alphabetical') {
          return a.symbol.localeCompare(b.symbol);
        }
        return 0;
      });
  }, [assets, search, selectedCategory, sortBy]);

  // Mini sparkline renderer
  const renderSparkline = (data: number[], isPositive: boolean) => {
    if (!data || data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const w = 110;
    const h = 36;

    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((val - min) / range) * (h - 8) - 4;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={w} height={h} className="overflow-visible">
        <polyline
          fill="none"
          stroke={isPositive ? '#10b981' : '#f43f5e'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Market Ticker Marquee & Indices Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-sm">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">S&P 500 Index</div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-base font-bold text-white font-mono">5,864.20</span>
            <span className="text-xs font-semibold text-emerald-400 font-mono">+0.74%</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-sm">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">NASDAQ 100</div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-base font-bold text-white font-mono">20,412.50</span>
            <span className="text-xs font-semibold text-emerald-400 font-mono">+1.28%</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-sm">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">US 10Y Treasury</div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-base font-bold text-white font-mono">4.24%</span>
            <span className="text-xs font-semibold text-rose-400 font-mono">-0.03%</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-sm">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Market Sentiment</div>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-base font-bold text-emerald-400 flex items-center space-x-1">
              <Flame className="w-4 h-4 text-emerald-400" />
              <span>71 Greed</span>
            </span>
            <span className="text-xs text-slate-400">Bullish Bias</span>
          </div>
        </div>
      </div>

      {/* Exploration Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stocks, ETFs, crypto (e.g. NVDA, VOO, BTC)..."
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold'
                  : 'bg-slate-950/40 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span className="hidden lg:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer font-medium"
          >
            <option value="gainers">Top Movers (%)</option>
            <option value="rating">Analyst Consensus</option>
            <option value="alphabetical">Symbol (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => {
          const isPositive = asset.change >= 0;
          const rangePercent = Math.min(
            100, 
            Math.max(0, ((asset.price - asset.low52w) / (asset.high52w - asset.low52w)) * 100)
          );

          return (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 p-5 backdrop-blur-md transition-all hover:shadow-xl hover:shadow-slate-950/50 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Row: Symbol, Class, Sparkline */}
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center font-mono font-bold text-sm text-white group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-colors shadow-sm">
                      {asset.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-white text-base font-mono tracking-tight group-hover:text-emerald-400 transition-colors">
                          {asset.symbol}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold bg-slate-800 text-slate-400 border border-slate-700/60">
                          {asset.assetClass}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 truncate max-w-[150px] block mt-0.5">
                        {asset.name}
                      </span>
                    </div>
                  </div>

                  {/* Sparkline */}
                  <div className="shrink-0 pt-1">
                    {renderSparkline(asset.sparkline, isPositive)}
                  </div>
                </div>

                {/* Price & Change */}
                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-black text-white font-mono tracking-tight">
                      ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${
                    isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    <span>{isPositive ? '+' : ''}{asset.changePercent}%</span>
                  </div>
                </div>

                {/* 52-Week Range Bar */}
                <div className="mt-4 pt-3 border-t border-slate-800/60">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>52W Low: ${asset.low52w.toFixed(2)}</span>
                    <span>High: ${asset.high52w.toFixed(2)}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
                    <div
                      style={{ width: `${rangePercent}%` }}
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                    />
                  </div>
                </div>

                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-3 gap-2 mt-3.5 text-[11px] font-mono">
                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800/60">
                    <div className="text-[10px] text-slate-400 uppercase">Cap</div>
                    <div className="font-semibold text-slate-200 mt-0.5">{asset.marketCap}</div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800/60">
                    <div className="text-[10px] text-slate-400 uppercase">P/E Ratio</div>
                    <div className="font-semibold text-slate-200 mt-0.5">{asset.peRatio ? `${asset.peRatio}x` : 'N/A'}</div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800/60">
                    <div className="text-[10px] text-slate-400 uppercase">Consensus</div>
                    <div className="font-semibold text-emerald-400 mt-0.5">{asset.analystRating.consensus}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => openTrade(asset, 'BUY')}
                  className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Trade {asset.symbol}</span>
                </button>

                <button
                  onClick={() => setSelectedAsset(asset)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-emerald-400 text-xs font-semibold transition-colors flex items-center space-x-1 cursor-pointer"
                  title="AI Intelligence & Deep Dive"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Deep Dive</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
