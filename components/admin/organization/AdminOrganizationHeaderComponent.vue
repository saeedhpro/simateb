<template>
  <div class="organization-content">
    <div class="page-header-box organization">
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
      <nuxt-link :to="`/admin/organizations/${organization.id}/faq`" class="page-header">
        <img src="/images/pages/about.svg" alt="users">
        <span class="title">سوالات متداول</span>
      </nuxt-link>
      <nuxt-link :to="`/admin/organizations/${organization.id}/samples`" class="page-header">
        <img src="/images/pages/about.svg" alt="users">
        <span class="title">نمونه کارها</span>
      </nuxt-link>
      <nuxt-link :to="`/admin/organizations/${organization.id}/api`" class="page-header">
        <img src="/images/pages/about.svg" alt="users">
        <span class="title">API Key</span>
      </nuxt-link>
<!--      <v-divider class="d-none d-lg-flex" :style="{'margin-left': canSee ? '72px' : '0'}" inset/>-->
<!--      <v-spacer class="d-none d-sm-flex d-lg-none"/>-->
      <div class="page-actions"
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
      @done="doneAddUserModal"
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
    },
    doneAddUserModal() {
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
      return this.$route.name !== 'admin-organizations-id-about' &&
        this.$route.name !== 'admin-organizations-id-samples'
    },
  }
}
</script>

<style scoped>

</style>
