import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  Asset, 
  Holding, 
  Order, 
  InvestmentGoal, 
  RecurringPlan, 
  OrderSide, 
  OrderType,
  AIStockAnalysis,
  AIPortfolioAudit,
  AdminUser,
  TradeApprovalPolicy,
  ActivityItem,
  PlatformToast,
  CryptoDepositParams,
  CryptoDepositAddresses,
  PublicPage,
  InvestmentPlan,
  WealthService,
  LoanApplication,
  InvestmentInquiry,
  KycStatus,
  UserProfile
} from '../types/investment';
import { 
  INITIAL_ASSETS, 
  INITIAL_HOLDINGS, 
  INITIAL_ORDERS, 
  INITIAL_GOALS, 
  INITIAL_RECURRING_PLANS,
  INVESTMENT_PLANS,
  WEALTH_SERVICES,
  INITIAL_LOAN_APPLICATIONS,
  INITIAL_INQUIRIES
} from '../data/mockData';
import confetti from 'canvas-confetti';
import { generateSimulatedTxHash } from '../data/cryptoPaymentData';

interface PlaceOrderParams {
  symbol: string;
  side: OrderSide;
  orderType: OrderType;
  shares: number;
  price: number;
  limitPrice?: number;
}

interface InvestmentContextType {
  assets: Asset[];
  holdings: Holding[];
  orders: Order[];
  goals: InvestmentGoal[];
  recurringPlans: RecurringPlan[];
  cashBalance: number;
  hysaApy: number;
  accruedInterest: number;
  portfolioValue: number;
  totalNetWorth: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  dayChange: number;
  dayChangePercent: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset | null) => void;
  isTradeModalOpen: boolean;
  setIsTradeModalOpen: (open: boolean) => void;
  tradingAsset: Asset | null;
  setTradingAsset: (asset: Asset | null) => void;
  isTransferModalOpen: boolean;
  setIsTransferModalOpen: (open: boolean) => void;
  isAuditModalOpen: boolean;
  setIsAuditModalOpen: (open: boolean) => void;
  isAICopilotOpen: boolean;
  setIsAICopilotOpen: (open: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isBtcWalletModalOpen: boolean;
  setIsBtcWalletModalOpen: (open: boolean) => void;
  liveMarketTickerActive: boolean;
  setLiveMarketTickerActive: (active: boolean) => void;
  placeOrder: (params: PlaceOrderParams) => { success: boolean; message: string; requiresApproval?: boolean };
  depositCash: (amount: number, bankName: string) => void;
  depositCrypto: (params: CryptoDepositParams) => { success: boolean; message: string };
  withdrawCash: (amount: number, bankName: string) => { success: boolean; message: string };
  addRecurringPlan: (plan: Omit<RecurringPlan, 'id' | 'nextExecution' | 'active'>) => void;
  toggleRecurringPlan: (id: string) => void;
  deleteRecurringPlan: (id: string) => void;
  addGoal: (goal: Omit<InvestmentGoal, 'id' | 'currentAmount'>) => void;
  rebalancePortfolio: () => { success: boolean; message: string; tradesExecuted: number };
  openTrade: (asset: Asset, side?: OrderSide) => void;
  fetchAIStockAnalysis: (asset: Asset) => Promise<AIStockAnalysis | null>;
  fetchAIPortfolioAudit: () => Promise<AIPortfolioAudit | null>;
  sendAIChatMessage: (message: string) => Promise<string>;

  // Private Admin & Trade Approval Desk
  isAdminLoggedIn: boolean;
  adminUser: AdminUser | null;
  loginAdmin: (passcode: string) => { success: boolean; message: string };
  logoutAdmin: () => void;
  tradePolicy: TradeApprovalPolicy;
  updateTradePolicy: (policy: Partial<TradeApprovalPolicy>) => void;
  pendingApprovalsCount: number;
  approveOrder: (orderId: string, notes?: string) => { success: boolean; message: string };
  rejectOrder: (orderId: string, reason: string) => { success: boolean; message: string };

  // Crypto Spot Custody & Admin Deposit Addresses
  cryptoAddresses: CryptoDepositAddresses;
  updateCryptoAddresses: (newAddresses: Partial<CryptoDepositAddresses>) => { success: boolean; message: string };
  resetCryptoAddressesToDefault: () => { success: boolean; message: string };

  // Front-End Landing Page & Navigation
  viewMode: 'landing' | 'app';
  setViewMode: (mode: 'landing' | 'app') => void;
  publicPage: import('../types/investment').PublicPage;
  setPublicPage: (page: import('../types/investment').PublicPage) => void;
  isAuthenticated: boolean;
  currentUser: { name: string; email: string; tier: string } | null;
  userProfile: import('../types/investment').UserProfile | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'signin' | 'signup';
  setAuthModalMode: (mode: 'signin' | 'signup') => void;
  loginUser: (email: string, name?: string) => void;
  registerUser: (params: { fullName: string; email: string; phone: string; country: string; password: string }) => { success: boolean; message: string };
  logoutUser: () => void;

  // Investment Plans & Services Data
  investmentPlans: import('../types/investment').InvestmentPlan[];
  wealthServices: import('../types/investment').WealthService[];
  
  // Inquiries
  inquiries: import('../types/investment').InvestmentInquiry[];
  submitInquiry: (inquiry: Omit<import('../types/investment').InvestmentInquiry, 'id' | 'timestamp' | 'status'>) => { success: boolean; message: string };
  updateInquiryStatus: (id: string, status: 'NEW' | 'REVIEWED' | 'CONTACTED') => void;
  isInquiryModalOpen: boolean;
  setIsInquiryModalOpen: (open: boolean) => void;
  selectedPlanForInquiry: import('../types/investment').InvestmentPlan | null;
  setSelectedPlanForInquiry: (plan: import('../types/investment').InvestmentPlan | null) => void;

  // Loans with Credit Card Underwriting
  loanApplications: import('../types/investment').LoanApplication[];
  isLoanModalOpen: boolean;
  setIsLoanModalOpen: (open: boolean) => void;
  applyForLoan: (params: {
    amount: number;
    purpose: string;
    durationMonths: number;
    creditCard: {
      cardNumber: string;
      cardholderName: string;
      expiry: string;
      cvv: string;
      billingZip: string;
    };
  }) => { success: boolean; message: string };
  approveLoan: (loanId: string, notes?: string) => { success: boolean; message: string };
  rejectLoan: (loanId: string, reason: string) => { success: boolean; message: string };

  // Registered Clients KYC & Admin Management
  registeredUsers: import('../types/investment').UserProfile[];
  verifyUserKyc: (userId: string, newStatus: import('../types/investment').KycStatus) => { success: boolean; message: string };

  // Platform Announcements
  announcements: { id: string; title: string; content: string; date: string; category: string }[];
  publishAnnouncement: (title: string, content: string, category: string) => { success: boolean; message: string };
  deleteAnnouncement: (id: string) => void;

  // Legal Modal
  isLegalModalOpen: boolean;
  setIsLegalModalOpen: (open: boolean) => void;
  legalModalTab: 'terms' | 'privacy' | 'risk' | 'disclaimer';
  setLegalModalTab: (tab: 'terms' | 'privacy' | 'risk' | 'disclaimer') => void;

  // Active Interactive Platform Feed & Toasts
  activityFeed: ActivityItem[];
  activeToast: PlatformToast | null;
  dismissToast: () => void;
  isNewMemberModalOpen: boolean;
  setIsNewMemberModalOpen: (open: boolean) => void;
  claimNewMemberBonus: (choice: 'CASH_MATCH' | 'FREE_STOCK_NVDA') => void;
  hasClaimedWelcomeBonus: boolean;
}

