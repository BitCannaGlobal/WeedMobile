
<template>
  <v-container> 
  <div>
    <v-row class="ma-2">
      <h1>
        Transactions 
      </h1>
      <v-spacer /> 
      <!-- <p class="mr-4 mt-4">
        Only showing last 100 transactions (50 incoming, 50 outgoing), for full history visit our 
        <a
          target="_blank"
          :href="'https://explorer.bitcanna.io/accounts/' + accounts[0].address"
        >explorer</a>
      </p> -->
      <SendModal
        class="text-right mr-4"
        :chain-id-props="
          bitcannaConfig[network].coinLookup.addressPrefix
        "
        :amount-available="balances / 1000000"
        :coin-icon="bitcannaConfig[network].coinLookup.icon"
        type="simpleSend"
      />
      <v-btn
        large                          
        class="mt-2"
        color="#333333"
        to="/create-qrcode"
      >
        Create qr
      </v-btn>
    </v-row>
    <v-divider class="mb-6" />
    <template v-for="group in groupedEvents()">
      <div class="mb-6">
        <h3 class="mb-6">
          {{ group[0].section }}
        </h3>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="item in group"
            :key="i" 
          >
        
          <v-expansion-panel-title v-slot="{ open }">
            
            <v-row no-gutters>
              <v-col cols="4" class="d-flex justify-start">
                <v-chip 
                  :color="item.final.color"
                  outlined
                  label 
                >
                  {{ item.final.typeReadable }}
                </v-chip>
              </v-col>
              <v-col
                cols="8"
                class="text--secondary mt-2"
              >
              
                {{ dayjs(item.final.timestamp).format('DD/MM/YYYY HH:mm:ss')  }}
              </v-col>
            </v-row>
          </v-expansion-panel-title>        
          <v-expansion-panel-text>
        <v-row
          justify="space-around"
          no-gutters
        >
        <v-btn
          class=" mr-2"
          elevation="2"
          color="#333333" 
          small
          @click.stop="openExplorer(item.final.finalHash)"
        >View transaction</v-btn>
        <!-- {{ item }} -->
        </v-row>
      </v-expansion-panel-text>        
        </v-expansion-panel>
        </v-expansion-panels>

        <!-- old  -->
