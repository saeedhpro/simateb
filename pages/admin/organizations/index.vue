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
            موسسات
          </span>
          </div>
          <v-divider inset/>
          <div class="page-actions"
               @click="toggleCreateModal"
          >
            <img src="/images/pages/new-user.svg" alt="organizations">
            <span class="title">موسسه جدید</span>
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
              sm="12"
              md="4"
            >
              <div class="right-box">
                <v-checkbox
                  v-model="selectedAll"
                ></v-checkbox>
                <div class="selected-count" v-if="selectedOrganizations.length > 0">
                  {{ selectedOrganizations.length | persianDigit }}
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
                  <span>{{ organizations.total_rows | persianDigit }}</span>
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
                  <div @click="getOrganizationsList" class="search-button">
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
                                @click="getOrganizationsList"
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
                :total="organizations.total_rows"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in organizations.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 | persianDigit }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <input type="checkbox"
                               class="table-selectable-checkbox"
                               v-model="selectedOrganizations"
                               :value="i.id"
                        />
                        <img :src="i.logo ? i.logo : 'https://randomuser.me/api/portraits/men/88.jpg'">
                        <span><nuxt-link :to="`/organizations/${i.id}`">{{
                            `${i.name}` | persianDigit
                          }}</nuxt-link></span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.phone | persianDigit }}</td>
                    <td class="text-center">{{ i.profession ? i.profession.name : '-' | persianDigit }}</td>
                    <td class="text-center">{{ `${i.sms_credit} (${i.sms_price})` | persianDigit }}</td>
                    <td class="text-center">
                      {{ i.created_at ? $moment(i.created_at).format('jYYYY/jM/jDD') : '-' | persianDigit }}
                    </td>
                    <td class="text-center">{{ i.staff ? `${i.staff.fname} ${i.staff.lname}` : '-' | persianDigit }}</td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="organizations.total_rows === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <create-organization-from-component
      :show="showCreateModal"
      @close="closeCreateModal"
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
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import CropImageComponent from "~/components/panel/global/CropImageComponent";
import CreateOrganizationFromComponent from "~/components/panel/orgnization/CreateOrganizationFromComponent";

