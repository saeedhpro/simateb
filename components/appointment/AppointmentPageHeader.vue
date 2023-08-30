<template>
  <v-row>
    <v-col align-self="center">
      <div class="page-header-box">
        <nuxt-link to="/appointment" class="page-header">
          <img src="/images/pages/users.svg" alt="users">
          <span class="title">جدول نوبت دهی</span>
        </nuxt-link>
        <nuxt-link to="/appointment/search" class="page-header">
          <img src="/images/pages/search-icon.svg" alt="users">
          <span class="title">جستجو نوبت ها</span>
        </nuxt-link>
        <nuxt-link to="/appointment/surgeries" class="page-header" v-if="canSeeSurgeries">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <defs>
              <style>.a.index,.b.index{fill:#5063ff;}.a.index{opacity:.12;}.b.index{opacity:1;}</style>
            </defs>
            <g transform="translate(-1316 -132)">
              <rect class="a index" width="40" height="40" rx="20" transform="translate(1316 132)"/>
              <path class="b index"
                    d="M6.04,12.414l-.3,1.76a.385.385,0,0,0,.56.407l1.575-.834,1.575.834a.389.389,0,0,0,.564-.407L9.7,12.414l1.277-1.245a.387.387,0,0,0-.213-.661l-1.76-.258-.792-1.6a.386.386,0,0,0-.693,0l-.787,1.6-1.765.257a.391.391,0,0,0-.214.661ZM13.5,2.25H12.094V.844A.838.838,0,0,0,11.282,0a.893.893,0,0,0-.875.844V2.25H5.344V.844a.844.844,0,0,0-1.687,0V2.25H2.25A2.25,2.25,0,0,0,0,4.5V15.75A2.25,2.25,0,0,0,2.25,18H13.5a2.25,2.25,0,0,0,2.25-2.25V4.5A2.251,2.251,0,0,0,13.5,2.25Zm.563,13.5a.563.563,0,0,1-.562.563H2.25a.563.563,0,0,1-.562-.562v-9H14.063Z"
                    transform="translate(1328.125 143)"/>
            </g>
          </svg>
          <span class="title">جدول جراحی</span>
        </nuxt-link>

        <v-divider class="d-none d-lg-flex" inset/>
        <v-spacer class="d-none d-sm-flex d-lg-none"/>
        <div class="page-actions"
             @click="togglePazireshModal"
        >
          <img src="/images/pages/new-user.svg" alt="users">
          <span class="title-main">پذیرش جدید</span>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "AppointmentPageHeader",
  methods: {
    togglePazireshModal() {
      this.$emit('togglePazireshModal')
    }
  },
  computed: {
    canSeeSurgeries() {
      return false
    }
  }
}
</script>
<style scoped>

</style>
