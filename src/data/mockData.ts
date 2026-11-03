import { Asset, Holding, Order, InvestmentGoal, RecurringPlan, PortfolioHistoryPoint, BankAccount } from '../types/investment';

export const INITIAL_ASSETS: Asset[] = [
  {
    id: 'voo',
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    assetClass: 'ETF',
    price: 524.80,
    previousClose: 521.10,
    change: 3.70,
    changePercent: 0.71,
    marketCap: '$1.15T',
    peRatio: 26.4,
    dividendYield: 1.34,
    high52w: 532.50,
    low52w: 420.10,
    volume: '4.8M',
    sparkline: [512, 515, 518, 516, 521, 522, 524.80],
    description: 'Tracks the S&P 500 Index, representing 500 of the largest U.S. publicly traded corporations.',
    sector: 'Broad Market ETF',
    analystRating: {
      buy: 84,
      hold: 14,
      sell: 2,
      consensus: 'Strong Buy',
      targetPrice: 565.00
    }
  },
  {
    id: 'nvda',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    assetClass: 'Equity',
    price: 138.25,
    previousClose: 134.90,
    change: 3.35,
    changePercent: 2.48,
    marketCap: '$3.38T',
    peRatio: 48.2,
    dividendYield: 0.03,
    high52w: 144.50,
    low52w: 68.20,
    volume: '42.1M',
    sparkline: [128, 131, 129, 133, 136, 135, 138.25],
    description: 'Global leader in accelerated computing hardware, GPUs, AI infrastructure, and enterprise deep learning platforms.',
    sector: 'Semiconductors',
    analystRating: {
      buy: 91,
      hold: 8,
      sell: 1,
      consensus: 'Strong Buy',
      targetPrice: 165.00
    }
  },
  {
    id: 'aapl',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    assetClass: 'Equity',
    price: 232.40,
    previousClose: 233.80,
    change: -1.40,
    changePercent: -0.60,
    marketCap: '$3.52T',
    peRatio: 33.8,
    dividendYield: 0.44,
    high52w: 237.23,
    low52w: 164.08,
    volume: '28.4M',
    sparkline: [230, 234, 233, 235, 236, 234, 232.40],
    description: 'Consumer technology giant known for iPhone, Mac, wearable devices, and rapidly scaling high-margin services ecosystem.',
    sector: 'Consumer Electronics',
    analystRating: {
      buy: 72,
      hold: 24,
      sell: 4,
      consensus: 'Buy',
      targetPrice: 250.00
    }
  },
  {
    id: 'msft',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    assetClass: 'Equity',
    price: 432.10,
    previousClose: 428.50,
    change: 3.60,
    changePercent: 0.84,
    marketCap: '$3.21T',
    peRatio: 34.6,
    dividendYield: 0.72,
    high52w: 468.35,
    low52w: 366.50,
    volume: '16.9M',
    sparkline: [422, 425, 429, 427, 430, 431, 432.10],
    description: 'Cloud infrastructure leader with Azure, enterprise productivity software, Copilot AI integrations, and gaming.',
    sector: 'Software Infrastructure',
    analystRating: {
      buy: 88,
      hold: 11,
      sell: 1,
      consensus: 'Strong Buy',
      targetPrice: 490.00
    }
  },
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    assetClass: 'Crypto',
    price: 68450.00,
    previousClose: 67120.00,
    change: 1330.00,
    changePercent: 1.98,
    marketCap: '$1.35T',
    high52w: 73750.00,
    low52w: 34200.00,
    volume: '$24.6B',
    sparkline: [65200, 66100, 65800, 67400, 66900, 67800, 68450],
    description: 'The pioneering decentralized digital asset and store of value secured by proof-of-work blockchain cryptography.',
    sector: 'Digital Currency',
    analystRating: {
      buy: 79,
      hold: 16,
      sell: 5,
      consensus: 'Buy',
      targetPrice: 85000.00
    }
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    assetClass: 'Crypto',
    price: 2580.40,
    previousClose: 2525.00,
    change: 55.40,
    changePercent: 2.19,
    marketCap: '$310B',
    high52w: 4090.00,
    low52w: 1820.00,
    volume: '$14.2B',
    sparkline: [2480, 2510, 2490, 2540, 2530, 2560, 2580.40],
    description: 'Smart contract compute platform powering decentralized finance (DeFi), tokenization, and Layer-2 rollups.',
    sector: 'Smart Contracts',
    analystRating: {
      buy: 74,
      hold: 21,
      sell: 5,
      consensus: 'Buy',
      targetPrice: 3400.00
    }
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    assetClass: 'Crypto',
    price: 188.40,
    previousClose: 181.20,
    change: 7.20,
    changePercent: 3.97,
    marketCap: '$88B',
    high52w: 210.00,
    low52w: 52.00,
    volume: '$5.4B',
    sparkline: [175, 179, 178, 182, 184, 186, 188.40],
    description: 'High-throughput Layer-1 proof-of-history blockchain supporting decentralized payments, DeFi, and tokenized real-world assets.',
    sector: 'Smart Contracts',
    analystRating: {
      buy: 82,
      hold: 14,
      sell: 4,
      consensus: 'Buy',
      targetPrice: 240.00
    }
  },
  {
    id: 'bnd',
    symbol: 'BND',
    name: 'Vanguard Total Bond Market ETF',
    assetClass: 'Bond',
    price: 72.85,
    previousClose: 72.95,
    change: -0.10,
    changePercent: -0.14,
    marketCap: '$325B',
    dividendYield: 4.42,
    high52w: 75.10,
    low52w: 69.40,
    volume: '5.2M',
    sparkline: [73.2, 73.1, 73.0, 72.9, 72.8, 72.9, 72.85],
    description: 'Broad exposure to US investment-grade bonds, including Treasuries, corporate bonds, and mortgage-backed securities.',
    sector: 'Fixed Income',
    analystRating: {
      buy: 68,
      hold: 30,
      sell: 2,
      consensus: 'Buy',
      targetPrice: 76.00
    }
  },
  {
    id: 'qqq',
    symbol: 'QQQ',
    name: 'Invesco QQQ Trust',
    assetClass: 'ETF',
    price: 498.60,
    previousClose: 492.30,
    change: 6.30,
    changePercent: 1.28,
    marketCap: '$290B',
    peRatio: 31.2,
    dividendYield: 0.58,
    high52w: 503.50,
    low52w: 351.20,
    volume: '22.5M',
    sparkline: [484, 488, 487, 492, 495, 496, 498.60],
    description: 'Tracks the Nasdaq-100 Index, holding top non-financial innovative tech, consumer, and biotech companies.',
    sector: 'Tech-Heavy ETF',
    analystRating: {
      buy: 86,
      hold: 12,
      sell: 2,
      consensus: 'Strong Buy',
      targetPrice: 535.00
    }
  },
  {
    id: 'amzn',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    assetClass: 'Equity',
    price: 194.20,
    previousClose: 191.80,
    change: 2.40,
    changePercent: 1.25,
    marketCap: '$2.02T',
    peRatio: 41.5,
    high52w: 201.20,
    low52w: 128.40,
    volume: '29.1M',
    sparkline: [186, 189, 188, 191, 193, 192, 194.20],
    description: 'E-commerce and cloud infrastructure titan (AWS) expanding into advertising, logistics, and generative AI compute.',
    sector: 'Internet & Direct Marketing',
    analystRating: {
      buy: 93,
      hold: 6,
      sell: 1,
      consensus: 'Strong Buy',
      targetPrice: 225.00
    }
  },
  {
    id: 'gld',
    symbol: 'GLD',
    name: 'SPDR Gold Shares',
    assetClass: 'Commodity',
    price: 254.30,
    previousClose: 252.10,
    change: 2.20,
    changePercent: 0.87,
    marketCap: '$72B',
    high52w: 256.40,
    low52w: 182.50,
    volume: '6.1M',
    sparkline: [248, 250, 249, 251, 252, 253, 254.30],
    description: 'Physically backed gold trust offering direct exposure to physical gold bullion pricing as an inflation hedge.',
    sector: 'Precious Metals',
    analystRating: {
      buy: 70,
      hold: 25,
      sell: 5,
      consensus: 'Buy',
      targetPrice: 275.00
    }
  },
  {
    id: 'schd',
    symbol: 'SCHD',
    name: 'Schwab US Dividend Equity ETF',
    assetClass: 'ETF',
    price: 84.15,
    previousClose: 83.90,
    change: 0.25,
    changePercent: 0.30,
    marketCap: '$62B',
    peRatio: 16.8,
    dividendYield: 3.52,
    high52w: 85.80,
    low52w: 69.20,
    volume: '3.1M',
    sparkline: [83.0, 83.4, 83.6, 83.8, 83.9, 84.0, 84.15],
    description: 'Rules-based index tracking 100 high dividend yielding US equities with strong track records of consistent payouts.',
    sector: 'Dividend ETF',
    analystRating: {
      buy: 77,
      hold: 21,
      sell: 2,
      consensus: 'Buy',
      targetPrice: 91.00
    }
  },
  {
    id: 'tsla',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    assetClass: 'Equity',
    price: 258.90,
    previousClose: 264.20,
    change: -5.30,
    changePercent: -2.01,
    marketCap: '$825B',
    peRatio: 74.2,
    high52w: 271.00,
    low52w: 138.80,
    volume: '54.7M',
    sparkline: [268, 270, 265, 263, 267, 264, 258.90],
    description: 'Electric vehicle market pioneer expanding into autonomous Full Self-Driving (FSD), robotaxis, energy storage, and robotics.',
    sector: 'Automobile Manufacturers',
    analystRating: {
      buy: 45,
      hold: 35,
      sell: 20,
      consensus: 'Hold',
      targetPrice: 245.00
    }
  }
];

