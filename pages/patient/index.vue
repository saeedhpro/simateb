<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box">
          <div class="page-header">
            <img src="/images/pages/docs.svg" alt="organizations">
            <span class="title">
           مستندات ارسال شده
          </span>
          </div>
          <v-divider inset :style="{marginLeft: 0}"/>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <v-card
          class="page-main-box"
        >
          <files-list-component
            :files="userFiles"
            @refresh="getDocs"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import FilesListComponent from "~/components/panel/profile/documents/FilesListComponent";
export default {
  name: "index",
  components: {FilesListComponent},
  layout: 'patient',
  middleware: 'patient',
  mounted() {
    this.getDocs()
  },
  data() {
    return {
      page: 1,
    }
  },
  methods: {
    getDocs() {
      this.$store.dispatch('users/getUserFiles', {
        id: this.loginUser.id,
        page: this.page,
      })
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    userFiles() {
      return this.$store.getters['users/userFiles']
    },
  },
}
</script>

<style scoped>

</style>
