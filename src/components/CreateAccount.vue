<template>
  <v-btn block size="x-large" color="#0FB786" @click="openCreateWallet()">{{
    $t("accounts.createAccount")
  }}</v-btn>
  <v-dialog
    v-model="dialogCreateWallet"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
    :class="operatingSystem === 'ios' ? 'mt-9 bitcannaFont' : 'bitcannaFont'"
  >
    <v-toolbar dark>

      <v-toolbar-title>{{
        $t("accounts.mdlCreateAccount.title")
      }}</v-toolbar-title>
    </v-toolbar>
    <v-stepper v-model="step" :items="items" hide-actions alt-labels>
      <div class="ma-4" v-if="step === 1">
        <h3 class="text-h6 d-flex align-center flex-column">Mnenomic phrase</h3>
        <div class="d-flex align-center flex-column pa-6">
          <v-btn-toggle v-model="numWords" divided variant="outlined">
            <v-btn>12 {{ $t("accounts.mdlCreateAccount.words") }}</v-btn>
            <!-- <v-btn>18 words</v-btn> -->
            <v-btn>24 {{ $t("accounts.mdlCreateAccount.words") }}</v-btn>
          </v-btn-toggle>
        </div>
        <v-sheet border>
          <v-chip
            v-for="(item, index) in generatedMnenomic"
            :key="index"
            class="ma-2"
            color="#0eb786"
            outlined
            label
          >
            {{ item }}
          </v-chip>
        </v-sheet>
        <v-btn class="mt-4" color="#0eb786" @click="step1" block>
          {{ $t("accounts.btnStartVerification") }}
        </v-btn>
        <v-btn
          class="mt-4"
          block
          color="red"
          @click="dialogCreateWallet = false"
        >{{ $t("config.currency.close") }}</v-btn>
      </div>
      <div class="ma-4" v-if="step === 2">
        <v-alert
          v-model="alertErrorMnemonic"
          class="mb-4"
          variant="outlined"
          type="warning"
          border="top"
          closable
          close-label="Close Alert"
        >
          {{ $t("errors.badMnemonic") }}
        </v-alert>
        <h3 class="text-h6">
          {{ $t("accounts.mdlCreateAccount.checkMnemonic") }}
        </h3>
        <v-chip
          v-for="(item, index) in checkMnenomic"
          :key="item"
          class="ma-2"
          outlined
          :color="checkMnenomicColor"
          @click="clickRemove(item, index)"
        >
          <v-icon class="mr-1">mdi-minus-circle-outline</v-icon>
          {{ item }}
        </v-chip>

        <v-divider v-if="!mnenomicVerified"></v-divider>

        <v-chip
          v-for="(item, index) in shuffledMnenomic.sort()"
          :key="index"
          class="ma-2"
          outlined
          @click="clickCheck(item, index)"
        >
          <v-icon class="mr-1">mdi-plus-circle-outline</v-icon>

          {{ item }}
        </v-chip>
        <br />
        <v-btn class="ma-2" @click="step = 1" block>
          {{ $t("accounts.mdlCreateAccount.return") }}
        </v-btn>
        <v-btn
          class="ma-2"
          color="#0eb786"
          :disabled="!mnenomicVerified"
          block
          @click="step2"
        >
          {{ $t("accounts.mdlCreateAccount.nextStep") }}
        </v-btn>
        <!-- <v-btn
            class="ma-2"
            color="#0eb786" 
            @click="step2"
          >
            Bypass
          </v-btn>
          <br />
          Debug<br /> {{ generatedMnenomic }} -->
      </div>
      <div class="ma-4" v-if="step === 3">
        <h3 class="text-h6">Confirm</h3>

        <br />

        <v-sheet border>
          <v-list>
            <v-alert
              v-model="alertError"
              class="ma-4"
              variant="outlined"
              type="warning"
              border="top"
              closable
              close-label="Close Alert"
            >
              {{ $t("errors.badPassword") }}
            </v-alert>
            <v-alert
              v-model="alertErrorName"
              class="ma-4"
              variant="outlined"
              type="warning"
              border="top"
              closable
              close-label="Close Alert"
            >
              {{ $t("errors.walletAlreadyExist") }}
            </v-alert>
            <v-list-item>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                counter="20"
                variant="outlined"
                color="#00b786"
                :label="$t('accounts.mdlCreateAccount.walletName')"
                style="min-height: 96px"
                class="mt-6"
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-text-field
                v-model="password"
                :rules="passRules"
                variant="outlined"
                color="#00b786"
                :label="$t('accounts.mdlCreateAccount.walletPassword')"
                style="min-height: 96px"
                type="password"
                class="mt-6"
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-btn size="x-large" block color="#0eb786" @click="importWallet">
                {{ $t("accounts.mdlCreateAccount.save") }}
              </v-btn>
            </v-list-item>
          </v-list>
        </v-sheet>
      </div>
    </v-stepper>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";
import { Preferences } from "@capacitor/preferences";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import {
  addContact,
  removeAccount,
  addAccount,
  addMasterPassword,
  getMasterPassword,
  removeMasterPassword,
} from "@/libs/storage.js";
import md5 from "md5";
// import { notifAccountAdded } from '~/libs/notifications'

