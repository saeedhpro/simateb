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
                      <v-container v-if="codeVerified">
                        <v-row>
                          <v-col
                            cols="12"
                            sm="8"
                            md="8"
                          >
                            <v-col
                              cols="12"
                              sm="4"
                              md="4"
                            >
                              <custom-text-input
                                :label="'رمز عبور'"
                                :error="errors.pass"
                                v-model="password"
                                @input="errors.pass = ''"
                                type="password"
                              />
                            </v-col>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                          >
                            <custom-text-input
                              :label="'تکرار رمز عبور'"
                              :error="errors.pass"
                              v-model="repeat_password"
                              @input="errors.pass = ''"
                              type="password"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                      <v-container v-else-if="showVerifyCode">
                        <v-row>
                          <v-col
                            cols="12"
                            sm="8"
                            md="8"
                          >
                            <custom-multi-select
                              v-model="organization"
                              :items="organizations"
                              :error="errors.organization_id"
                              :has-custom-label="false"
                              @input="errors.organization_id = ''"
                              label="مطب مورد نظر را انتخاب کنید"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                          >
                            <custom-phone-number-input
                              :label="'کد تایید'"
                              :error="errors.code"
                              v-model="code"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                      <v-container v-else>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                          >
                            <custom-phone-number-input
                              :label="'شماره موبایل'"
                              :error="errors.tel"
                              v-model="tel"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                          >
                            <button
                              class="second-button full-width"
                              @click="closeForgetPasswordModal"
                            >
                              بستن
                            </button>
                          </v-col>
                          <v-col
                            v-if="codeVerified"
                            cols="12"
                            sm="4"
                            md="4"
                          >
                            <button
                              class="main-button"
                              @click="changePassword"
                              :disabled="loadingChangePassword"
                            >
                              <v-progress-circular
                                indeterminate
                                color="white"
                                :size="17"
                                :width="4"
                                v-if="loadingChangePassword"/>
                              <span v-else>ثبت پسورد</span>
                            </button>
                          </v-col>
                          <v-col
                            v-else-if="showVerifyCode"
                            cols="12"
                            sm="4"
                            md="4"
                          >
                            <button
                              class="main-button"
                              @click="verifyResetPassword"
                              :disabled="loadingVerifyCode"
                            >
                              <v-progress-circular
                                indeterminate
                                color="white"
                                :size="17"
                                :width="4"
                                v-if="loadingVerifyCode"/>
                              <span v-else>تایید کد</span>
                            </button>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            v-else
                          >
                            <button
                              class="main-button"
                              @click="resetPassword"
                              :disabled="loadingResetPassword"
                            >
                              <v-progress-circular
                                indeterminate
                                color="white"
                                :size="17"
                                :width="4"
                                v-if="loadingResetPassword"/>
                              <span v-else>ارسال کد تایید</span>
                            </button>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-actions>
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
      loadingResetPassword: false,
      loadingVerifyCode: false,
      loadingChangePassword: false,
      showVerifyCode: false,
      codeVerified: false,
      organization: null,
      organizations: [],
      code: '',
      tel: '',
      password: '',
      repeat_password: '',
      errors: {
        tel: '',
        organization_id: '',
      }
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
    resetPassword() {
      if (this.loadingResetPassword) {
        return
      }
      this.loadingResetPassword = true
      const data = {
        'tel': this.tel,
      }
      this.$store.dispatch('login/resetPassword', data)
      .then(res => {
        this.$toast.success("کد تایید برای شما ارسال شد");
        this.loadingResetPassword = false
        this.organizations = res.data.data
        this.showVerifyCode = true
      })
      .catch(err => {
        this.$toast.error("شماره وارد شده صحیح نیست!");
        this.loadingResetPassword = false
      })
    },
    verifyResetPassword() {
      if (this.loadingVerifyCode) {
        return
      }
      this.loadingVerifyCode = true
      const data = {
        'tel': this.tel,
        'organization_id': this.organization ? this.organization.id : null,
        'code': this.code,
      }
      this.$store.dispatch('login/verifyResetPassword', data)
      .then(res => {
        this.$toast.success("پسورد جدید برای شما ارسال شد");
        this.loadingVerifyCode = false
        this.closeForgetPasswordModal()
      })
      .catch(err => {
        this.$toast.error("کد وارد شده صحیح نیست!");
        this.loadingVerifyCode = false
      })
    },
    changePassword() {
      if (this.loadingChangePassword) {
        return
      }
      if (!this.password || !this.repeat_password) {
        return;
      }
      if (this.password != this.repeat_password) {
        this.$toast.error("مز عبور و تکرار رمز عبور یکسان نیست!");
        return;
      }
      this.loadingChangePassword = true
      const data = {
        'tel': this.tel,
        'organization_id': this.organization ? this.organization.id : null,
        'password': this.password,
      }
      this.$store.dispatch('login/changePassword', data)
      .then(res => {
        this.$toast.success("پسورد جدید با موفقیت ثبت");
        this.loadingChangePassword = false
        this.closeForgetPasswordModal()
      })
    },
    showForgetPasswordModal() {
      this.showForgetModal = true
    },
    closeForgetPasswordModal() {
      this.tel = ''
      this.organization = null
      this.organizations = []
      this.code = ''
      this.showForgetModal = false
      this.loadingResetPassword = false
      this.showVerifyCode = false
      this.codeVerified = false
      this.loadingVerifyCode = false
      this.loadingChangePassword = false
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>
