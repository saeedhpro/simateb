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
          <div class="page-actions second-button" @click="openCasesModal">
            <img src="/images/pages/plus-out.svg" alt="organizations">
            <span class="title">خدمات</span>
          </div>
          <div class="page-actions" @click="createModal">
            <img src="/images/pages/plus.svg" alt="organizations">
            <span class="title-main">افزودن</span>
          </div>
          <nuxt-link to="/schedule/list" class="page-actions">
            <img src="/images/pages/new-user.svg" alt="users">
            <span class="title-main mr-4">لیست رزرو دکتر دیگر</span>
          </nuxt-link>
          <div class="page-actions" @click="openReserveForm">
            <img src="/images/pages/new-user.svg" alt="users">
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
                          i.start_at_fa
                        }}
                      </span>
                    </td>
                    <td class="text-center">
                      <span>
                        از
                      </span>
                      <span>
                        {{
                          i.start_at_time_fa
                        }}
                      </span>
                      <span>
                        تا
                      </span>
                      <span>
                        {{
                          i.end_at_time_fa
                        }}
                      </span>
                    </td>
                    <td class="text-center">
                      <span style="font-size: 1rem">{{ i.count }} (</span>
                      <span style="color: #5063FF">{{i.count - i.count_reserved}}</span>
                      <span>)</span>
                    </td>
                    <td class="text-center">
                      <span style="font-size: 1rem">{{ i.site }} (</span>
                      <span style="color: #5063FF">{{i.site - i.site_reserved}}</span>
                      <span>)</span>
                    </td>
                    <td class="text-center">
                      <span style="font-size: 1rem">{{ i.app }} (</span>
                      <span style="color: #5063FF">{{i.app - i.app_reserved}}</span>
                      <span>)</span>
                    </td>
                    <td class="text-center">{{ i.case_type ? i.case_type : '-' }}</td>
                    <td class="text-center flex flex-row justify-space-around align-center">
                      <button @click="editSchedule(i)" class="action-buttons">
                        <v-icon size="16">mdi-pencil-outline</v-icon>
                        <span>ویرایش</span>
                      </button>
                      <button @click="showRemoveItem(i.id)" class="action-buttons">
                        <v-icon size="16">mdi-trash-can-outline</v-icon>
                        <span>حذف</span>
                      </button>
                    </td>
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
    <v-dialog v-model="showCreateModal" max-width="1056px" persistent>
      <v-card class="create-update-modal">
        <v-card-title class="create-update-modal-title-box">
          <div class="create-update-modal-title">
            <button @click="closeForm" class="create-update-modal-close">
              <v-icon>mdi-close</v-icon>
            </button>
            <span>فرم ایجاد نوبت دهی اینترنتی (VIP)</span>
          </div>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div v-if="create" class="create-update-model-input-box">
                  <label>تاریخ</label>
                  <date-picker multiple v-model="form.dates" format="YYYY/MM/DD" display-format="jYYYY/jMM/jDD"
                               class="date-picker" type="date">
                    <template v-slot:label>
                      <img src="/images/form/datepicker.svg">
                    </template>
                  </date-picker>
                </div>
                <custom-date-picker-js v-else label="تاریخ" v-model="form.date" type="date" />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div class="create-update-model-input-box">
                  <label>زمان شروع</label>
                  <!--                  <custom-date-input-->
                  <!--                    :type="'time'"-->
                  <!--                    v-model="form.start"-->
                  <!--                    :initial-value="form.start"-->
                  <!--                  />-->
                  <date-picker v-model="form.start" format="HH:mm:ss" display-format="HH:mm:ss" editable
                    class="date-picker" :jump-minute="15" :round-minute="true" type="time">
                    <template v-slot:label>
                      <img src="/images/form/datepicker.svg">
                    </template>
                  </date-picker>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div class="create-update-model-input-box">
                  <label>زمان پایان</label>
                  <!--                  <custom-date-input-->
                  <!--                    :type="'time'"-->
                  <!--                    v-model="form.end"-->
                  <!--                    :initial-value="form.end"-->
                  <!--                  />-->
                  <date-picker v-model="form.end" format="HH:mm:ss" display-format="HH:mm:ss" editable class="date-picker"
                    :jump-minute="15" :round-minute="true" type="time">
                    <template v-slot:label>
                      <img src="/images/form/datepicker.svg">
                    </template>
                  </date-picker>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div class="create-update-model-input-box">
                  <custom-number-input label="ظرفیت Doctor" v-model="form.count" />
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div class="create-update-model-input-box">
                  <custom-number-input label="ظرفیت Site" v-model="form.site" />
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div class="create-update-model-input-box">
                  <custom-number-input label="ظرفیت App" v-model="form.app" />
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div class="create-update-model-input-box">
                  <label>خدمت</label>
                  <v-autocomplete v-model="form.case_type" :items="case_types" outlined dense item-text="name"
                    item-value="id" label=""></v-autocomplete>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col cols="12" sm="3" md="3">
                <button class="second-button full-width" @click="clearForm">
                  پاک کردن فرم
                </button>
              </v-col>
              <v-spacer />
              <v-col cols="12" sm="3" md="3">
                <button class="second-button full-width" @click="closeForm">
                  بستن
                </button>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <button class="main-button" @click="createSchedule">
                  ذخیره
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showRemoveItemModal" max-width="648px" persistent>
      <v-card class="create-update-modal">
        <v-card-title class="create-update-modal-title-box">
          <div class="create-update-modal-title">
            <button @click="cancelRemoveItem" class="create-update-modal-close">
              <v-icon>mdi-close</v-icon>
            </button>
          </div>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <div class="create-update-model-input-title">حذف پذیرش</div>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <div class="create-update-model-input-description">آیا از حذف کردن این پذیرش vip اطمینان دارید؟
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <button class="second-false-button" @click="cancelRemoveItem">
                  خیر
                </button>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <button class="main-false-button" @click="removeItem">
                  بله، حذف کن
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showCasesModal" max-width="1056px" persistent>
      <v-card class="create-update-modal">
        <v-card-title class="create-update-modal-title-box">
          <div class="create-update-modal-title">
            <button @click="closeCasesModal" class="create-update-modal-close">
              <v-icon>mdi-close</v-icon>
            </button>
            <span>خدمات</span>
          </div>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <div class="inline-input-btn">
              <div class="create-update-model-input-box d-inline-flex">
                <label>عنوان خدمت</label>
                <input type="text" v-model="case_type">
              </div>
              <div class="page-actions second-button inline-btn" @click="addCaseType">
                <img src="/images/pages/plus-out.svg" alt="organizations">
                <span class="title">{{ editCT ? 'ویرایش' : 'افزودن' }}</span>
              </div>
            </div>
            <v-divider class="mt-4" />
            <div class="case-type-list">
              <div class="case-type-item" v-for="(c, i) in case_types" :key="i">
                <div class="case-item-name">
                  {{ c }}
                </div>
                <div class="case-actions text-center flex flex-row justify-space-around align-center">
                  <button @click="editCaseType(c, i)" class="action-buttons">
                    <v-icon size="16">mdi-pencil-outline</v-icon>
                    <span>ویرایش</span>
                  </button>
                  <button @click="showRemoveCaseType(c)" class="action-buttons">
                    <v-icon size="16">mdi-trash-can-outline</v-icon>
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-spacer />
              <v-col cols="12" sm="3" md="3">
                <button class="second-button full-width" @click="closeCasesModal">
                  بستن
                </button>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <button class="main-button" @click="saveCases">
                  ذخیره
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <appointment-reserve-component :open="showReserveForm" @close="closeReserveForm" />
  </v-container>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import CustomRadioBox from "~/components/panel/global/CustomInput/CustomRadioBox";
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
    this.setCases()
    this.form.start = this.workHour.start
    this.form.end = this.workHour.end
  },
  methods: {
    async getWorkHour() {
      return this.$store.dispatch('appointment/getOrganizationWorkHour', this.loginUser.organization_id)
    },
    setCases() {
      const cases = this.loginUser.organization.case_types;
      this.case_types = cases ? cases.split(",") : []
    },
    showRemoveCaseType(c) {
      this.case_types = this.case_types.filter(i => i != c)
    },
    editCaseType(c, i) {
      this.case_type = c
      this.editCT = true
      this.editCTI = i
    },
    getScheduleList() {
      let month = this.month;
      let year = this.year;
      if (month < 10) {
        month = `0${month}`
      }
      let startDay = moment(`${year}/${month}/01`, 'jYYYY/jMM/jDD', 'fa').locale('en')
      let endDay = startDay.clone().endOf('jMonth').locale('en')
      this.$store.dispatch('schedule/getList', {
        ...this.search,
        start: startDay.format('YYYY/MM/DD'),
        end: endDay.format('YYYY/MM/DD')
      })
    },
    paginate(page = 1) {
      this.search.page = page
      this.getScheduleList()
    },
    showRemoveItem(id) {
      this.selectedItem = id
      this.toggleRemoveItemModal()
    },
    toggleRemoveItemModal() {
      this.showRemoveItemModal = !this.showRemoveItemModal
    },
    cancelRemoveItem() {
      this.selectedItem = null
      this.toggleRemoveItemModal()
    },
    removeItem() {
      if (!this.selectedItem) return
      this.$store.dispatch('schedule/removeSchedule', this.selectedItem)
        .finally(() => {
          setTimeout(() => {
            this.toggleRemoveItemModal()
            this.getScheduleList()
          }, 50)
        })
    },
    editSchedule(schedule) {
      const start = this.$moment(schedule.start_at, "YYYY/MM/DD HH:mm:ss");
      const end = this.$moment(schedule.end_at, "YYYY/MM/DD HH:mm:ss");
      this.create = false
      this.form = {
        id: schedule.id,
        date: start.format("YYYY/MM/DD"),
        start_at: start.format("YYYY/MM/DD HH:mm:ss"),
        end_at: end.format("YYYY/MM/DD HH:mm:ss"),
        start: start.format("HH:mm:ss"),
        end: end.format("HH:mm:ss"),
        count: schedule.count,
        site: schedule.site,
        app: schedule.app,
        case_type: schedule.case_type,
        organization_id: schedule.organization_id,
        dates: []
      }
      this.toggleCreateModal()
    },
    closeForm() {
      this.clearForm()
      this.toggleCreateModal()
    },
    toggleCreateModal() {
      this.showCreateModal = !this.showCreateModal
    },
    createModal() {
      this.create = true
      this.toggleCreateModal()
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
    openCasesModal() {
      this.showCasesModal = true
    },
    closeCasesModal() {
      this.showCasesModal = false
      this.case_type = ''
      this.setCases()
    },
    addCaseType() {
      if (!this.case_type) return
      if (!this.editCT) {
        this.case_types.push(this.case_type)
        this.case_type = ''
      } else {
        this.case_types[this.editCTI] = this.case_type
        this.case_type = ''
        this.editCT = false
        this.editCTI = 0
      }
    },
    saveCases() {
      this.$store.dispatch('organizations/updateOrganizationCases', {
        id: this.loginUser.organization.id,
        cases: this.case_types.join(",")
      })
        .catch(err => {
          console.log(err)
          this.setCases()
        })
        .finally(() => {
          this.showCasesModal = false
        })
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
      showCreateModal: false,
      showCasesModal: false,
      showRemoveItemModal: false,
      showReserveForm: false,
      selectedItem: null,
      create: false,
      editCT: false,
      editCTI: 0,
      case_type: '',
      case_types: [],
      headers: [
        '',
        'تاریخ',
        'ساعت',
        'ظرفیت Doctor',
        'ظرفیت Site',
        'ظرفیت App',
        'خدمت',
        'عملیات',
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
      return this.$store.getters['schedule/getList']
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
