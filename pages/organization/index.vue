<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box">
          <nuxt-link to="/organization" class="page-header">
            <img src="/images/pages/users.svg" alt="users">
            <span class="title">پذیرش</span>
          </nuxt-link>
          <nuxt-link to="/organization/search" class="page-header">
            <img src="/images/pages/users.svg" alt="users">
            <span class="title">جستجو</span>
          </nuxt-link>

          <v-divider inset/>
          <div class="page-actions-secondary"
               @click="togglePazireshModal"
          >
            <span class="title">
              {{ today | toPersianDate('dddd DD MMMM') }}
            </span>
            <v-dialog
              v-model="showPazireshModal"
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
                      @click="togglePazireshModal"
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
                        <date-picker
                          v-model="appointment.start_at"
                          custom-input="#start-at"
                          format="YYYY-MM-DD HH:mm:ss"
                          display-format="HH:mm:ss jYYYY/jMM/jDD"
                          type="datetime"
                        />
                        <div class="create-update-model-input-box">
                          <label>تاریخ و ساعت پذیرش</label>
                          <div class="date-picker">
                            <img src="/images/form/datepicker.svg">
                            <input id="start-at" class="date-picker">
                          </div>
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
                          @click="clearPazireshForm"
                        >پاک کردن فرم
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
                          @click="togglePazireshModal"
                        >
                          بستن
                        </button>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                        md="4"
                      >
                        <button
                          class="main-button"
                          @click="createAppointment"
                        >
                          ذخیره
                        </button>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <div class="page-actions"
               @click="togglePazireshModal"
          >
            <img src="/images/pages/new-user.svg" alt="users">
            <span class="title">پذیرش جدید</span>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <v-card
          class="page-main-box"
        >
          <v-row class="search-box">
            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <div class="right-box justify-start align-center">
                <span class="small-circle"></span>
                برای امروز، <span class="number">{{ appointments.total_rows | toPersianNumber }}</span> مورد پذیرش ثبت
                شده است
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <data-table-component
                :headers="headers"
                :page="search.page"
                :total="appointments.total_rows"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in appointments.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 | persianDigit }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <img :src="i.user && i.user.logo ? i.user.logo : 'https://randomuser.me/api/portraits/men/88.jpg'">
                        <span><nuxt-link :to="`/profile/${i.user ? i.user.id : 1}`">{{
                            `${i.user ? i.user.fname : ''} ${i.user ? i.user.lname : ''}` | persianDigit
                          }}</nuxt-link></span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.user && i.user.tel ? i.user.tel : '-' | persianDigit }}</td>
                    <td class="text-center">{{ i.user && i.user.file_id ? i.user.file_id : '-' | persianDigit }}</td>
                    <td class="text-center">{{ i.user && i.case_type ? i.case_type : '-' | persianDigit }}</td>
                    <td class="text-center">
                      {{ $moment(i.start_at).format("HH:mm") | toPersianNumber }}
                    </td>
                    <td class="text-center">
                      <div
                        v-if="i.photography"
                        class="has-erja">
                        <img src="/images/form/check2.svg">
                      </div>
                    </td>
                    <td class="text-center">
                      <div
                        v-if="i.radiology"
                        class="has-erja">
                        <img src="/images/form/check2.svg">
                      </div>
                    </td>
                    <td class="text-center">
                      <span
                        class="status-box"
                        :style="{
                          'background-color': `${statuses[i.status - 1].background}`,
                          'color': `${statuses[i.status - 1].color}`
                        }"
                      >{{ statuses[i.status - 1].title }}</span>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="appointments.total_rows === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import moment from "jalali-moment";
import DataTableComponent from "~/components/panel/global/DataTableComponent";

export default {
  name: "index",
  components: {DataTableComponent},
  layout: 'panel',
  data() {
    return {
      showPazireshModal: false,
      overlay: false,
      selectedItems: [],
      search: {
        page: 1,
        start: moment().format("YYYY-MM-DD"),
        end: moment().add("1 day").format("YYYY-MM-DD"),
      },
      headers: [
        '',
        'بیمار',
        'موبایل',
        'پرونده',
        'علت مراجعه',
        'ساعت',
        'رادیولوژی',
        'فوتوگرافی',
        'وضعیت',
      ],
      statuses: [
        {
          id: 1,
          title: 'رزرو شده',
          color: '#F5AC00',
          background: '#FFF9EB'
        },
        {
          id: 2,
          title: 'پذیرش شده',
          color: '#293366',
          background: '#EBEDFF'
        },
        {
          id: 3,
          title: 'کنسل',
          color: '#F44336',
          background: '#FFEDEB'
        },
        {
          id: 4,
          title: 'عدم حضور',
          color: '#424242',
          background: '#F1F2F5'
        }
      ],
      appointment: {
        start_at: '',
        tel: '',
        cardno: '',
        income: 0,
        user_id: null,
        case_type: '',
        info: '',
      },
      user: null,
      money: {
        decimal: '.',
        thousands: ',',
        suffix: ' تومان',
        prefix: '',
        precision: 0,
        masked: false /* doesn't work with directive */
      }
    }
  },
  mounted() {
    this.paginate()
    this.getUsers()
    this.getCaseTypes()
  },
  methods: {
    togglePazireshModal() {
      this.showPazireshModal = !this.showPazireshModal
    },
    paginate(page = 1) {
      this.search.page = page
      this.getAppointmentList()
    },
    getAppointmentList() {
      this.toggleOverlay()
      this.$store.dispatch('appointments/getOrganizationAppointmentsList', this.search)
        .finally(() => {
          setTimeout(() => {
            this.toggleOverlay()
          }, 350)
        })
    },
    toggleOverlay() {
      this.overlay = !this.overlay
    },
    getUsers() {
      this.$store.dispatch('users/getUsers')
    },
    getCaseTypes() {
      this.$store.dispatch('cases/getCaseTypes')
    },
    createAppointment() {
      this.toggleOverlay()
      this.$store.dispatch('appointments/search', this.search)
        .then(() => {
          setTimeout(() => {
            this.togglePazireshModal()
            this.clearPazireshForm()
            this.getAppointmentList()
          }, 350)
        })
        .finally(() => {
          setTimeout(() => {
            this.toggleOverlay()
          }, 350)
        })
    },
    clearPazireshForm() {
      this.appointment = {
        start_at: '',
        tel: '',
        cardno: '',
        income: 0,
        user_id: null,
        case_type: '',
      }
    },
    customLabel(item) {
      return item.fname
    },
    onChecked(item) {
      this.appointment.case_type = item.checked ? item.name : ''
    }
  },
  computed: {
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    appointments() {
      return this.$store.getters['appointments/getList']
    },
    users() {
      return this.$store.getters['users/getUsers']
    },
    cases() {
      return this.$store.getters['cases/getCaseTypes']
    },
    today() {
      return moment().format("YYYY/MM/DD")
    }
  }
}
</script>

<style scoped>

</style>
