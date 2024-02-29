<template>
  <v-app  style="background-color:black; color:white" id="inspire">

    <v-navigation-drawer color="#1C1D20" width="500" v-model="drawer" temporary>
        <v-list
          density="compact"
          nav
        >
        <v-list-item
          prepend-icon="mdi-close-thick"
          :title="$t('menu.title')"
          @click="drawer = false"
        ></v-list-item>

        <v-divider></v-divider>
          <v-list-item v-if="isLogged" prepend-icon="mdi-view-dashboard" :title="$t('menu.dashboard')" to="/dashboard"></v-list-item>
          <v-list-item v-if="isLogged" prepend-icon="mdi-book-open-page-variant-outline" :title="$t('menu.addressBook')" to="/addressbook"></v-list-item>
          <v-list-item v-if="isLogged" prepend-icon="mdi-bank-transfer" :title="$t('menu.transactions')" to="/transactions"></v-list-item>
          <v-list-item v-if="isLogged" prepend-icon="mdi-qrcode-edit" :title="$t('menu.createQrcode')" to="/create-qrcode"></v-list-item>
          <v-list-item v-if="isLogged" prepend-icon="mdi-qrcode-scan" :title="$t('menu.scanQrcode')" to="/scan-qrcode"></v-list-item>
          <!-- <v-list-item prepend-icon="mdi-pencil" title="Create/import" to="/create"></v-list-item> -->
          <v-list-item v-if="isLogged" prepend-icon="mdi-login" :title="$t('menu.logout')" @click="logout"></v-list-item> 
          
        </v-list>
    </v-navigation-drawer>

    <v-app-bar style="background-color:black; color:white">
      <v-app-bar-nav-icon  v-if="isLogged"   @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title  v-if="isLogged"  >WeedMobile</v-toolbar-title>
      <v-spacer></v-spacer>
 

    <!--<v-menu
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
    </v-menu> -->

    </v-app-bar>

    <v-main>
      <!-- <div class="mt-10 text-center">{{ height }}</div> -->
      
      <router-view></router-view>
      <div v-if="viewFooter">
        <mainFooter v-if="isLogged" />    
      </div>  
    </v-main>
  </v-app>
</template>

<script>
import { App } from '@capacitor/app';
import { Camera } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { LocalNotifications } from '@capacitor/local-notifications';
import bitcannaConfig from '../../bitcanna.config'

import { mapState } from 'vuex'
import mainFooter from '@/components/Footer.vue' 
import { addBcnaSession, getBcnaSession, removeBcnaSession, getSessionTimeOut, getNotifReceive } from '@/libs/storage.js'; 
import axios from 'axios';

  export default {
    components: { mainFooter },
    data: () => ({
      drawer: false,
      drawertest: false,
      timeLeft: '',
      bitcannaConfig: bitcannaConfig,
      accountNow: '',
      viewFooter: true,
      currentPage: ''
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
    watch: {
      async $route(to, from) { 
        this.currentPage = to.name 
        if (to.name === 'Create-qrcode') {
          this.viewFooter = false
        } else {
          this.viewFooter = true
        }
      }
    },
    computed: {
      ...mapState(['allWallets', 'network', 'isLogged', 'sessionMax', 'accountSelected'])
    }, 
    async mounted() {
      let sessionTimeOut = await getSessionTimeOut();
      this.$store.dispatch('setDefaultTimeout', sessionTimeOut)

      App.addListener('appStateChange', async ({ isActive }) => {
        const testCamera = await Camera.checkPermissions()
        console.log('App state changed. Is active?', isActive);

        if(this.$route.name === 'Scan-qrcode') {
          if (testCamera.camera === 'granted') {
            this.sessionManager(isActive)
          } 
        } else {
          this.sessionManager(isActive)
        }
        
      }); 

      await this.$store.dispatch('initRpc')
      // Test notification
      this.sendNotification()     

      if (!this.isLogged) {
        removeBcnaSession()
        this.$store.commit('setIsLogged', false)
        this.$router.push('/')
        return
      }      
    },
    methods: {
      async sendNotification() {
        const notiPrice = await Preferences.get({ key: "notifPrice" });
        const lastNotifPrice = await Preferences.get({ key: "lastNotifPrice" });

        console.log('lastNotifPrice', Number(lastNotifPrice.value) + 24 * 3600)
        
        if(notiPrice.value === 'true' && (Number(lastNotifPrice.value) + 24 * 3600) < Math.floor(Date.now() / 1000)) {
          let getBitcannaInfo = await axios.get('https://api.coingecko.com/api/v3/coins/bitcanna')
          LocalNotifications.schedule({
            notifications: [
              {
                title: "Bitcanna price " + getBitcannaInfo.data.market_data.price_change_percentage_24h + "%",
                body: "1 BCNA = $" + getBitcannaInfo.data.market_data.current_price.usd,
                largeBody: "$ " + getBitcannaInfo.data.market_data.current_price.usd,
                id: 1,
                schedule: { at: new Date(Date.now()) },
                sound: null,
                attachments: null,
                actionTypeId: "",
                extra: null
              }
            ]
          });
          await Preferences.set({ key: "lastNotifPrice", value: Math.floor(Date.now() / 1000) });
        }

      },
      async changeNetwork(network) {
        this.$store.commit('setNetwork', network) 
        await this.$store.dispatch('initRpc')
        this.accountNow = this.allWallets[this.accountSelected]
        await this.$store.dispatch('getBankModule', this.accountNow.address)
        await this.$store.dispatch('getDistribModule', this.accountNow.address)
        await this.$store.dispatch('getStakingModule', this.accountNow.address)
        await this.$store.dispatch('getWalletAmount')
      },
      async sessionManager(isActive) {
        if (!isActive) { 
          await addBcnaSession();
          //console.log('App will close in ' + this.sessionMax + ' seconds');
        } else {
          let getFinalSession = await getBcnaSession();
          this.remainingTime(getFinalSession)
          //console.log('App is active, reset session data: ' + getFinalSession);
          removeBcnaSession();
        }
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
        removeBcnaSession()
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

@font-face {
    font-family: CarmenBold;
    src: url("@/assets/fonts/Carmen Sans Bold.otf") format("opentype");
}
@font-face {
    font-family: CarmenMedium;
    src: url("@/assets/fonts/Carmen Sans Medium.otf") format("opentype");
}
.body,
.v-application{
    font-family: 'CarmenMedium';
} 
.carmenBold {
    font-family: 'CarmenBold';
} 
.bitcannaFont {
    font-family: 'CarmenMedium';
} 

</style>
