<template>
    <v-list bg-color="black" lines="two">
      <v-list-subheader>General</v-list-subheader>
      <Accounts /> 
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
        :title="$t('config.deleteWallet.title')"
        :subtitle="$t('config.deleteWallet.subtitle')"
      >
      <template v-slot:prepend>
          <v-avatar>
            <v-icon color="red">mdi-delete-forever-outline</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-chevron-right"
            variant="text"
            @click.stop="openDeleteWallet()"
          ></v-btn>
        </template>
      </v-list-item>
   
    </v-list>
 

   <div class="text-center">
    <v-bottom-sheet v-model="deleteWallet" inset>
      <v-card
        class="text-center"
        height="300"
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
          >
            Wallet deleted
          </v-alert>

          <!-- <v-checkbox
              v-if="!deletedWallet" 
              v-model="checkbox1"
              label="You agree to delete your wallet from the app?"
            ></v-checkbox> -->
            <v-text-field
                v-model="password"
                variant="outlined"
                color="#00b786" 
                label="Password"
                style="min-height: 96px"
                class="mt-6"
                type="password"
            ></v-text-field>
            <v-btn 
              v-if="!deletedWallet" 
              color="red"  
              block 
              @click="revemoAccount"
            >
              Delete this wallet
            </v-btn>

                   
 
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div> 
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
</template>

<script>
import { mapState } from 'vuex'
import Accounts from '@/components/Accounts.vue'
import md5 from 'md5' 
import { removeAccountId, checkMasterPassword } from '@/libs/storage.js';  

  export default {
    components: { Accounts },
    data: (t) => ({
      drawer: false,
      deleteWallet: false,
      deletedWallet: false,
      changeLang: false,
      checkbox1: true,
      password: '',
    }),
    computed: {
      ...mapState(['allWallets', 'accountSelected'])
    },
    mounted() {
      console.log(this.$i18n.t('config.currency.title'))

    },
    methods : {
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
        } else {
          console.log('Not Deleted :/')
          this.alertError = true
        }          
        /* await removeAccountId(this.accountSelected)
        await this.$store.dispatch('getWallets')
        await this.$store.dispatch('changeWallet', 0)
        this.deletedWallet = true
        if(this.allWallets.length === 0) {
          // this.$store.commit('setIsLogged', false)
          this.$router.push('/accounts') 
        }  */       
      }
    }
  }
</script>