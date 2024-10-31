<template>
  <div class="mt-9 ma-4">
    <v-row class="ma-2">
      <h1>
        {{ $t("transactions.title") }}
      </h1>
      <v-spacer />
      <v-btn large class="mt-2" color="#333333" to="/create-qrcode">
        {{ $t("transactions.btnCreateQr") }}
      </v-btn>
    </v-row>
    <v-divider class="mb-6" />
    <template v-for="group in groupedEvents()">
      <div class="mb-6">
        <h3 class="mb-6">
          {{ group[0].section }}
        </h3>
        <v-expansion-panels>
          <v-expansion-panel v-for="item in group" :key="i">
            <v-expansion-panel-title v-slot="{ open }">
              <v-row no-gutters>
                <v-col cols="4" class="d-flex justify-start">
                  <v-chip :color="item.final.color" outlined label>
                    {{ item.final.typeReadable }}
                  </v-chip>
                </v-col>
                <v-col cols="8" class="text--secondary mt-2">
                  {{
                    dayjs(item.final.timestamp).format("DD/MM/YYYY HH:mm:ss")
                  }}
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row justify="space-around" no-gutters>
                <v-btn
                  class="mr-2"
                  elevation="2"
                  color="#333333"
                  small
                  @click.stop="openExplorer(item.final.finalHash)"
                  >{{ $t("transactions.btnViewTx") }}</v-btn
                >
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";

import axios from "axios";
import dayjs from "dayjs";
import { removeBcnaSession } from "@/libs/storage.js";
import { reverse, sortBy, uniqWith, orderBy, groupBy } from "lodash";
import { Browser } from "@capacitor/browser";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { setMsg } from "../libs/msgType";
import bitcannaConfig from "../bitcanna.config";

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
      "network",
      "rpcBase",
      "isLogged",
      "allWallets",
      "sessionMax",
      "accountSelected",
      "spendableBalances",
      "totalRewards",
      "priceNow",
      "totalTokens",
      "validators",
    ]),
  },
  watch: {},

  async beforeMount() {
    if (!this.isLogged) {
      removeBcnaSession();
      this.$store.commit("setIsLogged", false);
      this.$router.push("/");
      return;
    }
    if (this.isLogged) {
      this.accountNow = this.allWallets[this.accountSelected];
      //let's check if CosmosBFT version is v0.37 or v0.38
      const nodeInfoResponse = await axios.get(
        bitcannaConfig[this.network].apiURL +
        "/cosmos/base/tendermint/v1beta1/node_info"
      );

      const minorVersion = parseInt(nodeInfoResponse.data.default_node_info.version.split('.')[1], 10);
      let paramName;
      if (minorVersion >= 38) {
        // For v0.38.x and above
        paramName = 'query';
      } else {
        // For v0.37.x and below
        paramName = 'events';
      }

      const resultSender = await axios(
        bitcannaConfig[this.network].apiURL +
          "/cosmos/tx/v1beta1/txs?"+paramName+"=message.sender=%27" +
          this.accountNow.address +
          "%27&limit=" +
          bitcannaConfig[this.network].maxTxSender +
          "&order_by=2",
      );
      const resultRecipient = await axios(
        bitcannaConfig[this.network].apiURL +
          "/cosmos/tx/v1beta1/txs?"+paramName+"=transfer.recipient=%27" +
          this.accountNow.address +
          "%27&limit=" +
          bitcannaConfig[this.network].maxTxRecipient +
          "&order_by=2",
      );
      const finalTxs = resultSender.data.tx_responses.concat(
        resultRecipient.data.tx_responses,
      );

      this.rpcAllTxs = this.transactionsReducer(finalTxs);
      this.loading = false;
      this.firstLoad = false;
    }
  },
  methods: {
    async openExplorer(hash) {
      await Browser.open({
        url: "https://explorer.bitcanna.io/tx/" + hash,
      });
    },
    groupedEvents() {
      const test = orderBy(
        groupBy(this.categorizedEvents(), "section"),
        (group) => group[0].final.timestamp,
        "desc",
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
            event.txhash,
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
            event.txhash,
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
          event.txhash,
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
          item.tx.body.messages[0],
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
        txHash,
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
      }).format(new Date(dateStr));
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
