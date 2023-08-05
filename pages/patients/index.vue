<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box">
          <div class="page-header">
            <img src="/images/pages/users.svg" alt="users">
            <span class="title">
            بیماران
          </span>
          </div>
          <v-divider inset :style="{'margin-left': isDoctor ? '72px' : '0'}"/>
          <div class="page-actions"
               @click="toggleCreateModal"
               v-if="isDoctor"
          >
            <img src="/images/pages/new-user.svg" alt="users">
            <span class="title-main">بیمار جدید</span>
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
              md="3"
            >
              <div class="right-box">
                <v-checkbox
                  v-model="selectedAll"
                ></v-checkbox>
                <div class="selected-count" v-if="selectedUsers.length > 0">
                  {{ selectedUsers.length }}
                </div>
                <v-select
                  v-if="isDoctor"
                  outlined
                  :items="doctorActions"
                  label="اقدام جمعی"
                  item-value="id"
                  item-text="label"
                  v-model="action"
                ></v-select>
                <v-select
                  v-else
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
                  <span>{{ users.meta.total  }}</span>
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
                         @input="getUsersList">
                  <div @click="getUsersList" class="search-button">
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
                                @click="getUsersList"
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
                :total="users.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in users.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <input type="checkbox"
                               class="table-selectable-checkbox"
                               v-model="selectedUsers"
                               :value="i"
                        />
                        <img :src="getLogo(i)">
                        <span><nuxt-link :to="`/profile/${i.id}`">{{
                            `${i.fname} ${i.lname}` | persianDigit
                          }}</nuxt-link></span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.tel ? i.tel : '-' }}</td>
                    <td class="text-center"><span
                      class="text-center file-id">
                      <nuxt-link :to="`/profile/${i.id}`" class="file-id cursor-pointer">{{
                          i.file_id ? i.file_id : '-' | persianDigit
                      }}</nuxt-link>
                    </span>
                    </td>
                    <td class="text-center">{{ i.age ? i.age : '-' }}</td>
                    <td class="text-center" v-if="i.created">
                      {{ i.created_at_ago }}
                    </td>
                    <td class="text-center" v-else>-</td>
                    <td class="text-center" v-if="i.last_login">
                      {{ i.last_login_ago }}
                    </td>
                    <td class="text-center" v-else>-</td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="users.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
              <data-table-component
                v-else
                :headers="headers"
                :page="search.page"
                :total="users.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in users.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <input type="checkbox"
                               class="table-selectable-checkbox"
                               v-model="selectedUsers"
                               :value="i"
                               :ripple="false"
                        />
                        <img :src="getLogo(i)">
                        <span><nuxt-link :to="`/profile/${i.id}`">{{
                            `${i.fname} ${i.lname}` | persianDigit
                          }}</nuxt-link></span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.tel ? i.tel : '-' }}</td>
                    <td class="text-center"><span
                      class="text-center">{{ i.organization ? i.organization.name : '-' }}</span></td>
                    <td class="text-center">{{ i.age ? i.age : '-' }}</td>
                    <td class="text-center" v-if="i.created">
                      {{ i.created_at_ago }}
                    </td>
                    <td class="text-center" v-else>-</td>
                    <td class="text-center" v-if="i.last_login">
                      {{ i.last_login_ago }}
                    </td>
                    <td class="text-center" v-else>-</td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="users.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <create-user-form-component
      :open="showCreateModal"
      @close="closeForm"
      @done="doneForm"
    />
    <admin-delete-users-component
      :open="showDelete"
      @close="toggleShowDelete"
      @remove="removeUsers"
    />
    <send-sms-component
      :users="allUsers"
      :multiple="true"
      :selectedItems="selectedUsers"
      :open="showSendSmsModal"
      @selected="itemSelected"
      @close="closeSendSmsFrom"
    />
  </v-container>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import CropImageComponent from "~/components/panel/global/CropImageComponent";
