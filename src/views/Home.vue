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
                <i>
                  <span v-if="currencyNow === 'USD'">$</span>{{ (this.totalTokens * priceNow).toFixed(3) }}<span v-if="currencyNow === 'EUR'">€</span>
                </i> 
                <span class="text-green-lighten-1"> (<span v-if="currencyNow === 'USD'">$</span>{{ priceNow }}<span v-if="currencyNow === 'EUR'">€</span>)</span>
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
 
                    <actionsModal type="stake" /> 
                    
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
                    <actionsModal type="claim" /> 

                  </v-sheet>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card> 
        </v-col>
 
      </v-row>
    </v-container> 
    
    <v-card  v-if="allWallets.length > 0"  color="black" >
      <v-card-text  >
      <v-row>
        <v-col
          cols="6"
        >
        <actionsModal type="sendTx" /> 
        </v-col>
        <v-col
          cols="6"
        >
        <v-btn block size="x-large" color="#1C1D20"  @click="actionReceive = true">Receive</v-btn> 
        </v-col>
      </v-row>
    </v-card-text>
    </v-card>
    <v-card v-if="allWallets.length === 0" class="ma-4" color="black" >
      <v-alert
        variant="outlined"
        type="success"
        border="top"
      >
        Hey, there is no wallet available yet.
      </v-alert>
      <br />
      <v-btn block size="x-large" color="#1C1D20" to="/accounts">Create one here</v-btn> 
    </v-card>
</template>

<script>
import { getBcnaSession, removeBcnaSession } from '@/libs/storage.js'; 
import { mapState } from 'vuex'
import actionsModal from '@/components/ActionsModal.vue'

import bitcannaConfig from '../bitcanna.config'

export default {
  name: 'App', 
  components: { actionsModal },
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
      'totalTokens',
      'currencyNow'
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
