<template>
  <div class="appointment-form-component" v-if="show && item">
    <v-dialog
      v-model="show"
      persistent
      max-width="1056px"
    >
      <v-card
        class="create-update-modal"
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
            <span>فرم پذیرش</span>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-date-picker-js
                  label="تاریخ و ساعت پذیرش"
                  v-model="appointment.start_at"
                  :jump-minute="15"
                  :round-minute="true"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box" :class="{'has-error': errors.user_id}">
                  <label class="d-flex flex-row align-center justify-space-between full-width">
                    <span>نام بیمار</span>
                    <span class="cursor-pointer" @click="openCreateNewUser"><v-icon color="#5063FF">mdi-account-plus</v-icon></span>
                  </label>
                  <multiselect
                    searchable
                    clearOnSelect
                    allowEmpty
                    v-model="user"
                    placeholder=""
                    :label="'full_name'"
                    :track-by="'full_name'"
                    :options="users"
                    :option-height="104"
                    :show-labels="false"
                    :loading="isLoading"
                    :internal-search="false"
                    @input="onUserChanged"
                    @search-change="onSearchUsers"
                  >
                    <template slot="singleLabel" slot-scope="props">
                      <span
                        class="option__desc d-flex flex-row">
                        <img :src="getLogo(props.option)" style="height: 25px; margin-left: 5px; border-radius: 5px"/>
                      <span
                        class="option__title">{{ `${props.option.fname} ${props.option.lname}` }}</span></span>
                    </template>
                    <template slot="option" slot-scope="props">
                      <div class="option__desc d-flex flex-row">
                        <img :src="getLogo(props.option)" style="height: 25px; margin-left: 5px; border-radius: 5px"/>
                        <span class="option__title">{{ `${props.option.fname} ${props.option.lname}` }}</span></div>
                    </template>
                  </multiselect>
                  <span class="create-update-modal-input-error" v-if="errors.user_id">{{ errors.user_id }}</span>
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-phone-number-input
                  :label="'شماره موبایل'"
                  v-model="appointment.tel"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-national-code-input
                  :label="'کد ملی'"
                  v-model="appointment.cardno"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-text-input
                  :label="'شماره پرونده'"
                  v-model="appointment.file_id"
                  @input="getUserByFileId"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-price-input
                  :label="'هزینه ویزیت'"
                  v-model="appointment.income"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="3"
                md="2"
                v-for="(c,n) in cases"
                :key="n"
              >
                <case-type-checkbox-component
                  :id="c.id"
                  :name="c.name"
                  :items="cases"
                  :is-checked="appointment.case_type === c.name"
                  @change="onChecked"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <custom-text-area-input
                  :label="'شرح حال و توضیحات پذیرش'"
                  v-model="appointment.info"
                  :rows="6"
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
                sm="3"
                md="3"
              >
                <button
                  class="second-button full-width"
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
                v-if="isDoctor"
              >
                <button
                  class="second-button full-width"
                  @click="closeForm"
                >
                  بستن
                </button>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
                v-if="isDoctor"
              >
                <v-row>
                  <v-col>
                    <button
                      class="main-button"
                      @click="openAcceptModal"
                    >
                      ذخیره تغییرات
                    </button>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <accept-create-appointment-modal
      v-if="user"
      :open="showAcceptModal"
      :full-name="`${user.fname} ${user.lname}`"
      :start-at="appointment.start_at"
      @close="toggleAcceptModal"
      @accept="updateAppointment"
    />
    <create-user-form-component
      :open="showCreateUser"
      @close="closeCreateUserForm"
      @done="doneCreateUserForm"
    />
  </div>
</template>

<script>
import CaseTypeCheckboxComponent from "~/components/panel/appointment/CaseTypeCheckboxComponent";
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import CustomMultiSelect from "~/components/custom/CustomMultiSelect";
import CustomTextInput from "~/components/custom/CustomTextInput";
import CustomPriceInput from "~/components/custom/CustomPriceInput";
import CustomTextAreaInput from "~/components/custom/CustomTextAreaInput";
import AcceptCreateAppointmentModal from "~/components/panel/appointment/AppointmentForm/AcceptCreateAppointmentModal";
import CustomNationalCodeInput from "~/components/custom/CustomNationalCodeInput";
import CustomPhoneNumberInput from "~/components/custom/CustomPhoneNumberInput";
import moment from "jalali-moment";
import CustomDateInput from "~/components/custom/CustomDateInput";
import {apps} from "~/ecosystem.config";
import {debounce} from "lodash";
import CreateUserFormComponent from "~/components/panel/profile/user/CreateUserFormComponent.vue";

