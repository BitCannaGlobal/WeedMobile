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
      checkMnemonic: 'Überprüfen Sie die Mnemonik', 
      return: 'Zurückkehren',
      nextStep: 'Nächster Schritt',
      walletName: 'Wallet-Name',
      walletPassword: 'Wallet-Passwort',
      save: 'Speichern',
    },
    mdlImportAccount: {
      title: 'Wallet importieren',
      save: 'Speichern',
      subtitle: 'Hier können Sie Ihre Mnenomics sicher importieren! Ihr Passwort wird mit Ihrem Masterpasswort verschlüsselt',
      name: 'Wallet-Name',
      address: 'Address',
      password: 'Passwort',
    },
    viewMnemonic: {
      title: 'Mnemonischer Samen',
      subtitle: 'Sehen Sie sich Ihre Mnemonik an',
    },
    deleteWallet: {
      btnClose: 'Schließen',
      btnDelete: 'Löschen',
      altSuccess: 'Wallet gelöscht',
      agreeDelete: 'Sind Sie damit einverstanden, Ihr Wallet aus der App zu löschen?',
      password: 'Passwort',
    },
    editWallet: {
      btnClose: 'Schließen',
      btnEdit: 'Wallet bearbeiten',
      altSuccess: 'Brieftasche bearbeitet',
      inputName: 'Wallet-Name',
    },
    rules: {
      required: 'Erforderlich',
      counter: 'Maximal 10 Zeichen' 
    }
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
  addressBook: {
    title: 'Adresskontakt',
    btnAdd: 'Kontakt hinzufügen',
    subtitle: 'Hier können Sie Ihre Kontakte speichern',
    name: 'Name',
    address: 'Adresse',
    memo: 'Standard-Memo',
    btnAddContact: 'Kontakt hinzufügen',
    edit: {
      title: 'Kontakt bearbeiten',
      subtitle: 'Hier können Sie Ihre Kontakte bearbeiten'
    }, 
    delete: {
      title: 'Kontakt löschen',
      close: 'Schließen',
      agree: 'Sind Sie damit einverstanden, diesen Kontakt zu löschen?',
    },
  },
  footer: {
    title1: 'Dashboard', 
    title2: 'Rekeningen', 
    title3: 'Config',  
  },
  errors: {
    badPassword: 'Falsches Passwort',
    badMnemonic: 'Schlechte Gedächtnisstütze',
    walletAlreadyExist: 'Der Wallet-Name ist bereits vergeben',
  },
  approved: {
    title: 'Transaktion genehmigt',
    subtitle: 'Ihre Transaktion wurde erfolgreich gesendet',
    back: 'Zurück zum Dashboard',
  }
}