export const INITIAL_HOLDINGS: Holding[] = [
  {
    id: 'hold-1',
    symbol: 'VOO',
    assetName: 'Vanguard S&P 500 ETF',
    assetClass: 'ETF',
    shares: 82.5,
    avgCostPrice: 442.10,
    currentPrice: 524.80,
    totalValue: 43296.00,
    totalGainLoss: 6822.75,
    totalGainLossPercent: 18.71,
    allocationPercent: 30.3
  },
  {
    id: 'hold-2',
    symbol: 'NVDA',
    assetName: 'NVIDIA Corporation',
    assetClass: 'Equity',
    shares: 185.0,
    avgCostPrice: 84.50,
    currentPrice: 138.25,
    totalValue: 25576.25,
    totalGainLoss: 9943.75,
    totalGainLossPercent: 63.61,
    allocationPercent: 17.9
  },
  {
    id: 'hold-3',
    symbol: 'MSFT',
    assetName: 'Microsoft Corporation',
    assetClass: 'Equity',
    shares: 45.0,
    avgCostPrice: 380.00,
    currentPrice: 432.10,
    totalValue: 19444.50,
    totalGainLoss: 2344.50,
    totalGainLossPercent: 13.71,
    allocationPercent: 13.6
  },
  {
    id: 'hold-4',
    symbol: 'AAPL',
    assetName: 'Apple Inc.',
    assetClass: 'Equity',
    shares: 60.0,
    avgCostPrice: 198.50,
    currentPrice: 232.40,
    totalValue: 13944.00,
    totalGainLoss: 2034.00,
    totalGainLossPercent: 17.08,
    allocationPercent: 9.8
  },
  {
    id: 'hold-5',
    symbol: 'BTC',
    assetName: 'Bitcoin',
    assetClass: 'Crypto',
    shares: 0.285,
    avgCostPrice: 51200.00,
    currentPrice: 68450.00,
    totalValue: 19508.25,
    totalGainLoss: 4916.25,
    totalGainLossPercent: 33.69,
    allocationPercent: 13.7
  },
  {
    id: 'hold-6',
    symbol: 'BND',
    assetName: 'Vanguard Total Bond Market ETF',
    assetClass: 'Bond',
    shares: 120.0,
    avgCostPrice: 71.50,
    currentPrice: 72.85,
    totalValue: 8742.00,
    totalGainLoss: 162.00,
    totalGainLossPercent: 1.89,
    allocationPercent: 6.1
  },
  {
    id: 'hold-7',
    symbol: 'SCHD',
    assetName: 'Schwab US Dividend Equity ETF',
    assetClass: 'ETF',
    shares: 80.0,
    avgCostPrice: 78.20,
    currentPrice: 84.15,
    totalValue: 6732.00,
    totalGainLoss: 476.00,
    totalGainLossPercent: 7.61,
    allocationPercent: 4.7
  },
  {
    id: 'hold-8',
    symbol: 'GLD',
    assetName: 'SPDR Gold Shares',
    assetClass: 'Commodity',
    shares: 22.0,
    avgCostPrice: 224.00,
    currentPrice: 254.30,
    totalValue: 5594.60,
    totalGainLoss: 666.60,
    totalGainLossPercent: 13.53,
    allocationPercent: 3.9
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-103',
    symbol: 'NVDA',
    assetName: 'NVIDIA Corporation',
    side: 'BUY',
    orderType: 'MARKET',
    shares: 45.0,
    price: 138.25,
    totalAmount: 6221.25,
    status: 'PENDING_APPROVAL',
    timestamp: '2026-11-01 02:45 PM',
    assetClass: 'Equity',
    clientName: 'Favour Adaigbe (#7812)',
    riskFlag: 'Order Volume > $5,000 Limit'
  },
  {
    id: 'ord-102',
    symbol: 'BTC',
    assetName: 'Bitcoin',
    side: 'BUY',
    orderType: 'LIMIT',
    shares: 0.12,
    price: 68450.00,
    limitPrice: 68000.00,
    totalAmount: 8214.00,
    status: 'PENDING_APPROVAL',
    timestamp: '2026-11-01 01:20 PM',
    assetClass: 'Crypto',
    clientName: 'Favour Adaigbe (#7812)',
    riskFlag: 'Digital Asset Volatility Review'
  },
  {
    id: 'ord-101',
    symbol: 'VOO',
    assetName: 'Vanguard S&P 500 ETF',
    side: 'BUY',
    orderType: 'MARKET',
    shares: 2.5,
    price: 524.80,
    totalAmount: 1312.00,
    status: 'FILLED',
    timestamp: '2026-11-01 10:14 AM',
    assetClass: 'ETF',
    clientName: 'Favour Adaigbe (#7812)'
  },
  {
    id: 'ord-100',
    symbol: 'NVDA',
    assetName: 'NVIDIA Corporation',
    side: 'BUY',
    orderType: 'LIMIT',
    shares: 10.0,
    price: 134.50,
    limitPrice: 135.00,
    totalAmount: 1345.00,
    status: 'FILLED',
    timestamp: '2026-10-28 02:30 PM',
    assetClass: 'Equity'
  },
  {
    id: 'ord-99',
    symbol: 'BTC',
    assetName: 'Bitcoin',
    side: 'BUY',
    orderType: 'MARKET',
    shares: 0.05,
    price: 66200.00,
    totalAmount: 3310.00,
    status: 'FILLED',
    timestamp: '2026-10-24 11:05 AM',
    assetClass: 'Crypto'
  },
  {
    id: 'ord-98',
    symbol: 'TSLA',
    assetName: 'Tesla Inc.',
    side: 'SELL',
    orderType: 'MARKET',
    shares: 15.0,
    price: 260.00,
    totalAmount: 3900.00,
    status: 'FILLED',
    timestamp: '2026-10-18 09:45 AM',
    assetClass: 'Equity'
  }
];

