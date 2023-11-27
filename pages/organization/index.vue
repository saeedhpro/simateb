<template>
  <v-container
    fluid
  >
    <paziresh-link-box
      @closePazireshModal="closePazireshModal"
      @createdPazireshModal="createdPazireshModal"
    />
    <v-row>
      <v-col
        cols="12"
      >
        <v-card
          class="page-main-box"
        >
          <doctor-paziresh-header
            v-if="isDoctor"
            :total="appointments.meta.total"
          />
          <v-row
            v-else
            class="search-box"
          >
            <v-col
              cols="12"
              sm="12"
              md="5"
              lg="4"
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
            <v-spacer/>
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="5"
            >
              <div class="page-main-actions-left">
                <div class="result-count">
                  <span>{{ appointments.meta.total  }}</span>
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
                         placeholder="جستجو / کد پذیرش"
                         @input="onSearchTermChanged">
                  <div @click="onSearchTermChanged" class="search-button">
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
                              <custom-date-picker-js
                                label="تاریخ ابتدا"
                                v-model="search.start"
                                type="date"
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              sm="4"
                              md="4"
                            >
                              <custom-date-picker-js
                                label="تاریخ انتها"
                                v-model="search.end"
                                type="date"
                              />
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
                                @click="clearFilterForm"
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
                                @click="getAppointmentList(true)"
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
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <img
                          :src="getLogo(i)">
                        <span>
                          <a class="select-item-search" @click="openAppointmentModal(i)">{{
                              i.user ? `${i.user.fname} ${i.user.lname}` : '-'
                            }}</a>
                        </span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.user && i.user.tel ? i.user.tel : '-' }}</td>
                    <td class="text-center">
                      <nuxt-link :to="i.user ? `/profile/${i.user.id}` : '#'" class="file-id cursor-pointer">{{
                          i.user && i.user.file_id ? i.user.file_id : '-'
                        }}</nuxt-link>
                    </td>
                    <td class="text-center">{{ i.case_type ? i.case_type : '-' }}</td>
                    <td class="text-center">
                      {{ i.start_at_time_fa }}
<!--                      {{ moment.from(i.start_at, "en", "YYYY/MM/DDTHH:mm:ssZ").locale("fa").format("HH:mm")  }}-->
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
                    <td>
                      <v-tooltip
                        v-if="i.doctor"
                        bottom
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <div
                            v-bind="attrs"
                            v-on="on"
                            :class="getErjaClass(i, 4)"
                            @click="openAppointmentModalItem(i, 4)"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14.286" viewBox="0 0 20 14.286">
                              <path class="a"
                                    d="M52,97.429a1.423,1.423,0,0,1-.419,1.01L40.153,109.867a1.428,1.428,0,0,1-2.02,0l-5.714-5.714a1.428,1.428,0,1,1,2.02-2.02l4.7,4.706,10.42-10.42A1.427,1.427,0,0,1,52,97.429Z"
                                    transform="translate(-32 -96)"/>
                            </svg>
                          </div>
                        </template>
                        <span>
                            {{ getErjaType(i, 4) }}
                          </span>
                      </v-tooltip>
                    </td>
                    <td class="text-center">
                      <div
                        v-if="resulted(i) && canSeeResulted(i)"
                        class="status-box resulted pointer"
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
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 }}</td>
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
                          <a @click="openAppointmentModal(i)">{{
                              i.user ? `${i.user.fname} ${i.user.lname}` : '-'
                            }}</a>
                        </span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.user && i.user.tel ? i.user.tel : '-' }}</td>
                    <td class="text-center"><nuxt-link :to="i.user ? `/profile/${i.user.id}` : '#'"  class="file-id">{{ i.code ? i.code : '-' }}</nuxt-link></td>
                    <td class="text-center">
                      {{ i.start_at_ago_fa }}
                    </td>
                    <td class="text-center">{{ getCases(i) }}</td>
                    <td class="text-center">{{ i.organization ? i.organization.name : '-' }}</td>
                    <td class="text-center">
                      <div
                        v-if="resulted(i) && canSeeResulted(i)"
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
                      >
                        {{ statuses[i.status - 1].title }}
                      </div>
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
<!--      <appointment-form-component-v2-->
<!--        :open="showAppointmentModal"-->
<!--        :item="item"-->
<!--        :is-surgery="false"-->
<!--        @close="closeAppointmentModal"-->
<!--        @done="doneAppointmentModal"-->
<!--        @remove="paginate"-->
<!--      />-->
      <appointment-page-item-form
        :id="appointmentID"
        :is-surgery="false"
        v-if="showAppointmentModal"
        :open="showAppointmentModal"
        @close="closeAppointmentModal"
        @remove="paginate"
        @done="doneAppointmentModal"
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
    </v-row>
    <Fancybox
      :options="options"
    >
      <a
        v-for="(i,n) in results"
        :key="n"
        data-fancybox="gallery"
        :href="i"
        class="fancybox-item"
        :data-fancybox-index="n"
        :id="`item${n}`"
      >
      </a>
    </Fancybox>
  </v-container>