const INITIAL_ACTIVITY_FEED: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'NEW_MEMBER',
    title: 'New Member Enrolled',
    description: 'Marcus Tremaine joined Aura Wealth and initiated Cash Sweep (4.85% APY).',
    timeAgo: '2m ago',
    badgeColor: 'text-cyan-400 bg-cyan-500/10'
  },
  {
    id: 'act-2',
    type: 'TRADE_PENDING',
    title: 'Pre-Trade Review Triggered',
    description: 'Order #ord-103: BUY 45 NVDA ($6,221.25) submitted for Compliance Desk approval.',
    timeAgo: '5m ago',
    badgeColor: 'text-amber-400 bg-amber-500/10'
  },
  {
    id: 'act-3',
    type: 'TRADE_APPROVED',
    title: 'Order Executed by Compliance',
    description: 'Order #ord-101: 2.5 VOO ($1,312.00) verified and executed across exchange routers.',
    timeAgo: '14m ago',
    badgeColor: 'text-emerald-400 bg-emerald-500/10'
  },
  {
    id: 'act-4',
    type: 'DEPOSIT',
    title: 'Cash Sweep Transfer',
    description: 'Elena R. deposited $25,000 into multi-bank FDIC insured cash program.',
    timeAgo: '28m ago',
    badgeColor: 'text-teal-400 bg-teal-500/10'
  }
];

export const DEFAULT_CRYPTO_ADDRESSES: CryptoDepositAddresses = {
  btcAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
  ethAddress: '0x71C6947bB829E182390a16B4f44778E2b7D35Ea9',
  usdtAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t7',
  usdcAddress: '0x3d94A8E0296E06f3659223F629F742b79aB17B9C',
  solAddress: 'SoL9vQpG7W1a4T6y8d2Z5b9C3e1F7a8B4c2E6f1D3a5',
  lastUpdated: 'Nov 01, 2026, 09:30 AM UTC',
  updatedBy: 'Institutional Risk Officer (Desk 4)'
};

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

