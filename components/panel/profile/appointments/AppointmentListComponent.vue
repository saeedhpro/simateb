<template>
  <div class="profile-appointment-list-component">
    <div
      v-if="loading"
    >
      <LoadingCard />
    </div>
    <div class="appointments-box" v-else>
      <appointment-item-component
        v-for="(i,n) in list.data"
        :key="n"
        :index="n"
        :page="page"
        :id="i.id"
        :created_at="i.created_at"
        :start_at="i.start_at"
        :start_at_fa="i.start_at_fa"
        :start_at_ago_fa="i.start_at_ago_fa"
        :organization-id="i.organization_id"
        :organization-name="i.organization.name"
        :status="i.status"
        :case-type="i.case_type"
        :code="i.code"
        :info="i.info"
        :prescription="i.prescription"
        :radiology-cases="i.radiology_cases"
        :photography-cases="i.photography_cases"
        :radiology-msg="i.radiology_msg"
        :photography-msg="i.photography_msg"
        :radiology-id="i.radiology_id"
        :radiology="i.radiology"
        :photography-id="i.photography_id"
        :photography="i.photography"
        :doctor-id="i.doctor_id"
        :doctor="i.doctor"
        :doctor-desc="i.d_desc"
        :doctor-msg="i.doctor_msg"
        :p-result-at="i.p_result_at"
        :r-result-at="i.r_result_at"
        :d-result-at="i.d_result_at"
        :p-admission-at="i.p_admission_at"
        :r-admission-at="i.r_admission_at"
        :d-admission-at="i.d_admission_at"
        :selected-dents="i.selected_dents"
        :selected-actions="i.selected_actions"
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
          :length="list.meta.last_page"
          :total-visible="5"
        ></v-pagination>
      </div>
    </div>
    <appointment-page-item-form
      :id="item.id"
      :is-surgery="false"
      v-if="item"
      :open="showUpdateModal"
      @close="closeUpdateModal"
      @remove="paginate(1)"
      @done="doneUpdateModal"
    />
<!--    <appointment-form-component-->
<!--      :open="showUpdateModal"-->
<!--      :item="item"-->
<!--      @close="closeUpdateModal"-->
<!--      @remove="paginate(1)"-->
<!--      @done="doneUpdateModal"-->
<!--      :is-surgery="false"-->
<!--    />-->
  </div>
</template>

<script>
import AppointmentItemComponent from "~/components/panel/profile/appointments/AppointmentItemComponent";
import AppointmentFormComponent from "~/components/panel/appointment/AppointmentForm/AppointmentFormComponentV2";
import CreateAppointmentFormComponent
  from "~/components/panel/appointment/AppointmentForm/CreateAppointmentFormComponent.vue";
import LoadingCard from "~/components/global/LoadingCard.vue";

export default {
  name: "AppointmentListComponent",
  components: {LoadingCard, CreateAppointmentFormComponent, AppointmentItemComponent, AppointmentFormComponent},
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
        }, 300)
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
      this.item = null
      this.toggleShowUpdateModal()
    },
    doneUpdateModal() {
      this.getUserAppointmentsList(this.userId, 1)
      // this.toggleShowUpdateModal()
    },
  },
  computed: {
    list() {
      return this.$store.getters['appointments/getList']
    }
  },
  watch: {
    page(val) {
      this.paginate(val)
    }
  }
}
</script>

<style scoped>

</style>
