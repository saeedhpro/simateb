<template>
  <v-card
    class="page-main-box"
  >
    <div class="pay-card-form mx-auto">
      <v-container >
        <v-row>
          <v-col
            cols="12"
          >
            <div class="pay-header">
              شماره کارت، مبلغ و تاریخ واریز به حساب را وارد کنید:
            </div>
          </v-col>
          <v-col
            cols="12"
          >
            <custom-price-input
              v-model="form.amount"
              label="مبلغ"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <custom-card-number-input
              v-model="form.card_number"
              label="شماره کارت"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <div class="create-update-model-input-box">
              <label>تاریخ واریز</label>
              <date-picker
                v-model="form.date"
                format="YYYY-MM-DD"
                display-format="jYYYY/jMM/jDD"
                editable
                class="date-picker"
              >
                <template v-slot:label>
                  <img src="/images/form/datepicker.svg">
                </template>
              </date-picker>
            </div>
          </v-col>
          <v-col
            cols="12"
          >
            <button
              class="main-button"
              @click="onSaveClicked"
            >
              ثبت
            </button>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-card>
</template>

<script>
import moment from "jalali-moment";

export default {
  name: 'CardToCardPaymentBox',
  data() {
    return {
      form: {
        date: moment.now(),
        card_number: '',
        amount: 0,
      }
    }
  },
  methods: {
    onSaveClicked() {
      this.$emit('save', this.form)
    }
  }
}
</script>

<style scoped>
.pay-card-form {
  max-width: 600px;
}
</style>
