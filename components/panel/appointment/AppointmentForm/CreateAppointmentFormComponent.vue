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
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>نام بیمار</label>
                  <multiselect searchable clearOnSelect allowEmpty v-model="user" placeholder="" label="fname"
                               track-by="fname" :options="users"
                               :option-height="104" :custom-label="customLabel" :show-labels="false">
                    <template slot="singleLabel" slot-scope="props"><img class="option__image"
                                                                         :src="props.option.logo" alt=""><span
                      class="option__desc"><span
                      class="option__title">{{ `${props.option.fname} ${props.option.lname}` }}</span></span>
                    </template>
                    <template slot="option" slot-scope="props"><img class="option__image"
                                                                    :src="props.option.logo" alt="">
                      <div class="option__desc"><span class="option__title">{{ props.option.fname }}</span><span
                        class="option__small">{{ ` ${props.option.lname}` }}</span></div>
                    </template>
                  </multiselect>
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>شماره موبایل</label>
                  <input disabled type="tel" v-model="appointment.tel">
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>کد ملی</label>
                  <input disabled type="text" v-model="appointment.cardno">
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>شماره پرونده</label>
                  <input disabled type="text" v-model="appointment.file_id">
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>هزینه ویزیت</label>
                  <input v-money="money" type="text" v-model.lazy="appointment.income">
                </div>
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
                <div class="create-update-model-input-box">
                  <label>شرح حال و توضیحات پذیرش</label>
                  <textarea
                    v-model="appointment.info"
                    rows="6"
                  ></textarea>
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
                      @click="createAppointment"
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
  </div>
</template>

<script>
import CaseTypeCheckboxComponent from "~/components/panel/appointment/CaseTypeCheckboxComponent";
import DataTableComponent from "~/components/panel/global/DataTableComponent";

export default {
  name: "CreateAppointmentFormComponent",
  components: {
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
      money: {
        decimal: '.',
        thousands: ',',
        suffix: ' تومان',
        prefix: '',
        precision: 0,
        masked: false
      },
      user: null,
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
    createAppointment() {
      this.loading()
      if (!this.appointment.user_id) {
        this.loading()
        return
      }
      this.$store.dispatch('appointments/createAppointment', {
        ...this.appointment,
        user_id: this.user.id,
        income: parseFloat(this.appointment.income.split(' ')[0].split(',').join('')),
      })
        .then(() => {
        })
        .finally(() => {
          this.closeForm()
          this.loading()
        })
    },
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