import CreateUserFormComponent from "~/components/panel/profile/user/CreateUserFormComponent";
import AdminDeleteUsersComponent from "~/components/admin/global/AdminDeleteUsersComponent";
import SendSmsComponent from "~/components/global/sms/SendSmsComponent";

export default {
  name: "index",
  components: {
    SendSmsComponent,
    AdminDeleteUsersComponent, CreateUserFormComponent, CropImageComponent, DataTableComponent
  },
  layout: 'panel',
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
      doctorHeaders: [
        '',
        'بیمار',
        'موبایل',
        'پرونده',
        'سن',
        'ثبت در سیستم',
        'آخرین ورود',
      ],
      headers: [
        '',
        'بیمار',
        'موبایل',
        'پزشک',
        'سن',
        'ثبت در سیستم',
        'آخرین ورود',
      ],
      action: null,
      search: {
        q: "",
        page: 1,
        start: '',
        end: '',
      },
      doctorActions: [
        {
          id: 0,
          label: 'اقدام جمعی'
        },
        {
          id: 2,
          label: 'ارسال پیامک'
        }
      ],
      actions: [
        {
          id: 0,
          label: 'اقدام جمعی'
        },
        {
          id: 2,
          label: 'ارسال پیامک'
        }
      ],
      selectedUsers: [],
      showCreateModal: false,
      showFilterModal: false,
      showDelete: false,
      showSendSmsModal: false,
    }
  },
  mounted() {
    this.paginate()
    this.getAllUsers()
  },
  methods: {
    doAction() {
      if (!this.action) return
      switch (this.action) {
        case 1:
        case '1':
          this.toggleShowDelete()
          break
        case 2:
        case '2':
          this.toggleShowSendSmsModal()
          break
      }
    },
    paginate(page = 1) {
      this.search.page = page
      this.getUsersList()
    },
    getUsersList() {
      this.showFilterModal = false
      this.$store.dispatch('users/getPatients', this.search)
    },
    getAllUsers() {
      this.$store.dispatch('users/getUsers')
    },
    toggleCreateModal() {
      this.showCreateModal = !this.showCreateModal
    },
    toggleFilterModal() {
      this.showFilterModal = !this.showFilterModal
    },
    closeFilterModal() {
      this.clearFilterForm()
      this.toggleFilterModal()
    },
    closeForm() {
      this.toggleCreateModal()
    },
    doneForm() {
      this.toggleCreateModal()
      this.getUsersList()
    },
    itemSelected(e) {
      this.selectedUsers = e
    },
    clearFilterForm() {
      this.search = {
        page: this.search.page,
        start: '',
        end: '',
        q: '',
      }
    },
    deleteUsers(ids) {
      this.$store.dispatch('users/deleteUsers', {
        ids
      })
        .then(() => {
          setTimeout(() => {
            this.getUsersList()
            this.action = null
            this.selectedUsers = []
          }, 50)
        })
    },
    toggleShowDelete() {
      this.showDelete = !this.showDelete
    },
    removeUsers() {
      this.toggleShowDelete()
      this.deleteUsers(this.selectedUsers.map(i => i.id))
    },
    closeSendSmsFrom() {
      this.selectedUsers = []
      this.action = null
      this.toggleShowSendSmsModal()
    },
    toggleShowSendSmsModal() {
      this.showSendSmsModal = !this.showSendSmsModal
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
    }
  },
  computed: {
    users() {
      return this.$store.getters['users/getPatients']
    },
    allUsers() {
      return this.$store.getters['users/getUsers']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    selectedAll: {
      get() {
        return this.selectedUsers.length > 0 && this.selectedUsers.length === this.users.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedUsers = []
          this.selectedUsers = this.users.data
        } else {
          this.selectedUsers = []
        }
      }
    },
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    isDoctor() {
      if (!this.loginUser) return false;
      return this.loginUser.organization.is_doctor;
    },
  },
}
</script>

<style scoped>

</style>
