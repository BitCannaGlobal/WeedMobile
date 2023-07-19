<template>
  <v-app  style="background-color:black; color:white" id="inspire">

    <v-navigation-drawer color="#1C1D20" width="500" v-model="drawer" temporary>
        <v-list
          density="compact"
          nav
        >
        <v-list-item
          prepend-icon="mdi-close-thick"
          title="Menu"
          @click="drawer = false"
        ></v-list-item>

        <v-divider></v-divider>
          <v-list-item v-if="isLogged" prepend-icon="mdi-view-dashboard" title="DashBoard" to="/"></v-list-item>
          <v-list-item prepend-icon="mdi-pencil" title="Create/import" to="/create"></v-list-item>
          <v-list-item v-if="!isLogged" prepend-icon="mdi-login" title="Login" to="/login"></v-list-item>
          <v-list-item v-else prepend-icon="mdi-login" title="Logout" @click="logout"></v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar style="background-color:black; color:white">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>WeedMobile</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <!-- <div class="mt-10 text-center">{{ height }}</div> -->
 
      <router-view></router-view>
      <mainFooter v-if="isLogged" />      
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import mainFooter from '@/components/Footer.vue'

  export default {
    components: { mainFooter },
    setup () {
//       const { name } = useDisplay()
//
//       const height = computed(() => {
//         // name is reactive and
//         // must use .value
//         switch (name.value) {
//           case 'xs': return 220
//           case 'sm': return 400
//           case 'md': return 500
//           case 'lg': return 600
//           case 'xl': return 800
//           case 'xxl': return 1200
//         }
//
//         //return undefined
//       })
//       const getData = userData()
//       //console.log(getData.isLogged);
//
//
//       return { height }
    },
    data: () => ({
      drawer: false,
      drawertest: false,
    }),
    computed: {
      ...mapState(['isLogged'])
    },

    async mounted() {
      if (!this.isLogged) {
        this.$router.push('/login')
      }
    },
    methods: {
      logout() {
        this.$store.commit('setIsLogged', false)
        this.$router.push('/login')
      }
    }
  }
</script>
<style>
#inspire {
  background: "black";
}
</style>

