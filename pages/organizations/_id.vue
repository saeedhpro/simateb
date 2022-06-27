<template>
  <div class="organization-page" v-if="organization">
    <v-row>
      <v-col
        cols="12"
      >
        <div class="organization-details">
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                >
                  <img
                    class="profile-image"
                    :src="organization.logo ? organization.logo : '/images/pages/img.svg'">
                </v-col>
                <v-col
                  cols="12"
                  md="9"
                >
                  <div class="detail-box">
                    <div class="name-box">
                      <span>{{ `${organization.name}` | persianDigit }}</span>
                    </div>
                    <div class="name-box">
                      <span>{{ organization.phone | persianDigit }}</span>
                    </div>
                    <div class="name-box">
                      <span>{{ organization.profession.name | persianDigit }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <div class="description-box">
                <div class="title">توضیحات</div>
                <div class="description">
                  {{ organization.info | persianDigit }}
                </div>
                <div class="action-box">
                  <v-spacer />
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
        </div>
      </v-col>
    </v-row>
    <update-organization-from-component
      @close="showUpdate"
      :show="showUpdateModal"
      :item="organization"
    />
  </div>
</template>

<script>
import UpdateOrganizationFromComponent from "~/components/panel/orgnization/UpdateOrganizationFromComponent";
export default {
  name: "ShowOrganizationComponent.vue",
  components: {UpdateOrganizationFromComponent},
  layout: "admin",
  middleware: "admin",
  mounted() {
    this.getOrganization()
  },
  data() {
    return {
      showUpdateModal: false,
    }
  },
  methods: {
    getOrganization() {
      const id = this.$route.params.id
      this.$store.dispatch('organizations/getOrganization', id)
    },
    showUpdate() {
      this.toggleShowUpdateModal()
    },
    toggleShowUpdateModal() {
      this.showUpdateModal = !this.showUpdateModal
    },
  },
  computed: {
    organization() {
      return this.$store.getters['organizations/getOrganization']
    },
  }
}
</script>

<style scoped>

</style>
