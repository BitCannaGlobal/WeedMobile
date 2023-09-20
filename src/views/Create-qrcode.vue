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
        <td>Address</td> 
        <td>{{ this.truncateString(JSON.parse(finalQr).address, 15) }}</td> 
      </tr>
      <tr>
        <td>Amount</td> 
        <td>{{ JSON.parse(finalQr).amount }}</td>
      </tr>
      <tr>
        <td>Memo</td> 
        <td>{{ JSON.parse(finalQr).memo }}</td>
      </tr>
    </tbody>
  </v-table>
  <br />
        <v-btn 
          v-if="finalQr !== ''"
          block 
          color="#0FB786" 
          @click="backQrcode()">Back</v-btn>
  </div>



 
 
 <div v-if="finalQr == ''" >
        <h3 class="ma-4">Qr code generator</h3>
        <v-divider></v-divider>
        <v-list style="background-color: rgb(0, 0, 0);">
 
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
                variant="outlined"
                color="#00b786" 
                label="Recipient" 
                class="mt-4"
            ></v-text-field>
          </v-list-item> 
          <v-list-item>
            <v-text-field
                v-model="amount"
                variant="outlined"
                color="#00b786" 
                label="Amount" 
                type="number"
                class="mt-2" 
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field
                v-model="memo"
                variant="outlined"
                color="#00b786" 
                label="Memo" 
                class="mt-2"
            ></v-text-field>
          </v-list-item>
 
          <v-list-item>
            <v-btn 
              block 
              color="#0FB786" 
              @click="generateQr()">generate</v-btn>
          </v-list-item>
        </v-list>        
 
      </div>


</template>

<script>
import QRCodeVue3 from "qrcode-vue3";

export default {
  name: 'QRCodeVue3Example',
  components: {
    QRCodeVue3
  },
  data() {
    return {
      recipient: '',
      amount: '',
      memo: '', 
      loading: false,
      finalQr: '',
    }
  },
  methods: {
    backQrcode() {
      this.finalQr = ''
    },
    setAddress(address) {
      this.recipient = address;
    },
    generateQr() {
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