export default {
  "menu": {
    "title": "Portefeuille Bitcanna",
    "dashboard": "Tableau de bord",
    "addressBook": "Carnet d'adresses",
    "transactions": "Transactions",
    "createQrcode": "Créer QR",
    "scanQrcode": "Scan QR",
    "logout": "Se déconnecter"
  },
  "login": {
    "title": "Débloquez votre portefeuille",
    "passInput": "Mot de passe",
    "loginButton": "Ouvrir",
    "errorMsgSession": "La session a expiré",
    "errorFormPassRequired": "Mot de passe requis",
    "errorFormPassLength": "Le mot de passe doit comporter moins de 20 caractères",
    "welcomMsg1": "Bienvenue dans le portefeuille Bitcanna",
    "welcomMsg2": "Créez d'abord votre mot de passe pour utiliser votre portefeuille.",
    "badPassword": "Mauvais mot de passe",
    "passToLong": "Votre mot de passe est trop long",
    "setPass": "Définir MasterPass",
    "rmPass": "Supprimer MasterPass",
    "createPass": "Créer un mot de passe",
    "savePass": "Sauvegarder",
    "passDescription": "Votre mot de passe est utilisé pour crypter votre mnémonique et sécuriser votre portefeuille.",
    "formSetPass": "Définir votre mot de passe",
    "repeatPass": "Répétez votre mot de passe"
  },
  "dashboard": {
    "title": "🇫🇷 Bienvenue",
    "titleBlock": "Valeur du portefeuille",
    "available": "Disponible",
    "rewards": "Vos récompenses",
    "btnSend": "Envoyer",
    "btnQrCode": "Créer QR",
    "btnStake": "Miser",
    "btnClaim": "Réclamer",
    "btnCreateOne": "En créer un ici",
    "welcomeNoWallet": "Hé, il n'y a pas encore de portefeuille disponible.",
    "mdlSendTx": {
      "title": "Envoyer un jeton",
      "subTitle": "Ici, vous pouvez envoyer votre jeton Bitcanna disponible sur votre portefeuille",
      "inpRecipient": "Destinataire",
      "inpAmount": "Montant",
      "inpMemo": "Note",
      "inpPassword": "Mot de passe",
      "btnSend": "Envoyer",
      "errorAddrRequire": "Une adresse est requise",
      "errorPrefix": "L'adresse doit commencer par BCNA",
      "errorBech32": "Mauvaise adresse (pas BECH32)",
      "errorMemo": "La note doit comporter moins de 100 caractères",
      "errorAmountRequire": "Le montant est requis",
      "errorAmountNumber": "Le montant doit être le numéro",
      "errorAmountDecimal": "Mauvaise décimale"
    },
    "mdlClaimTx": {
      "title": 'Réclamez des récompenses',
      "subTitle": 'Vos récompenses',
      "inpPassword": 'Password',
      "btnClaim": 'Réclamer',
    },
  },
  "accounts": {
    "title": "Comptes",
    "createAccount": "Créer",
    "importAccount": "Importer",
    "selectWallet": "Sélectionner le portefeuille",
    "btnEditAccount": "Modifier",
    "btnDeleteAccount": "Supprimer",
    "btnStartVerification": "Démarrer la vérification",
    "mdlCreateAccount": {
      "title": "Créer un compte",
      "name": "Nom",
      "address": "Adresse",
      "btnCreate": "Créer",
      "step1": "Étape 1",
      "step2": "Étape 2",
      "step3": "Étape 3",
      "words": "mots",
      "checkMnemonic": "Vérifiez Mnémonique",
      "return": "Retour",
      "nextStep": "L'étape suivante",
      "walletName": "Nom de portefeuille",
      "walletPassword": "Mot de passe du portefeuille",
      "save": "Sauvegarder"
    },
    "mdlImportAccount": {
      "title": "Portefeuille d'importation",
      "save": "Sauvegarder",
      "subtitle": "Ici, vous pouvez importer votre mnénomique en toute sécurité! Votre phrase de passe sera cryptée avec votre mot de passe",
      "name": "Nom de portefeuille",
      "address": "Adresse",
      "password": "Mot de passe",
      "returnMsg": "Votre mnémonique (gardez-le secret!)",
      "errorWalletRequired": "Le nom du portefeuille est requis",
      "errorWalletLength": "Le nom du portefeuille doit comporter moins de 20 caractères",
      "errorPasswordRequired": "Mot de passe requis",
      "errorPasswordLength": "Le mot de passe doit comporter moins de 20 caractères"
    },
    "viewMnemonic": {
      "title": "Graine mnémonique",
      "subtitle": "Voir votre mnémonique"
    },
    "deleteWallet": {
      "btnClose": "Fermer",
      "btnDelete": "Supprimer",
      "altSuccess": "Portefeuille supprimé",
      "agreeDelete": "Vous acceptez de supprimer votre portefeuille de l'application?",
      "password": "Mot de passe"
    },
    "editWallet": {
      "btnClose": "Fermer",
      "btnEdit": "Edit portefeuille",
      "altSuccess": "Portefeuille édité",
      "inputName": "Nom de portefeuille"
    },
    "rules": {
      "required": "Requis",
      "counter": "Max 10 caractères"
    }
  },
  "createQrcode": {
    "title": "Créer du code QR",
    "recipient": "Destinataire",
    "amount": "Montant",
    "currency": "Devise",
    "memo": "Note",
    "btnCreate": "Générer",
    "btnBack": "Dos",
    "selectContact": "Sélectionnez le contact",
    "rules": {
      "amountRequire": "Le montant est requis",
      "amountNumber": "Le montant doit être le numéro",
      "amountDecimal": "Mauvaise décimale",
      "recipientRequire": "Une adresse est requise",
      "recipientPrefix": "L'adresse doit commencer par BCNA",
      "recipientBech32": "Mauvaise adresse (pas BECH32)"
    }
  },
  "scanQrcode": {
    "scanned": {
      "address": "Adresse",
      "password": "Mot de passe",
      "amount": "Montant",
      "memo": "Note",
      "error": "Vous n'avez pas assez de bitcanna! Financer votre compte",
      "badPass": "Mauvais mot de passe",
      "btnSend": "Envoyer",
      "rescan": "Sauver"
    },
    "errorCamera": {
      "title": 'Nous avons détecté un problème d\'autorisation d\'utilisation de votre caméra.',
      "android": 'Si vous êtes sous Android, cliquez sur le bouton ci-dessous pour accepter l\'autorisation.',
      "ios": 'Si vous êtes sur iPhone, veuillez donner l\'autorisation dans les paramètres de votre téléphone.',
    },
    "addAuthCam": 'Ajouter l\'autorisation camera',
  },
  "config": {
    "subheader": {
      "general": "Général",
      "privacy": "Confidentialité",
      "other": "Autre"
    },
    "currency": {
      "title": "Devise",
      "subtitle": "Sélectionnez votre devise",
      "close": "Fermer"
    },
    "language": {
      "title": "Langue",
      "subtitle": "choisissez votre langue",
      "close": "Fermer"
    },
    "viewMnemonic": {
      "title": "Graine mnémonique",
      "subtitle": "Voir votre mnémonique"
    },
    "masterPassChange": {
      "title": "Mot de passe maître",
      "subtitle": "Modifier le mot de passe maître",
      "password1": "Votre mot de passe",
      "password2": "Nouveau mot de passe",
      "password3": "Répété le nouveau mot de passe",
      "btnChange": "Changer MasterPass",
      "progress": "MasterPassword Changement dans les progrès",
      "success": "MasterPassword Change est effectué!",
      "close": "Fermer"
    },
    "autoLogout": {
      "title": "Deconnexion automatique",
      "subtitle": "Définir le temps pour le verrouillage",
      "time": {
        "min": '1 minute',
        "min5": '5 minutes',
        "hour": '1 heure',
        "hours6": '6 heures',
        "day": '1 journée',
      }
    },
    "timeout": {
      "title": "Définir le délai",
      "subtitle": "Sélectionnez votre délai",
      "close": "Fermer",
      "select": "Sélectionner le délai d'expiration",
      "btnUpdate": "Mettre à jour le délai d'attente"
    },
    "appInfo": {
      "title": "Informations sur l'application",
      "subtitle": "Ici, vous pouvez voir les informations d'application",
      "appVersion": "Version de l'application",
      "version": "Version",
      "deviceInfo": "Info appareil"
    },
    "deleteWallet": {
      "title": "Supprimer le portefeuille",
      "subtitle": "Supprimer le portefeuille du téléphone"
    }
  },
  "addressBook": {
    "title": "Adressez le contact",
    "btnAdd": "Ajouter le contact",
    "subtitle": "Ici, vous pouvez enregistrer vos contacts",
    "name": "Nom",
    "address": "Adresse",
    "memo": "Mémo par défaut",
    "btnAddContact": "Ajouter le contact",
    "errorNameRequire": "Le nom est requis",
    "errorNameLength": "Le nom doit être inférieur à 10 caractères",
    "errorAddrRequire": "Une adresse est requise",
    "errorPrefix": "L'adresse doit commencer par BCNA",
    "errorBech32": "Mauvaise adresse (pas BECH32)",
    "errorMemo": "La note doit comporter moins de 100 caractères",
    "info": "Infomations",
    "edit": {
      "title": "Modifier le contact",
      "subtitle": "Ici, vous pouvez modifier vos contacts"
    },
    "delete": {
      "title": "Effacer le contact",
      "close": "Fermer",
      "agree": "Vous acceptez de supprimer ce contact?"
    }
  },
  "transactions": {
    "title": "Transactions",
    "btnCreateQr": "Créer QR",
    "btnViewTx": "Afficher la transaction"
  },
  "footer": {
    "title1": "Tableau de bord",
    "title2": "Compte",
    "title3": "Configurer"
  },
  "errors": {
    "badPassword": "Mauvais mot de passe",
    "badMnemonic": "Mauvais mnémonique",
    "walletAlreadyExist": "Nom du portefeuille déjà pris",
    "walletAddressExist": "Adresse du portefeuille déjà prise"
  },
  "approved": {
    "title": "Transaction approuvée",
    "subtitle": "Votre transaction a été envoyée avec succès",
    "back": "Retour au tableau de bord"
  }
}