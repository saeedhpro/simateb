<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box appointment-search">
          <nuxt-link to="/appointment" class="page-header">
            <img src="/images/pages/users.svg" alt="users">
            <span class="title">جدول نوبت دهی</span>
          </nuxt-link>
          <nuxt-link to="/appointment/search" class="page-header">
            <img src="/images/pages/search-icon.svg" alt="users">
            <span class="title">جستجو نوبت ها</span>
          </nuxt-link>
          <nuxt-link to="/appointment/surgeries" class="page-header" v-show="canSeeSurgeries">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <defs>
                <style>.a.index,.b.index{fill:#388E3C;}.a.index{opacity:.12;}.b.index{opacity:1;}</style>
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

          <v-divider class="d-none d-lg-flex" inset/>
          <v-spacer class="d-flex d-lg-none" v-if="!canSeeSurgeries"/>
          <div class="page-actions-secondary"
          >
            <span class="title-main">
              {{ today | toPersianDate('dddd DD MMMM') }}
            </span>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          class="card-box"
        >
          <v-row class="search-box">
            <v-col
              cols="12"
              sm="6"
              md="5"
              lg="4"
            >
              <div class="right-box">
                <v-checkbox
                  v-model="selectedAll"
                ></v-checkbox>
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
              sm="6"
              md="6"
            >
              <div class="page-main-actions-left">
                <div class="result-count">
                  <span>{{ appointments.meta.total ? appointments.meta.total : 0  }}</span>
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
                  <input class="search-input" v-model="search.q" type="text" ref="search-input" placeholder="جستجو" @input="onSearch">
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
<!--                                <custom-date-input-->
<!--                                  :type="'date'"-->
<!--                                  v-model="search.start"-->
<!--                                  :initial-value="search.start"-->
<!--                                />-->
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
                              sm="4"
                              md="4"
                            >
                              <div class="create-update-model-input-box">
                                <label>تاریخ انتها</label>
<!--                                <custom-date-input-->
<!--                                  :type="'date'"-->
<!--                                  v-model="search.end"-->
<!--                                  :initial-value="search.end"-->
<!--                                />-->
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
                                @click="doSearch"
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
                :headers="headers"
                :page="search.page"
                :total="appointments.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in appointments.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <input type="checkbox"
                               class="table-selectable-checkbox"
                               v-model="selectedItems"
                               :value="i"
                        />
                        <img
                          alt=""
                          :src="getLogo(i)">
                        <span>
                          <span class="cursor-pointer" v-if="i.user" @click="openItem(i)">{{
                              `${i.user.fname} ${i.user.lname}`
                            }}</span>
                          <span v-else></span>
                        </span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.user && i.user.tel ? i.user.tel : '-' }}</td>
                    <td class="text-center">{{ i.user && i.user.file_id ? i.user.file_id : '-' }}</td>
                    <td class="text-center">{{ $moment.utc(i.start_at).local().format('jYYYY/jM/jDD') }}</td>
                    <td class="text-center">
                      {{ i.start_at_time_fa }}
                    </td>
                    <td class="text-center">
                      <div
                        v-if="resulted(i)"
                        class="status-box resulted"
                      >نتایج ارسال شده</div>
                      <div
                        v-else-if="waiting(i)"
                        class="status-box waiting"
                      >در انتظار مراجعه</div>
                      <div
                        v-else
                        class="status-box"
                        :style="{
                          'background-color': `${statuses[i.status - 1].background}`,
                          'color': `${statuses[i.status - 1].color}`
                        }"
                      >{{ statuses[i.status - 1].title }}</div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="appointments.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <send-sms-component :users="allUsers" :multiple="true" :selectedItems="selectedUsers" :open="showSmsModal"
                        @selected="itemSelected" @close="closeSmsForm" />
    <create-appointment-form-component
      :is-surgery="false"
      :open="showPazireshModal"
      @close="closePazireshModal"
    />
    <appointment-page-item-form
      :id="item.id"
      :is-surgery="false"
      v-if="showAppointmentModal"
      :open="showAppointmentModal"
      @close="closeItem"
      @done="doneAppointmentModal"
    />
  </v-container>
</template>

<script>
import { debounce } from "lodash";
import moment from 'jalali-moment'

