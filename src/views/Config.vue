<template>
 
    <v-list bg-color="black" lines="two">
      <v-list-subheader>General</v-list-subheader>

      <v-list-item
        v-for="folder in general"
        :key="folder.title"
        :title="folder.title"
        :subtitle="folder.subtitle"
      >
      <template v-slot:prepend>
          <v-avatar>
            <v-icon :color="folder.color">{{ folder.icon }}</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-chevron-right"
            variant="text"
            @click.stop="drawer = !drawer"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-subheader>Privacy</v-list-subheader>

      <v-list-item
        v-for="file in privacy"
        :key="file.title"
        :title="file.title"
        :subtitle="file.subtitle"
      >
        <template v-slot:prepend>
          <v-avatar>
            <v-icon :color="file.color">{{ file.icon }}</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-chevron-right"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-subheader>Other</v-list-subheader>

      <v-list-item
        v-for="file in other"
        :key="file.title"
        :title="file.title"
        :subtitle="file.subtitle"
      >
        <template v-slot:prepend>
          <v-avatar>
            <v-icon :color="file.color">{{ file.icon }}</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-chevron-right"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>      
    </v-list>
 

    <v-navigation-drawer
        v-model="drawer"
        location="bottom"
        temporary
      >
      <v-row>
        <v-col  >
          <v-sheet border="md" >test</v-sheet>
        </v-col>
        <v-col >
          <v-sheet border="md"  >test</v-sheet>
        </v-col>
        <v-col  >
          <v-sheet border="md" >test</v-sheet>
        </v-col>
      </v-row>
 
 
      </v-navigation-drawer>

</template>

<script>
  export default {
    data: (t) => ({
      drawer: false,
      items: [
        {
          title: 'Foo',
          value: 'foo',
        },
        {
          title: 'Bar',
          value: 'bar',
        },
        {
          title: 'Fizz',
          value: 'fizz',
        },
        {
          title: 'Buzz',
          value: 'buzz',
        },
      ],
      general: [
        {      
          color: '#33ffc9',    
          icon: 'mdi-currency-usd',
          subtitle: t.$i18n.t('config.currency.subtitle'),
          title: t.$i18n.t('config.currency.title'),
        },
        {
          color: '#33ffc9',
          icon: 'mdi-translate-variant',
          subtitle: t.$i18n.t('config.language.subtitle'),
          title: t.$i18n.t('config.language.title'),
        }
      ],
      privacy: [
        {
          color: '#33ffc9',
          icon: 'mdi-shield-lock-open-outline',
          subtitle: t.$i18n.t('config.viewMnemonic.subtitle'),
          title: t.$i18n.t('config.viewMnemonic.title'),
        },
        {
          color: '#33ffc9',
          icon: 'mdi-pencil-lock-outline',
          subtitle: t.$i18n.t('config.masterPassChange.subtitle'),
          title: t.$i18n.t('config.masterPassChange.title'),
        },
      ],
      other: [
        {
          color: 'red',
          icon: 'mdi-delete-forever-outline',
          subtitle: t.$i18n.t('config.deleteWallet.subtitle'),
          title: t.$i18n.t('config.deleteWallet.title'),
        }
      ],
    }),
    mounted() {
      console.log(this.$i18n.t('config.currency.title'))
    },
  }
</script>