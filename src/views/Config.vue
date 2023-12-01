<template>
    <v-list bg-color="black" lines="two">
      <v-list-subheader>General</v-list-subheader>
      <!-- <Accounts />  -->
      <v-list-item
        :title="$t('config.currency.title')"
        :subtitle="$t('config.currency.subtitle')"
        @click.stop="changeCurrency = !changeCurrency"
      >
      <template v-slot:prepend>
          <v-avatar>
            <v-icon color="#33ffc9">mdi-currency-usd</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn 
            color="grey-lighten-1"
            icon="mdi-chevron-right"
            variant="text"
            @click.stop="changeCurrency = !changeCurrency"
          ></v-btn>
        </template>
      </v-list-item>
      <v-list-item
        :title="$t('config.language.title')"
        :subtitle="$t('config.language.subtitle')"
        @click.stop="changeLang = !changeLang"
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

<!--       <v-list-item
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
            @click="dialogViewPassPhrase = true"
          ></v-btn>
        </template>
      </v-list-item> -->
      <v-list-item
        :title="$t('config.masterPassChange.title')"
        :subtitle="$t('config.masterPassChange.subtitle')"
        @click="openChangeMasterPass()"
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
            @click="openChangeMasterPass()"
          ></v-btn>
        </template>
      </v-list-item>
      <v-list-item
        title="Auto logout"
        :subtitle="'Define time for lockout ('+timeout+')'"
        @click="openSetTimeOut()"
      >
      <template v-slot:prepend>
          <v-avatar>
            <v-icon color="#33ffc9">mdi-clock-time-eight-outline</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-chevron-right"
            variant="text"
            @click="openSetTimeOut()"
          ></v-btn>
        </template>
      </v-list-item> 
      <v-divider></v-divider>

      <v-list-subheader>Other</v-list-subheader>

      <v-list-item
        title="App info"
        subtitle="View all app informations"
        @click.stop="openAppInfo()"
      >
      <template v-slot:prepend>
          <v-avatar>
            <v-icon color="#33ffc9">mdi-information-outline</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-chevron-right"
            variant="text"
            @click.stop="openAppInfo()"
          ></v-btn>
        </template>
      </v-list-item> 

      <v-list-item
        title="Import wallet"
        subtitle="Only for dev mode"
        @click.stop="openImportDebugMnenomic()"
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
    <v-bottom-sheet v-model="changeCurrency" inset>
      <v-card
        class="text-center"
        height="200"
      >
        <v-card-text>
          <v-btn
            variant="text"
            @click="changeCurrency = !changeCurrency"
          >
            close
          </v-btn>

          <br />
          <br />

          <v-select
            v-model="selectCurrency"
            label="Currency"
            :items="['USD', 'EUR']"
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
      v-model="dialogChangeMasterPass"
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
            @click="dialogChangeMasterPass = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Change masterpass</v-toolbar-title>
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
            <div v-if="!masterPasswordFinish">
            <div v-if="!masterPasswordChanging">
              <v-text-field
                v-if="!enableButton"
                v-model="password"
                variant="outlined"
                color="#00b786"
                label="Your Password"
                style="min-height: 96px"
                type="password"
                class="mt-6"
              ></v-text-field>
              <v-text-field
                v-if="enableButton"
                v-model="newPassword1"
                variant="outlined"
                color="#00b786"
                label="New password"
                style="min-height: 96px"
                type="password"
                class="mt-6"
              ></v-text-field>
              <v-text-field
                v-if="enableButton"
                v-model="newPassword2"
                variant="outlined"
                color="#00b786"
                label="Repeat new password"
                style="min-height: 96px"
                type="password"
                class="mt-6"
              ></v-text-field>
              <v-btn 
                v-if="enableButton"
                class="flex-grow-1"
                color="#00b786"  
                block 
                @click="changeMassterPass()"
              >
                Change masterPass
              </v-btn> 
              </div>
            </div>
          </v-list-item>
          <v-list-item>
            <v-row
              v-if="masterPasswordChanging"
              class="fill-height"
              align-content="center"
              justify="center"
            >
              <v-col
                class="text-subtitle-1 text-center"
                cols="12"
              >
                Masterpassword change in progress
              </v-col>
              <v-col cols="6">
                <v-progress-linear
                  color="#00b786"
                  indeterminate
                  rounded
                  height="9"
                ></v-progress-linear>
              </v-col>
            </v-row>
            <v-row
                v-if="masterPasswordFinish"
                class="fill-height"
                align-content="center"
                justify="center"
              >
                <v-col
                  class="text-subtitle-1 text-center"
                  cols="12"
                >
                  Masterpassword change is done!
                  <br /><br />
                  <v-btn
                    color="#00b786"
                    @click="dialogChangeMasterPass = false"
                  > 
                    Close
                  </v-btn>
                </v-col>
              </v-row>
          </v-list-item>
          <v-list-item>
 
          </v-list-item>
          <v-list-item>
 
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>   
    <v-dialog
      v-model="dialogSetTimeOut"
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
            @click="dialogSetTimeOut = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Set timeout</v-toolbar-title>
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
            <div> 
              <v-select
                v-model="timeout"
                label="Select timeout"
                variant="outlined"
                :items="['1 mn', '5 mn', '1 hour', '6 hours', '1 day', 'Never']"
                class="mt-4"
              ></v-select>
              <v-btn  
                class="flex-grow-1"
                color="#00b786"  
                block 
                @click="updateTimeout()"
              >
                Update timeout
              </v-btn> 
 
            </div>
          </v-list-item>
          <v-list-item>
            <v-row
              v-if="masterPasswordChanging"
              class="fill-height"
              align-content="center"
              justify="center"
            >
              <v-col
                class="text-subtitle-1 text-center"
                cols="12"
              >
                Masterpassword change in progress
              </v-col>
              <v-col cols="6">
                <v-progress-linear
                  color="#00b786"
                  indeterminate
                  rounded
                  height="9"
                ></v-progress-linear>
              </v-col>
            </v-row>
            <v-row
                v-if="masterPasswordFinish"
                class="fill-height"
                align-content="center"
                justify="center"
              >
                <v-col
                  class="text-subtitle-1 text-center"
                  cols="12"
                >
                  Masterpassword change is done!
                  <br /><br />
                  <v-btn
                    color="#00b786"
                    @click="dialogChangeMasterPass = false"
                  > 
                    Close
                  </v-btn>
                </v-col>
              </v-row>
          </v-list-item>
          <v-list-item>
 
          </v-list-item>
          <v-list-item>
 
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>     
    <v-dialog
      v-model="dialogAppInfo"
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
            @click="dialogAppInfo = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>App info</v-toolbar-title>
          <v-spacer></v-spacer>
 
        </v-toolbar>
        <v-list
          lines="two"
          subheader
        >
          <v-list-item title="Infomations" subtitle="Set the content filtering level to restrict apps that can be downloaded"></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <h3 class="ml-4 mt-4">App Version</h3>
        <v-table> 
          <tbody>
            <tr>
              <td>Version</td>
              <td>{{ appVersion }}</td>
            </tr>
          </tbody>
        </v-table> 
        <v-divider></v-divider>
        <h3 class="ml-4 mt-4">Device info</h3>
        <v-table> 
          <tbody>
            <tr
              v-for="(value, name, index) in deviceInfo"
              :key="name"
            >
              <td>{{ name }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-dialog>     
</template>

<script>
import { mapState } from 'vuex'
import { Preferences } from '@capacitor/preferences';
import { Device } from '@capacitor/device';

import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing" 
import Accounts from '@/components/Accounts.vue'
import md5 from 'md5' 
import { removeAccountId, checkMasterPassword, addAccount, editMasterPassword, setSessionTimeOut } from '@/libs/storage.js';  
import bitcannaWallets from '../bitcanna.wallet'
import pjson from '@/../package.json' 


  export default {
    components: { Accounts },
    data: (t) => ({
      drawer: false,
      deleteWallet: false,
      changeLang: false,
      changeCurrency: false,
      selectCurrency: 'USD',
      checkbox1: true,
      password: '',
      enableButton: false,
      dialogChangeMasterPass: false,
      dialogSetTimeOut: false,
      importDebugMnenomic: false,
      alertImported: false,
      newPassword1: '',
      newPassword2: '',
      masterPasswordChanging: false,
      masterPasswordFinish: false,
      timeout: '',
      dialogAppInfo: false,
      appVersion: '',
      deviceInfo: {}
    }),
    watch: {
      password: async function (val) { 
        const hash = md5(this.password); 
        const { value } = await Preferences.get({ key: 'masterPass' });

        console.log(hash, value)
        if(hash === value) {
          this.enableButton = true
        }
 
      },
      selectCurrency: async function (val) { 
        console.log(val)
        await Preferences.set({ key: 'currency', value: val });
        this.$store.dispatch('changeCurrency', val)
        await this.$store.dispatch('getPriceNow')

      },
    },
    computed: {
      ...mapState(['allWallets', 'accountSelected', 'sessionMax'])
    },
    async mounted() { 
      const { value } = await Preferences.get({ key: 'currency'}) 
      this.selectCurrency = value
      this.displayTimeout()

      console.log(pjson.version)
      this.appVersion = pjson.version

      const info = await Device.getInfo();
      this.deviceInfo = info;

console.log(info);
    },
    methods : {
      async changeMassterPass() {
        if(this.newPassword1 === this.newPassword2) {
          this.masterPasswordChanging = true
          await editMasterPassword(this.password, this.newPassword1) 
          await this.$store.dispatch('getWallets')
          this.masterPasswordChanging = false
          this.masterPasswordFinish = true
        }
      },
      openAppInfo() {
        this.dialogAppInfo = true 
      },
      openSetTimeOut() {
        this.dialogSetTimeOut = true
        this.displayTimeout()
      },
      openImportDebugMnenomic() {
        this.alertImported = false
        this.importDebugMnenomic = true 
      },
      openChangeMasterPass() {
        this.masterPass = ''
        this.masterPass2 = ''
        this.enableButton = false
        this.password = ''
        this.masterPasswordFinish = false
        this.dialogChangeMasterPass = true
      },
      async updateTimeout() {
        let finalTimeout = 0
        switch(this.timeout) {
          case '1 mn':
            finalTimeout = 60
            break;
          case '5 mn':
            finalTimeout = 300
            break;
          case '1 hour':
            finalTimeout = 3600
            break;
          case '6 hours':
            finalTimeout = 21600
            break;
          case '1 day':
            finalTimeout = 86400
            break; 
          case 'Never':
            finalTimeout = 0
        }
        await this.$store.dispatch('updateDefaultTimeout', finalTimeout)
        await setSessionTimeOut(finalTimeout);
        this.dialogSetTimeOut = false
      },
      displayTimeout() {
        switch(this.sessionMax) {
          case 60:
            this.timeout = '1 mn'
            break;
          case 300:
            this.timeout = '5 mn'
            break;
          case 3600:
            this.timeout = '1 hour'
            break;
          case 21600:
            this.timeout = '6 hours'
            break;
          case 86400:
            this.timeout = '1 day'
            break; 
          case 0:
            this.timeout = 'Never'
        }
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
      }
    }
  }
</script>