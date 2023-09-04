<template>
    <v-container>
      
      <h3>{{ $t("dashboard.title") }} {{ accountNow.name }}</h3>
      <br />  
<!--         <v-select
          v-model="$i18n.locale"
          label="Language"
          :items="$i18n.availableLocales"
          :item-title="'locale-' + locale"
          :item-value="locale"
          variant="outlined"
        ></v-select>   -->
        <!-- <v-row>
        <v-col>
          <v-card 
            v-if="allWallets.length > 0"
            :title="accountNow.name"
            :subtitle="accountNow.address" 
          ></v-card> 
        </v-col>
      </v-row>    -->     
      <v-row>
        <v-col>
          <v-card 
            v-if="allWallets.length > 0" 
          >
            <v-card-title class="mb-4 text-h6">Wallet value</v-card-title>
            <v-card-text>
              <h1 class="mb-2">{{ Number(this.totalTokens).toFixed(2) + ' ' + bitcannaConfig[network].coinLookup.viewDenom }}</h1>
              <h4>
                <i>${{ (this.totalTokens * priceNow).toFixed(3) }}</i> 
                <span class="text-green-lighten-1">  ({{ priceNow }})</span>
              </h4>
              <br />
              <h4>{{ accountNow.address }}</h4>
            </v-card-text>
          </v-card> 
          <v-card 
            class="mt-2"
            v-if="allWallets.length > 0" 
            :height="80"
          >
 
            <v-card-text>
              <v-row no-gutters>
                <v-col
                  cols="2" 
                >
                  <v-sheet>          
                    <v-img   
                      inline
                      max-height="50"
                      max-width="50"
                      min-height="50"
                      min-width="50"
                      src="@/assets/icon-stake.png"
                    ></v-img>                   
                  </v-sheet>
                </v-col>
                <v-col
                  class="ml-4 "
                  cols="5" 
                >
                  <v-sheet>       
                    <span class=" text-subtitle-1">
                      Available
                    </span>
                    <br /> 
                    <span class="font-weight-black text-subtitle-1">
                      {{ this.spendableBalances }}
                    </span>
                    
                  </v-sheet>
                </v-col>
                <v-col
                  cols="4" 
                >
                  <v-sheet>          
                  
                    <v-btn 
                    height="40"
                    block
                    flat
                      class="mt-2  white--text"
                      color="#0FB786" 
                    >
                      Stake
                    </v-btn>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card> 
          <v-card 
            class="mt-2"
            v-if="allWallets.length > 0" 
          > 
            <v-card-text>
              <v-row no-gutters>
                <v-col
                  cols="2" 
                >
                  <v-sheet>          
                    <v-img   
                    inline
                      max-height="50"
                      max-width="50"
                      min-height="50"
                      min-width="50"
                      src="@/assets/icon-reward.png"
                    ></v-img>                   
                  </v-sheet>
                </v-col>
                <v-col
                  class="ml-4 "
                  cols="5" 
                >
                  <v-sheet>       
                    <span class=" text-subtitle-1">
                      Your rewards
                    </span>
                    <br />
                    <span class="font-weight-black text-subtitle-1">
                      {{ this.totalRewards }}
                    </span>
                    
                  </v-sheet>
                </v-col>
                <v-col
                  cols="4" 
                >
                  <v-sheet>          
                  
                    <v-btn 
                      height="40"
                      block
                      flat
                      class="mt-2  white--text"
                      color="#333333" 
                    >
                      Claim
                    </v-btn>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card> 
        </v-col>
 
      </v-row>
    </v-container> 

</template>

<script>
import { getBcnaSession, removeBcnaSession } from '@/libs/storage.js'; 
import { mapState } from 'vuex'

import bitcannaConfig from '../bitcanna.config'

export default {
  name: 'App', 
  
  data: () => ({
    bitcannaConfig: bitcannaConfig,
    userSession: '',
    timeNow: '',
    timeNowDebug: '',
    timeLeft: '',
    timeoutJs: '',
    accountNow: '',
  }),
  computed: {
    ...mapState([
      'network', 
      'rpcBase', 
      'isLogged', 
      'allWallets', 
      'sessionMax', 
      'accountSelected', 
      'spendableBalances', 
      'totalRewards', 
      'priceNow',
      'totalTokens'
    ])
  },
 

  async mounted() { 
    this.accountNow = this.allWallets[this.accountSelected]

    await this.$store.dispatch('initRpc')
    await this.$store.dispatch('getBankModule', this.accountNow.address)
    await this.$store.dispatch('getDistribModule', this.accountNow.address)
    await this.$store.dispatch('getStakingModule', this.accountNow.address)
    await this.$store.dispatch('getWalletAmount')
    
    
    console.log(this.totalRewards)

    /* setInterval(async ()=> {
      await this.$store.dispatch('getBankModule', this.accountNow.address)
      await this.$store.dispatch('getDistribModule', this.accountNow.address)
      await this.$store.dispatch('getStakingModule', this.accountNow.address)
      await this.$store.dispatch('getWalletAmount')
    },10000) */
    // console.log(this.isLogged)
    /* let getFinalSession = await getBcnaSession();
    this.userSession = getFinalSession;

    this.remainingTime()
    this.timeoutJs = setInterval(() => {
      this.remainingTime()
    }, 1000); */

  },
  methods: {
    remainingTime() {
      let timeNow = Math.floor(Date.now() / 1000)
      this.timeNow = timeNow
      
      this.timeLeft = timeNow - (Number(this.userSession) + this.sessionMax)
      //console.log(this.timeLeft)
      if (this.timeLeft > 0) {
        clearInterval(this.timeoutJs);
        this.$store.commit('setIsLogged', false)
        removeBcnaSession()
        this.$router.push('/')
      }
    }
  }
}
</script>
