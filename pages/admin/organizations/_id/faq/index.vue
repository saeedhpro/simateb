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
        <admin-organization-faq-component
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
import AdminOrganizationFaqComponent from "~/components/admin/organization/faq/AdminOrganizationFaqComponent.vue";

export default {
  name: "ShowOrganizationComponent.vue",
  components: {
    AdminOrganizationFaqComponent,
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
        .then(r => {
          this.text1 = r.data.text1
          this.text2 = r.data.text2
          this.text3 = r.data.text3
          this.text4 = r.data.text4
          this.image1 = r.data.image1
          this.image2 = r.data.image2
          this.image3 = r.data.image3
          this.image4 = r.data.image4
        })
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
