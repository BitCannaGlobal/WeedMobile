<template>
  <div id="login">
    <v-img src="@/assets/banner-home.png"></v-img>
    <div v-if="passExist" class="mt-10 text-center">
      {{ $t("login.title") }}
    </div>
    <div v-else class="mt-10 text-center">
      {{ $t("login.welcomMsg1") }}<br />{{ $t("login.welcomMsg2") }}
    </div>
    <v-container>
      <v-alert
        v-model="alertError"
        variant="outlined"
        type="warning"
        border="top"
        closable
        close-label="Close Alert"
      >
        {{ $t("login.badPassword") }}
      </v-alert>
      <v-alert
        v-model="alertExpired"
        variant="outlined"
        type="warning"
        border="top"
        closable
        close-label="Close Alert"
      >
        {{ $t("login.errorMsgSession") }}
      </v-alert>
      <v-alert
        v-model="maxMasterPass"
        variant="outlined"
        type="warning"
        border="top"
        closable
        close-label="Close Alert"
      >
        {{ $t("login.passToLong") }}
      </v-alert>
      <br />
      <v-row v-if="passExist">
        <v-col cols="12">
          <v-form v-model="form" ref="form" @submit.prevent="login">
            <v-text-field
              v-model="passWord"
              :rules="passRules"
              :label="$t('login.passInput')"
              required
              variant="outlined"
              type="password"
            ></v-text-field>
          </v-form>
        </v-col>
      </v-row>

      <v-btn
        v-if="passExist"
        :disabled="!form"
        type="submit"
        block
        class="mt-2"
        size="x-large"
        color="#0FB786"
        @click="login"
      >
        {{ $t("login.loginButton") }}
      </v-btn>
      <v-btn
        v-if="!passExist"
        type="submit"
        size="x-large"
        color="#1C1D20"
        block
        class="mt-4"
        @click="openDialogMasterPassword()"
      >
        {{ $t("login.setPass") }}
      </v-btn>
      <!-- <v-btn v-else type="submit" size="x-large" color="red" block class="mt-4" @click="removePassword">{{ $t("login.rmPass") }}</v-btn> -->
    </v-container>
  </div>

  <v-dialog
    v-model="dialogMasterPassword"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
    class="bitcannaFont"
  >
    <v-card>
      <v-form ref="form">
        <v-toolbar dark>
          <v-btn icon dark @click="dialogMasterPassword = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t("login.createPass") }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="text" size="x-large" @click="saveMasterPassword">
              {{ $t("login.savePass") }}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list lines="two" subheader>
          <v-list-item
            :title="$t('addressBook.info')"
            :subtitle="$t('login.passDescription')"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-alert
              v-model="badMasterPass"
              variant="outlined"
              type="warning"
              border="top"
              closable
              close-label="Close Alert"
            >
              {{ $t("login.badPassword") }}
            </v-alert>
            <v-alert
              v-model="maxMasterPass"
              variant="outlined"
              type="warning"
              border="top"
              closable
              close-label="Close Alert"
            >
              {{ $t("login.passToLong") }}
            </v-alert>

            <v-text-field
              v-model="masterPass"
              :rules="passRules"
              type="password"
              variant="outlined"
              color="#00b786"
              counter="20"
              :label="$t('login.formSetPass')"
              style="min-height: 96px"
              class="mt-4"
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field
              v-model="masterPass2"
              :rules="passRules"
              type="password"
              variant="outlined"
              color="#00b786"
              counter="20"
              :label="$t('login.repeatPass')"
              style="min-height: 96px"
              class="mt-4"
            ></v-text-field>
          </v-list-item>
        </v-list>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import { App } from "@capacitor/app";
import { mapState } from "vuex";
import md5 from "md5";
import {
  checkMasterPassword,
  addBcnaSession,
  getMasterPassword,
  addMasterPassword,
  removeMasterPassword,
  getSessionTimeOut,
  setSessionTimeOut,
} from "@/libs/storage.js";

export default {
  data() {
    return {
      form: false,
      passWord: "",
      dialogImport: false,
      dialogMasterPassword: false,
      name: "",
      mnemonic: "",
      password: "",
      select: "",
      items: [],
      alertError: false,
      alertDelete: false,
      alertExpired: false,
      passExist: false,
      badMasterPass: false,
      masterPass: "",
      masterPass2: "",
      maxMasterPass: false,
      checkCameraPermissions: false,
      passRules: [
        (v) => !!v || this.$t("login.errorFormPassRequired"),
        (v) => (v && v.length <= 20) || this.$t("login.errorFormPassLength"),
      ],
    };
  },
  computed: {
    ...mapState(["allWallets", "isLogged", "sessionMax"]),
  },
  async mounted() {
    App.addListener("backButton", (data) => {
      //console.log('backButton:', data);
      if (this.$route.name === "Login") {
        App.exitApp();
      }
    });
    await this.$store.dispatch("getWallets");
    if (typeof this.$route.query.expired !== "undefined") {
      this.alertExpired = true;
    }

    let existPass = await getMasterPassword();
    if (existPass) this.passExist = existPass;

    //const testCamera = await Camera.checkPermissions()
    //this.checkCameraPermissions = testCamera.camera === 'granted' ? false : true
  },
  methods: {
    async openDialogMasterPassword() {
      this.masterPass = "";
      this.masterPass2 = "";
      this.dialogMasterPassword = true;
      this.maxMasterPass = false;
      this.badMasterPass = false;
    },
    async login() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        this.maxMasterPass = true;
        return;
      }
      const hash = md5(this.passWord);
      let checkPass = await checkMasterPassword(hash);
      if (checkPass) {
        getSessionTimeOut().then((sessionTimeOut) => {
          if (sessionTimeOut === null) {
            setSessionTimeOut("300"); // 5 minutes
          }
        });
        await addBcnaSession();
        this.$store.commit("setIsLogged", checkPass);

        await this.$store.dispatch("setCurrency");
        await this.$store.dispatch("getPriceNow");

        this.$router.push("/dashboard");
      } else {
        this.alertError = true;
      }
    },
    async saveMasterPassword() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        this.maxMasterPass = true;
        return;
      }
      if (this.masterPass == this.masterPass2) {
        await addMasterPassword(this.masterPass);
        this.dialogMasterPassword = false;
        // Refresh pass exist
        let existPass = await getMasterPassword();
        this.passExist = existPass;
      } else this.badMasterPass = true;
    },
    async removePassword() {
      await removeMasterPassword();
      // Refresh pass exist
      let existPass = await getMasterPassword();
      this.passExist = existPass;
    },
  },
};
</script>
<style>
/* #login {
  background: linear-gradient(black 70%, #3CC194);
  min-width: 100%;
  min-height: 100%;
  width: 100%;
  height: auto;
  position: fixed;
} */
</style>