export const InvestmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [holdings, setHoldings] = useState<Holding[]>(INITIAL_HOLDINGS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [goals, setGoals] = useState<InvestmentGoal[]>(INITIAL_GOALS);
  const [recurringPlans, setRecurringPlans] = useState<RecurringPlan[]>(INITIAL_RECURRING_PLANS);
  const [cashBalance, setCashBalance] = useState<number>(14250.00);
  const [hysaApy] = useState<number>(4.85);
  const [accruedInterest, setAccruedInterest] = useState<number>(128.45);
  const [activeTab, setActiveTab] = useState<string>('portfolio');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [tradingAsset, setTradingAsset] = useState<Asset | null>(null);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState<boolean>(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState<boolean>(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isAICopilotOpen, setIsAICopilotOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isBtcWalletModalOpen, setIsBtcWalletModalOpen] = useState<boolean>(false);
  const [liveMarketTickerActive, setLiveMarketTickerActive] = useState<boolean>(true);

  // Admin & Compliance State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [tradePolicy, setTradePolicy] = useState<TradeApprovalPolicy>({
    requireApprovalOverAmount: 2500,
    requireCryptoApproval: true,
    requireAllTradesApproval: false,
    requireNewMemberApproval: true
  });

  // Spot Crypto Custody Addresses (Configurable by Admin)
  const [cryptoAddresses, setCryptoAddresses] = useState<CryptoDepositAddresses>(() => {
    try {
      const saved = localStorage.getItem('aura_crypto_deposit_addresses');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return DEFAULT_CRYPTO_ADDRESSES;
  });

  // Front-End Landing Page & Navigation State
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [publicPage, setPublicPage] = useState<PublicPage>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; tier: string } | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    return {
      id: 'usr-001',
      fullName: 'Favour Adaigbe',
      email: 'favouradaigbe0@gmail.com',
      phone: '+1 (555) 234-5678',
      country: 'United States',
      tier: 'Private Wealth Tier',
      kycStatus: 'TIER_2_VERIFIED',
      createdAt: 'Oct 12, 2026',
      twoFactorEnabled: true,
      actualCashBalance: 14250.00,
      simulatedPortfolioValue: 128640.00
    };
  });

  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>([
    {
      id: 'usr-001',
      fullName: 'Favour Adaigbe',
      email: 'favouradaigbe0@gmail.com',
      phone: '+1 (555) 234-5678',
      country: 'United States',
      tier: 'Private Wealth Tier',
      kycStatus: 'TIER_2_VERIFIED',
      createdAt: 'Oct 12, 2026',
      twoFactorEnabled: true,
      actualCashBalance: 14250.00,
      simulatedPortfolioValue: 128640.00
    },
    {
      id: 'usr-002',
      fullName: 'Julian Sterling',
      email: 'j.sterling@aetwealthcapital.com',
      phone: '+44 20 7946 0912',
      country: 'United Kingdom',
      tier: 'Institutional Sovereign',
      kycStatus: 'TIER_1_VERIFIED',
      createdAt: 'Nov 01, 2026',
      twoFactorEnabled: true,
      actualCashBalance: 52000.00,
      simulatedPortfolioValue: 340000.00
    },
    {
      id: 'usr-003',
      fullName: 'Claire Vance',
      email: 'claire.vance@vancetech.io',
      phone: '+1 (415) 555-8821',
      country: 'United States',
      tier: 'Growth Investment Tier',
      kycStatus: 'TIER_1_SUBMITTED',
      createdAt: 'Yesterday',
      twoFactorEnabled: false,
      actualCashBalance: 10500.00,
      simulatedPortfolioValue: 74200.00
    }
  ]);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signup');

  // Investment Plans & Services Data
  const [investmentPlans] = useState<InvestmentPlan[]>(INVESTMENT_PLANS);
  const [wealthServices] = useState<WealthService[]>(WEALTH_SERVICES);

  // Inquiries
  const [inquiries, setInquiries] = useState<InvestmentInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('aet_inquiries');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_INQUIRIES;
  });
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [selectedPlanForInquiry, setSelectedPlanForInquiry] = useState<InvestmentPlan | null>(null);

  // Loan Facility (Requires Credit Card Submission for Compliance Underwriting)
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>(() => {
    try {
      const saved = localStorage.getItem('aet_loan_applications');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_LOAN_APPLICATIONS;
  });
  const [isLoanModalOpen, setIsLoanModalOpen] = useState<boolean>(false);

  // Platform Announcements
  const [announcements, setAnnouncements] = useState([
    {
      id: 'ann-1',
      title: 'AETWEALTHCAPITAL Spot Digital Custody Upgrade',
      content: 'Cold storage multi-signature architecture active for Bitcoin (BTC) and Ethereum (ETH) holdings with zero counterparty lending exposure.',
      date: 'Nov 02, 2026',
      category: 'Custody & Security'
    },
    {
      id: 'ann-2',
      title: 'Q4 2026 Macro Asset Allocation Perspective',
      content: 'Senior Investment Committee maintains balanced duration fixed-income weighting paired with high-quality semiconductor technology allocation.',
      date: 'Oct 28, 2026',
      category: 'Market Intelligence'
    }
  ]);

  // Legal Disclosures Modal
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<'terms' | 'privacy' | 'risk' | 'disclaimer'>('terms');

  // Interactive Live Platform Activity & Toasts
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>(INITIAL_ACTIVITY_FEED);
  const [activeToast, setActiveToast] = useState<PlatformToast | null>(null);
  const [isNewMemberModalOpen, setIsNewMemberModalOpen] = useState<boolean>(false);
  const [hasClaimedWelcomeBonus, setHasClaimedWelcomeBonus] = useState<boolean>(false);

  // Dismiss Toast helper
  const dismissToast = () => {
    setActiveToast(null);
  };

  // Submit Investment Inquiry
  const submitInquiry = (inquiryData: Omit<InvestmentInquiry, 'id' | 'timestamp' | 'status'>) => {
    const newInquiry: InvestmentInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      timestamp: 'Just now',
      status: 'NEW'
    };
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    try {
      localStorage.setItem('aet_inquiries', JSON.stringify(updated));
    } catch {}

    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'NEW_MEMBER',
      title: 'Mandate Consultation Requested',
      description: `${inquiryData.clientName} submitted an advisory inquiry for ${inquiryData.planName || 'Custom Portfolio'}.`,
      timeAgo: 'Just now',
      badgeColor: 'text-amber-400 bg-amber-500/10'
    };
    setActivityFeed(prev => [newAct, ...prev.slice(0, 9)]);

    setActiveToast({
      id: `toast-${Date.now()}`,
      title: '📋 Investment Enquiry Submitted',
      message: `Thank you ${inquiryData.clientName}. An AETWEALTHCAPITAL fiduciary advisor will review your request and contact you within 1 business day.`,
      type: 'admin_alert'
    });

    setIsInquiryModalOpen(false);
    return { success: true, message: 'Enquiry submitted successfully.' };
  };

  const updateInquiryStatus = (id: string, status: 'NEW' | 'REVIEWED' | 'CONTACTED') => {
    const updated = inquiries.map(inq => inq.id === id ? { ...inq, status } : inq);
    setInquiries(updated);
    try {
      localStorage.setItem('aet_inquiries', JSON.stringify(updated));
    } catch {}
  };

  // Loan Application with Credit Card Guarantee
  const applyForLoan = (params: {
    amount: number;
    purpose: string;
    durationMonths: number;
    creditCard: {
      cardNumber: string;
      cardholderName: string;
      expiry: string;
      cvv: string;
      billingZip: string;
    };
  }) => {
    const cleanNum = params.creditCard.cardNumber.replace(/\s+/g, '');
    const last4 = cleanNum.slice(-4) || '8842';
    const maskedCard = `•••• •••• •••• ${last4}`;

    const newApp: LoanApplication = {
      id: `loan-${Date.now()}`,
      userId: currentUser?.email || 'usr-guest',
      clientName: params.creditCard.cardholderName || currentUser?.name || 'Verified Member',
      clientEmail: currentUser?.email || 'client@aetwealthcapital.com',
      amount: params.amount,
      purpose: params.purpose,
      durationMonths: params.durationMonths,
      interestRate: params.amount >= 50000 ? 5.8 : 6.4,
      creditCard: {
        cardNumberMasked: maskedCard,
        cardholderName: params.creditCard.cardholderName,
        expiry: params.creditCard.expiry,
        cvvMasked: '•••',
        billingZip: params.creditCard.billingZip
      },
      status: 'PENDING_APPROVAL',
      submittedAt: 'Just now'
    };

    const updated = [newApp, ...loanApplications];
    setLoanApplications(updated);
    try {
      localStorage.setItem('aet_loan_applications', JSON.stringify(updated));
    } catch {}

    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'TRADE_PENDING',
      title: 'Credit Facility Underwriting Initiated',
      description: `${newApp.clientName} requested $${params.amount.toLocaleString()} liquidity facility with credit card guarantee.`,
      timeAgo: 'Just now',
      badgeColor: 'text-amber-400 bg-amber-500/10'
    };
    setActivityFeed(prev => [newAct, ...prev.slice(0, 9)]);

    setActiveToast({
      id: `toast-${Date.now()}`,
      title: '💳 Loan Application Received',
      message: `Your credit card guarantee has been securely registered. Application for $${params.amount.toLocaleString()} is now awaiting Compliance & Administrator authorization.`,
      type: 'admin_alert'
    });

    setIsLoanModalOpen(false);
    return { success: true, message: 'Application submitted successfully for admin underwriting.' };
  };

  const approveLoan = (loanId: string, notes?: string) => {
    const app = loanApplications.find(l => l.id === loanId);
    if (!app) return { success: false, message: 'Loan application not found.' };

    const updated = loanApplications.map(l => l.id === loanId ? {
      ...l,
      status: 'APPROVED' as const,
      reviewedBy: adminUser?.username || 'Senior Credit Officer',
      reviewNotes: notes || 'Credit card pre-authorization confirmed. Liquidity line cleared.'
    } : l);
    setLoanApplications(updated);
    try {
      localStorage.setItem('aet_loan_applications', JSON.stringify(updated));
    } catch {}

    // If current active user is the applicant, disburse cash to liquid balance
    if (currentUser?.email === app.clientEmail) {
      setCashBalance(prev => +(prev + app.amount).toFixed(2));
    }

    const act: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'TRADE_APPROVED',
      title: 'Credit Facility Approved',
      description: `Loan of $${app.amount.toLocaleString()} authorized for ${app.clientName}.`,
      timeAgo: 'Just now',
      badgeColor: 'text-emerald-400 bg-emerald-500/10'
    };
    setActivityFeed(prev => [act, ...prev.slice(0, 9)]);

    setActiveToast({
      id: `toast-${Date.now()}`,
      title: '✅ Loan Approved by Compliance Desk',
      message: `Credit facility of $${app.amount.toLocaleString()} cleared for ${app.clientName}.`,
      type: 'trade_approved'
    });

    return { success: true, message: `Loan approved and capital authorized for disbursement.` };
  };

  const rejectLoan = (loanId: string, reason: string) => {
    const updated = loanApplications.map(l => l.id === loanId ? {
      ...l,
      status: 'REJECTED' as const,
      reviewedBy: adminUser?.username || 'Senior Credit Officer',
      reviewNotes: reason || 'Underwriting criteria not satisfied.'
    } : l);
    setLoanApplications(updated);
    try {
      localStorage.setItem('aet_loan_applications', JSON.stringify(updated));
    } catch {}

    return { success: true, message: 'Loan application marked as rejected.' };
  };

  // User Registration with full compliance data
  const registerUser = (params: { fullName: string; email: string; phone: string; country: string; password: string }) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: params.fullName,
      email: params.email,
      phone: params.phone,
      country: params.country,
      tier: 'Standard Investment Tier',
      kycStatus: 'TIER_1_SUBMITTED',
      createdAt: 'Today',
      twoFactorEnabled: true,
      actualCashBalance: 0,
      simulatedPortfolioValue: 0
    };

    setRegisteredUsers(prev => [newUser, ...prev]);
    setUserProfile(newUser);
    setCurrentUser({
      name: newUser.fullName,
      email: newUser.email,
      tier: newUser.tier
    });
    setIsAuthenticated(true);
    setViewMode('app');
    setIsAuthModalOpen(false);

    // Trigger welcome bonus modal
    setTimeout(() => {
      setIsNewMemberModalOpen(true);
    }, 600);

    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'NEW_MEMBER',
      title: 'New Client Registered',
      description: `${params.fullName} from ${params.country} created an AETWEALTHCAPITAL account.`,
      timeAgo: 'Just now',
      badgeColor: 'text-cyan-400 bg-cyan-500/10'
    };
    setActivityFeed(prev => [newAct, ...prev.slice(0, 9)]);

    return { success: true, message: 'Account registered successfully. Welcome to AETWEALTHCAPITAL.' };
  };

  // Verify User KYC (Admin)
  const verifyUserKyc = (userId: string, newStatus: KycStatus) => {
    setRegisteredUsers(prev => prev.map(u => u.id === userId ? { ...u, kycStatus: newStatus } : u));
    if (userProfile && userProfile.id === userId) {
      setUserProfile(prev => prev ? { ...prev, kycStatus: newStatus } : null);
    }
    setActiveToast({
      id: `toast-${Date.now()}`,
      title: '🪪 Client Verification Updated',
      message: `Client status updated to ${newStatus.replace(/_/g, ' ')}.`,
      type: 'admin_alert'
    });
    return { success: true, message: `Client verification updated to ${newStatus}.` };
  };

  // Publish Announcement (Admin)
  const publishAnnouncement = (title: string, content: string, category: string) => {
    const newAnn = {
      id: `ann-${Date.now()}`,
      title,
      content,
      date: 'Just now',
      category: category || 'Institutional Advisory'
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    setActiveToast({
      id: `toast-${Date.now()}`,
      title: '📢 Announcement Published',
      message: `"${title}" has been broadcast to all client dashboards.`,
      type: 'admin_alert'
    });
    return { success: true, message: 'Announcement posted to website.' };
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  // Login handler
  const loginUser = (email: string, name?: string) => {
    setIsAuthenticated(true);
    const existing = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser({
        name: existing.fullName,
        email: existing.email,
        tier: existing.tier
      });
      setUserProfile(existing);
    } else {
      const fallbackUser: UserProfile = {
        id: `usr-${Date.now()}`,
        fullName: name || 'Favour Adaigbe',
        email: email || 'favouradaigbe0@gmail.com',
        phone: '+1 (555) 234-5678',
        country: 'United States',
        tier: 'Private Wealth Tier',
        kycStatus: 'TIER_2_VERIFIED',
        createdAt: 'Oct 12, 2026',
        twoFactorEnabled: true,
        actualCashBalance: cashBalance,
        simulatedPortfolioValue: portfolioValue
      };
      setCurrentUser({
        name: fallbackUser.fullName,
        email: fallbackUser.email,
        tier: fallbackUser.tier
      });
      setUserProfile(fallbackUser);
    }
    setViewMode('app');
    setIsAuthModalOpen(false);

    // If new member hasn't claimed welcome bonus, open welcome reward modal
    if (!hasClaimedWelcomeBonus) {
      setTimeout(() => {
        setIsNewMemberModalOpen(true);
      }, 500);
    }

    // Add activity
    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'NEW_MEMBER',
      title: 'Member Session Initialized',
      description: `${name || 'Favour Adaigbe'} connected to active trading terminal.`,
      timeAgo: 'Just now',
      badgeColor: 'text-emerald-400 bg-emerald-500/10'
    };
    setActivityFeed(prev => [newAct, ...prev.slice(0, 9)]);
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setViewMode('landing');
  };

  // Claim New Member Bonus
  const claimNewMemberBonus = (choice: 'CASH_MATCH' | 'FREE_STOCK_NVDA') => {
    setHasClaimedWelcomeBonus(true);
    setIsNewMemberModalOpen(false);

    if (choice === 'CASH_MATCH') {
      setCashBalance(prev => +(prev + 1000).toFixed(2));
      setActiveToast({
        id: `toast-${Date.now()}`,
        title: '🎉 $1,000 Deposit Match Credited!',
        message: '$1,000 has been deposited to your Cash Sweep account earning 4.85% APY.',
        type: 'member_welcome'
      });
    } else {
      // Add 1 free share of NVDA
      const nvdaAsset = assets.find(a => a.symbol === 'NVDA') || assets[1];
      setHoldings(prev => {
        const existing = prev.find(h => h.symbol === 'NVDA');
        if (existing) {
          return prev.map(h => h.symbol === 'NVDA' ? {
            ...h,
            shares: h.shares + 1,
            totalValue: +( (h.shares + 1) * nvdaAsset.price ).toFixed(2)
          } : h);
        } else {
          return [
            ...prev,
            {
              id: `hold-bonus-${Date.now()}`,
              symbol: 'NVDA',
              assetName: 'NVIDIA Corporation',
              assetClass: 'Equity',
              shares: 1,
              avgCostPrice: nvdaAsset.price,
              currentPrice: nvdaAsset.price,
              totalValue: nvdaAsset.price,
              totalGainLoss: 0,
              totalGainLossPercent: 0,
              allocationPercent: 0
            }
          ];
        }
      });

      setActiveToast({
        id: `toast-${Date.now()}`,
        title: '🎉 1 Free Share of NVIDIA (NVDA) Credited!',
        message: 'Your new member welcome equity bonus is now active in your portfolio positions.',
        type: 'member_welcome'
      });
    }

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#10b981', '#06b6d4', '#f59e0b', '#ec4899']
      });
    } catch {}
  };

  // Simulated background platform activity (every 22 seconds)
  useEffect(() => {
    const activityInterval = setInterval(() => {
      const names = ['David S.', 'Maya Lin', 'Kavita P.', 'Jordan Vance', 'Liam O.', 'Sophia G.'];
      const actions = [
        { type: 'NEW_MEMBER' as const, title: 'New Member Onboarded', gen: (name: string) => `${name} opened an account and linked instant ACH.` },
        { type: 'DEPOSIT' as const, title: 'Cash Sweep Deposit', gen: (name: string) => `${name} added $${(Math.floor(Math.random() * 8) + 2) * 2500} to Cash Sweep @ 4.85%.` },
        { type: 'TRADE_APPROVED' as const, title: 'Compliance Authorized Trade', gen: (name: string) => `Risk desk cleared $${(Math.floor(Math.random() * 5) + 3) * 1250} equity purchase for ${name}.` }
      ];

      const chosenAction = actions[Math.floor(Math.random() * actions.length)];
      const chosenName = names[Math.floor(Math.random() * names.length)];

      const item: ActivityItem = {
        id: `act-${Date.now()}`,
        type: chosenAction.type,
        title: chosenAction.title,
        description: chosenAction.gen(chosenName),
        timeAgo: 'Just now',
        badgeColor: chosenAction.type === 'NEW_MEMBER' ? 'text-cyan-400 bg-cyan-500/10' : 'text-emerald-400 bg-emerald-500/10'
      };

      setActivityFeed(prev => [item, ...prev.slice(0, 9)]);
    }, 22000);

    return () => clearInterval(activityInterval);
  }, []);

  // Count pending trade approvals in real time
  const pendingApprovalsCount = useMemo(() => {
    return orders.filter(o => o.status === 'PENDING_APPROVAL').length;
  }, [orders]);

  // Live Interest accrual simulation (ticks up every 3 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setAccruedInterest(prev => prev + (cashBalance * (hysaApy / 100) / (365 * 24 * 3600)) * 3);
    }, 3000);
    return () => clearInterval(timer);
  }, [cashBalance, hysaApy]);

  // Realistic Market Micro-Fluctuation Simulation (every 4 seconds)
  useEffect(() => {
    if (!liveMarketTickerActive) return;

    const interval = setInterval(() => {
      setAssets(prevAssets => {
        return prevAssets.map(asset => {
          if (Math.random() > 0.45) return asset;

          const volatility = asset.assetClass === 'Crypto' ? 0.004 : 0.0015;
          const deltaPercent = (Math.random() - 0.49) * volatility;
          const newPrice = Math.max(0.01, +(asset.price * (1 + deltaPercent)).toFixed(2));
          const newChange = +(newPrice - asset.previousClose).toFixed(2);
          const newChangePercent = +((newChange / asset.previousClose) * 100).toFixed(2);
          
          const updatedSparkline = [...asset.sparkline.slice(1), newPrice];

          return {
            ...asset,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            sparkline: updatedSparkline
          };
        });
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [liveMarketTickerActive]);

  // Sync holdings current prices with latest asset prices
  useEffect(() => {
    setHoldings(prevHoldings => {
      return prevHoldings.map(h => {
        const liveAsset = assets.find(a => a.symbol === h.symbol);
        if (!liveAsset) return h;

        const currentPrice = liveAsset.price;
        const totalValue = +(h.shares * currentPrice).toFixed(2);
        const costBasis = h.shares * h.avgCostPrice;
        const totalGainLoss = +(totalValue - costBasis).toFixed(2);
        const totalGainLossPercent = +((totalGainLoss / costBasis) * 100).toFixed(2);

        return {
          ...h,
          currentPrice,
          totalValue,
          totalGainLoss,
          totalGainLossPercent
        };
      });
    });
  }, [assets]);

  // Portfolio Totals calculations
  const portfolioValue = useMemo(() => {
    return holdings.reduce((sum, h) => sum + h.totalValue, 0);
  }, [holdings]);

  const totalNetWorth = useMemo(() => {
    return +(portfolioValue + cashBalance).toFixed(2);
  }, [portfolioValue, cashBalance]);

  const totalCostBasis = useMemo(() => {
    return holdings.reduce((sum, h) => sum + (h.shares * h.avgCostPrice), 0);
  }, [holdings]);

  const totalGainLoss = useMemo(() => {
    return +(portfolioValue - totalCostBasis).toFixed(2);
  }, [portfolioValue, totalCostBasis]);

  const totalGainLossPercent = useMemo(() => {
    if (totalCostBasis <= 0) return 0;
    return +((totalGainLoss / totalCostBasis) * 100).toFixed(2);
  }, [totalGainLoss, totalCostBasis]);

  const dayChange = useMemo(() => {
    return holdings.reduce((sum, h) => {
      const liveAsset = assets.find(a => a.symbol === h.symbol);
      const assetDayChange = liveAsset ? liveAsset.change : 0;
      return sum + (h.shares * assetDayChange);
    }, 0);
  }, [holdings, assets]);

  const dayChangePercent = useMemo(() => {
    const prevDayVal = portfolioValue - dayChange;
    if (prevDayVal <= 0) return 0;
    return +((dayChange / prevDayVal) * 100).toFixed(2);
  }, [dayChange, portfolioValue]);

  // Open Trade helper
  const openTrade = (asset: Asset, side: OrderSide = 'BUY') => {
    setTradingAsset(asset);
    setIsTradeModalOpen(true);
  };

  // Place Order Execution with Dual-Control Compliance Interception
  const placeOrder = ({ symbol, side, orderType, shares, price, limitPrice }: PlaceOrderParams) => {
    const asset = assets.find(a => a.symbol === symbol);
    if (!asset) {
      return { success: false, message: 'Asset not found in market registry.' };
    }

    const executionPrice = orderType === 'LIMIT' && limitPrice ? limitPrice : price;
    const totalCost = +(shares * executionPrice).toFixed(2);

    // Validate balances
    if (side === 'BUY') {
      if (totalCost > cashBalance) {
        return {
          success: false,
          message: `Insufficient cash balance ($${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}). Required: $${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}.`
        };
      }
    } else {
      const existing = holdings.find(h => h.symbol === symbol);
      if (!existing || existing.shares < shares) {
        return {
          success: false,
          message: `Insufficient shares to sell. You currently hold ${existing ? existing.shares : 0} shares of ${symbol}.`
        };
      }
    }

    // Interactive maker-checker compliance routing:
    // Requires approval if new member policy is active, or value threshold met, or crypto
    const exceedsThreshold = totalCost >= tradePolicy.requireApprovalOverAmount;
    const isCryptoReview = tradePolicy.requireCryptoApproval && asset.assetClass === 'Crypto';
    const isNewMemberCheck = tradePolicy.requireNewMemberApproval;
    const requiresApproval = tradePolicy.requireAllTradesApproval || exceedsThreshold || isCryptoReview || isNewMemberCheck;

    const timestampStr = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    if (requiresApproval) {
      // Hold/reserve cash if BUY
      if (side === 'BUY') {
        setCashBalance(prev => +(prev - totalCost).toFixed(2));
      }

      let riskFlag = 'New Member Pre-Trade Authorization';
      if (exceedsThreshold) {
        riskFlag = `Trade Size ($${totalCost.toLocaleString()}) > $${tradePolicy.requireApprovalOverAmount.toLocaleString()} Threshold`;
      } else if (isCryptoReview) {
        riskFlag = 'Digital Asset / High Volatility Sizing Review';
      }

      const pendingOrder: Order = {
        id: `ord-${Date.now()}`,
        symbol,
        assetName: asset.name,
        side,
        orderType,
        shares: +shares.toFixed(4),
        price: executionPrice,
        limitPrice,
        totalAmount: totalCost,
        status: 'PENDING_APPROVAL',
        timestamp: timestampStr,
        assetClass: asset.assetClass,
        clientName: currentUser?.name || 'Favour Adaigbe (#7812)',
        riskFlag
      };

      setOrders(prev => [pendingOrder, ...prev]);

      // Add to platform live feed
      const activityItem: ActivityItem = {
        id: `act-${Date.now()}`,
        type: 'TRADE_PENDING',
        title: 'New Trade Intercepted for Review',
        description: `${side} ${shares} ${symbol} ($${totalCost.toLocaleString()}) placed by ${currentUser?.name || 'Member'}.`,
        timeAgo: 'Just now',
        badgeColor: 'text-amber-400 bg-amber-500/10'
      };
      setActivityFeed(prev => [activityItem, ...prev.slice(0, 9)]);

      // Display Interactive Notification Toast immediately
      setActiveToast({
        id: `toast-${Date.now()}`,
        title: '⚡ Trade Placed — Admin Desk Intercepted',
        message: `${side} ${shares} ${symbol} ($${totalCost.toLocaleString()}) is held in the Compliance Approval Queue. Review and authorize as Admin.`,
        type: 'admin_alert',
        orderId: pendingOrder.id,
        actionText: 'Open Admin Desk to Approve'
      });

      return {
        success: true,
        requiresApproval: true,
        message: `Order submitted and placed in Compliance Approval Queue (${riskFlag}). An admin compliance officer will review and approve execution.`
      };
    }

    // Direct Instant Execution
    if (side === 'BUY') {
      setCashBalance(prev => +(prev - totalCost).toFixed(2));

      setHoldings(prevHoldings => {
        const existing = prevHoldings.find(h => h.symbol === symbol);
        if (existing) {
          const newShares = +(existing.shares + shares).toFixed(4);
          const totalCostBasis = (existing.shares * existing.avgCostPrice) + totalCost;
          const newAvgCost = +(totalCostBasis / newShares).toFixed(2);
          const newTotalValue = +(newShares * executionPrice).toFixed(2);
          const newGainLoss = +(newTotalValue - totalCostBasis).toFixed(2);
          const newGainLossPercent = +((newGainLoss / totalCostBasis) * 100).toFixed(2);

          return prevHoldings.map(h => h.symbol === symbol ? {
            ...h,
            shares: newShares,
            avgCostPrice: newAvgCost,
            totalValue: newTotalValue,
            totalGainLoss: newGainLoss,
            totalGainLossPercent: newGainLossPercent
          } : h);
        } else {
          return [
            ...prevHoldings,
            {
              id: `hold-${Date.now()}`,
              symbol,
              assetName: asset.name,
              assetClass: asset.assetClass,
              shares: +shares.toFixed(4),
              avgCostPrice: executionPrice,
              currentPrice: executionPrice,
              totalValue: totalCost,
              totalGainLoss: 0,
              totalGainLossPercent: 0,
              allocationPercent: 0
            }
          ];
        }
      });
    } else {
      // Direct SELL
      setCashBalance(prev => +(prev + totalCost).toFixed(2));

      setHoldings(prevHoldings => {
        const existing = prevHoldings.find(h => h.symbol === symbol);
        if (!existing) return prevHoldings;

        const remainingShares = +(existing.shares - shares).toFixed(4);
        if (remainingShares <= 0.0001) {
          return prevHoldings.filter(h => h.symbol !== symbol);
        }

        const newTotalValue = +(remainingShares * executionPrice).toFixed(2);
        const remainingCostBasis = remainingShares * existing.avgCostPrice;
        const newGainLoss = +(newTotalValue - remainingCostBasis).toFixed(2);
        const newGainLossPercent = +((newGainLoss / remainingCostBasis) * 100).toFixed(2);

        return prevHoldings.map(h => h.symbol === symbol ? {
          ...h,
          shares: remainingShares,
          totalValue: newTotalValue,
          totalGainLoss: newGainLoss,
          totalGainLossPercent: newGainLossPercent
        } : h);
      });
    }

    const filledOrder: Order = {
      id: `ord-${Date.now()}`,
      symbol,
      assetName: asset.name,
      side,
      orderType,
      shares: +shares.toFixed(4),
      price: executionPrice,
      limitPrice,
      totalAmount: totalCost,
      status: 'FILLED',
      timestamp: timestampStr,
      assetClass: asset.assetClass,
      clientName: currentUser?.name || 'Favour Adaigbe (#7812)'
    };

    setOrders(prev => [filledOrder, ...prev]);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: side === 'BUY' ? ['#10b981', '#06b6d4', '#3b82f6'] : ['#f59e0b', '#ec4899', '#8b5cf6']
      });
    } catch {}

    return {
      success: true,
      requiresApproval: false,
      message: `Successfully executed ${side} order for ${shares} ${symbol} at $${executionPrice.toFixed(2)}.`
    };
  };

  // ADMIN ACTION: Approve Pending Trade
  const approveOrder = (orderId: string, notes?: string) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) {
      return { success: false, message: 'Order not found in queue.' };
    }
    if (targetOrder.status !== 'PENDING_APPROVAL') {
      return { success: false, message: `Order is already ${targetOrder.status.toLowerCase()}.` };
    }

    // If BUY, update holdings (cash was already reserved upon order creation)
    if (targetOrder.side === 'BUY') {
      setHoldings(prevHoldings => {
        const existing = prevHoldings.find(h => h.symbol === targetOrder.symbol);
        if (existing) {
          const newShares = +(existing.shares + targetOrder.shares).toFixed(4);
          const totalCostBasis = (existing.shares * existing.avgCostPrice) + targetOrder.totalAmount;
          const newAvgCost = +(totalCostBasis / newShares).toFixed(2);
          const newTotalValue = +(newShares * targetOrder.price).toFixed(2);
          const newGainLoss = +(newTotalValue - totalCostBasis).toFixed(2);
          const newGainLossPercent = +((newGainLoss / totalCostBasis) * 100).toFixed(2);

          return prevHoldings.map(h => h.symbol === targetOrder.symbol ? {
            ...h,
            shares: newShares,
            avgCostPrice: newAvgCost,
            totalValue: newTotalValue,
            totalGainLoss: newGainLoss,
            totalGainLossPercent: newGainLossPercent
          } : h);
        } else {
          return [
            ...prevHoldings,
            {
              id: `hold-${Date.now()}`,
              symbol: targetOrder.symbol,
              assetName: targetOrder.assetName,
              assetClass: targetOrder.assetClass,
              shares: targetOrder.shares,
              avgCostPrice: targetOrder.price,
              currentPrice: targetOrder.price,
              totalValue: targetOrder.totalAmount,
              totalGainLoss: 0,
              totalGainLossPercent: 0,
              allocationPercent: 0
            }
          ];
        }
      });
    } else {
      // If SELL, credit cash and deduct shares
      setCashBalance(prev => +(prev + targetOrder.totalAmount).toFixed(2));
      setHoldings(prevHoldings => {
        const existing = prevHoldings.find(h => h.symbol === targetOrder.symbol);
        if (!existing) return prevHoldings;

        const remainingShares = +(existing.shares - targetOrder.shares).toFixed(4);
        if (remainingShares <= 0.0001) {
          return prevHoldings.filter(h => h.symbol !== targetOrder.symbol);
        }

        const newTotalValue = +(remainingShares * targetOrder.price).toFixed(2);
        const remainingCostBasis = remainingShares * existing.avgCostPrice;
        const newGainLoss = +(newTotalValue - remainingCostBasis).toFixed(2);
        const newGainLossPercent = +((newGainLoss / remainingCostBasis) * 100).toFixed(2);

        return prevHoldings.map(h => h.symbol === targetOrder.symbol ? {
          ...h,
          shares: remainingShares,
          totalValue: newTotalValue,
          totalGainLoss: newGainLoss,
          totalGainLossPercent: newGainLossPercent
        } : h);
      });
    }

    // Mark order as FILLED with approval signature
    setOrders(prev => prev.map(o => o.id === orderId ? {
      ...o,
      status: 'FILLED',
      approvalDetails: {
        approvedBy: adminUser?.username || 'Chief Risk Officer',
        timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        notes: notes || 'Passed institutional compliance verification and liquidity check.'
      }
    } : o));

    // Post to activity feed
    const activityItem: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'TRADE_APPROVED',
      title: 'Compliance Desk Approved Trade',
      description: `Order #${orderId} (${targetOrder.side} ${targetOrder.shares} ${targetOrder.symbol}) verified and filled.`,
      timeAgo: 'Just now',
      badgeColor: 'text-emerald-400 bg-emerald-500/10'
    };
    setActivityFeed(prev => [activityItem, ...prev.slice(0, 9)]);

    // Trigger Success Toast
    setActiveToast({
      id: `toast-${Date.now()}`,
      title: '✅ Trade Approved & Executed',
      message: `Compliance Desk approved Order #${orderId} (${targetOrder.shares} ${targetOrder.symbol}). Positions updated.`,
      type: 'trade_approved',
      orderId
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#06b6d4']
      });
    } catch {}

    return {
      success: true,
      message: `Order #${orderId} (${targetOrder.side} ${targetOrder.shares} ${targetOrder.symbol}) approved and filled.`
    };
  };

  // ADMIN ACTION: Reject Pending Trade
  const rejectOrder = (orderId: string, reason: string) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) {
      return { success: false, message: 'Order not found in queue.' };
    }
    if (targetOrder.status !== 'PENDING_APPROVAL') {
      return { success: false, message: `Order is already ${targetOrder.status.toLowerCase()}.` };
    }

    // If BUY was pending, refund the reserved cash balance!
    if (targetOrder.side === 'BUY') {
      setCashBalance(prev => +(prev + targetOrder.totalAmount).toFixed(2));
    }

    // Mark order as REJECTED
    setOrders(prev => prev.map(o => o.id === orderId ? {
      ...o,
      status: 'REJECTED',
      approvalDetails: {
        approvedBy: adminUser?.username || 'Compliance Officer',
        timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        rejectionReason: reason || 'Exceeded portfolio concentration limit.'
      }
    } : o));

    setActiveToast({
      id: `toast-${Date.now()}`,
      title: '❌ Order Rejected by Compliance',
      message: `Order #${orderId} was declined (${reason}). Reserved capital refunded to cash balance.`,
      type: 'admin_alert',
      orderId
    });

    return {
      success: true,
      message: `Order #${orderId} rejected. Reserved capital ($${targetOrder.totalAmount.toLocaleString()}) released back to client balance.`
    };
  };

  // Admin Authentication
  const loginAdmin = (passcode: string) => {
    const validCodes = ['admin123', 'aura2026', '8821', 'admin'];
    if (validCodes.includes(passcode.trim().toLowerCase())) {
      const user: AdminUser = {
        id: 'adm-01',
        username: 'Chief Risk Officer (Desk 4)',
        role: 'Super Admin & Compliance Officer',
        department: 'Institutional Trade Desk'
      };
      setIsAdminLoggedIn(true);
      setAdminUser(user);
      return { success: true, message: 'Authenticated to Institutional Compliance Portal.' };
    }
    return { success: false, message: 'Invalid administrative security credential.' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
  };

  const updateTradePolicy = (newPolicy: Partial<TradeApprovalPolicy>) => {
    setTradePolicy(prev => ({ ...prev, ...newPolicy }));
  };

  // Spot Crypto Custody Addresses Management (Admin)
  const updateCryptoAddresses = (newAddresses: Partial<CryptoDepositAddresses>) => {
    const updated: CryptoDepositAddresses = {
      ...cryptoAddresses,
      ...newAddresses,
      lastUpdated: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      updatedBy: adminUser?.username || 'Chief Risk Officer (Desk 4)'
    };
    setCryptoAddresses(updated);
    try {
      localStorage.setItem('aura_crypto_deposit_addresses', JSON.stringify(updated));
    } catch {}

    const act: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'DEPOSIT',
      title: 'Custody Addresses Reconfigured',
      description: `Bitcoin & Ethereum spot deposit addresses updated by ${adminUser?.username || 'Compliance Officer'}.`,
      timeAgo: 'Just now',
      badgeColor: 'text-amber-400 bg-amber-500/10'
    };
    setActivityFeed(prev => [act, ...prev.slice(0, 9)]);

    setActiveToast({
      id: `toast-${Date.now()}`,
      title: '🔐 Crypto Custody Addresses Updated',
      message: 'Spot deposit addresses for BTC & ETH have been saved and synced across all client portals.',
      type: 'admin_alert'
    });

    return { success: true, message: 'Custody addresses saved successfully. User deposit portals updated in real time.' };
  };

  const resetCryptoAddressesToDefault = () => {
    setCryptoAddresses(DEFAULT_CRYPTO_ADDRESSES);
    try {
      localStorage.setItem('aura_crypto_deposit_addresses', JSON.stringify(DEFAULT_CRYPTO_ADDRESSES));
    } catch {}
    return { success: true, message: 'Reset crypto addresses to Institutional Cold Storage defaults.' };
  };

  // Cash Management
  const depositCash = (amount: number, bankName: string) => {
    setCashBalance(prev => +(prev + amount).toFixed(2));
    const newOrder: Order = {
      id: `dep-${Date.now()}`,
      symbol: 'USD',
      assetName: `Deposit from ${bankName}`,
      side: 'BUY',
      orderType: 'MARKET',
      shares: 1,
      price: amount,
      totalAmount: amount,
      status: 'FILLED',
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      assetClass: 'Bond',
      clientName: currentUser?.name || 'Favour Adaigbe (#7812)'
    };
    setOrders(prev => [newOrder, ...prev]);

    const activityItem: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'DEPOSIT',
      title: 'Funds Deposited',
      description: `$${amount.toLocaleString()} deposited from ${bankName} into Cash Sweep (4.85% APY).`,
      timeAgo: 'Just now',
      badgeColor: 'text-teal-400 bg-teal-500/10'
    };
    setActivityFeed(prev => [activityItem, ...prev.slice(0, 9)]);
  };

  const depositCrypto = (params: CryptoDepositParams) => {
    const asset = assets.find(a => a.symbol === params.symbol);
    const assetName = asset ? asset.name : `${params.symbol} Digital Currency`;
    const txHash = params.txHash || generateSimulatedTxHash(params.network);
    const txHashShort = txHash.length > 20 ? `${txHash.slice(0, 10)}...${txHash.slice(-8)}` : txHash;

    if (params.destination === 'HOLDING') {
      // Direct Portfolio Crypto Holding
      setHoldings(prevHoldings => {
        const existing = prevHoldings.find(h => h.symbol === params.symbol);
        const currentPrice = asset ? asset.price : +(params.usdEquivalent / params.cryptoAmount).toFixed(2);
        if (existing) {
          const newShares = +(existing.shares + params.cryptoAmount).toFixed(6);
          const totalCostBasis = (existing.shares * existing.avgCostPrice) + params.usdEquivalent;
          const newAvgCost = +(totalCostBasis / newShares).toFixed(2);
          const newTotalValue = +(newShares * currentPrice).toFixed(2);
          const newGainLoss = +(newTotalValue - totalCostBasis).toFixed(2);
          const newGainLossPercent = +((newGainLoss / totalCostBasis) * 100).toFixed(2);

          return prevHoldings.map(h => h.symbol === params.symbol ? {
            ...h,
            shares: newShares,
            avgCostPrice: newAvgCost,
            totalValue: newTotalValue,
            totalGainLoss: newGainLoss,
            totalGainLossPercent: newGainLossPercent
          } : h);
        } else {
          return [
            ...prevHoldings,
            {
              id: `hold-crypto-${Date.now()}`,
              symbol: params.symbol,
              assetName,
              assetClass: 'Crypto',
              shares: params.cryptoAmount,
              avgCostPrice: currentPrice,
              currentPrice,
              totalValue: params.usdEquivalent,
              totalGainLoss: 0,
              totalGainLossPercent: 0,
              allocationPercent: 0
            }
          ];
        }
      });
    } else {
      // Swept to high-yield cash sweep (4.85% APY)
      setCashBalance(prev => +(prev + params.usdEquivalent).toFixed(2));
    }

    const newOrder: Order = {
      id: `dep-crypto-${Date.now()}`,
      symbol: params.symbol,
      assetName: `Crypto Deposit: ${params.cryptoAmount.toLocaleString()} ${params.symbol} (${params.network})`,
      side: 'BUY',
      orderType: 'MARKET',
      shares: params.cryptoAmount,
      price: +(params.usdEquivalent / params.cryptoAmount).toFixed(2),
      totalAmount: params.usdEquivalent,
      status: 'FILLED',
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      assetClass: 'Crypto',
      clientName: currentUser?.name || 'Favour Adaigbe (#7812)',
      approvalDetails: {
        approvedBy: 'Aura Blockchain Custody Gateway (Multi-Sig)',
        timestamp: new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        notes: `Network: ${params.network} • TxHash: ${txHashShort} • Verified on-chain • ${params.destination === 'HOLDING' ? 'Credited to Crypto Holdings' : 'Swept to 4.85% APY Cash'}`
      }
    };

    setOrders(prev => [newOrder, ...prev]);

    const activityItem: ActivityItem = {
      id: `act-${Date.now()}`,
      type: 'DEPOSIT',
      title: 'Crypto Payment Settled',
      description: `${currentUser?.name || 'Client'} deposited ${params.cryptoAmount.toLocaleString()} ${params.symbol} ($${params.usdEquivalent.toLocaleString()}) via ${params.network}.`,
      timeAgo: 'Just now',
      badgeColor: 'text-amber-400 bg-amber-500/10'
    };
    setActivityFeed(prev => [activityItem, ...prev.slice(0, 9)]);

    setActiveToast({
      id: `toast-${Date.now()}`,
      title: `🪙 ${params.cryptoAmount.toLocaleString()} ${params.symbol} Payment Confirmed`,
      message: `$${params.usdEquivalent.toLocaleString()} successfully settled on ${params.network}. ${params.destination === 'HOLDING' ? 'Portfolio positions updated.' : 'Swept to 4.85% APY account.'}`,
      type: 'crypto_received'
    });

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#06b6d4', '#8b5cf6']
      });
    } catch {}

    return {
      success: true,
      message: `Successfully received and confirmed ${params.cryptoAmount} ${params.symbol} ($${params.usdEquivalent.toLocaleString()}).`
    };
  };

  const withdrawCash = (amount: number, bankName: string) => {
    if (amount > cashBalance) {
      return { success: false, message: 'Withdrawal amount exceeds available liquid cash balance.' };
    }
    setCashBalance(prev => +(prev - amount).toFixed(2));
    const newOrder: Order = {
      id: `wth-${Date.now()}`,
      symbol: 'USD',
      assetName: `Withdrawal to ${bankName}`,
      side: 'SELL',
      orderType: 'MARKET',
      shares: 1,
      price: amount,
      totalAmount: amount,
      status: 'FILLED',
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      assetClass: 'Bond',
      clientName: currentUser?.name || 'Favour Adaigbe (#7812)'
    };
    setOrders(prev => [newOrder, ...prev]);
    return { success: true, message: `Successfully initiated $${amount.toFixed(2)} withdrawal to ${bankName}.` };
  };

  // Automated DCA recurring plans
  const addRecurringPlan = (plan: Omit<RecurringPlan, 'id' | 'nextExecution' | 'active'>) => {
    const newPlan: RecurringPlan = {
      ...plan,
      id: `dca-${Date.now()}`,
      nextExecution: `${plan.frequency} on market open`,
      active: true
    };
    setRecurringPlans(prev => [newPlan, ...prev]);
  };

  const toggleRecurringPlan = (id: string) => {
    setRecurringPlans(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const deleteRecurringPlan = (id: string) => {
    setRecurringPlans(prev => prev.filter(p => p.id !== id));
  };

  // Investment Goals
  const addGoal = (goal: Omit<InvestmentGoal, 'id' | 'currentAmount'>) => {
    const newGoal: InvestmentGoal = {
      ...goal,
      id: `goal-${Date.now()}`,
      currentAmount: 0
    };
    setGoals(prev => [...prev, newGoal]);
  };

  // 1-Click Institutional Rebalance
  const rebalancePortfolio = () => {
    const currentTotal = totalNetWorth;
    const targetCash = currentTotal * 0.10;
    setCashBalance(targetCash);

    return {
      success: true,
      message: `Portfolio rebalanced successfully. Capital re-allocated across Equities, Fixed Income, and Cash Sweep to match institutional target risk profile.`,
      tradesExecuted: 4
    };
  };

  // AI Integration Calls
  const fetchAIStockAnalysis = async (asset: Asset): Promise<AIStockAnalysis | null> => {
    try {
      const res = await fetch('/api/ai/analyze-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: asset.symbol,
          name: asset.name,
          price: asset.price,
          changePercent: asset.changePercent,
          assetType: asset.assetClass,
          sector: asset.sector
        })
      });

      if (!res.ok) throw new Error('Failed to fetch analysis');
      const data = await res.json();
      return data.analysis;
    } catch (err) {
      console.warn('AI analysis fetch error:', err);
      return null;
    }
  };

  const fetchAIPortfolioAudit = async (): Promise<AIPortfolioAudit | null> => {
    try {
      const res = await fetch('/api/ai/portfolio-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          holdings: holdings.map(h => ({
            symbol: h.symbol,
            assetName: h.assetName,
            value: h.totalValue,
            gainLossPercent: h.totalGainLossPercent,
            assetClass: h.assetClass
          })),
          totalValue: totalNetWorth,
          cashBalance: cashBalance
        })
      });

      if (!res.ok) throw new Error('Failed to audit portfolio');
      const data = await res.json();
      return data.audit;
    } catch (err) {
      console.warn('AI portfolio audit error:', err);
      return null;
    }
  };

  const sendAIChatMessage = async (message: string): Promise<string> => {
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          portfolioContext: {
            totalValue: totalNetWorth,
            cashBalance,
            topHoldings: holdings.slice(0, 5).map(h => `${h.symbol} ($${h.totalValue.toLocaleString()})`)
          }
        })
      });

      if (!res.ok) throw new Error('AI Chat response failed');
      const data = await res.json();
      return data.reply;
    } catch (err) {
      console.warn('AI Chat error:', err);
      return "I'm temporarily unable to reach the neural analysis server. However, based on portfolio diversification principles, maintaining systematic weekly contributions and keeping high-yield reserves remains the prudent standard.";
    }
  };

  return (
    <InvestmentContext.Provider
      value={{
        assets,
        holdings,
        orders,
        goals,
        recurringPlans,
        cashBalance,
        hysaApy,
        accruedInterest,
        portfolioValue,
        totalNetWorth,
        totalGainLoss,
        totalGainLossPercent,
        dayChange,
        dayChangePercent,
        activeTab,
        setActiveTab,
        selectedAsset,
        setSelectedAsset,
        isTradeModalOpen,
        setIsTradeModalOpen,
        tradingAsset,
        setTradingAsset,
        isTransferModalOpen,
        setIsTransferModalOpen,
        isAuditModalOpen,
        setIsAuditModalOpen,
        isAICopilotOpen,
        setIsAICopilotOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isBtcWalletModalOpen,
        setIsBtcWalletModalOpen,
        liveMarketTickerActive,
        setLiveMarketTickerActive,
        placeOrder,
        depositCash,
        depositCrypto,
        withdrawCash,
        addRecurringPlan,
        toggleRecurringPlan,
        deleteRecurringPlan,
        addGoal,
        rebalancePortfolio,
        openTrade,
        fetchAIStockAnalysis,
        fetchAIPortfolioAudit,
        sendAIChatMessage,

        // Admin & Trade Approval
        isAdminLoggedIn,
        adminUser,
        loginAdmin,
        logoutAdmin,
        tradePolicy,
        updateTradePolicy,
        pendingApprovalsCount,
        approveOrder,
        rejectOrder,

        // Crypto Spot Custody & Admin Addresses
        cryptoAddresses,
        updateCryptoAddresses,
        resetCryptoAddressesToDefault,

        // Front-End Landing Page & Navigation
        viewMode,
        setViewMode,
        publicPage,
        setPublicPage,
        isAuthenticated,
        currentUser,
        userProfile,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        loginUser,
        registerUser,
        logoutUser,

        // Investment Plans & Services Data
        investmentPlans,
        wealthServices,

        // Inquiries
        inquiries,
        submitInquiry,
        updateInquiryStatus,
        isInquiryModalOpen,
        setIsInquiryModalOpen,
        selectedPlanForInquiry,
        setSelectedPlanForInquiry,

        // Loans with Credit Card Underwriting
        loanApplications,
        isLoanModalOpen,
        setIsLoanModalOpen,
        applyForLoan,
        approveLoan,
        rejectLoan,

        // Registered Clients KYC & Admin Management
        registeredUsers,
        verifyUserKyc,

        // Platform Announcements
        announcements,
        publishAnnouncement,
        deleteAnnouncement,

        // Legal Modal
        isLegalModalOpen,
        setIsLegalModalOpen,
        legalModalTab,
        setLegalModalTab,

        // Active Interactive Platform Feed & Toasts
        activityFeed,
        activeToast,
        dismissToast,
        isNewMemberModalOpen,
        setIsNewMemberModalOpen,
        claimNewMemberBonus,
        hasClaimedWelcomeBonus
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
};

export const useInvestment = () => {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error('useInvestment must be used within an InvestmentProvider');
  }
  return context;
};