import DataTableComponent from "~/components/panel/global/DataTableComponent";
import CaseTypeCheckboxComponent from "~/components/panel/appointment/CaseTypeCheckboxComponent";
import CreateAppointmentFormComponent
  from "~/components/panel/appointment/AppointmentForm/CreateAppointmentFormComponent";
import SendSmsComponent from "~/components/global/sms/SendSmsComponent.vue";

export default {
  name: "appointment-search",
  components: {SendSmsComponent, CreateAppointmentFormComponent, CaseTypeCheckboxComponent, DataTableComponent},
  layout: 'panel',
  middleware: 'auth',
  data() {
    return {
      selectedUsers: [],
      showSmsModal: false,
      showFilterModal: false,
      showPazireshModal: false,
      selectedItems: [],
      item: null,
      showAppointmentModal: false,
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
        start: '',
        end: '',
        q: '',
        page: 1,
      },
      user: null,
      appointment: {
        start_at: '',
        tel: '',
        cardno: '',
        income: 0,
        user_id: null,
        case_type: '',
        info: '',
      },
      headers: [
        '',
        'بیمار',
        'موبایل',
        'پرونده',
        'تاریخ',
        'ساعت',
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
        masked: false /* doesn't work with directive */
      }
    }
  },
  mounted() {
    this.getAppointmentList()
    this.getUsers()
    this.getCaseTypes()
    this.getAllUsers()
  },
  methods: {
    closeSmsForm() {
      this.selectedItems = []
      this.action = null
      this.toggleSmsModal()
    },
    itemSelected(e) {
      this.selectedUsers = e
    },
    clearForm() {
      this.search = {
        page: this.search.page,
        start: '',
        end: '',
        q: '',
      }
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
    toggleFilterModal() {
      this.showFilterModal = !this.showFilterModal
    },
    togglePazireshModal() {
      this.clearPazireshForm()
      this.showPazireshModal = !this.showPazireshModal
    },
    closeFilterModal() {
      this.clearForm()
      this.toggleFilterModal()
    },
    closePazireshModal() {
      this.togglePazireshModal()
      this.getAppointmentList()
    },
    paginate(page = 1) {
      this.search.page = page
      this.getAppointmentList()
    },
    doSearch() {
      this.getAppointmentList()
        .then(() => {
          this.showFilterModal = false
        })
    },
    onSearch: debounce(function ($e) {
      this.search.page = 1
      let value = $e.target.value;
      this.getAppointmentList()
    }, 500),
    getAppointmentList(load = true) {
      return this.$store.dispatch('appointments/search', this.search)
    },
    doneAppointmentModal() {
      this.clearForm()
      this.getAppointmentList()
    },
    createAppointment() {
      this.$store.dispatch('appointments/createAppointment', this.appointment)
        .then(() => {
          setTimeout(() => {
            this.togglePazireshModal()
            this.clearPazireshForm()
            this.getAppointmentList()
          }, 50)
        })
    },
    getUsers() {
      this.$store.dispatch('users/getUsers', {limit: 100, page: 1})
    },
    getAllUsers() {
      this.$store.dispatch('users/getOrganizationUsers', this.organization.id)
    },
    getCaseTypes() {
      this.$store.dispatch('cases/getCaseTypes', {})
    },
    doAction() {
      if (!this.action) return
      switch (this.action) {
        case 1:
        case '1':
          break;
        case 2:
        case '2':
          this.toggleSmsModal();
          break;
      }
    },
    toggleSmsModal() {
      this.showSmsModal = !this.showSmsModal
    },
    customLabel(item) {
      return item.fname
    },
    onChecked(item) {
      this.appointment.case_type = item.checked ? item.name : ''
    },
    getLogo(app) {
      if (app.user && app.user.logo) {
        return app.user.logo
      } else {
        if (app.user && app.user.gender == 'female') {
          return '/images/profile/woman.svg'
        } else {
          return '/images/profile/man.svg'
        }
      }
    },
    openItem(item) {
      this.item = item
      this.showAppointmentModal = true
    },
    closeItem() {
      this.showAppointmentModal = false
      setTimeout(() => {
        this.item = null
      }, 200)
    },
    isReDoctor(appointment) {
      if (!this.loginUser) return false;
      return this.loginUser.organization.id == appointment.doctor_id;
    },
    resulted(appointment, type) {
      if (!type) {
        type = this.loginUser.organization.profession_id
      }
      if (type == 1) {
        return appointment.p_admission_at != "" && appointment.p_result_at != "" && appointment.p_admission_at != null && appointment.p_result_at != null
      } else if (type == 2) {
        return appointment.l_admission_at != "" && appointment.l_result_at != "" && appointment.l_admission_at != null && appointment.l_result_at != null
      } else if (type == 3) {
        return appointment.r_admission_at != "" && appointment.r_result_at != "" && appointment.r_admission_at != null && appointment.r_result_at != null
      } else if(this.isReDoctor(appointment)) {
        return appointment.d_admission_at != "" && appointment.d_result_at != "" && appointment.d_admission_at != null && appointment.d_result_at != null
      } else {
        return (appointment.p_admission_at != "" && appointment.p_result_at != "" && appointment.p_admission_at != null && appointment.p_result_at != null) ||
          (appointment.l_admission_at != "" && appointment.l_result_at != "" && appointment.l_admission_at != null && appointment.l_result_at) ||
          (appointment.r_admission_at != "" && appointment.r_result_at != "" && appointment.r_admission_at != null && appointment.r_result_at != null) ||
          (appointment.d_admission_at != "" && appointment.d_result_at != "" && appointment.d_admission_at != null && appointment.d_result_at != null);
      }
    },
    admissioned(appointment, type) {
      if (type == 1) {
        return appointment.p_admission_at != "" && appointment.p_admission_at != null
      } else if (type == 2) {
        return appointment.l_admission_at != "" && appointment.l_admission_at != null
      } else if (type == 3) {
        return appointment.r_admission_at != "" && appointment.r_admission_at != null
      } else if (this.isReDoctor(appointment)) {
        return appointment.d_admission_at != "" && appointment.d_admission_at != null
      }
      return appointment.p_admission_at != "" && appointment.p_admission_at != null ||
        appointment.l_admission_at != "" && appointment.l_admission_at != null ||
        appointment.r_admission_at != "" && appointment.r_admission_at != null ||
        appointment.d_admission_at != "" && appointment.d_admission_at != null;
    },
    waiting(appointment) {
      const profession_id = this.loginUser.organization.profession_id;
      if (profession_id == 1) {
        return !appointment.p_admission_at
      } else if (profession_id == 2) {
        return !appointment.l_admission_at
      } else if (profession_id == 3) {
        return !appointment.r_admission_at
      } else if (this.isReDoctor(appointment)) {
        return !appointment.d_admission_at
      }
      return appointment.waiting
    },
  },
  computed: {
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    users() {
      return this.$store.getters['users/getUsers']
    },
    cases() {
      return this.$store.getters['cases/getCaseTypes']
    },
    allUsers() {
      return this.$store.getters['users/getUsers']
    },
    selectedAll: {
      get() {
        return this.selectedItems.length > 0 && this.selectedItems.length === this.appointments.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedItems = []
          this.selectedUsers = []
          this.selectedItems = this.appointments.data
          this.selectedUsers = this.appointments.data.map(i => i.user)
        } else {
          this.selectedItems = []
          this.selectedUsers = []
        }
      }
    },
    appointments() {
      return this.$store.getters['appointments/getList']
    },
    today() {
      return moment().format("YYYY/MM/DD")
    },
    canSeeSurgeries() {
      if (!this.loginUser) return true
      const profession_id = this.loginUser.organization.profession_id
      return !(profession_id == 5 || profession_id == 7)
    },
    organization(){
      return this.loginUser.organization
    }
  },
  watch: {
    selectedItems(val) {
      this.selectedUsers = val.map(i => i.user)
    },
    user(item) {
      if (item) {
        this.appointment.user_id = item.id
        this.appointment.tel = item.tel
        this.appointment.cardno = item.cardno
      } else {
        this.appointment.user_id = null
        this.appointment.tel = ''
        this.appointment.cardno = ''
      }
    },
    // 'search.q'(val) {
    //   if (val) {
    //     this.getAppointmentList(false)
    //   } else {
    //     this.getAppointmentList(false)
    //   }
    // }
  }
}
</script>

<style scoped>

</style>
