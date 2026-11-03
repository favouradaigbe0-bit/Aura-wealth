import React, { useState, useEffect } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { Asset, OrderSide, OrderType } from '../types/investment';
import { 
  X, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Info, 
  ArrowRight,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const TradeModal: React.FC = () => {
  const { 
    isTradeModalOpen, 
    setIsTradeModalOpen, 
    tradingAsset, 
    assets, 
    cashBalance, 
    holdings, 
    placeOrder 
  } = useInvestment();

  const [selectedSymbol, setSelectedSymbol] = useState<string>(tradingAsset?.symbol || 'VOO');
  const [side, setSide] = useState<OrderSide>('BUY');
  const [orderType, setOrderType] = useState<OrderType>('MARKET');
  const [inputMode, setInputMode] = useState<'DOLLARS' | 'SHARES'>('DOLLARS');
  const [amountValue, setAmountValue] = useState<string>('500');
  const [limitPriceInput, setLimitPriceInput] = useState<string>('');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Sync selected symbol with tradingAsset prop if it changes
  useEffect(() => {
    if (tradingAsset) {
      setSelectedSymbol(tradingAsset.symbol);
      setLimitPriceInput(tradingAsset.price.toFixed(2));
    }
  }, [tradingAsset]);

  if (!isTradeModalOpen) return null;

  const currentAsset = assets.find(a => a.symbol === selectedSymbol) || assets[0];
  const userHolding = holdings.find(h => h.symbol === currentAsset.symbol);
  const currentPrice = currentAsset.price;

  // Compute shares and total cost based on inputMode
  let computedShares = 0;
  let computedTotal = 0;
  const numInput = parseFloat(amountValue) || 0;

  if (inputMode === 'DOLLARS') {
    computedTotal = numInput;
    computedShares = currentPrice > 0 ? +(numInput / currentPrice).toFixed(4) : 0;
  } else {
    computedShares = numInput;
    computedTotal = +(numInput * currentPrice).toFixed(2);
  }

  const handleQuickAmount = (val: number | string) => {
    if (typeof val === 'number') {
      setInputMode('DOLLARS');
      setAmountValue(val.toString());
    } else if (val === 'MAX') {
      if (side === 'BUY') {
        setInputMode('DOLLARS');
        setAmountValue(Math.floor(cashBalance).toString());
      } else {
        setInputMode('SHARES');
        setAmountValue((userHolding?.shares || 0).toString());
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (computedShares <= 0 || computedTotal <= 0) {
      setFeedback({ success: false, message: 'Please enter a valid investment amount.' });
      return;
    }

    const limitPrice = orderType === 'LIMIT' ? parseFloat(limitPriceInput) : undefined;

    setIsSubmitting(true);
    setTimeout(() => {
      const res = placeOrder({
        symbol: currentAsset.symbol,
        side,
        orderType,
        shares: computedShares,
        price: currentPrice,
        limitPrice
      });

      setIsSubmitting(false);
      setFeedback(res);

      if (res.success) {
        setTimeout(() => {
          setIsTradeModalOpen(false);
          setFeedback(null);
        }, res.requiresApproval ? 2600 : 1800);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-sm text-white">
              {currentAsset.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedSymbol}
                  onChange={(e) => {
                    setSelectedSymbol(e.target.value);
                    const a = assets.find(x => x.symbol === e.target.value);
                    if (a) setLimitPriceInput(a.price.toFixed(2));
                  }}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-0.5 text-sm font-bold text-white font-mono focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {assets.map((a) => (
                    <option key={a.id} value={a.symbol}>
                      {a.symbol} — {a.name}
                    </option>
                  ))}
                </select>
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  ${currentPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Commission-Free Trade • Instant Execution
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTradeModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Buy / Sell Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-950 border-b border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setSide('BUY')}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              side === 'BUY'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Buy {currentAsset.symbol}
          </button>
          <button
            type="button"
            onClick={() => setSide('SELL')}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              side === 'SELL'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sell {currentAsset.symbol}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Order Type Selector */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Order Type</span>
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(['MARKET', 'LIMIT', 'STOP_LOSS'] as const).map((ot) => (
                <button
                  key={ot}
                  type="button"
                  onClick={() => setOrderType(ot)}
                  className={`px-2.5 py-1 rounded-lg font-mono font-medium transition-all cursor-pointer ${
                    orderType === ot ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {ot === 'STOP_LOSS' ? 'Stop Loss' : ot.charAt(0) + ot.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Limit Price Input if LIMIT */}
          {orderType === 'LIMIT' && (
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <label className="text-[11px] text-slate-400 block font-medium">Limit Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={limitPriceInput}
                onChange={(e) => setLimitPriceInput(e.target.value)}
                placeholder="Target execution price"
                className="w-full bg-transparent text-white font-mono font-bold text-base focus:outline-none"
              />
            </div>
          )}

          {/* Amount Input with Mode Toggle (Dollars vs Shares) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">
                {inputMode === 'DOLLARS' ? 'Investment Amount (USD)' : 'Number of Shares'}
              </span>
              <button
                type="button"
                onClick={() => setInputMode(inputMode === 'DOLLARS' ? 'SHARES' : 'DOLLARS')}
                className="text-emerald-400 hover:text-emerald-300 font-mono font-semibold transition-colors cursor-pointer"
              >
                Switch to {inputMode === 'DOLLARS' ? 'Shares' : 'Dollars ($)'}
              </button>
            </div>

            <div className="flex items-baseline space-x-2">
              {inputMode === 'DOLLARS' && <span className="text-2xl font-mono text-slate-500 font-bold">$</span>}
              <input
                type="number"
                step="any"
                min="0.0001"
                value={amountValue}
                onChange={(e) => setAmountValue(e.target.value)}
                placeholder="0.00"
                className="w-full bg-transparent text-3xl font-extrabold text-white font-mono focus:outline-none placeholder-slate-600"
              />
            </div>

            {/* Quick Amount Chips */}
            <div className="flex items-center space-x-2 pt-2 border-t border-slate-800/80">
              {[100, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleQuickAmount(amt)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-[11px] font-mono font-medium text-slate-300 border border-slate-700/60 cursor-pointer"
                >
                  ${amt}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleQuickAmount('MAX')}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-[11px] font-mono font-bold text-emerald-400 border border-emerald-500/30 cursor-pointer ml-auto"
              >
                Max Available
              </button>
            </div>
          </div>

          {/* Account Balance / Position Snapshot */}
          <div className="flex items-center justify-between text-xs px-1 text-slate-400">
            <span>
              {side === 'BUY' ? 'Buying Power (Cash Sweep):' : 'Available to Sell:'}
            </span>
            <span className="font-mono font-semibold text-white">
              {side === 'BUY'
                ? `$${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                : `${userHolding ? userHolding.shares : 0} ${currentAsset.symbol}`}
            </span>
          </div>

          {/* Order Summary Breakdown */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1.5 font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Estimated Shares:</span>
              <span className="text-white font-semibold">{computedShares} {currentAsset.symbol}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Execution Price:</span>
              <span className="text-white">${currentPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Brokerage Commission:</span>
              <span className="text-emerald-400 font-bold">$0.00 (Zero Fee)</span>
            </div>
            <div className="flex justify-between text-slate-300 pt-1.5 border-t border-slate-800 font-bold">
              <span>Total Estimated Cost:</span>
              <span className="text-white text-sm">${computedTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Feedback message */}
          {feedback && (
            <div className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
              feedback.success ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
            }`}>
              {feedback.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center space-x-2 ${
              side === 'BUY'
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20'
            }`}
          >
            {isSubmitting ? (
              <span>Executing Order...</span>
            ) : (
              <>
                <span>Review & Execute {side} Order</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
