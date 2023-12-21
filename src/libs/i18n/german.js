export default {
  menu: {
    title: 'Bitcanna Wallet',
    dashboard: 'Armaturenbrett',
    addressBook: 'Adressbuch',
    transactions: 'Transaktionen',
    createQrcode: 'QR erstellen',
    scanQrcode: 'QR scannen', 
    logout: 'Ausloggen',
  },
  login: {
    title: 'Ontgrendel uw portemonnee', 
    passInput: 'Je wachtwoord',
    loginButton: 'Ontgrendelen',
    errorMsgSession: 'Sitzung abgelaufen',
    errorFormPassRequired: 'Passwort wird benötigt',
    errorFormPassLength: 'Das Passwort muss weniger als 20 Zeichen lang sein',
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
      btnSend: 'Schicken',
      errorAddrRequire: 'Adresse ist erforderlich',
      errorPrefix: 'Die Adresse muss mit bcna beginnen',
      errorBech32: 'Falsche Adresse (nicht bech32)',
      errorMemo: 'Das Memo muss weniger als 100 Zeichen lang sein',
      errorAmountRequire: 'Betrag ist erforderlich',
      errorAmountNumber: 'Der Betrag muss eine Zahl sein',
      errorAmountDecimal: 'Schlechte Dezimalzahl',
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
      returnMsg: 'Ihre Eselsbrücke (geheim halten!)',
      errorWalletRequired: 'Wallet-Name ist erforderlich',
      errorWalletLength: 'Der Wallet-Name muss weniger als 10 Zeichen lang sein',
      errorPasswordRequired: 'Passwort wird benötigt',
      errorPasswordLength: 'Das Passwort muss weniger als 20 Zeichen lang sein',
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
  scanQrcode: {
    scanned: {
      address: 'Adresse',
      password: 'Passwort',
      amount: 'Menge',
      memo: 'Memo',
      error: 'Du hast nicht genug Bitcanna! Auf dein Konto einzahlen',
      badPass: 'Schlechtes Passwort',
      btnSend: 'Schicken',
      rescan: 'Erneut scannen',
    }
  },
  config: {
    subheader: {
      general: 'Allgemein',
      privacy: 'Privatsphäre',
      other: 'Andere',
    },
    currency: {
      title: 'Munteenheid',
      subtitle: 'Selecteer uw valuta',
      
    },
    language: {
      title: 'Taal',
      subtitle: 'Selecteer uw taal',
      close: 'Schließen',
    },
    viewMnemonic: {
      title: 'Mnemonic Seed',
      subtitle: 'Zie je geheugensteuntje',
    },
    masterPassChange: {
      title: 'Master Passwort',
      subtitle: 'Hoofdwachtwoord wijzigen',
      password1: 'Ihr Passwort',
      password2: 'Neues Kennwort',
      password3: 'Wiederhole das neue Passwort',
      btnChange: 'MasterPass ändern',
      progress: 'Änderung des Masterpassworts wird durchgeführt',
      success: 'Die Änderung des Masterpassworts ist abgeschlossen!',
      close: 'Schließen',
    },
    autoLogout: {
      title: 'Automatische Abmeldung',
      subtitle: 'Definieren Sie den Zeitpunkt für die Sperrung ', 
    },
    appInfo: {
      title: 'App-Informationen',
      subtitle: 'Hier können Sie App-Informationen sehen',
    },
    timeout: {
      title: 'Timeout festlegen',
      subtitle: 'Wählen Sie Ihr Timeout',
      close: 'Schließen',
      select: 'Wählen Sie Timeout',
      btnUpdate: 'Aktualisierungszeitüberschreitung',
    },
    appInfo: {
      title: 'App-Information',
      subtitle: 'Hier können Sie App-Informationen sehen',
      appVersion: 'App Version',
      version: 'Version',
      deviceInfo: 'Geräteinformationen',
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
    errorNameRequire: 'Name ist erforderlich',
    errorNameLength: 'Der Name muss weniger als 10 Zeichen lang sein',
    errorAddrRequire: 'Adresse ist erforderlich',
    errorPrefix: 'Die Adresse muss mit bcna beginnen',
    errorBech32: 'Falsche Adresse (nicht bech32)',
    errorMemo: 'Das Memo muss weniger als 100 Zeichen lang sein', 
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
  transactions: {
    title: 'Transaktionen',
    btnCreateQr: 'QR erstellen',
    btnViewTx: 'Transaktion anzeigen',
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
    walletAddressExist: 'Wallet-Adresse bereits vergeben',
  },
  approved: {
    title: 'Transaktion genehmigt',
    subtitle: 'Ihre Transaktion wurde erfolgreich gesendet',
    back: 'Zurück zum Dashboard',
  }
}