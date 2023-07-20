import { createStore } from 'vuex'
import { Preferences } from '@capacitor/preferences';
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"

export default createStore({
  state: {
    masterPassExist: false,
    isLogged: false,
    sessionMax: 10,
    allWallets: [],
  },
  getters: {
  },
  mutations: {
    async setIsLogged(state, data) {
      state.isLogged = data
    },
  },
  actions: {
    async getWallets({ state }) {
      const { value } = await Preferences.get({ key: 'allWallets' });
      if (value)
        state.allWallets = JSON.parse(value)
    },
    async checkLogin({ state }, walletData) { 
      // By wallet name, not active
      //let foundWallet = state.allWallets.find( ({ name }) => name === data.name )      
      try {
        await DirectSecp256k1HdWallet.deserialize(walletData.data, walletData.password); 
        state.isLogged = true
      } catch (error) {
        console.log(error)  
        state.isLogged = false
      }
    }
  },
  modules: {
  }
})
