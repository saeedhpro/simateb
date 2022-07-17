<template>
  <div class="organization-page" v-if="organization">
    <v-row>
      <v-col
        cols="12"
      >
        <admin-organization-top-component
          v-if="organization"
          :organization="organization"
          @updated="getOrganization"
        />
        <admin-organization-header-component
          v-if="organization"
          :organization="organization"
          @updated="getOrganization"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <admin-organization-slider-component
          v-if="organization"
          :organization="organization"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import AdminOrganizationTopComponent from "~/components/admin/organization/AdminOrganizationTopComponent";
import AdminOrganizationHeaderComponent from "~/components/admin/organization/AdminOrganizationHeaderComponent";
import AdminOrganizationSliderComponent from "~/components/admin/organization/slider/AdminOrganizationSliderComponent";

export default {
  name: "ShowOrganizationSliderComponent.vue",
  components: {
    AdminOrganizationSliderComponent,
    AdminOrganizationHeaderComponent,
    AdminOrganizationTopComponent,
    DataTableComponent,
  },
  layout: "admin",
  middleware: "admin",
  mounted() {
    this.getOrganization()
  },
  methods: {
    async getOrganization() {
      const id = this.$route.params.id
      await this.$store.dispatch('organizations/getOrganization', id)
      return Promise.resolve()
    },
  },
  computed: {
    organization() {
      return this.$store.getters['organizations/getOrganization']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
  },
}
</script>

<style scoped>

</style>
