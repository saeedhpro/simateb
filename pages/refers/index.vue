<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box organization">
          <div class="page-header">
            <img src="/images/pages/users.svg" alt="users">
            <span class="title">
            ارجاعیات
            </span>
          </div>
          <v-divider inset v-if="!mini"/>
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
            <v-spacer/>
            <v-col
              cols="12"
              sm="6"
              md="6"
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
                  <input class="search-input" v-model="search.q" type="text" ref="search-input" placeholder="جستجو"
                         @input="onSearch">
                  <div @click="getAppointmentsList" class="search-button">
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
                              sm="6"
                              md="4"
                            >
                              <div class="create-update-model-input-box flex flex-row justify-start align-center">
                                <label class="mb-0 ml-2">تخصص</label>
                                <multiselect
                                  v-model="search.professions"
                                  :options="professions"
                                  :close-on-select="true"
                                  :show-labels="false"
                                >
                                  <template slot="singleLabel" slot-scope="props"><span
                                    class="option__desc"><span
                                    class="option__title">{{ `${props.option.name}` }}</span></span>
                                  </template>
                                  <template slot="option" slot-scope="props">
                                    <div class="option__desc"><span
                                      class="option__title">{{ `${props.option.name}` }}</span></div>
                                  </template>
                                </multiselect>
                              </div>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <div class="create-update-model-input-box flex flex-row justify-start align-center">
                                <label class="mb-0 ml-2">مطب</label>
                                <multiselect
                                  v-model="search.organization_id"
                                  :options="organizations"
                                  :close-on-select="true"
                                  :show-labels="false"
                                >
                                  <template slot="singleLabel" slot-scope="props"><span
                                    class="option__desc"><span
                                    class="option__title">{{ `${props.option.name}` }}</span></span>
                                  </template>
                                  <template slot="option" slot-scope="props">
                                    <div class="option__desc"><span
                                      class="option__title">{{ `${props.option.name}` }}</span></div>
                                  </template>
                                </multiselect>
                              </div>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <div class="create-update-model-input-box flex flex-row justify-start align-center">
                                <label class="mb-0 ml-2">وضعیت</label>
                                <multiselect
                                  v-model="search.status"
                                  :options="statusList"
                                  :close-on-select="true"
                                  :show-labels="false"
                                >
                                  <template slot="singleLabel" slot-scope="props"><span
                                    class="option__desc"><span
                                    class="option__title">{{ `${props.option.name}` }}</span></span>
                                  </template>
                                  <template slot="option" slot-scope="props">
                                    <div class="option__desc"><span
                                      class="option__title">{{ `${props.option.name}` }}</span></div>
                                  </template>
                                </multiselect>
                              </div>
                            </v-col>
                          </v-row>
                          <v-row>
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
                                @click="clearFilterForm"
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
                                @click="getAppointmentsList"
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
              class=""
              v-if="loading"
            >
              <LoadingCard />
            </v-col>
            <v-col
              v-else
              cols="12"
            >
              <data-table-component
                :headers="doctorHeaders"
                :page="search.page"
                :total="appointments.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in appointments.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <img :src="getLogo(i)">
                        <span><nuxt-link :to="`/profile/${i.id}`">{{
                            `${i.user ? i.user.full_name : '-'}`
                          }}</nuxt-link></span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.user && i.user.tel ? i.user.tel : '-' }}</td>
                    <td class="text-center"><span
                      class="text-center file-id">
                      <nuxt-link :to="`/profile/${i.id}`" class="file-id cursor-pointer">{{
                          i.user && i.user.file_id ? i.user.file_id : '-'
                      }}</nuxt-link>
                    </span>
                    </td>
                    <td class="text-center">{{ getOrganizations(i) }}</td>
                    <td class="text-center" v-if="i.start_at_ago_fa">
                      {{ i.start_at_ago_fa }}
                    </td>
                    <td class="text-center" v-else>-</td>
                    <td class="text-center" v-if="i.start_at_ago_fa">
                      {{ i.start_at_ago_fa }}
                    </td>
                    <td class="text-center" v-else>-</td>
                    <td class="text-center">
                      <div
                        v-if="resulted(i)"
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
                  <div v-if="appointments.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { debounce } from "lodash";
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import CropImageComponent from "~/components/panel/global/CropImageComponent";
import LoadingCard from "~/components/global/LoadingCard.vue";
import organizations from "~/pages/admin/organizations/index.vue";

