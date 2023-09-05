<template>

  <v-btn block size="x-large" color="#0FB786" @click="dialogSendToken = true">Send</v-btn> 
  <v-dialog
      v-model="dialogSendToken"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card v-if="txSend === false">
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
                variant="outlined"
                color="#00b786" 
                label="Recipient" 
                class="mt-4"
            ></v-text-field>
          </v-list-item> 
          <v-list-item>
            <v-text-field
                v-model="amount"
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
            <v-btn block color="#0FB786" @click="sendToken()">Send</v-btn>
          </v-list-item>
        </v-list>        
      </v-card>
      <txApproved v-else />
    </v-dialog>
</template>
<script>
import { mapState } from 'vuex'
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsDeliverTxSuccess, SigningStargateClient, GasPrice } from "@cosmjs/stargate";
import bitcannaConfig from '../bitcanna.config'
import txApproved from '@/components/TxApproved.vue'

export default {
  name: 'ActionsModal',
  components: { txApproved },
  data: () => ({
    bitcannaConfig: bitcannaConfig,
    dialogSendToken: false,
    alertError: false,
    actionSend: false,
    actionReceive: false,
    recipient: '',
    amount: '',
    memo: '',
    password: '',
    txSend: true
  }),
  computed: {
    ...mapState(['allWallets', 'spendableBalances', 'accountSelected', 'network'])
  },
  methods: {
    getMax() {
      this.amount = this.spendableBalances;
    },
    setAddress(address) {
      this.recipient = address;
    },
    closeModal() {
      this.actionSend = false;
      this.actionReceive = false;
    },
    async sendToken() {

      

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

          console.log(accounts)

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
          } catch (error) {
            console.error(error); 
          }
    },
  }
}

</script>