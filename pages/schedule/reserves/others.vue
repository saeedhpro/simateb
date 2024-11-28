<template>
  <v-container fluid>
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box schedule">
          <nuxt-link to="/schedule/reserves" class="page-header">
            <img src="/images/pages/docs.svg" alt="organizations">
            <span class="title">
                مشاهده رزروها برای من
            </span>
          </nuxt-link>
          <nuxt-link to="/schedule/reserves/others" class="page-header">
            <img src="/images/pages/docs.svg" alt="organizations">
            <span class="title">
                مشاهده رزروها برای دیگران
            </span>
          </nuxt-link>
          <v-divider class="d-none d-lg-flex" inset />
          <v-spacer class="d-none d-sm-flex d-lg-none" />
<!--          <nuxt-link to="/schedule/reserves" class="page-actions second-button big">-->
<!--            <img src="/images/pages/docs.svg" alt="organizations">-->
<!--            <span class="title">مشاهده رزروهابرای من</span>-->
<!--          </nuxt-link>-->
<!--          <nuxt-link to="/schedule/reserves/others" class="page-actions second-button big">-->
<!--            <img src="/images/pages/docs.svg" alt="organizations">-->
<!--            <span class="title">مشاهده رزروهابرای دیگران</span>-->
<!--          </nuxt-link>-->
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
            <v-spacer/>
            <v-col
              cols="12"
              sm="6"
              md="6"
              lg="5"
            >
              <div class="page-main-actions-left">
                <div class="result-count">
                  <span>{{ schedules.meta.total ? schedules.meta.total : 0  }}</span>
                  نتیجه
                </div>
                <div class="page-search-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17.995" height="18" viewBox="0 0 17.995 18">
                    <defs>
                      <style>.a {
                        fill: #757575;
                      }</style>
                    </defs>
                    <path class="a"
                          d="M17.722,16.559l-4.711-4.711a7.094,7.094,0,0,0,1.582-4.535,7.327,7.327,0,1,0-2.777,5.729l4.711,4.711a.972.972,0,0,0,.629.247.844.844,0,0,0,.6-.247A.822.822,0,0,0,17.722,16.559ZM1.687,7.313a5.625,5.625,0,1,1,5.625,5.625A5.632,5.632,0,0,1,1.687,7.313Z"
                          transform="translate(0)"/>
                  </svg>
                  <input class="search-input" v-model="search.q" type="text" ref="search-input"
                         placeholder="جستجو" @input="getScheduleList(false)">
                  <div @click="getScheduleList(false)" class="search-button">
                    <img src="/images/pages/search-button.svg">
                  </div>
                  <div @click="toggleFilterModal" class="search-filter">
                    <img src="/images/pages/filter.svg">
                    فیلتر
                  </div>
                  <v-dialog
                    v-model="showFilterModal"
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
                            @click="closeFilterModal"
                            class="create-update-modal-close"
                          >
                            <v-icon>mdi-close</v-icon>
                          </button>
                          <span>جستجو پیشرفته</span>
                        </div>
                        <v-spacer/>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row><v-col
                            cols="12"
                            sm="6"
                            md="3"
                          >
                            <div class="create-update-model-input-box">
                              <label>عبارت جستجو</label>
                              <input type="text" v-model="search.q">
                            </div>
                          </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="3"
                            >
                              <div class="create-update-model-input-box">
                                <label>تخصص</label>
                                <v-autocomplete
                                  v-model="search.profession_id"
                                  :items="professions"
                                  outlined
                                  dense
                                  item-text="name"
                                  item-value="id"
                                  label=""
                                ></v-autocomplete>
                              </div>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="3"
                            >
                              <div class="create-update-model-input-box">
                                <label>تاریخ ابتدا</label>
                                <date-picker
                                  v-model="search.start"
                                  format="YYYY-MM-DD"
                                  display-format="jYYYY/jMM/jDD"
                                  editable
                                  class="date-picker"
                                  type="date"
                                >
                                  <template v-slot:label>
                                    <img src="/images/form/datepicker.svg">
                                  </template>
                                </date-picker>
                              </div>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="3"
                            >
                              <div class="create-update-model-input-box">
                                <label>تاریخ انتها</label>
                                <date-picker
                                  v-model="search.end"
                                  format="YYYY-MM-DD"
                                  display-format="jYYYY/jMM/jDD"
                                  editable
                                  class="date-picker"
                                  type="date"
                                >
                                  <template v-slot:label>
                                    <img src="/images/form/datepicker.svg">
                                  </template>
                                </date-picker>
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
                                class="second-button full-width"
                                @click="clearForm"
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
                                class="second-button full-width"
                                @click="closeFilterModal"
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
                                @click="getScheduleList"
                              >
                                جستجو
                              </button>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
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
                      {{
                        i.res_organization ? i.res_organization.profession.name : ''
                      }}
                    </td>
                    <td class="text-center">
                      {{ i.user ? i.user.full_name : '-' }}
                    </td>
                    <td class="text-center">
                      {{ i.user ? i.user.tel : '-' }}
                    </td>
                    <td class="text-center">
                      {{ i.code ? i.code : '-' }}
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
  data() {
    return {
      moment: moment,
      showFilterModal: false,
      showReserveForm: false,
      headers: [
        '',
        'مطب',
        'تخصص',
        'بیمار',
        'شماره تماس',
        'کد پذیرش',
        'تاریخ',
        'ساعت',
        'خدمت',
      ],
      search: {
        page: 1,
        start: '',
        end: '',
        q: '',
        profession_id: 0,
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
    }
  },
  async mounted() {
    await this.getWorkHour()
    this.getScheduleList(false)
    this.form.start = this.workHour.start
    this.form.end = this.workHour.end
    this.getProfessions()
  },
  methods: {
    async getWorkHour() {
      return this.$store.dispatch('appointment/getOrganizationWorkHour', this.loginUser.organization_id)
    },
    getProfessions() {
      this.$store.dispatch('admin/professions/getProfessions')
    },
    getScheduleList(filtered = true) {
      let startDay = null
      let endDay = null
      if (filtered) {
        startDay = this.search.start
        endDay = this.search.end
      }
      this.$store.dispatch('reserves/getForOthersList', {
        ...this.search,
        start: startDay,
        end: endDay,
        profession_id: this.search.profession_id,
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
    openReserveForm() {
      this.showReserveForm = true
    },
    closeReserveForm() {
      this.showReserveForm = false
    },
    toggleFilterModal() {
      this.showFilterModal = !this.showFilterModal
    },
    closeFilterModal() {
      this.clearSearchForm()
      this.toggleFilterModal()
    },
    clearSearchForm() {
      this.search = {
        page: this.search.page,
        start: '',
        end: '',
        q: '',
        profession_id: 0,
      }
    },
  },
  computed: {
    schedules() {
      return this.$store.getters['reserves/getForOthersList']
    },
    professions() {
      return this.$store.getters['admin/professions/getProfessions']
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
  },
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
