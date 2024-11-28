<template>
  <v-app
    dir="rtl"
  >
    <patient-header-component/>
    <v-main
      class="px-10"
    >
      <Nuxt/>
    </v-main>
  </v-app>
</template>

<script>
import PatientHeaderComponent from "~/components/panel/global/PatientHeaderComponent";

export default {
  name: 'PanelLayout',
  components: {PatientHeaderComponent},
  middleware: 'patient'
}
</script>
