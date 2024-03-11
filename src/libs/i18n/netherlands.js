export default { 
 
  menu: {
    title: 'BitCanna wallet',
    dashboard: 'Dashboard',
    addressBook: 'Adresboek',
    transactions: 'Transacties',
    createQrcode: 'QR maken',
    scanQrcode: 'Scan QR',
    logout: 'Uitloggen'
  },
  login: {
    title: 'Ontgrendel uw wallet',
    passInput: 'Wachtwoord',
    loginButton: 'Ontgrendelen',
    errorMsgSession: 'Sessie is verlopen',
    errorFormPassRequired: 'Een wachtwoord is verplicht',
    errorFormPassLength: 'Wachtwoord moet minder dan 20 tekens zijn',
    welcomMsg1: 'Welkom bij de BitCanna wallet',
    welcomMsg2: 'Maak eerst uw wachtwoord om uw wallet te kunnen gebruiken.',
    badPassword: 'Verkeerd wachtwoord',
    passToLong: 'Uw wachtwoord is te lang',
    setPass: 'Wachtwoord instellen',
    rmPass: 'Wachtwoord verwijderen',
    createPass: 'Maak een wachtwoord',
    savePass: 'Opslaan',
    passDescription: 'Uw wachtwoord wordt gebruikt om uw mnemonic te coderen en uw wallet te beveiligen.',
    formSetPass: 'Stel uw wachtwoord in',
    repeatPass: 'Herhaal uw wachtwoord'
  },
  dashboard: {
    title: '🇬🇧 Welkom',
    titleBlock: 'Wallet',
    available: 'Beschikbaar',
    rewards: 'Rente',
    btnSend: 'Versturen',
    btnQrCode: 'QR maken',
    btnStake: 'Delegeren',
    btnClaim: 'Rente claimen',
    btnCreateOne: 'Maak er hier een aan',
    welcomeNoWallet: 'Hé, er is nog geen wallet beschikbaar.',
    mdlSendTx: {
      title: 'Verstuur BCNA',
      subTitle: 'Hier kunt u uw BitCanna-coin beschikbaar sturen op uw wallet',
      inpRecipient: 'Ontvanger',
      inpAmount: 'Hoeveelheid',
      inpMemo: 'Memo',
      inpPassword: 'Wachtwoord',
      btnSend: 'Versturen',
      errorAddrRequire: 'Adres is vereist',
      errorPrefix: 'Adres moet beginnen met BCNA',
      errorBech32: 'Verkeerd adres (niet de goede structuur)',
      errorMemo: 'Memo moet minder dan 100 tekens lang zijn',
      errorAmountRequire: 'Bedrag is vereist',
      errorAmountNumber: 'Bedrag moet bestaan uit cijfers',
      errorAmountDecimal: 'Teveel cijfers achter de komma'
    },
    mdlClaimTx: {
      title: 'Claim rente',
      subTitle: 'Uw rente',
      inpPassword: 'Wachtwoord',
      btnClaim: 'Claimen',
    },
    mdlStake: {
      title: 'Staking',
      amountDelegate: 'Amount to delegate',
      half: 'Half',
      max: 'Max',
      selectVal: 'Select validator',
      delNow: 'Delegate now',
      titleUndel: 'Amount to Undelegate',
      undelNow: 'UnDelegate now',
      titleRedel: 'Amount to redelegate',
      redelNow: 'reDelegate now', 
    },
  },
  accounts: {
    title: 'Adressen',
    createAccount: 'Aanmaken',
    importAccount: 'Importeren',
    selectWallet: 'Selecteer wallet',
    btnEditAccount: 'Bewerken',
    btnDeleteAccount: 'Verwijderen',
    btnStartVerification: 'Start verificatie',
    mdlCreateAccount: {
      title: 'Account aanmaken',
      name: 'Naam',
      address: 'Adres',
      btnCreate: 'Aanmaken',
      step1: 'Stap 1',
      step2: 'Stap 2',
      step3: 'Stap 3',
      words: 'woorden',
      checkMnemonic: 'Controleer mnemonic',
      return: 'Terug',
      nextStep: 'Volgende stap',
      walletName: 'Wallet',
      walletPassword: 'Wachtwoord',
      save: 'Opslaan'
    },
    mdlImportAccount: {
      title: 'Import wallet',
      save: 'Opslaan',
      subtitle: 'Hier kunt u uw mnenomics veilig importeren! Deze wordt gecodeerd met uw wachtwoord',
      name: 'Wallet',
      address: 'Adres',
      password: 'Wachtwoord',
      returnMsg: 'Uw mnemonic (houd deze geheim!)',
      errorWalletRequired: 'Wallet naam is vereist',
      errorWalletLength: 'Wallet naam moet minder dan 20 tekens zijn',
      errorPasswordRequired: 'Een wachtwoord is verplicht',
      errorPasswordLength: 'Wachtwoord moet minder dan 20 tekens zijn'
    },
    viewMnemonic: { title: 'Mnemonic', subtitle: 'Bekijk je mnemonic' },
    deleteWallet: {
      btnClose: 'Sluiten',
      btnDelete: 'Verwijderen',
      altSuccess: 'Wallet verwijderd',
      agreeDelete: 'Ga je ermee akkoord om je wallet uit de app te verwijderen?',
      password: 'Wachtwoord'
    },
    editWallet: {
      btnClose: 'Sluiten',
      btnEdit: 'Wallet bewerken',
      altSuccess: 'Wallet bewerkt',
      inputName: 'Wallet'
    },
    rules: { required: 'Vereist', counter: 'Max 10 tekens' }
  },
  createQrcode: {
    title: 'QR code maken',
    recipient: 'Ontvanger',
    amount: 'Hoeveelheid',
    currency: 'Munteenheid',
    memo: 'Memo',
    btnCreate: 'Genereren',
    btnBack: 'Terug',
    selectContact: 'Selecteer contact',
    rules: {
      amountRequire: 'Bedrag is vereist',
      amountNumber: 'Bedrag moet bestaan uit cijfers',
      amountDecimal: 'Teveel cijfers achter de komma',
      recipientRequire: 'Adres is vereist',
      recipientPrefix: 'Adres moet beginnen met BCNA',
      recipientBech32: 'Verkeerd adres (niet de goede structuur)'
    }
  },
  scanQrcode: {
    scanned: {
      address: 'Adres',
      password: 'Wachtwoord',
      amount: 'Hoeveelheid',
      memo: 'Memo',
      error: 'U heeft niet genoeg Bitcanna! Laad uw account op',
      badPass: 'Verkeerd wachtwoord',
      btnSend: 'Versturen',
      rescan: 'Opnieuw'
    },
    errorCamera: {
      title: 'We hebben een probleem met de machtiging ontdekt om uw camera te mogen gebruiken.',
      android: 'Als u Android gebruikt, klikt u op de onderstaande knop om autorisatie te accepteren.',
      ios: 'Als u iOS gebruikt, geeft u autorisatie in uw telefooninstellingen.'
    },
    addAuthCam: 'Voeg autorisatiecamera toe'
  },
  config: {
    subheader: { general: 'Algemeen', privacy: 'Privacy', other: 'Anders' },
    currency: {
      title: 'Munteenheid',
      subtitle: 'Selecteer uw valuta',
      close: 'Sluiten'
    },
    language: { title: 'Taal', subtitle: 'Selecteer je taal', close: 'Sluiten' },
    viewMnemonic: { title: 'Mnemonic', subtitle: 'Bekijk je mnemonic' },
    masterPassChange: {
      title: 'Wachtwoord',
      subtitle: 'Wijzig het wachtwoord',
      password1: 'Uw wachtwoord',
      password2: 'Nieuw wachtwoord',
      password3: 'Herhaal nieuw wachtwoord',
      btnChange: 'Verander wachtwoord',
      progress: 'Wachtwoord verandering in uitvoering',
      success: 'Wachtwoord is veranderd!',
      close: 'Sluiten'
    },
    autoLogout: { 
      title: 'Auto logout', 
      subtitle: 'Definieer tijd voor lockout',
      time: {
        min: '1 minuut',
        min5: '5 minuten',
        hour: '1 uur',
        hours6: '6 uur',
        day: '1 dag',
      }
    },
    timeout: {
      title: 'Stel time-out in',
      subtitle: 'Selecteer uw time-out',
      close: 'Sluiten',
      select: 'Selecteer time-out',
      btnUpdate: 'Update time-out'
    },
    appInfo: {
      title: 'App informatie',
      subtitle: 'Hier kunt u app-info zien',
      appVersion: 'App versie',
      version: 'Versie',
      deviceInfo: 'Apparaat info'
    },
    deleteWallet: {
      title: 'Verwijder wallet',
      subtitle: 'Verwijder wallet van uw telefoon'
    }
  },
  addressBook: {
    title: 'Contacten',
    btnAdd: 'Voeg contact toe',
    subtitle: 'Hier kunt u uw contacten opslaan',
    name: 'Naam',
    address: 'Adres',
    memo: 'Standaardmemo',
    btnAddContact: 'Voeg contact toe',
    errorNameRequire: 'Naam is vereist',
    errorNameLength: 'Naam moet minder dan 10 tekens zijn',
    errorAddrRequire: 'Adres is vereist',
    errorPrefix: 'Adres moet beginnen met BCNA',
    errorBech32: 'Verkeerd adres (niet de goede structuur)',
    errorMemo: 'Memo moet minder dan 100 tekens zijn',
    info: 'Informatie',
    edit: {
      title: 'Bewerk contact',
      subtitle: 'Hier kunt u uw contacten bewerken'
    },
    delete: {
      title: 'Verwijder contact',
      close: 'Sluiten',
      agree: 'Gaat u ermee akkoord om dit contact te verwijderen?'
    }
  },
  transactions: {
    title: 'Transacties',
    btnCreateQr: 'QR maken',
    btnViewTx: 'Bekijk transactie'
  },
  footer: { title1: 'Dashboard', title2: 'Adres', title3: 'Configuratie' },
  errors: {
    badPassword: 'Verkeerd wachtwoord',
    badMnemonic: 'Verkeerde mnemonic',
    walletAlreadyExist: 'Wallet naam al gebruikt',
    walletAddressExist: 'Wallet adres al aanwezig in uw app'
  },
  approved: {
    title: 'Goedgekeurde transactie',
    subtitle: 'Uw transactie is succesvol verzonden',
    back: 'Terug naar dashboard'
  }
} 
