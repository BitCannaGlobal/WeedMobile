/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import { createI18n } from 'vue-i18n'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
// Capacitore info device
import { Device } from '@capacitor/device';

// Plugins
import { registerPlugins } from '@/plugins'
import store from './store'

const messages = {
  English: {
    login: {
      title: 'Unlock your wallet',
      passInput: 'Password',
      loginButton: 'Unlock',
    },
    dashboard: {
      title: 'Welcome to your wallet', 
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
    }
  },
  Dutch: {
    login: {
      title: 'Ontgrendel uw portemonnee', 
      passInput: 'Je wachtwoord',
      loginButton: 'Ontgrendelen',
    },
    dashboard: {
      title: 'Welkom bij uw portefeuille', 
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
    }
  } 
} 

const getLocalLang = async () => {
 
  const getLanguageCode = await Device.getLanguageCode();
  let language = ''
  console.log('getLanguageCode', getLanguageCode.value)
  switch (getLanguageCode.value) {
    case 'en':
      language = 'English'      
      break;
    case 'nl':
      language = 'Dutch'
      break;
    default:
      language = 'English'
      break;
  }
  return language
};
let userLang = await getLocalLang();
console.log('userLang', userLang)
const i18n = createI18n({
  locale: userLang, // set locale
  fallbackLocale: 'English', // set fallback locale
  messages, // set locale messages
})

const app = createApp(App).use(store).use(i18n)


registerPlugins(app)

app.mount('#app')
