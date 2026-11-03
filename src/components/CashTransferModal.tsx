import React, { useState, useMemo } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { INITIAL_BANK_ACCOUNTS } from '../data/mockData';
import { 
  SUPPORTED_CRYPTOS, 
  SupportedCrypto, 
  CryptoNetworkConfig, 
  generateSimulatedTxHash 
} from '../data/cryptoPaymentData';
import { 
  X, 
  DollarSign, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Check,
  QrCode,
  Coins,
  ExternalLink,
  RefreshCw,
  Zap,
  Lock,
  ArrowRight
} from 'lucide-react';

export const CashTransferModal: React.FC = () => {
  const { 
    isTransferModalOpen, 
    setIsTransferModalOpen, 
    cashBalance, 
    depositCash, 
    depositCrypto,
    withdrawCash,
    assets,
    cryptoAddresses
  } = useInvestment();

  // Primary Method: 'BANK' or 'CRYPTO' (Default to Crypto Spot)
  const [paymentMethod, setPaymentMethod] = useState<'BANK' | 'CRYPTO'>('CRYPTO');

  // Bank transfer state
  const [bankMode, setBankMode] = useState<'DEPOSIT' | 'WITHDRAW'>('DEPOSIT');
  const [selectedBank, setSelectedBank] = useState<string>(INITIAL_BANK_ACCOUNTS[0].id);
  const [bankAmount, setBankAmount] = useState<string>('1000');

  // Crypto spot payment state - Defaults to Bitcoin (BTC) Spot
  const [selectedCryptoId, setSelectedCryptoId] = useState<string>('btc');
  const [selectedNetworkId, setSelectedNetworkId] = useState<string>('btc-native');
  const [cryptoAmountMode, setCryptoAmountMode] = useState<'USD' | 'CRYPTO'>('USD');
  const [cryptoInputAmount, setCryptoInputAmount] = useState<string>('1000');
  const [destination, setDestination] = useState<'CASH_SWEEP' | 'HOLDING'>('HOLDING');
  const [customTxHash, setCustomTxHash] = useState<string>('');
  const [showQrCode, setShowQrCode] = useState<boolean>(true);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
  const [isVerifyingOnChain, setIsVerifyingOnChain] = useState<boolean>(false);
  const [verificationStep, setVerificationStep] = useState<number>(0);

  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isTransferModalOpen) return null;

  // Selected crypto asset object
  const activeCrypto = useMemo(() => {
    return SUPPORTED_CRYPTOS.find(c => c.id === selectedCryptoId) || SUPPORTED_CRYPTOS[0];
  }, [selectedCryptoId]);

  // Active network
  const activeNetwork = useMemo(() => {
    const net = activeCrypto.networks.find(n => n.id === selectedNetworkId);
    return net || activeCrypto.networks[0];
  }, [activeCrypto, selectedNetworkId]);

  // Dynamically resolved custody address from Admin Dashboard configuration
  const activeDepositAddress = useMemo(() => {
    if (activeCrypto.symbol === 'BTC') {
      return cryptoAddresses?.btcAddress || activeNetwork.address;
    }
    if (activeCrypto.symbol === 'ETH') {
      return cryptoAddresses?.ethAddress || activeNetwork.address;
    }
    if (activeCrypto.symbol === 'USDT' && activeNetwork.id.includes('tron')) {
      return cryptoAddresses?.usdtAddress || activeNetwork.address;
    }
    if (activeCrypto.symbol === 'USDC' && activeNetwork.id.includes('base')) {
      return cryptoAddresses?.usdcAddress || activeNetwork.address;
    }
    if (activeCrypto.symbol === 'SOL') {
      return cryptoAddresses?.solAddress || activeNetwork.address;
    }
    return activeNetwork.address;
  }, [activeCrypto.symbol, activeNetwork, cryptoAddresses]);

  // Live price of active crypto (from assets or fixed 1.00)
  const currentCryptoPrice = useMemo(() => {
    if (activeCrypto.fixedPrice) return activeCrypto.fixedPrice;
    const foundAsset = assets.find(a => a.symbol === activeCrypto.symbol);
    return foundAsset ? foundAsset.price : (activeCrypto.symbol === 'BTC' ? 68450 : activeCrypto.symbol === 'ETH' ? 2580 : 188);
  }, [activeCrypto, assets]);

  // Calculated values
  const { calculatedUsd, calculatedCrypto } = useMemo(() => {
    const val = parseFloat(cryptoInputAmount) || 0;
    if (cryptoAmountMode === 'USD') {
      const cryptoVal = currentCryptoPrice > 0 ? +(val / currentCryptoPrice).toFixed(6) : 0;
      return { calculatedUsd: val, calculatedCrypto: cryptoVal };
    } else {
      const usdVal = +(val * currentCryptoPrice).toFixed(2);
      return { calculatedUsd: usdVal, calculatedCrypto: val };
    }
  }, [cryptoInputAmount, cryptoAmountMode, currentCryptoPrice]);

  // Handle crypto change
  const handleCryptoChange = (crypto: SupportedCrypto) => {
    setSelectedCryptoId(crypto.id);
    const recommended = crypto.networks.find(n => n.isRecommended) || crypto.networks[0];
    setSelectedNetworkId(recommended.id);
  };

  // Copy address to clipboard
  const handleCopyAddress = () => {
    if (activeDepositAddress) {
      navigator.clipboard.writeText(activeDepositAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  // Bank Submit
  const handleBankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(bankAmount) || 0;
    if (num <= 0) {
      setFeedback({ success: false, message: 'Please enter an amount greater than $0.' });
      return;
    }

    const currentBank = INITIAL_BANK_ACCOUNTS.find(b => b.id === selectedBank) || INITIAL_BANK_ACCOUNTS[0];

    if (bankMode === 'DEPOSIT') {
      depositCash(num, currentBank.bankName);
      setFeedback({ success: true, message: `Successfully deposited $${num.toLocaleString()} from ${currentBank.bankName}. Funds swept to 4.85% APY account.` });
      setTimeout(() => {
        setIsTransferModalOpen(false);
        setFeedback(null);
      }, 1500);
    } else {
      const res = withdrawCash(num, currentBank.bankName);
      setFeedback(res);
      if (res.success) {
        setTimeout(() => {
          setIsTransferModalOpen(false);
          setFeedback(null);
        }, 1500);
      }
    }
  };

  // Crypto Payment Submit & Simulated Multi-Step On-Chain Verification
  const handleCryptoPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (calculatedUsd < activeCrypto.minimumDepositUsd) {
      setFeedback({ 
        success: false, 
        message: `Minimum deposit for ${activeCrypto.symbol} is $${activeCrypto.minimumDepositUsd}.00 USD.` 
      });
      return;
    }

    setIsVerifyingOnChain(true);
    setVerificationStep(1); // Mempool

    const txHash = customTxHash.trim() || generateSimulatedTxHash(activeNetwork.id);

    // Step 2: Block confirmations
    setTimeout(() => {
      setVerificationStep(2);
    }, 900);

    // Step 3: AML Compliance Screen
    setTimeout(() => {
      setVerificationStep(3);
    }, 1800);

    // Step 4: Settle & Credit
    setTimeout(() => {
      setVerificationStep(4);
      const res = depositCrypto({
        symbol: activeCrypto.symbol,
        cryptoAmount: calculatedCrypto,
        usdEquivalent: calculatedUsd,
        network: activeNetwork.name,
        walletAddress: activeDepositAddress,
        txHash,
        destination
      });

      setFeedback({
        success: true,
        message: `${res.message} ${destination === 'HOLDING' ? 'Added to crypto spot portfolio holdings.' : 'Swept to 4.85% APY cash program.'}`
      });

      setTimeout(() => {
        setIsVerifyingOnChain(false);
        setIsTransferModalOpen(false);
        setFeedback(null);
        setVerificationStep(0);
      }, 1600);
    }, 2600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden relative my-6">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-cyan-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Crypto Spot Deposit Desk</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                  Spot Settlement
                </span>
              </h3>
              <p className="text-xs text-slate-400">Institutional Multi-Sig Cold Custody & High-Yield Cash Sweep</p>
            </div>
          </div>

          <button
            onClick={() => setIsTransferModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Method Selector: Bank vs Crypto */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-950 border-b border-slate-800 gap-1.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setPaymentMethod('CRYPTO'); setFeedback(null); }}
            className={`py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2 ${
              paymentMethod === 'CRYPTO'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Crypto Spot Deposit (0% Fee)</span>
          </button>

          <button
            type="button"
            onClick={() => { setPaymentMethod('BANK'); setFeedback(null); }}
            className={`py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2 ${
              paymentMethod === 'BANK'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Bank Wire / ACH</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* CRYPTOCURRENCY PAYMENT TAB                                     */}
        {/* ============================================================== */}
        {paymentMethod === 'CRYPTO' && (
          <form onSubmit={handleCryptoPaymentSubmit} className="p-4 sm:p-5 space-y-4 text-xs">
            
            {/* Step 1: Select Crypto Asset */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] flex items-center justify-center font-bold">1</span>
                  <span>Select Payment Currency</span>
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  Market Price: ${currentCryptoPrice.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {SUPPORTED_CRYPTOS.map((crypto) => {
                  const isSelected = selectedCryptoId === crypto.id;
                  const price = crypto.fixedPrice || (assets.find(a => a.symbol === crypto.symbol)?.price ?? (crypto.symbol === 'BTC' ? 68450 : 2580));
                  
                  return (
                    <button
                      key={crypto.id}
                      type="button"
                      onClick={() => handleCryptoChange(crypto)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                        isSelected 
                          ? 'bg-slate-950 border-amber-500/80 ring-2 ring-amber-500/20 shadow-md' 
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-950/70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-mono font-bold text-xs ${crypto.iconColor}`}>
                          {crypto.symbol}
                        </span>
                        {crypto.type === 'STABLECOIN' && (
                          <span className="text-[9px] font-mono px-1 py-0.2 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                            1:1
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">{crypto.name}</div>
                      <div className="text-[11px] font-mono text-slate-200 mt-1 font-medium">
                        ${price.toLocaleString()}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Network Selection */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] flex items-center justify-center font-bold">2</span>
                  <span>Choose Transfer Network</span>
                </label>
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span>Est. Time: {activeNetwork.avgTime}</span>
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeCrypto.networks.map((net) => {
                  const isSelected = selectedNetworkId === net.id;
                  return (
                    <button
                      key={net.id}
                      type="button"
                      onClick={() => setSelectedNetworkId(net.id)}
                      className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center space-x-2 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500/70 text-amber-300 ring-1 ring-amber-500/30'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <span>{net.name}</span>
                      {net.isRecommended && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                          Fast & Cheap
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-slate-500">
                        {net.estGasFee}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Receiving Wallet Address & QR Code (Front and Center) */}
            <div className={`p-4 rounded-2xl border space-y-3.5 transition-all shadow-xl ${
              activeCrypto.symbol === 'BTC'
                ? 'bg-gradient-to-b from-slate-950 to-slate-900 border-amber-500/50 shadow-amber-500/5'
                : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">3</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{activeCrypto.symbol} Deposit Wallet Address</span>
                    {activeCrypto.symbol === 'BTC' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                        Institutional Vault
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowQrCode(!showQrCode)}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 cursor-pointer font-medium"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{showQrCode ? 'Hide QR' : 'Show QR'}</span>
                  </button>
                  {activeCrypto.symbol === 'BTC' && (
                    <a
                      href={`https://mempool.space/address/${activeDepositAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center space-x-1 font-mono transition-colors"
                      title="Verify on Mempool"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Explorer</span>
                    </a>
                  )}
                </div>
              </div>

              {/* QR Code & Scan Directions */}
              {showQrCode && (
                <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-xl bg-slate-900 border border-slate-800/80">
                  {/* Clean SVG QR Representation */}
                  <div className="w-28 h-28 shrink-0 bg-white p-2.5 rounded-xl flex items-center justify-center shadow-lg relative group">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950" fill="currentColor">
                      {/* Stylized QR Code Matrix */}
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
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-7 h-7 rounded-md bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-md">
                        {activeCrypto.symbol.slice(0, 3)}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-1.5 text-center sm:text-left">
                    <div className="text-xs font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                      <span>Network: {activeNetwork.name}</span>
                      <span className="text-amber-400 font-mono">({activeNetwork.shortName})</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Scan or copy the address below from any wallet (Coinbase, Cash App, Binance, Ledger, Phantom, Trust Wallet).
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1 text-[10px] font-mono text-slate-500">
                      <span>Min Confirmation: {activeNetwork.confirmationsNeeded} blocks</span>
                      <span>•</span>
                      <span>Est. Arrival: {activeNetwork.avgTime}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Monospace Address Box with Zero Truncation */}
              <div className="space-y-2">
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 text-center sm:text-left select-all shadow-inner">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Full Receiving Address:
                  </span>
                  <p className="font-mono text-xs sm:text-sm font-bold text-amber-200 break-all leading-relaxed">
                    {activeDepositAddress}
                  </p>
                </div>

                {/* Copy Button & Custody Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                  <div className="flex items-center space-x-1.5 text-[10px] text-emerald-400 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>Admin Verified Institutional Vault (Synced: {cryptoAddresses?.lastUpdated || 'Active'})</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 shrink-0 transition-all cursor-pointer shadow-md ${
                      copiedAddress
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 active:scale-98'
                    }`}
                  >
                    {copiedAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAddress ? 'Address Copied!' : `Copy ${activeCrypto.symbol} Address`}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Step 4: Deposit Amount with Real-Time Conversion */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] flex items-center justify-center font-bold">4</span>
                  <span>Amount to Transfer</span>
                </span>

                <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setCryptoAmountMode('USD')}
                    className={`px-2 py-0.5 rounded-md font-mono transition-colors cursor-pointer ${
                      cryptoAmountMode === 'USD' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCryptoAmountMode('CRYPTO')}
                    className={`px-2 py-0.5 rounded-md font-mono transition-colors cursor-pointer ${
                      cryptoAmountMode === 'CRYPTO' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {activeCrypto.symbol}
                  </button>
                </div>
              </div>

              {/* Amount Input */}
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-mono text-slate-500 font-bold">
                  {cryptoAmountMode === 'USD' ? '$' : activeCrypto.symbol}
                </span>
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={cryptoInputAmount}
                  onChange={(e) => setCryptoInputAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent text-2xl sm:text-3xl font-extrabold text-white font-mono focus:outline-none"
                />
              </div>

              {/* Converted Equivalent Indicator */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Equivalent Exchange Value:</span>
                <span className="font-mono font-bold text-amber-300 text-sm">
                  {cryptoAmountMode === 'USD' 
                    ? `≈ ${calculatedCrypto.toLocaleString()} ${activeCrypto.symbol}`
                    : `≈ $${calculatedUsd.toLocaleString()} USD`
                  }
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center space-x-1.5 pt-1 overflow-x-auto">
                {[250, 1000, 5000, 10000, 25000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      if (cryptoAmountMode === 'USD') {
                        setCryptoInputAmount(amt.toString());
                      } else {
                        const cryptoVal = +(amt / currentCryptoPrice).toFixed(4);
                        setCryptoInputAmount(cryptoVal.toString());
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-mono font-medium text-slate-300 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                  >
                    ${amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Destination Choice (Cash Sweep vs Direct Portfolio Holding) */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] flex items-center justify-center font-bold">5</span>
                <span>Select Account Destination</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDestination('HOLDING')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    destination === 'HOLDING'
                      ? 'bg-slate-950 border-amber-500/70 ring-1 ring-amber-500/30'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-xs">Direct Crypto Holding</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                      Portfolio
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Retain {activeCrypto.symbol} in institutional cold custody as a portfolio position.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDestination('CASH_SWEEP')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    destination === 'CASH_SWEEP'
                      ? 'bg-slate-950 border-emerald-500/70 ring-1 ring-emerald-500/30'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-xs">Sweep to Cash (4.85% APY)</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                      High Yield
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Instantly converted at 0% fee and swept to earn daily compound interest.
                  </p>
                </button>
              </div>
            </div>

              {/* Optional Custom TX Hash input for advanced users */}
              <div className="pt-2">
                <label className="text-[11px] text-slate-400 block mb-1">
                  Optional: Transaction Hash (TxHash) / Explorer Reference
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customTxHash}
                    onChange={(e) => setCustomTxHash(e.target.value)}
                    placeholder={`e.g. ${generateSimulatedTxHash(activeNetwork.id).slice(0, 18)}...`}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 focus:outline-none focus:border-amber-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => setCustomTxHash(generateSimulatedTxHash(activeNetwork.id))}
                    className="px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-amber-300 border border-slate-700 shrink-0 cursor-pointer"
                    title="Generate test hash"
                  >
                    Auto-Fill
                  </button>
                </div>
              </div>

            {/* Verifying Animation / Overlay */}
            {isVerifyingOnChain && (
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-3 animate-pulse">
                <div className="flex items-center justify-between text-amber-300 font-bold text-xs">
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Validating On-Chain Payment Protocol</span>
                  </span>
                  <span className="font-mono text-[11px]">Step {verificationStep}/4</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  <div className={`h-1.5 rounded-full transition-all ${verificationStep >= 1 ? 'bg-amber-500' : 'bg-slate-800'}`} />
                  <div className={`h-1.5 rounded-full transition-all ${verificationStep >= 2 ? 'bg-amber-500' : 'bg-slate-800'}`} />
                  <div className={`h-1.5 rounded-full transition-all ${verificationStep >= 3 ? 'bg-amber-500' : 'bg-slate-800'}`} />
                  <div className={`h-1.5 rounded-full transition-all ${verificationStep >= 4 ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                </div>

                <div className="text-[11px] font-mono text-slate-300">
                  {verificationStep === 1 && '📡 Mempool broadcast detected on network nodes...'}
                  {verificationStep === 2 && `⛓️ Confirming ${activeNetwork.confirmationsNeeded} block signatures on ${activeNetwork.name}...`}
                  {verificationStep === 3 && '🛡️ Chainalysis AML & OFAC sanctions clearance verified (Score: 99.8%)...'}
                  {verificationStep === 4 && '✅ Funds cleared! Crediting liquid capital...'}
                </div>
              </div>
            )}

            {/* Feedback Message */}
            {feedback && (
              <div className={`p-3.5 rounded-xl text-xs flex items-center space-x-2 ${
                feedback.success 
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
              }`}>
                {feedback.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span>{feedback.message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isVerifyingOnChain}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/25 active:scale-98 cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>Confirm & Credit Crypto Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Safety Guarantee */}
            <p className="text-[11px] text-slate-400 text-center flex items-center justify-center space-x-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Multi-Signature Cold Storage Custody • Zero On-Ramp Commission</span>
            </p>
          </form>
        )}

        {/* ============================================================== */}
        {/* TRADITIONAL BANK ACH / WIRE TAB                                */}
        {/* ============================================================== */}
        {paymentMethod === 'BANK' && (
          <div>
            {/* Mode Toggle: Deposit vs Withdraw */}
            <div className="grid grid-cols-2 p-1 bg-slate-950 border-b border-slate-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => setBankMode('DEPOSIT')}
                className={`py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  bankMode === 'DEPOSIT'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ArrowDownLeft className="w-4 h-4" />
                <span>Deposit to Sweep (4.85%)</span>
              </button>

              <button
                type="button"
                onClick={() => setBankMode('WITHDRAW')}
                className={`py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  bankMode === 'WITHDRAW'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Withdraw to Bank</span>
              </button>
            </div>

            <form onSubmit={handleBankSubmit} className="p-4 sm:p-5 space-y-4 text-xs">
              {/* Linked Bank Selection */}
              <div>
                <label className="text-slate-400 block mb-1.5 font-medium">Linked Financial Institution</label>
                <div className="space-y-2">
                  {INITIAL_BANK_ACCOUNTS.map((bank) => (
                    <div
                      key={bank.id}
                      onClick={() => setSelectedBank(bank.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedBank === bank.id
                          ? 'bg-slate-950 border-cyan-500/60 ring-1 ring-cyan-500/20'
                          : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <div>
                          <div className="font-semibold text-white">{bank.bankName}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{bank.type} {bank.accountNumberMask}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Instant ACH
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Transfer Amount (USD)</span>
                  {bankMode === 'WITHDRAW' && (
                    <span className="font-mono text-white text-[11px]">
                      Available: ${cashBalance.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-mono text-slate-500 font-bold">$</span>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={bankAmount}
                    onChange={(e) => setBankAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-transparent text-3xl font-extrabold text-white font-mono focus:outline-none"
                  />
                </div>

                {/* Quick Chips */}
                <div className="flex items-center space-x-2 pt-2 border-t border-slate-800/80">
                  {[250, 500, 1000, 5000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setBankAmount(amt.toString())}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-[11px] font-mono font-medium text-slate-300 border border-slate-700/60 cursor-pointer"
                    >
                      ${amt}
                    </button>
                  ))}
                  {bankMode === 'WITHDRAW' && (
                    <button
                      type="button"
                      onClick={() => setBankAmount(cashBalance.toString())}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/15 text-[11px] font-mono font-bold text-cyan-300 border border-cyan-500/30 cursor-pointer ml-auto"
                    >
                      Max
                    </button>
                  )}
                </div>
              </div>

              {/* Feedback */}
              {feedback && (
                <div className={`p-3.5 rounded-xl text-xs flex items-center space-x-2 ${
                  feedback.success ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                }`}>
                  {feedback.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{feedback.message}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20 active:scale-98 cursor-pointer"
              >
                {bankMode === 'DEPOSIT' ? 'Confirm Instant ACH Deposit' : 'Confirm Withdrawal to Bank'}
              </button>

              <p className="text-[11px] text-slate-400 text-center flex items-center justify-center space-x-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit Bank-Grade Encryption • Zero Wire Fees</span>
              </p>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
