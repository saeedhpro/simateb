<template>
  <div class="medical-condition-component">
    <v-row>
      <v-col
        cols="12"
      >
        <div class="d-inline-flex flex-row flex-wrap justify-start items-center">
          <item-checkbox-component
            v-for="(i,n) in items"
            :key="n"
            v-model="selected"
            :label="i.label"
            :input-value="i.inputValue"
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <div class="create-update-model-input-box">
          <label>Adenoid & Tonsile Reduction</label>
          <input @input="onChanged" type="text" v-model="h.adenoid_tonsile_reduction">
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <div class="create-update-model-input-box">
          <label>Consumable Medicine</label>
          <input @input="onChanged" type="text" v-model="h.consumable_medicine">
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <div class="create-update-model-input-box">
          <label>General Health</label>
          <input @input="onChanged" type="text" v-model="h.general_health">
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <div class="create-update-model-input-box">
          <label>Under Physician Care</label>
          <input @input="onChanged" type="text" v-model="h.under_physician_care">
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <div class="create-update-model-input-box">
          <label>Accident to Head and Neck Area</label>
          <input @input="onChanged" type="text" v-model="h.accident_to_Head">
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <div class="create-update-model-input-box">
          <label>Operations</label>
          <input @input="onChanged" type="text" v-model="h.operations">
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <div class="create-update-model-input-box">
          <label>Others</label>
          <input @input="onChanged" type="text" v-model="h.others">
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ItemCheckboxComponent from "~/components/panel/profile/medical/ItemCheckboxComponent";

export default {
  name: "MedicalConditionComponent",
  components: {ItemCheckboxComponent},
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
          medical_condition: histories.medical_condition,
          adenoid_tonsile_reduction: histories.adenoid_tonsile_reduction,
          consumable_medicine: histories.consumable_medicine,
          general_health: histories.general_health,
          under_physician_care: histories.under_physician_care,
          accident_to_Head: histories.accident_to_Head,
          operations: histories.operations,
          others: histories.others,
        }
        this.selected = histories.medical_condition.length > 0 ? histories.medical_condition.split(',') : []
      }
    }, 250)
  },
  data() {
    return {
      h: {
        medical_condition: '',
        adenoid_tonsile_reduction: '',
        consumable_medicine: '',
        general_health: '',
        under_physician_care: '',
        accident_to_Head: '',
        operations: '',
        others: '',
      },
      status1: '0',
      selected: [],
      items: [
        {
          label: 'Heart Problem',
          inputValue: 'Heart Problem',
        },
        {
          label: 'Hepatitis',
          inputValue: 'Hepatitis',
        },
        {
          label: 'Thyroid',
          inputValue: 'Thyroid',
        },
        {
          label: 'Diabetes',
          inputValue: 'Diabetes',
        },
        {
          label: 'Hemophilia',
          inputValue: 'Hemophilia',
        },
        {
          label: 'Allergy',
          inputValue: 'Allergy',
        },
        {
          label: 'Asthma',
          inputValue: 'Asthma',
        },
        {
          label: 'Kidney',
          inputValue: 'Kidney',
        },
        {
          label: 'Epilepsy',
          inputValue: 'Epilepsy',
        },
      ],
    }
  },
  methods: {
    onChanged() {
      this.$emit('changed', this.h)
    }
  },
  watch: {
    selected(val) {
      this.h.medical_condition = this.selected.join(',')
      this.onChanged()
    }
  }
}
</script>

<style scoped>

</style>
