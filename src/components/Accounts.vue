<template>
  <v-row>
    <v-col>
      <v-card class="ma-4">
        <v-list lines="two">
          <v-list-item
            :title="this.allWallets[this.accountSelected]?.name"
            :subtitle="this.allWallets[this.accountSelected]?.address"
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
                @click.stop="editNowModal()"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>

  <div class="text-center">
    <v-bottom-sheet v-model="editNow" inset>
      <v-card class="text-center">
        <v-card-text>
          <v-btn variant="text" @click="editNow = !editNow"> close </v-btn>

          <br />
          <br />

          <v-alert
            v-if="editedWallet"
            variant="outlined"
            elevation="2"
            type="success"
          >
            Wallet edited
          </v-alert>
          <v-text-field
            v-if="!editedWallet"
            v-model="walletName"
            label="Wallet name"
            variant="outlined"
          ></v-text-field>
          <v-btn
            v-if="!editedWallet"
            class="flex-grow-1"
            color="green"
            block
            @click="editAccount"
          >
            Edit wallet
          </v-btn>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>
<script>
import { editAccountId } from "@/libs/storage.js";
import { mapState } from "vuex";

export default {
  name: "App",

  data: () => ({
    userSession: "",
    accountNow: "",
    walletName: "",
    editNow: false,
    editedWallet: false,
  }),
  computed: {
    ...mapState(["isLogged", "allWallets", "sessionMax", "accountSelected"]),
  },
  async mounted() {
    let finalWallet = this.allWallets[this.accountSelected];
    if (typeof finalWallet?.address !== "undefined") {
      finalWallet.address = this.truncate(finalWallet?.address);
      this.accountNow = this.allWallets[this.accountSelected];
      this.walletName = this.accountNow.name;
    }
    if (this.allWallets.length === 0) {
      this.$router.push("/accounts");
    }
  },
  methods: {
    editNowModal() {
      this.editedWallet = false;
      this.editNow = !this.editNow;
    },
    async editAccount() {
      await editAccountId(this.accountSelected, this.walletName);
      await this.$store.dispatch("getWallets");
      this.editedWallet = true;
      let finalWallet = this.allWallets[this.accountSelected];
      finalWallet.address = this.truncate(finalWallet?.address);
      this.accountNow = this.allWallets[this.accountSelected];
      this.walletName = this.accountNow.name;
    },
    truncate(
      fullStr,
      strLen = 8,
      separator = "...",
      frontChars = 10,
      backChars = 10,
    ) {
      console.log(fullStr);
      if (fullStr.length <= strLen) return fullStr;

      return (
        fullStr.substr(0, frontChars) +
        separator +
        fullStr.substr(fullStr.length - backChars)
      );
    },
  },
};
</script>
