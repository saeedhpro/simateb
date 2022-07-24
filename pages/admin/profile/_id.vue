<template>
  <div class="profile-page" v-if="user">
    <v-row>
      <v-col
        cols="12"
      >
        <show-user-derails-component
          :user="user"
          @updated="getUser"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ShowUserDerailsComponent from "~/components/panel/profile/user/ShowUserDerailsComponent";

export default {
  name: "profile.vue",
  layout: "admin",
  middleware: "admin",
  components: {
    ShowUserDerailsComponent,
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
