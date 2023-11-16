<template>
  <v-container fluid>
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box schedule">
          <div class="page-header">
            <img src="/images/pages/users.svg" alt="organizations">
            <span class="title">
              نوبت دهی اینترنتی (VIP)
            </span>
          </div>
          <v-divider class="d-none d-lg-flex" inset />
          <v-spacer class="d-none d-sm-flex d-lg-none" />
          <nuxt-link to="/schedule/reserves" class="page-actions second-button">
            <img src="/images/pages/docs.svg" alt="organizations">
            <span class="title">رزروهابرای من</span>
          </nuxt-link>
          <div class="page-actions" @click="openReserveForm">
            <img src="/images/pages/plus.svg" alt="organizations">
            <span class="title-main">رزرو برای دکتر دیگر</span>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="page-main-box">
          <v-row class="search-box">
            <v-col cols="12" sm="6" md="4" lg="3">
              <div class="right-box">
                <v-select outlined :items="months" label="ماه" item-value="id" item-text="label" v-model="month"
                  @change="onMonthChanged"></v-select>
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <div class="right-box">
                <v-select outlined :items="years" label="سال" item-value="id" item-text="label" v-model="year"
                  @change="onYearChanged"></v-select>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <data-table-component :headers="headers" :page="search.page" :total="schedules.meta.total"
                @paginate="paginate">
                <template v-slot:body>
                  <tr v-for="(i, n) in schedules.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 }}</td>
                    <td class="text-center">
                      <span class="file-id vip">
                        {{
                          i.res_organization ? i.res_organization.name : ''
                        }}
                      </span>
                    </td>
                    <td class="text-center">
                      {{ i.start_at_fa }}
                    </td>
                    <td class="text-center">
                      {{
                        i.start_at_time_fa
                      }}
                    </td>
                    <td class="text-center">{{ i.case_type ? i.case_type : '-' }}</td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="schedules.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <appointment-reserve-component :open="showReserveForm" @close="closeReserveForm" />
  </v-container>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent.vue";
