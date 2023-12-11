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

import English from './libs/i18n/english.js'
import German from './libs/i18n/german.js'

const messages = {
  English,
  German 
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
      language = 'German'
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
