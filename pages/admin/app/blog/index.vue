<template>
  <div class="profile-page">
    <v-container
      fluid
    >
      <app-header-component :type="getType" />
      <v-row>
        <v-col
          cols="12"
        >
          <v-container fluid>
            <v-tabs
              v-model="tabs"
              class="profile-tabs-header no-swipe"
              mobile-breakpoint="600"
            >
              <v-tab
                class="profile-tab"
              >
                لیست دسته بندی ها
              </v-tab>
              <v-tab
                class="profile-tab"
              >
                لیست محتواها
              </v-tab>
            </v-tabs>
          </v-container>
          <div
            class="profile-tabs-box"
          >
            <v-tabs-items v-model="tabs" touchless>
              <v-tab-item>
                <category-list :type="getType"/>
              </v-tab-item>
              <v-tab-item>
                <article-list :type="getType"/>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import CropImageComponent from "~/components/panel/global/CropImageComponent";
import CreateUserFormComponent from "~/components/panel/profile/user/CreateUserFormComponent";
import AdminCreateUserFormComponent from "~/components/admin/user/AdminCreateUserFormComponent";
import SendSmsComponent from "~/components/global/sms/SendSmsComponent";
import AdminDeleteUsersComponent from "~/components/admin/global/AdminDeleteUsersComponent";
import AppHeaderComponent from "~/components/admin/app/AppHeaderComponent.vue";
import CategoryList from "~/components/admin/app/CategoryList.vue";
import ArticleList from "~/components/admin/app/ArticleList.vue";

export default {
  name: "index",
  components: {
    ArticleList,
    CategoryList,
    AppHeaderComponent,
  },
  layout: 'admin',
  middleware: 'auth',
  data() {
    return {
      tabs: null,
    }
  },
  computed: {
    getType() {
      switch (this.$route.path) {
        case '/admin/app/page':
          return 'page'
        case '/admin/app/blog':
          return 'blog'
        default:
          return ''
      }
    },
  },
}
</script>

<style scoped>

</style>
