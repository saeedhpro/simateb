<template>
  <div class="appointment-form-component">
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
                    :option-height="40"
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
              >
                <div class="d-flex flex-row flex-wrap align-start justify-start">
                  <div
                    v-for="(c,n) in cases"
                    :key="n"
                  >
                    <case-type-checkbox-component
                      class="ml-2 mb-2"
                      :id="c.id"
                      :name="c.name"
                      :items="cases"
                      :is-checked="appointment.case_type === c.name"
                      @change="onChecked"
                    />
                  </div>
                </div>
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
                      ذخیره
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
      :full-name="`${user.gender ? user.gender.toLowerCase() === 'male' ? 'آقای ' : 'خانم ' : ''}${user.fname} ${user.lname}`"
      :start-at="appointment.start_at"
      @close="toggleAcceptModal"
      @accept="createAppointment"
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
import {debounce} from "lodash";
import CreateUserFormComponent from "~/components/panel/profile/user/CreateUserFormComponent.vue";

export default {
  name: "CreateAppointmentFormComponent",
  components: {
    CreateUserFormComponent,
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
    isSurgery: {
      type: Boolean,
      default: false,
      required: true,
    },
    initTime: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      appointment: {
        start_at: this.initTime ? this.initTime : this.$moment().format("YYYY/MM/DD HH:mm:ss"),
        tel: '',
        cardno: '',
        income: 0,
        user_id: null,
        case_type: '',
        info: '',
        status: 0,
        user: null,
      },
      errors: {
        start_at: '',
        user_id: '',
        case_type: '',
      },
      user: null,
      showAcceptModal: false,
      showCreateUser: false,
      isLoading: false,
      users: [],
    }
  },
  mounted() {
    this.getCaseTypes()
    let newTime = this.$roundUpTo(this.$moment())
    newTime = this.$moment(newTime)
    this.appointment.start_at = this.initTime ? this.initTime : newTime.format("YYYY/MM/DD HH:mm:ss")
    this.getUsers('', 1)
  },
  methods: {
    closeForm() {
      this.$emit('close')
      this.resetForm();
    },
    resetForm() {
      this.appointment = {
        start_at: this.initTime ? this.initTime : this.$moment().format("YYYY/MM/DD HH:mm:ss"),
        tel: '',
        cardno: '',
        income: 0,
        user_id: null,
        case_type: '',
        info: '',
        status: 0,
        user: null,
      }
      this.user = null
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
      let error = ''
      if (!this.appointment.start_at) {
        this.errors.start_at = 'فیلد تاریخ و ساعت پذیرش اجباری است'
        error = 'فیلد تاریخ و ساعت پذیرش اجباری است'
        isValid = false
      }
      if (!this.appointment.user_id) {
        this.errors.user_id = 'فیلد بیمار اجباری است'
        error = 'فیلد بیمار اجباری است'
        isValid = false
      }
      if (!isValid) {
        this.$toast.error(error);
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
      const type = this.isSurgery ? 2 : 1
      this.$store.dispatch('cases/getCaseTypes', {type: type})
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
        this.toggleAcceptModal()
      }
    },
    toggleAcceptModal() {
      this.showAcceptModal = !this.showAcceptModal
    },
    createAppointment() {
      this.toggleAcceptModal()
      if (this.validateFrom()) {
        if (!this.appointment.user_id) {
          return
        }
        let start_at = this.appointment.start_at
        const data = {
          ...this.appointment,
          user_id: this.user.id,
          start_at: start_at,
          income: this.appointment.income,
          is_surgery: this.isSurgery,
        }
        this.$store.dispatch('appointments/createAppointment', data)
          .then(() => {
            this.$toast.success('با موفقیت انجام شد');
            this.$emit('created')
            this.resetForm();
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
    user(val) {
      if (val) {
        this.appointment.file_id = this.user.file_id
        this.appointment.cardno = this.user.cardno
        this.appointment.user_id = this.user.id
        this.appointment.tel = this.user.tel
      } else {
        // this.appointment.file_id = ''
        this.appointment.cardno = ''
        this.appointment.user_id = null
        this.appointment.tel = ''
      }
    },
    'appointment.file_id'(file_id) {

    }
  }
}
</script>

<style scoped>

</style>
