import React, { useState, useEffect } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { Asset, AIStockAnalysis } from '../types/investment';
import { 
  X, 
  Sparkles, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck, 
  Target, 
  BarChart3, 
  Clock, 
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  RefreshCw,
  Copy,
  Check,
  Coins
} from 'lucide-react';

export const AssetDetailModal: React.FC = () => {
  const { 
    selectedAsset, 
    setSelectedAsset, 
    openTrade, 
    fetchAIStockAnalysis,
    cryptoAddresses,
    setIsBtcWalletModalOpen
  } = useInvestment();
  const [activeTab, setActiveTab] = useState<'overview' | 'ai'>('overview');
  const [analysis, setAnalysis] = useState<AIStockAnalysis | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  useEffect(() => {
    if (selectedAsset) {
      setAnalysis(null);
      // Auto-fetch AI analysis when opened
      loadAI(selectedAsset);
    }
  }, [selectedAsset]);

  const loadAI = async (asset: Asset) => {
    setIsLoadingAI(true);
    const result = await fetchAIStockAnalysis(asset);
    setAnalysis(result);
    setIsLoadingAI(false);
  };

  if (!selectedAsset) return null;

  const isPositive = selectedAsset.change >= 0;
  const rating = selectedAsset.analystRating;
  const targetUpside = ((rating.targetPrice - selectedAsset.price) / selectedAsset.price) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-8 relative">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-gradient-to-r from-slate-900 to-slate-800/60">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-lg text-white shadow-md">
              {selectedAsset.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-extrabold text-white font-mono">{selectedAsset.symbol}</h2>
                <span className="text-[11px] px-2 py-0.5 rounded-md font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {selectedAsset.assetClass}
                </span>
                <span className="text-xs text-slate-400">
                  {selectedAsset.sector}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-0.5">{selectedAsset.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-2xl font-black text-white font-mono">
                ${selectedAsset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className={`flex items-center justify-end space-x-1 text-xs font-mono font-bold ${
                isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                <span>{isPositive ? '+' : ''}{selectedAsset.change.toFixed(2)} ({isPositive ? '+' : ''}{selectedAsset.changePercent}%)</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedAsset(null)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="flex border-b border-slate-800 bg-slate-950 px-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'border-emerald-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview & Key Statistics
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'ai'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gemini AI Intelligence</span>
            {analysis && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                {analysis.targetAction}
              </span>
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
          {activeTab === 'overview' ? (
            <>
              {/* Bitcoin Wallet Address Spotlight Card (when inspecting BTC) */}
              {selectedAsset.symbol === 'BTC' && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold flex items-center justify-center font-mono text-sm shadow-sm">
                        ₿
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs">Your Bitcoin (BTC) Deposit Wallet Address</h4>
                        <p className="text-[10px] text-slate-400 font-mono">Native SegWit • Bech32 • Institutional Multi-Sig Custody</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsBtcWalletModalOpen(true)}
                      className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1 cursor-pointer bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20"
                    >
                      <span>Full QR & Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center sm:text-left select-all shadow-inner">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                      Direct Deposit Address:
                    </span>
                    <p className="font-mono text-xs sm:text-sm font-bold text-amber-200 break-all leading-relaxed">
                      {cryptoAddresses?.btcAddress || 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-0.5">
                    <span className="text-slate-400 text-[10px] font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Admin Synced Vault: {cryptoAddresses?.lastUpdated || 'Active'}</span>
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(cryptoAddresses?.btcAddress || 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq');
                        setCopiedAddress(true);
                        setTimeout(() => setCopiedAddress(false), 2000);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-all ${
                        copiedAddress ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      }`}
                    >
                      {copiedAddress ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedAddress ? 'Copied!' : 'Copy Bitcoin Address'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">About Asset</h3>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                  {selectedAsset.description}
                </p>
              </div>

              {/* Stats Grid */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Key Financial Metrics</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">Market Cap</span>
                    <span className="text-sm font-bold text-white font-mono mt-1 block">{selectedAsset.marketCap}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">P/E Ratio</span>
                    <span className="text-sm font-bold text-white font-mono mt-1 block">{selectedAsset.peRatio ? `${selectedAsset.peRatio}x` : 'N/A'}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">Dividend Yield</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono mt-1 block">{selectedAsset.dividendYield ? `${selectedAsset.dividendYield}%` : '0.00%'}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">24h Volume</span>
                    <span className="text-sm font-bold text-white font-mono mt-1 block">{selectedAsset.volume}</span>
                  </div>
                </div>
              </div>

              {/* 52-Week Range Bar */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>52W Low: ${selectedAsset.low52w.toFixed(2)}</span>
                  <span className="text-white font-bold">Current: ${selectedAsset.price.toFixed(2)}</span>
                  <span>52W High: ${selectedAsset.high52w.toFixed(2)}</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden relative">
                  <div
                    style={{
                      width: `${Math.min(100, Math.max(0, ((selectedAsset.price - selectedAsset.low52w) / (selectedAsset.high52w - selectedAsset.low52w)) * 100))}%`
                    }}
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                  />
                </div>
              </div>

              {/* Analyst Rating Meter */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Wall Street Consensus</span>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className="text-base font-extrabold text-emerald-400 font-mono">{rating.consensus}</span>
                      <span className="text-xs text-slate-400">Target Price: <strong className="text-white font-mono">${rating.targetPrice.toFixed(2)}</strong> ({targetUpside >= 0 ? '+' : ''}{targetUpside.toFixed(1)}% upside)</span>
                    </div>
                  </div>
                </div>

                {/* Rating Bar */}
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div style={{ width: `${rating.buy}%` }} className="bg-emerald-500 h-full" title={`Buy: ${rating.buy}%`} />
                  <div style={{ width: `${rating.hold}%` }} className="bg-amber-500 h-full" title={`Hold: ${rating.hold}%`} />
                  <div style={{ width: `${rating.sell}%` }} className="bg-rose-500 h-full" title={`Sell: ${rating.sell}%`} />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono mt-2 text-slate-400">
                  <span className="text-emerald-400 font-semibold">{rating.buy}% Buy</span>
                  <span className="text-amber-400 font-semibold">{rating.hold}% Hold</span>
                  <span className="text-rose-400 font-semibold">{rating.sell}% Sell</span>
                </div>
              </div>
            </>
          ) : (
            /* AI Deep Dive Tab */
            <div className="space-y-4">
              {isLoadingAI ? (
                <div className="py-12 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                  <p className="text-sm font-medium text-slate-300">Synthesizing real-time neural market signals for {selectedAsset.symbol}...</p>
                  <p className="text-xs text-slate-500">Cross-referencing valuation multiples, macro drivers, and catalyst trajectories</p>
                </div>
              ) : analysis ? (
                <>
                  {/* Action & Sentiment Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">AI Target Action</span>
                      <div className="text-lg font-extrabold text-emerald-400 font-mono mt-0.5 flex items-center space-x-2">
                        <span>{analysis.targetAction}</span>
                        <span className="text-xs text-slate-300 font-sans font-normal">• {analysis.recommendedHorizon}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Quantitative Sentiment</span>
                      <div className="text-lg font-black text-white font-mono mt-0.5">
                        {analysis.sentimentScore} / 100
                      </div>
                    </div>
                  </div>

                  {/* Executive Summary */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>Executive Overview</span>
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed pt-1">
                      {analysis.summary}
                    </p>
                  </div>

                  {/* Bull & Bear Catalysts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-1.5">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                        <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                        <span>Upside Catalysts (Bull Case)</span>
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {analysis.bullCase}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-1.5">
                      <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>Downside Vulnerabilities (Bear Case)</span>
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {analysis.bearCase}
                      </p>
                    </div>
                  </div>

                  {/* Valuation Perspective */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Valuation & Macro Context</span>
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {analysis.valuationPerspective}
                    </p>
                  </div>

                  {/* Key Metrics to Watch */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Metrics to Monitor</span>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keyMetricsWatch?.map((metric, idx) => (
                        <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <button
            onClick={() => {
              const a = selectedAsset;
              setSelectedAsset(null);
              openTrade(a, 'BUY');
            }}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20 active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Open Order Form for {selectedAsset.symbol}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
