<template>  
    <h4 class="ma-4">{{ $t("accounts.title") }}</h4> 


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
        <v-btn block size="x-large" color="#1C1D20"  @click="openDialogImport()">{{ $t("accounts.importAccount") }}</v-btn> 
        </v-col>
      </v-row>
    </v-card-text>
    </v-card> 

    <h4 v-if="allWallets.length > 0" class="ma-4">{{ $t("accounts.selectWallet") }}</h4> 
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
          <v-btn color="#0FB786" variant="outlined" @click.stop="editNowModal(i)">{{ $t("accounts.btnEditAccount") }}</v-btn>
          <v-btn color="red" variant="outlined" @click="openDeleteWallet()">{{ $t("accounts.btnDeleteAccount") }}</v-btn>
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
          <v-toolbar-title>{{ $t("accounts.mdlImportAccount.title") }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              variant="text"
              size="x-large"
              @click="importWallet"
            >
            {{ $t("accounts.mdlImportAccount.save") }}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          lines="two"
          subheader
        >
          <v-list-item title="Infomations" :subtitle="$t('accounts.mdlImportAccount.subtitle')"></v-list-item>
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
            {{ $t("errors.badPassword") }}
          </v-alert>
          <v-alert
            v-model="alertErrorMnemonic"
            class="ma-4"
            variant="outlined"
            type="warning"
            border="top"
            closable
            close-label="Close Alert"
          >
            {{ $t("errors.badMnemonic") }}
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
            {{ $t("errors.walletAlreadyExist") }}
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
            {{ $t("errors.walletAddressExist") }}
          </v-alert>     
        <v-list-item>
            <v-text-field
                v-model="name"
                :rules="nameRules"
                variant="outlined"
                color="#00b786"
                counter="10"
                :label="$t('accounts.mdlImportAccount.name')"
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
                :rules="passRules"
                variant="outlined"
                color="#00b786" 
                :label="$t('accounts.mdlImportAccount.password')"
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
          <v-toolbar-title>{{ $t("accounts.viewMnemonic.title") }}</v-toolbar-title>
        </v-toolbar>
        <v-list
          lines="two"
          subheader
        >
          <v-list-item title="Infomations" :subtitle="$t('accounts.viewMnemonic.subtitle')"> </v-list-item>
        </v-list>
        
        <v-divider></v-divider>
        <v-list-item> 
        <v-alert
            v-if="!canViewMnemonic"
            v-model="alertError"
            class="mt-4"
            variant="outlined"
            type="warning"
            border="top"
            closable
            close-label="Close Alert"
          >
            {{ $t("errors.badPassword") }}
          </v-alert>
          
            <v-text-field
                v-if="!canViewMnemonic"
                v-model="passwordView"
                variant="outlined"
                color="#00b786" 
                :label="$t('accounts.mdlImportAccount.password')"
                style="min-height: 96px"
                type="password"
                class="mt-6"
              ></v-text-field>
            <v-btn 
              v-if="!canViewMnemonic"
              block 
              color="#0FB786"
              :disabled="loading"
              :loading="loading"
              @click="viewMnenomic()
            ">{{ $t("accounts.viewMnemonic.title") }}</v-btn> 

          </v-list-item>
          <h4 class="ma-4" v-if="canViewMnemonic">{{ $t('accounts.mdlImportAccount.returnMsg') }}</h4>
          <v-card
            v-if="canViewMnemonic"
            color="black"
            class="ma-4 pa-2"
            style="border: 2px solid #0FB786;"
          >
            {{ viewMnemonic }}
          </v-card>  
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
            {{ $t("accounts.deleteWallet.btnClose") }}
          </v-btn>

 

          <v-alert
            v-if="deletedWallet"
            variant="outlined" 
            elevation="2"
            type="success"
            class="m-4"
          >
            {{ $t("accounts.deleteWallet.altSuccess") }}
          </v-alert>
          
            <v-checkbox
              v-if="!deletedWallet" 
              v-model="checkbox1"
              :label="$t('accounts.deleteWallet.agreeDelete')"
            ></v-checkbox> 
            <v-text-field
                v-if="!deletedWallet && checkbox1" 
                v-model="password"
                variant="outlined"
                color="#00b786" 
                :label="$t('accounts.deleteWallet.password')"
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
              {{ $t("accounts.deleteWallet.btnDelete") }}
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
            {{ $t("accounts.editWallet.btnClose") }}
          </v-btn>

          <br>
          <br>

          <v-alert
            v-if="editedWallet"
            variant="outlined" 
            elevation="2"
            type="success"
          >
          {{ $t("accounts.editWallet.altSuccess") }}
          </v-alert>
          <v-text-field
            v-if="!editedWallet"
            v-model="walletName"
            :label="$t('accounts.editWallet.inputName')"
            variant="outlined"
          ></v-text-field>  
        <v-btn
          v-if="!editedWallet"
          class="flex-grow-1"
          color="green"  
          block 
          @click="editAccount"
        >
          {{ $t("accounts.editWallet.btnEdit") }}
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
import { checkMasterPassword, removeAccount, addAccount, removeAccountId, editAccountId, addContact } from '@/libs/storage.js';
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
    alertErrorMnemonic: false,
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
    nameRules: [
      v => !!v || this.$t('accounts.mdlImportAccount.errorWalletRequired'),
      v => (v && v.length <= 10) || this.$t('accounts.mdlImportAccount.errorWalletLength'),
    ], 
    passRules: [
      v => !!v || this.$t('accounts.mdlImportAccount.errorPasswordRequired'),
      v => (v && v.length <= 20) || this.$t('accounts.mdlImportAccount.errorPasswordLength'),
    ],    
  }),
  watch: {
    password: function (val) {
      if(val !== '') {
        this.enableButton = true
      } else {
        this.enableButton = false
      }
    },
    passwordView: async function (val) {
      /* const hash = md5(val); 
      const { value } = await Preferences.get({ key: 'masterPass' });

      if(hash === value) {        
        const deserialized = await DirectSecp256k1HdWallet.deserialize(this.viewMnenomicFor.data, val);
        this.viewMnemonic = deserialized.secret.data
        this.canViewMnemonic = true
      } */
      
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
  },
  methods: { 
    viewMnenomicDial(i) {
      this.viewMnenomicFor = this.allWallets[i]
      this.dialogViewMnemonic = true
      this.mnemonicView = ''
      this.viewMnemonic = ''
      this.passwordView = ''
      this.canViewMnemonic = false
      this.alertError = false
    },
    async viewMnenomic() {
      const hash = md5(this.passwordView); 
      const { value } = await Preferences.get({ key: 'masterPass' });

      if(hash !== value) {
        this.alertError = true
        return
      }

      if(hash === value) {        
        const deserialized = await DirectSecp256k1HdWallet.deserialize(this.viewMnenomicFor.data, this.passwordView);
        this.viewMnemonic = deserialized.secret.data
        this.canViewMnemonic = true
      }
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
      let wallet = await DirectSecp256k1HdWallet.generate(12)
      this.mnemonic = wallet.mnemonic
    },
    openDialogImport() {
      this.dialogImport = true
      this.name = ''
      this.mnemonic = ''
      this.password = ''
      this.alertError = false
      this.alertErrorName = false
      this.alertErrorAddressExist = false
      this.alertErrorMnemonic = false
    },
    async importWallet() {
      this.alertErrorName = false
      this.alertErrorAddressExist = false

      const hash = md5(this.password); 
      const { value } = await Preferences.get({ key: 'masterPass' }) 
      if(hash !== value) {
        this.alertError = true
        return
      }
      let wallet = ""
      try {
        wallet = await DirectSecp256k1HdWallet.fromMnemonic( this.mnemonic, {
          prefix: 'bcna'
        })        
      } catch (error) { 
        this.alertErrorMnemonic = true
        return 
      }

      var finalWallet = await wallet.serialize( this.password )
      var finalAddress = await wallet.getAccounts() 
      
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
      await addContact(this.name, finalAddress[0].address, '')
      //let getAllContacts = await getAllContact()
      await this.$store.dispatch('getWallets')

      this.dialogImport = false 
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
        this.password = ''
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