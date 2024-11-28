<template>
  <div class="treatment-component">
    <v-row>
      <v-col
        cols="12"
      >
        <div class="create-update-model-input-box">
          <label>Treatment plan</label>
          <textarea
            v-model="h.treatment_plan"
            rows="4"
          ></textarea>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-row>
          <v-col
            cols="12"
          >
            <span class="medical-sub-header">Preadolescent treatment plan</span>
          </v-col>
          <v-col
            cols="12"
          >
            <div class="flex flex-column treatment-list-box">
              <button
                @click="addToTreatmentPlan('Surgical Cl I Extraction')"
                class="treatment-button py-3 px-4"
              >
                Surgical Cl I Extraction
              </button>
              <button
                @click="addToTreatmentPlan('Surgical Cl I Nonextraction')"
                class="treatment-button py-3 px-4"
              >
                Surgical Cl I Nonextraction
              </button>
              <button
                @click="addToTreatmentPlan('Surgical Cl II Extraction')"
                class="treatment-button py-3 px-4"
              >
                Surgical Cl II Extraction
              </button>
              <button
                @click="addToTreatmentPlan('Surgical Cl II Nonextraction')"
                class="treatment-button py-3 px-4"
              >
                Surgical Cl II Nonextraction
              </button>
              <button
                @click="addToTreatmentPlan('Surgical Cl III Extraction')"
                class="treatment-button py-3 px-4"
              >
                Surgical Cl III Extraction
              </button>
              <button
                @click="addToTreatmentPlan('Surgical Cl III Nonextraction')"
                class="treatment-button py-3 px-4"
              >
                Surgical Cl III Nonextraction
              </button>
              <button
                @click="addToTreatmentPlan('Maxillary Expansion SARPE')"
                class="treatment-button py-3 px-4"
              >
                Maxillary Expansion SARPE
              </button>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-row>
          <v-col
            cols="12"
          >
            <span class="medical-sub-header">Fixed orthodontic treatment</span>
          </v-col>
          <v-col
            cols="12"
          >
            <div class="flex flex-column treatment-list-box">
              <button
                @click="addToTreatmentPlan('Nonsurgical Cl I Extraction')"
                class="treatment-button py-3 px-4"
              >
                Nonsurgical Cl I Extraction
              </button>
              <button
                @click="addToTreatmentPlan('Nonsurgical Cl I Nonextraction')"
                class="treatment-button py-3 px-4"
              >
                Nonsurgical Cl I Nonextraction
              </button>
              <button
                @click="addToTreatmentPlan('Nonsurgical Cl II Extraction')"
                class="treatment-button py-3 px-4"
              >
                Nonsurgical Cl II Extraction
              </button>
              <button
                @click="addToTreatmentPlan('Nonsurgical Cl II Nonextraction')"

                class="treatment-button py-3 px-4"
              >
                Nonsurgical Cl II Nonextraction
              </button>
              <button
                @click="addToTreatmentPlan('Nonsurgical CI III Nonextraction')"
                class="treatment-button py-3 px-4"
              >
                Nonsurgical CI III Nonextraction
              </button>
              <button
                @click="addToTreatmentPlan('Maxillary Expansion Hyrax')"
                class="treatment-button py-3 px-4"
              >
                Maxillary Expansion Hyrax
              </button>
              <button
                @click="addToTreatmentPlan('Adjunctive')"
                class="treatment-button py-3 px-4"
              >
                Adjunctive
              </button>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-row>
          <v-col
            cols="12"
          >
            <span class="medical-sub-header">Preadolescent treatment plan</span>
          </v-col>
          <v-col
            cols="12"
          >
            <div class="flex flex-column treatment-list-box"
            >
              <button
                @click="addToTreatmentPlan('Serial Extraction')"
                class="treatment-button py-3 px-4"
              >
                Serial Extraction
              </button>
              <button
                @click="addToTreatmentPlan('Space Regaining')"
                class="treatment-button py-3 px-4"
              >
                Space Regaining
              </button>
              <button
                @click="addToTreatmentPlan('space supervision')"
                class="treatment-button py-3 px-4"
              >
                space supervision
              </button>
              <button
                @click="addToTreatmentPlan('maxillary expansion')"
                class="treatment-button py-3 px-4"
              >
                maxillary expansion
              </button>
              <button
                @click="addToTreatmentPlan('Growth Modification Cl II Headgear')"
                class="treatment-button py-3 px-4"
              >
                Growth Modification Cl II Headgear
              </button>
              <button
                @click="addToTreatmentPlan('Growth Modification Cl II Functional')"
                class="treatment-button py-3 px-4"
              >
                Growth Modification Cl II Functional
              </button>
              <button
                @click="addToTreatmentPlan('Growth Modification Cl III')"
                class="treatment-button py-3 px-4"
              >
                Growth Modification Cl III
              </button>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
      >
        <div class="create-update-model-input-box">
          <label>Length of active treatment</label>
          <input @input="onChanged" type="text" v-model="h.length_active_treatment">
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <div class="create-update-model-input-box">
          <label>Retention</label>
          <input @input="onChanged" type="text" v-model="h.retention">
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <div class="create-update-model-input-box">
          <label>Prognosis</label>
          <input @input="onChanged" type="text" v-model="h.prognosis">
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <div class="create-update-model-input-box">
          <label>Consultation</label>
          <input @input="onChanged" type="text" v-model="h.consultation">
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <div class="create-update-model-input-box">
          <label>Charging</label>
          <input @input="onChanged" type="text" v-model="h.charging">
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "TreatmentComponent",
  props: {
    histories: {
      type: Object,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {
      const histories = this.histories;
      if (histories) {
        this.h = {
          ...histories,
          treatment_plan: histories.treatment_plan || '',
          retention: histories.retention,
          length_active_treatment: histories.length_active_treatment,
          prognosis: histories.prognosis,
          consultation: histories.consultation,
          charging: histories.charging,
        }
      }
    }, 250)
  },
  data() {
    return {
      h: {
        treatment_plan: '',
        retention: '',
        length_active_treatment: '',
        prognosis: '',
        consultation: '',
        charging: '',
      }
    }
  },
  methods: {
    addToTreatmentPlan(item) {
      let treatment_plan = this.h.treatment_plan && this.h.treatment_plan.length > 0 ? this.h.treatment_plan.split(' - ') : []
      treatment_plan.push(item)
      this.h.treatment_plan = treatment_plan.join(' - ')
      this.onChanged()
    },
    onChanged() {
      this.$emit('changed', this.h)
    }
  },
}
</script>

<style scoped>

</style>
