import { createStore } from 'vuex'
import { Preferences } from '@capacitor/preferences';
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"

export default createStore({
  state: {
    isLogged: false,
    allWallets: [],
  },
  getters: {
  },
  mutations: {
    async updateTotalSupply(state, data) {
      state.totalSupply = data
    },
  },
  actions: {
    async getWallets({ state }) {
      const { value } = await Preferences.get({ key: 'allWallets' });
      if (value)
        state.allWallets = JSON.parse(value)
    },
    async checkLogin({ state }, data) { 
      let foundWallet = state.allWallets.find( ({ name }) => name === data.name )
      try {
        await DirectSecp256k1HdWallet.deserialize(foundWallet.data, data.password); 
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
