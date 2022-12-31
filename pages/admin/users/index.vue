<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box">
          <div class="page-header selected">
            <img src="/images/pages/user.svg" alt="users">
            <span class="title">
            کاربران
          </span>
          </div>
          <v-divider inset/>
          <admin-create-user-form-component
            :open="showCreateModal"
            @close="closeForm"
          />
          <div class="page-actions"
               @click="toggleCreateModal"
          >
            <img src="/images/pages/new-user.svg" alt="users">
            <span class="title-main">کاربر جدید</span>
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
                  <span>{{ users.total_rows ? users.total_rows : 0 | toPersianNumber }}</span>
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
                         @input="changeSearch">
                  <div @click="getUsersList" class="search-button">
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
                        <span><nuxt-link :to="`/admin/profile/${i.id}`">{{
                            `${i.fname} ${i.lname}` | persianDigit
                          }}</nuxt-link></span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.tel ? i.tel : '-' | persianDigit }}</td>
                    <td class="text-center">{{ i.user_group ? i.user_group.name : '-' | persianDigit }}</td>
                    <td class="text-center">{{ i.age ? i.age : '-' | persianDigit }}</td>
                    <td class="text-center" style="color: #000000">
                      <span v-if="i.organization">
                        <nuxt-link :to="`/admin/organizations/${i.organization.id}`">{{
                            i.organization.name | persianDigit
                          }}</nuxt-link>
                      </span>
                      <span v-else>-</span>
                    <td class="text-center">
                      {{ i.created ? $moment(i.created).locale("fa").format('jYYYY/jM/jDD') : '-' | persianDigit }}
                    </td>
                    <td class="text-center">
                      {{ i.last_login ? $moment(i.last_login).locale("fa").format('jYYYY/jM/jDD') : '-' | persianDigit }}
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
    <admin-delete-users-component
      :open="showDelete"
      @close="toggleRemove"
      @remove="remove"
    />
    <send-sms-component
      :users="allUsers"
      :multiple="true"
      :selectedItems="selectedUsers"
      :open="showSmsModal"
      @selected="itemSelected"
      @close="closeSmsForm"
    />
  </v-container>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import CropImageComponent from "~/components/panel/global/CropImageComponent";
import CreateUserFormComponent from "~/components/panel/profile/user/CreateUserFormComponent";
import AdminCreateUserFormComponent from "~/components/admin/user/AdminCreateUserFormComponent";
import SendSmsComponent from "~/components/global/sms/SendSmsComponent";
import AdminDeleteUsersComponent from "~/components/admin/global/AdminDeleteUsersComponent";

export default {
  name: "index",
  components: {
    AdminDeleteUsersComponent,
    SendSmsComponent,
    AdminCreateUserFormComponent, CreateUserFormComponent, CropImageComponent, DataTableComponent},
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
        'کاربر',
        'شماره تماس',
        'گروه',
        'سن',
        'موسسه',
        'ثبت در سیستم',
        'آخرین ورود',
      ],
      action: null,
      search: {
        q: "",
        page: 1,
        groups: [2,3,4,5]
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
      selectedUsers: [],
      showCreateModal: false,
      showDelete: false,
      showSmsModal: false,
    }
  },
  mounted() {
    this.paginate()
    this.getAllUsers()
  },
  methods: {
    toggleRemove() {
      this.showDelete = !this.showDelete
    },
    toggleSmsModal() {
      this.showSmsModal = !this.showSmsModal
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
    remove() {
      this.deleteUsers(this.selectedUsers.map(i => i.id))
      this.toggleRemove()
    },
    paginate(page = 1) {
      this.search.page = page
      this.getUsersList()
    },
    changeSearch(e) {
      this.getUsersList()
    },
    getUsersList() {
      this.showFilterModal = false
      this.$store.dispatch('admin/users/getList', this.search)
    },
    getAllUsers() {
      this.$store.dispatch('admin/users/getUsers')
    },
    toggleCreateModal() {
      this.showCreateModal = !this.showCreateModal
    },
    closeForm() {
      this.toggleCreateModal()
      this.paginate(1)
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
    itemSelected(e) {
      this.selectedUsers = e
    },
    closeSmsForm() {
      this.selectedUsers = []
      this.toggleSmsModal()
      this.action = null
    }
  },
  computed: {
    allUsers() {
      return this.$store.getters['admin/users/getUsers']
    },
    users() {
      return this.$store.getters['admin/users/getList']
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
}
</script>

<style scoped>

</style>
