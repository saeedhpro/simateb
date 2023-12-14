<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col align-self="center">
        <div class="page-header-box messages pay">
          <div class="page-header">
            <img src="/images/pages/sms.svg" alt="organizations">
            <span class="title">
            افزایش اعتبار پیامک
          </span>
          </div>
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
        <pay-card-to-card-payment-box
          @save="onSaveClicked"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "pay",
  layout: "panel",
  middleware: "auth",
  data() {
    return {
      price: 0,
      money: {
        decimal: '.',
        thousands: ',',
        suffix: ' ریال',
        prefix: '',
        precision: 0,
        masked: false
      }
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.$store.dispatch('getOwn')
    },
    onSaveClicked(form) {
      if (this.validateCardForm(form)) {
        this.$store.dispatch('organizations/createCardToCard', form)
          .then(res => {
            this.$toast.success('درخواست با موفقیت ثبت شد')
            this.$router.push('/messages')
          })
          .catch(err => {
            this.$toast.error('متاسفانه خطایی رخ داده است')
          })
      }
    },
    validateCardForm(form) {
      let validated = true
      if (!form.amount) {
        validated = false
        this.$toast.error('لطفا مبلغ را وارد کنید');
      }
      if (!form.card_number) {
        validated = false
        this.$toast.error('لطفا شماره کارت را وارد کنید');
      }
      if (!form.date) {
        validated = false
        this.$toast.error('لطفا تاریخ واریز را وارد کنید');
      }
      return validated
    },
    doPay() {
      const price = parseInt(this.price.toString().replaceAll('ریال', '').trim().replaceAll(',', ''))
      const data = {
        'amount': price / 10,
      }
      this.$axios.post('/payment', data)
        .then(res => {
          console.log(res, "res")
        })
        .catch(err => {
          console.log(err, 'err')
        })
    },
    selectPrice(price) {
      this.price = price
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
