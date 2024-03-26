/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
// Above the createApp() line
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);

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
import { getLanguage } from '@/libs/storage.js'; 

import English from './libs/i18n/english.js'
// import German from './libs/i18n/german.js'
import Spanish from './libs/i18n/spanish.js'
import French from './libs/i18n/french.js'
import Netherlands from './libs/i18n/netherlands.js'
import Italian from './libs/i18n/italian.js'
import { de } from 'translatte/languages';

const messages = {
  English,
  //German,
  Spanish,
  French,
  Netherlands,
  Italian
} 
 
const getLocalLang = async () => {
 
  const getLanguageCode = await Device.getLanguageCode();
  let language = ''
  //console.log('getLanguageCode', getLanguageCode.value)
  switch (getLanguageCode.value) {
    case 'en':
      language = 'English'      
      break;
    case 'nl':
      language = 'Netherlands'
      break;
    /*case 'de':
      language = 'German'
      break;  */    
    case 'es':
      language = 'Spanish'
      break;     
    case 'fr':
      language = 'French'
      break;    
    case 'it':
      language = 'Italian'
      break;          
    default:
      language = 'English'
      break;
  }
  return language
};

let userLang = '';
if (await getLanguage() === null) {
  userLang = await getLocalLang();
} else {
  userLang = await getLanguage();
}

const i18n = createI18n({
  locale: userLang, // set locale
  fallbackLocale: 'English', // set fallback locale
  messages, // set locale messages
})

const app = createApp(App).use(store).use(i18n)


registerPlugins(app)

app.mount('#app')
