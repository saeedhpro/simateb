<template>
  <v-app
    dir="rtl"
  >
    <admin-header-component/>
    <v-main
      class="px-10 admin"
    >
      <Nuxt/>
    </v-main>
  </v-app>
</template>

<script>
import AdminHeaderComponent from "~/components/admin/global/AdminHeaderComponent";

export default {
  name: 'AdminLayout',
  components: {AdminHeaderComponent},
  middleware: 'auth'
}
</script>
