<template>
  <v-container
    fluid
  >
    <appointment-page-header
      @togglePazireshModal="togglePazireshModal"
    />
    <appointment-page-content-v3/>
    <create-appointment-form-component
      :is-surgery="false"
      v-if="showPazireshModal"
      :open="showPazireshModal"
      :init-time="initTime"
      @close="closePazireshModal"
      @created="createdPazireshModal"
    />
    <appointment-page-item-form
      :id="appointmentID"
      :is-surgery="false"
      v-if="showAppointmentModal"
      :open="showAppointmentModal"
      @close="closeAppointmentModal"
      @done="doneAppointmentModal"
    />
    <work-hour-component
      :start="''"
      :end="''"
      :period="15"
      :organization-id="11"
      @done="doneAppointmentModal"
    />
  </v-container>
</template>
<script>
import CreateAppointmentFormComponent
  from "~/components/panel/appointment/AppointmentForm/CreateAppointmentFormComponent.vue";
import WorkHourComponent from "~/components/panel/appointment/WorkHourComponent.vue";

export default {
  name: "AppointmentPage",
  components: {WorkHourComponent, CreateAppointmentFormComponent},
  layout: 'panel',
  middleware: 'auth',
  mounted() {
    // this.getUsers()
    this.getCaseTypes()
  },
  methods: {
    getUsers() {
      this.$store.dispatch('users/getUsers', {limit: 100, page: 1})
    },
    getCaseTypes() {
      this.$store.dispatch('cases/getCaseTypes', {type: 1})
    },
    togglePazireshModal() {
      this.showPazireshModal = !this.showPazireshModal
    },
    openPazireshModal(startAt) {
      this.initTime = startAt
      this.togglePazireshModal()
    },
    closePazireshModal() {
      this.initTime = ''
      this.togglePazireshModal()
    },
    createdPazireshModal() {
      this.togglePazireshModal()
      this.getAppointmentList()
    },
    closeAppointmentModal() {
      this.showAppointmentModal = false
      this.appointmentID = 0
    },
    doneAppointmentModal() {
      this.getAppointmentList()
    },
    getAppointmentList() {
      this.loadList = false
      setTimeout(() => {
        this.loadList = true
      }, 300)
    }
  },
  computed: {
    initTime: {
      get() {
        return this.$store.getters['appointment/getInitTime']
      },
      set(val) {
        this.$store.dispatch('appointment/setInitTime', val)
      }
    },
    showPazireshModal: {
      get() {
        return this.$store.getters['appointment/getShowPazireshModal']
      },
      set(val) {
        this.$store.dispatch('appointment/setShowPazireshModal', val)
      }
    },
    appointmentID: {
      get() {
        return this.$store.getters['appointment/getAppointmentID']
      },
      set(val) {
        this.$store.dispatch('appointment/setAppointmentID', val)
      }
    },
    showAppointmentModal: {
      get() {
        return this.$store.getters['appointment/getShowItemModal']
      },
      set(val) {
        this.$store.dispatch('appointment/setShowItemModal', val)
      }
    },
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
