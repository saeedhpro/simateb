<template>
  <div class="organization-page" v-if="organization">
    <v-row>
      <v-col
        cols="12"
      >
        <div class="organization-details">
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                >
                  <img
                    class="profile-image"
                    :src="organization.logo ? organization.logo : '/images/pages/img.svg'">
                </v-col>
                <v-col
                  cols="12"
                  md="9"
                >
                  <div class="detail-box">
                    <div class="name-box">
                      <span>{{ `${organization.name}` | persianDigit }}</span>
                    </div>
                    <div class="name-box">
                      <span>{{ organization.phone | persianDigit }}</span>
                    </div>
                    <div class="name-box">
                      <span>{{ organization.profession.name | persianDigit }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <div class="description-box">
                <div class="title">توضیحات</div>
                <div class="description">
                  {{ organization.info | persianDigit }}
                </div>
                <div class="action-box">
                  <v-spacer/>
                  <div class="action-button" @click="showUpdate">
                    <v-icon>
                      mdi-pencil-outline
                    </v-icon>
                    <span>ویرایش اطلاعات</span>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="organization-content">
          <div class="page-header-box">
            <nuxt-link :to="`/admin/organizations/${organization.id}`" class="page-header">
              <img src="/images/pages/users.svg" alt="users">
              <span class="title">بیماران</span>
            </nuxt-link>
            <nuxt-link :to="`/admin/organizations/${organization.id}/slider`" class="page-header">
              <img src="/images/pages/sliders.svg" alt="users">
              <span class="title">تصاویر اسلایدر</span>
            </nuxt-link>
            <nuxt-link :to="`/admin/organizations/${organization.id}/about`" class="page-header">
              <img src="/images/pages/about.svg" alt="users">
              <span class="title">درباره موسسه</span>
            </nuxt-link>

            <v-divider inset/>
            <div class="page-actions"
                 style="min-width: 220px"
                 @click="toggleAddUserModal"
            >
              <img src="/images/pages/new-user.svg" alt="users">
              <span class="title">افزودن بیمار جدید</span>
            </div>
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
                  <input class="search-input" v-model="search.q" type="text" ref="search-input" placeholder="جستجو"
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
                    <td class="text-center"><span
                      class="text-center file-id">{{ i.file_id ? i.file_id : '-' | persianDigit }}</span></td>
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
    <update-organization-from-component
      @close="showUpdate"
      :show="showUpdateModal"
      :item="organization"
    />
    <admin-create-user-form-component
      :open="showAddUserModal"
      @close="toggleAddUserModal"
    />
  </div>
</template>

<script>
import UpdateOrganizationFromComponent from "~/components/panel/orgnization/UpdateOrganizationFromComponent";
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import AdminCreateUserFormComponent from "~/components/admin/user/AdminCreateUserFormComponent";

export default {
  name: "ShowOrganizationComponent.vue",
  components: {AdminCreateUserFormComponent, DataTableComponent, UpdateOrganizationFromComponent},
  layout: "admin",
  middleware: "admin",
  mounted() {
    this.getOrganization()
      .then(() => {
        this.paginate()
        this.getAllUsers()
      })
  },
  data() {
    return {
      showUpdateModal: false,
      showAddUserModal: false,
      showSendSmsModal: false,
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
      action: null,
      form: {
        numbers: [],
        msg: "",
      }
    }
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
    toggleShowSendSmsModal() {
      this.showSendSmsModal = !this.showSendSmsModal
    },
    toggleAddUserModal() {
      this.showAddUserModal = !this.showAddUserModal
    },
    paginate(page = 1) {
      this.search.page = page
      this.getUsersList()
    },
    getUsersList() {
      this.$store.dispatch('users/getOrganizationPatients', {
        ...this.search,
        id: this.organization.id,
      })
    },
    getAllUsers() {
      this.$store.dispatch('users/getOrganizationUsers', this.organization.id)
    },
    toggleOverlay() {
      this.overlay = !this.overlay
    },
    async getOrganization() {
      const id = this.$route.params.id
      await this.$store.dispatch('organizations/getOrganization', id)
      return Promise.resolve()
    },
    showUpdate() {
      this.toggleShowUpdateModal()
    },
    toggleShowUpdateModal() {
      this.showUpdateModal = !this.showUpdateModal
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
  watch: {
    selectedUsers() {
      this.form.numbers = this.selectedUsers.map(i => i.tel)
    }
  }
}
</script>

<style scoped>

</style>
