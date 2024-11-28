<template>
  <div v-if="show">
    <v-dialog
      v-model="show"
      persistent
      max-width="1056px"
    >
      <v-card
        class="create-update-modal"
      >
        <v-card-title
          class="create-update-modal-title-box"
        >
          <div class="create-update-modal-title">
            <button
              @click="close"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>اقدامات</span>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row dir="ltr">
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="items-box">
                  <prescription-action-form-component
                    title="Retraction & protraction"
                    :items="retractionProtractionList"
                    @selected="addToDoctorDo"
                  />
                  <prescription-action-form-component
                    title="Elastic Therapy"
                    :items="elasticTherapyList"
                    @selected="addToDoctorDo"
                  />
                  <prescription-action-form-component
                    title="Final evaluation"
                    :items="finalEvaluationList"
                    @selected="addToDoctorDo"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="items-box">
                  <prescription-action-form-component
                    title="Appliance adjustment"
                    :items="applianceAdjustmentList"
                    @selected="addToDoctorDo"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="items-box">
                  <prescription-action-form-component
                    title="primary evaluation"
                    :items="primaryEvaluationList"
                    @selected="addToDoctorDo"
                  />
                  <prescription-action-form-component
                    title="Multi loop wire"
                    :items="multiLoopWireList"
                    @selected="addToDoctorDo"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <wire-box-component
                  @selected="addToDoctorDo"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="3"
                md="3"
              >
                <button
                  class="second-button full-width"
                  @click="close"
                >
                  بستن
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

import PrescriptionActionFormComponent
  from "~/components/panel/appointment/AppointmentForm/PrescriptionActionFormComponent.vue";
import WireBoxComponent from "~/components/panel/appointment/AppointmentForm/WireBoxComponent.vue";

export default {
  name: "AppointmentPageDoctorPrescriptionModal",
  components: {WireBoxComponent, PrescriptionActionFormComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'prescription'
    },
    prescription: {
      type: String,
      default: '',
    },
    futurePrescription: {
      type: String,
      default: '',
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    addToDoctorDo(item) {
      let prescription = ''
      if (this.type == 'prescription') {
        const array = this.prescription.trim().split(' - ')
        if (array[0] == '') {
          array[0] = item
        } else {
          array.push(item)
        }
        prescription = array.length == 1 ? array.join('') : array.join(' - ')
      } else if ((this.type == 'future_prescription')) {
        const array = this.futurePrescription.trim().split(' - ')
        if (array[0] == '') {
          array[0] = item
        } else {
          array.push(item)
        }
        prescription = array.length == 1 ? array.join('') : array.join(' - ')
      }
      this.$emit('done', {
        type: this.type,
        prescription: prescription,
      })
    },
  },
  computed: {
    show() {
      return this.open
    },
    retractionProtractionList() {
      return [
        {
          title: 'Anterior Retraction Loop 14',
          action: 'Anterior Retraction'
        },
        {
          title: 'Canin Retraction',
          action: 'Canin Retraction'
        },
        {
          title: 'posterior protraction',
          action: 'posterior protraction'
        },
      ]
    },
    elasticTherapyList() {
      return [
        {
          title: 'CII',
          action: 'CII'
        },
        {
          title: 'CIII',
          action: 'CIII'
        },
        {
          title: 'Box',
          action: 'Box'
        },
        {
          title: 'Criss Cross',
          action: 'Criss Cross'
        },
      ]
    },
    finalEvaluationList() {
      return [
        {
          title: 'Debond',
          action: 'Debond'
        },
        {
          title: 'Retainer Delivery',
          action: 'Retainer Delivery'
        },
      ]
    },
    applianceAdjustmentList() {
      return [
        {
          title: 'Band & Bond',
          action: 'Band & Bond'
        },
        {
          title: 'Midline Screw Expansion',
          action: 'Midline Screw Expansion'
        },
        {
          title: 'Appliance Delivery',
          action: 'Appliance Delivery'
        },
        {
          title: 'Appliance Adjustment',
          action: 'Appliance Adjustment'
        },
        {
          title: 'Hawley Z Spring',
          action: 'Hawley Z Spring'
        },
        {
          title: 'Lingual Arch',
          action: 'Lingual Arch'
        },
        {
          title: 'Quad Helix',
          action: 'Quad Helix'
        },
        {
          title: 'W Arch',
          action: 'W Arch'
        },
        {
          title: 'TPT',
          action: 'TPT'
        },
        {
          title: 'Spring Activation',
          action: 'Spring Activation'
        },
        {
          title: 'Rapid Palatal Expansion',
          action: 'Rapid Palatal Expansion'
        },
      ]
    },
    primaryEvaluationList() {
      return [
        {
          title: 'Clinical Examination',
          action: 'Clinical Examination'
        },
        {
          title: 'Doucumentation',
          action: 'Doucumentation'
        },
        {
          title: 'Consultation',
          action: 'Consultation'
        },
        {
          title: 'Radiography',
          action: 'Radiography'
        },
        {
          title: 'Photography',
          action: 'Photography'
        },
        {
          title: 'Impression',
          action: 'Impression'
        },
      ]
    },
    multiLoopWireList() {
      return [
        {
          title: 'Multil Loop 14',
          action: 'Multil Loop 14'
        },
        {
          title: 'Multil Loop 16',
          action: 'Multil Loop 16'
        },
        {
          title: 'Multil Loop 18',
          action: 'Multil Loop 18'
        },
      ]
    },
  }
}
</script>
<style scoped>

</style>
