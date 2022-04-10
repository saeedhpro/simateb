<template>
  <v-app>
    <header-component />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from "~/components/panel/global/HeaderComponent";
export default {
  name: 'PanelLayout',
  components: {HeaderComponent},
  middleware: 'auth'
}
</script>
