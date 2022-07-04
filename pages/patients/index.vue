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
          <v-divider inset/>
          <div class="page-actions"
               @click="toggleCreateModal"
          >
            <img src="/images/pages/new-user.svg" alt="users">
            <span class="title">بیمار جدید</span>
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
                <div class="selected-count" v-if="selectedUsers.length > 0">
                  {{ selectedUsers.length | persianDigit }}
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
              md="5"
            >
              <div class="page-main-actions-left">
                <div class="result-count">
                  <span>{{ users.total_rows | persianDigit }}</span>
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
                :headers="headers"
                :page="search.page"
                :total="users.total_rows"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in users.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 | persianDigit }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <input type="checkbox"
                               class="table-selectable-checkbox"
                               v-model="selectedUsers"
                               :value="i"
                               :ripple="false"
                        />
                        <img :src="i.logo ? i.logo : 'https://randomuser.me/api/portraits/men/88.jpg'">
                        <span><nuxt-link :to="`/profile/${i.id}`">{{
                            `${i.fname} ${i.lname}` | persianDigit
                          }}</nuxt-link></span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.tel ? i.tel : '-' | persianDigit }}</td>
                    <td class="text-center"><span class="text-center file-id">{{ i.file_id ? i.file_id : '-' | persianDigit }}</span></td>
                    <td class="text-center">{{ i.birth ? i.birth : '-' | persianDigit }}</td>
                    <td class="text-center">
                      {{ i.created ? $moment(i.created.Time).format('jYYYY/jM/jDD') : '-' | persianDigit }}
                    </td>
                    <td class="text-center">
                      {{ i.last_login ? $moment(i.last_login.Time).format('jYYYY/jM/jDD') : '-' | persianDigit }}
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="users.total_rows === 0">اطلاعاتی یافت نشد</div>
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
    />
    <v-dialog
      v-model="showDelete"
      max-width="680"
    >
      <v-card
        class="accept-file-remove-model"
      >
        <button
          class="close"
          @click="toggleShowDelete"
        >
          <v-icon>mdi-close</v-icon>
        </button>
        <v-card-title class="accept-file-remove-title">
          <span>حذف کاربر</span>
        </v-card-title>

        <v-card-text
          class="accept-file-remove-text"
        >
          آیا از حذف کردن کاربران اطمینان دارید؟<br/>
          لطفا دقت کنید که پس از حذف، اطلاعات کاربران قابل بازگشت نیست
        </v-card-text>

        <v-card-actions>
          <button
            class="action-button accept-button"
            @click="toggleShowDelete"
          >
            خیر
          </button>
          <v-spacer></v-spacer>
          <button
            class="action-button red-button"
            @click="removeUsers"
          >
            بله، حذف کن
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showSendSmsModal"
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
              @click="closeForm"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>فرم ارسال پیامک</span>
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
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <div class="create-update-model-input-box">
                  <label>کاربران</label>
                  <multiselect
                    v-model="selectedUsers"
                    :disabled="true"
                    :options="allUsers"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    label="fname"
                    track-by="fname"
                    searchable
                    placeholder=""
                    :show-labels="false">
                    <template slot="singleLabel" slot-scope="props"><span
                      class="option__desc"><span
                      class="option__title">{{ `${props.option.fname} ${props.option.lname}` }}</span></span>
                    </template>
                    <template slot="option" slot-scope="props">
                      <div class="option__desc"><span
                        class="option__title">{{ `${props.option.fname} ${props.option.lname}` }}</span></div>
                    </template>
                  </multiselect>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <div class="create-update-model-input-box">
                  <label>متن پیامک</label>
                  <textarea
                    v-model="form.msg"
                    rows="4"
                  ></textarea>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-spacer/>
              <v-col
                cols="12"
                sm="3"
                md="3"
              >
                <button
                  class="second-button"
                  @click="closeSendSmsFrom"
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
                  @click="createMessage"
                >
                  ذخیره
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import CreateUserFormComponent from "~/components/panel/profile/user/CreateUserFormComponent";

export default {
  name: "index",
  components: {CreateUserFormComponent, CropImageComponent, DataTableComponent},
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
      headers: [
        '',
        'بیمار',
        'موبایل',
        'پرونده',
        'سن',
        'ثبت در سیستم',
        'آخرین ورود',
      ],
      action: null,
      search: {
        q: "",
        page: 1,
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
      form: {
        msg: "",
        numbers: []
      },
      selectedUsers: [],
      showCreateModal: false,
      showFilterModal: false,
      showDelete: false,
      showSendSmsModal: false,
      overlay: false,
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
        case 2:
        case '2':
          this.toggleShowSendSmsModal()
      }
    },
    paginate(page = 1) {
      this.search.page = page
      this.getUsersList()
    },
    getUsersList() {
      this.toggleOverlay()
      this.showFilterModal = false
      this.$store.dispatch('users/getPatients', this.search)
        .finally(() => {
          setTimeout(() => {
            this.toggleOverlay()
          }, 50)
        })
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
    toggleOverlay() {
      this.overlay = !this.overlay
    },
    closeFilterModal() {
      this.clearFilterForm()
      this.toggleFilterModal()
    },
    closeForm() {
      this.toggleCreateModal()
      this.getUsersList()
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
      this.toggleOverlay()
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
        .finally(() => {
          setTimeout(() => {
            this.toggleOverlay()
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
      this.clearSendSmsFrom()
      this.toggleShowSendSmsModal()
    },
    clearSendSmsFrom() {
      this.form = {
        msg: "",
        numbers: []
      }
    },
    toggleShowSendSmsModal() {
      this.showSendSmsModal = !this.showSendSmsModal
    },
    createMessage() {
      this.toggleOverlay()
      this.$store.dispatch('messages/createMessage', this.form)
        .then(() => {
          setTimeout(() => {
            this.closeSendSmsFrom()
          }, 50)
        })
        .finally(() => {
          setTimeout(() => {
            this.toggleOverlay()
          }, 50)
        })
    },
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
  },
  watch: {
    selectedUsers() {
      this.form.numbers = this.selectedUsers.map(i => i.tel)
    }
  }
}
</script>

<style scoped>

</style>
