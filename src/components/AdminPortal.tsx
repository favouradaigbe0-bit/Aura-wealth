import React, { useState, useEffect } from 'react';
import { useInvestment } from '../context/InvestmentContext';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  KeyRound, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sliders, 
  History, 
  UserCheck, 
  LogOut, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles,
  FileCheck,
  Building,
  RefreshCw,
  Search,
  X,
  Coins,
  Copy,
  Check,
  ExternalLink,
  Save,
  QrCode,
  Wallet,
  CreditCard,
  Megaphone,
  User,
  Mail,
  Send,
  Trash2
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    isAdminLoggedIn,
    adminUser,
    loginAdmin,
    logoutAdmin,
    orders,
    holdings,
    tradePolicy,
    updateTradePolicy,
    pendingApprovalsCount,
    approveOrder,
    rejectOrder,
    cryptoAddresses,
    updateCryptoAddresses,
    resetCryptoAddressesToDefault,
    loanApplications,
    approveLoan,
    rejectLoan,
    registeredUsers,
    verifyUserKyc,
    inquiries,
    updateInquiryStatus,
    announcements,
    publishAnnouncement,
    deleteAnnouncement
  } = useInvestment();

  // Login form state
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active sub-tab inside admin view
  const [adminTab, setAdminTab] = useState<'queue' | 'loans' | 'crypto_custody' | 'users' | 'inquiries' | 'announcements' | 'policy' | 'audit'>('queue');
  
  // Announcement publishing state
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState('Custody & Security');

  // Loan approval & rejection state
  const [loanApprovalNotes, setLoanApprovalNotes] = useState<{ [id: string]: string }>({});
  const [rejectingLoanId, setRejectingLoanId] = useState<string | null>(null);
  const [loanRejectionReason, setLoanRejectionReason] = useState('Credit card verification criteria unverified.');

  // Crypto custody addresses form state
  const [btcAddress, setBtcAddress] = useState(cryptoAddresses.btcAddress);
  const [ethAddress, setEthAddress] = useState(cryptoAddresses.ethAddress);
  const [usdtAddress, setUsdtAddress] = useState(cryptoAddresses.usdtAddress);
  const [usdcAddress, setUsdcAddress] = useState(cryptoAddresses.usdcAddress);
  const [solAddress, setSolAddress] = useState(cryptoAddresses.solAddress);
  const [showSecondaryCoins, setShowSecondaryCoins] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Keep form inputs synced if context changes
  useEffect(() => {
    setBtcAddress(cryptoAddresses.btcAddress);
    setEthAddress(cryptoAddresses.ethAddress);
    setUsdtAddress(cryptoAddresses.usdtAddress);
    setUsdcAddress(cryptoAddresses.usdcAddress);
    setSolAddress(cryptoAddresses.solAddress);
  }, [cryptoAddresses]);

  // Validation helpers
  const isBtcValid = btcAddress.trim().length >= 26 && /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,65}$/i.test(btcAddress.trim());
  const isEthValid = /^0x[a-fA-F0-9]{40}$/.test(ethAddress.trim());

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Save crypto custody addresses
  const handleSaveAddresses = (e: React.FormEvent) => {
    e.preventDefault();
    if (!btcAddress.trim() || !ethAddress.trim()) {
      setActionNotice({ type: 'error', message: 'Bitcoin and Ethereum addresses cannot be blank.' });
      return;
    }
    const res = updateCryptoAddresses({
      btcAddress: btcAddress.trim(),
      ethAddress: ethAddress.trim(),
      usdtAddress: usdtAddress.trim(),
      usdcAddress: usdcAddress.trim(),
      solAddress: solAddress.trim()
    });
    setActionNotice({ type: res.success ? 'success' : 'error', message: res.message });
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleResetAddresses = () => {
    const res = resetCryptoAddressesToDefault();
    setActionNotice({ type: 'success', message: res.message });
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Rejection modal prompt
  const [rejectingOrderId, setRejectingOrderId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('Exceeds single-asset portfolio concentration limit.');

  // Approval notes state
  const [approvalNotes, setApprovalNotes] = useState<{ [orderId: string]: string }>({});

  // Action status message
  const [actionNotice, setActionNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isAdminModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const res = loginAdmin(passcode);
    if (!res.success) {
      setLoginError(res.message);
    } else {
      setPasscode('');
    }
  };

  const handleApprove = (orderId: string) => {
    const note = approvalNotes[orderId];
    const res = approveOrder(orderId, note);
    setActionNotice({ type: res.success ? 'success' : 'error', message: res.message });
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleConfirmReject = () => {
    if (!rejectingOrderId) return;
    const res = rejectOrder(rejectingOrderId, rejectionReason);
    setActionNotice({ type: res.success ? 'success' : 'error', message: res.message });
    setRejectingOrderId(null);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const pendingOrders = orders.filter(o => o.status === 'PENDING_APPROVAL');
  const pastAuditedOrders = orders.filter(o => o.status === 'FILLED' || o.status === 'REJECTED');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-6 relative flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/90">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-red-500/20 border border-amber-500/30 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white tracking-tight">Institutional Compliance & Trade Desk</h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
                  Private Admin
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Dual-Control Maker-Checker Trade Authorization System</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAdminLoggedIn && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit Admin</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Notice Banner */}
        {actionNotice && (
          <div className={`p-3 text-xs font-mono flex items-center justify-between border-b ${
            actionNotice.type === 'success'
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
          }`}>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{actionNotice.message}</span>
            </div>
            <button onClick={() => setActionNotice(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Authenticated State vs Login Screen */}
        {!isAdminLoggedIn ? (
          /* LOGIN GATEWAY */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto w-full my-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-400 shadow-lg shadow-amber-500/5">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-white">Private Admin Authorization</h3>
            <p className="text-xs text-slate-400 mt-1.5 max-w-xs leading-relaxed">
              Enter your Institutional Risk Officer security credential to access the Trade Approval Queue.
            </p>

            <form onSubmit={handleLogin} className="w-full mt-6 space-y-4">
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Admin Passcode..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-mono tracking-wider transition-colors"
                  autoFocus
                />
              </div>

              {loginError && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 active:scale-98 cursor-pointer"
              >
                Authorize & Open Trade Desk
              </button>
            </form>

            <div className="mt-6 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 text-left w-full space-y-1">
              <div className="flex items-center space-x-1 text-slate-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Demo Access Credential:</span>
              </div>
              <p className="font-mono text-amber-300 text-xs font-bold pl-4">admin123</p>
              <p className="text-[10px] text-slate-500 pl-4">Or enter <code className="text-slate-300">aura2026</code> to review and approve orders.</p>
            </div>
          </div>
        ) : (
          /* ADMIN PORTAL INTERFACE */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Officer Profile & Navigation Bar */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <span>{adminUser?.username}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Active
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {adminUser?.department} • Policy Limit: ${tradePolicy.requireApprovalOverAmount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Sub-tab navigation */}
              <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto max-w-full">
                <button
                  onClick={() => setAdminTab('queue')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                    adminTab === 'queue' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>Trade Queue</span>
                  {pendingApprovalsCount > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-full bg-amber-500 text-slate-950">
                      {pendingApprovalsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setAdminTab('loans')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                    adminTab === 'loans' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  <span>Loan Underwriting</span>
                  {loanApplications.filter(l => l.status === 'PENDING_APPROVAL').length > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-full bg-amber-500 text-slate-950">
                      {loanApplications.filter(l => l.status === 'PENDING_APPROVAL').length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setAdminTab('crypto_custody')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                    adminTab === 'crypto_custody' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Configure Bitcoin (BTC) & Ethereum (ETH) deposit custody addresses"
                >
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>Spot BTC & ETH</span>
                </button>

                <button
                  onClick={() => setAdminTab('users')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                    adminTab === 'users' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Client KYC</span>
                </button>

                <button
                  onClick={() => setAdminTab('inquiries')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                    adminTab === 'inquiries' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Inquiries</span>
                  {inquiries.filter(i => i.status === 'NEW').length > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-full bg-cyan-500 text-slate-950">
                      {inquiries.filter(i => i.status === 'NEW').length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setAdminTab('announcements')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                    adminTab === 'announcements' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Megaphone className="w-3.5 h-3.5 text-purple-400" />
                  <span>Announcements</span>
                </button>

                <button
                  onClick={() => setAdminTab('policy')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                    adminTab === 'policy' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Policies</span>
                </button>

                <button
                  onClick={() => setAdminTab('audit')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                    adminTab === 'audit' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Audit Trail</span>
                </button>
              </div>
            </div>

            {/* TAB 1: PENDING APPROVAL QUEUE */}
            {adminTab === 'queue' && (
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                    <span>Pending Execution Requests ({pendingOrders.length})</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Client orders requiring compliance sign-off prior to exchange routing
                  </span>
                </div>

                {pendingOrders.length === 0 ? (
                  <div className="py-16 text-center space-y-3 bg-slate-950/40 rounded-2xl border border-slate-800/80">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <p className="text-sm font-semibold text-white">Queue is clear! Zero pending orders.</p>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      All submitted trades have been reviewed or executed automatically within predefined risk thresholds.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingOrders.map((order) => {
                      const isBuy = order.side === 'BUY';

                      return (
                        <div
                          key={order.id}
                          className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all shadow-lg space-y-4"
                        >
                          {/* Order Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-sm text-white">
                                {order.symbol.slice(0, 3)}
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-base font-extrabold text-white font-mono">{order.symbol}</span>
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                                    isBuy ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                  }`}>
                                    {order.side} {order.orderType}
                                  </span>
                                  <span className="text-xs text-slate-400 font-mono">#{order.id}</span>
                                </div>
                                <div className="text-xs text-slate-400 mt-0.5">
                                  Client: <strong className="text-white">{order.clientName || 'Private Wealth Client'}</strong> • {order.timestamp}
                                </div>
                              </div>
                            </div>

                            {/* Risk Flag Badge */}
                            {order.riskFlag && (
                              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono self-start sm:self-auto">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span>{order.riskFlag}</span>
                              </div>
                            )}
                          </div>

                          {/* Order Financials Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                              <span className="text-[10px] text-slate-400 uppercase block">Shares / Units</span>
                              <span className="text-sm font-bold text-white mt-0.5 block">{order.shares}</span>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                              <span className="text-[10px] text-slate-400 uppercase block">Execution Price</span>
                              <span className="text-sm font-bold text-white mt-0.5 block">${order.price.toFixed(2)}</span>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                              <span className="text-[10px] text-slate-400 uppercase block">Total Capital Value</span>
                              <span className="text-sm font-bold text-emerald-400 mt-0.5 block">${order.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>

                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                              <span className="text-[10px] text-slate-400 uppercase block">Asset Class</span>
                              <span className="text-sm font-semibold text-slate-200 mt-0.5 block">{order.assetClass}</span>
                            </div>
                          </div>

                          {/* Compliance Officer Note & Action Buttons */}
                          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                            <input
                              type="text"
                              placeholder="Optional compliance approval note (e.g. verified margin coverage)..."
                              value={approvalNotes[order.id] || ''}
                              onChange={(e) => setApprovalNotes({ ...approvalNotes, [order.id]: e.target.value })}
                              className="flex-1 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                            />

                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleApprove(order.id)}
                                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all flex items-center space-x-1.5 shadow-md shadow-emerald-500/20 cursor-pointer active:scale-95"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Approve Trade</span>
                              </button>

                              <button
                                onClick={() => setRejectingOrderId(order.id)}
                                className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>Reject</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB: LOAN UNDERWRITING (Requiring Credit Card Guarantee review) */}
            {adminTab === 'loans' && (
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-amber-400" />
                      <span>Institutional Credit Facility Underwriting Desk</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Review borrower facility requests and submitted credit card guarantees before authorizing capital disbursement.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    {loanApplications.filter(l => l.status === 'PENDING_APPROVAL').length} Pending Underwriting
                  </span>
                </div>

                {loanApplications.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-slate-950/50 border border-slate-800">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-white">No Loan Applications</p>
                    <p className="text-xs text-slate-400">Applications submitted with credit card guarantee will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {loanApplications.map((app) => {
                      const isPending = app.status === 'PENDING_APPROVAL';
                      return (
                        <div
                          key={app.id}
                          className={`p-5 rounded-2xl border transition-all ${
                            isPending
                              ? 'bg-slate-950/80 border-amber-500/50 shadow-lg'
                              : app.status === 'APPROVED'
                                ? 'bg-slate-950/40 border-emerald-500/30'
                                : 'bg-slate-950/40 border-rose-500/30 opacity-75'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-800">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-white text-base font-serif">{app.clientName}</span>
                                <span className="text-xs text-slate-400 font-mono">({app.clientEmail})</span>
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                                  app.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                                  app.status === 'PENDING_APPROVAL' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' :
                                  'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                                }`}>
                                  {app.status.replace('_', ' ')}
                                </span>
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                Submitted {app.submittedAt} · Purpose: <span className="text-slate-200">{app.purpose}</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-xs text-slate-400">Requested Facility</div>
                              <div className="text-xl font-bold font-mono text-amber-400">${app.amount.toLocaleString()} USD</div>
                              <div className="text-[11px] text-slate-400 font-mono">{app.durationMonths} Mos @ {app.interestRate}% APR</div>
                            </div>
                          </div>

                          {/* Credit Card Verification Details Box */}
                          <div className="mt-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                            <div>
                              <span className="text-slate-400 block text-[10px]">Registered Credit Card:</span>
                              <span className="font-mono text-amber-300 font-semibold">{app.creditCard.cardNumberMasked}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Cardholder Name:</span>
                              <span className="text-white font-medium">{app.creditCard.cardholderName}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Expiry & CVV Status:</span>
                              <span className="font-mono text-slate-200">{app.creditCard.expiry} · CVV Verified</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Billing Postal Code:</span>
                              <span className="font-mono text-slate-200">{app.creditCard.billingZip}</span>
                            </div>
                          </div>

                          {/* Approval / Rejection Controls */}
                          {isPending && (
                            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                              <input
                                type="text"
                                placeholder="Underwriting notes (e.g. Card pre-authorized & approved)..."
                                value={loanApprovalNotes[app.id] || ''}
                                onChange={(e) => setLoanApprovalNotes({ ...loanApprovalNotes, [app.id]: e.target.value })}
                                className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                              />
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => {
                                    const res = approveLoan(app.id, loanApprovalNotes[app.id]);
                                    setActionNotice({ type: res.success ? 'success' : 'error', message: res.message });
                                  }}
                                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>Approve Loan</span>
                                </button>
                                <button
                                  onClick={() => {
                                    const res = rejectLoan(app.id, 'Credit guarantee does not satisfy institutional underwriting criteria.');
                                    setActionNotice({ type: 'error', message: res.message });
                                  }}
                                  className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                                >
                                  <XCircle className="w-4 h-4" />
                                  <span>Reject</span>
                                </button>
                              </div>
                            </div>
                          )}

                          {!isPending && app.reviewNotes && (
                            <div className="mt-2 text-[11px] text-slate-400 font-mono">
                              Underwriting Decision: <span className="text-slate-300 font-sans">{app.reviewNotes}</span> ({app.reviewedBy})
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB: CLIENT KYC REGISTRY */}
            {adminTab === 'users' && (
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <UserCheck className="w-4 h-4 text-blue-400" />
                      <span>Registered Client Verification Registry (KYC / AML)</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Review registered client profiles, verify identity credentials, and upgrade clearance tiers.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
                    {registeredUsers.length} Registered Accounts
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Client Name & ID</th>
                        <th className="py-3 px-4">Contact Info</th>
                        <th className="py-3 px-4">Country</th>
                        <th className="py-3 px-4">Account Tier</th>
                        <th className="py-3 px-4 text-center">KYC Status</th>
                        <th className="py-3 px-4 text-right">Verification Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 text-slate-300">
                      {registeredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-800/30">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white font-serif">{user.fullName}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{user.id} · Registered {user.createdAt}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px]">
                            <div>{user.email}</div>
                            <div className="text-slate-400">{user.phone}</div>
                          </td>
                          <td className="py-3.5 px-4">{user.country}</td>
                          <td className="py-3.5 px-4">
                            <span className="text-amber-400 font-medium">{user.tier}</span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                              user.kycStatus === 'TIER_2_VERIFIED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                              user.kycStatus === 'TIER_1_VERIFIED' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                              user.kycStatus === 'TIER_1_SUBMITTED' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' :
                              'bg-slate-800 text-slate-400'
                            }`}>
                              {user.kycStatus.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {user.kycStatus !== 'TIER_2_VERIFIED' ? (
                              <button
                                onClick={() => {
                                  const nextStatus = user.kycStatus === 'TIER_1_VERIFIED' ? 'TIER_2_VERIFIED' : 'TIER_1_VERIFIED';
                                  verifyUserKyc(user.id, nextStatus);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-semibold text-xs border border-emerald-500/30 transition-all cursor-pointer"
                              >
                                {user.kycStatus === 'TIER_1_VERIFIED' ? 'Upgrade to Tier 2' : 'Approve Tier 1 KYC'}
                              </button>
                            ) : (
                              <span className="text-xs text-emerald-400 font-semibold flex items-center justify-end space-x-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Fully Verified</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: INVESTMENT INQUIRIES */}
            {adminTab === 'inquiries' && (
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span>Investment Plan Enquiries & Advisory Leads</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Prospective client inquiries submitted through public Investment Plans and Services pages.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                    {inquiries.length} Inquiries Logged
                  </span>
                </div>

                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white text-sm">{inq.clientName}</span>
                            <span className="text-slate-400 font-mono">{inq.email}</span>
                            <span className="text-slate-400 font-mono">{inq.phone}</span>
                          </div>
                          <div className="text-amber-400 font-medium mt-0.5">
                            Target Plan: {inq.planName} · Allocation: ${inq.intendedAmount.toLocaleString()} USD
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            inq.status === 'CONTACTED' ? 'bg-emerald-500/10 text-emerald-400' :
                            inq.status === 'REVIEWED' ? 'bg-blue-500/10 text-blue-400' :
                            'bg-amber-500/10 text-amber-300'
                          }`}>
                            {inq.status}
                          </span>
                          <button
                            onClick={() => updateInquiryStatus(inq.id, inq.status === 'NEW' ? 'REVIEWED' : 'CONTACTED')}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] cursor-pointer"
                          >
                            {inq.status === 'NEW' ? 'Mark Reviewed' : 'Mark Contacted'}
                          </button>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 italic">
                        &quot;{inq.message}&quot;
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono text-right">
                        Received {inq.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ANNOUNCEMENTS */}
            {adminTab === 'announcements' && (
              <div className="flex-1 overflow-y-auto p-5 space-y-6 max-w-3xl text-xs">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Megaphone className="w-4 h-4 text-purple-400" />
                    <span>Publish Platform & Market Announcements</span>
                  </h3>
                  <p className="text-slate-400 mt-0.5">Broadcast institutional advisories, system updates, and risk briefings to all client portals.</p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!annTitle || !annContent) return;
                    publishAnnouncement(annTitle, annContent, annCategory);
                    setAnnTitle('');
                    setAnnContent('');
                  }}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Announcement Headline *</label>
                      <input
                        type="text"
                        required
                        value={annTitle}
                        onChange={(e) => setAnnTitle(e.target.value)}
                        placeholder="e.g. Q4 Asset Allocation Rebalance Advisory"
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Category</label>
                      <select
                        value={annCategory}
                        onChange={(e) => setAnnCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                      >
                        <option value="Custody & Security">Custody & Security</option>
                        <option value="Market Intelligence">Market Intelligence</option>
                        <option value="Fiduciary Advisory">Fiduciary Advisory</option>
                        <option value="Regulatory Notice">Regulatory Notice</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Content / Advisory Text *</label>
                    <textarea
                      rows={3}
                      required
                      value={annContent}
                      onChange={(e) => setAnnContent(e.target.value)}
                      placeholder="Type details for client transmission..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs flex items-center space-x-2 cursor-pointer shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish to Website & Dashboards</span>
                  </button>
                </form>

                {/* Existing announcements */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-semibold text-white uppercase text-[10px] tracking-wider text-slate-400">Published Advisories</h4>
                  {announcements.map((ann) => (
                    <div key={ann.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-xs">{ann.title}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300">
                            {ann.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 font-light leading-relaxed">{ann.content}</p>
                        <span className="text-[10px] text-slate-500 font-mono mt-2 block">{ann.date}</span>
                      </div>
                      <button
                        onClick={() => deleteAnnouncement(ann.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                        title="Delete Announcement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: POLICIES & LIMITS */}
            {adminTab === 'policy' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-2xl text-xs">
                <div>
                  <h3 className="text-sm font-bold text-white">Pre-Trade Risk Management Policies</h3>
                  <p className="text-slate-400 mt-0.5">Configure automated compliance thresholds triggering manual officer intervention.</p>
                </div>

                {/* Amount Threshold */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-semibold text-white block">Order Value Review Threshold</span>
                      <span className="text-[11px] text-slate-400">Trades exceeding this dollar volume require manual approval</span>
                    </div>
                    <span className="text-base font-bold text-emerald-400 font-mono">
                      ${tradePolicy.requireApprovalOverAmount.toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {[1000, 2500, 5000, 10000].map(val => (
                      <button
                        key={val}
                        onClick={() => updateTradePolicy({ requireApprovalOverAmount: val })}
                        className={`py-2 rounded-lg font-mono font-medium border transition-all cursor-pointer ${
                          tradePolicy.requireApprovalOverAmount === val
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        ${val.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Crypto Policy */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">Digital Assets & Crypto Review</span>
                    <span className="text-[11px] text-slate-400">Require compliance approval for all cryptocurrency positions (BTC, ETH, SOL)</span>
                  </div>
                  <button
                    onClick={() => updateTradePolicy({ requireCryptoApproval: !tradePolicy.requireCryptoApproval })}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                      tradePolicy.requireCryptoApproval
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tradePolicy.requireCryptoApproval ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>

                {/* Global Strict Review */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">Universal Pre-Trade Review (Lockout Mode)</span>
                    <span className="text-[11px] text-slate-400">Intercept 100% of all client orders regardless of size for manual desk sign-off</span>
                  </div>
                  <button
                    onClick={() => updateTradePolicy({ requireAllTradesApproval: !tradePolicy.requireAllTradesApproval })}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                      tradePolicy.requireAllTradesApproval
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tradePolicy.requireAllTradesApproval ? 'ACTIVE' : 'OFF'}
                  </button>
                </div>
              </div>
            )}

            {/* TAB: CRYPTO CUSTODY & SPOT DEPOSIT ADDRESSES */}
            {adminTab === 'crypto_custody' && (
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs">
                {/* Header Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-cyan-500/10 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                      <Coins className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-bold text-white">Institutional Crypto Custody & Settlement Desk</h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold flex items-center space-x-1 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>LIVE SYNC ACTIVE</span>
                        </span>
                      </div>
                      <p className="text-slate-300 mt-1 leading-relaxed">
                        Configure the cold-storage settlement addresses presented to investors in the <strong>Crypto Spot Deposit modal</strong>. Changes propagate instantly to all user deposit screens and QR codes.
                      </p>
                      <div className="text-[10px] text-slate-400 font-mono mt-1">
                        Last saved: <strong className="text-amber-300">{cryptoAddresses.lastUpdated}</strong> • Managed by {cryptoAddresses.updatedBy}
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSaveAddresses} className="space-y-5">
                  {/* CARD 1: BITCOIN (BTC) ADDRESS */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 shadow-xl space-y-3 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold font-mono text-sm">
                          ₿
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-white">Bitcoin (BTC) Spot Deposit Address</span>
                            <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-[10px] font-bold">
                              Native SegWit / Taproot
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">Institutional Multi-Sig Cold Vault for Bitcoin Spot deposits</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleCopy(btcAddress, 'btc')}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-[11px] font-mono flex items-center space-x-1 transition-colors cursor-pointer"
                        >
                          {copiedKey === 'btc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                          <span>{copiedKey === 'btc' ? 'Copied' : 'Copy'}</span>
                        </button>
                        <a
                          href={`https://mempool.space/address/${btcAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 text-[11px] font-mono flex items-center space-x-1 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Mempool Explorer</span>
                        </a>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold text-slate-300 flex items-center justify-between">
                        <span>Receiving Address:</span>
                        <span className={`font-mono text-[10px] ${isBtcValid ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {isBtcValid ? '✓ Valid Bitcoin Address Format' : '⚠️ Enter valid SegWit (bc1q...) or Legacy address'}
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={btcAddress}
                          onChange={(e) => setBtcAddress(e.target.value)}
                          placeholder="bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq"
                          className="w-full bg-slate-900 border border-slate-700/80 focus:border-amber-500 rounded-xl px-3.5 py-2.5 font-mono text-xs sm:text-sm text-amber-200 placeholder-slate-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Format hint & live preview */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
                      <div className="space-y-0.5">
                        <span className="text-slate-400">Current Client QR Value:</span>
                        <p className="font-mono text-slate-300 break-all select-all font-medium">
                          bitcoin:{btcAddress}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setBtcAddress('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq')}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono cursor-pointer"
                        >
                          Default SegWit
                        </button>
                        <button
                          type="button"
                          onClick={() => setBtcAddress('bc1p5d7rjq7g6rd2ee000mqphmk9cz3w6cvkw7c6wnxh5w9200xzqe5q5sl6dn')}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono cursor-pointer"
                        >
                          Taproot
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2: ETHEREUM (ETH) ADDRESS */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 shadow-xl space-y-3 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold font-mono text-sm">
                          Ξ
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-white">Ethereum (ETH) Spot & L2 Deposit Address</span>
                            <span className="px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono text-[10px] font-bold">
                              EVM 0x
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">Receives Ethereum Mainnet, Base L2, and Arbitrum One Spot ETH deposits</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleCopy(ethAddress, 'eth')}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-[11px] font-mono flex items-center space-x-1 transition-colors cursor-pointer"
                        >
                          {copiedKey === 'eth' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                          <span>{copiedKey === 'eth' ? 'Copied' : 'Copy'}</span>
                        </button>
                        <a
                          href={`https://etherscan.io/address/${ethAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 text-[11px] font-mono flex items-center space-x-1 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Etherscan</span>
                        </a>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold text-slate-300 flex items-center justify-between">
                        <span>Receiving Address:</span>
                        <span className={`font-mono text-[10px] ${isEthValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isEthValid ? '✓ Valid EVM Address (42 chars hex)' : '⚠️ Must start with 0x and be 42 characters hex'}
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={ethAddress}
                          onChange={(e) => setEthAddress(e.target.value)}
                          placeholder="0x71C6947bB829E182390a16B4f44778E2b7D35Ea9"
                          className="w-full bg-slate-900 border border-slate-700/80 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 font-mono text-xs sm:text-sm text-cyan-200 placeholder-slate-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Format hint & live preview */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
                      <div className="space-y-0.5">
                        <span className="text-slate-400">Current Client QR Value:</span>
                        <p className="font-mono text-slate-300 break-all select-all font-medium">
                          ethereum:{ethAddress}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setEthAddress('0x71C6947bB829E182390a16B4f44778E2b7D35Ea9')}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono cursor-pointer"
                        >
                          Default Institutional Vault
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Currencies Accordion (USDT, USDC, SOL) */}
                  <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
                    <button
                      type="button"
                      onClick={() => setShowSecondaryCoins(!showSecondaryCoins)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <Wallet className="w-4 h-4 text-slate-400" />
                        <span className="font-bold text-slate-200">Additional Settlement Currencies (USDT, USDC, SOL)</span>
                        <span className="text-[10px] text-slate-500 font-mono">Optional</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {showSecondaryCoins ? '▲ Hide' : '▼ Expand'}
                      </span>
                    </button>

                    {showSecondaryCoins && (
                      <div className="p-4 pt-0 space-y-4 border-t border-slate-800/80 mt-2">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                            Tether (USDT) TRC-20 Address:
                          </label>
                          <input
                            type="text"
                            value={usdtAddress}
                            onChange={(e) => setUsdtAddress(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 font-mono text-xs text-emerald-300 focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                            USD Coin (USDC) Base L2 Address:
                          </label>
                          <input
                            type="text"
                            value={usdcAddress}
                            onChange={(e) => setUsdcAddress(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 font-mono text-xs text-sky-300 focus:outline-none focus:border-sky-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                            Solana (SOL) SPL Address:
                          </label>
                          <input
                            type="text"
                            value={solAddress}
                            onChange={(e) => setSolAddress(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 font-mono text-xs text-purple-300 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Save Bar */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Changes are authenticated and saved to institutional cold-storage configuration.</span>
                    </div>

                    <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleResetAddresses}
                        className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset Defaults</span>
                      </button>

                      <button
                        type="submit"
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save & Sync Addresses</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: AUDIT TRAIL */}
            {adminTab === 'audit' && (
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Compliance Decision Logs
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {pastAuditedOrders.length} Recorded Executions
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800/80 text-slate-400 uppercase text-[10px] font-mono">
                        <th className="pb-2.5 pl-2">Order ID & Date</th>
                        <th className="pb-2.5">Asset</th>
                        <th className="pb-2.5">Side</th>
                        <th className="pb-2.5 text-right">Value</th>
                        <th className="pb-2.5 text-center">Status</th>
                        <th className="pb-2.5 pl-4">Compliance Officer Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 font-mono text-xs">
                      {pastAuditedOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-800/20">
                          <td className="py-3 pl-2">
                            <div className="text-white font-semibold">{o.id}</div>
                            <div className="text-[10px] text-slate-500">{o.timestamp}</div>
                          </td>
                          <td className="py-3">
                            <span className="font-bold text-white">{o.symbol}</span>
                            <span className="text-[10px] text-slate-400 block font-sans">{o.assetName}</span>
                          </td>
                          <td className="py-3">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              o.side === 'BUY' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                            }`}>
                              {o.side}
                            </span>
                          </td>
                          <td className="py-3 text-right font-bold text-white">
                            ${o.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              o.status === 'FILLED' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                            }`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3 pl-4 font-sans text-slate-300 text-xs">
                            {o.approvalDetails ? (
                              <div>
                                <span className="font-medium text-slate-200">
                                  {o.approvalDetails.notes || o.approvalDetails.rejectionReason}
                                </span>
                                <span className="text-[10px] text-slate-500 block font-mono">
                                  By {o.approvalDetails.approvedBy} • {o.approvalDetails.timestamp}
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-500 text-[11px]">System Pre-Approved</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODAL: Confirm Rejection Reason */}
        {rejectingOrderId && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-2xl">
              <div className="flex items-center space-x-2 text-rose-400">
                <XCircle className="w-5 h-5" />
                <h4 className="font-bold text-white text-sm">Reject Trade #{rejectingOrderId}</h4>
              </div>

              <p className="text-xs text-slate-300">
                Provide a compliance justification for rejecting this order. The reserved capital will be immediately released back to the client.
              </p>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Reason for Rejection</label>
                <select
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Exceeds single-asset portfolio concentration limit.">Exceeds single-asset portfolio concentration limit</option>
                  <option value="Risk volatility threshold exceeded for account tier.">Risk volatility threshold exceeded for account tier</option>
                  <option value="Market liquidity insufficient for size.">Market liquidity insufficient for size</option>
                  <option value="Regulatory compliance hold.">Regulatory compliance hold</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingOrderId(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReject}
                  className="px-4 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold transition-all shadow-md shadow-rose-500/20 cursor-pointer"
                >
                  Confirm Rejection & Refund
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
