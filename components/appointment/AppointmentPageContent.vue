<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-card
        class="page-main-box"
      >
        <appointment-page-search
          v-if="!loading"
        />
        <appointment-page-list
          v-if="!loading"
        />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "AppointmentPageComponent",
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    this.loadList = false
    setTimeout(() => {
      this.loading = false
    }, 200)
  },
  computed: {
    loadList: {
      get() {
        return this.$store.getters['appointment/getLoadList'];
      },
      set(val) {
        return this.$store.dispatch('appointment/setLoadList', val);
      },
      year(year) {
        this.loadList = false
        let date = this.startDate.clone()
        date = date.jYear(year - 1)
        this.startDate = date
        setTimeout(() => {
          this.loadList = true
        }, 200)
      },
      month(month) {
      }
    },
  }
}
</script>
<style scoped>

</style>
