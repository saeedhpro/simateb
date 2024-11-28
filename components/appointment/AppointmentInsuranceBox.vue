<template>
  <div class="insurance-box-component">
    <v-expansion-panels flat>
      <v-expansion-panel
        class="wire-box"
      >
        <v-expansion-panel-header
          class="wire-box-header"
        >
          اطلاعات پرداخت
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-0">
          <v-row>
            <v-col
              cols="12"
              sm="4"
            >
              <custom-price-input
                v-model="total"
                label="مبلغ کل"
                @input="onInsuranceChanged"
              />
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <div class="create-update-model-input-box">
                <label>بیمه</label>
                <v-select
                  outlined
                  :items="user_insurances"
                  item-value="id"
                  item-text="name"
                  :return-object="true"
                  height="32px"
                  dense
                  v-model="selectedInsurance"
                  @input="onInsuranceChanged"
                ></v-select>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <custom-price-input
                v-model="insurance_price"
                label="سهم بیمه"
                @input="onInsurancePriceChanged"
              />
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <custom-price-input
                v-model="patient_price"
                label="سهم بیمار"
                @input="onPatientPriceChanged"
              />
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <custom-price-input
                v-model="discount_price"
                label="میزان تخفیف"
                @input="onDiscountPriceChanged"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>

export default {
  name: "AppointmentInsuranceBox",
  props: {
    totalPrice: {
      type: Number,
      default: 0
    },
    discountPrice: {
      type: Number,
      default: 0
    },
    insuranceId: {
      type: Number,
      default: 0
    },
    userInsuranceId: {
      type: Number,
      default: 0
    },
    userId: {
      type: Number,
      default: 0
    },
    insurance: {
      type: Object,
      default: null
    },
    insurancePrice: {
      type: Number,
      default: 0
    },
    patientPrice: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      total: this.totalPrice ?? 0,
      discount_price: this.discountPrice ?? 0,
      selectedInsurance: {
        id: this.userInsuranceId,
        percentage: this.insurance ? this.insurance.percentage : 0,
        name: this.insurance ? this.insurance.name : '',
      },
      user_insurances: [],
      free: {
        id: null,
        percentage: 0,
        name: 'آزاد',
      },
      insurance_price: 0,
      patient_price: 0,
    }
  },
  mounted() {
    this.getUserInsurances()
  },
  methods: {
    getUserInsurances() {
      this.$store.dispatch('insurances/getUserIndexInsurances', {
        id: this.userId,
      })
        .then(res => {
          this.user_insurances = [
            this.free,
            ...res.data.data,
          ]
          this.insurance_price = this.insurancePrice
          this.patient_price = this.patientPrice
        })
    },
    onInsuranceChanged(e) {
      this.discount_price = 0
      this.$emit('onInsuranceChanged', {
        insurance_id: null,
        user_insurance_id: this.selectedInsurance.id,
        insurance_price: parseFloat(this.insurance_price),
        patient_price: parseFloat(this.patient_price),
        total_price: parseFloat(this.total),
        discount_price: parseInt(this.discount_price),
      })
      this.insurance_price = this.total * this.selectedInsurance.percentage / 100
      this.patient_price = this.total - this.insurance_price - this.discount_price
    },
    onInsurancePriceChanged(val) {
      this.insurance_price = val
      this.patient_price = this.total - (parseInt(this.discount_price) + parseInt(val))
      this.$emit('onInsurancePriceChanges', {
        insurance_id: null,
        user_insurance_id: this.selectedInsurance.id,
        insurance_price: parseFloat(this.insurance_price),
        patient_price: parseFloat(this.patient_price),
        total_price: parseFloat(this.total),
        discount_price: parseInt(this.discount_price),
      })
    },
    onPatientPriceChanged(val) {
      this.patient_price = val
      this.insurance_price = this.total - (parseInt(this.discount_price) + parseInt(val))
      this.$emit('onInsurancePriceChanges', {
        insurance_id: null,
        user_insurance_id: this.selectedInsurance.id,
        insurance_price: parseFloat(this.insurance_price),
        patient_price: parseFloat(this.patient_price),
        total_price: parseFloat(this.total),
        discount_price: parseInt(this.discount_price),
      })
    },
    onDiscountPriceChanged(val) {
      if (val) {
        this.discount_price = val
        this.patient_price = this.total - parseInt(this.insurance_price) - parseInt(val)
        this.$emit('onInsurancePriceChanges', {
          insurance_id: null,
          user_insurance_id: this.selectedInsurance.id,
          insurance_price: parseFloat(this.insurance_price),
          patient_price: parseFloat(this.patient_price),
          total_price: parseFloat(this.total),
          discount_price: parseInt(this.discount_price),
        })
      }
    }
  },
  computed: {
    // insurance_price: {
    //   get() {
    //     return this.total * this.selectedInsurance.percentage / 100
    //   },
    //   set(val) {
    //
    //   }
    // },
    // patient_price() {
    //   return this.total - this.insurance_price - this.discount_price
    // }
  }
}

</script>

<style scoped lang="scss">

</style>
