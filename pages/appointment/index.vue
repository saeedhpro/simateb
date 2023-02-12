<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box">
          <nuxt-link to="/appointment" class="page-header">
            <img src="/images/pages/users.svg" alt="users">
            <span class="title">جدول نوبت دهی</span>
          </nuxt-link>
          <nuxt-link to="/appointment/search" class="page-header">
            <img src="/images/pages/search-icon.svg" alt="users">
            <span class="title">جستجو نوبت ها</span>
          </nuxt-link>
          <nuxt-link to="/appointment/surgeries" class="page-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <defs>
                <style>.a.index,.b.index{fill:#5063ff;}.a.index{opacity:.12;}.b.index{opacity:1;}</style>
              </defs>
              <g transform="translate(-1316 -132)">
                <rect class="a index" width="40" height="40" rx="20" transform="translate(1316 132)"/>
                <path class="b index"
                      d="M6.04,12.414l-.3,1.76a.385.385,0,0,0,.56.407l1.575-.834,1.575.834a.389.389,0,0,0,.564-.407L9.7,12.414l1.277-1.245a.387.387,0,0,0-.213-.661l-1.76-.258-.792-1.6a.386.386,0,0,0-.693,0l-.787,1.6-1.765.257a.391.391,0,0,0-.214.661ZM13.5,2.25H12.094V.844A.838.838,0,0,0,11.282,0a.893.893,0,0,0-.875.844V2.25H5.344V.844a.844.844,0,0,0-1.687,0V2.25H2.25A2.25,2.25,0,0,0,0,4.5V15.75A2.25,2.25,0,0,0,2.25,18H13.5a2.25,2.25,0,0,0,2.25-2.25V4.5A2.251,2.251,0,0,0,13.5,2.25Zm.563,13.5a.563.563,0,0,1-.562.563H2.25a.563.563,0,0,1-.562-.562v-9H14.063Z"
                      transform="translate(1328.125 143)"/>
              </g>
            </svg>
            <span class="title">جدول جراحی</span>
          </nuxt-link>

          <v-divider inset/>
          <div class="page-actions"
               @click="togglePazireshModal"
          >
            <img src="/images/pages/new-user.svg" alt="users">
            <span class="title-main">پذیرش جدید</span>
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
              sm="2"
              md="1"
            >
              <div class="right-box">
                <v-select
                  outlined
                  :items="months"
                  label="ماه"
                  item-value="id"
                  item-text="label"
                  v-model="month"
                  @change="onMonthChanged"
                ></v-select>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="2"
              md="1"
            >
              <div class="right-box">
                <v-select
                  outlined
                  :items="years"
                  label="سال"
                  item-value="id"
                  item-text="label"
                  v-model="year"
                  @change="onYearChanged"
                ></v-select>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="3"
              md="1"
            >
              <div class="right-box">
                <div class="mt-4 tafkik">نمایش به تفکیک:</div>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="3"
              md="1"
            >
              <div class="right-box">
                <button
                  class="show-button"
                  :class="{'active': showHour}"
                  @click="toggleShowHour"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <defs>
                      <style>.a {
                        fill: #424242;
                      }</style>
                    </defs>
                    <path class="a"
                          d="M2.1,0a3,3,0,0,0-3,3A2.977,2.977,0,0,0-.427,4.606L4.133.806A2.879,2.879,0,0,0,2.1,0Zm10,0a2.981,2.981,0,0,0-2.033.806l4.559,3.8A2.765,2.765,0,0,0,15.1,3,2.983,2.983,0,0,0,12.1,0ZM7.128,2A7,7,0,0,0,1.679,13.387L.348,14.718A.75.75,0,1,0,1.408,15.78l1.331-1.331a6.984,6.984,0,0,0,8.776,0l1.331,1.331a.75.75,0,1,0,1.062-1.061l-1.331-1.331A7,7,0,0,0,7.128,2Zm0,12.5a5.5,5.5,0,1,1,5.5-5.5A5.506,5.506,0,0,1,7.128,14.5Zm.75-5.375V5.75a.75.75,0,0,0-1.5,0V9.5a.75.75,0,0,0,.3.6l2,1.5a.676.676,0,0,0,.422.15A.75.75,0,0,0,9.551,10.4Z"
                          transform="translate(0.9)"/>
                  </svg>
                  ساعت
                </button>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="3"
              md="1"
            >
              <div class="right-box">
                <button
                  class="show-button"
                  :class="{'active': showCaseType}"
                  @click="toggleShowCaseType"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13">
                    <defs>
                      <style>.a {
                        fill: #424242;
                      }</style>
                    </defs>
                    <path class="a"
                          d="M6.747,34.753h8.5a.75.75,0,0,0,0-1.5h-8.5a.75.75,0,0,0,0,1.5ZM1.5,43a1,1,0,1,0,1,1A1,1,0,0,0,1.5,43Zm13.748-4.75h-8.5a.75.75,0,1,0,0,1.5h8.5a.75.75,0,1,0,0-1.5Zm0,5h-9.5a.75.75,0,1,0,0,1.5h9.5a.75.75,0,1,0,0-1.5Zm-11.556-11L1.969,34.163l-.691-.691A.75.75,0,1,0,.217,34.532l1.25,1.25a.729.729,0,0,0,.5.221h.02a.75.75,0,0,0,.538-.248l2.25-2.5a.751.751,0,0,0-.056-1.06A.717.717,0,0,0,3.691,32.252Zm0,5L1.969,39.163l-.691-.691A.75.75,0,0,0,.217,39.532l1.25,1.25a.729.729,0,0,0,.5.221h.02a.75.75,0,0,0,.538-.248l2.25-2.5a.751.751,0,0,0-.056-1.06A.718.718,0,0,0,3.691,37.25Z"
                          transform="translate(0.003 -32.004)"/>
                  </svg>
                  علل مراجعه
                </button>
              </div>
            </v-col>
            <v-spacer v-if="!mini"/>
            <v-col
              cols="12"
              sm="4"
              md="2"
            >
              <v-select
                outlined
                :items="actions"
                label="تنظیمات"
                item-value="id"
                item-text="label"
                v-model="action"
                @change="doAction"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <div>
                <v-simple-table
                  fixed-header
                  class="appointment-table"
                >
                  <template v-slot:default>
                    <thead
                      v-if="showCaseType"
                    >
                    <tr>
                      <th
                        v-for="(i, n) in lastDay"
                        :key="n"
                        class="header-case-type-th text-center"
                      >
                        <div
                          class="header-case-type-box"
                        >
                          <div
                            class="header-case-type"
                            v-for="(l,n) in que.limits"
                            :key="n"
                          >
                            <div>
                              {{ l.name | toPersianNumber }}
                            </div>
                            <span>
                              {{ l.limitation | toPersianNumber }}
                            </span>
                          </div>
                        </div>
                      </th>
                    </tr>
                    </thead>
                    <thead>
                    <tr>
                      <th
                        v-for="(i, n) in lastDay"
                        :key="n"
                        class="header-case-type-th text-center"
                      >
                        <div
                          class="header-date"
                          :class="{'is-today': isToday(i), 'is-friday': isFriday(i)}"
                        >
                          {{ getToday(i) }}
                          {{ i | toPersianNumber }}
                          {{ months[month - 1].label }}
                        </div>
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="(items, i) in que.max_length"
                        :key="i"
                    >
                      <td
                        v-for="(item, j) in list.length"
                      >
                        <table-appointment-component
                          v-if="list[j][i]"
                          :class="{'is-today': isToday(j + 1), 'is-friday': isFriday(j + 1)}"
                          :item="list[j][i]"
                          :day="j"
                          :month="month"
                          :year="year"
                          @click.native="openItem(list[j][i])"
                        />
                        <table-appointment-none-component
                          v-else
                          :class="{'is-today': isToday(j + 1), 'is-friday': isFriday(j + 1)}"
                          :start-at="getTime(i)"
                          :show-hour="showHour"
                          :day="j"
                          :month="month"
                          :year="year"
                          @click.native="openPazireshModal(`${year}/${month}/${j} ${Date.now()}`)"
                        />
                      </td>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <create-appointment-form-component
      v-if="showPazireshModal"
      :open="showPazireshModal"
      :init-time="initTime"
      @close="closePazireshModal"
      @created="createdPazireshModal"
    />
    <appointment-form-component
      :open="showAppointmentModal"
      :item="item"
      @close="closeAppointmentModal"
      @remove="getAppointmentList"
      @done="doAppointment"
    />
    <work-hour-component
      :open="showWorkHour"
      :start="workHour.start"
      :end="workHour.end"
      :organizationId="workHour.organization_id"
      @close="closeShowWorkHour"
      v-if="showWorkHour"
    />
  </v-container>
</template>

<script>
import moment from 'jalali-moment'
import TableAppointmentComponent from "~/components/panel/appointment/TableAppointmentComponent";
import TableAppointmentNoneComponent from "~/components/panel/appointment/TableAppointmentNoneComponent";
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import CaseTypeCheckboxComponent from "~/components/panel/appointment/CaseTypeCheckboxComponent";
import AppointmentFormComponent from "~/components/panel/appointment/AppointmentForm/AppointmentFormComponent";
import CreateAppointmentFormComponent
  from "~/components/panel/appointment/AppointmentForm/CreateAppointmentFormComponent";
import WorkHourComponent from "~/components/panel/appointment/WorkHourComponent";

export default {
  name: "list",
  components: {
    WorkHourComponent,
    CreateAppointmentFormComponent,
    TableAppointmentNoneComponent,
    TableAppointmentComponent,
    CaseTypeCheckboxComponent,
    DataTableComponent,
    AppointmentFormComponent
  },
  layout: 'panel',
  middleware: 'auth',
  data() {
    return {
      showPazireshModal: false,
      showAppointmentModal: false,
      showCreateModal: false,
      showHour: false,
      showCaseType: false,
      initTime: '',
      item: null,
      hasItem: false,
      showWorkHour: false,
      most: 1,
      durations: 10,
      selectedItems: [],
      list: [],
      search: {
        start: '',
        end: '',
        case_type: '',
        page: 1,
      },
      user: null,
      appointment: {
        start_at: '',
        tel: '',
        cardno: '',
        income: '0',
        user_id: null,
        case_type: '',
        info: '',
      },
      lastDay: 0,
      month: 1,
      months: [
        {
          id: 1,
          label: 'فروردین',
        },
        {
          id: 2,
          label: 'اردیبهشت',
        },
        {
          id: 3,
          label: 'خرداد',
        },
        {
          id: 4,
          label: 'تیر',
        },
        {
          id: 5,
          label: 'مرداد',
        },
        {
          id: 6,
          label: 'شهریور',
        },
        {
          id: 7,
          label: 'مهر',
        },
        {
          id: 8,
          label: 'آبان',
        },
        {
          id: 9,
          label: 'آذر',
        },
        {
          id: 10,
          label: 'دی',
        },
        {
          id: 11,
          label: 'بهمن',
        },
        {
          id: 12,
          label: 'اسفند',
        },
      ],
      year: 1398,
      years: [],
      action: null,
      actions: [
        {
          id: 0,
          label: 'تنظیمات'
        },
        {
          id: 1,
          label: 'روزهای تعطیل'
        },
        {
          id: 2,
          label: 'برنامه نوبت دهی vip'
        },
        {
          id: 3,
          label: 'تنظیمات علل مراجعه'
        },
        {
          id: 4,
          label: 'ساعت کاری'
        },
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
          title: 'کنسل شده',
          color: '#F44336',
          background: '#FFEDEB'
        },
        {
          id: 4,
          title: 'عدم حضور',
          color: '#424242',
          background: '#F1F2F5'
        },
        {
          id: 5,
          title: 'در انتظار',
          color: '#F5AC00',
          background: '#FFF9EB'
        }
      ],
      money: {
        decimal: '.',
        thousands: ',',
        suffix: ' تومان',
        prefix: '',
        precision: 0,
        masked: false,
      },
      que: {
        ques: [],
        clock_ques: [],
        limits: [],
        default_duration: 20,
        max_length: 20,
        work_hour: {
          end: "",
          start: ""
        }
      }
    }
  },
  mounted() {
    const year = parseInt(moment().format("jYYYY"))
    const month = parseInt(moment().format("jMM"))
    this.year = year
    this.month = month
    this.getHolidays()
    this.getAppointmentList()
    this.getUsers()
    this.getOrganizationWorkHour()
    this.getCaseTypes()
  },
  methods: {
    getOrganizationWorkHour() {
      const organization = this.loginUser.organization
      if (organization) {
        this.$store.dispatch('organizations/getOrganizationWorkHour', organization.id)
      }
    },
    createAppointment() {
      if (!this.user) return
      this.$store.dispatch('appointments/createAppointment', {
        ...this.appointment,
        user_id: this.user.id,
        income: parseFloat(this.appointment.income.split(' ')[0].split(',').join('')),
      })
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
          setTimeout(() => {
            this.togglePazireshModal()
            this.clearPazireshForm()
            this.getAppointmentList()
          }, 50)
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
    },
    openPazireshModal(i) {
      let date = moment.from(i, 'fa', 'YYYY/MM/DD HH:mm:ss').locale('en').format("YYYY/MM/DDTHH:mm:ssZ")
      this.initTime = date
      console.log(date, "date")
      // this.initTime = moment.from(i, "fa", "jYYYY/jMM/jDD HH:mm:ss").locale("en").local().format("YYYY/MM/DD HH:mm:ss")
      this.showPazireshModal = true
    },
    toggleCreateModal() {
      this.showPazireshModal = !this.showPazireshModal
    },
    openItem(item) {
      this.item = item
      this.toggleAppointmentModal()
    },
    toggleAppointmentModal() {
      this.showAppointmentModal = !this.showAppointmentModal
    },
    closePazireshModal() {
      this.initTime = null
      this.togglePazireshModal()
    },
    createdPazireshModal() {
      this.togglePazireshModal()
      this.getAppointmentList()
    },
    closeAppointmentModal() {
      this.toggleAppointmentModal()
      // this.getAppointmentList()
    },
    doAppointment() {
      this.toggleAppointmentModal()
      this.getAppointmentList()
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
    togglePazireshModal() {
      this.showPazireshModal = !this.showPazireshModal
    },
    toggleShowCaseType() {
      this.showCaseType = !this.showCaseType
    },
    toggleShowHour() {
      this.showHour = !this.showHour
      if (this.showHour) {
        this.list = this.que.clock_ques
      } else {
        this.list = this.que.ques
      }
    },
    paginate(page = 1) {
      this.search.page = page
      this.getAppointmentList()
    },
    getAppointmentList() {
      this.calcDate()
      this.$store.dispatch('appointments/getQueV2', this.search)
        .then(res => {
          this.que = res.data
          if (this.showHour) {
            this.list = this.que.clock_ques
          } else {
            this.list = this.que.ques
          }
        })
    },
    calcDate() {
      this.years = []
      for (let i = 1398; i < this.year + 10; i++) {
        this.years.push(i)
      }
      let yearMonth = moment.from(`${this.year}/${this.month}`, "fa", "jYYYY/jMM").format("jYYYY/jMM")
      const lastDay = moment.from(`${this.year}/${this.month}`, "fa", "jYYYY/jMM").jDaysInMonth()
      this.lastDay = lastDay
      const start = moment.from(`${yearMonth}/01`, "fa", "YYYY/MM/DD").locale("en").format("YYYY/MM/DD")
      const end = moment.from(`${yearMonth}/${lastDay}`, "fa", "YYYY/MM/DD").locale("en").format("YYYY/MM/DD")
      this.search = {
        start,
        end,
        case_type: ''
      }
    },
    getUsers() {
      this.$store.dispatch('users/getUsers')
    },
    getCaseTypes() {
      this.$store.dispatch('cases/getCaseTypes', {type: 1})
    },
    doAction() {
      switch (this.action) {
        case 1:
          this.$router.push({
            path: '/holidays'
          })
          break;
        case 2:
          this.$router.push({
            path: '/schedule'
          })
          break;
        case 3:
          this.$router.push({
            path: '/cases'
          })
          break;
        case 4:
          this.toggleShowWorkHour()
          break;
      }
    },
    toggleShowWorkHour() {
      this.showWorkHour = !this.showWorkHour
    },
    closeShowWorkHour() {
      this.toggleShowWorkHour()
      this.action = null
    },
    customLabel(item) {
      return item.fname
    },
    onChecked(item) {
      this.appointment.case_type = item.checked ? item.name : ''
    },
    getToday(day) {
      return moment.from(`${this.year}/${this.month}/${day}`, "fa", "jYYYY/jMM/jDD").locale("fa").format("dddd");
    },
    isToday(day) {
      const d = moment.from(`${this.year}/${this.month}/${day}`, "fa", "jYYYY/jMM/jDD").locale("en").format("YYYY/MM/DD");
      const now = moment().locale("en").format("YYYY/MM/DD");
      return d.normalize() === now.normalize()
    },
    isFriday(day) {
      const d = moment.from(`${this.year}/${this.month}/${day}`, "fa", "jYYYY/jMM/jDD");
      return d.weekday() == 6
    },
    getTime(day) {
      const wh = this.que.work_hour
      const start = wh.start
      const end = wh.end
      let duration = this.que.default_duration
      if (duration === 0) {
        duration = 20
      }
      let date = moment.from(start, "en", "HH:mm:ss").utc(true).format("HH:mm:ss")
      date = moment.from(date, 'fa', 'HH:mm:ss').locale('en').add((day) * duration, "minutes").format("HH:mm:ss")
      return date
    },
    onMonthChanged(month) {
      this.month = month
      this.getAppointmentList()
    },
    onYearChanged(year) {
      this.year = year
      this.getAppointmentList()
    },
    getHolidays() {
      this.$store.dispatch('holidays/getHolidays')
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    users() {
      return this.$store.getters['users/getUsers']
    },
    cases() {
      return this.$store.getters['cases/getCaseTypes']
    },
    workHour() {
      return this.$store.getters['organizations/getOrganizationWorkHour']
    },
    selectedAll: {
      get() {
        return this.selectedItems.length > 0 && this.selectedItems.length === this.appointments.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedItems = []
          this.selectedItems = this.appointments.data.map(i => i.id)
        } else {
          this.selectedItems = []
        }
      }
    },
  },
}
</script>

<style scoped>

</style>
