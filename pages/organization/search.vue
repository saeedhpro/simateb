<template>
  <v-container
    fluid
  >
    <paziresh-link-box
      @closePazireshModal="closePazireshModal"
    />
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
              md="3"
            >
              <div class="right-box">
                <v-checkbox
                  v-model="selectedAll"
                ></v-checkbox>
                <div class="selected-count" v-if="selectedItems.length > 0">
                  {{ selectedItems.length | persianDigit }}
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
            <v-spacer v-if="!mini"/>
            <v-col
              cols="12"
              sm="12"
              md="5"
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
                  <input class="search-input" v-model="search.q" type="text" ref="search-input"
                         placeholder="جستجو / کد پذیرش" @input="getAppointmentList">
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
                                <label>عبارت جستجو / کد پذیرش</label>
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
                                <custom-date-input
                                  :type="'date'"
                                  v-model="search.start"
                                  :initial-value="search.start"
                                />
<!--                                <date-picker-->
<!--                                  v-model="search.start"-->
<!--                                  format="YYYY-MM-DD"-->
<!--                                  display-format="jYYYY/jMM/jDD"-->
<!--                                  editable-->
<!--                                  class="date-picker"-->
<!--                                  type="date"-->
<!--                                >-->
<!--                                  <template v-slot:label>-->
<!--                                    <img src="/images/form/datepicker.svg">-->
<!--                                  </template>-->
<!--                                </date-picker>-->
                              </div>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="4"
                              md="4"
                            >
                              <div class="create-update-model-input-box">
                                <label>تاریخ انتها</label>
                                <custom-date-input
                                  :type="'date'"
                                  v-model="search.end"
                                  :initial-value="search.end"
                                />
