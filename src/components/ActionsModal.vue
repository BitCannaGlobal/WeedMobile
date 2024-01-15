<template> 
  <v-btn v-if="type === 'sendTx'" block size="x-large" color="#0FB786" @click="openDialogSendToken">{{ $t("dashboard.btnSend") }}</v-btn> 

  <v-btn 
    v-if="type === 'claim'"
    height="40"
    block
    flat
    class="mt-2  white--text"
    color="#333333" 
    @click="openDialogClaim"
  >
  {{ $t("dashboard.btnClaim") }}  
  </v-btn>

  <v-btn 
    v-if="type === 'stake'"
    height="40"
    block
    flat
    class="mt-2  white--text"
    color="#0FB786"
    disabled="true" 
    @click="openDialogStake"
  >
  {{ $t("dashboard.btnStake") }} (Soon)
  </v-btn>
  <v-dialog
      v-model="dialogSendToken"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
      class="bitcannaFont"
    >
      <v-card v-if="txSend === false">
        <v-form v-if="step1" ref="form" v-model="form" > 
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
          <v-toolbar-title>{{ $t("dashboard.mdlSendTx.title") }}</v-toolbar-title>
          <v-spacer></v-spacer>
 
        </v-toolbar>
        <v-list
          lines="two"
          subheader
        >
          <v-list-item title="Infomations" :subtitle="this.$t('dashboard.mdlSendTx.subTitle')"></v-list-item>
        </v-list>
        
        <v-divider></v-divider>
        <v-list>

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
                :label="this.$t('dashboard.mdlSendTx.inpRecipient')" 
                class="mt-4"
                append-icon="mdi-book-open-page-variant-outline"
                @click:append="getAddressBook()"
            ></v-text-field>
          </v-list-item> 
          <v-list-item>
            <v-text-field
                v-model="amount"
                :rules="amountRules"
                variant="outlined"
                color="#00b786" 
                :label="this.$t('dashboard.mdlSendTx.inpAmount')" 
                type="number"
                inputmode="numeric"
                pattern="[0-9]*"
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
                counter="100"
                :rules="memoRules"
                color="#00b786" 
                :label="this.$t('dashboard.mdlSendTx.inpMemo')"
                class="mt-2"
            ></v-text-field>
          </v-list-item> 
          <v-list-item>
            <v-btn 
              block 
              color="#0FB786"
              :disabled="!form"
              :loading="loading"
              @click="checkTx()
            ">{{ $t('dashboard.mdlSendTx.btnSend') }}</v-btn>
          </v-list-item>
        </v-list>   
      </v-form>  
      <v-form v-if="step2" ref="form"> 
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
          <v-toolbar-title>{{ $t("dashboard.mdlSendTx.title") }}</v-toolbar-title>
          <v-spacer></v-spacer>
 
        </v-toolbar>
        <v-list
          lines="two"
          subheader
        >
          <v-list-item title="Infomations" :subtitle="this.$t('dashboard.mdlSendTx.subTitle')"></v-list-item>
        </v-list>
        
        <v-divider></v-divider>
        <v-list>
      <v-list-item>
      <v-table >
    
    <tbody> 
      <tr>
        <td>{{ $t('dashboard.mdlSendTx.inpRecipient') }}</td> 
        <td>{{ this.truncateString(recipient, 15) }}</td> 
      </tr>
      <tr>
        <td>{{ $t('dashboard.mdlSendTx.inpAmount') }}</td> 
        <td>{{ amount }} BCNA</td>
      </tr>
      <tr>
        <td>{{ $t('dashboard.mdlSendTx.inpMemo') }}</td> 
        <td>{{ memo }}</td>
      </tr>
    </tbody>
    </v-table>
  </v-list-item>
  <v-list-item>
            <v-alert
            v-model="alertError"
            class="mt-4"
            variant="outlined"
            type="warning"
            border="top"
            closable
            close-label="Close Alert"
          >
            {{ $t('errors.badPassword') }}
          </v-alert>
            <v-text-field
                v-model="password"
                variant="outlined"
                color="#00b786" 
                :label="this.$t('dashboard.mdlSendTx.inpPassword')" 
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
            ">{{ $t('dashboard.mdlSendTx.btnSend') }}</v-btn>
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
              {{ $t('approved.title') }}
            </span>
          </v-card-title>
          <v-card-text class="text-center">
            <span class="font-weight-black text-subtitle-1">
              {{ $t('approved.subtitle') }}
            </span>
            <v-btn
              class="mt-4"
              color="#0FB786"
              @click="dialogSendToken = false"
              block
            >{{ $t('approved.back') }}</v-btn>
          </v-card-text>
        </v-card> 
      </v-card>
 
    </v-dialog>
    <v-dialog
      v-model="dialogAddressBook"
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
          :title="item.name + ' (' + item.memo + ')'"
          :subtitle="item.address"
          @click="selectContact(i)"
        >
 
        </v-card>
    </v-card>
    </v-dialog>
    
    <v-dialog
      v-model="dialogClaim"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
      class="bitcannaFont"
    >
    <v-card v-if="txSend === false">
      <v-toolbar
          dark
        >
          <v-btn
            icon
            dark
            @click="dialogClaim = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Claim rewards</v-toolbar-title>
          <v-spacer></v-spacer>
 
        </v-toolbar>
        <v-card 
            class="ma-2" 
          > 
            <v-card-text>
              <v-row no-gutters>
                <v-col
                  cols="2" 
                >
                  <v-sheet>          
                    <v-img   
                    inline
                      max-height="50"
                      max-width="50"
                      min-height="50"
                      min-width="50"
                      src="@/assets/icon-reward.png"
                    ></v-img>                   
                  </v-sheet>
                </v-col>
                <v-col
                  class="ml-4 "
                  cols="5" 
                >
                  <v-sheet>       
                    <span class=" text-subtitle-1">
                      Your rewards
                    </span>
                    <br />
                    <span class="font-weight-black text-subtitle-1">
                      {{ this.totalRewards }} BCNA
                    </span>
                    
                  </v-sheet>
                </v-col> 
              </v-row>
            </v-card-text>
          </v-card>
          <v-list-item>
            <v-text-field
                v-model="password"
                variant="outlined"
                color="#00b786" 
                label="Password" 
                type="password"
                class="mt-2"
              ></v-text-field>
              <v-btn 
              block 
              color="#0FB786"
              :disabled="loading"
              :loading="loading"
              @click="claimReward()
            ">Claim</v-btn>              
          </v-list-item>
          
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
              Claim approved
            </span>
          </v-card-title>
          <v-card-text class="text-center">
            <span class="font-weight-black text-subtitle-1">
              Your rewards has been claim and credited
            </span>
            <v-btn
              class="mt-4"
              color="#0FB786"
              @click="dialogClaim = false"
              block
            >Back</v-btn>
          </v-card-text>
        </v-card> 
      </v-card>
    </v-dialog>   
    
    
    <v-dialog
      v-model="dialogStake"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
      class="bitcannaFont"
    >
    <v-card v-if="txSend === false">
      <v-toolbar
          dark
        >
          <v-btn
            icon
            dark
            @click="dialogStake = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Staking</v-toolbar-title>
          <v-spacer></v-spacer>
 
        </v-toolbar>
        <v-card 
            class="ma-2" 
          > 
            <v-card-text>
              <v-tabs
      v-model="tab"
      color="#0FB786"
      align-tabs="center"
    >
      <v-tab :value="1">Delegate</v-tab>
      <v-tab :value="2">Undel</v-tab>
      <v-tab :value="3">Redel</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        v-for="n in 3"
        :key="n"
        :value="n"
      >
        <v-container fluid>
          <v-row>
            <v-col
              cols="12" 
            >
            <v-text-field
                v-model="password"
                variant="outlined"
                color="#00b786" 
                label="Password" 
                type="password"
                class="mt-2"
              ></v-text-field>
              <v-btn 
              block 
              color="#0FB786"
              :disabled="loading"
              :loading="loading"
              @click="claimReward()
            ">send</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
            </v-card-text>
          </v-card>
          <v-list-item>
            <!-- <v-text-field
                v-model="password"
                variant="outlined"
                color="#00b786" 
                label="Password" 
                type="password"
                class="mt-2"
              ></v-text-field>
              <v-btn 
              block 
              color="#0FB786"
              :disabled="loading"
              :loading="loading"
              @click="claimReward()
            ">Claim</v-btn>   -->            
          </v-list-item>
          
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
              Claim approved
            </span>
          </v-card-title>
          <v-card-text class="text-center">
            <span class="font-weight-black text-subtitle-1">
              Your rewards has been claim and credited
            </span>
            <v-btn
              class="mt-4"
              color="#0FB786"
              @click="dialogStake = false"
              block
            >Back</v-btn>
          </v-card-text>
        </v-card> 
      </v-card>
    </v-dialog> 


