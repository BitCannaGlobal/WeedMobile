<template>
  <div class="ma-4" v-if="finalQr !== ''" align="center"> 
   <QRCodeVue3
          
          :width="300"
          :height="300"
          :value="finalQr"
          :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
          :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
          :dotsOptions="{
            type: 'classy-rounded',
            color: '#00b786',
            gradient: {
              type: 'linear',
              rotation: 0,
              colorStops: [
                { offset: 0, color: '#00b786' },
                { offset: 1, color: '#00b786' },
              ],
            },
          }"
          :backgroundOptions="{ color: '#ffffff' }"
          :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
          :cornersDotOptions="{ type: undefined, color: '#000000' }"
 
        />
        <v-table>
 
    <tbody> 
      <tr>
        <td>{{ $t('createQrcode.recipient') }}</td> 
        <td>{{ this.truncateString(JSON.parse(finalQr).address, 15) }}</td> 
      </tr>
      <tr>
        <td>{{ $t('createQrcode.amount') }}</td> 
        <td>{{ JSON.parse(finalQr).amount }}</td>
      </tr>
      <tr>
        <td>{{ $t('createQrcode.memo') }}</td> 
        <td>{{ JSON.parse(finalQr).memo }}</td>
      </tr>
    </tbody>
  </v-table>
  <br />
        <v-btn 
          v-if="finalQr !== ''"
          block 
          color="#0FB786" 
          @click="backQrcode()">{{ $t('createQrcode.btnBack') }}</v-btn>
  </div>



 
 
 <div v-if="finalQr == ''" >
        <h3 class="ma-4">{{ $t("createQrcode.title") }} </h3>
        <v-divider></v-divider>
        <v-list style="background-color: rgb(0, 0, 0);">
          <v-form ref="form">
        <v-list-item color="black" >
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
                :label="$t('createQrcode.recipient')" 
                class="mt-4"
                append-inner-icon="mdi-book-open-page-variant-outline"
                @click:append-inner="getAddressBook()"
            ></v-text-field>
          </v-list-item> 
          <v-list-item>
            <v-row>
              <v-col
                cols="6"
              >

              <v-text-field
                      v-model="amountFiat"
                      :rules="amountRules"
                      variant="outlined"
                      color="#00b786" 
                      :label="$t('createQrcode.amount')" 
                      type="number"
                      inputmode="decimal"
                      class="mt-2" 
                  ></v-text-field> 
              </v-col>
              <v-col
                cols="6"
              >
              <v-select
            v-model="selectCurrency"
            :label="$t('createQrcode.currency')"
            variant="outlined"
            :items="['USD', 'EUR']"
            class="mt-2" 
          ></v-select> 
              </v-col>
            </v-row> 
            <v-row>
              <v-col
                cols="6"
              >

              <v-text-field
                      v-model="amount"
                      :rules="amountRules"
                      variant="outlined"
                      color="#00b786" 
                      :label="$t('createQrcode.amount')"  
                      type="number"
                      inputmode="decimal"
                      class="mt-2" 
                      readonly
                  ></v-text-field> 
              </v-col>
              <v-col
                cols="6"
              >
              <v-text-field
                      value="BCNA" 
                      variant="outlined"
                      color="#00b786"   
                      class="mt-2" 
                      readonly
                  ></v-text-field>
              </v-col>
            </v-row> 
          </v-list-item>
          <v-list-item>
            <v-text-field
                v-model="memo"
                variant="outlined"
                color="#00b786" 
                :label="$t('createQrcode.memo')" 
                class="mt-2"
            ></v-text-field>
          </v-list-item> 
          <v-list-item>
            <v-btn 
              block 
              color="#0FB786" 
              @click="generateQr()">generate</v-btn>
          </v-list-item>
        </v-form>
        </v-list>        
 
      </div>

      <v-dialog
      v-model="dialogAddressBook"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
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
          <v-toolbar-title>{{ $t('createQrcode.selectContact') }}</v-toolbar-title>
          <v-spacer></v-spacer>
 
        </v-toolbar>
        <v-card
          v-for="(item, i) in allWallets"
          class="ma-4" 
          :title="item.name"
          :subtitle="item.address"
          @click="selectContact(i)"
        >
 
        </v-card>
    </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import axios from "axios";
import QRCodeVue3 from "qrcode-vue3";
import bech32 from "bech32";
import { Preferences } from '@capacitor/preferences';
import { getAllContact } from '@/libs/storage.js';

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
  name: 'QRCodeVue3Example',
  components: {
    QRCodeVue3
  },
  data() {
    return {
      form: false,
      recipient: '',
      amount: '',
      amountFiat: '',
      memo: '', 
      loading: false,
      finalQr: '',
      dialogAddressBook: false,
      allContacts: [],
      selectCurrency: '',
      getConvertPrices: '',
      amountRules: [
        (v) => !!v || this.$t('createQrcode.rules.amountRequire'),
        (v) => !isNaN(v) || this.$t('createQrcode.rules.amountNumber'),
        (v) => countPlaces(v) < 7 || this.$t('createQrcode.rules.amountDecimal'),
      ],
      addressRules: [
        (v) => !!v || this.$t('createQrcode.rules.recipientRequire'),
        (v) =>
          v.startsWith('bcna') ||
          this.$t('createQrcode.rules.recipientPrefix'),
        (v) => bech32Validation(v) || this.$t('createQrcode.rules.recipientBech32'),
      ],
    }
  },
  computed: {
    ...mapState([
      'allWallets',
      'priceNow',
      'currencyNow'
    ])
  },
  watch: {
    /*amount: function (val) {
      this.amountFiat = (val * this.priceNow).toFixed(6)
    }, */
    amountFiat: function (val) {
      console.log(this.getConvertPrices.data.bitcanna[this.selectCurrency.toLowerCase()].toFixed(5))      
      this.amount = (val / this.getConvertPrices.data.bitcanna[this.selectCurrency.toLowerCase()].toFixed(5)).toFixed(6)
    },
    selectCurrency: function (val) {
      this.amount = (this.amountFiat / this.getConvertPrices.data.bitcanna[val.toLowerCase()].toFixed(5)).toFixed(6)
    }
  },
  async mounted() { 

    this.getConvertPrices = await axios("https://bcnaracle-api.bitcanna.io/api/all");
    //state.priceNow = getPrice.data.bitcanna[state.currencyNow.toLowerCase()].toFixed(5); 

    let getAllContacts = await getAllContact()
    this.allContacts = JSON.parse(getAllContacts)

    const { value } = await Preferences.get({ key: 'currency'}) 
    this.selectCurrency = value
  },
  methods: {
    getAddressBook() {
      this.dialogAddressBook = true;
    },
    selectContact(index) {
      this.recipient = this.allWallets[index].address
      this.memo = this.allWallets[index].memo
      this.dialogAddressBook = false
    },
    backQrcode() {
      this.finalQr = ''
    },
    setAddress(address) {
      this.recipient = address;
    },
    async generateQr() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) {
        return
      }
      this.finalQr = ''
      let test = JSON.stringify({
        amount: this.amount,
        address: this.recipient,
        memo: this.memo
      })    
      this.finalQr = test
      console.log(this.finalQr)  
    },
    truncateString(str, num) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
  }
}
</script>