export default {
    'devnet': {
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
      gasPrice: 0.0025,
      maxTxSender: 25,
      maxTxRecipient: 25,
      fiatCurrency: [{
          viewDenom: 'USD',
          name: 'Dollar'
        },
        { 
          viewDenom: 'EUR',
          name: 'Euro'
        }
      ]
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
      gasPrice: 0.0025,
      maxTxSender: 50,
      maxTxRecipient: 50,
      fiatCurrency: [{
        viewDenom: 'USD',
        name: 'Dollar'
      },
      { 
        viewDenom: 'EUR',
        name: 'Euro'
      }
    ]
    },
    'mainnet': {
      chainId: 'bitcanna-dev-6',
      name: 'BitCanna',
      type: 'devnet',
      apiURL: 'https://lcd-devnet-6.bitcanna.io',
      rpcURL: 'https://rpc-devnet-6.bitcanna.io',
      coinLookup: {
        viewDenom: 'BCNA',
        chainDenom: 'ubcna',
        addressPrefix: 'bcna'
      },
      coingeckoId: 'bitcanna',
      feeMultiplier: 1.9,
      gasPrice: 0.0025,
      maxTxSender: 50,
      maxTxRecipient: 50,
      fiatCurrency: [{
        viewDenom: 'USD',
        name: 'Dollar'
      },
      { 
        viewDenom: 'EUR',
        name: 'Euro'
      }
    ]
    },
  }
  