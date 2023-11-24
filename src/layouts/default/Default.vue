<template>
  <v-app  style="background-color:black; color:white" id="inspire">

    <v-navigation-drawer color="#1C1D20" width="500" v-model="drawer" temporary>
        <v-list
          density="compact"
          nav
        >
        <v-list-item
          prepend-icon="mdi-close-thick"
          title="Menu"
          @click="drawer = false"
        ></v-list-item>

        <v-divider></v-divider>
          <v-list-item v-if="isLogged" prepend-icon="mdi-view-dashboard" title="DashBoard" to="/dashboard"></v-list-item>
          <v-list-item v-if="isLogged" prepend-icon="mdi-book-open-page-variant-outline" title="Addressbook" to="/addressbook"></v-list-item>
          <v-list-item v-if="isLogged" prepend-icon="mdi-bank-transfer" title="Transactions" to="/transactions"></v-list-item>
          <v-list-item v-if="isLogged" prepend-icon="mdi-qrcode-edit" title="Create QR" to="/create-qrcode"></v-list-item>
          <v-list-item v-if="isLogged" prepend-icon="mdi-qrcode-scan" title="Scan QR" to="/scan-qrcode"></v-list-item>
          <!-- <v-list-item prepend-icon="mdi-pencil" title="Create/import" to="/create"></v-list-item> -->
          <v-list-item v-if="!isLogged" prepend-icon="mdi-login" title="Login" to="/"></v-list-item>
          <v-list-item v-else prepend-icon="mdi-login" title="Logout" @click="logout"></v-list-item> 
          
        </v-list>
    </v-navigation-drawer>

    <v-app-bar style="background-color:black; color:white">
      <v-app-bar-nav-icon  v-if="isLogged"   @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title  v-if="isLogged"  >WeedMobile</v-toolbar-title>
      <v-spacer></v-spacer>
 

    <v-menu
    v-if="isLogged" 
      transition="slide-x-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="#0FB786"
          v-bind="props"
          min-height="48"
          min-width="48"
        >
          {{ network }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in bitcannaConfig"
          :key="i"
          @click="changeNetwork(item.type)"
        >
          <v-list-item-title>{{ item.type }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    </v-app-bar>

    <v-main>
      <!-- <div class="mt-10 text-center">{{ height }}</div> -->
      
      <router-view></router-view>
      <mainFooter v-if="isLogged" />      
    </v-main>
  </v-app>
</template>

<script>
import { App } from '@capacitor/app';
import bitcannaConfig from '../../bitcanna.config'

import { mapState } from 'vuex'
import mainFooter from '@/components/Footer.vue' 
import { addBcnaSession, getBcnaSession, removeBcnaSession } from '@/libs/storage.js'; 

  export default {
    components: { mainFooter },
    data: () => ({
      drawer: false,
      drawertest: false,
      timeLeft: '',
      bitcannaConfig: bitcannaConfig,
      accountNow: '',
    }),
    setup () {
//       const { name } = useDisplay()
//
//       const height = computed(() => {
//         // name is reactive and
//         // must use .value
//         switch (name.value) {
//           case 'xs': return 220
//           case 'sm': return 400
//           case 'md': return 500
//           case 'lg': return 600
//           case 'xl': return 800
//           case 'xxl': return 1200
//         }
//
//         //return undefined
//       })
//       const getData = userData()
//       //console.log(getData.isLogged);
//
//
//       return { height }
    },

    computed: {
      ...mapState(['allWallets', 'network', 'isLogged', 'sessionMax', 'accountSelected'])
    },
    async mounted() {
      await this.$store.dispatch('initRpc')
      App.addListener('appStateChange', async ({ isActive }) => {
        //console.log('App state changed. Is active?', isActive);
        if (!isActive) { 
          await addBcnaSession();
          //console.log('App will close in ' + this.sessionMax + ' seconds');
        } else {
          let getFinalSession = await getBcnaSession();
          this.remainingTime(getFinalSession)
          //console.log('App is active, reset session data: ' + getFinalSession);
          removeBcnaSession();
        }
      });
      if (!this.isLogged) {
        this.$router.push('/')
      }
      await this.$store.dispatch('setCurrency')
      await this.$store.dispatch('getPriceNow')
      await this.$store.dispatch('setDefaultTimeout')
      
    },
    methods: {
      async changeNetwork(network) {
        this.$store.commit('setNetwork', network) 
        
        await this.$store.dispatch('initRpc')
        this.accountNow = this.allWallets[this.accountSelected]
        await this.$store.dispatch('getBankModule', this.accountNow.address)
        await this.$store.dispatch('getDistribModule', this.accountNow.address)
        await this.$store.dispatch('getStakingModule', this.accountNow.address)
        await this.$store.dispatch('getWalletAmount')
      },
      async remainingTime(getFinalSession) { 
        let timeNow = Math.floor(Date.now() / 1000)        
        this.timeLeft = timeNow - (Number(getFinalSession) + this.sessionMax)

        if (this.timeLeft > 0) { 
          this.$store.commit('setIsLogged', false)
          removeBcnaSession()
          this.$router.push('/?expired=true')
        }
      },
      logout() {
        this.$store.commit('setIsLogged', false)
        this.$router.push('/')
      }
    }
  }
</script>
<style>
#inspire {
  background: "black";
}
</style>