export const INITIAL_GOALS: InvestmentGoal[] = [
  {
    id: 'goal-1',
    title: 'Financial Independence / Early Retirement',
    targetAmount: 750000,
    currentAmount: 142837,
    targetYear: 2038,
    category: 'Retirement',
    monthlyContribution: 1250,
    riskProfile: 'Aggressive',
    color: '#10b981' // emerald
  },
  {
    id: 'goal-2',
    title: 'Pacific Coast Property Down Payment',
    targetAmount: 120000,
    currentAmount: 58500,
    targetYear: 2028,
    category: 'Real Estate',
    monthlyContribution: 950,
    riskProfile: 'Moderate',
    color: '#06b6d4' // cyan
  },
  {
    id: 'goal-3',
    title: 'High-Yield Liquid Emergency Fund',
    targetAmount: 25000,
    currentAmount: 14250,
    targetYear: 2027,
    category: 'Emergency',
    monthlyContribution: 400,
    riskProfile: 'Conservative',
    color: '#8b5cf6' // violet
  }
];

export const INITIAL_RECURRING_PLANS: RecurringPlan[] = [
  {
    id: 'dca-1',
    symbol: 'VOO',
    assetName: 'Vanguard S&P 500 ETF',
    amount: 250,
    frequency: 'Weekly',
    nextExecution: 'Monday, 9:30 AM EST',
    active: true
  },
  {
    id: 'dca-2',
    symbol: 'NVDA',
    assetName: 'NVIDIA Corporation',
    amount: 150,
    frequency: 'Bi-Weekly',
    nextExecution: '1st & 15th of month',
    active: true
  },
  {
    id: 'dca-3',
    symbol: 'BTC',
    assetName: 'Bitcoin',
    amount: 50,
    frequency: 'Weekly',
    nextExecution: 'Every Sunday midnight',
    active: true
  }
];