export default {
  name: "UpdateAppointmentFormComponent",
  components: {
    CreateUserFormComponent,
    CustomDateInput,
    CustomPhoneNumberInput,
    CustomNationalCodeInput,
    AcceptCreateAppointmentModal,
    CustomTextAreaInput,
    CustomPriceInput,
    CustomTextInput,
    CustomMultiSelect,
    DataTableComponent,
    CaseTypeCheckboxComponent,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
    item: {
      type: Object,
    },
  },
  data() {
    return {
      appointment: {
        id: 0,
        start_at: '',
        tel: '',
        cardno: '',
        income: 0,
        user_id: null,
        case_type: '',
        info: '',
        status: 0,
        user: null,
        user_insurance_id: null,
        insurance_price: 0,
        patient_price: 0,
        total_price: 0,
        selected_actions: [],
        selected_dents: [],
        d_desc: '',
        appcode: null,
        future_prescription: '',
        doctor_id: null,
        discount_price: 0,
        insurance_id: null,
        insurance: null,
        user_insurance: null,
      },
      errors: {
        start_at: '',
        user_id: '',
        case_type: '',
      },
      user: null,
      showAcceptModal: false,
      showCreateUser: false,
      showTime: false,
      isLoading: false,
      users: [],
    }
  },
  mounted() {
    this.resetForm()
    this.getUsers('', 1)
  },
  methods: {
    closeForm() {
      this.$emit('close')
      this.resetForm();
    },
    done() {
      this.$emit('done')
      this.resetForm();
    },
    resetForm() {
      if (!this.item) return
      let date = this.item.start_at
      this.appointment = {
        id: this.item.id,
        start_at: date,
        tel: this.item.user ? this.item.user.tel : '',
        cardno: this.item.user ? this.item.user.cardno : '',
        income: parseInt(this.item.income),
        user_id: this.item.user_id,
        case_type: this.item.case_type,
        info: this.item.info,
        status: this.item.status,
        user: this.item.user,
        insurance_price: this.item.insurance_price,
        patient_price: this.item.patient_price,
        total_price: this.item.total_price,
        discount_price: this.item.discount_price,
        selected_actions: this.item.selected_actions,
        selected_dents: this.item.selected_dents,
        user_insurance_id: this.item.user_insurance_id,
        code: this.item.code ? this.item.code : '',
        appcode: this.item.appcode ? this.item.appcode : '',
        created_at: this.item.created_at ? this.item.created_at : '',
        end_at: this.item.end_at ? this.item.end_at : '',
        future_prescription: this.item.future_prescription ? this.item.future_prescription : '',
        is_vip: this.item.is_vip ? this.item.is_vip : false,
        d_admission_at: this.item.d_admission_at ? this.item.d_admission_at : '',
        d_result_at: this.item.d_result_at ? this.item.d_result_at : '',
        l_admission_at: this.item.l_admission_at ? this.item.l_admission_at : '',
        l_imgs: this.item.l_imgs ? this.item.l_imgs : '',
        l_result_at: this.item.l_result_at ? this.item.l_result_at : '',
        l_rnd_img: this.item.l_rnd_img ? this.item.l_rnd_img : '',
        laboratory: this.item.laboratory,
        laboratory_cases: this.item.laboratory_cases ? this.item.laboratory_cases : '',
        laboratory_id: this.item.laboratory_id,
        laboratory_msg: this.item.laboratory_msg ? this.item.laboratory_msg : '',
        organization: this.item.organization,
        organization_id: this.item.organization_id,
        p_admission_at: this.item.p_admission_at ? this.item.p_admission_at : '',
        p_imgs: this.item.p_imgs ? this.item.p_imgs : '',
        p_result_at: this.item.p_result_at ? this.item.p_result_at : '',
        p_rnd_img: this.item.p_rnd_img ? this.item.p_rnd_img : '',
        photography: this.item.photography,
        photography_cases: this.item.photography_cases ? this.item.photography_cases : '',
        photography_id: this.item.photography_id,
        photography_msg: this.item.photography_msg ? this.item.photography_msg : '',
        doctor_msg: this.item.doctor_msg ? this.item.doctor_msg : '',
        prescription: this.item.prescription ? this.item.prescription : '',
        r_admission_at: this.item.r_admission_at ? this.item.r_admission_at : '',
        r_imgs: this.item.r_imgs ? this.item.r_imgs : '',
        r_result_at: this.item.r_result_at ? this.item.r_result_at : '',
        r_rnd_img: this.item.r_rnd_img ? this.item.r_rnd_img : '',
        radiology: this.item.radiology,
        radiology_cases: this.item.radiology_cases ? this.item.radiology_cases : '',
        radiology_id: this.item.radiology_id,
        doctor: this.item.doctor,
        doctor_id: this.item.doctor_id,
        doctor_images: this.item.doctor_images ? this.item.doctor_images : [],
        radiology_msg: this.item.radiology_msg,
        staff: this.item.staff ?? null,
        staff_id: this.item.staff_id ?? null,
        subject: this.item.subject ?? '',
        updated_at: this.item.updated_at ?? '',
        vip_introducer: this.item.vip_introducer ?? '',
        waiting: this.item.waiting,
        last_prescription: this.item.last_prescription ? this.item.last_prescription : '',
        d_desc: this.item.d_desc ? this.item.d_desc : '',
        insurance_id: this.item.insurance_id,
        insurance: this.item.insurance,
        user_insurance: this.item.user_insurance,
      }
      this.user = this.item.user
      this.resetErrors()
    },
    resetErrors() {
      this.errors = {
        start_at: '',
        user_id: '',
        case_type: '',
      }
    },
    validateFrom() {
      this.resetErrors()
      let isValid = true
      if (!this.appointment.start_at) {
        this.errors.start_at = 'فیلد تاریخ و ساعت پذیرش اجباری است'
        isValid = false
      }
      if (!this.appointment.user_id) {
        this.errors.user_id = 'فیلد بیمار اجباری است'
        isValid = false
      }
      return isValid;
    },
    onSearchUsers: debounce(function (e) {
      let q = this.$enDigit(e)
      this.getUsers(q, 1, 15)
    }, 400),
    getUsers(q = '', page = null, limit = null) {
      this.isLoading = true
      let filter = {
        q: q,
        group: 1
      }
      if (page) {
        filter.page = page
      }
      if (limit) {
        filter.limit = limit
      }
      this.$store.dispatch('users/getUsers', filter)
        .then(res => {
          this.users = res.data.data
          // this.users = [
          //   ...res.data.data,
          //   {
          //     id: -1,
          //     fname: 'افزودن',
          //     lname: 'بیمار'
          //   }
          // ]
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    getCaseTypes() {
      this.$store.dispatch('cases/getCaseTypes', {})
    },
    customLabel(item) {
      return item.fname
    },
    onChecked(item) {
      this.appointment.case_type = item.checked ? item.name : ''
    },
    loading() {
      this.$emit('loading')
    },
    openAcceptModal() {
      if (this.validateFrom()) {
        this.updateAppointment()
        // this.toggleAcceptModal()
      }
    },
    toggleAcceptModal() {
      this.showAcceptModal = !this.showAcceptModal
    },
    updateAppointment() {
      // this.toggleAcceptModal()
      if (this.validateFrom()) {
        if (!this.appointment.user_id) {
          return
        }
        const start = this.appointment.start_at
        this.$store.dispatch('appointments/updateAppointment', {
          ...this.appointment,
          user_id: this.user.id,
          start_at: start,
        })
          .then(() => {
            this.$toast.success('با موفقیت انجام شد');
            this.done()
          })
          .catch(err => {
            this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
          })
      }
    },
    onUserChanged(e) {
      if (e.id == -1) {
        this.openCreateNewUser()
      } else {
        this.errors.user_id = ''
      }
    },
    openCreateNewUser() {
      this.user = null
      this.showCreateUser = true
    },
    closeCreateUserForm() {
      this.showCreateUser = false
    },
    doneCreateUserForm(user) {
      this.showCreateUser = false
      this.user = user
      this.getUsers()
    },
    getLogo(user) {
      if (user && user.logo) {
        return user.logo
      } else {
        if (user) {
          if (user.gender == 'female') {
            return '/images/profile/woman.svg'
          } else {
            return '/images/profile/man.svg'
          }
        } else {
          return '/images/profile/man.svg'
        }
      }
    },
    getUserByFileId: debounce(function (file_id) {
      if (file_id) {
        this.$axios.get(`/organizations/patients/file_id/${file_id}`)
          .then(res => {
            const user = res.data.data
            if (user) {
              this.user = user
              this.appointment.file_id = user.file_id
              this.appointment.cardno = user.cardno
              this.appointment.user_id = user.id
              this.appointment.tel = user.tel
            } else {
              this.user = null
              // this.appointment.file_id = ''
              this.appointment.cardno = ''
              this.appointment.user_id = null
              this.appointment.tel = ''
            }
          })
          .catch(err => {
            this.user = null
            // this.appointment.file_id = ''
            this.appointment.cardno = ''
            this.appointment.user_id = null
            this.appointment.tel = ''
          })
      } else {
        this.user = null
        // this.appointment.file_id = ''
        this.appointment.cardno = ''
        this.appointment.user_id = null
        this.appointment.tel = ''
      }
    }, 500),
  },
  computed: {
    cases() {
      return this.$store.getters['cases/getCaseTypes']
    },
    show() {
      return this.open;
    },
    isDoctor() {
      if (!this.loginUser) return false;
      return this.loginUser.organization.is_doctor;
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    profession() {
      const profession_id = this.loginUser.organization.profession_id;
      switch (profession_id) {
        case 1:
          return 'photography';
        case 2:
          return 'laboratory';
        case 3:
          return 'radiology';
      }
      return 'photography';
    },
    professionName() {
      const profession_id = this.loginUser.organization.profession_id;
      switch (profession_id) {
        case 1:
          return 'فتوگرافی';
        case 2:
          return 'ازمایشگاه';
        case 3:
          return 'رادیولوژی';
        case 4:
          return 'جراح و فک و صورت';
        case 5:
          return 'ارتودنسی';
        case 6:
          return 'متخصص گوش و حلق و بینی';
        case 7:
          return 'دندان پزشک';
      }
      return 'فتوگرافی';
    },
  },
  watch: {
    user(user) {
      if (user) {
        this.appointment.file_id = this.user.file_id
        this.appointment.cardno = this.user.cardno
        this.appointment.user_id = this.user.id
        this.appointment.tel = this.user.tel
      }
    },
    // item() {
    //   this.resetForm()
    // }
  }
}
</script>

<style scoped>

</style>
