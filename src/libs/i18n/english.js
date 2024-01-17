export default {
  menu: {
    title: 'BitCanna Wallet',
    dashboard: 'Dashboard',
    addressBook: 'Address book',
    transactions: 'Transactions',
    createQrcode: 'Create QR',
    scanQrcode: 'Scan QR', 
    logout: 'Logout',
  },
  login: {
    title: 'Unlock your wallet',
    passInput: 'Password',
    loginButton: 'Unlock',
    errorMsgSession: 'Session expired',
    errorFormPassRequired: 'Password is required',
    errorFormPassLength: 'Password must be less than 20 characters',
    welcomMsg1: 'Welcome to the BitCanna Wallet',
    welcomMsg2: 'Create first your password to use your wallet',
    badPassword: 'Wrong password',
    passToLong: 'Your password is too long',
    setPass: 'Set password',
    rmPass: 'Remove password',
    createPass: 'Create password',
    savePass: 'Save',
    passDescription: 'Your password is used to encrypt your mnemonic and secure your wallet',
    formSetPass: 'Set your password',
    repeatPass: 'Repeat your password',
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
    btnCreateOne: 'Create one here',
    welcomeNoWallet: 'Hey, there is no wallet available yet',  
    mdlSendTx: {
      title: 'Send token',
      subTitle: 'Here you can send your BitCanna token available on your wallet',
      inpRecipient: 'Recipient',
      inpAmount: 'Amount',
      inpMemo: 'Memo',   
      inpPassword: 'Password',
      btnSend: 'Send',
      errorAddrRequire: 'Address is required',
      errorPrefix: 'Address must start with bcna',
      errorBech32: 'Bad address (not bech32)',
      errorMemo: 'Memo must be less than 100 characters',
      errorAmountRequire: 'Amount is required',
      errorAmountNumber: 'Amount must be number',
      errorAmountDecimal: 'Bad decimal',
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
      subtitle: 'Here you can import your mnenomics safely! Your passphrase will be encrypted with your password',
      name: 'Wallet name',
      address: 'Address',
      password: 'Password',
      returnMsg: 'Your mnemonic (keep it secret!)',
      errorWalletRequired: 'Wallet name is required',
      errorWalletLength: 'Wallet name must be less than 20 characters',
      errorPasswordRequired: 'Password is required',
      errorPasswordLength: 'Password must be less than 20 characters',
    },
    viewMnemonic: {
      title: 'Mnemonic Seed',
      subtitle: 'View your mnemonics',
    },
    deleteWallet: {
      btnClose: 'Close',
      btnDelete: 'Delete',
      altSuccess: 'Wallet deleted',
      agreeDelete: 'Do you agree to delete your wallet from the App?',
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
      password: 'Password',
      amount: 'Amount',
      memo: 'Memo',
      error: 'You don\'t have enough BCNA! Please fund your account',
      badPass: 'Bad password',
      btnSend: 'Send',
      rescan: 'Rescan',
    },
    errorCamera: {
      title: 'We have detected a problem with authorization to use your camera.',
      android: 'If you are on Android, click on the button below to accept authorization.',
      ios: 'If you are on iPhone, please give authorization in your phone settings.',
    },
    addAuthCam: 'Add authorization camera',
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
      title: 'Password',
      subtitle: 'Change password',
      password1: 'Your password',
      password2: 'New password',
      password3: 'Repeat new password',
      btnChange: 'Change',
      progress: 'Password change in progress',
      success: 'Password change is done!',
      close: 'Close',
    },
    autoLogout: {
      title: 'Auto logout',
      subtitle: 'Define time for lockout', 
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
      subtitle: 'Delete wallet from device',
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
    errorNameRequire: 'Name is required',
    errorNameLength: 'Name must be less than 10 characters',
    errorAddrRequire: 'Address is required',
    errorPrefix: 'Address must start with bcna',
    errorBech32: 'Bad address (not bech32)',
    errorMemo: 'Memo must be less than 100 characters', 
    info: 'Infomations',
    edit: {
      title: 'Edit contact',
      subtitle: 'Here you can edit your contacts'
    }, 
    delete: {
      title: 'Delete contact',
      close: 'Close',
      agree: 'Do you agree to delete this contact?',
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
