export default {
  'mainnet': {
    chainId: 'bitcanna-1',
    name: 'BitCanna',
    type: 'mainnet',
    apiURL: 'https://lcd.bitcanna.io',
    rpcURL: 'https://rpc.bitcanna.io',
    coinLookup: {
      viewDenom: 'BCNA',
      chainDenom: 'ubcna',
      addressPrefix: 'bcna'
    },
    coingeckoId: 'bitcanna',
    feeMultiplier: 1.9,
    gasPrice: 0.0025
  },
  'testnet': {
    chainId: 'bitcanna-dev-1',
    name: 'BitCanna',
    type: 'testnet',
    apiURL: 'https://lcd-testnet.bitcanna.io',
    rpcURL: 'https://rpc-testnet.bitcanna.io',
    coinLookup: {
      viewDenom: 'BCNA',
      chainDenom: 'ubcna',
      addressPrefix: 'bcna'
    },
    coingeckoId: 'bitcanna',
    feeMultiplier: 1.9,
    gasPrice: 0.0025
  },
}
