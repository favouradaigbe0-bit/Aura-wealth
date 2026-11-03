import React, { useState } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Coins, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

export const BitcoinWalletModal: React.FC = () => {
  const { 
    isBtcWalletModalOpen, 
    setIsBtcWalletModalOpen, 
    cryptoAddresses,
    setIsTransferModalOpen,
    assets
  } = useInvestment();

  const [selectedCoin, setSelectedCoin] = useState<'BTC' | 'ETH'>('BTC');
  const [copied, setCopied] = useState(false);

  if (!isBtcWalletModalOpen) return null;

  const isBtc = selectedCoin === 'BTC';
  const activeAddress = isBtc 
    ? (cryptoAddresses?.btcAddress || 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq')
    : (cryptoAddresses?.ethAddress || '0x71C6947bB829E182390a16B4f44778E2b7D35Ea9');

  const activeAsset = assets.find(a => a.symbol === selectedCoin);
  const activePrice = activeAsset ? activeAsset.price : (isBtc ? 94250 : 3420);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleOpenSpotDeposit = () => {
    setIsBtcWalletModalOpen(false);
    setIsTransferModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-amber-500/30 shadow-2xl overflow-hidden relative my-6">
        
        {/* Glow ambient background effect */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/90 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-amber-600/30 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black font-mono text-lg shadow-lg shadow-amber-500/10">
              {isBtc ? '₿' : 'Ξ'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  {isBtc ? 'Bitcoin (BTC)' : 'Ethereum (ETH)'} Spot Custody Address
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-mono font-bold border border-amber-500/20">
                  {isBtc ? 'Native SegWit' : 'ERC-20 Mainnet'}
                </span>
              </div>
              <p className="text-xs text-slate-400">Institutional Cold Storage Vault & Instant Spot Settlement</p>
            </div>
          </div>

          <button
            onClick={() => setIsBtcWalletModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Currency Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-950 border-b border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setSelectedCoin('BTC')}
            className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
              isBtc ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="font-mono">₿</span>
            <span>Bitcoin (BTC)</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCoin('ETH')}
            className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
              !isBtc ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="font-mono">Ξ</span>
            <span>Ethereum (ETH)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 relative z-10 text-xs">
          {/* Live Price Ticker Strip */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-semibold">{selectedCoin} / USD Spot Rate:</span>
              <span className="font-mono font-bold text-white text-sm">
                ${activePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <span className="text-[11px] font-mono font-semibold text-emerald-400">
              +{activeAsset?.changePercent ?? 1.8}% 24h
            </span>
          </div>

          {/* Hero QR Code & Visual Scan Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 flex flex-col sm:flex-row items-center gap-5 shadow-inner">
            {/* High-Resolution SVG QR Code */}
            <div className="w-36 h-36 shrink-0 bg-white p-3 rounded-2xl flex items-center justify-center shadow-xl relative group">
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950" fill="currentColor">
                <rect x="0" y="0" width="28" height="28" rx="2" />
                <rect x="4" y="4" width="20" height="20" fill="white" />
                <rect x="8" y="8" width="12" height="12" />

                <rect x="72" y="0" width="28" height="28" rx="2" />
                <rect x="76" y="4" width="20" height="20" fill="white" />
                <rect x="80" y="8" width="12" height="12" />

                <rect x="0" y="72" width="28" height="28" rx="2" />
                <rect x="4" y="76" width="20" height="20" fill="white" />
                <rect x="8" y="80" width="12" height="12" />

                <rect x="36" y="8" width="8" height="8" />
                <rect x="48" y="16" width="8" height="12" />
                <rect x="60" y="8" width="6" height="8" />

                <rect x="32" y="36" width="12" height="12" />
                <rect x="48" y="36" width="16" height="8" />
                <rect x="68" y="36" width="8" height="12" />
                
                <rect x="8" y="36" width="12" height="8" />
                <rect x="8" y="48" width="8" height="16" />
                <rect x="20" y="56" width="8" height="8" />

                <rect x="36" y="56" width="16" height="8" />
                <rect x="56" y="48" width="8" height="16" />
                <rect x="68" y="60" width="16" height="8" />

                <rect x="36" y="72" width="8" height="16" />
                <rect x="48" y="80" width="16" height="8" />
                <rect x="68" y="76" width="12" height="12" />
                <rect x="84" y="84" width="8" height="8" />
              </svg>

              {/* Coin badge in center of QR */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-8 h-8 rounded-lg font-black text-sm flex items-center justify-center shadow-md ${
                  isBtc ? 'bg-amber-500 text-slate-950' : 'bg-cyan-500 text-slate-950'
                }`}>
                  {isBtc ? '₿' : 'Ξ'}
                </div>
              </div>
            </div>

            {/* Scan Directions */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div className="text-xs font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Scan with Any {selectedCoin} Wallet</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Compatible with Cash App, Coinbase, Binance, Kraken, Ledger, Trezor, MetaMask, Trust Wallet, and all {selectedCoin} custody clients.
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300">
                  Network: {isBtc ? 'Bitcoin' : 'Ethereum (ERC-20)'}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-emerald-400">
                  {isBtc ? '2 Confirmations' : '12 Confirmations'}
                </span>
              </div>
            </div>
          </div>

          {/* Dedicated Full Address Card (Zero Truncation) */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Your Official {selectedCoin} Custody Address:</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {isBtc ? 'SegWit Bech32 (bc1q)' : 'EVM Hexadecimal (0x)'}
              </span>
            </div>

            {/* Address String Box (Full break-all) */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/90 text-center sm:text-left select-all">
              <p className="font-mono text-sm sm:text-base font-bold text-amber-200 break-all tracking-wide leading-relaxed">
                {activeAddress}
              </p>
            </div>

            {/* Action Buttons: Copy Address & View on Explorer */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopy}
                className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md ${
                  copied 
                    ? 'bg-emerald-500 text-slate-950' 
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 active:scale-98'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : `Copy ${selectedCoin} Address`}</span>
              </button>

              <a
                href={isBtc ? `https://mempool.space/address/${activeAddress}` : `https://etherscan.io/address/${activeAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-medium text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                title={`Verify address on public ${selectedCoin} blockchain`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{isBtc ? 'Mempool Explorer' : 'Etherscan'}</span>
              </a>
            </div>
          </div>

          {/* Compliance & Custody Info Footer */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1 text-[11px] text-slate-400">
            <div className="flex items-center space-x-1.5 text-slate-300 font-semibold">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Important Deposit Instructions:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[10px] pl-1">
              <li>Send only <strong>Bitcoin (BTC)</strong> over the Bitcoin network to this address.</li>
              <li>Do not send Bitcoin Cash (BCH), BSV, or wrapped tokens (WBTC) to this address.</li>
              <li>Transactions are automatically confirmed after 2 blockchain block validations.</li>
              <li>Configured and verified by Institutional Compliance Desk. Last updated: <span className="font-mono text-slate-300">{cryptoAddresses?.lastUpdated || 'Active'}</span>.</li>
            </ul>
          </div>

          {/* Modal Bottom Action Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setIsBtcWalletModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleOpenSpotDeposit}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Open Spot Deposit Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
