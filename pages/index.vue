<template>
  <div class="login-box">
    <div class="login-form-box">
      <div class="login-right">
        <div class="logo">
          <nuxt-link to="/">
            <img src="/images/login/logo.png">
          </nuxt-link>
        </div>
        <span class="login-title">ورود بـه سـایـتــ</span>
        <form class="login-form" @submit.prevent="login">
          <v-row>
            <v-col cols="12">
              <v-text-field
              type="text"
              placeholder="شماره همراه"
              class="form-input"
              background-color="#F5F5F5"
              outlined
              full-width
              label="شماره همراه"
              dir="ltr"
              v-model="form.tel"
              name="tel"
              >
                <v-icon
                  slot="prepend-inner"
                  color="#141432"
                >
                  mdi-phone-outline
                </v-icon>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
              :type="showPassword ? 'text' : 'password'"
              placeholder="رمز عبور"
              class="form-input"
              background-color="#F5F5F5"
              outlined
              full-width
              label="رمز عبور"
              dir="ltr"
              v-model="form.password"
              name="password"
              >
                <v-icon
                  slot="prepend-inner"
                  color="#141432"
                  @click="toggleShowPassword"
                >
                  mdi-eye-outline
                </v-icon>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <button class="login-button">
                <span class="login-icon">
                  <img src="/images/login/arrow-right.png">
                </span>
                ورود
              </button>
            </v-col>
          </v-row>
          <v-row >
            <v-col cols="12">
              <v-dialog
                transition="dialog-bottom-transition"
                max-width="600"
                v-model="showForgetModal"
              >
                <template v-slot:activator="{ on, attrs }">
                  <div class="forget-password" @click="showForgetPasswordModal">رمز عبورم را فراموش کرده‌ام</div>
                </template>
                <template v-slot:default="dialog">
                  <v-card
                  outlined
                  class="forget-box"
                  >
                    <v-card-text
                      class="forget-inner-box"
                    >
                      <span
                        class="close-button"
                        @click="showForgetPasswordModal"
                      >
                        <img src="/images/login/close.svg">
                      </span>
                      <img src="/images/login/logo.png">
                      <div class="forget-title">فـرامـوشـی رمـز عـبـور</div>
                      <div class="forget-text">
                        در صورت فراموشی رمز عبور خود، لطفا با <span class="font-weight-bold">مدیریت سیماطب</span> ارتباط حاصل فرمایید <br> با تشکر
                      </div>
                      <button
                        @click.prevent="showForgetPasswordModal"
                        class="close-forget"
                      >
                        متوجه شدم
                      </button>
                    </v-card-text>
                  </v-card>
                </template>
              </v-dialog>
            </v-col>
            <v-col cols="12">
              <nuxt-link to="/patient/login" class="forget-password">ورود بیمار</nuxt-link>
            </v-col>
          </v-row>
        </form>
      </div>
      <div class="login-left d-none d-md-flex">
        <img src="/images/login/login.png">
        <img src="/images/login/simateb.svg" class="simateb">
      </div>
    </div>
  </div>
</template>

<script>
import {NotFoundError} from "core-js/internals/dom-exception-constants";

export default {
  name: 'IndexPage',
  layout: 'login',
  middleware: 'guest',
  data() {
    return {
      form: {
        tel: '',
        password: '',
      },
      loading: false,
      showForgetModal: false,
      showPassword: false,
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login/login', this.form)
      .then(res => {
        if (res.data.data.user.user_group_id === 1) {
          throw NotFoundError
        }
        this.$toast.success("شما با موفقیت وارد شدید");
        this.$router.push({
          path: '/organization'
        })
      })
      .catch(err => {
        this.$store.dispatch('login/exit')
        this.$toast.error("کاربر یافت نشد!");
      })
    },
    showForgetPasswordModal() {
      this.showForgetModal = !this.showForgetModal
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>
