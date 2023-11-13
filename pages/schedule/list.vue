<template>
  <v-container fluid>
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box organization">
          <nuxt-link to="/organization" class="page-header">
            <img src="/images/pages/calendar.svg" alt="users">
            <span class="title">
              لیست پذیرش دکتر دیگر
            </span>
          </nuxt-link>
        </div>
      </v-col>
      <v-divider />
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "list",
  layout: "panel",
  middleware: "auth",
}
</script>
<style scoped>

</style>
