<template>
  <div class="mt-9">
    <h3 class="ma-4">{{ $t("dashboard.title") }} {{ accountNow?.name }}</h3>

    <!--         <v-select
          v-model="$i18n.locale"
          label="Language"
          :items="$i18n.availableLocales"
          :item-title="'locale-' + locale"
          :item-value="locale"
          variant="outlined"
        ></v-select>   -->
    <!-- <v-row>
        <v-col>
          <v-card 
            v-if="allWallets.length > 0"
            :title="accountNow.name"
            :subtitle="accountNow.address" 
          ></v-card> 
        </v-col>
      </v-row>    -->

    <v-card v-if="allWallets.length > 0" class="ma-4">
      <v-card-title class="mb-4 text-h6">{{
        $t("dashboard.titleBlock")
      }}</v-card-title>
      <v-card-text>
        <h1 class="mb-2">
          {{
            Number(this.totalTokens).toFixed(2) +
            " " +
            bitcannaConfig[network].coinLookup.viewDenom
          }}
        </h1>
        <h4>
          <i>
            <span v-if="currencyNow === 'USD'">$</span
            ><span v-if="currencyNow === 'EUR'">€</span>
            {{ (this.totalTokens * priceNow).toFixed(3) }}
          </i>
          <span class="text-green-lighten-1">
            (<span v-if="currencyNow === 'USD'">$</span
            ><span v-if="currencyNow === 'EUR'">€</span> {{ priceNow }})</span
          >
        </h4>
        <br />
        <h4>{{ accountNow.address }}</h4>
      </v-card-text>
    </v-card>
    <v-card class="ma-4" v-if="allWallets.length > 0" :height="80">
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="2">
            <v-sheet>
              <v-img
                inline
                max-height="50"
                max-width="50"
                min-height="50"
                min-width="50"
                src="@/assets/icon-stake.png"
              ></v-img>
            </v-sheet>
          </v-col>
          <v-col class="ml-4" cols="5">
            <v-sheet>
              <span class="text-subtitle-1">
                {{ $t("dashboard.available") }}
              </span>
              <br />
              <span class="font-weight-black text-subtitle-1">
                {{ this.spendableBalances }}
              </span>
            </v-sheet>
          </v-col>
          <v-col cols="4">
            <v-sheet>
              <actionsModal type="stake" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="ma-4" v-if="allWallets.length > 0">
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="2">
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
          <v-col class="ml-4" cols="5">
            <v-sheet>
              <span class="text-subtitle-1">
                {{ $t("dashboard.rewards") }}
              </span>
              <br />
              <span class="font-weight-black text-subtitle-1">
                {{ this.totalRewards }}
              </span>
            </v-sheet>
          </v-col>
          <v-col cols="4">
            <v-sheet>
              <actionsModal type="claim" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card v-if="allWallets.length > 0" class="ma-4" color="black">
      <v-row>
        <v-col cols="6">
          <actionsModal type="sendTx" />
        </v-col>
        <v-col cols="6">
          <v-btn block size="x-large" color="#1C1D20" to="/create-qrcode">{{
            $t("dashboard.btnQrCode")
          }}</v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-if="allWallets.length === 0" class="ma-4" color="black">
      <v-alert variant="outlined" type="success" border="top">
        {{ $t("dashboard.welcomeNoWallet") }}
      </v-alert>
      <br />
      <v-btn block size="x-large" color="#1C1D20" to="/accounts">{{
        $t("dashboard.btnCreateOne")
      }}</v-btn>
    </v-card>
  </div>
</template>

<script>
import { getBcnaSession, removeBcnaSession } from "@/libs/storage.js";
import { mapState } from "vuex";
import { Device } from '@capacitor/device';
import actionsModal from "@/components/ActionsModal.vue";

import bitcannaConfig from "../bitcanna.config";

export default {
  name: "App",
  components: { actionsModal },
  data: () => ({
    bitcannaConfig: bitcannaConfig,
    userSession: "",
    timeNow: "",
    timeNowDebug: "",
    timeLeft: "",
    timeoutJs: "",
    accountNow: "",
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
      "currencyNow",
      "operatingSystem"
    ]),
  },

  async mounted() {
    if (!this.isLogged) {
      removeBcnaSession();
      this.$store.commit("setIsLogged", false);
      this.$router.push("/");
      return;
    }

    this.accountNow = this.allWallets[this.accountSelected];

    if (typeof this.accountNow !== "undefined") {
      await this.$store.dispatch("initRpc");
      await this.$store.dispatch("getBankModule", this.accountNow.address);
      await this.$store.dispatch("getDistribModule", this.accountNow.address);
      await this.$store.dispatch("getStakingModule", this.accountNow.address);
      await this.$store.dispatch("getWalletAmount");
      

      
 
    }
    const info = await Device.getInfo();
    await this.$store.dispatch("setoperatingSystem", info.operatingSystem);
    console.log(this.operatingSystem)

    /* setInterval(async ()=> {
      await this.$store.dispatch('getBankModule', this.accountNow.address)
      await this.$store.dispatch('getDistribModule', this.accountNow.address)
      await this.$store.dispatch('getStakingModule', this.accountNow.address)
      await this.$store.dispatch('getWalletAmount')
    },10000) */
    // console.log(this.isLogged)
    /* let getFinalSession = await getBcnaSession();
    this.userSession = getFinalSession;

    this.remainingTime()
    this.timeoutJs = setInterval(() => {
      this.remainingTime()
    }, 1000); */
  },
  methods: {
    remainingTime() {
      let timeNow = Math.floor(Date.now() / 1000);
      this.timeNow = timeNow;

      this.timeLeft = timeNow - (Number(this.userSession) + this.sessionMax);
      //console.log(this.timeLeft)
      if (this.timeLeft > 0) {
        clearInterval(this.timeoutJs);
        this.$store.commit("setIsLogged", false);
        removeBcnaSession();
        this.$router.push("/");
      }
    },
  },
};
</script>