</template>
<script>
import { mapState } from 'vuex'
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsDeliverTxSuccess, SigningStargateClient, GasPrice, defaultRegistryTypes } from "@cosmjs/stargate";
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
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
    form: false,
    bitcannaConfig: bitcannaConfig,
    dialogSendToken: false,
    dialogAddressBook: false,
    dialogClaim: false,
    dialogStake: false,
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
    tab: null,
    allContacts: [],
    amountRules: [
      (v) => !!v || this.$t('dashboard.mdlSendTx.errorAmountRequire'),
      (v) => !isNaN(v) || this.$t('dashboard.mdlSendTx.errorAmountNumber'),
      (v) => countPlaces(v) < 7 || this.$t('dashboard.mdlSendTx.errorAmountDecimal'),
    ],
    addressRules: [
      (v) => !!v || this.$t('dashboard.mdlSendTx.errorAddrRequire'),
      (v) =>
        v.startsWith('bcna') ||
        this.$t('dashboard.mdlSendTx.errorPrefix'),
      (v) => bech32Validation(v) || this.$t('dashboard.mdlSendTx.errorBech32'),
    ],
    memoRules: [
      v => (v.length <= 100) || this.$t('dashboard.mdlSendTx.errorMemo'),
    ],
    step1: true,
    step2: false,
    step3: false,
  }},
  computed: {
    ...mapState(['allWallets', 'spendableBalances', 'accountSelected', 'network', 'totalRewards', 'allDelegations'])
  },
  async mounted() { 
    let getAllContacts = await getAllContact()
    this.allContacts = JSON.parse(getAllContacts)
  },
  methods: {
    checkTx() {
      this.step1 = false
      this.step2 = true
    },
    selectContact(index) {
      this.recipient = this.allContacts[index].address
      this.memo = this.allContacts[index].memo
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
    openDialogStake() {
      this.dialogStake = true;
      this.txSend = false;
      this.loading = false 
    },
    openDialogClaim() {
      this.dialogClaim = true
      this.txSend = false
      this.password = ''
      this.loading = false 
    },
    openDialogSendToken() {
      this.dialogSendToken = true;
      this.txSend = false;
      this.recipient = '';
      this.amount = '';
      this.memo = '';
      this.password = '';
      this.loading = false
      this.step1 = true
      this.step2 = false
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
    async claimReward() {

      //this.dialogClaim = false
      /* const hash = md5(this.password); 
      const { value } = await Preferences.get({ key: 'masterPass' });

      if(hash !== value) {
        this.alertError = true
        return
      } */

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


      const foundMsgType = defaultRegistryTypes.find(
        (element) =>
          element[0] ===
          "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward"
      );
      //console.log(this.allDelegations)

      const copieDelegator = [];
      this.allDelegations.forEach(function (item) {
        console.log(item)
        copieDelegator.push({
          typeUrl: foundMsgType[0],
          value: foundMsgType[1].fromPartial({
            delegatorAddress: item.delegation.delegatorAddress,
            validatorAddress: item.delegation.validatorAddress,
          }),
        });
      });  
      console.log(accounts)

      try {
          const result = await client.signAndBroadcast(
            accounts.address,
            copieDelegator,
            "auto",
            ""
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
    truncateString(str, num) {
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
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