<template>
  <div class="appointment-form-component" v-if="show">
    <v-dialog
      v-model="show"
      persistent
      max-width="1056px"
    >
      <v-card
        class="create-update-modal paziresh-form"
        v-if="loaded"
      >
        <v-card-title
          class="create-update-modal-title-box"
        >
          <div class="create-update-modal-title">
            <button
              @click="closeForm"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>فرم رزرو وقت VIP</span>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text
          class="paziresh-form-box"
        >
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-text-input
                  v-model="form.fname"
                  :error="errors.fname"
                  @input="errors.fname = ''"
                  label="نام بیمار"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-text-input
                  v-model="form.lname"
                  :error="errors.lname"
                  @input="errors.lname = ''"
                  label="نام خانوادگی بیمار"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-multi-select
                  v-model="form.organization_id"
                  :items="organizations"
                  :error="errors.organization_id"
                  :has-custom-label="false"
                  @input="errors.organization_id = ''"
                  label="پزشک"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-multi-select
                  v-model="form.case_type"
                  :items="case_types"
                  :error="errors.case_type"
                  :has-custom-label="false"
                  @input="errors.case_type = ''"
                  label="نوع خدمت"
                  :disabled="!this.form.organization_id"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-phone-number-input
                  :label="'شماره موبایل'"
                  v-model="form.tel"
                  :error="errors.tel"
                  @input="errors.tel = ''"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>جنسیت</label>
                  <gender-switch-box-component
                    v-model="form.gender"
                    :error="errors.gender"
                    @input="errors.gender = ''"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>تاریخ تولد</label>
                  <custom-date-input
                    :type="'date'"
                    v-model="form.birth_date"
                    :initial-value="form.birth_date"
                    :error="errors.birth_date"
                    @input="errors.birth_date = ''"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="8"
                md="8"
              >
                <div
                  v-if="form.case_type"
                  class="create-update-model-input-box">
                  <label>نزدیگ ترین زمان ممکن</label>
                  <v-radio-group v-model="form.start_at" v-if="startAtList.length > 0">
                    <v-radio
                      v-for="(s, n) in startAtList"
                      :key="n"
                      :label="s.label"
                      :value="s.start_at"
                    ></v-radio>
                  </v-radio-group>
                  <p v-else>امکان رزرو وقت برای این دکتر وجود ندارد</p>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="3"
                md="3"
              >
                <button
                  class="second-button"
                  @click="resetForm"
                >
                  پاک کردن فرم
                </button>
              </v-col>
              <v-spacer/>
              <v-col
                cols="12"
                sm="3"
                md="3"
              >
                <button
                  class="second-button"
                  @click="closeForm"
                >
                  بستن
                </button>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <v-row>
                  <v-col>
                    <button
                      class="main-button"
                      @click="save"
                    >
                      رزرو وقت
                    </button>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import GenderSwitchBoxComponent from "~/components/panel/profile/user/GenderSwitchBoxComponent.vue";

export default{
  name: "AppointmentReserveComponent",
  components: {GenderSwitchBoxComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      loaded: false,
      form: {
        fname: '',
        lname: '',
        organization_id: 0,
        case_type: 0,
        gender: '',
        tel: '',
        birth_date: '',
        start_at: '',
      },
      startAtList: [],
      organizations: [],
      case_types: [],
      errors: {
        fname: '',
        lname: '',
        organization_id: '',
        case_type: '',
        start_at: '',
        birth_date: '',
        gender: '',
        tel: '',
      },
    }
  },
  mounted() {
    this.loaded = true
    this.getOrganizations()
  },
  methods: {
    closeForm() {
      this.$emit('close')
      this.resetErrors()
      this.resetForm()
    },
    resetErrors() {
      this.errors = {
        fname: '',
        lname: '',
        organization_id: '',
        case_type: '',
      }
    },
    resetForm() {
      this.form = {
        fname: '',
        lname: '',
        organization_id: 0,
        case_type: 0,
        gender: '',
        tel: '',
        birth_date: '',
        start_at: '',
      }
      this.resetErrors()
    },
    save() {
      const data = {
        ...this.form,
        organization_id: this.form.organization_id.id,
        case_type: this.form.case_type.name
      }
      if(!this.validateForm(data)) {
        return
      }
      this.$store.dispatch('appointments/reserveAppointmentForDoctor', data)
        .then(res => {
          this.closeForm()
        })
        .catch(err => {
          console.log(err, "err")
        })
    },
    validateForm(form) {
      let isValid = true
      if (!form.fname) {
        isValid = false
        this.errors.fname = 'نام بیمار را وارد کنید'
        this.$toast.error('نام بیمار را وارد کنید')
      }
      if (!form.lname) {
        isValid = false
        this.errors.lname = 'نام خانوادگی بیمار را وارد کنید'
        this.$toast.error('نام خانوادگی بیمار را وارد کنید')
      }
      if (!form.organization_id) {
        isValid = false
        this.errors.organization_id = 'پزشک را انتخاب کنید'
        this.$toast.error('پزشک را انتخاب کنید')
      }
      if (!form.case_type) {
        isValid = false
        this.errors.case_type = 'نوع خدمت را انتخاب کنید'
        this.$toast.error('نوع خدمت را انتخاب کنید')
      }
      if (!form.tel) {
        isValid = false
        this.errors.tel = 'شماره موبایل بیمار را وارد کنید'
        this.$toast.error('شماره موبایل بیمار را وارد کنید')
      }
      if (!form.gender) {
        isValid = false
        this.errors.gender = 'جنسیت بیمار را انتخاب کنید'
        this.$toast.error('جنسیت بیمار را انتخاب کنید')
      }
      if (!form.birth_date) {
        isValid = false
        this.errors.birth_date = 'تاریخ تولد بیمار را وارد کنید'
        this.$toast.error('تاریخ تولد بیمار را وارد کنید')
      }
      if (!form.start_at) {
        isValid = false
        this.errors.start_at = 'تاریخ رزرو وقت را وارد کنید'
        this.$toast.error('تاریخ رزرو وقت را وارد کنید')
      }
      return isValid
    },
    getOrganizations() {
      this.$axios.get('/organizations/type')
        .then(res => {
          this.organizations = res.data.data
        })
    },
    getCaseTypes(val) {
      // this.$axios.get(`/organizations/${this.loginUser.organization_id}/cases`)
      this.$axios.get(`/organizations/${val.id}/cases/v2`)
        .then(res => {
          const cases = res.data.data
          this.case_types = cases.map(i => ({
            id: i,
            name: i
          }))
        })
    },
    getWindows(caseType) {
      const id = this.form.organization_id ? this.form.organization_id.id : 0
      this.$axios.get(`/organizations/${id}/windows?origin=own&case=${caseType.name}`)
        .then(res => {
          this.startAtList = res.data
        })
    },
  },
  computed: {
    show() {
      return this.open;
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    }
  },
  watch: {
    'form.organization_id'(val) {
      this.form.case_type = ''
      this.form.start_at = ''
      if (val) {
        this.getCaseTypes(val)
      } else {
        this.case_types = []
      }
    },
    'form.case_type'(val) {
      if (val) {
        this.getWindows(val)
      } else {
        this.startAtList = []
      }
    }
  }
}
</script>

<style scoped>

</style>