<!--                                <date-picker-->
<!--                                  v-model="search.end"-->
<!--                                  format="YYYY-MM-DD"-->
<!--                                  display-format="jYYYY/jMM/jDD"-->
<!--                                  editable-->
<!--                                  class="date-picker"-->
<!--                                  type="date"-->
<!--                                >-->
<!--                                  <template v-slot:label>-->
<!--                                    <img src="/images/form/datepicker.svg">-->
<!--                                  </template>-->
<!--                                </date-picker>-->
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
                :total="appointments.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in appointments.data" :key="n" :class="{'waiting': waiting(i)}">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 | persianDigit }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <input type="checkbox"
                               class="table-selectable-checkbox"
                               v-model="selectedItems"
                               :value="i"
                        />
                        <img
                          :src="getLogo(i)">
                        <span>
                          <a class="select-item-search" @click="openItem(i)">{{
                              i.user ? `${i.user.fname} ${i.user.lname}` : '-' | persianDigit
                            }}</a>
                        </span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.user && i.user.tel ? i.user.tel : '-' | persianDigit }}</td>
                    <td class="text-center">
                      <nuxt-link :to="i.user ? `/profile/${i.user.id}` : '#'" class="file-id cursor-pointer">{{
                          i.user && i.user.file_id ? i.user.file_id : '-' | persianDigit
                        }}</nuxt-link>
                    </td>
                    <td class="text-center">{{ i.case_type ? i.case_type : '-' | persianDigit }}</td>
                    <td class="text-center">
                      {{ i.start_at_time_fa | persianDigit }}
                    </td>
                    <td class="text-center">
                      <v-tooltip
                        v-if="i.radiology"
                        bottom
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <div
                            v-bind="attrs"
                            v-on="on"
                            :class="getErjaClass(i, 3)"
                            @click="openAppointmentModalItem(i, 3)"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14.286" viewBox="0 0 20 14.286">
                              <path class="a"
                                    d="M52,97.429a1.423,1.423,0,0,1-.419,1.01L40.153,109.867a1.428,1.428,0,0,1-2.02,0l-5.714-5.714a1.428,1.428,0,1,1,2.02-2.02l4.7,4.706,10.42-10.42A1.427,1.427,0,0,1,52,97.429Z"
                                    transform="translate(-32 -96)"/>
                            </svg>
                          </div>
                        </template>
                        <span>
                            {{ getErjaType(i, 3) }}
                          </span>
                      </v-tooltip>
                    </td>
                    <td class="text-center">
                      <v-tooltip
                        v-if="i.photography"
                        bottom
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <div
                            v-bind="attrs"
                            v-on="on"
                            :class="getErjaClass(i, 1)"
                            @click="openAppointmentModalItem(i, 1)"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14.286" viewBox="0 0 20 14.286">
                              <path class="a"
                                    d="M52,97.429a1.423,1.423,0,0,1-.419,1.01L40.153,109.867a1.428,1.428,0,0,1-2.02,0l-5.714-5.714a1.428,1.428,0,1,1,2.02-2.02l4.7,4.706,10.42-10.42A1.427,1.427,0,0,1,52,97.429Z"
                                    transform="translate(-32 -96)"/>
                            </svg>
                          </div>
                        </template>
                        <span>
                          {{ getErjaType(i, 1) }}
                        </span>
                      </v-tooltip>
                    </td>
                    <td class="text-center">
                      <span
                        v-if="resulted(i)"
                        class="status-box resulted"
                      >نتایج ارسال شده</span>
                      <span
                        v-else-if="waiting(i)"
                        class="status-box waiting"
                      >در انتظار مراجعه</span>
                      <span
                        v-else
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
                  <div v-if="appointments.meta.total == 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
              <data-table-component
                v-else
                :headers="headers"
                :page="search.page"
                :total="appointments.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in appointments.data" :key="n" :class="{'waiting': waiting(i)}">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 | persianDigit }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <input type="checkbox"
                               class="table-selectable-checkbox"
                               v-model="selectedItems"
                               :value="i"
                               :ripple="false"
                        />
                        <img
                          :src="getLogo(i)">
                        <span>
                          <a v-if="!isDoctor" @click="openItem(i)">{{
                              i.user ? `${i.user.fname} ${i.user.lname}` : '-' | persianDigit
                            }}</a>
                          <nuxt-link v-if="isDoctor && i.user" :to="`/profile/${i.user.id}`">{{
                              i.user ? `${i.user.fname} ${i.user.lname}` : '-' | persianDigit
                            }}</nuxt-link>
                          <span v-else></span>
                        </span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.user && i.user.tel ? i.user.tel : '-' | persianDigit }}</td>
                    <td class="text-center"><span class="file-id">{{ i.code ? i.code : '-' | persianDigit }}</span></td>
                    <td class="text-center">
                      {{ $moment.utc(i.start_at).local().format("YYYY/MM/DD HH:mm:ss") | toRelativeDate }}
                      {{
                        $moment.utc(i.start_at).local().format("YYYY/MM/DD HH:mm:ss") | toPersianDate('dddd DD MMMM')
                      }}
                    </td>
                    <td class="text-center">{{ getCases(i) | persianDigit }}</td>
                    <td class="text-center">{{ i.organization ? i.organization.name : '-' | persianDigit }}</td>
                    <td class="text-center">
                      <span
                        v-if="resulted(i)"
                        class="status-box resulted"
                      >نتایج ارسال شده</span>
                      <span
                        v-else-if="waiting(i)"
                        class="status-box waiting"
                      >در انتظار مراجعه</span>
                      <span
                        v-else
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
                  <div v-if="appointments.meta.total == 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <appointment-form-component
      :open="showPazireshModal"
      :item="item"
      @close="closePazireshModal"
      @done="doneAppointmentModal"
      @remove="getAppointmentList"
    />
    <admin-delete-users-component
      :open="showDelete"
      :title="`پذیرش ها`"
      @close="toggleRemove"
      @remove="remove"
    />
    <send-sms-component
      :users="users"
      :multiple="true"
      :selectedItems="selectedUsers"
      :open="showSmsModal"
      @selected="itemSelected"
      @close="closeSmsForm"
    />
  </v-container>
