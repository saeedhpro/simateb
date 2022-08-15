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
            <img src="/images/pages/users.svg" alt="users">
            <span class="title">جستجو نوبت ها</span>
          </nuxt-link>
          <nuxt-link to="/appointment/surgeries" class="page-header">
            <img src="/images/pages/users.svg" alt="users">
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
              sm="4"
              md="2"
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
              sm="4"
              md="2"
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
              sm="4"
              md="2"
            >
              <div class="right-box">
                <div class="mt-4 tafkik">نمایش به تفکیک:</div>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="2"
            >
              <div class="right-box">
                <button
                  class="show-button"
                  @click="toggleShowHour"
                >
                  <img src="/images/form/clock.svg">
                  ساعت
                </button>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="2"
            >
              <div class="right-box">
                <button
                  class="show-button"
                  @click="toggleShowCaseType"
                >
                  <img src="/images/form/list.svg">
                  علل مراجعه
                </button>
              </div>
            </v-col>
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
                      v-for="(i, n) in most"
                    >
                      <td
                        v-for="(j, k) in lastDay"
                      >
                        <table-appointment-component
                          v-if="list[j - 1] && list[j - 1][i - 1]"
                          :item="list[j - 1][i - 1]"
                          :day="j"
                          :month="month"
                          :year="year"
                          @click.native="openItem(list[j - 1][i - 1])"
                        />
                        <table-appointment-none-component
                          v-else
                          :start-at="getTime(i)"
                          :show-hour="showHour"
                          :day="j"
                          :month="month"
                          :year="year"
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
      :open="showPazireshModal"
      @close="closePazireshModal"
    />
    <appointment-form-component
      :open="showAppointmentModal"
      :item="item"
      @close="closeAppointmentModal"
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
  name: "index",
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
      }
    }
  },
  mounted() {
    const year = parseInt(moment().locale("fa").format("jYYYY"))
    const month = parseInt(moment().locale("fa").format("jMM"))
    this.year = year
    this.month = month
    this.getHolidays()
    this.getAppointmentList()
    this.getUsers()
    this.getOrganizationWorkHour()
  },
  methods: {
    getOrganizationWorkHour() {
      const organization = this.loginUser.organization
      if (organization){
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
          setTimeout(() => {
            this.togglePazireshModal()
            this.clearPazireshForm()
            this.getAppointmentList()
          }, 50)
        })
    },
    toggleCreateModal() {
      this.showCreateModal = !this.showCreateModal
    },
    openItem(item) {
      this.item = item
      this.toggleAppointmentModal()
    },
    toggleAppointmentModal() {
      this.showAppointmentModal = !this.showAppointmentModal
    },
    closePazireshModal() {
      this.togglePazireshModal()
      this.getAppointmentList()
    },
    closeAppointmentModal() {
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
      this.calcList()
    },
    paginate(page = 1) {
      this.search.page = page
      this.getAppointmentList()
    },
    getAppointmentList() {
      this.calcDate()
      this.$store.dispatch('appointments/getQue', this.search)
        .finally(() => {
          this.calcList()
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
      }
    },
    isBetween(date, start, end) {
      return moment(date, "YYYY/MM/DD HH:mm:ss").locale("fa")
        .isBetween(moment(start, "YYYY/MM/DD HH:mm:ss"),
          moment(end, "YYYY/MM/DD HH:mm:ss"))
    },
    getUsers() {
      this.$store.dispatch('users/getUsers')
    },
    getCaseTypes() {
      this.$store.dispatch('cases/getCaseTypes')
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
      return moment.from(`${this.year}/${this.month}/${day}`, "fa", "YYYY/MM/DD").locale("fa").format("dddd");
    },
    getTime(day) {
      const wh = this.workHour
      const start = wh.start
      const end = wh.end
      let duration = this.que.default_duration
      if (duration === 0) {
        duration = 20
      }
      return moment(start, "HH:mm:ss").add((day - 1) * duration, "minutes").format("HH:mm:ss")
    },
    calcDurations() {
      if (!this.workHour) {
        return
      }
      const wh = this.workHour
      const start = wh.start
      const end = wh.end
      let duration = this.que.default_duration
      if (duration === 0) {
        duration = 20
      }
      const d = moment.duration(moment(end, "HH:mm:ss").diff(moment(start, "HH:mm:ss"))).asMinutes()
      this.durations = Math.ceil(d / duration)
    },
    calcList() {
      this.most = 5
      let list = this.que.ques;
      let list2 = Array(this.lastDay).fill(null).map(() => Array(0))
      let year = this.year
      if (year < 10) {
        year = `0${year}`
      }
      let month = this.month
      if (month < 10) {
        month = `0${month}`
      }
      const yearMonth = `${year}/${month}`;
      for (let i = 0; i < this.lastDay; i++) {
        for (let j = 0; j < list.length; j++) {
          let s = i + 1;
          if (s < 10) {
            s = `0${s}`
          }
          if (this.$moment(list[j].start_at).format("jYYYY/jMM/jDD") === `${yearMonth}/${s}`) {
            list2[i].push(list[j])
          }
        }
      }
      for (let i = 0; i < list2.length; i++) {
        if (this.most < list2[i].length) {
          this.most = list2[i].length
        }
      }
      this.calcDurations()
      if (this.showHour && this.most < this.durations) {
        this.most = this.durations
      }
      if (!this.showHour && this.most < 5) {
        this.most = 5
      }
      this.list = list2
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
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    que() {
      return this.$store.getters['appointments/getQue']
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
