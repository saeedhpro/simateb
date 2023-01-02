<template>
  <div class="organization-content">
    <div class="page-header-box">
      <nuxt-link :to="`/admin/organizations/${organization.id}`" class="page-header">
        <img src="/images/pages/users.svg" alt="users">
        <span class="title">بیماران</span>
      </nuxt-link>
      <nuxt-link :to="`/admin/organizations/${organization.id}/slider`" class="page-header">
        <img src="/images/pages/sliders.svg" alt="users">
        <span class="title">تصاویر اسلایدر</span>
      </nuxt-link>
      <nuxt-link :to="`/admin/organizations/${organization.id}/about`" class="page-header">
        <img src="/images/pages/about.svg" alt="users">
        <span class="title">درباره موسسه</span>
      </nuxt-link>
      <v-divider inset :style="{'margin-left': canSee ? '72px' : '0'}"/>
      <div class="page-actions"
           style="min-width: 220px"
           @click="toggleAddUserModal"
           v-if="canSee"
      >
        <img src="/images/pages/new-user.svg" alt="users">
        <span class="title-main">افزودن بیمار جدید</span>
      </div>
    </div>
    <create-user-form-component
      v-if="organization"
      :open="showAddUserModal"
      :org="organization"
      @close="closeAddUserModal"
      :has-default="true"
    />
  </div>
</template>

<script>
import CreateUserFormComponent from "~/components/panel/profile/user/CreateUserFormComponent";
export default {
  name: "AdminOrganizationHeaderComponent",
  components: {CreateUserFormComponent},
  props: {
    organization: {
      type: Object,
      required: true,
      default: null,
    }
  },
  data() {
    return {
      showAddUserModal: false,
    }
  },
  methods: {
    closeAddUserModal() {
      this.toggleAddUserModal()
      this.$emit("updated")
    },
    toggleAddUserModal() {
      this.showAddUserModal = !this.showAddUserModal
    },
    async getOrganization() {
      const id = this.$route.params.id
      await this.$store.dispatch('organizations/getOrganization', id)
      return Promise.resolve()
    },
  },
  computed: {
    canSee() {
      return this.$route.name !== 'admin-organizations-id-about'
    },
  }
}
</script>

<style scoped>

</style>
