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
        <admin-organization-api-component
          v-if="organization"
          :organization="organization"
          :ApiKeys="apiKeys"
          :page="search.page"
          @paginate="paginate"
          @getApiKeysList="getApiKeysList"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AdminOrganizationTopComponent from "~/components/admin/organization/AdminOrganizationTopComponent";
import AdminOrganizationHeaderComponent from "~/components/admin/organization/AdminOrganizationHeaderComponent";
import AdminOrganizationApiComponent from "~/components/admin/organization/api/AdminOrganizationApiComponent";

export default {
  name: "ShowOrganizationComponent.vue",
  components: {
    AdminOrganizationApiComponent,
    AdminOrganizationHeaderComponent,
    AdminOrganizationTopComponent,
  },
  layout: "admin",
  middleware: "admin",
  mounted() {
    this.getOrganization()
  },
  data() {
    return {
      showAddUserModal: false,
      search: {
        page: 1,
      },
    }
  },
  methods: {
    paginate(page = 1) {
      this.search.page = page
      this.getApiKeysList()
    },
    getApiKeysList() {
      setTimeout(() => {
        this.$store.dispatch('api/getApiKeysList', {
          ...this.search,
          id: this.organization.id,
        })
      }, 200)
    },
    async getOrganization() {
      const id = this.$route.params.id
      this.$store.dispatch('organizations/getOrganization', id)
        .then(() => {
          this.paginate(1)
        })
      return Promise.resolve()
    },
  },
  computed: {
    organization() {
      return this.$store.getters['organizations/getOrganization']
    },
    apiKeys() {
      return this.$store.getters['api/getList']
    },
  },
}
</script>

<style scoped>

</style>
