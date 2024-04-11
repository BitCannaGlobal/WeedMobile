<template>
  <v-app style="background-color:black; color:white" id="inspire">
    <v-navigation-drawer color="#1C1D20" width="500" v-model="drawer" temporary>
        <v-list
          density="compact"
          nav
          class="mt-9"
        >
        <v-list-item
          prepend-icon="mdi-close-thick"
          class=""
          :title="$t('menu.title')"
          @click="drawer = false"
        ></v-list-item>
        <v-divider></v-divider>
          <v-list-item v-if="isLogged" prepend-icon="mdi-view-dashboard" :title="$t('menu.dashboard')" to="/dashboard"></v-list-item>
          <v-list-item v-if="isLogged" prepend-icon="mdi-book-open-page-variant-outline" :title="$t('menu.addressBook')" to="/addressbook"></v-list-item>
          <v-list-item v-if="isLogged" prepend-icon="mdi-bank-transfer" :title="$t('menu.transactions')" to="/transactions"></v-list-item>
          <v-list-item v-if="isLogged" prepend-icon="mdi-qrcode-edit" :title="$t('menu.createQrcode')" to="/create-qrcode"></v-list-item>
          <v-list-item v-if="isLogged" prepend-icon="mdi-qrcode-scan" :title="$t('menu.scanQrcode')" to="/scan-qrcode"></v-list-item>
          <v-list-item v-if="isLogged" prepend-icon="mdi-cog" :title="$t('footer.title3')" to="/config"></v-list-item>
          <!-- <v-list-item prepend-icon="mdi-pencil" title="Create/import" to="/create"></v-list-item> -->
 
          <v-list-item v-if="isLogged" prepend-icon="mdi-login" :title="$t('menu.logout')" @click="logout"></v-list-item>           
        </v-list>
    </v-navigation-drawer>

    <!-- <v-app-bar style="background-color:black; color:white"  class="mt-7">
      <v-app-bar-nav-icon  v-if="isLogged" class="ml-auto mr-n4"   @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title  v-if="isLogged">WeedMobile</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar> -->

    <v-main>    
      <router-view></router-view>
      <v-spacer></v-spacer>
      <div v-if="viewFooter">
       <!--  <mainFooter v-if="isLogged" />     -->

        <template v-if="isLogged">
          <v-bottom-navigation grow >
            <v-btn color="#212121" class="burgerMenu" @click="drawer = !drawer">
              <v-icon color="#ffffff">mdi-menu</v-icon> 
            </v-btn>
            <v-btn value="recent" to="/dashboard">
              <v-icon>mdi-view-dashboard</v-icon>
              <span
                ><strong>{{ $t("footer.title1") }}</strong></span
              >
            </v-btn>

            <v-btn value="favorites" to="/accounts">
              <v-icon>mdi-swap-horizontal-bold</v-icon>
              <span
                ><strong>{{ $t("footer.title2") }}</strong></span
              >
            </v-btn>

            <!-- <v-btn value="nearby" to="/config">
              <v-icon>mdi-cog</v-icon>
              <span
                ><strong>{{ $t("footer.title3") }}</strong></span
              >
            </v-btn> -->
          </v-bottom-navigation>
        </template>



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
import { addBcnaSession, getBcnaSession, removeBcnaSession, getSessionTimeOut, getNotifReceive } from '@/libs/storage.js'; 
import axios from 'axios';

  export default {
    data: () => ({
      drawer: false,
      drawertest: false,
      timeLeft: '',
      bitcannaConfig: bitcannaConfig,
      accountNow: '',
      viewFooter: true,
      currentPage: '',
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
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
      /* async $route(to, from) { 
        this.currentPage = to.name 
        if (to.name === 'Create-qrcode') {
          this.viewFooter = false
        } else {
          this.viewFooter = true
        }
      } */
    },
    computed: {
      ...mapState(['allWallets', 'network', 'isLogged', 'sessionMax', 'accountSelected'])
    }, 
    async mounted() {
      let sessionTimeOut = await getSessionTimeOut();
      this.$store.dispatch('setDefaultTimeout', sessionTimeOut)

      /*App.addListener('appStateChange', async ({ isActive }) => {
        const testCamera = await Camera.checkPermissions()
        console.log('App state changed. Is active?', isActive);

        if(this.$route.name === 'Scan-qrcode') {
          if (testCamera.camera === 'granted') {
            this.sessionManager(isActive)
          } 
        } else {
          this.sessionManager(isActive)
        }
        
      }); */

      await this.$store.dispatch('initRpc')

      if (!this.isLogged) {
        removeBcnaSession()
        this.$store.commit('setIsLogged', false)
        this.$router.push('/')
        return
      }      
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
      async sessionManager(isActive) {
        if (!isActive) { 
          await addBcnaSession();
        } else {
          let getFinalSession = await getBcnaSession();
          //this.remainingTime(getFinalSession)
          //removeBcnaSession();
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

.burgerMenu::before {
  background-color: "#212121";
}
.burgerMenu::after {
  background-color: "#212121";
}
</style>
