export default {
  login: {
    title: 'Unlock your wallet',
    passInput: 'Password',
    loginButton: 'Unlock',
  },
  dashboard: {
    title: '🇬🇧 Welcome ', 
    titleBlock: 'Wallet value', 
    available: 'Available',
    rewards: 'Your rewards',
    btnSend: 'Send',
    btnQrCode: 'Create QR',
    btnStake: 'Stake',
    btnClaim: 'Claim',
    mdlSendTx: {
      title: 'Send token',
      subTitle: 'Here you can send your bitcanna token available on your wallet',
      inpRecipient: 'Recipient',
      inpAmount: 'Amount',
      inpMemo: 'Memo',   
      inpPassword: 'Password',
      btnSend: 'Send'
    },
  },
  accounts: {
    title: 'Accounts', 
    createAccount: 'Create',
    importAccount: 'Import',
    selectWallet: 'Select wallet',
    btnEditAccount: 'Edit',
    btnDeleteAccount: 'Delete',
    btnStartVerification: 'Start verification',
    mdlCreateAccount: {
      title: 'Create account',
      name: 'Name',
      address: 'Address',
      btnCreate: 'Create',
      step1: 'Step 1',
      step2: 'Step 2',
      step3: 'Step 3', 
      words: 'words',     
    },
  },
  createQrcode: {
    title: 'Create QR code', 
    recipient: 'Recipient',
    amount: 'Amount',
    currency: 'Currency',
    memo: 'Memo',
    btnCreate: 'Generate',
    btnBack: 'Back',
    selectContact: 'Select contact',
    rules: {
      amountRequire: 'Amount is required',
      amountNumber: 'Amount must be number',
      amountDecimal: 'Bad decimal',
      recipientRequire: 'Address is required',
      recipientPrefix: 'Address must start with bcna',
      recipientBech32: 'Bad address (not bech32)',
    }
  },
  config: {
    currency: {
      title: 'Currency',
      subtitle: 'Select your currency',
    },
    language: {
      title: 'Language',
      subtitle: 'Select your language',
    },
    viewMnemonic: {
      title: 'Mnemonic Seed',
      subtitle: 'View your mnemonic',
    },
    masterPassChange: {
      title: 'Master password',
      subtitle: 'Change master password',
    },
    deleteWallet: {
      title: 'Delete wallet',
      subtitle: 'Delete wallet from phone',
    },
  },
  footer: {
    title1: 'Dashboard',  
    title2: 'Account', 
    title3: 'Config', 
  },
  errors: {
    badPassword: 'Wrong password',
  },
  approved: {
    title: 'Transaction approved',
    subtitle: 'Your transaction has been successfully sent',
    back: 'Back to dashboard',
  } 
}