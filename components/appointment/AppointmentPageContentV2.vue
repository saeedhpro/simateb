<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-card
        class="page-main-box"
        :class="{'surgeries': this.isSurgery}"
      >
        <appointment-page-search
          v-if="!loading"
          :is-surgery="isSurgery"
        />
        <appointment-page-list-v2
          v-if="!loading"
          :is-surgery="isSurgery"
        />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "AppointmentPageComponentV2",
  props: {
    isSurgery: {
      type: Boolean,
      default: false,
    },
  },
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
    },
  }
}
</script>
<style scoped>

</style>
