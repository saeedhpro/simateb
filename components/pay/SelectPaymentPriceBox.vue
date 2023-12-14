<template>
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
            {{ 20000 | toPersianCurrency('ریال', 0) }}
          </div>
          <div
            class="price-item"
            :class="{'selected': price === 50000}"
            @click="selectPrice(50000)">
            {{ 50000 | toPersianCurrency('ریال', 0) }}
          </div>
          <div
            class="price-item"
            :class="{'selected': price === 100000}"
            @click="selectPrice(100000)">
            {{ 100000 | toPersianCurrency('ریال', 0) }}
          </div>
          <div
            class="price-item"
            :class="{'selected': price === 150000}"
            @click="selectPrice(150000)">
            {{ 150000 | toPersianCurrency('ریال', 0) }}
          </div>
          <div
            class="price-item"
            :class="{'selected': price === 200000}"
            @click="selectPrice(200000)">
            {{ 200000 | toPersianCurrency('ریال', 0) }}
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
          <button class="pay-button" @click="doPay">
            پرداخت
          </button>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

</script>

<style scoped>

</style>
