<template>
    <v-container>
      
      <h3>{{ $t("dashboard.title") }}</h3>
      <br /> 
      <br />
        <v-select
          v-model="$i18n.locale"
          label="Language"
          :items="$i18n.availableLocales"
          :item-title="'locale-' + locale"
          :item-value="locale"
          variant="outlined"
        ></v-select>  
      <v-row>
        <v-col>
          <v-card 
            v-if="allWallets.length > 0"
            :title="accountNow.name"
            :subtitle="accountNow.address" 
          ></v-card> 
        </v-col>
      </v-row>
    </v-container> 
    
</template>

<script>
import { getBcnaSession, removeBcnaSession } from '@/libs/storage.js'; 
import { mapState } from 'vuex'

export default {
  name: 'App', 
  
  data: () => ({
    userSession: '',
    timeNow: '',
    timeNowDebug: '',
    timeLeft: '',
    timeoutJs: '',
    accountNow: '',
  }),
  computed: {
    ...mapState(['isLogged', 'allWallets', 'sessionMax', 'accountSelected'])
  },
  async mounted() { 
    this.accountNow = this.allWallets[this.accountSelected]
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