export const INITIAL_BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'bank-1',
    bankName: 'JPMorgan Chase Bank',
    accountNumberMask: '•••• 4892',
    type: 'Checking'
  },
  {
    id: 'bank-2',
    bankName: 'Bank of America',
    accountNumberMask: '•••• 7120',
    type: 'Savings'
  }
];

export const PERFORMANCE_TIMEFRAMES = {
  '1D': [
    { date: '9:30 AM', value: 141920, benchmark: 141920 },
    { date: '10:30 AM', value: 142310, benchmark: 142100 },
    { date: '11:30 AM', value: 142100, benchmark: 142050 },
    { date: '12:30 PM', value: 142640, benchmark: 142280 },
    { date: '1:30 PM', value: 142490, benchmark: 142400 },
    { date: '2:30 PM', value: 142780, benchmark: 142650 },
    { date: '3:30 PM', value: 142837, benchmark: 142720 },
    { date: '4:00 PM', value: 142890, benchmark: 142750 }
  ],
  '1W': [
    { date: 'Mon', value: 139800, benchmark: 140200 },
    { date: 'Tue', value: 140650, benchmark: 140900 },
    { date: 'Wed', value: 141200, benchmark: 141100 },
    { date: 'Thu', value: 140950, benchmark: 141400 },
    { date: 'Fri', value: 142100, benchmark: 142100 },
    { date: 'Sat', value: 142450, benchmark: 142100 },
    { date: 'Sun', value: 142890, benchmark: 142750 }
  ],
  '1M': [
    { date: 'Week 1', value: 136400, benchmark: 137800 },
    { date: 'Week 2', value: 138200, benchmark: 139100 },
    { date: 'Week 3', value: 139900, benchmark: 140500 },
    { date: 'Week 4', value: 142890, benchmark: 142750 }
  ],
  '1Y': [
    { date: 'Nov 25', value: 108400, benchmark: 112000 },
    { date: 'Jan 26', value: 114500, benchmark: 116200 },
    { date: 'Mar 26', value: 121800, benchmark: 122400 },
    { date: 'May 26', value: 126900, benchmark: 127100 },
    { date: 'Jul 26', value: 132400, benchmark: 133800 },
    { date: 'Sep 26', value: 137100, benchmark: 138500 },
    { date: 'Nov 26', value: 142890, benchmark: 142750 }
  ],
  'ALL': [
    { date: '2022', value: 48000, benchmark: 52000 },
    { date: '2023', value: 68500, benchmark: 71000 },
    { date: '2024', value: 94200, benchmark: 98000 },
    { date: '2025', value: 118400, benchmark: 121000 },
    { date: '2026', value: 142890, benchmark: 142750 }
  ]
};