<!--         <v-expansion-panels>
          <v-expansion-panel
            v-for="item in group"
            style="background:#1C1D20;color:white"
          > 
            <v-expansion-panel-header>
              <v-row no-gutters>
 
                <v-col
                  cols="6"
                  class="text--secondary"
                >
                  <v-fade-transition leave-absolute>
                    <v-row 
                      no-gutters
                      style="width: 100%"
                    >
                      <v-col cols="3">
                        <v-chip
                          class="mt-3"
                          :color="item.final.color"
                          outlined
                          label 
                        >
                          {{ item.final.typeReadable }}
                        </v-chip>
                      </v-col>
                      <v-col
                        cols="3"
                        class="mt-4"
                      >
                        {{ item.final.finalHash }} 
                      </v-col>
                    </v-row>
                  </v-fade-transition> 
                </v-col> 
                <v-col
                  align="right"
                  cols="5"
                  class="mt-4"
                > 
 
                  <div
                    v-if="item.final.msgData.amount"
                    class="mr-4"
                  >
                    {{ item.final.msgData.amount }} {{ bitcannaConfig[network].coinLookup.viewDenom }}
                  </div>
                </v-col>                       
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <template
                v-if="
                  item.final.type === '/cosmos.bank.v1beta1.MsgSend'
                "
              >
                <v-simple-table class="accent">
                  <template #default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          From
                        </th>
                        <th class="text-left">
                          To
                        </th>
                        <th class="text-left">
                          Amount
                        </th>
                        <th class="text-left">
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ item.final.msgData.from }}</td>
                        <td>{{ item.final.msgData.to }}</td>
                        <td class="green--text">
                          {{ item.final.msgData.amount }}
                          {{ bitcannaConfig[network].coinLookup.viewDenom }}
                        </td>
                        <td>
                          <v-btn
                            class=" mr-2"
                            elevation="2"
                            color="#333333"
                            :href="'https://explorer.bitcanna.io/transactions/' + item.final.finalHash"
                            target="_blank"
                            small
                          >
                            View in explorer
                          </v-btn>                        
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>

              <template
                v-if="
                  item.final.type ===
                    '/cosmos.staking.v1beta1.MsgDelegate'
                "
              >
                <v-simple-table class="accent">
                  <template #default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          From
                        </th>
                        <th class="text-left">
                          To validator
                        </th>
                        <th class="text-left">
                          Amount
                        </th>
                        <th class="text-left">
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {{ item.final.msgData.delegator_address }}
                        </td>
                        <td>
                          <v-icon class="mr-2">
                            mdi-shield-check
                          </v-icon>
                          {{ item.final.msgData.validator_address }}
                        </td>
                        <td class="green--text">
                          {{ item.final.msgData.amount }}
                          {{ bitcannaConfig[network].coinLookup.viewDenom }}
                        </td>
                        <td>
                          <v-btn
                            class=" mr-2"
                            elevation="2"
                            color="#333333"
                            :href="'https://explorer.bitcanna.io/transactions/' + item.final.finalHash"
                            target="_blank"
                            small
                          >
                            View in explorer
                          </v-btn>                        
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <template
                v-if="
                  item.final.type ===
                    '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward'
                "
              >
                <v-simple-table class="accent">
                  <template #default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          From validator
                        </th>
                        <th class="text-left">
                          To delegator
                        </th>
                        <th class="text-left">
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <v-icon class="mr-2">
                            mdi-shield-check
                          </v-icon>
                          {{ item.final.msgData.validator_address }}
                        </td>
                        <td>
                          {{ item.final.msgData.delegator_address }}
                        </td>
                        <td>
                          <v-btn
                            class=" mr-2"
                            elevation="2"
                            color="#333333"
                            :href="'https://explorer.bitcanna.io/transactions/' + item.final.finalHash"
                            target="_blank"
                            small
                          >
                            View in explorer
                          </v-btn>                        
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <template
                v-if="
                  item.final.type === '/cosmos.gov.v1beta1.MsgVote'
                "
              >
                <v-simple-table class="accent">
                  <template #default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          proposal_id
                        </th>
                        <th class="text-left">
                          option
                        </th>
                        <th class="text-left">
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          #{{ item.final.msgData.proposal_id }}
                        </td>
                        <td>
                          <v-chip
                            v-if="
                              item.final.msgData.option ===
                                'VOTE_OPTION_YES'
                            "
                            class="ma-2"
                            color="green"
                            outlined
                            label
                          >
                            YES
                          </v-chip>
                          <v-chip
                            v-if="
                              item.final.msgData.option ===
                                'VOTE_OPTION_NO'
                            "
                            class="ma-2"
                            color="red"
                            outlined
                            label
                          >
                            NO
                          </v-chip>
                          <v-chip
                            v-if="
                              item.final.msgData.option ===
                                'VOTE_OPTION_ABSTAIN'
                            "
                            class="ma-2"
                            color="red"
                            outlined
                            label
                          >
                            ABSTAIN
                          </v-chip>
                          <v-chip
                            v-if="
                              item.final.msgData.option ===
                                'VOTE_OPTION_NO_WITH_VETO'
                            "
                            class="ma-2"
                            color="orange"
                            outlined
                            label
                          >
                            NO WITH VETO
                          </v-chip>
                        </td>
                        <td>
                          <v-btn
                            class=" mr-2"
                            elevation="2"
                            color="#333333"
                            :href="'https://explorer.bitcanna.io/transactions/' + item.final.finalHash"
                            target="_blank"
                            small
                          >
                            View in explorer
                          </v-btn>                        
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <template
                v-if="
                  item.final.type === '/cosmos.group.v1.MsgVote'
                "
              >
                <v-simple-table class="accent">
                  <template #default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          proposal_id
                        </th>
                        <th class="text-left">
                          option
                        </th>
                        <th class="text-left">
                          metadata
                        </th>
                        <th class="text-left">
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          #{{ item.final.msgData.proposal_id }}
                        </td>
                        <td>{{ item.final.msgData.option }}</td>
                        <td>{{ item.final.msgData.metadata }}</td>
                        <td>
                          <v-btn
                            class=" mr-2"
                            elevation="2"
                            color="#333333"
                            :href="'https://explorer.bitcanna.io/transactions/' + item.final.finalHash"
                            target="_blank"
                            small
                          >
                            View in explorer
                          </v-btn>                        
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <template
                v-if="
                  item.final.type ===
                    '/cosmos.gov.v1beta1.MsgDeposit'
                "
              >
                <v-simple-table class="accent">
                  <template #default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Proposal Id
                        </th>
                        <th class="text-left">
                          Deposit Amount
                        </th>
                        <th class="text-left">
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          #{{ item.final.msgData.proposal_id }}
                        </td>
                        <td>
                          {{ item.final.msgData.amount }}
                          {{ bitcannaConfig[network].coinLookup.viewDenom }}
                        </td>
                        <td>
                          <v-btn
                            class=" mr-2"
                            elevation="2"
                            color="#333333"
                            :href="'https://explorer.bitcanna.io/transactions/' + item.final.finalHash"
                            target="_blank"
                            small
                          >
                            View in explorer
                          </v-btn>                        
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <template
                v-if="
                  item.final.type ===
                    '/cosmos.staking.v1beta1.MsgUndelegate'
                "
              >
                <v-simple-table class="accent">
                  <template #default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          From validator
                        </th>
                        <th class="text-left">
                          Amount
                        </th>
                        <th class="text-left">
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <v-icon class="mr-2">
                            mdi-shield-check
                          </v-icon>
                          {{ item.final.msgData.validator_address }}
                        </td>
                        <td>
                          {{ item.final.msgData.amount }}
                          {{ bitcannaConfig[network].coinLookup.viewDenom }}
                        </td>
                        <td>
                          <v-btn
                            class=" mr-2"
                            elevation="2"
                            color="#333333"
                            :href="'https://explorer.bitcanna.io/transactions/' + item.final.finalHash"
                            target="_blank"
                            small
                          >
                            View in explorer
                          </v-btn>                        
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
              <template
                v-if="
                  item.final.type ===
                    '/cosmos.gov.v1beta1.MsgSubmitProposal'
                "
              >
                <v-simple-table class="accent">
                  <template #default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Proposal Id
                        </th> 
                        <th class="text-left">
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {{ item.final.msgData.proposal_id }}
                        </td> 
                        <td>
                          <v-btn
                            class=" mr-2"
                            elevation="2"
                            color="#333333"
                            :href="'https://explorer.bitcanna.io/transactions/' + item.final.finalHash"
                            target="_blank"
                            small
                          >
                            View in explorer
                          </v-btn>                        
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>                    
              <template
                v-if="
                  item.final.type ===
                    '/cosmos.staking.v1beta1.MsgBeginRedelegate'
                "
              >
                <v-simple-table class="accent">
                  <template #default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          From validator
                        </th>
                        <th class="text-left">
                          To validator
                        </th>
                        <th class="text-left">
                          Amount
                        </th>
                        <th class="text-left">
                          View
                        </th> 
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <v-icon class="mr-2">
                            mdi-shield-check
                          </v-icon>
                          {{ item.final.msgData.from }}
                        </td>
                        <td>
                          <v-icon class="mr-2">
                            mdi-shield-check
                          </v-icon>
                          {{ item.final.msgData.to }}
                        </td>
                        <td>
                          {{ item.messageInfo.msgData.amount }}
                          {{ bitcannaConfig[network].coinLookup.viewDenom }}
                        </td>
                        <td>
                          <v-btn
                            class=" mr-2"
                            elevation="2"
                            color="#333333"
                            :href="'https://explorer.bitcanna.io/transactions/' + item.final.finalHash"
                            target="_blank"
                            small
                          >
                            View in explorer
                          </v-btn>                        
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </template>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels> -->
        <!-- {{ item }}  -->

        <!-- {{ group }} -->
      </div>
    </template>

    <v-dialog
      id="qrcode"
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5">
          Receive
          <v-spacer />
          <v-icon
            class="mr-2"
            @click="dialog = false"
          >
            mdi-close-circle
          </v-icon>
        </v-card-title>

        <v-card-text align="center">
          <span><qr-code
            class="mb-2 mt-2"
            :text="accounts[0]?.address"
          /></span>
          <v-chip
            color="#00b786"
            outlined
            label 
            @click="copyAddr(accounts[0].address)"
          >
            {{ accounts[0]?.address }}
          </v-chip>
          <span
            v-if="isCopied"
            class="ml-2"
          >Address copied!</span>          
        </v-card-text> 
      </v-card>
    </v-dialog>
  </div>