</template>

<script>
import moment from "jalali-moment";
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import CaseTypeCheckboxComponent from "~/components/panel/appointment/CaseTypeCheckboxComponent";
import AppointmentFormComponent from "~/components/panel/appointment/AppointmentForm/AppointmentFormComponent";
import CreateAppointmentFormComponent
  from "~/components/panel/appointment/AppointmentForm/CreateAppointmentFormComponent";
import PazireshLinkBox from "~/components/panel/orgnization/paziresh/PazireshLinkBox";
import AdminDeleteUsersComponent from "~/components/admin/global/AdminDeleteUsersComponent";
import SendSmsComponent from "~/components/global/sms/SendSmsComponent";

export default {
  name: "search",
  components: {
    AdminDeleteUsersComponent,
    PazireshLinkBox,
    SendSmsComponent,
    CreateAppointmentFormComponent, AppointmentFormComponent, CaseTypeCheckboxComponent, DataTableComponent
  },
  layout: 'panel',
  data() {
    return {
      showPazireshModal: false,
      showFilterModal: false,
      showSmsModal: false,
      showDelete: false,
      hasItem: false,
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
        start: '',
        end: '',
        q: '',
        status: '2',
        page: 1,
      },
      user: null,
      doctorHeaders: [
        '',
        'بیمار',
        'موبایل',
        'پرونده',
        'علت مراجعه',
        'ساعت',
        'ارجاع به رادیولوژی',
        'ارجاع به فتوگرافی',
        'وضعیت',
      ],
      headers: [
        '',
        'بیمار',
        'موبایل',
        'کد پذیرش',
        'تاریخ ویزیت',
        'درخواست پزشک',
        'پزشک',
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
    }
  },
  mounted() {
    this.getAppointmentList()
    this.getUsers()
    this.getCaseTypes()
  },
  methods: {
    getAppointmentList(filtered = false) {
      this.showFilterModal = false
      const data = {
        ...this.search,
      }
      // if (!filtered) {
      //   delete data.start
      //   delete data.end
      // }
      this.$store.dispatch('appointments/search', data)
    },
    clearForm() {
      this.search = {
        page: this.search.page,
        start: '',
        end: '',
        q: '',
        status: '2',
      }
    },
    closePazireshModal() {
      this.showPazireshModal = false
      this.item = null
    },
    doneAppointmentModal() {
      this.toggleAppointmentModal()
      if (this.item) {
        this.getAppointmentList()
      }
      this.item = null
    },
    toggleAppointmentModal() {
      this.showPazireshModal = !this.showPazireshModal
    },
    toggleFilterModal() {
      this.showFilterModal = !this.showFilterModal
    },
    togglePazireshModal() {
      this.showPazireshModal = !this.showPazireshModal
    },
    closeFilterModal() {
      this.clearForm()
      this.toggleFilterModal()
    },
    paginate(page = 1) {
      this.search.page = page
      this.getAppointmentList()
    },
    openItem(item) {
      this.item = item
      this.togglePazireshModal()
    },
    getUsers() {
      this.$store.dispatch('users/getUsers')
    },
    getCaseTypes() {
      this.$store.dispatch('cases/getCaseTypes', {})
    },
    doAction() {
      if (!this.action) return
      switch (this.action) {
        case 1:
        case '1':
          this.toggleRemove();
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
    closeSmsForm() {
      this.selectedItems = []
      this.toggleSmsModal()
      this.action = null
    },
    itemSelected(e) {
      this.selectedItems = e
    },
    toggleRemove() {
      this.showDelete = !this.showDelete
    },
    remove() {
      this.deleteAppointments(this.selectedItems.map(i => i.id))
      this.toggleRemove()
    },
    deleteAppointments(ids) {
      this.$store.dispatch('appointments/deleteAppointments', {
        ids
      })
        .then(() => {
          setTimeout(() => {
            this.getAppointmentList()
            this.action = null
            this.selectedItems = []
          }, 50)
        })
    },
    customLabel(item) {
      return item.fname
    },
    onChecked(item) {
      this.appointment.case_type = item.checked ? item.name : ''
    },
    toggleShowPazireshModal() {
      this.openShowPazireshModal = !this.openShowPazireshModal
    },
    getCases(item) {
      const profession_id = this.loginUser.organization.profession_id;
      if (profession_id == 1) {
        return item.photography_cases
      } else if (profession_id == 2) {
        return item.laboratory_cases
      } else if (profession_id == 3) {
        return item.radiology_cases
      } else {
        return '-'
      }
    },
    resulted(appointment, type) {
      const profession_id = this.loginUser.organization.profession_id;
      if (profession_id == 1) {
        return appointment.p_admission_at != "" && appointment.p_result_at != "" && appointment.p_admission_at != null && appointment.p_result_at != null
      } else if (profession_id == 2) {
        return appointment.l_admission_at != "" && appointment.l_result_at != "" && appointment.l_admission_at != null && appointment.l_result_at != null
      } else if (profession_id == 3) {
        return appointment.r_admission_at != "" && appointment.r_result_at != "" && appointment.r_admission_at != null && appointment.r_result_at != null
      } else {
        switch (type) {
          case 1:
            return appointment.p_admission_at != "" && appointment.p_result_at != "" && appointment.p_admission_at != null && appointment.p_result_at != null
          case 2:
            return appointment.l_admission_at != "" && appointment.l_result_at != "" && appointment.l_admission_at != null && appointment.l_result_at != null
          case 3:
            return appointment.r_admission_at != "" && appointment.r_result_at != "" && appointment.r_admission_at != null && appointment.r_result_at != null
          default:
            return false;
        }
      }
    },
    admissioned(appointment) {
      const profession_id = this.loginUser.organization.profession_id;
      if (profession_id == 1) {
        return appointment.p_admission_at != "" && appointment.p_admission_at != null
      } else if (profession_id == 2) {
        return appointment.l_admission_at != "" && appointment.l_admission_at != null
      } else if (profession_id == 3) {
        return appointment.r_admission_at != "" && appointment.r_admission_at != null
      }
      return false;
    },
    waiting(appointment) {
      return appointment.waiting
    },
    getErjaClass(appointment, type) {
      if (this.resulted(appointment, type)) {
        return 'has-erja green-color'
      } else if (this.admissioned(appointment, type)) {
        return 'has-erja'
      } else {
        return 'has-erja black-color'
      }
    },
    getLogo(app) {
      if (app.user && app.user.logo) {
        return app.user.logo
      } else {
        if (app.user) {
          if (app.user.gender == 'female') {
            return '/images/profile/woman.svg'
          } else {
            return '/images/profile/man.svg'
          }
        } else {
          return '/images/profile/man.svg'
        }
      }
    },
    openAppointmentModalItem(item, type) {
      if (this.resulted(item, type)) {
        this.item = item
        this.toggleAppointmentModal()
      }
    },
    getErjaType(appointment, type) {
      if (this.resulted(appointment, type)) {
        return 'نتایج ارسال شده'
      } else if (this.admissioned(appointment, type)) {
        return 'پذیرش شده'
      } else {
        return 'پذیرش نشده'
      }
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
    selectedAll: {
      get() {
        return this.selectedItems.length > 0 && this.selectedItems.length == this.appointments.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedItems = []
          this.selectedItems = this.appointments.data
        } else {
          this.selectedItems = []
        }
      }
    },
    selectedUsers() {
      return this.selectedItems.map(i => i.user)
    },
    appointments() {
      return this.$store.getters['appointments/getList']
    },
    today() {
      return moment().format("YYYY/MM/DD")
    },
    isDoctor() {
      if (!this.loginUser) return false;
      return this.loginUser.organization.is_doctor;
    },
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    }
  }
}
</script>

<style scoped>

</style>
