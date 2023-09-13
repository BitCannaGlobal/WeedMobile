<template>
  <v-btn  block size="x-large" color="#0FB786" @click="openCreateWallet()">Create</v-btn> 
  <v-dialog
      v-model="dialogCreateWallet"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >

<!--   <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
        color="#0eb786"
      >
        Name of step 1
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
        color="#0eb786"
      >
        Name of step 2
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step color="#0eb786" :complete="valid" step="3">
        Name of step 3
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
      
      <v-chip
        v-for="(item, index) in generatedMnenomic"
        :key="index"      
        class="ma-2"
        color="success"
        outlined
      >
        {{ item }}
      </v-chip>      
      
      
      <v-slider
        v-model="numWords"
        :tick-labels="ticksLabels"
        :max="2"
        step="1"
        ticks="always"
        tick-size="4"
        class="ma-2"
        color="#0eb786"
        track-color="#0eb786"
      ></v-slider>
      
      
        <v-btn
          class="mt-12"
          color="#0eb786"
          @click="step1"
        >
          Start verification
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2"> 
      
      <v-chip
        v-for="(item, index) in checkMnenomic"
        :key="item"      
        class="ma-2"
        outlined
        :color="checkMnenomicColor"
        @click="clickRemove(item, index)"
      >
      
      <v-icon x-small class="mr-1">mdi-minus-circle-outline</v-icon>
        {{ item }}
      </v-chip>        
      
      <v-divider v-if="!mnenomicVerified"></v-divider>      
      
      <v-chip
        v-for="(item, index) in shuffledMnenomic"
        :key="index"      
        class="ma-2"
        outlined
        @click="clickCheck(item, index)"
      >
      <v-icon x-small class="mr-1">mdi-plus-circle-outline</v-icon>
      
        {{ item }}
      </v-chip>   
       <br /><br />
 
        {{ generatedMnenomic }} 
        <br />
        <v-btn
          class="mt-12"
          color="#0eb786"
          :disabled="!mnenomicVerified"
          @click="step2"
        >
          Next step 
        </v-btn>
        <v-btn
          class="mt-12"
          color="#0eb786"
          @click="e1 = 3"
        >
          pass it
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
      <v-form v-model="valid">
      <v-row>
       
        <v-col
          cols="12"
          sm="6"
          md="3"
        >
         
            <v-text-field
              v-model="walletName"
              label="Account name"
              :rules="[rules.required, rules.counter]"
              counter
              maxlength="10"            
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <v-text-field
              v-model="password"
              label="Password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              :rules="[rules.required]"
              @click:append="show1 = !show1"
            ></v-text-field>
          
        </v-col>
        
      </v-row>
      </v-form>

        <v-btn
          :disabled="!valid"
          color="#0eb786"
          @click="addWallet"
        >
          Create account
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper> -->

  <v-stepper
    v-model="step"
    :items="items"
    hide-actions
    complete
  >
    <template v-slot:item.1>
      <h3 class="text-h6">Mnenomic phrase </h3>

      <br>
      <!-- <v-slider
          v-model="numWords"
          :tick-labels="ticksLabels"
          :max="2"
          step="1"
          ticks="always"
          tick-size="4"
          class="ma-2"
          color="#0eb786"
          track-color="#0eb786"
          :thumb-size="24"
          thumb-label="always"
        ></v-slider> -->
        <div class="d-flex align-center flex-column pa-6">
          
          <v-btn-toggle
            v-model="numWords"
            divided
            variant="outlined"
          >
            <v-btn>12 words</v-btn>
            <!-- <v-btn>18 words</v-btn> -->
            <v-btn>24 words</v-btn>
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
        <!-- <v-table>
          <thead>
            <tr>
              <th>Description</th>
              <th class="text-end">Quantity</th>
              <th class="text-end">Price</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td v-text="product.name"></td>
              <td class="text-end" v-text="product.quantity"></td>
              <td class="text-end" v-text="product.quantity * product.price"></td>
            </tr>

            <tr>
              <th>Total</th>
              <th></th>
              <th class="text-end">
                ${{ subtotal }}
              </th>
            </tr>
          </tbody>
        </v-table> -->

      </v-sheet>
      <v-btn
          class="mt-4"
          color="#0eb786"
          @click="step1"
          block
        >
          Start verification
        </v-btn>
    </template>

    <template v-slot:item.2>
      <h3 class="text-h6">Check Mnenomic</h3>

      <br>
      <v-chip
        v-for="(item, index) in checkMnenomic"
        :key="item"      
        class="ma-2"
        outlined
        :color="checkMnenomicColor"
        @click="clickRemove(item, index)"
      >
      
      <v-icon x-small class="mr-1">mdi-minus-circle-outline</v-icon>
        {{ item }}
      </v-chip>        
      
      <v-divider v-if="!mnenomicVerified"></v-divider>      
      
      <v-chip
        v-for="(item, index) in shuffledMnenomic"
        :key="index"      
        class="ma-2"
        outlined
        @click="clickCheck(item, index)"
      >
      <v-icon x-small class="mr-1">mdi-plus-circle-outline</v-icon>
      
        {{ item }}
      </v-chip>   
      <br />
      <v-btn
          class="ma-2" 
          @click="step = 1"
        >
          Return
        </v-btn>
        <v-btn
          class="ma-2"
          color="#0eb786"
          :disabled="!mnenomicVerified"
          @click="step2"
        >
          Next step 
        </v-btn>
        <v-btn
          class="ma-2"
          color="#0eb786" 
          @click="step2"
        >
          Bypass
        </v-btn>
        <br />
        Debug<br /> {{ generatedMnenomic }}
    </template>

    <template v-slot:item.3>
      <h3 class="text-h6">Confirm</h3>

      <br>

      <v-sheet border>
        <v-list
        >
       <v-alert
        v-model="alertError"
        class="ma-4"
        variant="outlined"
        type="warning"
        border="top"
        closable
        close-label="Close Alert"
      >
        Bad password
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
        Wallet name already taken
      </v-alert>          
        <v-list-item>
            <v-text-field
                v-model="name"
                variant="outlined"
                color="#00b786"
                counter="6"
                label="Wallet name"
                style="min-height: 96px"
                class="mt-6"
              ></v-text-field>
          </v-list-item> 
          <v-list-item>
            <v-text-field
                v-model="password"
                variant="outlined"
                color="#00b786"
                counter="6"
                label="Password"
                style="min-height: 96px"
                type="password"
                class="mt-6"
              ></v-text-field>
          </v-list-item>
          <v-btn 
              size="x-large"
              @click="importWallet"
            >
              Save
            </v-btn>
        </v-list>
      </v-sheet>
    </template>
  </v-stepper>

  
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex'
import { Preferences } from '@capacitor/preferences';
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing" 
import { getAccounts, removeAccount, addAccount, addMasterPassword, getMasterPassword, removeMasterPassword } from '@/libs/storage.js';
import md5 from 'md5' 
// import { notifAccountAdded } from '~/libs/notifications'

  export default {
    data () {
      return {
        dialogCreateWallet: false,
        e1: 1,
        valid: false,
        walletName: '',
        name: '',
        password: '', 
        show1: false,
        numWords: 0,
        generatedMnenomicPlain: '',
        generatedMnenomic: '',
        shuffledMnenomic: '',
        checkMnenomic: [],
        checkMnenomicColor: '',
        mnenomicVerified: false,
        alertError: false,
        alertErrorName: false,
        rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 10 || 'Max 10 characters',
        },  
        ticksLabels: [
          '12 words',
          '18 words',
          '24 words',
        ],     
        
        shipping: 0,
      step: 1,
      items: [
        'Step1',
        'Step2',
        'Step3',
      ],
      products: [
        {
          name: 'Product 1',
          price: 10,
          quantity: 2,
        },
        {
          name: 'Product 2',
          price: 15,
          quantity: 10,
        },
      ],
      }
    },
    computed: {
      ...mapState(['allWallets', 'isLogged'])
    },
    async mounted () {
      var generateSecret = await DirectSecp256k1HdWallet.generate(12)      
      this.generatedMnenomicPlain = generateSecret.secret.data
      this.generatedMnenomic = this.generatedMnenomicPlain.split(' ')  
      this.shuffle()      
    },
    watch: {
      async numWords(newData) {
        switch (newData) {
          case 0:
            var generateSecret = await DirectSecp256k1HdWallet.generate(12)  
            this.generatedMnenomicPlain = generateSecret.secret.data
            this.generatedMnenomic = this.generatedMnenomicPlain.split(' ')    
            this.shuffle()          
            break;       
          case 1:
            var generateSecret = await DirectSecp256k1HdWallet.generate(24)  
            this.generatedMnenomicPlain = generateSecret.secret.data
            this.generatedMnenomic = this.generatedMnenomicPlain.split(' ')  
            this.shuffle()              
            break;
        }
      },   
      checkMnenomic: {
        deep: true,
        handler() { 
          const compareArrays = (a, b) =>
          a.length === b.length &&
          a.every((element, index) => element === b[index]);     

          if (compareArrays(this.checkMnenomic, this.generatedMnenomic)) {
            this.checkMnenomicColor = 'green'
            this.mnenomicVerified = true
          } else {
            this.checkMnenomicColor = 'red' 
            this.mnenomicVerified = false
          }
        }
      } 
    },    
    methods: {    
      openCreateWallet() {
        this.dialogCreateWallet = true
        this.step = 1
      },
      step1() {
        this.step = 2
      },
      step2() {
        this.step = 3
      },
      clickCheck(item, index) {
        this.checkMnenomicColor = ''
        for( var i = 0; i < this.shuffledMnenomic.length; i++){                       
            if ( this.shuffledMnenomic[i] === item) { 
                this.checkMnenomic.push(item)
                this.shuffledMnenomic.splice(i, 1); 
                i--; 
            }
        }
      }, 
      clickRemove(item, index) {
        this.checkMnenomicColor = ''
        for( var i = 0; i < this.checkMnenomic.length; i++){                         
            if ( this.checkMnenomic[i] === item) { 
                this.shuffledMnenomic.push(item)
                this.checkMnenomic.splice(i, 1); 
                i++; 
            }
        }
      }, 
      shuffle() {
        this.checkMnenomic = []
        let shuffled = this.generatedMnenomic
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
          
        this.shuffledMnenomic = shuffled  
      },
      async importWallet() {
        const hash = md5(this.password); 
        const { value } = await Preferences.get({ key: 'masterPass' });

        if(hash !== value) {
          this.alertError = true
          return
        }        

        const wallet = await DirectSecp256k1HdWallet.fromMnemonic( this.generatedMnenomicPlain, {
          prefix: 'bcna'
        })
        var finalWallet = await wallet.serialize( this.password )
        var finalAddress = await wallet.getAccounts()

        const foundName = this.allWallets.find((element) => element.name === this.name);
        if (foundName) {
          this.alertErrorName = true
          return
        }       

        await addAccount( this.name, finalAddress[0].address, finalWallet )
        await this.$store.dispatch('getWallets')
        this.dialogCreateWallet = false 
        
      },    
    },
  }
</script>
