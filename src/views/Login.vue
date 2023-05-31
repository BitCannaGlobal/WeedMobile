<template>
  <div id="login">
  <v-row align="center" justify="center">
  <v-img
    max-width="200"
    max-height="200"
    src="@/assets/logo-bcna.png"
  ></v-img>
  </v-row>
  <div class="mt-10 text-center">Unlock Wallet</div>
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
    <br />
      <v-row>
        <v-col
          cols="12"
        >
 
          <v-text-field
            v-model="passWord"
            label="Password"
            required
            variant="outlined"
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
 
      <v-btn type="submit" block class="mt-2" @click="login">Unlock</v-btn> 

    </v-container>
  </div>

 


</template>
<script>
import { mapState } from 'vuex'
import md5 from 'md5' 
// import { userData } from './stores/data'

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
  }),
  computed: {
    ...mapState(['allWallets', 'isLogged'])
  },
  async mounted() {
 

  },
  methods: { 
    async login() {
      console.log("login")  
      const hash = md5(this.passWord);

      console.log(hash)
      await this.$store.dispatch('checkLogin', { name: this.select.state, password: this.passWord });

      if (this.isLogged) { 
        this.$router.push('/')
      } else {
        this.alertError = true
      } 
    },
 
  }
}
</script>
<style>
#login {
  background: linear-gradient(black 70%, #3CC194);
  min-width: 100%;
  min-height: 100%;
  width: 100%;
  height: auto;
  position: fixed;
}
</style>
