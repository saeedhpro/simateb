<template>
  <div class="profile-page" v-if="user">
    <v-row>
      <v-col
        cols="12"
      >
        <admin-user-derails-component
          :user="user"
          @updated="getUser"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AdminUserDerailsComponent from "~/components/admin/user/profile/AdminUserDerailsComponent";

export default {
  name: "profile.vue",
  layout: "admin",
  middleware: "admin",
  components: {
    AdminUserDerailsComponent,
  },
  mounted() {
    this.getUser()
  },
  data() {
    return {
      tabs: null,
      mTabs: null,
      showDelete: false,
      showHistoryModal: false,
      showUpdateModal: false,
    }
  },
  methods: {
    getUser() {
      this.$store.dispatch('users/getUser', this.$route.params.id)
    },
  },
  computed: {
    user() {
      return this.$store.getters['users/getUser']
    },
  }
}
</script>

<style scoped>

</style>
