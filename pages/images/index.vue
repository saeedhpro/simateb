<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box">
          <div class="page-header">
            <img src="/images/pages/sms.svg" alt="organizations">
            <span class="title">
            ارسال تصاویر
          </span>
          </div>
          <v-divider inset/>
          <div class="page-actions"
               @click="openCreateModal"
          >
            <img src="/images/pages/plus.svg" alt="organizations">
            <span class="title-main">درخواست جدید</span>
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
                <v-select
                  outlined
                  :items="doctors"
                  label="مطب"
                  item-value="id"
                  item-text="name"
                  v-model="doctor_id"
                ></v-select>
              </div>
            </v-col>
            <v-spacer/>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <data-table-component
                :headers="headers"
                :page="page"
                :total="requests.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in requests.data" :key="n">
                    <td class="text-center">{{ (page - 1) * 10 + n + 1 }}</td>
                    <td class="text-center">{{ i.user ? i.user.tel : '-' }}</td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="requests.meta.total === 0">اطلاعاتی یافت نشد</div>
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
  layout: "panel",
  middleware: "auth",
  data() {
    return {
      headers: [
        '',
        'دریافت کننده',
        'شماره تماس',
        'متن پیامک',
        'توسط',
        'تاریخ',
        'وضعیت',
      ],
      doctors: [],
      organizations: [],
      doctor_id: null,
      requests: {
        data: [],
        meta: {
          total: 0
        }
      },
      page: 1,
      showCreateModal: false,
    }
  },
  mounted() {
    this.paginate()
    this.getOrganizations()
  },
  methods: {
    paginate(page = 1) {
      this.page = page
    },
    getOrganizations() {
      const id = this.loginUser.organization_id
      this.$axios.get(`/organizations/${id}/`)
    },
    openCreateModal() {
      this.showCreateModal = true
    }
  },
  computed: {
    loginUser() {
      return this.$store.getters['login/getUser']
    },
  },
}
</script>

<style scoped>

</style>