export const INVESTMENT_PLANS: import('../types/investment').InvestmentPlan[] = [
  {
    id: 'plan-beginner',
    title: 'Beginner Investment Portfolio',
    category: 'Beginner Investment',
    minAmount: 500,
    duration: '3 - 12 Months',
    riskClassification: 'Low',
    applicableFees: '0.25% per annum (No performance drag, zero entry fees)',
    expectedReturnInfo: 'Historical benchmark reference: 4.8% – 6.2% annualized yield based on short-term sovereign treasuries & ultra-short credit instruments. Disclosed for illustrative modeling; returns subject to macroeconomic rates.',
    terms: 'Daily liquidity after initial 30 days. Automated capital reinvestment. Complete custody audit receipts provided monthly.',
    description: 'Designed for emerging investors taking their first disciplined steps in wealth accumulation. Focuses on principal safety, stable liquidity, and low-volatility fixed income.',
    highlights: [
      'Low minimum entry barrier of $500',
      'Daily liquidity access with automated cash sweep',
      'Capital preservation priority over market timing',
      'Complimentary quarterly financial check-in'
    ],
    recommendedFor: 'First-time investors, emergency reserve compounding, and low-risk savers',
    popularBadge: false
  },
  {
    id: 'plan-growth',
    title: 'Dynamic Growth Equity Strategy',
    category: 'Growth Investment',
    minAmount: 5000,
    duration: '12 - 36 Months',
    riskClassification: 'Moderate',
    applicableFees: '0.45% per annum with automated tax-loss harvesting',
    expectedReturnInfo: 'Historical benchmark target: 9.5% – 13.8% annualized average referenced against S&P 500 and global technology innovators over rolling 3-year periods. Market risks apply; capital is at risk.',
    terms: 'Quarterly portfolio rebalancing. Minimum holding guideline of 12 months recommended. Full multi-device dashboard analytics included.',
    description: 'An aggressive capital appreciation vehicle investing across industry leaders, transformative semiconductor equities, and broad global index ETFs with systematic dollar-cost averaging.',
    highlights: [
      'Diversified exposure to US Large-Cap & Global Tech',
      'Dynamic automated robo-rebalancing',
      'Smart dividend reinvestment compounding',
      'Priority access to market analysis briefings'
    ],
    recommendedFor: 'Professionals seeking accelerated long-term capital appreciation',
    popularBadge: true
  },
  {
    id: 'plan-premium',
    title: 'Premium Private Wealth Mandate',
    category: 'Premium Wealth Management',
    minAmount: 50000,
    duration: '24 - 60 Months',
    riskClassification: 'Balanced Growth',
    applicableFees: '0.65% annual tiered advisory fee (Decreases at $250k+ thresholds)',
    expectedReturnInfo: 'Multi-asset institutional benchmark: 8.2% – 15.4% modeled annualized target utilizing asymmetric hedging, private credit, and alternative allocations. Not a guaranteed return.',
    terms: 'Dedicated Chartered Financial Analyst (CFA) relationship manager. Monthly private statement delivery. Cross-border tax structuring consultations.',
    description: 'Bespoke wealth management tailored for high-net-worth clients requiring custom asset allocation, defensive tail-risk hedges, and direct institutional market access.',
    highlights: [
      'Dedicated private wealth advisory council',
      'Customized risk parameters & liquidity windows',
      'Pre-trade compliance & institutional routing',
      'Multi-currency and crypto-spot custody pairing'
    ],
    recommendedFor: 'High-net-worth individuals, entrepreneurs, and established portfolios',
    popularBadge: false
  },
  {
    id: 'plan-longterm',
    title: 'Generational Sovereign Wealth Plan',
    category: 'Long-Term Investment',
    minAmount: 100000,
    duration: '5 - 10+ Years',
    riskClassification: 'Institutional',
    applicableFees: '0.50% per annum institutional flat schedule',
    expectedReturnInfo: 'Endowment style benchmark: Target inflation beat + 5.5% real annualized purchasing power protection over 5+ year cycles. Substantiated by multi-decade endowment studies.',
    terms: 'Family office multi-signatory access, trust and estate planning coordination, physical cold storage segregation for digital asset allocations.',
    description: 'Institutional-grade endowment strategy engineered to build resilient generational wealth resistant to currency devaluation, geopolitical volatility, and inflation shocks.',
    highlights: [
      'Endowment-grade asset distribution model',
      'Estate and generational transfer frameworks',
      'Private equity and real-asset allocations',
      'Comprehensive annual fiduciary audit review'
    ],
    recommendedFor: 'Family offices, legacy trusts, and retirement foundation builders',
    popularBadge: false
  }
];

