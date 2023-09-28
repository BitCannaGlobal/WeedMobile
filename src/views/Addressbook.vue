<template>
  <v-container>
  <v-btn block color="#0FB786" class="mb-4" @click="openDial()">
    Add contact
  </v-btn>
<v-card v-for="(item, index) in allContacts" class="mb-4">


    <v-list v-if="allContacts.length > 0" lines="two" >
 
      <v-list-item
        
        
        :key="item.name"
        :title="item.name"
        :subtitle="item.address"
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
    >
 
      <v-card>

        <v-form ref="form"> 
        <v-toolbar
          dark
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add contact</v-toolbar-title>
          <v-spacer></v-spacer>
 
        </v-toolbar>
        <v-list
          lines="two"
          subheader
        >
          <v-list-item title="Infomations" subtitle="Set the content filtering level to restrict apps that can be downloaded"></v-list-item>
        </v-list>
        
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-text-field
                v-model="name"
                :rules="nameRules"
                variant="outlined"
                color="#00b786" 
                label="Name" 
                class="mt-2" 
                
            ></v-text-field>
          </v-list-item>
        <v-list-item>         
            <v-text-field
                v-model="recipient"
                :rules="addressRules"
                variant="outlined"
                color="#00b786" 
                label="Address" 
                class="mt-4" 
                append-inner-icon="mdi-qrcode-scan"
                @click:append-inner="scanNow()"
            ></v-text-field>
          </v-list-item> 
          <qrcode-stream v-if="removeScan" :track="paintBoundingBox" @error="logErrors" /> 
          <v-list-item>
            <v-btn 
              block 
              color="#0FB786"
              :disabled="loading"
              :loading="loading"
              @click="addContact()
            ">Add contact</v-btn>
          </v-list-item>
        </v-list>   
      </v-form>
 
      </v-card>
    </v-dialog>
  </v-row>



  </v-container>
</template>
<script>
import { ref } from 'vue'

import { addContact, getAllContact, removeContactId } from '@/libs/storage.js';

  export default {
    data: () => ({
      dialog: false,
      notifications: false,
      removeScan: false,
      recipient: '',
      allContacts: [],
      files: [
        {
          color: '#0FB786',
          icon: 'mdi-account',
          subtitle: 'bcna13jawsn574rf3f0u5rhu7e8n6sayx5gkwgusz73',
          title: 'atmon3r',
        },
        {
          color: '#0FB786',
          icon: 'mdi-account',
          subtitle: 'bcna148ml2tghqkfvzj8q27dlxw6ghe3vlmprhru76x',
          title: 'Wallet1',
        },
      ]
    }),
    async mounted() { 
      let getAllContacts = await getAllContact()
      this.allContacts = JSON.parse(getAllContacts)
    },
    methods: {
      removeContact(index) {
        removeContactId(index)
        this.allContacts.splice(index, 1)
      },
      openDial() {
        this.dialog = true
        this.name = ''
        this.recipient = ''
        this.removeScan = false
      },
      async addContact() {
        this.dialog = false
        await addContact(this.name, this.recipient)
        let getAllContacts = await getAllContact()
        this.allContacts =  JSON.parse(getAllContacts)
      },
      scanNow() {
        this.removeScan = true
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
          this.recipient = detectedCode.rawValue
          this.removeScan = false
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
    },
  }
</script>