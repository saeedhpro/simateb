<template>
  <div class="organization-page">
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
        <admin-organization-sample-item-component
          v-if="organization"
          :organization="organization"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AdminOrganizationTopComponent from "~/components/admin/organization/AdminOrganizationTopComponent.vue";
import AdminOrganizationHeaderComponent from "~/components/admin/organization/AdminOrganizationHeaderComponent.vue";

export default {
  name: "ShowOrganizationComponent.vue",
  components: {
    AdminOrganizationTopComponent,
    AdminOrganizationHeaderComponent,
  },
  layout: "admin",
  middleware: "admin",
  mounted() {
    this.getOrganization()
  },
  methods: {
    async getOrganization() {
      const id = this.$route.params.id
      this.$store.dispatch('organizations/getOrganization', id)
    },
  },
  computed: {
    organization() {
      return this.$store.getters['organizations/getOrganization']
    },
  },
}
</script>

<style scoped>

</style>