export const WEALTH_SERVICES: import('../types/investment').WealthService[] = [
  {
    id: 'srv-wealth-mgmt',
    title: 'Wealth Management',
    tagline: 'Comprehensive, holistic financial governance for your entire net worth.',
    description: 'Holistic wealth oversight integrating tax optimization, liquid cash reserves, global equities, and legacy succession under unified institutional standards.',
    iconName: 'ShieldCheck',
    keyDeliverables: [
      'Consolidated multi-asset balance sheet tracking',
      'Tax-optimized distribution strategies',
      'Cross-generational capital preservation plans',
      'Fiduciary-governed advisory reviews'
    ],
    engagementProcess: 'Initial 60-minute balance sheet audit followed by bespoke asset policy formulation.'
  },
  {
    id: 'srv-portfolio-mgmt',
    title: 'Portfolio Management',
    tagline: 'Precision quantitative execution and active risk-adjusted rebalancing.',
    description: 'Systematic asset allocation using proprietary quantitative models to capture market upside while minimizing downside drawdowns across turbulent economic cycles.',
    iconName: 'PieChart',
    keyDeliverables: [
      'Dynamic factor weighting & asset rebalancing',
      'Systematic risk-adjusted return targeting',
      'Automated dividend compounding protocols',
      'Transparent real-time trade logs and audit trails'
    ],
    engagementProcess: 'Continuous programmatic monitoring with quarterly formal mandate reviews.'
  },
  {
    id: 'srv-investment-planning',
    title: 'Investment Planning',
    tagline: 'Disciplined roadmap connecting capital allocation directly to life milestones.',
    description: 'Transform financial objectives into structured, mathematically validated investment schedules designed to navigate inflation, market regimes, and life changes.',
    iconName: 'Target',
    keyDeliverables: [
      'Monte Carlo probability simulations',
      'Milestone-driven capital deployment calendars',
      'Stress-testing against historical recession scenarios',
      'Adjustable liquidity reserves framework'
    ],
    engagementProcess: 'Collaborative interactive roadmap session refreshed annually.'
  },
  {
    id: 'srv-financial-advisory',
    title: 'Financial Advisory',
    tagline: 'Unbiased, conflict-free guidance from seasoned fiduciary directors.',
    description: 'Strategic counsel covering corporate liquidity events, real estate acquisitions, equity compensation liquidation, and institutional debt structuring.',
    iconName: 'Users',
    keyDeliverables: [
      'Fiduciary counsel free of hidden distributor commissions',
      'Stock options (ISO/NSO/RSU) liquidation planning',
      'Debt structure and credit optimization advice',
      'Major capital expenditure advisory'
    ],
    engagementProcess: 'Direct on-demand access to our senior financial advisory board.'
  },
  {
    id: 'srv-asset-allocation',
    title: 'Asset Allocation',
    tagline: 'Modern Portfolio Theory enhanced by macro liquidity indicators.',
    description: 'Strategic distribution across uncorrelated asset classes—equities, fixed income, real estate trusts, commodities, and digital assets—to construct robust all-weather portfolios.',
    iconName: 'Layers',
    keyDeliverables: [
      'Uncorrelated asset class diversification',
      'Macro volatility regime detection',
      'Currency and inflation hedging layers',
      'Bespoke risk tolerance profile calibration'
    ],
    engagementProcess: 'Quantitative correlation matrix generated for each client account.'
  },
  {
    id: 'srv-retirement-planning',
    title: 'Retirement Planning',
    tagline: 'Sustained purchasing power and reliable cash flows for peace of mind.',
    description: 'Design resilient retirement decumulation engines ensuring you never outlive your wealth while safeguarding lifestyle standards against purchasing power erosion.',
    iconName: 'Clock',
    keyDeliverables: [
      'Cash flow glidepaths and withdrawal sequencing',
      'Required Minimum Distribution (RMD) optimization',
      'Healthcare and long-term care reserve modeling',
      'Social Security and pension timing analysis'
    ],
    engagementProcess: 'Decumulation roadmap modeling with annual inflation adjustments.'
  },
  {
    id: 'srv-risk-management',
    title: 'Risk Management',
    tagline: 'Institutional defense against catastrophic tail-risks and systemic shocks.',
    description: 'Rigorous protective mechanisms including asymmetric options hedging, stop-loss triggers, counterparty risk assessments, and cold storage asset protection.',
    iconName: 'ShieldAlert',
    keyDeliverables: [
      'Tail-risk scenario stress tests',
      'Value-at-Risk (VaR) portfolio thresholds',
      'Counterparty and custodian solvency verification',
      'Pre-trade compliance limits and guardrails'
    ],
    engagementProcess: 'Daily algorithmic surveillance with automated alert notifications.'
  },
  {
    id: 'srv-longterm-wealth',
    title: 'Long-Term Wealth Planning',
    tagline: 'Generational legacy frameworks and enduring philanthropic vehicles.',
    description: 'Architecting multi-decade trusts, family governance constitutions, and charitable structures designed to endure across generations with minimal tax friction.',
    iconName: 'TrendingUp',
    keyDeliverables: [
      'Trust and estate structural blueprints',
      'Donor-advised funds and philanthropic foundations',
      'Next-generation financial stewardship education',
      'Asset protection against legal liabilities'
    ],
    engagementProcess: 'Tri-party conferences coordinated with your legal and tax specialists.'
  }
];