export default {
  data() {
    return {
      dialogCreateWallet: false,
      e1: 1,
      valid: false,
      walletName: "",
      name: "",
      password: "",
      show1: false,
      numWords: 0,
      generatedMnenomicPlain: "",
      generatedMnenomic: "",
      shuffledMnenomic: "",
      checkMnenomic: [],
      checkMnenomicColor: "",
      alertErrorMnemonic: false,
      mnenomicVerified: false,
      alertError: false,
      alertErrorName: false,
      nameRules: [
        (v) => !!v || "Wallet name is required",
        (v) =>
          (v && v.length <= 20) ||
          "Wallet name must be less than 20 characters",
      ],
      passRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length <= 20) || "Password must be less than 20 characters",
      ],
      rules: {
        required: (value) =>
          !!value || this.$t("accounts.mdlCreateAccount.rules.required"),
        counter: (value) =>
          value.length <= 10 ||
          this.$t("accounts.mdlCreateAccount.rules.counter"),
      },
      ticksLabels: [
        "12 " + this.$t("accounts.mdlCreateAccount.words"),
        "18 " + this.$t("accounts.mdlCreateAccount.words"),
        "24 " + this.$t("accounts.mdlCreateAccount.words"),
      ],

      shipping: 0,
      step: 1,
      items: [
        this.$t("accounts.mdlCreateAccount.step1"),
        this.$t("accounts.mdlCreateAccount.step2"),
        this.$t("accounts.mdlCreateAccount.step3"),
      ],
      products: [
        {
          name: "Product 1",
          price: 10,
          quantity: 2,
        },
        {
          name: "Product 2",
          price: 15,
          quantity: 10,
        },
      ],
    };
  },
  computed: {
    ...mapState(["allWallets", "isLogged", "operatingSystem"]),
  },
  async mounted() {
    var generateSecret = await DirectSecp256k1HdWallet.generate(12);
    this.generatedMnenomicPlain = generateSecret.secret.data;
    this.generatedMnenomic = this.generatedMnenomicPlain.split(" ");
    this.shuffle();
  },
  watch: {
    async numWords(newData) {
      switch (newData) {
        case 0:
          var generateSecret = await DirectSecp256k1HdWallet.generate(12);
          this.generatedMnenomicPlain = generateSecret.secret.data;
          this.generatedMnenomic = this.generatedMnenomicPlain.split(" ");
          this.shuffle();
          break;
        case 1:
          var generateSecret = await DirectSecp256k1HdWallet.generate(24);
          this.generatedMnenomicPlain = generateSecret.secret.data;
          this.generatedMnenomic = this.generatedMnenomicPlain.split(" ");
          this.shuffle();
          break;
      }
    },
    checkMnenomic: {
      deep: true,
      handler() {
        const compareArrays = (a, b) =>
          a.length === b.length &&
          a.every((element, index) => element === b[index]);

        console.log(this.generatedMnenomic.length);
        console.log("this.checkMnenomic", this.checkMnenomic.length);

        if (this.generatedMnenomic.length === this.checkMnenomic.length) {
          if (compareArrays(this.checkMnenomic, this.generatedMnenomic)) {
            this.checkMnenomicColor = "green";
            this.mnenomicVerified = true;
            this.alertErrorMnemonic = false;
          } else {
            this.checkMnenomicColor = "red";
            this.mnenomicVerified = false;
            this.alertErrorMnemonic = true;
          }
        } else {
          this.checkMnenomicColor = "gray";
          this.mnenomicVerified = false;
          this.alertErrorMnemonic = false;
        }
      },
    },
  },
  methods: {
    async openCreateWallet() {
      this.dialogCreateWallet = true;
      this.alertError = false;
      this.alertErrorName = false;
      this.alertErrorMnemonic = false;
      this.step = 1;
      this.name = "";
      this.password = "";
      var generateSecret = await DirectSecp256k1HdWallet.generate(12);
      this.generatedMnenomicPlain = generateSecret.secret.data;
      this.generatedMnenomic = this.generatedMnenomicPlain.split(" ");
      this.shuffle(this.generatedMnenomic);
    },
    step1() {
      this.step = 2;
    },
    step2() {
      this.step = 3;
    },
    clickCheck(item, index) {
      this.checkMnenomicColor = "";
      for (var i = 0; i < this.shuffledMnenomic.length; i++) {
        if (this.shuffledMnenomic[i] === item) {
          this.checkMnenomic.push(item);
          this.shuffledMnenomic.splice(i, 1);
          i--;
        }
      }
    },
    clickRemove(item, index) {
      this.checkMnenomicColor = "";
      for (var i = 0; i < this.checkMnenomic.length; i++) {
        if (this.checkMnenomic[i] === item) {
          this.shuffledMnenomic.push(item);
          this.checkMnenomic.splice(i, 1);
          i++;
        }
      }
    },
    shuffle(arr) {
      this.checkMnenomic = [];
      let shuffled = this.generatedMnenomic
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      this.shuffledMnenomic = shuffled;
    },
    async importWallet() {
      this.alertError = false;
      this.alertErrorName = false;
      this.alertErrorMnemonic = false;

      const hash = md5(this.password);
      const { value } = await Preferences.get({ key: "masterPass" });

      if (hash !== value) {
        this.alertError = true;
        return;
      }

      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        this.generatedMnenomicPlain,
        {
          prefix: "bcna",
        },
      );
      var finalWallet = await wallet.serialize(this.password);
      var finalAddress = await wallet.getAccounts();

      const foundName = this.allWallets.find(
        (element) => element.name === this.name,
      );
      if (foundName) {
        this.alertErrorName = true;
        return;
      }

      await addAccount(this.name, finalAddress[0].address, finalWallet);
      await addContact(this.name, finalAddress[0].address, "");
      //let getAllContacts = await getAllContact()
      await this.$store.dispatch("getWallets");
      this.dialogCreateWallet = false;
    },
  },
};
</script>
