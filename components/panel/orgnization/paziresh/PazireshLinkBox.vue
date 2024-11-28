<template>
  <v-row>
    <v-col align-self="center">
      <div class="page-header-box organization">
        <nuxt-link to="/organization" class="page-header">
          <img src="/images/pages/calendar.svg" alt="users">
          <span class="title">
              {{ isDoctor ? 'پذیرش های امروز' : 'ارسال نتایج' }}
            </span>
        </nuxt-link>
        <nuxt-link to="/organization/search" class="page-header">
          <img src="/images/pages/search-link.svg" alt="users">
          <span class="title">جستجو</span>
        </nuxt-link>

        <v-divider inset v-if="!mini"/>
        <div class="page-actions-secondary"
             @click="isDoctor ? () => togglePazireshModal() : () => {}"
        >
            <span class="title-main">
              {{ today | toPersianDate('dddd DD MMMM') }}
            </span>
        </div>
        <div
          v-if="isDoctor"
          class="page-actions"
          @click="togglePazireshModal"
        >
          <img src="/images/pages/new-user.svg" alt="users">
          <span class="title-main">پذیرش جدید</span>
        </div>
      </div>
    </v-col>
    <create-appointment-form-component
      :open="showPazireshModal"
      @close="closePazireshModal"
      @created="createdPazireshModal"
      :is-surgery="false"
    />
  </v-row>
</template>

<script>
import moment from "jalali-moment";
import CreateAppointmentFormComponent
  from "~/components/panel/appointment/AppointmentForm/CreateAppointmentFormComponent";

export default {
  name: "PazireshLinkBox",
  components: {CreateAppointmentFormComponent},
  data() {
    return {
      showPazireshModal: false,
    }
  },
  methods: {
    togglePazireshModal() {
      this.showPazireshModal = !this.showPazireshModal
    },
    closePazireshModal() {
      this.showPazireshModal = false
      this.$emit('closePazireshModal')
    },
    createdPazireshModal() {
      this.showPazireshModal = false
      this.$emit('createdPazireshModal')
    }
  },
  computed: {
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    isDoctor() {
      if (!this.loginUser) return false;
      return this.loginUser.organization.is_doctor;
    },
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    today() {
      return moment().format("YYYY/MM/DD")
    },
  }
}
</script>

<style scoped>

</style>
