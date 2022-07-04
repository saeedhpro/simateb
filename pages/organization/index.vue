<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box">
          <nuxt-link to="/organization" class="page-header">
            <img src="/images/pages/users.svg" alt="users">
            <span class="title">
              {{ isDoctor ? 'پذیرش' : 'ارسال نتایج' }}
            </span>
          </nuxt-link>
          <nuxt-link to="/organization/search" class="page-header">
            <img src="/images/pages/users.svg" alt="users">
            <span class="title">جستجو</span>
          </nuxt-link>

          <v-divider inset/>
          <div class="page-actions-secondary"
               @click="isDoctor ? () => togglePazireshModal() : () => {}"
          >
            <span class="title">
              {{ today | toPersianDate('dddd DD MMMM') }}
            </span>
          </div>
          <div
            v-if="isDoctor"
            class="page-actions"
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
          <v-row
            v-if="isDoctor"
            class="search-box">
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
          <v-row
            v-else
            class="search-box">
            <v-col
              cols="12"
              sm="12"
              md="4"
            >
              <div class="right-box">
                <v-checkbox
                  v-model="selectedAll"
                ></v-checkbox>
                <div class="selected-count" v-if="selectedItems.length > 0">
                  {{ selectedItems.length }}
                </div>
                <v-select
                  outlined
                  :items="actions"
                  label="اقدام جمعی"
                  item-value="id"
                  item-text="label"
                  v-model="action"
                ></v-select>
                <button
                  class="do-action-btn"
                  @click="doAction"
                  :disabled="!action"
                >انجام بده
                </button>
              </div>
            </v-col>
            <v-spacer />
            <v-col
              cols="12"
              sm="12"
              md="5"
            >
              <div class="page-main-actions-left">
                <div class="result-count">
                  <span>{{ appointments.total_rows | persianDigit }}</span>
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
                  <input class="search-input" v-model="search.q" type="text" ref="search-input" placeholder="جستجو">
                  <div @click="getAppointmentList" class="search-button">
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
                          <v-row>
                            <v-col
                              cols="12"
                              sm="4"
                              md="4"
                            >
                              <div class="create-update-model-input-box">
                                <label>عبارت جستجو</label>
                                <input type="text" v-model="search.q">
                              </div>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="4"
                              md="4"
                            >
                              <div class="create-update-model-input-box">
                                <label>تاریخ ابتدا</label>
                                <date-picker
                                  v-model="search.start"
                                  format="YYYY-MM-DD"
                                  displat-format="jYYYY-jMM-jDD"
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
                              sm="4"
                              md="4"
                            >
                              <div class="create-update-model-input-box">
                                <label>تاریخ انتها</label>
                                <date-picker
                                  v-model="search.end"
                                  format="YYYY-MM-DD"
                                  displat-format="jYYYY-jMM-jDD"
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
                                @click="getAppointmentList"
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
            <v-col
              cols="12"
            >
              <data-table-component
                v-if="isDoctor"
                :headers="doctorHeaders"
                :page="search.page"
                :total="appointments.total_rows"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in appointments.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 | persianDigit }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <img
                          :src="i.user && i.user.logo ? i.user.logo : 'https://randomuser.me/api/portraits/men/88.jpg'">
                        <span>
                          <a class="select-item-search" @click="openAppointmentModal(i)">{{
                              i.user ? `${i.user.fname} ${i.user.lname}` : '-' | persianDigit
                            }}</a>
                        </span>
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
                        v-if="i.radiology"
                        class="has-erja">
                        <img src="/images/form/check2.svg">
                      </div>
                    </td>
                    <td class="text-center">
                      <div
                        v-if="i.photography"
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
              <data-table-component
                v-else
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
                        <img
                          :src="i.user && i.user.logo ? i.user.logo : 'https://randomuser.me/api/portraits/men/88.jpg'">
                        <span>
                          <a @click="openPazireshModal(i)">{{
                              i.user ? `${i.user.fname} ${i.user.lname}` : '-' | persianDigit
                            }}</a>
                        </span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.user && i.user.tel ? i.user.tel : '-' | persianDigit }}</td>
                    <td class="text-center">{{ i.code ? i.code : '-' | persianDigit }}</td>
                    <td class="text-center">
                      {{ i.start_at | toRelativeDate }}
                      {{ i.start_at | toPersianDate('dddd DD MMMM') }}
                    </td>
                    <td class="text-center">{{ getCases(i) | persianDigit }}</td>
                    <td class="text-center">
                      <span
                        class="status-box"
                        :style="{
                          'background-color': `${statuses[i.status - 1].background}`,
                          'color': `${statuses[i.status - 1].color}`
                        }"
                      >
                        {{ statuses[i.status - 1].title }}
                      </span>
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
    <create-appointment-form-component
      :open="showPazireshModal"
      @close="closePazireshModal"
      @loading="toggleOverlay"
    />
    <appointment-form-component
      :open="showAppointmentModal"
      :item="item"
      @close="closeAppointmentModal"
      @loading="toggleOverlay"
    />
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
import CaseTypeCheckboxComponent from "~/components/panel/appointment/CaseTypeCheckboxComponent";
import AppointmentFormComponent from "~/components/panel/appointment/AppointmentForm/AppointmentFormComponent";
import CreateAppointmentFormComponent
  from "~/components/panel/appointment/AppointmentForm/CreateAppointmentFormComponent";

