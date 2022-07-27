<template>
  <v-row>
    <v-col align-self="center">
      <div class="page-header-box">
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
          <span class="title">پذیرش جدید</span>
        </div>
      </div>
    </v-col>
    <create-appointment-form-component
      :open="showPazireshModal"
      @close="closePazireshModal"
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
      this.togglePazireshModal()
      this.$emit('closePazireshModal')
    }
  },
  computed: {
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    isDoctor() {
      if (!this.loginUser) return false;
      const profession_id = this.loginUser.organization.profession_id;
      return profession_id !== 1 && profession_id !== 2 && profession_id !== 3
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
