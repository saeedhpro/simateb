<template>
  <div v-if="loginUser">
    <v-app-bar
      app
      height="84"
      color="#3D3D66"
    >
      <v-container fluid>
        <div class="nav-bar">
          <div v-if="loginUser" class="user-profile-box d-none d-sm-flex">
            <img :src="loginUser.logo" />
            <span class="user-full-name">{{ `${loginUser.fname} ${loginUser.lname}` }}</span>
            <v-menu
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  color="#ffffff"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  @click="exit"
                >
                  <v-list-item-title>خروج</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <v-spacer />
          <div class="organization-box">
            <img src="/images/header/hospital.svg">
            <div class="organization-name">{{ loginUser.organization.name }}</div>
          </div>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "PatientHeaderComponent",
  methods: {
    async exit() {
      await this.$store.dispatch('login/exit')
      await this.$router.push('/')
    }
  },
  computed: {
    loginUser() {
      return this.$store.getters['login/getUser']
    },
  }
}
</script>

<style scoped>

</style>
