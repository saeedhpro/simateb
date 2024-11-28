<template>
  <v-app dir="rtl">
    <header-component />
    <v-main>
      <div class="notif" v-if="show">
        <span>
          اعتبار پیامکی شما به پایان رسیده است. در صورت عدم شارژ اعتبار خود، در مدت سه روز آینده امکان ارسال پیامک لغو می گردد!
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
    }
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
    font-size: 14px;
    button {
      background: #1A1A1A;
      border-radius: 50%;
    }
  }
</style>
