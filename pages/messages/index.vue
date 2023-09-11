<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="etebar-box" v-if="showEtebar">
          <div class="right-box">
            <img src="/images/pages/alert.svg" alt="">
            <div>اعتبار لازم برای ارسال پیام کوتاه در حال اتمام است</div>
            <nuxt-link to="/messages/pay" class="page-actions second-button">
              <img src="/images/pages/plus-out.svg" alt="organizations">
              <span class="title">افزایش اعتبار</span>
            </nuxt-link>
          </div>
          <div class="left-box">
            <button
              class="close"
              @click="closeEtebar"
            >
              <v-icon>mdi-close</v-icon>
            </button>
          </div>
        </div>
        <div class="page-header-box messages">
          <div class="page-header">
            <img src="/images/pages/sms.svg" alt="organizations">
            <span class="title">
            پیام ها
          </span>
          </div>
          <v-divider inset class="divider"/>
          <div class="page-actions-secondary">
            <span class="title-main">اعتبار:</span>
            <span class="title-second">{{ loginUser.organization.sms_credit | toPersianCurrency('', 0) }}</span>
            <span class="title-main">تومان</span>
          </div>
          <nuxt-link to="/messages/pay" class="page-actions second-button">
            <img src="/images/pages/plus-out.svg" alt="organizations">
            <span class="title">افزایش اعتبار</span>
          </nuxt-link>
          <div class="page-actions"
               @click="toggleCreateModal"
          >
            <img src="/images/pages/plus.svg" alt="organizations">
            <span class="title-main">پیام جدید</span>
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
              sm="6"
              md="5"
              lg="4"
            >
              <div class="right-box">
                <v-checkbox
                  v-model="selectedAll"
                ></v-checkbox>
                <div class="selected-count" v-if="selectedMessages.length > 0">
                  {{ selectedMessages.length }}
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
              sm="6"
              md="6"
            >
              <div class="page-main-actions-left">
                <div class="result-count">
                  <span>{{ messages.meta.total ? messages.meta.total : 0  }}</span>
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
                  <div @click="getMessageList" class="search-button">
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
                                @click="getMessageList"
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
                :total="messages.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in messages.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <input type="checkbox"
                               class="table-selectable-checkbox"
                               v-model="selectedMessages"
                               :value="i"
                        />
                        <div class="mr-2">
                          <nuxt-link :to="`/profile/${i.user ? i.user.id : 1}`">{{
                              i.user ? `${i.user.fname} ${i.user.lname}` : '-'
                            }}
                          </nuxt-link>
                        </div>
                      </div>
                    </td>
                    <td class="text-center">{{ i.user ? i.user.tel : '-' }}</td>
                    <td class="text-center">{{ i.msg ? i.msg : '-' }}</td>
                    <td class="text-center">{{
                        i.staff ? `${i.staff.fname} ${i.staff.lname}` : '-'
                      }}
                    </td>
                    <td class="text-center">
                      {{ i.created ? i.created_ago : '-' }}
                    </td>
                    <td class="text-center"><span class="message"
                                                  :class="{'message-sent': i.sent, 'message-not-sent': !i.sent}">{{
                        getStatus(i.sent)
                      }}</span></td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="messages.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <send-sms-component
      :users="users"
      :multiple="true"
      :selectedItems="selectedUsers"
      :open="showCreateModal"
      @selected="itemSelected"
      @close="closeSmsForm"
      @clear="clearSmsForm"
    />
    <admin-delete-users-component
      :open="showDelete"
      :title="`پیام ها`"
      @close="toggleRemove"
      @remove="remove"
    />
  </v-container>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import SendSmsComponent from "~/components/global/sms/SendSmsComponent";
import AdminDeleteUsersComponent from "~/components/admin/global/AdminDeleteUsersComponent";

export default {
  name: "index",
  components: {AdminDeleteUsersComponent, DataTableComponent, SendSmsComponent},
  layout: "panel",
  middleware: "auth",
  data() {
    return {
      showFilterModal: false,
      showCreateModal: false,
      showDelete: false,
      showEtebar: false,
      headers: [
        '',
        'دریافت کننده',
        'شماره تماس',
        'متن پیامک',
        'توسط',
        'تاریخ',
        'وضعیت',
      ],
      search: {
        q: '',
        page: 1,
        start: '',
        end: '',
      },
      action: null,
      selectedUsers: [],
      selectedMessages: [],
      actions: [
        {
          id: 0,
          label: 'اقدام جمعی'
        },
        {
          id: 1,
          label: 'حذف کن'
        },
      ],
    }
  },
  mounted() {
    this.paginate()
    this.getUsers()
    this.getUser()
    if (this.loginUser) {
      this.showEtebar = this.loginUser.organization.sms_credit < 1000
    }
  },
  methods: {
    doAction() {
      if (!this.action) return
      switch (this.action) {
        case 1:
        case '1':
          this.toggleRemove()
      }
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
    closeFilterModal() {
      this.clearFilterForm()
      this.toggleFilterModal()
    },
    closeEtebar() {
      this.showEtebar = !this.showEtebar
    },
    toggleRemove() {
      this.showDelete = !this.showDelete
    },
    toggleFilterModal() {
      this.showFilterModal = !this.showFilterModal
    },
    toggleCreateModal() {
      this.showCreateModal = !this.showCreateModal
    },
    paginate(page = 1) {
      this.search.page = page
      this.getMessageList()
    },
    getMessageList() {
      this.$store.dispatch('messages/getList', this.search)
    },
    getStatus(sent) {
      return sent ? 'ارسال شده' : 'ارسال نشد'
    },
    remove() {
      this.deleteMessages(this.selectedMessages.map(i => i.id))
    },
    deleteMessages(ids) {
      this.$store.dispatch('messages/deleteMessages', {
        ids
      })
        .then(() => {
          setTimeout(() => {
            this.getMessageList()
            this.action = null
            this.selectedMessages = []
            this.toggleRemove()
          }, 50)
        })
    },
    getUsers() {
      this.$store.dispatch('users/getUsers')
    },
    getUser() {
      this.$store.dispatch('getOwn')
    },
    itemSelected(e) {
      this.selectedUsers = e
    },
    closeSmsForm() {
      this.selectedUsers = []
      this.action = null
      this.toggleCreateModal()
      this.getMessageList()
    },
    clearSmsForm() {
      this.selectedUsers = []
    },
  },
  computed: {
    messages() {
      return this.$store.getters['messages/getList']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    users() {
      return this.$store.getters['users/getUsers']
    },
    selectedAll: {
      get() {
        return this.selectedMessages.length > 0 && this.selectedMessages.length === this.messages.data.length
      },
      set(bool) {
        if (bool) {
          this.selectedMessages = []
          this.selectedMessages = this.messages.data
        } else {
          this.selectedMessages = []
        }
      }
    },
  },
}
</script>

<style scoped>

</style>
