<template>
  <div class="profile-appointment-list-component">
    <div class="appointments-box">
      <appointment-item-component
        v-for="(i,n) in list.data"
        :key="n"
        :id="i.id"
        :created_at="i.created_at"
        :organization-id="i.organization_id"
        :status="i.status"
        :case-type="i.case_type"
        :code="i.code"
        :info="i.info"
        :prescription="i.prescription"
        :radiology-cases="i.radiology_cases"
        :photography-cases="i.photography_cases"
        @updated="onUpdate(i)"
      />
    </div>
    <appointment-form-component
      :open="showUpdateModal"
      :item="item"
      @close="closeUpdateModal"
      @loading="toggleOverlay"
      :has-item="true"
    />
  </div>
</template>

<script>
import AppointmentItemComponent from "~/components/panel/profile/appointments/AppointmentItemComponent";
import AppointmentFormComponent from "~/components/panel/appointment/AppointmentForm/AppointmentFormComponent";

export default {
  name: "AppointmentListComponent",
  components: {AppointmentItemComponent, AppointmentFormComponent},
  props: {
    userId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      page: 1,
      item: null,
      showUpdateModal: false,
      overlay: false
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
    },
    onUpdate(item) {
      this.item = item
      this.toggleShowUpdateModal()
    },
    toggleShowUpdateModal() {
      this.showUpdateModal = !this.showUpdateModal
    },
    closeUpdateModal() {
      this.toggleShowUpdateModal()
    },
    toggleOverlay() {
      this.overlay = !this.overlay
    },
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
