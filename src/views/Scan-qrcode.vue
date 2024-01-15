<template>
  <div v-if="txSend === false" class="ma-4">
    <div v-if="!checkCameraPermissions">
      <v-alert
        v-if="isLoaded" 
        variant="outlined"
        type="warning"
        border="top"
        closable
        close-label="Close Alert"
      >
      {{ $t("scanQrcode.errorCamera.title") }}<br />
      {{ $t("scanQrcode.errorCamera.android") }}<br />
      {{ $t("scanQrcode.errorCamera.ios") }}
      </v-alert>
    </div>
    <div v-if="!checkCameraPermissions" class="d-flex justify-center mt-6">
      <v-btn v-if="!viewErrorAuthCam" @click="addAuthorisatoin()">
        {{ $t("scanQrcode.addAuthCam") }}
      </v-btn>
      <br /> 
    </div>
    <qrcode-stream v-if="!removeScan" :track="selected.value" @error="logErrors" />  
    <div v-if="removeScan">
    <v-alert 
      v-if="JSON.parse(result).amount > spendableBalances" 
      text="$t('scanQrcode.scanned.error')" 
      type="error"
      class="mb-4"
    ></v-alert>
    </div>
    <v-table v-if="removeScan">     
    <tbody> 
      <tr>
        <td>{{ $t("scanQrcode.scanned.address") }}</td> 
        <td>{{ this.truncateString(JSON.parse(result).address, 15) }}</td> 
      </tr>
      <tr>
        <td>{{ $t("scanQrcode.scanned.amount") }}</td> 
        <td>{{ JSON.parse(result).amount }}</td>
      </tr>
      <tr>
        <td>{{ $t("scanQrcode.scanned.memo") }}</td> 
        <td>{{ JSON.parse(result).memo }}</td>
      </tr>
    </tbody>
    </v-table>
    <v-alert
      v-model="alertError"
      class="mt-4"
      variant="outlined"
      type="warning"
      border="top"
      closable
      close-label="Close Alert"
    >
      {{ $t("scanQrcode.scanned.badPass") }}
    </v-alert>
    <v-text-field
      v-if="removeScan"
      v-model="password"
      variant="outlined"
      color="#00b786" 
      :label="$t('scanQrcode.scanned.password')" 
      type="password"
      class="mt-4"
    ></v-text-field>
    <v-btn 
      v-if="removeScan" 
      block 
      color="#0FB786" 
      :disabled="loading"
      :loading="loading"
      @click="sendTx()">
        {{ $t("scanQrcode.scanned.btnSend") }}
    </v-btn>

    <v-btn 
      v-if="removeScan"
      class="mt-2"
      block 
      color="orange" 
      @click="retry()"> 
      {{ $t("scanQrcode.scanned.rescan") }}
    </v-btn>
  </div>
  <v-card v-else height="550"  class="txReturn text-center grey d-flex flex-column align-center justify-top mt-10"> 
          <v-icon
          size="100"
          color="#0FB786"
          icon="mdi-check-outline"
          class="returnIconQr"
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
              to="/dashboard"
              block
            >{{ $t('approved.back') }}</v-btn>
          </v-card-text>
        </v-card> 
      </v-card>
</template>

<script> 
import { mapState } from 'vuex'
import { Camera } from '@capacitor/camera';
import { Device } from '@capacitor/device';
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsDeliverTxSuccess, SigningStargateClient, GasPrice } from "@cosmjs/stargate";
import { Preferences } from '@capacitor/preferences';
import bitcannaConfig from '../bitcanna.config' 
import md5 from 'md5' 
import bech32 from "bech32";

export default { 

  data() {
    const removeScan = false
    const options = [
      //{ text: 'nothing (default)', value: undefined },
      // { text: 'outline', value: this.paintOutline },
      //{ text: 'centered text', value: this.paintCenterText },
      { text: 'bounding box', value: this.paintBoundingBox }
    ]

    const selected = options[0]
    let result = ''
    let password = ''
    let txSend = false
    let alertError = false
    let loading = false
    let checkCameraPermissions = false
    let viewErrorAuthCam = false
    let isLoaded = false

    return { selected, options, result, removeScan, password, txSend, alertError, loading, checkCameraPermissions, viewErrorAuthCam, isLoaded }
  },
  computed: {
    ...mapState(['allWallets', 'spendableBalances', 'accountSelected', 'network'])
  },
  async mounted() {
    const testCamera = await Camera.checkPermissions()
    this.checkCameraPermissions = testCamera.camera === 'granted' ? true : false
    if(this.checkCameraPermissions === false) {
      // this.addAuthorisatoin()
      const info = await Device.getInfo();
      if (info.operatingSystem === 'ios') {
        this.viewErrorAuthCam = true
      } else {
        this.viewErrorAuthCam = false
      }
    }
    this.isLoaded = true

  },
  methods: {
    addAuthorisatoin() {
      Camera.requestPermissions().then(async (result, callback) => {
        const testCamera = await Camera.checkPermissions() 
        this.checkCameraPermissions = testCamera.camera === 'granted' ? false : true        
      })
    },
    retry() {
      this.removeScan = false
      this.result = ''
    },
    async sendTx() {

      const hash = md5(this.password); 
      const { value } = await Preferences.get({ key: 'masterPass' });

      if(hash !== value) {
        this.alertError = true
        return
      } else 
        this.alertError = false

      this.loading = true

      const deserialized = await DirectSecp256k1HdWallet.deserialize(this.allWallets[this.accountSelected].data, this.password);      
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(deserialized.secret.data, {
        prefix: 'bcna'
      });
      const [accounts] = await wallet.getAccounts();
 
      const client = await SigningStargateClient.connectWithSigner(
        bitcannaConfig[this.network].rpcURL, 
        wallet,
        {
          gasPrice: GasPrice.fromString(
            bitcannaConfig[this.network].gasPrice +
            bitcannaConfig[this.network].coinLookup.chainDenom
          ),
        }
      );     

      const convertAmount = Math.round(JSON.parse(this.result).amount * 1000000);
      const amount = {
        denom: bitcannaConfig[this.network].coinLookup.chainDenom,
        amount: convertAmount.toString(),
      };
      console.log(amount)
      try {
        const result = await client.sendTokens(
          accounts.address,
          JSON.parse(this.result).address,
          [amount],
          "auto",
          this.memo
        ); 
        assertIsDeliverTxSuccess(result);
        console.log(result); 
        this.txSend = true
        this.loading = false
        this.accountNow = this.allWallets[this.accountSelected]
        await this.$store.dispatch('getBankModule', this.accountNow.address)
        await this.$store.dispatch('getDistribModule', this.accountNow.address)
        await this.$store.dispatch('getStakingModule', this.accountNow.address)
        await this.$store.dispatch('getWalletAmount')

      } catch (error) {
        console.error(error); 
      }
    },
    paintOutline(detectedCodes, ctx) { 
      for (const detectedCode of detectedCodes) {
        this.result = detectedCode.rawValue
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'green'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    },

    paintBoundingBox(detectedCodes, ctx) { 
      for (const detectedCode of detectedCodes) {
        this.result = detectedCode.rawValue
        this.removeScan = true
        const {
          boundingBox: { x, y, width, height }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#00b786' 
        ctx.strokeRect(x, y, width, height)
      }
    },
    truncateString(str, num) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    },
    logErrors: console.error
  }
}
</script>
<style>
  .returnIconQr {
    margin-top: 80px;
  } 
</style>