export default {
  name: "index",
  components: {
    LoadingCard,
    CropImageComponent, DataTableComponent
  },
  layout: 'panel',
  middleware: 'auth',
  data() {
    return {
      doctorHeaders: [
        '',
        'بیمار',
        'موبایل',
        'پرونده',
        'مطب',
        'تاریخ پذیرش',
        'تاریخ ارجاع',
        'وضعیت',
      ],
      search: {
        page: 1,
        start: '',
        end: '',
        professions: {
          id: null,
          name: 'همه'
        },
        organization_id: {
          id: null,
          name: 'همه'
        },
        status: {
          id: null,
          name: 'همه'
        },
      },
      showFilterModal: false,
      loading: false,
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
      statusList: [
        {
          id: null,
          name: 'همه',
        },
        {
          id: 'waiting',
          name: 'در انتظار مراجعه',
        },
        {
          id: 'accepted',
          name: 'پذیرش شده',
        },
        {
          id: 'resulted',
          name: 'نتایج ارسال شده',
        },
      ],
    }
  },
  mounted() {
    this.paginate()
    this.getOrganizationsByProfession()
  },
  methods: {
    paginate(page = 1) {
      this.search.page = page
      this.getAppointmentsList()
    },
    onSearch: debounce(function ($e) {
      this.search.page = 1
      this.getAppointmentsList()
    }, 500),
    getAppointmentsList() {
      this.showFilterModal = false
      const data = {
        ...this.search,
        professions: this.search.professions ? this.search.professions.id : null,
        organization_id: this.search.organization_id ? this.search.organization_id.id : null,
        status: this.search.status ? this.search.status.id : null,
      }
      this.$store.dispatch('appointments/getReferedAppointments', data)
    },
    toggleFilterModal() {
      this.showFilterModal = !this.showFilterModal
    },
    closeFilterModal() {
      this.clearFilterForm()
      this.toggleFilterModal()
    },
    clearFilterForm() {
      this.search = {
        page: this.search.page,
        start: '',
        end: '',
        professions: {
          id: null,
          name: 'همه'
        },
        organization_id: {
          id: null,
          name: 'همه'
        },
        status: {
          id: null,
          name: 'همه'
        },
      }
    },
    getLogo(user) {
      if (user.logo) {
        return user.logo
      } else {
        if (user.gender == 'female') {
          return '/images/profile/woman.svg'
        } else {
          return '/images/profile/man.svg'
        }
      }
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
      } else if (this.isReDoctor(appointment.doctor_id)) {
        return !appointment.d_admission_at
      }
      return appointment.waiting
    },
    isReDoctor(id) {
      return false
    },
    getOrganizations(app) {
      let names = [];
      if (app.photography) {
        names.push(app.photography.name)
      }
      if (app.radiology) {
        names.push(app.radiology.name)
      }
      if (app.doctor) {
        names.push(app.doctor.name)
      }
      return names.join(' - ')
    },
    getOrganizationsByProfession() {
      let professions = this.search.professions
      let id = professions ? professions.id : null
      if (id && id > 3) {
        id = 'doctor'
      }
      this.$store.dispatch('organizations/getReferedDoctorList', id)
    }
  },
  computed: {
    organizations() {
      return [
        {
          id: null,
          name: 'همه'
        },
        ...this.$store.getters['organizations/getReferedDoctorList']
      ]
    },
    appointments() {
      return this.$store.getters['appointments/getReferedAppointments']
    },
    professions() {
      return [
        {
          id: null,
          name: 'همه'
        },
        {
          id: 'doctor',
          name: 'دکتر'
        },
        {
          id: 1,
          name: 'فوتوگرافی'
        },
        {
          id: 3,
          name: 'رادیولوژی'
        },
        {
          id: 2,
          name: 'آزمایشگاه'
        },
      ]
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
  },
  watch: {
    'search.professions'(val) {
      this.getOrganizationsByProfession()
    }
  }
}
</script>

<style scoped>

</style>