export default {
  name: "index",
  components: {CreateOrganizationFromComponent, CropImageComponent, DataTableComponent},
  layout: 'admin',
  middleware: 'auth',
  data() {
    return {
      items: [
        {
          id: 1,
          label: 'حذف'
        },
        {
          id: 2,
          label: 'ارسال پیامک'
        }
      ],
      headers: [
        '',
        'نام',
        'شماره تماس',
        'تخصص',
        'اعتبار',
        'ثبت در سیستم',
        'توسط',
      ],
      action: null,
      search: {
        q: "",
        page: 1,
      },
      actions: [
        {
          id: 1,
          label: 'حذف کن'
        },
        {
          id: 2,
          label: 'ارسال پیامک'
        }
      ],
      selectedOrganizations: [],
      showCreateModal: false,
      showFilterModal: false,
      overlay: false,
      form: {
        file: null,
        fname: '',
        lname: '',
        email: '',
        user_group_id: 1,
        gender: '',
        tel: '',
        tel1: '',
        cardno: '',
        birth_date: '',
        file_id: '',
        province_id: 0,
        county_id: 0,
        city_id: 0,
        address: '',
        introducer: '',
        known_as: '',
        info: '',
        due_payment: '',
      },
      province: null,
      county: null,
      city: null,
    }
  },
  mounted() {
    this.paginate()
    this.getProvinces()
  },
  methods: {
    doAction() {
      if (!this.action) return
      switch (this.action) {
        case 1:
        case '1':
          this.deleteOrganizations(this.selectedOrganizations)
      }
    },
    closeCreateModal() {
      this.toggleCreateModal()
      setTimeout(() => {
        this.paginate(1)
      }, 100)
    },
    paginate(page = 1) {
      this.search.page = page
      this.getOrganizationsList()
    },
    getOrganizationsList() {
      this.toggleOverlay()
      this.showFilterModal = false
      this.$store.dispatch('admin/organizations/getList', this.search)
        .finally(() => {
          setTimeout(() => {
            this.toggleOverlay()
          }, 50)
        })
    },
    getProvinces() {
      this.$store.dispatch('provinces/getList')
    },
    getCounties(id) {
      this.$store.dispatch('provinces/getCounties', id)
    },
    getCities(id) {
      this.$store.dispatch('provinces/getCities', id)
    },
    toggleCreateModal() {
      this.showCreateModal = !this.showCreateModal
    },
    toggleFilterModal() {
      this.showFilterModal = !this.showFilterModal
    },
    updated(o) {
      this.form.file = o
      this.show = !this.show
    },
    chooseImage(e) {
      this.$refs.crop.setImage(e)
    },
    openChooseImage() {
      this.$refs.image.value = null
      this.$refs.image.click()
    },
    toggleOverlay() {
      this.overlay = !this.overlay
    },
    closeFilterModal() {
      this.clearFilterForm()
      this.toggleFilterModal()
    },
    closeForm() {
      this.clearForm()
      this.toggleCreateModal()
    },
    clearFilterForm() {
      this.search = {
        page: this.search.page,
        start: '',
        end: '',
        q: '',
      }
    },
    clearForm() {
      this.form = {
        file: null,
        fname: '',
        lname: '',
        email: '',
        user_group_id: 1,
        gender: '',
        tel: '',
        tel1: '',
        cardno: '',
        birth_date: '',
        file_id: '',
        province_id: 0,
        county_id: 0,
        city_id: 0,
        address: '',
        introducer: '',
        known_as: '',
        info: '',
        due_payment: '',
      }
    },
    createOrganization() {
      this.toggleOverlay()
      this.$store.dispatch('admin/organizations/createOrganization', this.form)
        .then(() => {
          setTimeout(() => {
            this.toggleCreateModal()
            this.closeForm()
            this.getOrganizationsList()
          }, 50)
        })
        .finally(() => {
          setTimeout(() => {
            this.toggleOverlay()
          }, 50)
        })
    },
    deleteOrganizations(ids) {
      this.toggleOverlay()
      this.$store.dispatch('admin/organizations/deleteOrganizations', {
        ids
      })
        .then(() => {
          setTimeout(() => {
            this.getOrganizationsList()
            this.action = null
            this.selectedOrganizations = []
          }, 50)
        })
        .finally(() => {
          setTimeout(() => {
            this.toggleOverlay()
          }, 50)
        })
    }
  },
  computed: {
    organizations() {
      return this.$store.getters['admin/organizations/getList']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    selectedAll: {
      get() {
        return this.selectedOrganizations.length > 0 && this.selectedOrganizations.length === this.organizations.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedOrganizations = []
          this.selectedOrganizations = this.organizations.data.map(i => i.id)
        } else {
          this.selectedOrganizations = []
        }
      }
    },
    provinces() {
      return this.$store.getters['provinces/getList']
    },
    counties() {
      return this.$store.getters['provinces/getCounties']
    },
    cities() {
      return this.$store.getters['provinces/getCities']
    }
  },
  watch: {
    province(item) {
      if (item) {
        this.form.province_id = item.id
        this.getCounties(item.id)
      } else {
        this.form.province_id = 0
        this.$store.commit('provinces/setCounties', [])
      }
    },
    county(item) {
      if (item) {
        this.form.county_id = item.id
        this.getCities(item.id)
      } else {
        this.form.county_id = 0
        this.$store.commit('provinces/setCities', [])
      }
    },
    city(item) {
      if (item) {
        this.form.city_id = item.id
      } else {
        this.form.city_id = 0
      }
    },
  }
}
</script>

<style scoped>

</style>
