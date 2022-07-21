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
                <div class="create-update-model-input-box">
                  <label>تاریخ و ساعت پذیرش</label>
                  <date-picker
                    v-model="appointment.start_at"
                    format="YYYY-MM-DD HH:mm:ss"
                    display-format="HH:mm:ss jYYYY/jMM/jDD"
                    editable
                    class="date-picker"
                    type="datetime"
                  >
                    <template v-slot:label>
                      <img src="/images/form/datepicker.svg">
                    </template>
                  </date-picker>
                  <span class="create-update-modal-input-error" v-if="errors.start_at">{{ errors.start_at }}</span>
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-multi-select
                  v-model="user"
                  :items="users"
                  :error="errors.user_id"
                  :has-custom-label="true"
                  @input="errors.user_id = ''"
                  label="نام بیمار"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-text-input
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
                <custom-text-input
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
                v-if="isDoctor"
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
      :full-name="`${user.fname} ${user.lname}`"
      :start-at="appointment.start_at"
      @close="toggleAcceptModal"
      @accept="createAppointment"
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

export default {
  name: "CreateAppointmentFormComponent",
  components: {
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
  },
  data() {
    return {
      appointment: {
        start_at: this.$moment().format("YYYY/MM/DD HH:mm:ss"),
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
    }
  },
  methods: {
    closeForm() {
      this.$emit('close')
      this.resetForm();
    },
    resetForm() {
      this.appointment = {
        start_at: this.$moment().format("YYYY/MM/DD HH:mm:ss"),
        tel: '',
        cardno: '',
        income: 0,
        user_id: null,
        case_type: '',
        info: '',
        status: 0,
        user: null,
      }
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
    getUsers() {
      this.$store.dispatch('users/getUsers')
    },
    getCaseTypes() {
      this.$store.dispatch('cases/getCaseTypes')
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
        this.$store.dispatch('appointments/createAppointment', {
          ...this.appointment,
          user_id: this.user.id,
          income: parseFloat(this.appointment.income.split(' ')[0].split(',').join('')),
        })
          .then(() => {
            this.closeForm()
          })
      }
    }
  },
  computed: {
    users() {
      return this.$store.getters['users/getUsers']
    },
    cases() {
      return this.$store.getters['cases/getCaseTypes']
    },
    show() {
      return this.open;
    },
    isDoctor() {
      if (!this.loginUser) return false;
      const profession_id = this.loginUser.organization.profession_id;
      return profession_id !== 1 && profession_id !== 2 && profession_id !== 3
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
          return 'فوتوگرافی';
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
      return 'فوتوگرافی';
    },
  },
  watch: {
    user() {
      this.appointment.file_id = this.user.file_id
      this.appointment.cardno = this.user.cardno
      this.appointment.user_id = this.user.id
      this.appointment.tel = this.user.tel
    },
  }
}
</script>

<style scoped>

</style>
