<template>

  <v-btn block size="x-large" color="#0FB786" @click="openDialogSendToken">Send</v-btn> 
  <v-dialog
      v-model="dialogSendToken"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card v-if="txSend === false">
        <v-form ref="form"> 
        <v-toolbar
          dark
        >
          <v-btn
            icon
            dark
            @click="dialogSendToken = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Send token</v-toolbar-title>
          <v-spacer></v-spacer>
 
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
          <v-chip @click="setAddress('bcna148ml2tghqkfvzj8q27dlxw6ghe3vlmprhru76x')" class="mr-2">
            Wallet1
          </v-chip>
          <v-chip @click="setAddress('bcna16kga5es86ca0mkjfzt067p5u8qnaxglwrz4jcj')" class="mr-2">
            Wallet2
          </v-chip>
          <v-chip @click="setAddress('bcna1l6c9uc9f9ulx8925790t9g7zzhavfr2e6nh68u')" class="mr-2">
            Wallet3
          </v-chip>
          
            <v-text-field
                v-model="recipient"
                :rules="addressRules"
                variant="outlined"
                color="#00b786" 
                label="Recipient" 
                class="mt-4"
                append-inner-icon="mdi-book-open-page-variant-outline"
                @click:append-inner="getAddressBook()"
            ></v-text-field>
          </v-list-item> 
          <v-list-item>
            <v-text-field
                v-model="amount"
                :rules="amountRules"
                variant="outlined"
                color="#00b786" 
                label="Amount" 
                class="mt-2"
                suffix="Max"
                append-inner-icon="mdi-plus-box-outline"
                @click:append-inner="getMax()"
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field
                v-model="memo"
                variant="outlined"
                color="#00b786" 
                label="Memo" 
                class="mt-2"
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field
                v-model="password"
                variant="outlined"
                color="#00b786" 
                label="Password" 
                type="password"
                class="mt-2"
              ></v-text-field>
              
          </v-list-item>
          <v-list-item>
            <v-btn 
              block 
              color="#0FB786"
              :disabled="loading"
              :loading="loading"
              @click="sendToken()
            ">Send</v-btn>
          </v-list-item>
        </v-list>   
      </v-form>     
      </v-card>


      <v-card v-else class="txReturn text-center grey d-flex flex-column align-center justify-top mt-10"> 
          <v-icon
          size="100"
          color="#0FB786"
          icon="mdi-check-outline"
          class="returnIcon"
        ></v-icon> 
        <v-card elevation="0"  class="mt-6" :height="200" :width="350" color="transparent"> <!-- color="transparent" -->
          <v-card-title class="text-center">
            <span class="font-weight-black text-subtitle-1">
              Transaction approved
            </span>
          </v-card-title>
          <v-card-text class="text-center">
            <span class="font-weight-black text-subtitle-1">
              Your transaction has been successfully sent
            </span>
            <v-btn
              class="mt-4"
              color="#0FB786"
              @click="dialogSendToken = false"
              block
            >Back</v-btn>
          </v-card-text>
        </v-card> 
      </v-card>
 
    </v-dialog>
    <v-dialog
      v-model="dialogAddressBook"
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
            @click="dialogAddressBook = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Select contact</v-toolbar-title>
          <v-spacer></v-spacer>
 
        </v-toolbar>
        <v-card
          v-for="(item, i) in allContacts"
          class="ma-4" 
          :title="item.name"
          :subtitle="item.address"
          @click="selectContact(i)"
        >
 
        </v-card>
    </v-card>
    </v-dialog>
</template>
<script>
import { mapState } from 'vuex'
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsDeliverTxSuccess, SigningStargateClient, GasPrice } from "@cosmjs/stargate";
import { Preferences } from '@capacitor/preferences';
import { getAllContact } from '@/libs/storage.js';
import bitcannaConfig from '../bitcanna.config' 
import md5 from 'md5' 
import bech32 from "bech32";

