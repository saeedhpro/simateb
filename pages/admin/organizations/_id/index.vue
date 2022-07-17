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
        <admin-organization-main-component
          v-if="organization"
          :organization="organization"
          :users="users"
          :page="search.page"
          @paginate="paginate"
          @getUsersList="getUsersList"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AdminOrganizationTopComponent from "~/components/admin/organization/AdminOrganizationTopComponent";
import AdminOrganizationHeaderComponent from "~/components/admin/organization/AdminOrganizationHeaderComponent";
import AdminOrganizationMainComponent from "~/components/admin/organization/main/AdminOrganizationMainComponent";

export default {
  name: "ShowOrganizationComponent.vue",
  components: {
    AdminOrganizationMainComponent,
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
        q: "",
        page: 1,
      },
    }
  },
  methods: {
    paginate(page = 1) {
      this.search.page = page
      this.getUsersList(this.search.q)
    },
    getUsersList(q = '') {
      this.search.q = q
      this.$store.dispatch('users/getOrganizationPatients', {
        ...this.search,
        id: this.organization.id,
      })
    },
    getAllUsers() {
      this.$store.dispatch('users/getOrganizationUsers', this.organization.id)
    },
    async getOrganization() {
      const id = this.$route.params.id
      this.$store.dispatch('organizations/getOrganization', id)
        .then(() => {
          this.paginate(1)
          this.getAllUsers()
        })
      return Promise.resolve()
    },
  },
  computed: {
    organization() {
      return this.$store.getters['organizations/getOrganization']
    },
    users() {
      return this.$store.getters['users/getOrganizationPatients']
    },
  },
}
</script>

<style scoped>

</style>
