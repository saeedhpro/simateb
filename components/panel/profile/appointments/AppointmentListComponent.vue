<template>
  <div class="profile-appointment-list-component">
    <div class="appointments-box" v-if="!loading">
      <appointment-item-component
        v-for="(i,n) in list.data"
        :key="n"
        :index="n"
        :id="i.id"
        :created_at="i.created_at"
        :start_at="i.start_at"
        :start_at_fa="i.start_at_fa"
        :start_at_ago_fa="i.start_at_ago_fa"
        :organization-id="i.organization_id"
        :status="i.status"
        :case-type="i.case_type"
        :code="i.code"
        :info="i.info"
        :prescription="i.prescription"
        :radiology-cases="i.radiology_cases"
        :photography-cases="i.photography_cases"
        :radiology-id="i.radiology_id"
        :radiology="i.radiology"
        :photography-id="i.photography_id"
        :photography="i.photography"
        :doctor-id="i.doctor_id"
        :p-result-at="i.p_result_at"
        :r-result-at="i.r_result_at"
        :d-result-at="i.d_result_at"
        :p-admission-at="i.p_admission_at"
        :r-admission-at="i.r_admission_at"
        :d-admission-at="i.d_admission_at"
        :waiting="i.waiting"
        @updated="onUpdate(i)"
      />
      <div
        class="more-items"
        v-if="list.meta.total > 10"
      >
        <v-pagination
          dir="ltr"
          v-model="page"
          :length="list.meta.total"
          :total-visible="5"
        ></v-pagination>
      </div>
    </div>
    <appointment-form-component
      :open="showUpdateModal"
      :item="item"
      @close="closeUpdateModal"
      @remove="paginate"
      @done="doneUpdateModal"
      :is-surgery="false"
    />
  </div>
</template>

<script>
import AppointmentItemComponent from "~/components/panel/profile/appointments/AppointmentItemComponent";
import AppointmentFormComponent from "~/components/panel/appointment/AppointmentForm/AppointmentFormComponentV2";

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
      loading: false,
    }
  },
  mounted() {
    this.getUserAppointmentsList(this.userId, this.page)
  },
  methods: {
    doAppointment() {
      this.toggleShowUpdateModal()
      this.paginate(1)
    },
    paginate(page) {
      this.page = page
      this.getUserAppointmentsList(this.userId, page)
    },
    getUserAppointmentsList(id, page) {
      this.loading = true
      this.$store.dispatch('appointments/getUserAppointmentsList', {
        id: id,
        page: page
      })
      .finally(() =>{
        setTimeout(() => {
          this.loading = false
        }, 250)
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
    doneUpdateModal() {
      this.getUserAppointmentsList(this.userId, 1)
      this.toggleShowUpdateModal()
    },
  },
  computed: {
    list() {
      return this.$store.getters['appointments/getList']
    }
  },
  watch: {
    page() {
      this.paginate()
    }
  }
}
</script>

<style scoped>

</style>