function bech32Validation(address) {
  try {
    bech32.decode(address);
    return true;
  } catch (error) {
    return false;
  }
}

function countPlaces(num) {
  const sep = String(23.32).match(/\D/)[0];
  const b = String(num).split(sep);
  return b[1] ? b[1].length : 0;
}

export default {
  name: 'ActionsModal', 
  data: () => ({
    bitcannaConfig: bitcannaConfig,
    dialogSendToken: false,
    dialogAddressBook: false,
    alertError: false,
    actionSend: false,
    actionReceive: false,
    recipient: '',
    amount: '',
    memo: '',
    password: '',
    txSend: false,
    accountNow: '',
    loading: false,
    allContacts: [],
    amountRules: [
      (v) => !!v || "Amount is required",
      (v) => !isNaN(v) || "Amount must be number",
      (v) => countPlaces(v) < 7 || "Bad decimal",
    ],
    addressRules: [
      (v) => !!v || "Address is required",
      (v) =>
        v.startsWith('bcna') ||
        'Address must start with bcna',
      (v) => bech32Validation(v) || "Bad address (not bech32)",
    ],
  }),
  computed: {
    ...mapState(['allWallets', 'spendableBalances', 'accountSelected', 'network'])
  },
  async mounted() { 
    let getAllContacts = await getAllContact()
    this.allContacts = JSON.parse(getAllContacts)
  },
  methods: {
    selectContact(index) {
      this.recipient = this.allContacts[index].address
      this.dialogAddressBook = false
    },
    getAddressBook() {
      this.dialogAddressBook = true;
    },
    getMax() {
      this.amount = this.spendableBalances;
    },
    setAddress(address) {
      this.recipient = address;
    },
    openDialogSendToken() {
      this.dialogSendToken = true;
      this.txSend = false;
      this.recipient = '';
      this.amount = '';
      this.memo = '';
      this.password = '';
      this.loading = false
    },
    closeModal() {
      this.actionSend = false;
      this.actionReceive = false;
    },
    async sendToken() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) {
        return
      }

      const hash = md5(this.password); 
      const { value } = await Preferences.get({ key: 'masterPass' });

      if(hash !== value) {
        this.alertError = true
        return
      }

      this.loading = true

      const deserialized = await DirectSecp256k1HdWallet.deserialize(this.allWallets[this.accountSelected].data, this.password); 
      
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(deserialized.secret.data, {
        prefix: 'bcna'
      });
      const [accounts] = await wallet.getAccounts();
 
      const client = await SigningStargateClient.connectWithSigner(
        this.bitcannaConfig[this.network].rpcURL, 
        wallet,
        {
          gasPrice: GasPrice.fromString(
            this.bitcannaConfig[this.network].gasPrice +
            this.bitcannaConfig[this.network].coinLookup.chainDenom
          ),
        }
      );     

      const convertAmount = Math.round(this.amount * 1000000);
      const amount = {
        denom: this.bitcannaConfig[this.network].coinLookup.chainDenom,
        amount: convertAmount.toString(),
      };

      try {
        const result = await client.sendTokens(
          accounts.address,
          this.recipient,
          [amount],
          "auto",
          this.memo
        ); 
        assertIsDeliverTxSuccess(result);
        console.log(result); 
        this.txSend = true

        this.accountNow = this.allWallets[this.accountSelected]
        await this.$store.dispatch('getBankModule', this.accountNow.address)
        await this.$store.dispatch('getDistribModule', this.accountNow.address)
        await this.$store.dispatch('getStakingModule', this.accountNow.address)
        await this.$store.dispatch('getWalletAmount')

      } catch (error) {
        console.error(error); 
      }
    },
  }
}

</script>

<style>
  .txReturn {
    background: linear-gradient(180deg, #000000, 80%, #0FB786);
  } 
  .returnIcon {
    margin-top: 200px;
  } 
</style>