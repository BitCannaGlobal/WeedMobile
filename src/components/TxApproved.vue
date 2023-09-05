<template>
  <v-card class="txReturn text-center grey d-flex flex-column align-center justify-top mt-10">
 
      <v-icon
      size="100"
      color="#0FB786"
      icon="mdi-check-outline"
      class="returnIcon"
    ></v-icon> 
    <v-card elevation="0"  class="mt-6" :height="200" :width="350" color="transparent"> <!-- color="transparent" -->
      <v-card-title class="text-center">
        <span class="font-weight-black text-subtitle-1">
          Transaction approved
        </span>
      </v-card-title>
      <v-card-text class="text-center">
        <span class="font-weight-black text-subtitle-1">
          Your transaction has been successfully sent
        </span>
      </v-card-text>
    </v-card> 
  </v-card>
 
</template>
<style>
  .txReturn {
    background: linear-gradient(180deg, #000000, 80%, #0FB786);
  } 
  .returnIcon {
    margin-top: 200px;
  } 
</style>