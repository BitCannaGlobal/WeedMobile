<template>
    <v-list bg-color="black" lines="two">
      <v-list-subheader>General</v-list-subheader>
      <Accounts />
      <v-list-item
        v-for="folder in general"
        :key="folder.title"
        :title="folder.title"
        :subtitle="folder.subtitle"
      >
      <template v-slot:prepend>
          <v-avatar>
            <v-icon :color="folder.color">{{ folder.icon }}</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            v-if="folder.id == 'language'"
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
        v-for="file in privacy"
        :key="file.title"
        :title="file.title"
        :subtitle="file.subtitle"
      >
        <template v-slot:prepend>
          <v-avatar>
            <v-icon :color="file.color">{{ file.icon }}</v-icon>
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
        v-for="file in other"
        :key="file.title"
        :title="file.title"
        :subtitle="file.subtitle"
      >
        <template v-slot:prepend>
          <v-avatar>
            <v-icon :color="file.color">{{ file.icon }}</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-chevron-right"
            variant="text"
            @click.stop="deleteWallet = !deleteWallet"
          ></v-btn>
        </template>
      </v-list-item>      
    </v-list>
 

    <v-navigation-drawer
        v-model="drawer"
        location="bottom"
        temporary
      >
      <v-row>
        <v-col  >
          <v-sheet border="md" >test</v-sheet>
        </v-col>
        <v-col >
          <v-sheet border="md"  >test</v-sheet>
        </v-col>
        <v-col  >
          <v-sheet border="md" >test</v-sheet>
        </v-col>
      </v-row>
      </v-navigation-drawer>

<!--       <v-navigation-drawer
        v-model="deleteWallet"
        location="bottom"
        temporary 
      >
      
        <span >Are you sure to delete this wallet?</span>
        <br />
        <v-btn
        class="flex-grow-1"
          color="red"  
          block 
        >
          Delete this wallet
        </v-btn>
      </v-navigation-drawer>
       -->

   <div class="text-center">
    <v-bottom-sheet v-model="deleteWallet" inset>
      <v-card
        class="text-center"
        height="200"
      >
        <v-card-text>
          <v-btn
            variant="text"
            @click="deleteWallet = !deleteWallet"
          >
            close
          </v-btn>

          <br>
          <br>

          <v-alert
            v-if="deletedWallet"
            variant="outlined" 
            elevation="2"
            type="success"
          >
            Wallet deleted
          </v-alert>


        <v-btn
          v-if="!deletedWallet"
          class="flex-grow-1"
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
import { removeAccountId } from '@/libs/storage.js'; 

  export default {
    components: { Accounts },
    data: (t) => ({
      drawer: false,
      deleteWallet: false,
      deletedWallet: false,
      changeLang: false,
      items: [
        {
          title: 'Foo',
          value: 'foo',
        },
        {
          title: 'Bar',
          value: 'bar',
        },
        {
          title: 'Fizz',
          value: 'fizz',
        },
        {
          title: 'Buzz',
          value: 'buzz',
        },
      ],
      general: [
        {      
          id: 'currency',
          color: '#33ffc9',    
          icon: 'mdi-currency-usd',
          subtitle: t.$i18n.t('config.currency.subtitle'),
          title: t.$i18n.t('config.currency.title'),
        },
        {
          id: 'language',
          color: '#33ffc9',
          icon: 'mdi-translate-variant',
          subtitle: t.$i18n.t('config.language.subtitle'),
          title: t.$i18n.t('config.language.title'),
        }
      ],
      privacy: [
        {
          color: '#33ffc9',
          icon: 'mdi-shield-lock-open-outline',
          subtitle: t.$i18n.t('config.viewMnemonic.subtitle'),
          title: t.$i18n.t('config.viewMnemonic.title'),
        },
        {
          color: '#33ffc9',
          icon: 'mdi-pencil-lock-outline',
          subtitle: t.$i18n.t('config.masterPassChange.subtitle'),
          title: t.$i18n.t('config.masterPassChange.title'),
        },
      ],
      other: [
        {
          color: 'red',
          icon: 'mdi-delete-forever-outline',
          subtitle: t.$i18n.t('config.deleteWallet.subtitle'),
          title: t.$i18n.t('config.deleteWallet.title'),
        }
      ],
    }),
    computed: {
      ...mapState(['allWallets', 'accountSelected'])
    },
    mounted() {
      console.log(this.$i18n.t('config.currency.title'))
    },
    methods : {
      forceChangeLang() {
        this.$forceUpdate();
      },
      async revemoAccount() {
        removeAccountId(this.accountSelected)
        await this.$store.dispatch('getWallets')
        this.deletedWallet = true
      }
    }
  }
</script>