<template>
  <div v-if="loginUser">
    <v-app-bar
      :clipped-left="clipped"
      app
      height="auto"
      color="#3D3D66"
    >
      <v-app-bar-nav-icon class="open-drawer" @click.stop="rightDrawer = !rightDrawer" />
      <v-container fluid>
        <div class="nav-bar">
          <div v-if="loginUser" class="user-profile-box">
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
          <v-spacer />
          <div class="links">
            <nuxt-link to="/admin" :class="{'none' : notExactAdmin}">
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
            <nuxt-link to="/admin/insurances">
              <span class="title">بیمه</span>
            </nuxt-link>
            <nuxt-link to="/admin/payments">
              <span class="title">واریزی ها</span>
            </nuxt-link>
            <nuxt-link to="/admin/app">
              <span class="title">اپ</span>
            </nuxt-link>
          </div>
          <v-spacer />
        </div>
        <div class="nav-bar second">
          <div class="links">
            <nuxt-link to="/admin" :class="{'none' : notExactAdmin}">
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
            <nuxt-link to="/admin/insurances">
              <span class="title">بیمه</span>
            </nuxt-link>
            <nuxt-link to="/admin/payments">
              <span class="title">واریزی ها</span>
            </nuxt-link>
            <nuxt-link to="/admin/app">
              <span class="title">اپ</span>
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
        <v-list-item
          to="/admin"
          :class="{'none' : notExactAdmin}"
        >
          <v-list-item-title class="title">
            داشبورد
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          to="/admin/users"
        >
          <v-list-item-title class="title">
            کاربران
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          to="/admin/organizations"
        >
          <v-list-item-title class="title">
            موسسات
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          to="/admin/messages"
        >
          <v-list-item-title class="title">
            پیامک ها
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          to="/admin/holidays"
        >
          <v-list-item-title class="title">
            تعطیلات رسمی
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          to="/admin/insurances"
        >
          <v-list-item-title class="title">
            بیمه
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          to="/admin/payments"
        >
          <v-list-item-title class="title">
            واریزی ها
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          to="/admin/app"
        >
          <v-list-item-title class="title">
            اپ
          </v-list-item-title>
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
          isAdmin: true,
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
    },
    notExactAdmin() {
      return this.$route.path !== '/admin'
    }
  }
}
</script>

<style scoped>

</style>
