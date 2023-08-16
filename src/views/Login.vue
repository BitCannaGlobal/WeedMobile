<template>
  <div id="login">
    <v-row align="center" justify="center">
  <v-img 
    cover
    src="@/assets/banner-home.png"
  ></v-img>
 
  </v-row>
  <div class="mt-10 text-center">{{ $t("login.title") }}</div> 
    <v-container>
    <v-alert
      v-model="alertError"
      variant="outlined"
      type="warning"
      border="top"
      closable
      close-label="Close Alert"
    >
      Bad password
    </v-alert>
    <v-alert
      v-model="alertSuccess"
      variant="outlined"
      type="success"
      color="#00b786"
      border="top"
      closable
      close-label="Close Alert"
    >
      You are connected!
    </v-alert>
    <v-alert
      v-model="alertExpired"
      variant="outlined"
      type="warning"
      border="top"
      closable
      close-label="Close Alert"
    >
      Session expired
    </v-alert>
    
    <br />
      <v-row>
        <v-col
          cols="12"
        >
 
          <v-text-field
            v-model="passWord"
            :label="$t('login.passInput')"
            required
            variant="outlined"
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
 
      <v-btn type="submit" block class="mt-2" size="x-large" color="#0FB786" @click="login">        
        {{ $t("login.loginButton") }}
      </v-btn> 

    </v-container>
  </div>

 


</template>
<script>
import { Preferences } from '@capacitor/preferences';
import { mapState } from 'vuex'
import md5 from 'md5' 
import { checkMasterPassword, addBcnaSession, getMasterPassword } from '@/libs/storage.js';

export default {
  data: () => ({ 
    passWord: '',
    dialogImport: false,
    name: '',
    mnemonic: '',
    password: '',
    select: '',
    items: [],
    alertError: false,
    alertSuccess: false,
    alertDelete: false,
    alertExpired: false,
  }),
  computed: {
    ...mapState(['allWallets', 'isLogged'])
  },
  async mounted() {
    await this.$store.dispatch('getWallets')
    if (typeof this.$route.query.expired !== 'undefined') {
      this.alertExpired = true
    }

    let existPass = await getMasterPassword()
    if(!existPass)
      this.$router.push('/create')
  },
  methods: { 
    async login() {
      const hash = md5(this.passWord);
      let checkPass = await checkMasterPassword(hash)
      if(checkPass) {
        await addBcnaSession();
        this.$store.commit('setIsLogged', checkPass)

        if(this.allWallets.length !== 0) {
          this.$router.push('/dashboard')
        } else {
          this.$router.push('/create')
        }

        // this.$router.push('/dashboard')
      } else {
        this.alertError = true
      }  
    }
  }
}
</script>
<style>
/* #login {
  background: linear-gradient(black 70%, #3CC194);
  min-width: 100%;
  min-height: 100%;
  width: 100%;
  height: auto;
  position: fixed;
} */
</style>
