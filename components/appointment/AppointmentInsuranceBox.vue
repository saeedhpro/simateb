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
              sm="3"
            >
              <custom-price-input
                v-model="total"
                label="مبلغ کل"
                @input="onInsuranceChanged"
              />
            </v-col>
            <v-col
              cols="12"
              sm="3"
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
              sm="3"
            >
              <custom-price-input
                :disabled="true"
                v-model="insurance_price"
                label="سهم بیمه"
              />
            </v-col>
            <v-col
              cols="12"
              sm="3"
            >
              <custom-price-input
                :disabled="true"
                v-model="patient_price"
                label="سهم بیمار"
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
      default: 0
    },
  },
  data() {
    return {
      total: this.totalPrice,
      selectedInsurance: {
        id: this.userInsuranceId,
        percentage: this.insurance ? this.insurance.percentage : 0,
        name: this.insurance ? this.insurance.name : '',
      },
      user_insurances: []
    }
  },
  mounted() {
    this.getUserInsurances()
    console.log(this.selectedInsurance, "ins")
  },
  methods: {
    getUserInsurances() {
      this.$store.dispatch('insurances/getUserIndexInsurances', {
        id: this.userId,
      })
        .then(res => {
          this.user_insurances = res.data.data
        })
    },
    onInsuranceChanged(e) {
      this.$emit('onInsuranceChanged', {
        insurance_id: null,
        user_insurance_id: this.selectedInsurance.id,
        insurance_price: this.insurance_price,
        patient_price: this.patient_price,
        total_price: parseFloat(this.total),
      })
    }
  },
  computed: {
    insurance_price() {
      return this.total * this.selectedInsurance.percentage / 100
    },
    patient_price() {
      return this.total - this.insurance_price
    }
  }
}

</script>

<style scoped lang="scss">

</style>
