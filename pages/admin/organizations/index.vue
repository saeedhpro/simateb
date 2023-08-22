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
              مطب‌ها / موسسات / آزمایشگاه‌ها
            </span>
          </div>
          <v-divider inset/>
          <div class="page-actions"
               @click="toggleCreateModal"
          >
            <img src="/images/pages/new-user.svg" alt="organizations">
            <span class="title-main">موسسه جدید</span>
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
            <v-spacer/>
            <v-col
              cols="12"
              sm="12"
              md="5"
            >
              <div class="page-main-actions-left">
                <div class="result-count">
                  <span>{{ organizations.meta ? organizations.meta.total : 0  }}</span>
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
                         @input="getOrganizationsList">
                  <div @click="getOrganizationsList" class="search-button">
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
                :total="organizations.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in organizations.data" :key="n">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 }}</td>
                    <td class="text-center">
                      <div class="table-row flex flex-row align-center justify-start">
                        <input type="checkbox"
                               class="table-selectable-checkbox"
                               v-model="selectedOrganizations"
                               :value="i.id"
                        />
                        <img :src="i.logo_link ? i.logo_link : 'https://randomuser.me/api/portraits/men/88.jpg'">
                        <span><nuxt-link :to="`/admin/organizations/${i.id}`">{{
                            `${i.name}`
                          }}</nuxt-link></span>
                      </div>
                    </td>
                    <td class="text-center">{{ i.phone }}</td>
                    <td class="text-center">{{ i.profession ? i.profession.name : '-' }}</td>
                    <td class="text-center">{{ `${i.sms_credit} (${parseInt(i.sms_price)})` }}</td>
                    <td class="text-center">
                      {{ i.created_at_ago ? i.created_at_ago : '-' }}
                    </td>
                    <td class="text-center">{{
                        i.staff ? `${i.staff.fname} ${i.staff.lname}` : '-'
                      }}
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="organizations.meta.total === 0">اطلاعاتی یافت نشد</div>
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
      selectedOrganizations: [],
      showCreateModal: false,
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
        due_payment: '0',
      },
      province: null,
      county: null,
      city: null,
      hdate: '',
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
      this.$store.dispatch('admin/organizations/getList', this.search)
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
    updated(o) {
      this.form.file = o
      this.show = !this.show
    },
    closeForm() {
      this.clearForm()
      this.toggleCreateModal()
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
        due_payment: '0',
      }
    },
    createOrganization() {
      this.$store.dispatch('admin/organizations/createOrganization', this.form)
        .then(() => {
          setTimeout(() => {
            this.toggleCreateModal()
            this.closeForm()
            this.getOrganizationsList()
          }, 50)
        })
    },
    deleteOrganizations(ids) {
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
  },
}
</script>

<style scoped>

</style>
