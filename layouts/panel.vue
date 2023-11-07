<template>
  <v-app dir="rtl">
    <header-component />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from "~/components/panel/global/HeaderComponent";

export default {
  name: 'PanelLayout',
  components: { HeaderComponent },
  middleware: 'auth'
}
</script>
