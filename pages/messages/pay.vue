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
            افزایش اعتبار پیامک
          </span>
          </div>
          <v-divider inset/>
          <div class="page-actions-secondary">
            <span class="title-main">اعتبار:</span>
            <span class="title-second">{{ loginUser.organization.sms_credit | toPersianCurrency('', 1) }}</span>
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
          <v-row>
            <v-col
              cols="12"
            >
              <div class="pay-header">لطفا مبلغ مورد نظر خود را جهت افزایش اعتبار وارد کرده یا از بین گزینه‌های زیر
                انتخاب کنید
              </div>
            </v-col>
            <v-col
              col="12"
            >
              <div class="price-items mt-4">
                <div
                  class="price-item"
                  :class="{'selected': price === 20000}"
                  @click="selectPrice(20000)">
                  {{ 20000 | toPersianCurrency }}
                </div>
                <div
                  class="price-item"
                  :class="{'selected': price === 50000}"
                  @click="selectPrice(50000)">
                  {{ 50000 | toPersianCurrency }}
                </div>
                <div
                  class="price-item"
                  :class="{'selected': price === 100000}"
                  @click="selectPrice(100000)">
                  {{ 100000 | toPersianCurrency }}
                </div>
                <div
                  class="price-item"
                  :class="{'selected': price === 150000}"
                  @click="selectPrice(150000)">
                  {{ 150000 | toPersianCurrency }}
                </div>
                <div
                  class="price-item"
                  :class="{'selected': price === 200000}"
                  @click="selectPrice(200000)">
                  {{ 200000 | toPersianCurrency }}
                </div>
              </div>
            </v-col>
            <v-col
              cols="12"
            >
              <div class="d-flex justify-center mt-4">
                <input class="price-input" v-money="money" type="text" v-model.lazy="price" >
              </div>
            </v-col>
            <v-col
              cols="12"
            >
              <div class="d-flex justify-center mt-4">
                <button class="pay-button">
                  پرداخت
                </button>
              </div>
            </v-col>
          </v-row>
        </v-card>
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
  methods: {
    pay() {

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
