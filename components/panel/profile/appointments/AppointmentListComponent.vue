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
        :radiology-id="i.radiology_id"
        :photography-id="i.photography_id"
        :p-result-at="i.p_result_at"
        :r-result-at="i.r_result_at"
        :p-admission-at="i.p_admission_at"
        :r-admission-at="i.r_admission_at"
        @updated="onUpdate(i)"
      />
      <div
        class="more-items"
        v-if="list.total_rows > 10"
      >
        <v-pagination
          dir="ltr"
          v-model="page"
          :length="list.total_pages"
          :total-visible="5"
        ></v-pagination>
      </div>
    </div>
    <appointment-form-component
      :open="showUpdateModal"
      :item="item"
      @close="closeUpdateModal"
      @remove="paginate"
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
    }
  },
  mounted() {
    this.getUserAppointmentsList(this.userId, this.page)
  },
  methods: {
    paginate(page) {
      this.page = page
      this.getUserAppointmentsList(this.userId, page)
    },
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
