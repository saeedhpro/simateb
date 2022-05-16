<template>
  <div v-if="loginUser">
    <v-app-bar
      :clipped-left="clipped"
      app
      height="84"
      color="#3D3D66"
    >
      <v-app-bar-nav-icon class="d-flex d-md-none open-drawer" @click.stop="rightDrawer = !rightDrawer" />
      <v-container fluid>
        <div class="nav-bar justify-start">
          <div v-if="loginUser" class="user-profile-box d-none d-sm-flex">
            <img :src="loginUser.logo" />
            <span class="user-full-name">{{ `${loginUser.fname} ${loginUser.lname}` | persianDigit}}</span>
            <v-menu
              open-on-hover
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
                  v-for="(item, index) in items"
                  :key="index"
                  link
                  @click="goToPage(item.link)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                <v-divider />
                <v-list-item
                  @click="exit"
                >
                  <v-list-item-title>خروج</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="links d-none d-md-flex mx-auto">
            <nuxt-link to="/admin">
              <span class="title">داشبورد</span>
            </nuxt-link>
            <nuxt-link to="/admin/users">
              <span class="title">کاربران</span>
            </nuxt-link>
            <nuxt-link to="/admin/organizations">
              <span class="title">موسسات</span>
            </nuxt-link>
            <nuxt-link to="/admin/messages">
              <span class="title">پیامک ها</span>
            </nuxt-link>
            <nuxt-link to="/admin/holidays">
              <span class="title">تعطیلات رسمی</span>
            </nuxt-link>
          </div>
        </div>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer
      v-model="rightDrawer"
      right
      temporary
      fixed
    >
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "AdminHeaderComponent",
  data () {
    return {
      clipped: false,
      rightDrawer: false,
      items: [
        {
          link: '/admin',
          title: 'پنل مدیریت',
          isAdmin: true,
        },
        {
          link: '/profile',
          title: 'پروفایل من',
          isAdmin: false,
        },
        {
          link: '/admin/reports',
          title: 'گزارش ها',
          isAdmin: true,
        },
      ]
    }
  },
  methods: {
    goToPage(route) {
      this.$router.push(route)
    },
    async exit() {
      await this.$store.dispatch('login/exit')
      await this.$router.push('/')
    }
  },
  computed: {
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    isAdmin() {
      return this.loginUser.user_group_id === 2
    }
  }
}
</script>

<style scoped>

</style>
