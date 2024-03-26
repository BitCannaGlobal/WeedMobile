<template>
  <v-list bg-color="black" lines="two" class="mt-9 ma-4">
    <v-list-subheader>{{ $t("config.subheader.general") }}</v-list-subheader>
    <!-- <Accounts />  -->
    <v-list-item
      :title="$t('config.currency.title')"
      :subtitle="$t('config.currency.subtitle')"
      @click.stop="changeCurrency = !changeCurrency"
    >
      <template v-slot:prepend>
        <v-avatar>
          <v-icon color="#33ffc9">mdi-currency-usd</v-icon>
        </v-avatar>
      </template>

      <template v-slot:append>
        <v-btn
          color="grey-lighten-1"
          icon="mdi-chevron-right"
          variant="text"
          @click.stop="changeCurrency = !changeCurrency"
        ></v-btn>
      </template>
    </v-list-item>
    <v-list-item
      :title="$t('config.language.title')"
      :subtitle="$t('config.language.subtitle')"
      @click.stop="changeLang = !changeLang"
    >
      <template v-slot:prepend>
        <v-avatar>
          <v-icon color="#33ffc9">mdi-translate-variant</v-icon>
        </v-avatar>
      </template>

      <template v-slot:append>
        <v-btn
          color="grey-lighten-1"
          icon="mdi-chevron-right"
          variant="text"
          @click.stop="changeLang = !changeLang"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-subheader>{{ $t("config.subheader.privacy") }}</v-list-subheader>
    <v-list-item
      :title="$t('config.masterPassChange.title')"
      :subtitle="$t('config.masterPassChange.subtitle')"
      @click="openChangeMasterPass()"
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
          @click="openChangeMasterPass()"
        ></v-btn>
      </template>
    </v-list-item>
    <v-list-item
      :title="$t('config.autoLogout.title')"
      :subtitle="$t('config.autoLogout.subtitle') + ' (' + timeout.state + ')'"
      @click="openSetTimeOut()"
    >
      <template v-slot:prepend>
        <v-avatar>
          <v-icon color="#33ffc9">mdi-clock-time-eight-outline</v-icon>
        </v-avatar>
      </template>

      <template v-slot:append>
        <v-btn
          color="grey-lighten-1"
          icon="mdi-chevron-right"
          variant="text"
          @click="openSetTimeOut()"
        ></v-btn>
      </template>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item
      :title="$t('config.appInfo.title')"
      :subtitle="$t('config.appInfo.subtitle')"
      @click.stop="openAppInfo()"
    >
      <template v-slot:prepend>
        <v-avatar>
          <v-icon color="#33ffc9">mdi-information-outline</v-icon>
        </v-avatar>
      </template>

      <template v-slot:append>
        <v-btn
          color="grey-lighten-1"
          icon="mdi-chevron-right"
          variant="text"
          @click.stop="openAppInfo()"
        ></v-btn>
      </template>
    </v-list-item>

    <!-- <v-list-item
      title="Import wallet"
      subtitle="Only for dev mode"
      @click.stop="openImportDebugMnenomic()"
    >
    <template v-slot:prepend>
        <v-avatar>
          <v-icon color="#c409bb">mdi-swap-vertical-bold</v-icon>
        </v-avatar>
      </template>

      <template v-slot:append>
        <v-btn
          color="grey-lighten-1"
          icon="mdi-chevron-right"
          variant="text"
          @click.stop="openImportDebugMnenomic()"
        ></v-btn>
      </template>
    </v-list-item>   -->
  </v-list>
  <!-- start modal -->
  <div class="text-center">
    <v-bottom-sheet v-model="changeLang" inset>
      <v-card class="text-center bitcannaFont" height="200">
        <v-card-text>
          <v-btn variant="text" @click="changeLang = !changeLang">
            {{ $t("config.language.close") }}
          </v-btn>

          <br />
          <br />

          <v-select
            v-model="$i18n.locale"
            :label="$t('config.language.title')"
            :items="$i18n.availableLocales"
            :item-title="'locale-' + locale"
            :item-value="locale"
            variant="outlined"
          ></v-select>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
  <div class="text-center">
    <v-bottom-sheet v-model="changeCurrency" inset>
      <v-card class="text-center bitcannaFont" height="200">
        <v-card-text>
          <v-btn variant="text" @click="changeCurrency = !changeCurrency">
            {{ $t("config.currency.close") }}
          </v-btn>

          <br />
          <br />

          <v-select
            v-model="selectCurrency"
            :label="$t('config.currency.title')"
            :items="['USD', 'EUR']"
            variant="outlined"
          ></v-select>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>

  <div class="text-center">
    <v-bottom-sheet v-model="importDebugMnenomic" inset>
      <v-card class="text-center" height="200">
        <v-card-text>
          <v-btn
            variant="text"
            @click="importDebugMnenomic = !importDebugMnenomic"
          >
            {{ $t("config.language.close") }}
          </v-btn>

          <br />

          <v-alert
            v-model="alertImported"
            class="ma-4"
            variant="outlined"
            type="success"
            border="top"
            closable
            close-label="Close Alert"
          >
            Wallets imported!
          </v-alert>
          <v-text-field
            v-model="password"
            variant="outlined"
            color="#00b786"
            label="Password"
            style="min-height: 96px"
            type="password"
            class="mt-6"
          ></v-text-field>
          <v-btn
            v-if="enableButton"
            class="flex-grow-1"
            color="#00b786"
            block
            @click="importDebugMnenomicNow()"
          >
            Import
          </v-btn>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>

  <v-dialog
    v-model="dialogChangeMasterPass"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
    :class="operatingSystem === 'ios' ? 'mt-9 bitcannaFont' : 'bitcannaFont'"
  >
    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>{{
          $t("config.masterPassChange.title")
        }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-list lines="two" subheader>
        <v-list-item
          :title="$t('addressBook.info')"
          :subtitle="$t('config.masterPassChange.subtitle')"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item>
          <div v-if="!masterPasswordFinish">
            <div v-if="!masterPasswordChanging">
              <v-text-field
                v-if="!enableButton"
                v-model="password"
                variant="outlined"
                color="#00b786"
                :label="$t('config.masterPassChange.password1')"
                style="min-height: 96px"
                type="password"
                class="mt-6"
              ></v-text-field>
              <v-text-field
                v-if="enableButton"
                v-model="newPassword1"
                variant="outlined"
                color="#00b786"
                :label="$t('config.masterPassChange.password2')"
                style="min-height: 96px"
                type="password"
                class="mt-6"
              ></v-text-field>
              <v-text-field
                v-if="enableButton"
                v-model="newPassword2"
                variant="outlined"
                color="#00b786"
                :label="$t('config.masterPassChange.password3')"
                style="min-height: 96px"
                type="password"
                class="mt-6"
              ></v-text-field>
              <v-btn
                v-if="enableButton"
                class="flex-grow-1"
                color="#00b786"
                block
                @click="changeMassterPass()"
              >
                {{ $t("config.masterPassChange.btnChange") }}
              </v-btn>
              <v-btn
                class="mt-4"
                block
                color="red"
                @click="dialogChangeMasterPass = false"
              >{{ $t("config.currency.close") }}</v-btn>
            </div>
          </div>
        </v-list-item>
        <v-list-item>
          <v-row
            v-if="masterPasswordChanging"
            class="fill-height"
            align-content="center"
            justify="center"
          >
            <v-col class="text-subtitle-1 text-center" cols="12">
              {{ $t("config.masterPassChange.progress") }}
            </v-col>
            <v-col cols="6">
              <v-progress-linear
                color="#00b786"
                indeterminate
                rounded
                height="9"
              ></v-progress-linear>
            </v-col>
          </v-row>
          <v-row
            v-if="masterPasswordFinish"
            class="fill-height"
            align-content="center"
            justify="center"
          >
            <v-col class="text-subtitle-1 text-center" cols="12">
              {{ $t("config.masterPassChange.success") }}
              <br /><br />
              <v-btn color="#00b786" @click="dialogChangeMasterPass = false">
                {{ $t("config.masterPassChange.close") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item> </v-list-item>
        <v-list-item> </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="dialogSetTimeOut"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
    :class="operatingSystem === 'ios' ? 'mt-9 bitcannaFont' : 'bitcannaFont'"
  >
    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>{{ $t("config.timeout.title") }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-list lines="two" subheader>
        <v-list-item
          :title="$t('addressBook.info')"
          :subtitle="$t('config.timeout.subtitle')"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item>
          <div>
            <v-select
              v-model="timeout"
              :label="$t('config.timeout.select')"
              variant="outlined"
              :items="timers"
              item-title="state"
              item-value="key"
              class="mt-4"
            ></v-select>
            <v-btn
              class="flex-grow-1"
              color="#00b786"
              block
              @click="updateTimeout()"
            >
              {{ $t("config.timeout.btnUpdate") }}
            </v-btn>
            <v-btn
              class="mt-4"
              block
              color="red"
              @click="dialogSetTimeOut = false"
            >{{ $t("config.currency.close") }}</v-btn>            
          </div>
        </v-list-item>
        <v-list-item> </v-list-item>
        <v-list-item> </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="dialogAppInfo"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
    :class="operatingSystem === 'ios' ? 'mt-9 bitcannaFont' : 'bitcannaFont'"
  >
    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>{{ $t("config.appInfo.title") }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-list lines="two" subheader>
        <v-list-item
          :title="$t('addressBook.info')"
          :subtitle="$t('config.appInfo.subtitle')"
        >
              <v-btn
                class="mt-4"
                block
                color="red"
                @click="dialogAppInfo = false"
              >{{ $t("config.currency.close") }}</v-btn>      
      </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <h3 class="ml-4 mt-4">{{ $t("config.appInfo.appVersion") }}</h3>
      
      <v-table>
        <tbody>
          <tr>
            <td>{{ $t("config.appInfo.version") }}</td>
            <td>{{ appVersion }}</td>
          </tr>
        </tbody>
      </v-table>
      <v-divider></v-divider>
      
      <h3 class="ml-4 mt-4">{{ $t("config.appInfo.deviceInfo") }}</h3>
      <v-table>
        <tbody>
          <tr v-for="(value, name) in deviceInfo" :key="name">
            <td>{{ name }}</td>
            <td>{{ value }}</td>
          </tr>
        </tbody>
        
      </v-table>
      
    </v-card>
    
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import { Preferences } from "@capacitor/preferences";
import { Device } from "@capacitor/device";

import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import Accounts from "@/components/Accounts.vue";
import md5 from "md5";
import {
  removeBcnaSession,
  addAccount,
  editMasterPassword,
  setSessionTimeOut,
  setLanguage,
} from "@/libs/storage.js";
import bitcannaWallets from "../bitcanna.wallet";
import pjson from "@/../package.json";

import { LocalNotifications } from "@capacitor/local-notifications";

export default {
  components: { Accounts },
  data() {
    return {
      drawer: false,
      deleteWallet: false,
      changeLang: false,
      changeCurrency: false,
      selectCurrency: "USD",
      checkbox1: true,
      password: "",
      enableButton: false,
      dialogChangeMasterPass: false,
      dialogSetTimeOut: false,
      importDebugMnenomic: false,
      alertImported: false,
      newPassword1: "",
      newPassword2: "",
      masterPasswordChanging: false,
      masterPasswordFinish: false,
      dialogAppInfo: false,
      appVersion: "",
      deviceInfo: {},
      timeout: {},
      timers: [
        { state: this.$t("config.autoLogout.time.min"), key: "min" },
        { state: this.$t("config.autoLogout.time.min5"), key: "min5" },
        { state: this.$t("config.autoLogout.time.hour"), key: "hour" },
        { state: this.$t("config.autoLogout.time.hours6"), key: "hour6" },
        { state: this.$t("config.autoLogout.time.day"), key: "day" },
      ],
    };
  },
  watch: {
    "$i18n.locale": async function (val) {
      console.log(val);
      setLanguage(val);
      //await Preferences.set({ key: 'lang', value: val });
    },
    password: async function (val) {
      const hash = md5(this.password);
      const { value } = await Preferences.get({ key: "masterPass" });

      console.log(hash, value);
      if (hash === value) {
        this.enableButton = true;
      }
    },
    selectCurrency: async function (val) {
      console.log(val);
      await Preferences.set({ key: "currency", value: val });
      this.$store.dispatch("changeCurrency", val);
      await this.$store.dispatch("getPriceNow");
    },
    notifReceive: async function (val) {
      console.log(val);
      await Preferences.set({ key: "notifReceive", value: val });
    },
    notifPrice: async function (val) {
      console.log(val);
      await Preferences.set({ key: "notifPrice", value: val });
    },
  },
  computed: {
    ...mapState(["allWallets", "accountSelected", "sessionMax", "isLogged", "operatingSystem"]),
  },
  async mounted() {
    if (!this.isLogged) {
      removeBcnaSession();
      this.$store.commit("setIsLogged", false);
      this.$router.push("/");
      return;
    }

    const { value } = await Preferences.get({ key: "currency" });
    this.selectCurrency = value;
    this.displayTimeout();

    console.log(pjson.version);
    this.appVersion = pjson.version;

    const info = await Device.getInfo();
    this.deviceInfo = info;

    const notifReceive = await Preferences.get({ key: "notifReceive" });
    this.notifReceive = notifReceive.value === "true" ? true : false;
    const notiPrice = await Preferences.get({ key: "notifPrice" });
    this.notifPrice = notiPrice.value === "true" ? true : false;
  },
  methods: {
    async testNotification() {
      this.dialogNotification = true;
      /* LocalNotifications.requestPermissions().then((result) => {
        if (result.granted) {
          console.log('testNotificationGranted')
        } else {
          console.log('testNotificationDenied')
        }
      });
      console.log('testNotification')
      LocalNotifications.schedule({
        notifications: [
          {
            title: "Hello",
            body: "World",
            id: 1,
            schedule: { at: new Date(Date.now() + 1000 * 5) },
            sound: null,
            attachments: null,
            actionTypeId: "",
            extra: null
          }
        ]
      });
      console.log(await LocalNotifications.getPending()) */
    },
    async changeMassterPass() {
      if (this.newPassword1 === this.newPassword2) {
        this.masterPasswordChanging = true;
        await editMasterPassword(this.password, this.newPassword1);
        await this.$store.dispatch("getWallets");
        this.masterPasswordChanging = false;
        this.masterPasswordFinish = true;
      }
    },
    openAppInfo() {
      this.dialogAppInfo = true;
    },
    openSetTimeOut() {
      this.dialogSetTimeOut = true;
      this.displayTimeout();
    },
    openImportDebugMnenomic() {
      this.alertImported = false;
      this.importDebugMnenomic = true;
    },
    openChangeMasterPass() {
      this.masterPass = "";
      this.masterPass2 = "";
      this.enableButton = false;
      this.password = "";
      this.masterPasswordFinish = false;
      this.dialogChangeMasterPass = true;
    },
    async updateTimeout() {
      let finalTimeout = 0;
      switch (this.timeout) {
        case "min":
          finalTimeout = 60;
          this.timeout = {
            state: this.$t("config.autoLogout.time.min"),
            key: "min",
          };
          break;
        case "min5":
          finalTimeout = 300;
          this.timeout = {
            state: this.$t("config.autoLogout.time.min5"),
            key: "min5",
          };
          break;
        case "hour":
          finalTimeout = 3600;
          this.timeout = {
            state: this.$t("config.autoLogout.time.hour"),
            key: "hour",
          };
          break;
        case "hour6":
          finalTimeout = 21600;
          this.timeout = {
            state: this.$t("config.autoLogout.time.hours6"),
            key: "hour6",
          };
          break;
        case "day":
          finalTimeout = 86400;
          this.timeout = {
            state: this.$t("config.autoLogout.time.day"),
            key: "day",
          };
          break;
      }
      await this.$store.dispatch("updateDefaultTimeout", finalTimeout);
      await setSessionTimeOut(finalTimeout);
      this.dialogSetTimeOut = false;
    },
    async displayTimeout() {
      const { value } = await Preferences.get({ key: "bcnaTimeout" });
      switch (Number(value)) {
        case 60:
          this.timeout = {
            state: this.$t("config.autoLogout.time.min"),
            key: "min",
          };
          break;
        case 300:
          this.timeout = {
            state: this.$t("config.autoLogout.time.min5"),
            key: "min5",
          };
          break;
        case 3600:
          this.timeout = {
            state: this.$t("config.autoLogout.time.hour"),
            key: "hour",
          };
          break;
        case 21600:
          this.timeout = {
            state: this.$t("config.autoLogout.time.hours6"),
            key: "hour6",
          };
          break;
        case 86400:
          this.timeout = {
            state: this.$t("config.autoLogout.time.day"),
            key: "day",
          };
          break;
      }
    },
    async importDebugMnenomicNow() {
      const hash = md5(this.password);
      const { value } = await Preferences.get({ key: "masterPass" });

      console.log(hash, value);
      if (hash !== value) {
        this.alertError = true;
        return;
      }
      for (let i = 0; i < bitcannaWallets.length; i++) {
        const element = bitcannaWallets[i];
        console.log(element);
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
          element.mnenomic,
          {
            prefix: "bcna",
          },
        );
        var finalWallet = await wallet.serialize(this.password);
        var finalAddress = await wallet.getAccounts();

        await addAccount(element.name, finalAddress[0].address, finalWallet);
      }
      this.alertImported = true;
    },
  },
};
</script>
