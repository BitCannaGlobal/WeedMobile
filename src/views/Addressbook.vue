<template>
  <v-card class="mt-9 ma-4" color="black">
    <v-row>
      <v-col cols="12">
        <v-btn block color="#0FB786" @click="openDial()">
          {{ $t("addressBook.btnAdd") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>

  <v-card v-for="(item, index) in allContacts" class="ma-4">
    <v-list v-if="allContacts.length > 0" lines="two">
      <v-list-item
        :key="item.name"
        :title="item.memo ? item.name + ' (' + item.memo + ')' : item.name"
        :subtitle="truncateString(item.address, 20)"
        @click="openEditDialog(index, item)"
      >
        <template v-slot:prepend>
          <v-avatar color="#0FB786">
            <v-icon color="white">mdi-account</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="red"
            icon="mdi-close-box"
            variant="text"
            @click.stop="removeContact(index)"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>

  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
      class="bitcannaFont mt-9"
    >
      <v-card>
        <v-form ref="form">
          <v-toolbar dark>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ $t("addressBook.title") }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list lines="two" subheader>
            <v-list-item
              :title="$t('addressBook.info')"
              :subtitle="$t('addressBook.subtitle')"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>
          <v-list>
            <v-list-item>
              <v-text-field
                v-model="name"
                counter="20"
                :rules="nameRules"
                variant="outlined"
                color="#00b786"
                :label="$t('addressBook.name')"
                class="mt-2"
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-text-field
                v-model="recipient"
                :rules="addressRules"
                variant="outlined"
                color="#00b786"
                :label="$t('addressBook.address')"
                class="mt-4"
              >
                <template v-slot:append>
                  <v-icon icon="mdi-qrcode-scan" @click="scanNow()" />
                </template>
              </v-text-field>
            </v-list-item>
            <v-list-item>
              <v-text-field
                v-model="memo"
                counter="100"
                :rules="memoRules"
                variant="outlined"
                color="#00b786"
                :label="$t('addressBook.memo')"
                class="mt-4"
              ></v-text-field>
            </v-list-item>
            <qrcode-stream
              v-if="removeScan"
              :track="paintBoundingBox"
              @error="logErrors"
            />
            <v-list-item>
              <v-btn
                block
                color="#0FB786"
                :disabled="loading"
                :loading="loading"
                @click="addContact()"
                >{{ $t("addressBook.btnAddContact") }}</v-btn
              >
            </v-list-item>
          </v-list>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogEdit"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
      class="bitcannaFont mt-9"
    >
      <v-card>
        <v-form ref="form">
          <v-toolbar dark>
            <v-btn icon dark @click="dialogEdit = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{
              $t("addressBook.edit.title")
            }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list lines="two" subheader>
            <v-list-item
              :title="$t('addressBook.info')"
              :subtitle="$t('addressBook.edit.subtitle')"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>
          <v-list>
            <v-list-item>
              <v-text-field
                v-model="name"
                counter="20"
                :rules="nameRules"
                variant="outlined"
                color="#00b786"
                :label="$t('addressBook.name')"
                class="mt-2"
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-text-field
                v-model="recipient"
                :rules="addressRules"
                variant="outlined"
                color="#00b786"
                :label="$t('addressBook.address')"
                class="mt-4"
              >
                <template v-slot:append>
                  <v-icon icon="mdi-qrcode-scan" @click="scanNow()" />
                </template>
              </v-text-field>
            </v-list-item>
            <v-list-item>
              <v-text-field
                v-model="memo"
                counter="100"
                :rules="memoRules"
                variant="outlined"
                color="#00b786"
                :label="$t('addressBook.memo')"
                class="mt-4"
              ></v-text-field>
            </v-list-item>
            <qrcode-stream
              v-if="removeScan"
              :track="paintBoundingBox"
              @error="logErrors"
            />
            <v-list-item>
              <v-btn
                block
                color="#0FB786"
                :disabled="loading"
                :loading="loading"
                @click="editContact()"
                >{{ $t("addressBook.edit.title") }}</v-btn
              >
            </v-list-item>
          </v-list>
        </v-form>
      </v-card>
    </v-dialog>

    <v-bottom-sheet v-model="dialDeleteContact" inset>
      <v-card class="text-center">
        <v-card-text>
          <v-btn variant="text" @click="dialDeleteContact = !dialDeleteContact">
            {{ $t("addressBook.delete.close") }}
          </v-btn>
          <v-alert
            v-if="deletedContact"
            variant="outlined"
            elevation="2"
            type="success"
            class="m-4"
          >
            {{ $t("addressBook.delete.title") }}
          </v-alert>

          <v-checkbox
            v-if="!deletedContact"
            v-model="checkbox1"
            :label="$t('addressBook.delete.agree')"
          ></v-checkbox>
          <v-btn
            v-if="!deletedContact && checkbox1"
            color="red"
            block
            @click="removeContactNow"
          >
            {{ $t("addressBook.delete.title") }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </v-row>
</template>
<script>
import { mapState } from "vuex";
import bech32 from "bech32";
import {
  addContact,
  getAllContact,
  removeContactId,
  editContactId,
  removeBcnaSession,
} from "@/libs/storage.js";

function bech32Validation(address) {
  try {
    bech32.decode(address);
    return true;
  } catch (error) {
    return false;
  }
}

export default {
  data() {
    return {
      dialog: false,
      dialogEdit: false,
      dialDeleteContact: false,
      contactId: "",
      notifications: false,
      removeScan: false,
      deletedContact: false,
      checkbox1: false,
      recipient: "",
      allContacts: [],
      name: "",
      memo: "",
      nameRules: [
        (v) => !!v || this.$t("addressBook.errorNameRequire"),
        (v) => (v && v.length <= 20) || this.$t("addressBook.errorNameLength"),
      ],
      addressRules: [
        (v) => !!v || this.$t("addressBook.errorAddrRequire"),
        (v) => v.startsWith("bcna") || this.$t("addressBook.errorPrefix"),
        (v) => bech32Validation(v) || this.$t("addressBook.errorBech32"),
      ],
      memoRules: [(v) => v.length <= 100 || this.$t("addressBook.errorMemo")],
      files: [
        {
          color: "#0FB786",
          icon: "mdi-account",
          subtitle: "bcna13jawsn574rf3f0u5rhu7e8n6sayx5gkwgusz73",
          title: "atmon3r",
        },
        {
          color: "#0FB786",
          icon: "mdi-account",
          subtitle: "bcna148ml2tghqkfvzj8q27dlxw6ghe3vlmprhru76x",
          title: "Wallet1",
        },
      ],
    };
  },
  watch: {
    recipient(val) {
      this.recipient = val.toLowerCase();
    },
  },
  computed: {
    ...mapState(["isLogged"]),
  },
  async mounted() {
    if (!this.isLogged) {
      removeBcnaSession();
      this.$store.commit("setIsLogged", false);
      this.$router.push("/");
      return;
    }
    let getAllContacts = await getAllContact();
    this.allContacts = JSON.parse(getAllContacts);
  },
  methods: {
    removeContact(index) {
      //removeContactId(index)
      //this.allContacts.splice(index, 1)
      this.dialDeleteContact = true;
    },
    removeContactNow() {
      removeContactId(this.contactId);
      this.allContacts.splice(this.contactId, 1);
      this.dialDeleteContact = false;
      this.deletedContact = true;
    },
    openDial() {
      this.dialog = true;
      this.name = "";
      this.recipient = "";
      this.memo = "";
      this.removeScan = false;
    },
    openEditDialog(index, item) {
      console.log(item);
      this.dialogEdit = true;
      this.contactId = index;
      this.name = item.name;
      this.recipient = item.address;
      this.memo = item.memo;
      this.removeScan = false;
    },
    async addContact() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        return;
      }

      this.dialog = false;
      await addContact(this.name, this.recipient, this.memo);
      let getAllContacts = await getAllContact();
      this.allContacts = JSON.parse(getAllContacts);
    },
    async editContact() {
      await editContactId(this.contactId, this.name, this.recipient, this.memo);
      this.dialogEdit = false;

      let getAllContacts = await getAllContact();
      this.allContacts = JSON.parse(getAllContacts);
    },
    scanNow() {
      this.removeScan = true;
    },
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        this.result = detectedCode.rawValue;
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

        ctx.strokeStyle = "green";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },

    paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        this.recipient = detectedCode.rawValue;
        this.removeScan = false;
        const {
          boundingBox: { x, y, width, height },
        } = detectedCode;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#00b786";
        ctx.strokeRect(x, y, width, height);
      }
    },
    truncateString(str, num) {
      if (str.length <= num) {
        return str;
      }
      return str.slice(0, num) + "...";
    },
  },
};
</script>
