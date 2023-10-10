<template>
  <div class="insurance-box-component">
    <v-expansion-panels flat>
      <v-expansion-panel
        class="wire-box"
      >
        <v-expansion-panel-header
          class="wire-box-header"
        >
          بیمه
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-0">
          <v-row>
            <v-col
              cols="12"
              sm="4"
            >
              <div class="create-update-model-input-box">
                <label>بیمه</label>
                <v-select
                  outlined
                  :items="ownInsurances"
                  item-value="id"
                  item-text="name"
                  :return-object="true"
                  height="32px"
                  dense
                  v-model="selectedInsurance"
                  @change="onInsuranceChanged"
                ></v-select>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <custom-price-input
                :disabled="true"
                v-model="insurance_price"
                label="سهم بیمه"
              />
            </v-col>
            <v-col
              cols="12"
              sm="4"
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
    total: {
      type: Number,
      default: 0
    },
    insuranceId: {
      type: Number,
      default: 0
    },
    insurance: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      selectedInsurance: {
        id: this.insuranceId,
        percentage: this.insurance ? this.insurance.percentage : 0,
        name: this.insurance ? this.insurance.name : '',
      }
    }
  },
  mounted() {
    this.getOwnInsurances()
  },
  methods: {
    getOwnInsurances() {
      this.$store.dispatch('insurances/getOwnInsurances', {})
    },
    onInsuranceChanged(e) {
      this.$emit('onInsuranceChanged', {
        insurance_id: e.id,
        insurance_price: this.insurance_price,
        patient_price: this.patient_price,
      })
    }
  },
  computed: {
    ownInsurances() {
      return this.$store.getters['insurances/getOwnInsurances']
    },
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
