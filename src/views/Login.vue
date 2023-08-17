<template>
  <div id="login">
    <v-row align="center" justify="center">
  <v-img 
    cover
    src="@/assets/banner-home.png"
  ></v-img>
 
  </v-row>
  <div v-if="passExist" class="mt-10 text-center">{{ $t("login.title") }}</div> 
  <div v-else class="mt-10 text-center">Welcome to bitcanna app<br />Create first your password to use your wallet</div>
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
      <v-row v-if="passExist">
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
 
      <v-btn v-if="passExist" type="submit" block class="mt-2" size="x-large" color="#0FB786" @click="login">        
        {{ $t("login.loginButton") }}
      </v-btn> 
      <v-btn v-if="!passExist" type="submit" size="x-large" color="#1C1D20" block class="mt-4" @click="dialogMasterPassword = true">Set masterpass</v-btn>
      <v-btn v-else type="submit" size="x-large" color="red" block class="mt-4" @click="removePassword">Remove masterpass</v-btn> 
    </v-container>
  </div>

 
  <v-dialog
      v-model="dialogMasterPassword"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
        >
          <v-btn
            icon
            dark
            @click="dialogMasterPassword = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Import</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              variant="text"
              size="x-large"
              @click="saveMasterPassword"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          lines="two"
          subheader
        >
          <v-list-item title="Infomations" subtitle="Set the content filtering level to restrict apps that can be downloaded"></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-text-field
              v-model="masterPass"
              type="password"
              variant="outlined"
              color="#00b786"
              counter="6"
              label="Set your password"
              style="min-height: 96px"
              class="mt-4"              
            ></v-text-field>
          </v-list-item> 
          <v-list-item>
            <v-text-field
              v-model="masterPass2"
              type="password"
              variant="outlined"
              color="#00b786"
              counter="6"
              label="Repeat your password"
              style="min-height: 96px"
              class="mt-4"
            ></v-text-field>
          </v-list-item> 
        </v-list>
      </v-card>
    </v-dialog>

</template>
<script>
import { Preferences } from '@capacitor/preferences';
import { mapState } from 'vuex'
import md5 from 'md5' 
import { checkMasterPassword, addBcnaSession, getMasterPassword, addMasterPassword, removeMasterPassword } from '@/libs/storage.js';

export default {
  data: () => ({ 
    passWord: '',
    dialogImport: false,
    dialogMasterPassword: false,
    name: '',
    mnemonic: '',
    password: '',
    select: '',
    items: [],
    alertError: false,
    alertSuccess: false,
    alertDelete: false,
    alertExpired: false,
    passExist: false,
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
    if(existPass)
      this.passExist = existPass
  },
  methods: { 
    async login() {
      const hash = md5(this.passWord);
      let checkPass = await checkMasterPassword(hash)
      if(checkPass) {
        await addBcnaSession();
        this.$store.commit('setIsLogged', checkPass)

        /* if(this.allWallets.length !== 0) {
          this.$router.push('/dashboard')
        } else {
          this.$router.push('/create')
        } */

        this.$router.push('/dashboard')
      } else {
        this.alertError = true
      }  
    },
    async saveMasterPassword() {
      if (this.masterPass == this.masterPass2) {
        await addMasterPassword( this.masterPass )
        this.dialogMasterPassword = false
        // Refresh pass exist
        let existPass = await getMasterPassword()
        this.passExist = existPass
      }
    },
    async removePassword() {
      await removeMasterPassword()
      // Refresh pass exist
      let existPass = await getMasterPassword()
      this.passExist = existPass
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
