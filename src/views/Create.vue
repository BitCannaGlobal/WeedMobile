<template>
  <div id="login">
  <v-row align="center" justify="center">
  <v-img 
    cover
    src="@/assets/banner-home.png"
  ></v-img>
 
  </v-row>
  <div class="mt-8 ml-4 text-h4">Welcome to Bitcanna</div>
    <v-container class="d-flex flex-column">
<!--     <v-alert
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
      v-model="alertDelete"
      variant="outlined"
      type="success"
      color="#00b786"
      border="top"
      closable
      close-label="Close Alert"
    >
      All wallets are deleted
    </v-alert>
    <br />
      <v-row>
        <v-col
          cols="12"
        >
          <v-select
            v-model="select"
            :items="items"
            item-title="state"
            item-value="abbr"
            variant="outlined"
            label="Select wallet"
            persistent-hint
            return-object
          ></v-select>
          <v-text-field
            v-model="passWord"
            label="Password"
            required
            variant="outlined"
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
      
      <v-btn type="submit" block class="mt-2" @click="login">Unlock</v-btn> -->
      <v-btn type="submit" size="x-large" color="#0FB786" block class="mt-4" @click="dialogImport = true">Create a BitCanna wallet</v-btn>
      <v-btn type="submit" size="x-large" color="#1C1D20" block class="mt-4" @click="dialogCreate = true">Import wallet</v-btn>
      <v-btn v-if="!passExist" type="submit" size="x-large" color="#1C1D20" block class="mt-4" @click="dialogMasterPassword = true">Set masterpass</v-btn>
      <v-btn v-else type="submit" size="x-large" color="red" block class="mt-4" @click="removePassword">Remove masterpass</v-btn> 
      <!-- <v-btn type="submit" size="x-large" block class="mt-2" @click="deleteWallets">Delete wallets (dev mode)</v-btn>
 -->
 
    </v-container>
  </div>


   <!--  <v-dialog
      v-model="dialogImport"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
      class="bitcannaFont"
    >
      <v-card>
        <v-toolbar
          dark
        >
          <v-btn
            icon
            dark
            @click="dialogImport = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Import</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              variant="text"
              size="x-large"
              @click="importWallet"
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
        <v-list
        >
      <v-alert
        v-model="alertError"
        class="ma-4"
        variant="outlined"
        type="warning"
        border="top"
        closable
        close-label="Close Alert"
      >
        Bad password
      </v-alert>

        <v-list-item>
            <v-text-field
                v-model="name"
                variant="outlined"
                color="#00b786"
                counter="6"
                label="Wallet name"
                style="min-height: 96px"
                class="mt-6"
              ></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-btn
              block
              color="#00b786"
              size="x-large"
              @click="generateWallet"
            >
              Generate
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-textarea
              v-model="mnemonic"
              auto-grow
              variant="outlined"
              color="#00b786"
              label="Mnemonic"
              rows="4"
              class="mt-6"
            ></v-textarea>
          </v-list-item>
          <v-list-item>
            <v-text-field
                v-model="password"
                variant="outlined"
                color="#00b786"
                counter="6"
                label="Password"
                style="min-height: 96px"
                type="password"
                class="mt-6"
              ></v-text-field>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog> -->

    <v-dialog
      v-model="dialogCreate"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
      class="bitcannaFont"
    >
      <v-card>
        <v-toolbar
          dark
        >
          <v-btn
            icon
            dark
            @click="dialogCreate = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Import</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              variant="text"
              size="x-large"
              @click="importWallet"
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
        <v-list
        >
       <v-alert
        v-model="alertError"
        class="ma-4"
        variant="outlined"
        type="warning"
        border="top"
        closable
        close-label="Close Alert"
      >
        Bad password
      </v-alert>       
        <v-list-item>
            <v-text-field
                v-model="name"
                variant="outlined"
                color="#00b786"
                counter="6"
                label="Wallet name"
                style="min-height: 96px"
                class="mt-6"
              ></v-text-field>
          </v-list-item> 
          <v-list-item>
            <v-textarea
              v-model="mnemonic"
              auto-grow
              variant="outlined"
              color="#00b786"
              label="Mnemonic"
              rows="4"
              class="mt-6"
            ></v-textarea>
          </v-list-item>
          <v-list-item>
            <v-text-field
                v-model="password"
                variant="outlined"
                color="#00b786"
                counter="6"
                label="Password"
                style="min-height: 96px"
                type="password"
                class="mt-6"
              ></v-text-field>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogMasterPassword"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
      class="bitcannaFont"
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
import { mapState } from 'vuex'
import { Preferences } from '@capacitor/preferences';
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing" 
import { removeBcnaSession, removeAccount, addAccount, addMasterPassword, getMasterPassword, removeMasterPassword } from '@/libs/storage.js';
import md5 from 'md5' 
// import { userData } from './stores/data'

export default {
  data: () => ({ 
    passWord: '',
    dialogImport: false,
    dialogCreate: false,
    dialogMasterPassword: false,
    name: '',
    mnemonic: '',
    password: '',
    select: '',
    items: [],
    alertError: false,
    alertSuccess: false,
    alertDelete: false,
    passExist: false,
  }),
  computed: {
    ...mapState(['allWallets', 'isLogged'])
  },
  async mounted() {
      if (!this.isLogged) {
        removeBcnaSession()
        this.$store.commit('setIsLogged', false)
        this.$router.push('/')
        return
      }
      let existPass = await getMasterPassword()
      this.passExist = existPass
      console.log(existPass)
      await this.$store.dispatch('getWallets')
      this.items = []
      for (const element of this.allWallets) {
        this.items.push({ state: element.name, abbr: element.address })
      }
      this.select = this.items[0]
      //console.log(await addAccount());
      // console.log(await getAccounts());
      //console.log(await removeAccount());

  },
  methods: { 
/*     async login() {
      console.log("login")  
      const hash = md5(this.passWord);

      console.log(hash)
      await this.$store.dispatch('checkLogin', { name: this.select.state, password: this.passWord });

      if (this.isLogged) { 
        this.$router.push('/')
      } else {
        this.alertError = true
      } 
    }, */
    async deleteWallets() {
      await removeAccount() 
      this.items = []
      this.select = this.items[0]
      this.alertDelete = true
    },
    async generateWallet() {
      const wallet = await DirectSecp256k1HdWallet.generate(12)
      this.mnemonic = wallet.mnemonic
    },
    async importWallet() {
      const hash = md5(this.password); 
      const { value } = await Preferences.get({ key: 'masterPass' });

      console.log(hash, value)
      if(hash !== value) {
        this.alertError = true
        return
      }
      

      const wallet = await DirectSecp256k1HdWallet.fromMnemonic( this.mnemonic, {
        prefix: 'bcna'
      })
      var finalWallet = await wallet.serialize( this.password )
      var finalAddress = await wallet.getAccounts()
      console.log(finalWallet)
      console.log(finalAddress[0].address)

      await addAccount( this.name, finalAddress[0].address, finalWallet )
      await this.$store.dispatch('getWallets')

      this.items = []
      for (const element of this.allWallets) {
        console.log(element.name)
        this.items.push({ state: element.name, abbr: element.address })
      }
      this.select = this.items[0]
      this.dialogImport = false
      this.dialogCreate = false
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
