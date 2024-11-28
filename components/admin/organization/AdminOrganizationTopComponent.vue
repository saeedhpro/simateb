<template>
  <div class="organization-details">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <img
              class="profile-image"
              :src="organization.logo_link ? organization.logo_link : '/images/pages/img.svg'">
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="9"
          >
            <div class="detail-box">
              <div class="name-box">
                <span>{{ `${organization.name}` }}</span>
              </div>
              <div class="name-box">
                <span>{{ organization.phone }}</span>
              </div>
              <div class="name-box">
                <span>{{ organization.profession.name }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <div class="description-box">
          <div class="title">توضیحات</div>
          <div class="description">
            {{ organization.info }}
          </div>
          <div class="action-box">
            <v-spacer/>
            <div class="action-button" @click="showUpdate">
              <v-icon>
                mdi-pencil-outline
              </v-icon>
              <span>ویرایش اطلاعات</span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <update-organization-from-component
      @close="closeUpdate"
      @done="doneUpdate"
      :show="showUpdateModal"
      :item="organization"
    />
  </div>
</template>

<script>
import UpdateOrganizationFromComponent from "~/components/panel/orgnization/UpdateOrganizationFromComponent";
export default {
  name: "AdminOrganizationTopComponent",
  components: {UpdateOrganizationFromComponent},
  props: {
    organization: {
      type: Object,
      required: true,
      default: null,
    }
  },
  data() {
    return {
      showUpdateModal: false,
    }
  },
  methods: {
    showUpdate() {
      this.toggleShowUpdateModal()
    },
    closeUpdate() {
      this.toggleShowUpdateModal()
    },
    doneUpdate() {
      this.toggleShowUpdateModal()
      this.$emit("updated")
    },
    toggleShowUpdateModal() {
      this.showUpdateModal = !this.showUpdateModal
    },
  }
}
</script>

<style scoped>

</style>
