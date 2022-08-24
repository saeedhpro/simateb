<template>
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
            <input class="search-input" v-model="q" type="text" ref="search-input" placeholder="جستجو"
                   @input="getUsersList">
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
          :page="page"
          :total="users.total_rows"
          @paginate="paginate"
        >
          <template v-slot:body>
            <tr v-for="(i, n) in users.data" :key="n">
              <td class="text-center">{{ (page - 1) * 10 + n + 1 | persianDigit }}</td>
              <td class="text-center">
                <div class="table-row flex flex-row align-center justify-start">
                  <input type="checkbox"
                         class="table-selectable-checkbox"
                         v-model="selectedUsers"
                         :value="i"
                         :ripple="false"
                  />
                  <img :src="i.logo ? i.logo : 'https://randomuser.me/api/portraits/men/88.jpg'">
                  <span class="cursor-pointer" @click="editUser(i)">{{
                      `${i.fname} ${i.lname}` | persianDigit
                    }}</span>
                </div>
              </td>
              <td class="text-center">{{ i.tel ? i.tel : '-' | persianDigit }}</td>
              <td class="text-center"><span
                class="text-center file-id">{{ i.file_id ? i.file_id : '-' | persianDigit }}</span></td>
              <td class="text-center">{{ i.age ? i.age : '-' | persianDigit }}</td>
              <td class="text-center">
                {{ i.created ? $moment(i.created).format('jYYYY/jM/jDD') : '-' | persianDigit }}
              </td>
              <td class="text-center">
                {{ i.last_login ? $moment(i.last_login).format('jYYYY/jM/jDD') : '-' | persianDigit }}
              </td>
            </tr>
          </template>
          <template v-slot:notfound>
            <div v-if="users.total_rows === 0">اطلاعاتی یافت نشد</div>
          </template>
        </data-table-component>
      </v-col>
    </v-row>
    <admin-delete-users-component
      :open="showDelete"
      @close="toggleShowDelete"
      @remove="remove"
    />
    <admin-update-user-form-component
      v-if="item"
      :open="showEditUser"
      :item="item"
      @close="closeEditUserModal"
    />
    <send-sms-component
      :users="allUsers"
      :multiple="true"
      :selectedItems="selectedUsers"
      :open="showSendSmsModal"
      @selected="itemSelected"
      @close="closeSmsForm"
    />
  </v-card>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import AdminDeleteUsersComponent from "~/components/admin/global/AdminDeleteUsersComponent";
import SendSmsComponent from "~/components/global/sms/SendSmsComponent";
import AdminUpdateUserFormComponent from "~/components/admin/user/AdminUpdateUserFormComponent";

export default {
  name: "AdminOrganizationMainComponent",
  components: {
    AdminUpdateUserFormComponent,
    AdminDeleteUsersComponent,
    DataTableComponent,
    SendSmsComponent,
  },
  props: {
    page: {
      type: Number,
      required: true,
      default: 1,
    }
  },
  data() {
    return {
      showDelete: false,
      showSendSmsModal: false,
      showEditUser: false,
      selectedUsers: [],
      headers: [
        '',
        'بیمار',
        'موبایل',
        'پرونده',
        'سن',
        'ثبت در سیستم',
        'آخرین ورود',
      ],
      q: "",
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
    }
  },
  methods: {
    paginate(page = 1) {
      this.$emit('paginate', page)
    },
    getUsersList() {
      this.selectedUsers = []
      this.$emit('getUsersList', this.q)
    },
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
    closeEditUserModal() {
      this.toggleEditUserModal()
      this.item = null
      this.paginate(this.page)
    },
    editUser(item) {
      this.item = item
      this.toggleEditUserModal()
    },
    toggleEditUserModal() {
      this.showEditUser = !this.showEditUser
    },
    toggleShowSendSmsModal() {
      this.showSendSmsModal = !this.showSendSmsModal
    },
    itemSelected(e) {
      this.selectedUsers = e
    },
    closeSmsForm() {
      this.selectedUsers = []
      this.action = null
      this.toggleShowSendSmsModal()
    },
    toggleShowDelete() {
      this.showDelete = !this.showDelete
    },
    remove() {
      this.deleteUsers(this.selectedUsers.map(i => i.id))
      this.action = null
      this.selectedUsers = []
      this.toggleShowDelete()
      this.getUsersList()
    },
    deleteUsers(ids) {
      this.$store.dispatch('users/deleteUsers', {
        ids
      })
    },
  },
  computed: {
    organization() {
      return this.$store.getters['organizations/getOrganization']
    },
    users() {
      return this.$store.getters['users/getOrganizationPatients']
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
}
</script>

<style scoped>

</style>