export const INITIAL_LOAN_APPLICATIONS: import('../types/investment').LoanApplication[] = [
  {
    id: 'loan-app-101',
    userId: 'usr-901',
    clientName: 'Julian Sterling',
    clientEmail: 'j.sterling@aetwealthcapital.com',
    amount: 25000,
    purpose: 'Portfolio Margin & Bridge Liquidity',
    durationMonths: 12,
    interestRate: 6.5,
    creditCard: {
      cardNumberMasked: '•••• •••• •••• 8842',
      cardholderName: 'Julian Sterling',
      expiry: '08/28',
      cvvMasked: '•••',
      billingZip: '10005'
    },
    status: 'PENDING_APPROVAL',
    submittedAt: 'Today, 09:15 AM'
  },
  {
    id: 'loan-app-102',
    userId: 'usr-902',
    clientName: 'Claire Vance',
    clientEmail: 'claire.vance@vancetech.io',
    amount: 50000,
    purpose: 'Real Estate Opportunity Down Payment',
    durationMonths: 24,
    interestRate: 5.9,
    creditCard: {
      cardNumberMasked: '•••• •••• •••• 3190',
      cardholderName: 'Claire Vance',
      expiry: '11/27',
      cvvMasked: '•••',
      billingZip: '94107'
    },
    status: 'PENDING_APPROVAL',
    submittedAt: 'Yesterday, 04:30 PM'
  }
];

