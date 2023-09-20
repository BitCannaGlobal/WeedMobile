<template>
  <v-btn  block size="x-large" color="#0FB786" @click="openCreateWallet()">Create</v-btn> 
  <v-dialog
      v-model="dialogCreateWallet"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
    <v-toolbar
          dark
        >
          <v-btn
            icon
            dark
            @click="dialogCreateWallet = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create wallet</v-toolbar-title>
 
        </v-toolbar> 
    <v-stepper v-model="step" :items="items" hide-actions alt-labels> 
    <div class="ma-4" v-if="step === 1">
      <h3 class="text-h6">Mnenomic phrase </h3>
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
      </v-sheet>
      <v-btn
        class="mt-4"
        color="#0eb786"
        @click="step1"
        block
      >
        Start verification
      </v-btn>      
    </div>
    <div class="ma-4" v-if="step === 2">
      <h3 class="text-h6">Check Mnenomic</h3>
        <v-chip
          v-for="(item, index) in checkMnenomic"
          :key="item"      
          class="ma-2"
          outlined 
          :color="checkMnenomicColor"
          @click="clickRemove(item, index)"
        >
        
        <v-icon class="mr-1" >mdi-minus-circle-outline</v-icon>
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
      <v-icon class="mr-1">mdi-plus-circle-outline</v-icon>
      
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
    </div>
    <div class="ma-4" v-if="step === 3">
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
          <v-list-item>
          <v-btn 
              size="x-large"
              block
              color="#0eb786" 
              @click="importWallet"
            >
              Save
          </v-btn>
        </v-list-item>
        </v-list>
      </v-sheet>      
    </div>
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

          console.log(this.generatedMnenomic.length)
          console.log('this.checkMnenomic', this.checkMnenomic.length)

          if (this.generatedMnenomic.length === this.checkMnenomic.length) {
            if (compareArrays(this.checkMnenomic, this.generatedMnenomic)) {
              this.checkMnenomicColor = 'green'
              this.mnenomicVerified = true
            } else {
              this.checkMnenomicColor = 'red' 
              this.mnenomicVerified = false
            }
          } else {
            this.checkMnenomicColor = 'gray'
            this.mnenomicVerified = false
          }
        }
      } 
    },    
    methods: {    
      async openCreateWallet() {
        this.dialogCreateWallet = true
        this.alertError = false
        this.alertErrorName = false
        this.step = 1
        var generateSecret = await DirectSecp256k1HdWallet.generate(12)      
        this.generatedMnenomicPlain = generateSecret.secret.data
        this.generatedMnenomic = this.generatedMnenomicPlain.split(' ')  
        this.shuffle()  
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
