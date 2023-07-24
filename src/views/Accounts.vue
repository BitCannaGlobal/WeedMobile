<template>  
    <h4 class="ma-4">Accounts</h4> 
    <v-card
      v-for="(item, i) in items"
       class="ma-4"
      :title="item.name"
      :subtitle="item.addr"
      @click="changeAccount(i)"
    ></v-card>
</template>
<script>
import { mapState } from 'vuex'
import { getAccounts, removeAccount, addAccount, addMasterPassword, getMasterPassword, removeMasterPassword } from '@/libs/storage.js';
export default {
  data: () => ({ 
    items: [],
  }),
  computed: {
    ...mapState(['allWallets', 'isLogged'])
  },
  async mounted() {
      await this.$store.dispatch('getWallets')
      this.items = []
      for (const element of this.allWallets) {
        this.items.push({ name: element.name, addr: element.address })
      } 
      //console.log(await addAccount());
      // console.log(await getAccounts());
      //console.log(await removeAccount());

  },
  methods: { 
    async changeAccount(i) {
      //console.log(i)
      await this.$store.dispatch('changeWallet', i)
    }, 
  }
}
</script>