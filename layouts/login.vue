<template>
  <v-app light dir="rtl">
    <v-main class="login-page">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayout',
  middleware: 'guest'
}
</script>
