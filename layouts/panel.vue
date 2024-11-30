<template>
  <v-app dir="rtl">
    <header-component />
    <v-main :class="{'has-notif': show}">
      <div class="notif" v-if="show">
        <span>
        <span>
پزشک عزیز اعتبار کیف پول شما منفی شده است. لطفا برای پیشگیری از قطع شدن سرویس پیامکی شما در سریعترین زمان اعتبار کیف پول تان را افزایش دهید.        </span>
        <nuxt-link to="/messages/pay" style="color: gold !important;">افزایش اعتبار</nuxt-link>
        </span>
        <button
          @click="closeShowNotif"
        >
          <v-icon color="white">mdi-close</v-icon>
        </button>
      </div>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from "~/components/panel/global/HeaderComponent";

export default {
  name: 'PanelLayout',
  components: { HeaderComponent },
  middleware: 'auth',
  data() {
    return {
      showNotif: true
    }
  },
  methods: {
    closeShowNotif() {
      this.showNotif = false
    }
  },
  computed: {
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    show() {
      return this.showNotif && this.loginUser.organization.sms_credit <= -20000
    },
  }
}
</script>
<style>
  .notif {
    background: red;
    padding: 5px 15px;
    color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    button {
      background: #1A1A1A;
      border-radius: 50%;
      height: 24px;
      width: 24px;
    }
  }
</style>
