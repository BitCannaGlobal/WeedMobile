<template>  
    <h4 class="ma-4">Accounts</h4> 


    <v-card color="black" >
      <v-card-text class="justify-center">
      <v-row>
        <v-col
          cols="6"
        >
        <CreateAccount />
        </v-col>
        <v-col
          cols="6"
        >
        <v-btn block size="x-large" color="#1C1D20"  @click="dialogCreate = true">Import </v-btn> 
        </v-col>
      </v-row>
    </v-card-text>
    </v-card> 

    <h4 v-if="allWallets.length > 0" class="ma-4">Select wallet</h4> 
    <v-card
      v-for="(item, i) in allWalletsList"
      class="ma-4"
      :style="item.selected == true ? 'border: 2px solid #0FB786;' : 'border: 1px solid white;'"
 
      @click="changeAccount(i)"
    >
      <v-card-title>
        <v-row no-gutters>
          <v-col 
            cols="6" 
          >
            <v-sheet>
              {{ item.name }}
            </v-sheet>
          </v-col>
          <v-col 
            cols="6" 
          >
            <v-sheet class="d-flex align-end flex-column">
              <span class="mdi mdi-cog" @click.stop="viewMnenomicDial(i)"></span>

            </v-sheet>
          </v-col>
        </v-row>
 
      </v-card-title>
      <v-card-text>
 
          {{ item.addr }}
 
      </v-card-text>
      <v-card-actions> 
        <v-col class="text-right">
          <v-btn color="#0FB786" variant="outlined" @click.stop="editNowModal(i)">Edit</v-btn>
          <v-btn color="red" variant="outlined" @click="openDeleteWallet()">Delete</v-btn>
        </v-col> 
      </v-card-actions>
    </v-card>
 
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
          <v-toolbar-title>Create wallet</v-toolbar-title>
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
        <v-list>
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
          <v-alert
            v-model="alertErrorName"
            class="ma-4"
            variant="outlined"
            type="warning"
            border="top"
            closable
            close-label="Close Alert"
          >
            Wallet name already taken
          </v-alert>
          <v-alert
            v-model="alertErrorAddressExist"
            class="ma-4"
            variant="outlined"
            type="warning"
            border="top"
            closable
            close-label="Close Alert"
          >
            Wallet address already taken
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
          <v-toolbar-title>Import wallet</v-toolbar-title>
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
          <v-alert
            v-model="alertErrorName"
            class="ma-4"
            variant="outlined"
            type="warning"
            border="top"
            closable
            close-label="Close Alert"
          >
            Wallet name already taken
          </v-alert>
          <v-alert
            v-model="alertErrorAddressExist"
            class="ma-4"
            variant="outlined"
            type="warning"
            border="top"
            closable
            close-label="Close Alert"
          >
            Wallet address already taken
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
      v-model="dialogViewMnemonic"
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
            @click="dialogViewMnemonic = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>View Mnemonic</v-toolbar-title>
        </v-toolbar>
        <v-list
          lines="two"
          subheader
        >
          <v-list-item title="Infomations" subtitle="Set the content filtering level to restrict apps that can be downloaded"> </v-list-item>
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
                v-if="!canViewMnemonic"
                v-model="passwordView"
                variant="outlined"
                color="#00b786"
                counter="6"
                label="Password"
                style="min-height: 96px"
                type="password"
                class="mt-6"
              ></v-text-field>
          </v-list-item>
          <v-card
            v-if="canViewMnemonic"
            class="pa-2"
            style="border: 2px solid #0FB786;"
          >
            {{ viewMnemonic }}

          </v-card>
          <v-btn v-if="canViewMnemonic" class="ma-2" >
            Copy
          </v-btn>
        </v-list>
      </v-card>
    </v-dialog>

    <v-bottom-sheet v-model="deleteWallet" inset>
      <v-card
        class="text-center" 
      >
        <v-card-text>
          <v-btn
            variant="text"
            @click="deleteWallet = !deleteWallet"
          >
            close
          </v-btn>

 

          <v-alert
            v-if="deletedWallet"
            variant="outlined" 
            elevation="2"
            type="success"
            class="m-4"
          >
            Wallet deleted
          </v-alert>

            <v-checkbox
              v-if="!deletedWallet" 
              v-model="checkbox1"
              label="You agree to delete your wallet from the app?"
            ></v-checkbox> 
            <v-text-field
                v-if="!deletedWallet && checkbox1" 
                v-model="password"
                variant="outlined"
                color="#00b786" 
                label="Password"
                style="min-height: 96px" 
                type="password" 
            ></v-text-field>
             <v-btn 
              v-if="!deletedWallet && checkbox1" 
              color="red"  
              block 
              :disabled="!enableButton"
              @click="revemoAccount"
            >
              Delete this wallet
            </v-btn>

                   
 
        </v-card-text>
      </v-card>
    </v-bottom-sheet>

    <div class="text-center">
    <v-bottom-sheet v-model="editNow" inset>
      <v-card
        class="text-center" 
      >
        <v-card-text>
          <v-btn
            variant="text"
            @click="editNow = !editNow"
          >
            close
          </v-btn>

          <br>
          <br>

          <v-alert
            v-if="editedWallet"
            variant="outlined" 
            elevation="2"
            type="success"
          >
            Wallet edited
          </v-alert>
          <v-text-field
            v-if="!editedWallet"
            v-model="walletName"
            label="Wallet name"
            variant="outlined"
          ></v-text-field>  
        <v-btn
          v-if="!editedWallet"
          class="flex-grow-1"
          color="green"  
          block 
          @click="editAccount"
        >
          Edit wallet
        </v-btn>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div> 
 
