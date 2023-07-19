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
            <v-table>
                <tbody>
                  <tr>
                    <td>timeNow</td>
                    <td>{{ timeNow }}</td>
                  </tr>
                  <tr>
                    <td>timeNowDebug</td>
                    <td>{{ timeNowDebug }}</td>
                  </tr>
                  <tr>
                    <td>timeoutJs</td>
                    <td>{{ timeoutJs }}</td>
                  </tr>
                  <tr>
                    <td>userSessionDebug</td>
                    <td>{{ userSessionDebug }}</td>
                  </tr>
                  <tr>
                    <td>valueMpDebug</td>
                    <td>{{ valueMpDebug }}</td>
                  </tr>
                  <tr>
                    <td>allKeyDebug</td>
                    <td>{{ allKeyDebug }}</td>
                  </tr>
                  
                </tbody>  
              </v-table>   
        </v-col>
      </v-row>
    </v-container> 
    
</template>

<script>
import { Preferences } from '@capacitor/preferences';
import { getSession, removeSession } from '@/libs/storage.js'; 
import { mapState } from 'vuex'

export default {
  name: 'App', 
  
  data: () => ({
    userSession: '',
    userSessionDebug: '',
    valueMpDebug: '',
    allKeyDebug: '',
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
    let getFinalSession = await getSession();
    this.userSession = getFinalSession;

/*     const { value } = await Preferences.get({ key: 'userSession' }); 
    this.userSessionDebug = value; */

    const { value } = await Preferences.get({ key: 'masterPass' });
    this.valueMpDebug = value;

    const list = await Preferences.keys();
    this.allKeyDebug = list;

    this.timeNowDebug = Date.now()
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
      /* if (this.timeLeft > 0) {
        clearInterval(this.timeoutJs);
        this.$store.commit('setIsLogged', false)
        removeSession()
        this.$router.push('/login')
      } */
    },
    async logout() {
      clearInterval(this.timeoutJs);
      this.$store.commit('setIsLogged', false)
      removeSession()
      let getFinalSession = await getSession();
      this.userSession = getFinalSession;
      //this.$router.push('/login')

      const list = await Preferences.keys();
      this.allKeyDebug = list;
    }
  }
}
</script>