export default {
  name: "index",
  components: {CreateAppointmentFormComponent, AppointmentFormComponent, CaseTypeCheckboxComponent, DataTableComponent},
  layout: 'panel',
  data() {
    return {
      showPazireshModal: false,
      showAppointmentModal: false,
      overlay: false,
      showFilterModal: false,
      openShowPazireshModal: false,
      item: null,
      selectedItems: [],
      actions: [
        {
          id: 0,
          label: 'اقدام جمعی'
        },
        {
          id: 1,
          label: 'حذف کن'
        },
        {
          id: 2,
          label: 'ارسال پیامک'
        }
      ],
      action: null,
      search: {
        page: 1,
        start: this.$moment().format("YYYY-MM-DD"),
        end: this.$moment().format("YYYY-MM-DD"),
        q: '',
      },
      doctorHeaders: [
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
      headers: [
        '',
        'بیمار',
        'موبایل',
        'کد پذیرش',
        'تاریخ ویزیت',
        'درخواست پزشک',
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
          title: 'کنسل شده',
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
      },
    }
  },
  mounted() {
    this.paginate()
    this.getUsers()
    this.getCaseTypes()
  },
  methods: {
    paginate(page = 1) {
      this.search.page = page
      this.getAppointmentList()
    },
    getAppointmentList() {
      this.toggleOverlay()
      if (this.profession === 'photography' || this.profession === 'radiology' || this.profession === 'laboratory') {
        this.search.start = ''
        this.search.end = ''
      }
      this.$store.dispatch('appointments/getOrganizationAppointmentsList', this.search)
        .finally(() => {
          this.toggleOverlay()
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
    openPazireshModal() {
      this.togglePazireshModal()
    },
    openAppointmentModal(item) {
      this.item = item
      this.toggleAppointmentModal()
    },
    createAppointment() {
      this.toggleOverlay()
      if (!this.appointment.user_id) {
        this.toggleOverlay()
        return
      }
      this.$store.dispatch('appointments/createAppointment', {
        ...this.appointment,
        user_id: this.user.id,
        income: parseFloat(this.appointment.income.split(' ')[0].split(',').join('')),
      })
        .then(() => {
          this.togglePazireshModal()
          this.clearPazireshForm()
          this.getAppointmentList()
        })
        .finally(() => {
          this.toggleOverlay()
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
        info: '',
      }
    },
    customLabel(item) {
      return item.fname
    },
    onChecked(item) {
      this.appointment.case_type = item.checked ? item.name : ''
    },
    getCases(item) {
      const profession_id = this.loginUser.organization.profession_id;
      if (profession_id === 1) {
        return item.photography_cases
      } else if (profession_id === 2) {
        return item.laboratory_cases
      } else if (profession_id === 3) {
        return item.radiology_cases
      } else {
        return '-'
      }
    },
    doAction() {
    },
    closeFilterModal() {
      this.clearForm()
      this.toggleFilterModal()
    },
    clearForm() {
      this.search = {
        page: 1,
        start: this.$moment().format("YYYY-MM-DD"),
        end: this.$moment().format("YYYY-MM-DD"),
        q: '',
      }
    },
    toggleFilterModal() {
      this.showFilterModal = !this.showFilterModal
    },
    closePazireshModal() {
      this.togglePazireshModal()
      this.getAppointmentList()
    },
    closeAppointmentModal() {
      this.toggleAppointmentModal()
      this.getAppointmentList()
    },
    togglePazireshModal() {
      this.showPazireshModal = !this.showPazireshModal
    },
    toggleAppointmentModal() {
      this.showAppointmentModal = !this.showAppointmentModal
    },
    openAddResultModal() {

    }
  },
  computed: {
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    appointments() {
      return this.$store.getters['appointments/getList']
    },
    today() {
      return moment().format("YYYY/MM/DD")
    },
    isDoctor() {
      const profession_id = this.loginUser.organization.profession_id;
      return profession_id !== 1 && profession_id !== 2 && profession_id !== 3
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
    hasItem() {
      return !!this.item
    }
  },
  watch: {
    user() {
      this.appointment.user_id = this.user.id
    }
  }
}
</script>

<style scoped>

</style>
