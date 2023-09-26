<template>

<v-card
    class="mx-auto"
    max-width="600"
  >
 

    <v-list lines="two" class="mt-4">
      <v-list-subheader inset>Address book</v-list-subheader>

      <v-list-item
        v-for="file in files"
        :key="file.title"
        :title="file.title"
        :subtitle="file.subtitle"
      >
        <template v-slot:prepend>
          <v-avatar :color="file.color">
            <v-icon color="white">{{ file.icon }}</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="red"
            icon="mdi-close-box"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
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
  }
</script>