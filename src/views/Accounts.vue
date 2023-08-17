<template>  
    <h4 class="ma-4">Accounts</h4> 

    <div align="center" justify="center"> 
        <v-btn size="x-large" color="#0FB786" class="ma-2" @click="dialogImport = true">Create a BitCanna wallet</v-btn> 
        <v-btn size="x-large" color="#1C1D20" @click="dialogCreate = true">Import wallet</v-btn> 
    </div>
 
    <v-card
      v-for="(item, i) in items"
       class="ma-4"
      :title="item.name"
      :subtitle="item.addr"
      @click="changeAccount(i)"
    ></v-card>

    <v-dialog
      v-model="dialogImport"
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
    </v-dialog>

    <v-dialog
      v-model="dialogCreate"
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


</template>
<script>
import { mapState } from 'vuex'
import { Preferences } from '@capacitor/preferences';
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing" 
import { getAccounts, removeAccount, addAccount, addMasterPassword, getMasterPassword, removeMasterPassword } from '@/libs/storage.js';
import md5 from 'md5' 

export default {
  data: () => ({ 
    items: [],
    dialogImport: false,
    dialogCreate: false,
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
      await this.$store.dispatch('getWallets')
      this.items = []
      for (const element of this.allWallets) {
        this.items.push({ name: element.name, addr: element.address })
      } 
      //console.log(await addAccount());
      // console.log(await getAccounts());
      //console.log(await removeAccount());

  },
  methods: { 
    async changeAccount(i) {
      //console.log(i)
      await this.$store.dispatch('changeWallet', i)
    }, 
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
        this.items.push({ name: element.name, addr: element.address })
      }
      this.select = this.items[0]
      this.dialogImport = false
      this.dialogCreate = false
    },    
  }
}
</script>