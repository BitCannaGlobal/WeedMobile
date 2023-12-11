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
      checkMnemonic: 'Check mnemonic', 
      return: 'Return',
      nextStep: 'Next step',
      walletName: 'Wallet name',
      walletPassword: 'Wallet password',
      save: 'Save',
    },
    mdlImportAccount: {
      title: 'Import wallet',
      save: 'Save',
      subtitle: 'Here you can import your mnenomics safely! Your passphrase will be encrypted with your masterpassword',
      name: 'Wallet name',
      address: 'Address',
      password: 'Password',
    },
    viewMnemonic: {
      title: 'Mnemonic Seed',
      subtitle: 'View your mnemonic',
    },
    deleteWallet: {
      btnClose: 'Close',
      btnDelete: 'Delete',
      altSuccess: 'Wallet deleted',
      agreeDelete: 'You agree to delete your wallet from the app?',
      password: 'Password',
    },
    editWallet: {
      btnClose: 'Close',
      btnEdit: 'Edit wallet',
      altSuccess: 'Wallet edited',
      inputName: 'Wallet name',
    },
    rules: {
      required: 'Required',
      counter: 'Max 10 characters' 
    }
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
  scanQrcode: {
    scanned: {
      address: 'Address',
      amount: 'Amount',
      memo: 'Memo',
      error: 'You don\'t have enough bitcanna! Fund your account',
      badPass: 'Bad password',
      btnSend: 'Send',
      rescan: 'Rescan',
    }
  },
  config: {
    subheader: {
      general: 'General',
      privacy: 'Privacy',
      other: 'Other',
    },
    currency: {
      title: 'Currency',
      subtitle: 'Select your currency',
      close: 'Close',
    },
    language: {
      title: 'Language',
      subtitle: 'Select your language',
      close: 'Close',
    },
    viewMnemonic: {
      title: 'Mnemonic Seed',
      subtitle: 'View your mnemonic',
    },
    masterPassChange: {
      title: 'Master password',
      subtitle: 'Change master password',
      password1: 'Your Password',
      password2: 'New password',
      password3: 'Repeat new password',
      btnChange: 'Change masterPass',
      progress: 'Masterpassword change in progress',
      success: 'Masterpassword change is done!',
      close: 'Close',
    },
    timeout: {
      title: 'Set Timeout',
      subtitle: 'Select your timeout',
      close: 'Close',
      select: 'Select timeout',
      btnUpdate: 'Update timeout',
    },
    appInfo: {
      title: 'App info',
      subtitle: 'Here you can see app info',
      appVersion: 'App Version',
      version: 'Version',
      deviceInfo: 'Device info',
    },
    deleteWallet: {
      title: 'Delete wallet',
      subtitle: 'Delete wallet from phone',
    },
  },
  addressBook: {
    title: 'Address contact',
    btnAdd: 'Add contact',
    subtitle: 'Here you can save your contacts',
    name: 'Name',
    address: 'Address',
    memo: 'Default Memo',
    btnAddContact: 'Add contact',
    edit: {
      title: 'Edit contact',
      subtitle: 'Here you can edit your contacts'
    }, 
    delete: {
      title: 'Delete contact',
      close: 'Close',
      agree: 'You agree to delete this contact?',
    },
  },
  transactions: {
    title: 'Transactions',
    btnCreateQr: 'Create QR',
    btnViewTx: 'View transaction',
  },
  footer: {
    title1: 'Dashboard',  
    title2: 'Account', 
    title3: 'Config', 
  },
  errors: {
    badPassword: 'Wrong password',
    badMnemonic: 'Bad mnemonic',
    walletAlreadyExist: 'Wallet name already taken',
    walletAddressExist: 'Wallet address already taken',
  },
  approved: {
    title: 'Transaction approved',
    subtitle: 'Your transaction has been successfully sent',
    back: 'Back to dashboard',
  } 
}