<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box messages pay">
          <nuxt-link to="/messages/pay" class="page-header">
            <img src="/images/pages/sms.svg" alt="organizations">
            <span class="title">
              افزایش اعتبار پیامک
            </span>
          </nuxt-link>
          <nuxt-link to="/messages/pay/list" class="page-header">
            <img src="/images/pages/sms.svg" alt="organizations">
            <span class="title">
              لیست اعتبار پیامک
            </span>
          </nuxt-link>
          <v-divider class="d-none d-lg-flex" inset/>
          <v-spacer class="d-none d-sm-flex d-lg-none"/>
          <div class="page-actions-secondary">
            <span class="title-main">اعتبار:</span>
            <span class="title-second">{{ loginUser.organization.sms_credit | toPersianCurrency('', 0) }}</span>
            <span class="title-main">تومان</span>
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
          <div class="pay-card-form mx-auto">
            <v-row>
              <v-col
                cols="12"
                class=""
                v-if="loading"
              >
                <LoadingCard />
              </v-col>
              <v-col
                v-else
                cols="12"
              >
                <data-table-component
                  :headers="headers"
                  :page="payments.page"
                  :total="payments.meta.total"
                  @paginate="paginate"
                >
                  <template v-slot:body>
                    <tr v-for="(i, n) in payments.data" :key="n">
                      <td class="text-center">{{ (payments.page - 1) * 10 + n + 1 }}</td>
                      <td class="text-center">
                        <div class="table-row flex flex-row align-center justify-start">
<!--                          <input type="checkbox"-->
<!--                                 class="table-selectable-checkbox"-->
<!--                                 v-model="selectedUsers"-->
<!--                                 :value="i"-->
<!--                          />-->
                          {{ i.amount | toPersianCurrency('تومان', 0) }}
                        </div>
                      </td>
                      <td class="text-center">
                        {{ i.card_number }}
                      </td>
                      <td class="text-center" v-if="i.date_fa">
                        {{ i.date_fa }}
                      </td>
                      <td class="text-center" v-else>-</td>
                      <td class="text-center" v-if="i.status_fa">
                        {{ i.status_fa }}
                      </td>
                      <td class="text-center" v-else>-</td>
                    </tr>
                  </template>
                  <template v-slot:notfound>
                    <div v-if="payments.meta.total === 0">اطلاعاتی یافت نشد</div>
                  </template>
                </data-table-component>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTableComponent from "~/components/panel/global/DataTableComponent.vue";
import LoadingCard from "~/components/global/LoadingCard.vue";

export default {
  name: "pay",
  components: {LoadingCard, DataTableComponent},
  layout: "panel",
  middleware: "auth",
  data() {
    return {
      payments: {
        data: [],
        limit: 10,
        page: 1,
        sort: '',
        meta: {
          total: 0,
        },
      },
      headers: [
        '',
        'مبلغ',
        'شماره کارت',
        'تاریخ واریز',
        'وضعیت',
      ],
      selectedItems: [],
      loading: false
    }
  },
  mounted() {
    this.getUser()
    this.paginate()
  },
  methods: {
    paginate(page = 1) {
      this.payments.page = page
      this.getPayments()
    },
    getUser() {
      this.$store.dispatch('getOwn')
    },
    getPayments() {
      this.$store.dispatch('organizations/getCardToCard', {
        page: this.payments.page,
        limit: this.payments.limit,
      })
        .then(res => {
          const data = res.data
          this.payments.data = data.data
          this.payments.meta.total = data.meta.total
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است')
        })
    },
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
