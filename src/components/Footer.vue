<template>
 
  <v-bottom-navigation grow mode="shift">
    <v-btn value="recent">
      <v-icon >mdi-view-dashboard</v-icon>      
      <span><strong>Dashboard</strong></span>
    </v-btn>

    <v-btn value="favorites">
      <v-icon >mdi-swap-horizontal-bold</v-icon>
      <span><strong>Accounts</strong></span>
    </v-btn>

    <v-btn value="nearby">
      <v-icon >mdi-cog</v-icon>
      <span><strong>Config</strong></span>
    </v-btn>
  </v-bottom-navigation> 
 
</template>
