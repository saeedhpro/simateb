<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-card
        class="page-main-box"
      >
        <appointment-page-search/>
        <appointment-page-list/>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "AppointmentPageComponent",
}
</script>
<style scoped>

</style>