</template>
<script>
import { mapState } from 'vuex'
import { Preferences } from '@capacitor/preferences';
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing" 
import { checkMasterPassword, removeAccount, addAccount, removeAccountId, editAccountId } from '@/libs/storage.js';
import md5 from 'md5' 
import CreateAccount from '@/components/CreateAccount.vue' 

export default {  
  components: { CreateAccount },
  data: () => ({ 
    items: [],
    dialogImport: false,
    dialogCreate: false,
    dialogCreateWallet: false,
    dialogViewMnemonic: false,
    name: '',
    mnemonic: '',
    password: '',
    passwordView: '',
    select: '',
    items: [],
    alertError: false,
    alertSuccess: false,
    alertDelete: false,
    alertErrorName: false,
    alertErrorAddressExist: false,
    deleteWallet: false,
    deletedWallet: false,
    checkbox1: false,
    enableButton: false,
    editNow: false,
    editedWallet: false,
    walletName: '',
    editThisWallet: null,
    viewMnenomicFor: '',
    viewMnemonic: '',
    canViewMnemonic: false,
  }),
  watch: {
    password: function (val) {
      console.log(val)
      if(val !== '') {
        this.enableButton = true
      } else {
        this.enableButton = false
      }
    },
    passwordView: async function (val) {
      const hash = md5(val); 
      const { value } = await Preferences.get({ key: 'masterPass' });

      if(hash === value) {        
        const deserialized = await DirectSecp256k1HdWallet.deserialize(this.viewMnenomicFor.data, val);
        this.viewMnemonic = deserialized.secret.data
        this.canViewMnemonic = true
      }
      
    },
    mnemonic: function (val) {
      this.mnemonic = this.mnemonic.toLowerCase()      
    },
  },  
  computed: {
    ...mapState(['allWallets', 'isLogged', 'accountSelected', 'allWalletsList'])
  },
  async mounted() {
    this.setData() 


      //console.log(await addAccount());
      // console.log(await getAccounts());
      //console.log(await removeAccount());

  },
  methods: { 
    viewMnenomicDial(i) {
      this.viewMnenomicFor = this.allWallets[i]
      this.dialogViewMnemonic = true
      this.mnemonicView = ''
      this.viewMnemonic = ''
      this.passwordView = ''
      this.canViewMnemonic = false
    },
    viewMnenomic() {
      console.log(this.viewMnenomicFor) 
    },
    async setData() {
      await this.$store.dispatch('getWallets')

    },
    async changeAccount(i) {
      //console.log(i)
      await this.$store.dispatch('changeWallet', i)
      this.setData() 
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
      this.alertErrorName = false
      this.alertErrorAddressExist = false

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

      console.log(this.allWallets)
      const foundName = this.allWallets.find((element) => element.name === this.name);
      const foundAddress = this.allWallets.find((element) => element.address === finalAddress[0].address);
      if (foundName) {
        this.alertErrorName = true
        return
      }
      if (foundAddress) {
        this.alertErrorAddressExist = true
        return
      }

      await addAccount( this.name, finalAddress[0].address, finalWallet )
      await this.$store.dispatch('getWallets')

      this.dialogImport = false
      this.dialogCreate = false 
    },    
    editNowModal(id) { 
      this.walletName = this.allWallets[id].name
      this.editThisWallet = id
      this.editedWallet = false
      this.editNow = !this.editNow
    },
    async editAccount() {
      await editAccountId(this.editThisWallet, this.walletName)
      await this.$store.dispatch('getWallets')
      this.editedWallet = true
    }, 
    async openDeleteWallet() {
        this.deleteWallet = true
        this.deletedWallet = false
        this.checkbox1 = false
    },
    async revemoAccount() {
        console.log(this.password)
        const hash = md5(this.password);
        let checkPass = await checkMasterPassword(hash)
        if(checkPass) {
          console.log('Deleted!!')
          await removeAccountId(this.accountSelected)
          this.setData() 
          
          this.dialogImport = false
          this.dialogCreate = false 
          await this.$store.dispatch('changeWallet', 0)
          this.deletedWallet = true
          if(this.allWallets.length === 0) {
            // this.$store.commit('setIsLogged', false)
            this.$router.push('/accounts') 
          }  
        } else {
          console.log('Not Deleted :/')
          this.alertError = true
        }          

      }
  }
}
</script>