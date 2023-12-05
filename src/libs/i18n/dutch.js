export default {
  login: {
    title: 'Ontgrendel uw portemonnee', 
    passInput: 'Je wachtwoord',
    loginButton: 'Ontgrendelen',
  },
  dashboard: {
    title: '🇳🇱 Welkom ', 
    titleBlock: 'Geldbörsenwert', 
    available: 'Verfügbar',
    rewards: 'Ihre Belohnungen',
    btnSend: 'Schicken',
    btnQrCode: 'QR erstellen',
    btnStake: 'Einsatz',
    btnClaim: 'Belohnen',
    mdlSendTx: {
      title: 'Token senden',
      subTitle: 'Hier können Sie Ihren auf Ihrem Wallet verfügbaren Bitcanna-Token senden',
      inpRecipient: 'Empfängerin',
      inpAmount: 'Menge',
      inpMemo: 'Memo',   
      inpPassword: 'Passwort',
      btnSend: 'Schicken'
    },
  },
  accounts: {
    title: 'Rekeningen', 
    createAccount: 'Erstellen',
    importAccount: 'Importieren',
    selectWallet: 'Wallet auswählen',
    btnEditAccount: 'Bearbeiten',
    btnDeleteAccount: 'Löschen',
    btnStartVerification: 'Startverifizierung',
    mdlCreateAccount: {
      title: 'Konto erstellen',
      name: 'Name',
      address: 'Adresse',
      btnCreate: 'Erstellen',
      step1: 'Schritt 1',
      step2: 'Schritt 2',
      step3: 'Schritt 3', 
      words: 'wörter',
    },
  },
  createQrcode: {
    title: 'QR-Code erstellen', 
    recipient: 'Empfänger',
    amount: 'Menge',
    currency: 'Währung',
    memo: 'Memo',
    btnCreate: 'Generieren',
    btnBack: 'Zurück',
    selectContact: 'Kontakt auswählen',
    rules: {
      amountRequire: 'Betrag ist erforderlich',
      amountNumber: 'Der Betrag muss eine Zahl sein',
      amountDecimal: 'Schlechte Dezimalzahl',
      recipientRequire: 'Adresse ist erforderlich',
      recipientPrefix: 'Die Adresse muss mit bcna beginnen',
      recipientBech32: 'Falsche Adresse (nicht bech32)',
    }
  },
  config: {
    currency: {
      title: 'Munteenheid',
      subtitle: 'Selecteer uw valuta',
    },
    language: {
      title: 'Taal',
      subtitle: 'Selecteer uw taal',
    },
    viewMnemonic: {
      title: 'Mnemonic Seed',
      subtitle: 'Zie je geheugensteuntje',
    },
    masterPassChange: {
      title: 'Master password',
      subtitle: 'Hoofdwachtwoord wijzigen',
    },
    deleteWallet: {
      title: 'Portemonnee verwijderen',
      subtitle: 'Portemonnee van telefoon verwijderen',
    },
  },
  footer: {
    title1: 'Dashboard', 
    title2: 'Rekeningen', 
    title3: 'Config',  
  },
  errors: {
    badPassword: 'Falsches Passwort',
  },
  approved: {
    title: 'Transaktion genehmigt',
    subtitle: 'Ihre Transaktion wurde erfolgreich gesendet',
    back: 'Zurück zum Dashboard',
  }
} 
