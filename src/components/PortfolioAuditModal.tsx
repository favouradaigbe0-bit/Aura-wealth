import React, { useState, useEffect } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { AIPortfolioAudit } from '../types/investment';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ArrowRight,
  TrendingUp,
  Percent,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

export const PortfolioAuditModal: React.FC = () => {
  const { 
    isAuditModalOpen, 
    setIsAuditModalOpen, 
    fetchAIPortfolioAudit, 
    rebalancePortfolio,
    totalNetWorth 
  } = useInvestment();

  const [audit, setAudit] = useState<AIPortfolioAudit | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rebalanceDone, setRebalanceDone] = useState(false);

  useEffect(() => {
    if (isAuditModalOpen) {
      loadAudit();
      setRebalanceDone(false);
    }
  }, [isAuditModalOpen]);

  const loadAudit = async () => {
    setIsLoading(true);
    const res = await fetchAIPortfolioAudit();
    setAudit(res);
    setIsLoading(false);
  };

  const handleRebalance = () => {
    rebalancePortfolio();
    setRebalanceDone(true);
    setTimeout(() => {
      setIsAuditModalOpen(false);
    }, 2000);
  };

  if (!isAuditModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-8 relative">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-900">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white">Institutional Portfolio Audit</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                  CIO Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Stress-tested against inflation, rate volatility, and sector concentration
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuditModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 text-xs">
          {isLoading ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-slate-200">Executing multi-factor risk audit...</p>
              <p className="text-xs text-slate-500">Evaluating asset correlations, Sharpe ratio stability, and drawdown resilience</p>
            </div>
          ) : audit ? (
            <>
              {/* Score & Risk Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block">Portfolio Health Score</span>
                    <div className="text-3xl font-black text-white font-mono mt-1">
                      {audit.healthScore} <span className="text-xs font-normal text-slate-500">/ 100</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-500/80 flex items-center justify-center font-bold font-mono text-emerald-400 text-sm">
                    {audit.healthScore}%
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block">Risk Classification</span>
                    <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
                      {audit.riskLevel}
                    </div>
                  </div>
                  <Compass className="w-8 h-8 text-cyan-400 opacity-60" />
                </div>
              </div>

              {/* Strengths */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Portfolio Strengths</span>
                </span>
                <ul className="space-y-1.5 text-slate-300 pl-1">
                  {audit.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Concentration Risks */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2">
                <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Concentration & Drawdown Risks</span>
                </span>
                <ul className="space-y-1.5 text-slate-300 pl-1">
                  {audit.risks.map((r, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rebalancing Recommendations */}
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Target Rebalancing Adjustments
                </span>
                <div className="space-y-2">
                  {audit.rebalancingRecommendations.map((rec, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-xs">{rec.asset}</span>
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                            rec.action === 'Increase'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                              : rec.action === 'Reduce'
                              ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                              : 'bg-slate-800 text-slate-300'
                          }`}>
                            {rec.action}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{rec.rationale}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Macro & Tax Tip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block mb-1">Macro Sensitivity</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{audit.macroVulnerabilities}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[10px] text-cyan-400 uppercase font-mono font-bold block mb-1">Tax Optimization Tip</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{audit.taxEfficiencyTip}</p>
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <button
            onClick={loadAudit}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-Audit</span>
          </button>

          <button
            onClick={handleRebalance}
            disabled={rebalanceDone}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center space-x-2 cursor-pointer active:scale-98"
          >
            {rebalanceDone ? (
              <span>✓ Rebalancing Executed</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Execute Recommended Rebalance</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
