<template>
    <v-container>
      <p>{{ $t("message.hello") }}</p>
      <br />
        <v-select
          v-model="$i18n.locale"
          label="Language"
          :items="$i18n.availableLocales"
          :item-title="'locale-' + locale"
          :item-value="locale"
          variant="outlined"
        ></v-select>
      <v-row>
        <v-col>

            <v-card
              class="d-flex align-center"
              dark 
            >
              <v-table>
                <tbody>
                  <tr>
                    <td>userSession</td>
                    <td>{{ userSession }}</td>
                  </tr>
                  <tr>
                    <td>sessionConfig</td>
                    <td>{{ sessionMax }}s</td>
                  </tr>
                  <tr>
                    <td>remainingTime</td>
                    <td> 
                      <span v-if="timeLeft > 0" class="text-red">Not logged</span>
                      <span v-else class="text-green">{{ timeLeft }} Logged</span>
                    </td>
                  </tr>
                </tbody>  
              </v-table>            
            </v-card>
            <v-btn v-if="isLogged" type="submit" block class="mt-2" size="x-large" color="#0FB786" @click="logout">Logout</v-btn>
        </v-col>
      </v-row>
    </v-container> 
    
</template>

<script>
import { getBcnaSession, removeBcnaSession } from '@/libs/storage.js'; 
import { mapState } from 'vuex'

export default {
  name: 'App', 
  
  data: () => ({
    userSession: '',
    timeNow: '',
    timeNowDebug: '',
    timeLeft: '',
    timeoutJs: '',
  }),
  computed: {
    ...mapState(['isLogged', 'sessionMax'])
  },
  async mounted() {
    console.log(this.isLogged)
    let getFinalSession = await getBcnaSession();
    this.userSession = getFinalSession;

    this.remainingTime()

    this.timeoutJs = setInterval(() => {
      this.remainingTime()
    }, 1000);
  },
  methods: {
    remainingTime() {
      let timeNow = Math.floor(Date.now() / 1000)
      this.timeNow = timeNow
      
      this.timeLeft = timeNow - (Number(this.userSession) + this.sessionMax)
      //console.log(this.timeLeft)
      if (this.timeLeft > 0) {
        clearInterval(this.timeoutJs);
        this.$store.commit('setIsLogged', false)
        removeBcnaSession()
        this.$router.push('/login')
      }
    },
    async logout() {
      clearInterval(this.timeoutJs);
      this.$store.commit('setIsLogged', false)
      removeBcnaSession()
      let getFinalSession = await getBcnaSession();
      this.userSession = getFinalSession;
      this.$router.push('/login')
    }
  }
}
</script>
