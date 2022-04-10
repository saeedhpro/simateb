<template>
  <v-container>
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
          <div class="page-actions">
            <img src="/images/pages/new-user.svg" alt="users">
            <span class="title">
            بیمار جدید
          </span>
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
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="6"
              align-self="center"
            >
              <div class="page-main-actions-right">
                <div class="selected-count" v-if="selectedUsers.length > 0">
                  {{ selectedUsers.length | persianDigit }}
                </div>
                <select
                  v-model="action"
                >
                  <option v-for="(i, n) in items" :key="n" :value="i.id" v-text="i.label"></option>
                </select>
                <button
                  @click="doAction"
                >
                  <span>انجام بده</span>
                </button>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="6"
              align-self="center"
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
                  <input class="search-input" v-model="q" type="text" ref="search-input" placeholder="جستجو">
                  <div class="search-button">
                    <img src="/images/pages/search-button.svg">
                  </div>
                  <div class="search-filter">
                    <img src="/images/pages/filter.svg">
                    فیلتر
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
                          :value="i.id"
                          :ripple="false"
                        />
                        <img :src="i.logo ? i.logo : 'https://randomuser.me/api/portraits/men/88.jpg'">
                        <span>{{ `${i.fname} ${i.lname}` | persianDigit }}</span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.tel ? i.tel : '-' | persianDigit }}</td>
                    <td class="text-center">{{ i.file_id ? i.file_id : '-' | persianDigit }}</td>
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
  </v-container>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent";

export default {
  name: "index",
  components: {DataTableComponent},
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
      q: "",
      page: 1,
      selectedUsers: [],
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    doAction() {
      if (this.action) {
        console.log(this.action)
      }
    },
    paginate(page = 1) {
      this.page = page
      this.getUsersList()
    },
    getUsersList() {
      this.$store.dispatch('users/getList', {
        page: this.page || 1,
        q: this.q
      })
    },
  },
  computed: {
    users() {
      return this.$store.getters['users/getList']
    }
  }
}
</script>

<style scoped>

</style>
