<template>
    <v-list bg-color="black" lines="two">
      <v-list-subheader>General</v-list-subheader>
      <!-- <Accounts />  -->
      <v-list-item
        :title="$t('config.currency.title')"
        :subtitle="$t('config.currency.subtitle')"
      >
      <template v-slot:prepend>
          <v-avatar>
            <v-icon color="#33ffc9">mdi-currency-usd</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <!-- <v-btn
            v-if="folder.id == 'language'"
            color="grey-lighten-1"
            icon="mdi-chevron-right"
            variant="text"
            @click.stop="changeLang = !changeLang"
          ></v-btn> -->
        </template>
      </v-list-item>
      <v-list-item
        :title="$t('config.language.title')"
        :subtitle="$t('config.language.subtitle')"
      >
        <template v-slot:prepend>
          <v-avatar>
            <v-icon color="#33ffc9">mdi-translate-variant</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-chevron-right"
            variant="text"
            @click.stop="changeLang = !changeLang"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-subheader>Privacy</v-list-subheader>

      <v-list-item
        :title="$t('config.viewMnemonic.title')"
        :subtitle="$t('config.viewMnemonic.subtitle')"
      >
      <template v-slot:prepend>
          <v-avatar>
            <v-icon color="#33ffc9">mdi-shield-lock-open-outline</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-chevron-right"
            variant="text"
            @click=""
          ></v-btn>
        </template>
      </v-list-item>
      <v-list-item
        :title="$t('config.masterPassChange.title')"
        :subtitle="$t('config.masterPassChange.subtitle')"
      >
      <template v-slot:prepend>
          <v-avatar>
            <v-icon color="#33ffc9">mdi-pencil-lock-outline</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-chevron-right"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>
 
      <v-divider></v-divider>

      <v-list-subheader>Other</v-list-subheader>

      <v-list-item
        title="Import wallet"
        subtitle="Only for dev mode"
      >
      <template v-slot:prepend>
          <v-avatar>
            <v-icon color="#c409bb">mdi-swap-vertical-bold</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-chevron-right"
            variant="text"
            @click.stop="openImportDebugMnenomic()"
          ></v-btn>
        </template>
      </v-list-item> 
   
    </v-list>
 
<!-- 
   <div class="text-center">
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
  </div>  -->
  <div class="text-center">
    <v-bottom-sheet v-model="changeLang" inset>
      <v-card
        class="text-center"
        height="200"
      >
        <v-card-text>
          <v-btn
            variant="text"
            @click="changeLang = !changeLang"
          >
            close
          </v-btn>

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
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>     
  
  
  <div class="text-center">
    <v-bottom-sheet v-model="importDebugMnenomic" inset>
      <v-card
        class="text-center"
        height="200"
      >
        <v-card-text>
          <v-btn
            variant="text"
            @click="importDebugMnenomic = !importDebugMnenomic"
          >
            close
          </v-btn>

          <br />
          
          <v-alert
            v-model="alertImported"
            class="ma-4"
            variant="outlined"
            type="success"
            border="top"
            closable
            close-label="Close Alert"
          >
            Wallets imported!
          </v-alert>
          <v-text-field
            v-model="password"
            variant="outlined"
            color="#00b786"
            label="Password"
            style="min-height: 96px"
            type="password"
            class="mt-6"
          ></v-text-field>
          <v-btn 
            v-if="enableButton"
            class="flex-grow-1"
            color="#00b786"  
            block 
            @click="importDebugMnenomicNow()"
          >
            Import
          </v-btn> 
                              
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>    


  <v-dialog
      v-model="dialogViewPassPhrase"
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
            @click="dialogViewPassPhrase = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>View mnenomic</v-toolbar-title>
          <v-spacer></v-spacer>
 
        </v-toolbar>
        <v-list
          lines="two"
          subheader
        >
          <v-list-item title="Infomations" subtitle="Set the content filtering level to restrict apps that can be downloaded"></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <!-- <v-alert
            v-model="alertError"
            class="ma-4"
            variant="outlined"
            type="warning"
            border="top"
            closable
            close-label="Close Alert"
          >
            Bad password
          </v-alert> -->
 
      
          <v-list-item>
            <v-text-field
                v-model="password"
                variant="outlined"
                color="#00b786"
                label="Password"
                style="min-height: 96px"
                type="password"
                class="mt-6"
              ></v-text-field>
              <v-btn 
                v-if="enableButton"
                class="flex-grow-1"
                color="#00b786"  
                block 
                @click="viewMnenom"
              >
                View mnenomic
              </v-btn> 
          </v-list-item>
          <v-list-item>
 
          </v-list-item>
          <v-list-item>
 
          </v-list-item>
          <v-list-item>
 
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>   
</template>

<script>
import { mapState } from 'vuex'
import { Preferences } from '@capacitor/preferences';
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing" 
import Accounts from '@/components/Accounts.vue'
import md5 from 'md5' 
import { removeAccountId, checkMasterPassword, addAccount } from '@/libs/storage.js';  
import bitcannaWallets from '../bitcanna.wallet'

  export default {
    components: { Accounts },
    data: (t) => ({
      drawer: false,
      deleteWallet: false,
      deletedWallet: false,
      changeLang: false,
      checkbox1: true,
      password: '',
      enableButton: false,
      dialogViewPassPhrase: false,
      importDebugMnenomic: false,
      alertImported: false,
    }),
    watch: {
      password: function (val) { 
        if(val !== '') {
          this.enableButton = true
        } else {
          this.enableButton = false
        }
      }
    },
    computed: {
      ...mapState(['allWallets', 'accountSelected'])
    },
    mounted() {
      console.log(this.$i18n.t('config.currency.title'))

    },
    methods : {
      openImportDebugMnenomic() {
        this.alertImported = false
        this.importDebugMnenomic = true
        console.log(bitcannaWallets)
      },
      async importDebugMnenomicNow() {

        const hash = md5(this.password); 
        const { value } = await Preferences.get({ key: 'masterPass' });

        console.log(hash, value)
        if(hash !== value) {
          this.alertError = true
          return
        }
        for (let i = 0; i < bitcannaWallets.length; i++) {
          const element = bitcannaWallets[i];
          console.log(element)
          const wallet = await DirectSecp256k1HdWallet.fromMnemonic( element.mnenomic, {
            prefix: 'bcna'
          })
          var finalWallet = await wallet.serialize( this.password )
          var finalAddress = await wallet.getAccounts()

          await addAccount( element.name, finalAddress[0].address, finalWallet )
        }
        this.alertImported = true
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
          await this.$store.dispatch('getWallets')
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