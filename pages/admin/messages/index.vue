<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box">
          <div class="page-header">
            <img src="/images/pages/sms.svg" alt="">
            <span class="title">
            پیامک ها
          </span>
          </div>
          <v-divider inset/>
          <div class="page-actions"
               @click="toggleCreateModal"
          >
            <img src="/images/pages/plus.svg" style="height: 40px; width: 40px" alt="">
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
              sm="12"
              md="3"
            >
              <div class="right-box">
                <v-checkbox
                  v-model="selectedAll"
                ></v-checkbox>
                <div class="selected-count" v-if="selectedMessages.length > 0">
                  {{ selectedMessages.length | persianDigit }}
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
                  <span>{{ messages.total_rows ? messages.total_rows : 0 | toPersianNumber }}</span>
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
                         @input="getMessageList">
                  <div @click="getMessageList" class="search-button">
                    <img src="/images/pages/search-button.svg">
                  </div>
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
                :total="messages.total_rows"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in messages.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 | persianDigit }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <input type="checkbox"
                               class="table-selectable-checkbox"
                               v-model="selectedMessages"
                               :value="i.id"
                        />
                        <div class="mr-2">
                          <nuxt-link :to="`/profile/${i.user ? i.user.id : 1}`">{{
                              i.user ? `${i.user.fname} ${i.user.lname}` : '-' | persianDigit
                            }}
                          </nuxt-link>
                        </div>

                      </div>
                    </td>
                    <td class="text-center">{{ i.user ? i.user.tel : '-' | persianDigit }}</td>
                    <td class="text-center">{{ i.msg ? i.msg : '-' | persianDigit }}</td>
                    <td class="text-center">{{
                        i.staff ? `${i.staff.fname} ${i.staff.lname}` : '-' | persianDigit
                      }}
                    </td>
                    <td class="text-center">
                      {{ i.created ? i.created : '-' | toRelativeDate }}
                    </td>
                    <td class="text-center"><span class="message"
                                                  :class="{'message-sent': i.sent, 'message-not-sent': !i.sent}">{{
                        getStatus(i.sent) | persianDigit
                      }}</span></td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="messages.total_rows === 0">اطلاعاتی یافت نشد</div>
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
      :is-admin="true"
      @selected="itemSelected"
      @close="closeSmsForm"
      @clear="clearSmsForm"
    />
  </v-container>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import SendSmsComponent from "~/components/global/sms/SendSmsComponent";

export default {
  name: "index.vue",
  components: {SendSmsComponent, DataTableComponent},
  layout: 'admin',
  middleware: 'admin',
  data() {
    return {
      showCreateModal: false,
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
  },
  methods: {
    doAction() {
      if (!this.action) return
      switch (this.action) {
        case 1:
        case '1':
          this.deleteMessages(this.selectedMessages)
          break
        case 2:
        case '2':
          this.toggleCreateModal()
          break
      }
    },
    closeForm() {
      this.clearForm()
      this.toggleCreateModal()
    },
    toggleCreateModal() {
      this.showCreateModal = !this.showCreateModal
    },
    paginate(page = 1) {
      this.search.page = page
      this.getMessageList()
    },
    getMessageList() {
      this.$store.dispatch('admin/messages/getList', this.search)
    },
    getStatus(sent) {
      return sent ? 'ارسال شده' : 'ارسال نشد'
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
    deleteMessages(ids) {
      this.$store.dispatch('admin/messages/deleteMessages', {
        ids
      })
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
          setTimeout(() => {
            this.getMessageList()
            this.action = null
            this.selectedMessages = []
          }, 50)
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
    },
    getUsers() {
      this.$store.dispatch('admin/users/getUsers')
    }
  },
  computed: {
    messages() {
      return this.$store.getters['admin/messages/getList']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    users() {
      return this.$store.getters['admin/users/getUsers']
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
  }
}
</script>

<style scoped>

</style>
