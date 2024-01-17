export default { 
 
  menu: {
    title: 'Bitcanna -portemonnee',
    dashboard: 'Dashboard',
    addressBook: 'Adresboek',
    transactions: 'Transacties',
    createQrcode: 'Creëer QR',
    scanQrcode: 'Scan QR',
    logout: 'Uitloggen'
  },
  login: {
    title: 'Ontgrendel uw portemonnee',
    passInput: 'Wachtwoord',
    loginButton: 'Ontgrendelen',
    errorMsgSession: 'Sessie verlopen',
    errorFormPassRequired: 'Een wachtwoord is verplicht',
    errorFormPassLength: 'Wachtwoord moet minder zijn dan 20 tekens',
    welcomMsg1: 'Welkom bij de Bitcanna -portemonnee',
    welcomMsg2: 'Maak eerst uw wachtwoord om uw portemonnee te gebruiken.',
    badPassword: 'Verkeerd wachtwoord',
    passToLong: 'Uw wachtwoord is te lang',
    setPass: 'Set MasterPass',
    rmPass: 'Verwijder MasterPass',
    createPass: 'Maak een wachtwoord',
    savePass: 'Redden',
    passDescription: 'Uw wachtwoord wordt gebruikt om uw mnemonic te coderen en uw portemonnee te beveiligen.',
    formSetPass: 'Stel je wachtwoord in',
    repeatPass: 'Herhaal uw wachtwoord'
  },
  dashboard: {
    title: '🇬🇧 Welkom',
    titleBlock: 'Portemonnee',
    available: 'Beschikbaar',
    rewards: 'Uw beloningen',
    btnSend: 'Versturen',
    btnQrCode: 'Creëer QR',
    btnStake: 'Inzet',
    btnClaim: 'Claim',
    btnCreateOne: 'Maak er hier een aan',
    welcomeNoWallet: 'Hé, er is nog geen portemonnee beschikbaar.',
    mdlSendTx: {
      title: 'Stuur token',
      subTitle: 'Hier kunt u uw Bitcanna -token beschikbaar sturen op uw portemonnee',
      inpRecipient: 'Ontvanger',
      inpAmount: 'Hoeveelheid',
      inpMemo: 'Memo',
      inpPassword: 'Wachtwoord',
      btnSend: 'Versturen',
      errorAddrRequire: 'adres is nodig',
      errorPrefix: 'Adres moet beginnen met BCNA',
      errorBech32: 'Slecht adres (niet BECH32)',
      errorMemo: 'Memo moet minder zijn dan 100 tekens',
      errorAmountRequire: 'Bedrag is vereist',
      errorAmountNumber: 'Bedrag moet nummer zijn',
      errorAmountDecimal: 'Slecht decimaal'
    }
  },
  accounts: {
    title: 'Rekeningen',
    createAccount: 'Creëren',
    importAccount: 'Importeren',
    selectWallet: 'Selecteer portemonnee',
    btnEditAccount: 'Bewerking',
    btnDeleteAccount: 'Verwijderen',
    btnStartVerification: 'Start verificatie',
    mdlCreateAccount: {
      title: 'Account aanmaken',
      name: 'Naam',
      address: 'Adres',
      btnCreate: 'Creëren',
      step1: 'Stap 1',
      step2: 'Stap 2',
      step3: 'Stap 3',
      words: 'woorden',
      checkMnemonic: 'Controleer mnemonic',
      return: 'Opbrengst',
      nextStep: 'Volgende stap',
      walletName: 'Portemonnee',
      walletPassword: 'Portemonnee wachtwoord',
      save: 'Redden'
    },
    mdlImportAccount: {
      title: 'Import portemonnee',
      save: 'Redden',
      subtitle: 'Hier kunt u uw mnenomics veilig importeren! Uw wachtwoordzin wordt gecodeerd met uw masterPassword',
      name: 'Portemonnee',
      address: 'Adres',
      password: 'Wachtwoord',
      returnMsg: 'Uw mnemonic (houd het geheim!)',
      errorWalletRequired: 'Wallet -naam is vereist',
      errorWalletLength: 'Wallet -naam moet minder zijn dan 20 tekens',
      errorPasswordRequired: 'Een wachtwoord is verplicht',
      errorPasswordLength: 'Wachtwoord moet minder zijn dan 20 tekens'
    },
    viewMnemonic: { title: 'Mnemonisch zaad', subtitle: 'Bekijk je mnemonic' },
    deleteWallet: {
      btnClose: 'Dichtbij',
      btnDelete: 'Verwijderen',
      altSuccess: 'Portemonnee verwijderd',
      agreeDelete: 'Ga je ermee akkoord om je portemonnee uit de app te verwijderen?',
      password: 'Wachtwoord'
    },
    editWallet: {
      btnClose: 'Dichtbij',
      btnEdit: 'Bewerk portemonnee',
      altSuccess: 'Portemonnee bewerkt',
      inputName: 'Portemonnee'
    },
    rules: { required: 'Vereist', counter: 'Max 10 tekens' }
  },
  createQrcode: {
    title: 'Code maken',
    recipient: 'Ontvanger',
    amount: 'Hoeveelheid',
    currency: 'Munteenheid',
    memo: 'Memo',
    btnCreate: 'Genereren',
    btnBack: 'Rug',
    selectContact: 'Selecteer contact',
    rules: {
      amountRequire: 'Bedrag is vereist',
      amountNumber: 'Bedrag moet nummer zijn',
      amountDecimal: 'Slecht decimaal',
      recipientRequire: 'adres is nodig',
      recipientPrefix: 'Adres moet beginnen met BCNA',
      recipientBech32: 'Slecht adres (niet BECH32)'
    }
  },
  scanQrcode: {
    scanned: {
      address: 'Adres',
      password: 'Wachtwoord',
      amount: 'Hoeveelheid',
      memo: 'Memo',
      error: 'Je hebt niet genoeg Bitcanna! Financier uw account',
      badPass: 'Slecht wachtwoord',
      btnSend: 'Versturen',
      rescan: 'Mest'
    },
    errorCamera: {
      title: 'We hebben een probleem met machtiging ontdekt om uw camera te gebruiken.',
      android: 'Als u op Android bent, klikt u op de onderstaande knop om autorisatie te accepteren.',
      ios: 'Als u op de iPhone bent, geeft u autorisatie in uw telefooninstellingen.'
    },
    addAuthCam: 'Voeg autorisatiecamera toe'
  },
  config: {
    subheader: { general: 'Algemeen', privacy: 'Privacy', other: 'Ander' },
    currency: {
      title: 'Munteenheid',
      subtitle: 'Selecteer uw valuta',
      close: 'Dichtbij'
    },
    language: { title: 'Taal', subtitle: 'Selecteer je taal', close: 'Dichtbij' },
    viewMnemonic: { title: 'Mnemonisch zaad', subtitle: 'Bekijk je mnemonic' },
    masterPassChange: {
      title: 'Master wachtwoord',
      subtitle: 'Wijzig het hoofdwachtwoord',
      password1: 'Je wachtwoord',
      password2: 'Nieuw paswoord',
      password3: 'Herhaal nieuw wachtwoord',
      btnChange: 'Verander MasterPass',
      progress: 'MasterPassword verandering in uitvoering',
      success: 'MasterPassword -verandering is gedaan!',
      close: 'Dichtbij'
    },
    autoLogout: { title: 'Auto logout', subtitle: 'Definieer tijd voor lockout' },
    timeout: {
      title: 'Stel time -out in',
      subtitle: 'Selecteer uw time -out',
      close: 'Dichtbij',
      select: 'Selecteer time -out',
      btnUpdate: 'Update time -out'
    },
    appInfo: {
      title: 'App informatie',
      subtitle: 'Hier kunt u app -info zien',
      appVersion: 'App versie',
      version: 'Versie',
      deviceInfo: 'Apparaat info'
    },
    deleteWallet: {
      title: 'Verwijder portemonnee',
      subtitle: 'Verwijder portemonnee van telefoon'
    }
  },
  addressBook: {
    title: 'Adrescontact',
    btnAdd: 'Voeg contact toe',
    subtitle: 'Hier kunt u uw contacten opslaan',
    name: 'Naam',
    address: 'Adres',
    memo: 'Standaardmemo',
    btnAddContact: 'Voeg contact toe',
    errorNameRequire: 'Naam is vereist',
    errorNameLength: 'Naam moet minder zijn dan 10 tekens',
    errorAddrRequire: 'adres is nodig',
    errorPrefix: 'Adres moet beginnen met BCNA',
    errorBech32: 'Slecht adres (niet BECH32)',
    errorMemo: 'Memo moet minder zijn dan 100 tekens',
    info: 'Informatie',
    edit: {
      title: 'Bewerk contact',
      subtitle: 'Hier kunt u uw contacten bewerken'
    },
    delete: {
      title: 'Verwijder contact',
      close: 'Dichtbij',
      agree: 'Ga je ermee akkoord om dit contact te verwijderen?'
    }
  },
  transactions: {
    title: 'Transacties',
    btnCreateQr: 'Creëer QR',
    btnViewTx: 'Bekijk transactie'
  },
  footer: { title1: 'Dashboard', title2: 'Rekening', title3: 'Configuratie' },
  errors: {
    badPassword: 'Verkeerd wachtwoord',
    badMnemonic: 'Slechte mnemonic',
    walletAlreadyExist: 'Portemonnee -naam al ingenomen',
    walletAddressExist: 'Portemonnee -adres al ingenomen'
  },
  approved: {
    title: 'Goedgekeurde transactie',
    subtitle: 'Uw transactie is succesvol verzonden',
    back: 'Terug naar dashboard'
  }
} 