</v-container>
</template>

<script>
import { mapState } from "vuex";

import axios from "axios";
import dayjs from "dayjs";
import { reverse, sortBy, uniqWith, orderBy, groupBy } from "lodash";
import { Browser } from '@capacitor/browser';
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { setMsg } from "../libs/msgType";
import bitcannaConfig from '../bitcanna.config' 

const categories = [
  {
    section: "Today",
    matcher: (event) => {
      return dayjs(event.timestamp).isSame(dayjs(), "day");
    },
  },
  {
    section: "Yesterday",
    matcher: (event) => {
      return dayjs(event.timestamp).isSame(dayjs().subtract(1, "days"), "day");
    },
  },
];


export default {
  data: () => ({
    dayjs: dayjs,
    bitcannaConfig: bitcannaConfig,
    validatorAddr: "",
    totalProps: "",
    totalVoted: "",
    rpcSender: [],
    rpcRecipient: [],
    rpcAllTxs: [],
    loading: true,
    firstLoad: true,
    dialog: false,
    isCopied: false,
  }),
  computed: {
    ...mapState([
      'network', 
      'rpcBase', 
      'isLogged', 
      'allWallets', 
      'sessionMax', 
      'accountSelected', 
      'spendableBalances', 
      'totalRewards', 
      'priceNow',
      'totalTokens',
      'validators'
    ])
  },
  watch: {},

  async beforeMount() {

    if (this.isLogged) {
      this.accountNow = this.allWallets[this.accountSelected]

      const resultSender = await axios(
        bitcannaConfig[this.network].apiURL +
          "/cosmos/tx/v1beta1/txs?events=message.sender=%27" +
          this.accountNow.address +
          "%27&limit=" +
          bitcannaConfig[this.network].maxTxSender +
          "&order_by=2"
      );
      const resultRecipient = await axios(
        bitcannaConfig[this.network].apiURL +
          "/cosmos/tx/v1beta1/txs?events=transfer.recipient=%27" +
          this.accountNow.address +
          "%27&limit=" +
          bitcannaConfig[this.network].maxTxRecipient +
          "&order_by=2"
      );
      const finalTxs = resultSender.data.tx_responses.concat(
        resultRecipient.data.tx_responses
      );

      this.rpcAllTxs = this.transactionsReducer(finalTxs);
      this.loading = false;
      this.firstLoad = false;
    }
  },
  methods: {
    async openExplorer(hash) {
      await Browser.open({
        url: 'https://explorer.bitcanna.io/transactions/' + hash,
      });
    },
    groupedEvents() { 
        const test = orderBy(
          groupBy(this.categorizedEvents(), "section"),
          (group) => group[0].final.timestamp,
          "desc"
        );
        return test; 
    },    
    categorizedEvents() {
      return this.rpcAllTxs.map((event) => {
        // check if the tx is in Today, Yesterday or Last Week
        const dateString =
          ` (` + dayjs(event.timestamp).format("D MMMM YYYY") + `)`;

        const category = categories.find(({ matcher }) => matcher(event));
        
        if (category) {
          const final = this.getMessageType(
            event.tx.body.messages[0],
            event.timestamp,
            event.txhash
          );
          return {
            section: category.section + dateString,
            final,
          };
        }

        // check if tx is in a month this year
        const date = dayjs(event.timestamp);
        const today = dayjs();
        if (date.year() === today.year()) {
          const final = this.getMessageType(
            event.tx.body.messages[0],
            event.timestamp,
            event.txhash
          );

          return {
            section: date.format("D MMMM YYYY"),
            final,
          };
        }
        
        // tx is in a month another year
        const final = this.getMessageType(
          event.tx.body.messages[0],
          event.timestamp,
          event.txhash
        );

        return {
          section: date.format("MMMM D, YYYY"),
          final,
        };
      });
    },    
    transactionsReducer(txs) {
      const duplicateFreeTxs = uniqWith(txs, (a, b) => a.txhash === b.txhash);
      
      const sortedTxs = sortBy(duplicateFreeTxs, ["timestamp"]);
      const reversedTxs = reverse(sortedTxs);

      reversedTxs.forEach(async (item, i) => {
        reversedTxs[i].messageInfo = this.getMessageType(
          item.tx.body.messages[0]
        );
      });
      //console.log(reversedTxs)
      // here we filter out all transactions related to validators
      return reversedTxs.reduce((collection, transaction) => {
        return collection.concat(transaction);
      }, []);
    },
    getMessageType(msg, timestamp, txHash) { 
      const typeReadable = setMsg(
        msg,
        this.accountNow.address,
        timestamp,
        this.validators,
        txHash
      );
      return typeReadable;
    },
    formatDate(dateStr) {
      return Intl.DateTimeFormat("us-EN", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      }).format(new Date(dateStr))
    }, 
    async copyAddr(text) {
      await this.$copyText(text);
      this.isCopied = true;
      setTimeout(this.hideCopy, 4000);
    },  
    hideCopy() {
      this.isCopied = false;
    },   
  },

};
</script>