import CustomRadioBox from "~/components/panel/global/CustomInput/CustomRadioBox.vue";
import moment from "jalali-moment";
import AppointmentReserveComponent from "~/components/panel/profile/appointments/AppointmentReserveComponent.vue";
import CustomDatePickerJs from "~/components/custom/CustomDatePickerJs.vue"
export default {
  name: "index",
  layout: "panel",
  middleware: "auth",
  components: { AppointmentReserveComponent, CustomRadioBox, DataTableComponent, CustomDatePickerJs },
  async mounted() {
    await this.getWorkHour()
    const year = parseInt(moment().local().format("jYYYY"))
    const month = parseInt(moment().local().format("jMM"))
    this.year = year
    this.month = month
    this.paginate()
    this.form.start = this.workHour.start
    this.form.end = this.workHour.end
  },
  methods: {
    async getWorkHour() {
      return this.$store.dispatch('appointment/getOrganizationWorkHour', this.loginUser.organization_id)
    },
    getScheduleList() {
      let month = this.month;
      let year = this.year;
      if (month < 10) {
        month = `0${month}`
      }
      let startDay = moment(`${year}/${month}/01`, 'jYYYY/jMM/jDD', 'fa').locale('en')
      let endDay = startDay.clone().endOf('jMonth').locale('en')
      this.$store.dispatch('reserves/getForOthersList', {
        ...this.search,
        start: startDay.format('YYYY/MM/DD'),
        end: endDay.format('YYYY/MM/DD')
      })
    },
    paginate(page = 1) {
      this.search.page = page
      this.getScheduleList()
    },
    clearForm() {
      this.form = {
        start: this.workHour.start,
        end: this.workHour.end,
        case_type: '',
        id: null,
        date: '',
        start_at: '',
        end_at: '',
        count: 0,
        site: 0,
        app: 0,
        organization_id: null,
        dates: [],
      }
      this.form.start = this.workHour.start
      this.form.end = this.workHour.end
    },
    validateForm(form) {
      let isValid = true
      if (this.create && form.dates.length == 0) {
        isValid = false
        this.$toast.error('تاریخ را وارد کنید')
      }
      if (!this.create && !form.date) {
        isValid = false
        this.$toast.error('تاریخ را وارد کنید')
      }
      if (!form.start) {
        isValid = false
        this.$toast.error('زمان شروع را وارد کنید')
      }
      if (!form.end) {
        isValid = false
        this.$toast.error('زمان پایان را وارد کنید')
      }
      if (!form.case_type) {
        isValid = false
        this.$toast.error('خدمت را انتخاب کنید')
      }
      if (!form.start_at) {
        isValid = false
        this.$toast.error('تاریخ رزرو را انتخاب کنید')
      }
      return isValid
    },
    createSchedule() {
      const type = this.create ? 'schedule/createSchedule' : 'schedule/updateSchedule'
      if (!this.validateForm(this.form)) {
        return
      }
      let data = {
        id: this.form.id,
        start_at: `${this.form.date} ${this.form.start}`,
        start: this.form.start,
        end_at: `${this.form.date} ${this.form.end}`,
        end: this.form.end,
        count: parseInt(this.form.count),
        site: parseInt(this.form.site),
        app: parseInt(this.form.app),
        case_type: this.form.case_type,
        organization_id: this.form.organization_id ? parseInt(this.form.organization_id) : parseInt(this.loginUser.organization_id),
        dates: this.form.dates,
      }
      this.$store.dispatch(type, data)
        .then(() => {
          setTimeout(() => {
            this.closeForm()
            this.showCreateModal = false
            this.getScheduleList()
          }, 50)
        })
    },
    onMonthChanged(month) {
      this.month = month
      this.getScheduleList()
    },
    onYearChanged(year) {
      this.year = year
      this.getScheduleList()
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
    openReserveForm() {
      this.showReserveForm = true
    },
    closeReserveForm() {
      this.showReserveForm = false
    }
  },
  data() {
    return {
      moment: moment,
      showReserveForm: false,
      headers: [
        '',
        'مطب',
        'تاریخ',
        'ساعت',
        'خدمت',
      ],
      search: {
        page: 1,
      },
      form: {
        date: moment().locale('en').format('YYYY/MM/DD'),
        start: '08:00:00',
        end: '10:00:00',
        id: null,
        start_at: '',
        end_at: '',
        count: 0,
        site: 0,
        app: 0,
        case_type: '',
        organization_id: null,
        dates: [],
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
    }
  },
  computed: {
    schedules() {
      return this.$store.getters['reserves/getForOthersList']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    workHour: {
      get() {
        return this.$store.getters['appointment/getWorkHour']
      },
      set(val) {
        return this.$store.dispatch('appointment/setWorkHour', val)
      }
    },
    years() {
      const years = [];
      const year = parseInt(this.$moment().format("jYYYY")) + 10;
      for (let i = 1398; i < year; i++) {
        years.push(i)
      }
      return years
    }
  },
  watch: {
    'form.start'() {
      this.form.start_at = `${this.form.date} ${this.form.start}`
    },
    'form.end'() {
      this.form.end_at = `${this.form.date} ${this.form.end}`
    }
  }
}
</script>

<style scoped lang="scss">
.case-type-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  .case-type-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    .case-item-name {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      margin: 5px;
      padding: 5px;
      width: 100%;
    }

    .case-actions {
      width: 230px;
    }
  }
}

.inline-input-btn {
  display: flex;
  align-items: flex-end;
  flex-direction: row;
}

.inline-btn {
  max-width: 200px;
  min-width: 100px;
  margin-right: 10px;
}

.case-item-name {
  background: #E6E6E6 0 0 no-repeat padding-box;
  border-radius: 8px;
  height: 40px;
  display: flex;
  align-items: center;
}
</style>
