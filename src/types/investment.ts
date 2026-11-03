export type AssetClass = 'Equity' | 'ETF' | 'Crypto' | 'Bond' | 'Commodity';

export interface AnalystRating {
  buy: number;
  hold: number;
  sell: number;
  consensus: 'Strong Buy' | 'Buy' | 'Hold' | 'Underperform';
  targetPrice: number;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  assetClass: AssetClass;
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
  marketCap: string;
  peRatio?: number;
  dividendYield?: number;
  high52w: number;
  low52w: number;
  volume: string;
  sparkline: number[];
  description: string;
  sector: string;
  analystRating: AnalystRating;
}

export interface Holding {
  id: string;
  symbol: string;
  assetName: string;
  assetClass: AssetClass;
  shares: number;
  avgCostPrice: number;
  currentPrice: number;
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  allocationPercent: number;
}

export type OrderType = 'MARKET' | 'LIMIT' | 'STOP_LOSS';
export type OrderSide = 'BUY' | 'SELL';
export type OrderStatus = 'FILLED' | 'PENDING' | 'PENDING_APPROVAL' | 'REJECTED' | 'CANCELLED';

export interface Order {
  id: string;
  symbol: string;
  assetName: string;
  side: OrderSide;
  orderType: OrderType;
  shares: number;
  price: number;
  limitPrice?: number;
  totalAmount: number;
  status: OrderStatus;
  timestamp: string;
  assetClass: AssetClass;
  clientName?: string;
  riskFlag?: string;
  approvalDetails?: {
    approvedBy: string;
    timestamp: string;
    notes?: string;
    rejectionReason?: string;
  };
}

export interface AdminUser {
  id: string;
  username: string;
  role: string;
  department: string;
}

export interface TradeApprovalPolicy {
  requireApprovalOverAmount: number;
  requireCryptoApproval: boolean;
  requireAllTradesApproval: boolean;
  requireNewMemberApproval: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'TRADE_PENDING' | 'TRADE_APPROVED' | 'NEW_MEMBER' | 'DEPOSIT';
  title: string;
  description: string;
  timeAgo: string;
  badgeColor?: string;
}

export interface CryptoDepositParams {
  symbol: string;
  cryptoAmount: number;
  usdEquivalent: number;
  network: string;
  walletAddress: string;
  txHash?: string;
  destination: 'CASH_SWEEP' | 'HOLDING';
}

export interface CryptoDepositAddresses {
  btcAddress: string;
  ethAddress: string;
  usdtAddress: string;
  usdcAddress: string;
  solAddress: string;
  lastUpdated: string;
  updatedBy: string;
}

export interface PlatformToast {
  id: string;
  title: string;
  message: string;
  type: 'admin_alert' | 'trade_placed' | 'trade_approved' | 'member_welcome' | 'crypto_received' | 'deposit_received';
  orderId?: string;
  actionText?: string;
}

export type GoalCategory = 'Retirement' | 'Real Estate' | 'Emergency' | 'Education' | 'Wealth Creation';
export type RiskProfile = 'Conservative' | 'Moderate' | 'Aggressive';

export interface InvestmentGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetYear: number;
  category: GoalCategory;
  monthlyContribution: number;
  riskProfile: RiskProfile;
  color: string;
}

export type Frequency = 'Daily' | 'Weekly' | 'Bi-Weekly' | 'Monthly';

export interface RecurringPlan {
  id: string;
  symbol: string;
  assetName: string;
  amount: number;
  frequency: Frequency;
  nextExecution: string;
  active: boolean;
}

export interface PortfolioHistoryPoint {
  date: string;
  value: number;
  benchmark: number;
}

export interface AIStockAnalysis {
  summary: string;
  bullCase: string;
  bearCase: string;
  valuationPerspective: string;
  sentimentScore: number;
  targetAction: 'Strong Buy' | 'Buy' | 'Hold' | 'Trim' | 'Avoid';
  recommendedHorizon: string;
  riskRating: string;
  keyMetricsWatch: string[];
}

export interface AIPortfolioAudit {
  healthScore: number;
  riskLevel: string;
  strengths: string[];
  risks: string[];
  rebalancingRecommendations: {
    asset: string;
    action: 'Increase' | 'Reduce' | 'Hold';
    rationale: string;
  }[];
  macroVulnerabilities: string;
  taxEfficiencyTip: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumberMask: string;
  type: 'Checking' | 'Savings';
}

export type PublicPage = 'home' | 'about' | 'plans' | 'services' | 'markets' | 'contact' | 'loan';

export interface InvestmentPlan {
  id: string;
  title: string;
  category: 'Beginner Investment' | 'Growth Investment' | 'Premium Wealth Management' | 'Long-Term Investment';
  minAmount: number;
  duration: string;
  riskClassification: 'Low' | 'Moderate' | 'Balanced Growth' | 'Institutional';
  applicableFees: string;
  expectedReturnInfo: string;
  terms: string;
  description: string;
  highlights: string[];
  recommendedFor: string;
  popularBadge?: boolean;
}

export interface WealthService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  keyDeliverables: string[];
  engagementProcess: string;
}

export interface LoanApplication {
  id: string;
  userId: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  purpose: string;
  durationMonths: number;
  interestRate: number;
  creditCard: {
    cardNumberMasked: string; // e.g. "•••• •••• •••• 4242"
    cardholderName: string;
    expiry: string;
    cvvMasked: string;
    billingZip: string;
  };
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
  reviewedBy?: string;
  reviewNotes?: string;
}

export interface InvestmentInquiry {
  id: string;
  planId?: string;
  planName?: string;
  clientName: string;
  email: string;
  phone: string;
  intendedAmount: number;
  message: string;
  timestamp: string;
  status: 'NEW' | 'REVIEWED' | 'CONTACTED';
}

export type KycStatus = 'UNVERIFIED' | 'TIER_1_SUBMITTED' | 'TIER_1_VERIFIED' | 'TIER_2_VERIFIED';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  tier: string;
  kycStatus: KycStatus;
  createdAt: string;
  twoFactorEnabled: boolean;
  actualCashBalance: number;
  simulatedPortfolioValue: number;
}
