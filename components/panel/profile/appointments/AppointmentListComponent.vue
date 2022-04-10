<template>
  <div class="profile-appointment-list-component">
    <div class="appointments-box">
      <appointment-item-component
        v-for="(i,n) in list.data"
        :key="n"

      />
    </div>
  </div>
</template>

<script>
import AppointmentItemComponent from "~/components/panel/profile/appointments/AppointmentItemComponent";
export default {
  name: "AppointmentListComponent",
  components: {AppointmentItemComponent},
  props: {
    userId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      page: 1,
    }
  },
  mounted() {
    this.getUserAppointmentsList(this.userId, this.page)
  },
  methods: {
    getUserAppointmentsList(id, page) {
      this.$store.dispatch('appointments/getUserAppointmentsList', {
        id: id,
        page: page
      })
    }
  },
  computed: {
    list() {
      return this.$store.getters['appointments/getList']
    }
  }
}
</script>

<style scoped>

</style>
