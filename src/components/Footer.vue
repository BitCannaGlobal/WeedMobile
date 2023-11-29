<template>
 
  <v-bottom-navigation absolute grow mode="shift">
    <v-btn value="recent" to="/dashboard">
      <v-icon >mdi-view-dashboard</v-icon>      
      <span><strong>{{ $t("footer.title1") }}</strong></span>
    </v-btn>

    <v-btn value="favorites" to="/accounts">
      <v-icon >mdi-swap-horizontal-bold</v-icon>
      <span><strong>{{ $t("footer.title2") }}</strong></span>
    </v-btn>

    <v-btn value="nearby" to="/config">
      <v-icon >mdi-cog</v-icon>
      <span><strong>{{ $t("footer.title3") }}</strong></span>
    </v-btn>
  </v-bottom-navigation> 
 
</template>