</template>
<script>
import PazireshLinkBox from "~/components/panel/orgnization/paziresh/PazireshLinkBox";
import AppointmentFormComponentV2 from "~/components/panel/appointment/AppointmentForm/AppointmentFormComponentV2";
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import DoctorPazireshHeader from "~/components/panel/orgnization/paziresh/DoctorPazireshHeader";
import AdminDeleteUsersComponent from "~/components/admin/global/AdminDeleteUsersComponent";
import SendSmsComponent from "~/components/global/sms/SendSmsComponent";
import moment from "jalali-moment"
import CreateAppointmentFormComponent
  from "~/components/panel/appointment/AppointmentForm/CreateAppointmentFormComponent.vue";
import { debounce } from "lodash";

export default {
  name: "index",
  components: {
    CreateAppointmentFormComponent,
    SendSmsComponent,
    AdminDeleteUsersComponent,
    DoctorPazireshHeader,
    DataTableComponent,
    AppointmentFormComponentV2,
    PazireshLinkBox
  },
  layout: 'panel',
  middleware: 'auth',
  mounted() {
    this.paginate()
    this.getUsers()
    this.getCaseTypes()
  },
  data() {
    return {
      moment: moment,
      selectedItems: [],
      search: {
        start: this.$moment().format("YYYY-MM-DD"),
        end: this.$moment().format("YYYY-MM-DD"),
        q: '',
        status: '',
        page: 1,
        admissioned: 0,
      },
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
      item: null,
      showFilterModal: false,
      showAppointmentModal: false,
      showDelete: false,
      showSmsModal: false,
      appointmentID: 0,
      doctorHeaders: [
        '',
        'بیمار',
        'موبایل',
        'پرونده',
        'علت مراجعه',
        'ساعت',
        'ارجاع به رادیولوژی',
        'ارجاع به فتوگرافی',
        'ارجاع به متخصص',
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
      results: [],
      options: {
        showClass:"f-scaleIn",
        hideClass: "f-scaleOut",
        animated: true,
        thumbs: {
          autoStart : true,
          type: "classic",
          axis: 'y',
          parentEl: '.fancybox__container',
        },
      },
    }
  },
  methods: {
    paginate(page = 1) {
      this.search.page = page
      this.getAppointmentList()
    },
    onSearchTermChanged: debounce(function ($e) {
      this.getAppointmentList(false)
    }, 400),
    getAppointmentList(filtered = false) {
      // if (this.search.q && this.search.q.length != 6) {
      //  return
      // }
      this.search.q = this.$enDigit(this.search.q)
      // if (this.search.q != '' && !this.$isNumeric(this.search.q)) {
      //   return;
      // }
      if (!this.search.q) {
        this.search.admissioned = 0
      }
      if (!filtered) {
        if (this.isDoctor) {
          this.search.start = this.$moment().format("YYYY-MM-DD")
          this.search.end = this.$moment().format("YYYY-MM-DD")
        } else {
          this.search.start = ''
          this.search.end = ''
          if (this.search.q.length == 6) {
            this.search.admissioned = 1
          }
        }
      }
      if (this.isDoctor) {
        this.search.status = ''
      } else {
        this.search.status = '2'
        if (this.search.q.length == 6 && this.$isNumeric(this.search.q)) {
          this.search.admissioned = 1
        }
      }
      this.$store.dispatch('appointments/getOrganizationAppointmentsList', this.search)
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
    toggleFilterModal() {
      this.showFilterModal = !this.showFilterModal
    },
    closeFilterModal() {
      this.toggleFilterModal()
    },
    openAppointmentModal(item) {
      this.item = item
      this.appointmentID = item.id
      this.toggleAppointmentModal()
    },
    openAppointmentModalItem(item, type) {
      if (this.resulted(item, type)) {
        this.results = []
        let t = 'doctor'
        switch (type) {
          case 1:
            t = 'photography'
            break
          case 2:
            t = 'laboratory'
            break
          case 3:
            t = 'radiology'
            break
        }
        this.$store.dispatch('appointments/getAppointmentResults', {
          id: item.id,
          type: t
        })
        .then(res => {
          if (res.data.length == 0) {
            this.$toast.error('نتایج یافت نشد')
          } else {
            this.results = [
              ...res.data,
            ]
            setTimeout(() => {
              const item = document.getElementById('item0')
              item.click()
            }, 300)
          }
        })
        // this.item = item
        // this.toggleAppointmentModal()
      }
    },
    closeAppointmentModal() {
      this.toggleAppointmentModal()
      setTimeout(() => {
        this.item = null
        this.appointmentID = 0
      }, 100)
    },
    doneAppointmentModal() {
      if (this.item) {
        this.appointmentID = this.item.id
        this.search.q = ''
      }
      if (!this.isDoctor) {
        this.search.q = ''
      }
      this.getAppointmentList()
    },
    toggleAppointmentModal() {
      this.showAppointmentModal = !this.showAppointmentModal
    },
    clearFilterForm() {
      this.search = {
        ...this.search,
        start: '',
        end: '',
        q: '',
      }
    },
    getCases(item) {
      if (!this.loginUser) return '-'
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
    closePazireshModal() {
      // this.getAppointmentList()
    },
    createdPazireshModal() {
      this.getAppointmentList()
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
      } else if(this.isReDoctor(appointment.doctor_id)) {
        return appointment.d_admission_at != "" && appointment.d_result_at != "" && appointment.d_admission_at != null && appointment.d_result_at != null
      } else {
        if (appointment.doctor_id != null) {
          return appointment.d_admission_at != "" && appointment.d_result_at != "" && appointment.d_admission_at != null && appointment.d_result_at != null
        }
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
      } else if (this.isReDoctor(appointment.doctor_id)) {
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
    getErjaClass(appointment, type) {
      if (this.resulted(appointment, type)) {
        return 'has-erja green-color'
      } else if (this.admissioned(appointment, type)) {
        return 'has-erja'
      } else {
        return 'has-erja black-color'
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
    isReDoctor(doctor_id) {
      if (!this.loginUser) return false;
      return this.loginUser.organization.id == doctor_id;
    },
    canSeeResulted(i) {
      return this.loginUser.organization_id == i.photography_id ||
        this.loginUser.organization_id == i.radiology_id ||
        this.loginUser.organization_id == i.laboratory_id ||
        this.loginUser.organization_id == i.doctor_id
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    isDoctor() {
      if (!this.loginUser) return false;
      return this.loginUser.organization.is_doctor;
    },
    appointments() {
      return this.$store.getters['appointments/getList']
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
          return 'فتوگرافی';
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
      return 'فتوگرافی';
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
    users() {
      return this.$store.getters['users/getUsers']
    },
  },
}
</script>

<style scoped>

</style>
