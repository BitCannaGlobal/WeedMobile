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
        <v-col
          v-for="n in 2"
          :key="n"
          cols="6"
        >

            <v-card
              class="d-flex align-center"
              dark
              height="100"
            >

            </v-card>

        </v-col>
      </v-row>
    </v-container> 
    
</template>

<script>


export default {
  name: 'App', 
  
  data: () => ({
 
  }),
}
</script>
