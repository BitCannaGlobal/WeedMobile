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

// Plugins
import { registerPlugins } from '@/plugins'
import store from './store'

const messages = {
  English: {
    message: {
      hello: 'Hello'
    }
  }, 
  French: {
    message: {
      hello: 'Bonjour'
    }
  }, 
}

const i18n = createI18n({
  locale: 'English', // set locale
  fallbackLocale: 'English', // set fallback locale
  messages, // set locale messages
})

const app = createApp(App).use(store).use(i18n)


registerPlugins(app)

app.mount('#app')
