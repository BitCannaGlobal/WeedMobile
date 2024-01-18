export default {
  "menu": {
    "title": "Billetera BitCanna",
    "dashboard": "Panel principal",
    "addressBook": "Agenda",
    "transactions": "Transacciones",
    "createQrcode": "Crear QR",
    "scanQrcode": "Escanear QR",
    "logout": "Cerrar sesión"
  },
  "login": {
    "title": "Desbloquea tu billetera",
    "passInput": "Contraseña",
    "loginButton": "desbloquear",
    "errorMsgSession": "Sesión expirada",
    "errorFormPassRequired": "se requiere contraseña",
    "errorFormPassLength": "La contraseña debe ser menos de 20 caracteres",
    "welcomMsg1": "Bienvenido a la billetera BitCanna",
    "welcomMsg2": "Crea primero tu contraseña para usar tu billetera.",
    "badPassword": "Contraseña incorrecta",
    "passToLong": "tu contraseña es muy larga",
    "setPass": "Establecer contraseña",
    "rmPass": "Eliminar contraseña",
    "createPass": "Crear contraseña",
    "savePass": "guardar",
    "passDescription": "Tu contraseña se utiliza para cifrar la frase mnemotécnica y asegurar tu billetera.",
    "formSetPass": "Establece tu contraseña",
    "repeatPass": "Repite tu contraseña"
  },
  "dashboard": {
    "title": "🇪🇸 Billetera: ",
    "titleBlock": "Valor de la billetera",
    "available": "Disponible",
    "rewards": "Tus recompensas",
    "btnSend": "Enviar",
    "btnQrCode": "Crear QR",
    "btnStake": "Delegar",
    "btnClaim": "Pedir",
    "btnCreateOne": "Crea uno aquí",
    "welcomeNoWallet": "Oye!, todavía no hay billetera creada",
    "mdlSendTx": {
      "title": "Enviar token",
      "subTitle": "Aquí puedes enviar tus monedas BCNA disponibles en tu billetera",
      "inpRecipient": "Recipiente",
      "inpAmount": "Cantidad",
      "inpMemo": "Memo/Concepto",
      "inpPassword": "Contraseña",
      "btnSend": "Enviar",
      "errorAddrRequire": "La dirección es necesaria",
      "errorPrefix": "La dirección debe comenzar con bcna",
      "errorBech32": "Dirección incorrecta (no es bech32)",
      "errorMemo": "El memo/concepto debe ser menos de 100 caracteres",
      "errorAmountRequire": "Se requiere cantidad",
      "errorAmountNumber": "La cantidad debe ser un número",
      "errorAmountDecimal": "Decimal incorrecto"
    },
    "mdlClaimTx": {
      "title": 'Reclamar premios',
      "subTitle": 'Tus recompensas',
      "inpPassword": 'Contraseña',
      "btnClaim": 'Afirmar',
    },
  },
  "accounts": {
    "title": "Cuentas",
    "createAccount": "Crear",
    "importAccount": "Importar",
    "selectWallet": "Seleccionar billetera",
    "btnEditAccount": "Editar",
    "btnDeleteAccount": "Borrar",
    "btnStartVerification": "Inicio de verificación",
    "mdlCreateAccount": {
      "title": "Crear una cuenta",
      "name": "Nombre",
      "address": "DIRECCIÓN",
      "btnCreate": "Crear",
      "step1": "Paso 1",
      "step2": "Paso 2",
      "step3": "Paso 3",
      "words": "palabras",
      "checkMnemonic": "Verifique mnemónico",
      "return": "Devolver",
      "nextStep": "Próximo paso",
      "walletName": "Nombre de billetera",
      "walletPassword": "Contraseña de billetera",
      "save": "Guardar"
    },
    "mdlImportAccount": {
      "title": "Importación de billetera",
      "save": "Guardar",
      "subtitle": "¡Aquí puedes importar tus frase mnemotécnica de manera segura! Tu frase estará encriptada con tu password principal",
      "name": "Nombre de billetera",
      "address": "DIRECCIÓN",
      "password": "Contraseña",
      "returnMsg": "Tu mnemónico (¡mantenlo en secreto!)",
      "errorWalletRequired": "Se requiere el nombre de la billetera",
      "errorWalletLength": "El nombre de la billetera debe tener menos de 10 caracteres",
      "errorPasswordRequired": "Se requiere contraseña",
      "errorPasswordLength": "La contraseña debe ser menos de 20 caracteres"
    },
    "viewMnemonic": {
      "title": "Semilla mnemónica",
      "subtitle": "Ver tu frase/semilla mnemónica"
    },
    "deleteWallet": {
      "btnClose": "Cerrar",
      "btnDelete": "Borrar",
      "altSuccess": "Billetera eliminada",
      "agreeDelete": "¿Aceptas eliminar tu billetera de la aplicación?",
      "password": "Contraseña"
    },
    "editWallet": {
      "btnClose": "Cerrar",
      "btnEdit": "Editar billetera",
      "altSuccess": "Billetera editada",
      "inputName": "Nombre de billetera"
    },
    "rules": {
      "required": "Requerido",
      "counter": "Máximo 10 caracteres"
    }
  },
  "createQrcode": {
    "title": "Crear código QR",
    "recipient": "Dirección destino",
    "amount": "Cantidad",
    "currency": "Divisa",
    "memo": "Memo/Concepto",
    "btnCreate": "Generar",
    "btnBack": "Atrás",
    "selectContact": "Selecciona un contacto",
    "rules": {
      "amountRequire": "Se requiere cantidad",
      "amountNumber": "La cantidad debe ser el número",
      "amountDecimal": "Decimal incorrecto",
      "recipientRequire": "La dirección es necesaria",
      "recipientPrefix": "La dirección debe comenzar con bcna",
      "recipientBech32": "Dirección incorrecta (no es bech32)"
    }
  },
  "scanQrcode": {
    "scanned": {
      "address": "DIRECCIÓN",
      "password": "Contraseña",
      "amount": "Cantidad",
      "memo": "Memo/Concepto",
      "error": "¡No tienes suficientes BCNA! Añade fondos a tu cuenta",
      "badPass": "Contraseña incorrecta",
      "btnSend": "Enviar",
      "rescan": "Reescanear"
    },
    "errorCamera": {
      "title": 'Hemos detectado un problema con la autorización para usar tu cámara.',
      "android": 'Si estás en Android, haz clic en el botón a continuación para aceptar la autorización.',
      "ios": 'Si estás en un iPhone, da autorización en la configuración de tu dispositivo.',
    },
    "addAuthCam": 'Añadir autorización de uso de cámara',
  },
  "config": {
    "subheader": {
      "general": "General",
      "privacy": "Privacidad",
      "other": "Otro"
    },
    "currency": {
      "title": "Divisa",
      "subtitle": "Seleccione su moneda",
      "close": "Cerrar"
    },
    "language": {
      "title": "Idioma",
      "subtitle": "Elige tu idioma",
      "close": "Cerrar"
    },
    "viewMnemonic": {
      "title": "Semilla/frase mnemónica",
      "subtitle": "Vea su mnemónico"
    },
    "masterPassChange": {
      "title": "Contraseña",
      "subtitle": "Cambiar contraseña",
      "password1": "Tu contraseña",
      "password2": "Nueva contraseña",
      "password3": "repita la nueva contraseña",
      "btnChange": "Cambiar contraseña",
      "progress": "Cambio de contraseña en progreso",
      "success": "¡El cambio de contraseña está hecho!",
      "close": "Cerrar"
    },
    "autoLogout": {
      "title": "Auto bloqueo",
      "subtitle": "Defina el tiempo para el bloqueo"
    },
    "timeout": {
      "title": "Tiempo de espera establecido",
      "subtitle": "Seleccione su tiempo de espera",
      "close": "Cerrar",
      "select": "Seleccione Tiempo de espera",
      "btnUpdate": "Actualizar"
    },
    "appInfo": {
      "title": "Información de la aplicación",
      "subtitle": "Aquí puedes ver la información de la aplicación",
      "appVersion": "Versión de aplicacion",
      "version": "Versión",
      "deviceInfo": "Información del dispositivo"
    },
    "deleteWallet": {
      "title": "Eliminar la billetera",
      "subtitle": "Eliminar billetera del dispositivo"
    }
  },
  "addressBook": {
    "title": "Dirección de contacto",
    "btnAdd": "Agregar contacto",
    "subtitle": "Aquí puedes guardar tus contactos",
    "name": "Nombre",
    "address": "DIRECCIÓN",
    "memo": "Memo/concepto predeterminado",
    "btnAddContact": "Agregar contacto",
    "errorNameRequire": "Se requiere el nombre",
    "errorNameLength": "El nombre debe ser menos de 10 caracteres",
    "errorAddrRequire": "La dirección es necesaria",
    "errorPrefix": "La dirección debe comenzar con BCNA",
    "errorBech32": "Dirección incorrecta (no es bech32)",
    "errorMemo": "El concepto/memo debe ser menos de 100 caracteres",
    "info": "Informaciones",
    "edit": {
      "title": "Editar contacto",
      "subtitle": "Aquí puedes editar tus contactos"
    },
    "delete": {
      "title": "Borrar contacto",
      "close": "Cerrar",
      "agree": "¿Aceptas eliminar este contacto?"
    }
  },
  "transactions": {
    "title": "Transacciones",
    "btnCreateQr": "Crear QR",
    "btnViewTx": "Ver transacción"
  },
  "footer": {
    "title1": "Panel",
    "title2": "Cuenta",
    "title3": "Configuración"
  },
  "errors": {
    "badPassword": "Contraseña incorrecta",
    "badMnemonic": "Mnemónico incorrecto",
    "walletAlreadyExist": "Nombre de la billetera ya usado",
    "walletAddressExist": "Dirección de billetera ya usado"
  },
  "approved": {
    "title": "Transacción aprobada",
    "subtitle": "Tu transacción ha sido enviada con éxito",
    "back": "Volver al panel principal"
  }
}
