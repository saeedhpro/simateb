<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box">
          <div class="page-header">
            <img src="/images/pages/users.svg" alt="organizations">
            <span class="title">
            نوبت دهی اینترنتی (VIP)
          </span>
          </div>
          <v-divider inset/>
          <v-dialog
            v-model="showCreateModal"
            max-width="1056px"
            persistent
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
                  <span>فرم ایجاد نوبت دهی اینترنتی (VIP)</span>
                </div>
                <v-spacer/>
                <div class="create-update-modal-regbox">
                  ثبت در سیستم توسط: {{ `${loginUser.staff.lname} ${loginUser.staff.fname}` }}
                  ({{ loginUser.created | toRelativeDate }} {{
                    loginUser.created | toPersianDate('YYYY/MM/DD HH:mm:ss')
                  }})
                </div>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <div class="create-update-model-input-box">
                        <label>عنوان</label>
                        <input type="text" v-model="form.name">
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <div class="create-update-model-input-box">
                        <label>مدت زمان ویزیت (دقیقه)</label>
                        <input type="number" v-model="form.duration">
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <div class="create-update-model-input-box">
                        <custom-radio-box
                          v-model="form.is_limited"
                          label="دارای محدودیت"
                          :rtl="true"
                        />
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      v-if="form.is_limited"
                    >
                      <div class="create-update-model-input-box">
                        <label>میزان محدودیت (در صورت تمایل)</label>
                        <input type="number" v-model="form.limitation">
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
                        @click="clearForm"
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
                      <button
                        class="main-button"
                        @click="createSchedule"
                      >
                        ذخیره
                      </button>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="showRemoveItemModal"
            max-width="648px"
            persistent
          >
            <v-card
              class="create-update-modal"
            >
              <v-card-title
                class="create-update-modal-title-box"
              >
                <div class="create-update-modal-title">
                  <button
                    @click="cancelRemoveItem"
                    class="create-update-modal-close"
                  >
                    <v-icon>mdi-close</v-icon>
                  </button>
                </div>
                <v-spacer/>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                      <div class="create-update-model-input-title">عنوان</div>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                      <div class="create-update-model-input-description">آیا از حذف کردن این پذیرش vip اطمینان دارید؟
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
                      sm="6"
                      md="6"
                    >
                      <button
                        class="second-false-button"
                        @click="cancelRemoveItem"
                      >
                        خیر
                      </button>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <button
                        class="main-false-button"
                        @click="removeItem"
                      >
                        بله، حذف کن
                      </button>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div class="page-actions"
               @click="createModal"
          >
            <img src="/images/pages/new-user.svg" alt="organizations">
            <span class="title">پذیرش vip جدید</span>
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
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <data-table-component
                :headers="headers"
                :page="search.page"
                :total="schedules.total_rows"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in schedules.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 | persianDigit }}</td>
                    <td class="text-center">
                      {{ i.start_at | toPersianDate('YYYY/MM/DD dddd') }}
                    </td>
                    <td class="text-center">
                      {{ i.start_at | toPersianDate('HH:mm:ss') }}
                    </td>
                    <td class="text-center">{{ i.count | persianDigit }}</td>
                    <td class="text-center flex flex-row justify-space-around align-center">
                      <button @click="editSchedule(i)" class="action-buttons">
                        <v-icon size="16">mdi-pencil-outline</v-icon>
                        <span>ویرایش</span>
                      </button>
                      <button
                        @click="showRemoveItem(i.id)"
                        class="action-buttons">
                        <v-icon size="16">mdi-trash-can-outline</v-icon>
                        <span>حذف</span>
                      </button>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="schedules.total_rows === 0">اطلاعاتی یافت نشد</div>
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
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import CustomRadioBox from "~/components/panel/global/CustomInput/CustomRadioBox";
import moment from "jalali-moment";

export default {
  name: "index",
  layout: "panel",
  middleware: "auth",
  components: {CustomRadioBox, DataTableComponent},
  mounted() {
    const year = parseInt(moment().locale("fa").format("jYYYY"))
    const month = parseInt(moment().locale("fa").format("jMM"))
    this.year = year
    this.month = month
    this.paginate()
  },
  methods: {
    toggleOverlay() {
      this.overlay = !this.overlay
    },
    getScheduleList() {
      this.toggleOverlay()
      this.showFilterModal = false
      this.$store.dispatch('schedule/getList', this.search)
        .finally(() => {
          setTimeout(() => {
            this.toggleOverlay()
          }, 350)
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
      this.toggleOverlay()
      this.$store.dispatch('schedule/removeSchedule', this.selectedItem)
        .finally(() => {
          setTimeout(() => {
            this.toggleRemoveItemModal()
            this.toggleOverlay()
            this.getScheduleList()
          }, 350)
        })
    },
    editSchedule(schedule) {
      this.create = false
      this.form = {
        id: schedule.id,
        start_at: schedule.start_at,
        end_at: schedule.end_at,
        count: schedule.count,
        organization_id: schedule.organization_id,
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
        id: null,
        start_at: '',
        end_at: '',
        count: 0,
        organization_id: null,
      }
    },
    createSchedule() {
      this.toggleOverlay()
      const type = this.create ? 'schedule/createSchedule' : 'schedule/updateSchedule'
      this.$store.dispatch(type, {
        id: this.form.id,
        start_at: this.form.start_at,
        end_at: this.form.end_at,
        count: parseInt(this.form.count),
        organization_id: this.form.organization_id ? parseInt(this.form.organization_id) : parseInt(this.loginUser.organization_id),
      })
        .then(() => {
          setTimeout(() => {
            this.closeForm()
            this.showCreateModal = false
            this.getScheduleList()
          }, 350)
        })
        .finally(() => {
          setTimeout(() => {
            this.toggleOverlay()
          }, 350)
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
  },
  data() {
    return {
      moment: moment,
      overlay: false,
      showCreateModal: false,
      showRemoveItemModal: false,
      create: false,
      headers: [
        '',
        'تاریخ',
        'ساعت',
        'تعداد',
        'عملیات',
      ],
      search: {
        page: 1,
      },
      form: {
        id: null,
        start_at: '',
        end_at: '',
        count: 0,
        organization_id: null,
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
    }
  },
  computed: {
    schedules() {
      return this.$store.getters['schedule/getList']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    }
  }
}
</script>

<style scoped>

</style>