export const INITIAL_INQUIRIES: import('../types/investment').InvestmentInquiry[] = [
  {
    id: 'inq-01',
    planId: 'plan-growth',
    planName: 'Dynamic Growth Equity Strategy',
    clientName: 'David H. Reynolds',
    email: 'd.reynolds@reynoldscap.com',
    phone: '+1 (212) 555-0198',
    intendedAmount: 15000,
    message: 'Interested in dollar-cost averaging into US equities and semiconductor leaders.',
    timestamp: '2 hours ago',
    status: 'NEW'
  },
  {
    id: 'inq-02',
    planId: 'plan-premium',
    planName: 'Premium Private Wealth Mandate',
    clientName: 'Samantha Lin',
    email: 's.lin@horizonhealth.org',
    phone: '+1 (415) 555-7721',
    intendedAmount: 75000,
    message: 'Looking for a dedicated CFA advisor to reallocate tech liquidity into a diversified defensive structure.',
    timestamp: '5 hours ago',
    status: 'NEW'
  }
];

export const LEADERSHIP_TEAM = [
  {
    name: 'Alexander E. Thorne',
    role: 'Chief Executive Officer & Managing Director',
    credentials: 'CFA, MBA · 22+ Years in Institutional Wealth',
    bio: 'Former Senior Portfolio Director at Global Asset Management, directing macro asset allocation and fiduciary client advisory.',
    imagePlaceholder: 'AT'
  },
  {
    name: 'Dr. Evelyn Sterling',
    role: 'Chief Investment Officer (CIO)',
    credentials: 'Ph.D. in Quantitative Finance, MIT',
    bio: 'Specialist in dynamic factor modeling, algorithmic risk management, and quantitative multi-asset diversification strategies.',
    imagePlaceholder: 'ES'
  },
  {
    name: 'Marcus Vance',
    role: 'Head of Fiduciary Compliance & Regulatory Oversight',
    credentials: 'JD, Series 7, 24 & 66 Registered',
    bio: 'Leads our strict compliance architecture, AML/KYC governance, trade authorization audits, and client privacy mandates.',
    imagePlaceholder: 'MV'
  },
  {
    name: 'Sophia Arisawa',
    role: 'Director of Private Client Services',
    credentials: 'CFP® · High-Net-Worth Advisory Lead',
    bio: 'Oversees personalized wealth blueprints, retirement cash-flow modeling, and generational endowment accounts.',
    imagePlaceholder: 'SA'
  }
];

export const COMPANY_VALUES = [
  {
    title: 'Uncompromising Fiduciary Duty',
    description: 'We operate strictly under fiduciary standards. Your financial prosperity and capital preservation always precede all other institutional interests.'
  },
  {
    title: 'Absolute Transparency & Auditability',
    description: 'Zero hidden fees, zero manufactured metrics. Every portfolio allocation, trading fee, and execution timestamp is open to your inspection.'
  },
  {
    title: 'Disciplined Risk Architecture',
    description: 'We believe capital preservation is the prerequisite for enduring growth. Every strategy undergoes rigorous stress tests before client capital is deployed.'
  },
  {
    title: 'Innovation Paired with Prudence',
    description: 'Harnessing modern algorithmic execution and digital asset custody while upholding timeless risk-management principles.'
  }
];

