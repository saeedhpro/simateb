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
            واریزی ها
          </span>
          </div>
          <v-divider inset/>
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
            >
              <data-table-component
                :headers="headers"
                :page="search.page"
                :total="payments.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in payments.data" :key="n" :class="i.status">
                    <td class="text-center">{{ (search.page - 1) * 10 + n + 1 }}</td>
                    <td class="text-center">{{ i.organization ? i.organization.name : '-' }}</td>
                    <td class="text-center">{{ i.user ? i.user.full_name : '-' }}</td>
                    <td class="text-center">{{ i.amount | toPersianCurrency('تومان', 0) }}</td>
                    <td class="text-center">{{ i.date_fa }}</td>
                    <td class="text-center">{{ i.card_number }}</td>
                    <td class="text-center flex flex-row justify-space-around align-center">
                      <v-btn icon dense @click="doAccept(i.id, true)" class="pointer">
                        <v-icon color="green">mdi-check</v-icon>
                      </v-btn>
                      <v-btn icon dense @click="doAccept(i.id, false)" class="pointer">
                        <v-icon color="red" class="pointer">mdi-close</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="payments.meta.total === 0">اطلاعاتی یافت نشد</div>
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
import moment from "jalali-moment"

export default {
  name: "index.vue",
  components: {DataTableComponent},
  layout: 'admin',
  middleware: 'admin',
  data() {
    return {
      showFilterModal: false,
      headers: [
        '',
        'مطب',
        'کاربر',
        'مبلغ',
        'تاریخ',
        'شماره کارت',
        'عملیات',
      ],
      search: {
        q: '',
        page: 1,
      },
    }
  },
  mounted() {
    this.getPaymentList()
  },
  methods: {
    clearFilterForm() {
      this.search = {
        page: this.search.page,
        q: '',
      }
    },
    closeFilterModal() {
      this.clearFilterForm()
      this.toggleFilterModal()
    },
    toggleFilterModal() {
      this.showFilterModal = !this.showFilterModal
    },
    paginate(page = 1) {
      this.search.page = page
      this.getPaymentList()
    },
    getPaymentList() {
      this.$store.dispatch('admin/payments/getList', this.search)
    },
    getStatus(sent) {
      return sent ? 'ارسال شده' : 'ارسال نشد'
    },
    doAccept(id, status) {
      this.$store.dispatch('admin/payments/acceptOrReject', {
        id,
        status,
      })
        .then(res => {
          this.getPaymentList()
          this.$toast.success('با موفقیت انجام شد')
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است')
        })
    },
  },
  computed: {
    payments() {
      return this.$store.getters['admin/payments/getList']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
  },
}
</script>

<style scoped>
tr.accepted {
  background-color: #97fbcb !important;
}
tr.rejected {
  background-color: #ffbaba !important;
}
</style>
