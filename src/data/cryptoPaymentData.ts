export interface CryptoNetworkConfig {
  id: string;
  name: string;
  shortName: string;
  address: string;
  confirmationsNeeded: number;
  avgTime: string;
  estGasFee: string;
  isRecommended?: boolean;
  tagOrMemoRequired?: boolean;
  explorerUrlPrefix: string;
}

export interface SupportedCrypto {
  id: string;
  symbol: string;
  name: string;
  type: 'STABLECOIN' | 'NATIVE_CRYPTO';
  fixedPrice?: number; // For stablecoins like USDC/USDT
  iconColor: string;
  badgeBg: string;
  badgeBorder: string;
  description: string;
  minimumDepositUsd: number;
  networks: CryptoNetworkConfig[];
}

export const SUPPORTED_CRYPTOS: SupportedCrypto[] = [
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin (Circle)',
    type: 'STABLECOIN',
    fixedPrice: 1.00,
    iconColor: 'text-sky-400',
    badgeBg: 'bg-sky-500/10',
    badgeBorder: 'border-sky-500/30',
    description: '100% backed by highly liquid cash and short-dated US Treasuries. Zero price volatility.',
    minimumDepositUsd: 10,
    networks: [
      {
        id: 'base',
        name: 'Base (Coinbase L2)',
        shortName: 'Base',
        address: '0x3d94A8E0296E06f3659223F629F742b79aB17B9C',
        confirmationsNeeded: 2,
        avgTime: '~2 sec',
        estGasFee: '< $0.01',
        isRecommended: true,
        explorerUrlPrefix: 'https://basescan.org/tx/'
      },
      {
        id: 'solana',
        name: 'Solana SPL',
        shortName: 'Solana',
        address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        confirmationsNeeded: 32,
        avgTime: '~1.5 sec',
        estGasFee: '< $0.001',
        explorerUrlPrefix: 'https://solscan.io/tx/'
      },
      {
        id: 'ethereum',
        name: 'Ethereum (ERC-20)',
        shortName: 'ERC-20',
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        confirmationsNeeded: 12,
        avgTime: '~15 sec',
        estGasFee: '~$1.85',
        explorerUrlPrefix: 'https://etherscan.io/tx/'
      },
      {
        id: 'arbitrum',
        name: 'Arbitrum One',
        shortName: 'Arbitrum',
        address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        confirmationsNeeded: 10,
        avgTime: '~3 sec',
        estGasFee: '~$0.04',
        explorerUrlPrefix: 'https://arbiscan.io/tx/'
      },
      {
        id: 'polygon',
        name: 'Polygon PoS',
        shortName: 'Polygon',
        address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
        confirmationsNeeded: 30,
        avgTime: '~8 sec',
        estGasFee: '~$0.02',
        explorerUrlPrefix: 'https://polygonscan.com/tx/'
      }
    ]
  },
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether USD',
    type: 'STABLECOIN',
    fixedPrice: 1.00,
    iconColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/30',
    description: 'Leading global digital dollar with multi-billion 24h institutional liquidity settlement.',
    minimumDepositUsd: 10,
    networks: [
      {
        id: 'tron',
        name: 'Tron (TRC-20)',
        shortName: 'TRC-20',
        address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t7',
        confirmationsNeeded: 19,
        avgTime: '~20 sec',
        estGasFee: '~$1.10',
        isRecommended: true,
        explorerUrlPrefix: 'https://tronscan.org/#/transaction/'
      },
      {
        id: 'solana-usdt',
        name: 'Solana SPL',
        shortName: 'Solana',
        address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
        confirmationsNeeded: 32,
        avgTime: '~1.5 sec',
        estGasFee: '< $0.001',
        explorerUrlPrefix: 'https://solscan.io/tx/'
      },
      {
        id: 'ethereum-usdt',
        name: 'Ethereum (ERC-20)',
        shortName: 'ERC-20',
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        confirmationsNeeded: 12,
        avgTime: '~15 sec',
        estGasFee: '~$2.10',
        explorerUrlPrefix: 'https://etherscan.io/tx/'
      },
      {
        id: 'arbitrum-usdt',
        name: 'Arbitrum One',
        shortName: 'Arbitrum',
        address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
        confirmationsNeeded: 10,
        avgTime: '~3 sec',
        estGasFee: '~$0.04',
        explorerUrlPrefix: 'https://arbiscan.io/tx/'
      }
    ]
  },
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    type: 'NATIVE_CRYPTO',
    iconColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/30',
    description: 'Pioneering decentralized sound money. Institutional cold custody multi-sig vault.',
    minimumDepositUsd: 25,
    networks: [
      {
        id: 'btc-native',
        name: 'Bitcoin Native (SegWit bc1q)',
        shortName: 'Native SegWit',
        address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
        confirmationsNeeded: 2,
        avgTime: '~10-15 min',
        estGasFee: '~$1.50',
        isRecommended: true,
        explorerUrlPrefix: 'https://mempool.space/tx/'
      },
      {
        id: 'btc-lightning',
        name: 'Lightning Network',
        shortName: 'Lightning',
        address: 'lnbc250u1pj8z4...aura-institutional-node',
        confirmationsNeeded: 1,
        avgTime: '< 1 sec',
        estGasFee: '< $0.01',
        explorerUrlPrefix: 'https://mempool.space/lightning/'
      }
    ]
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'NATIVE_CRYPTO',
    iconColor: 'text-indigo-400',
    badgeBg: 'bg-indigo-500/10',
    badgeBorder: 'border-indigo-500/30',
    description: 'Leading decentralized programmable settlement network and institutional collateral base.',
    minimumDepositUsd: 20,
    networks: [
      {
        id: 'eth-mainnet',
        name: 'Ethereum Mainnet',
        shortName: 'Mainnet',
        address: '0x71C6947bB829E182390a16B4f44778E2b7D35Ea9',
        confirmationsNeeded: 12,
        avgTime: '~15 sec',
        estGasFee: '~$2.00',
        explorerUrlPrefix: 'https://etherscan.io/tx/'
      },
      {
        id: 'eth-base',
        name: 'Base Network (Coinbase L2)',
        shortName: 'Base L2',
        address: '0x71C6947bB829E182390a16B4f44778E2b7D35Ea9',
        confirmationsNeeded: 2,
        avgTime: '~2 sec',
        estGasFee: '< $0.01',
        isRecommended: true,
        explorerUrlPrefix: 'https://basescan.org/tx/'
      },
      {
        id: 'eth-arbitrum',
        name: 'Arbitrum One L2',
        shortName: 'Arbitrum',
        address: '0x71C6947bB829E182390a16B4f44778E2b7D35Ea9',
        confirmationsNeeded: 10,
        avgTime: '~3 sec',
        estGasFee: '~$0.04',
        explorerUrlPrefix: 'https://arbiscan.io/tx/'
      }
    ]
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    type: 'NATIVE_CRYPTO',
    iconColor: 'text-purple-400',
    badgeBg: 'bg-purple-500/10',
    badgeBorder: 'border-purple-500/30',
    description: 'High-throughput Layer 1 optimized for lightning-fast sub-second settlements.',
    minimumDepositUsd: 15,
    networks: [
      {
        id: 'sol-mainnet',
        name: 'Solana Mainnet-Beta',
        shortName: 'Solana',
        address: 'SoL9vQpG7W1a4T6y8d2Z5b9C3e1F7a8B4c2E6f1D3a5',
        confirmationsNeeded: 32,
        avgTime: '~1.5 sec',
        estGasFee: '< $0.001',
        isRecommended: true,
        explorerUrlPrefix: 'https://solscan.io/tx/'
      }
    ]
  }
];

export const generateSimulatedTxHash = (networkId: string): string => {
  const chars = '0123456789abcdef';
  if (networkId.includes('sol')) {
    const b58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let res = '';
    for (let i = 0; i < 64; i++) {
      res += b58.charAt(Math.floor(Math.random() * b58.length));
    }
    return res;
  }
  if (networkId.includes('btc') || networkId.includes('tron')) {
    let res = '';
    for (let i = 0; i < 64; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
  }
  // EVM 0x
  let res = '0x';
  for (let i = 0; i < 64; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
};
