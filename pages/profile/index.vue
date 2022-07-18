<template>
  <div class="profile-page" v-if="user">
    <v-row>
      <v-col
        cols="12"
      >
        <user-derails-component
          :user="user"
          @updated="getUser"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UpdateUserFormComponent from "~/components/panel/profile/user/UpdateUserFormComponent";
import UserDerailsComponent from "~/components/panel/profile/user/UserDerailsComponent";

export default {
  name: "profile.vue",
  layout: "panel",
  middleware: "auth",
  components: {
    UserDerailsComponent,
    UpdateUserFormComponent,
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.$store.dispatch('users/getUser', this.loginUser.id)
    },
  },
  computed: {
    user() {
      return this.$store.getters['users/getUser']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
  }
}
</script>

<style scoped>

</style>
