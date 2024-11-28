<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="1056px"
  >
    <v-card
      class="create-update-modal medical"
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
          <span>تاریخچه درمان</span>
        </div>
        <v-spacer/>
        <div class="create-update-modal-regbox">
          {{ user ? `${user.fname} ${user.lname}` : '' }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-tabs
                v-model="tab"
                centered
                class="medical-tabs-header dir-ltr"
              >
                <v-tab
                  class="medical-tab"
                >
                  Medical Condition
                </v-tab>
                <v-tab
                  class="medical-tab"
                >
                  Dental Examination
                </v-tab>
                <v-tab
                  class="medical-tab"
                >
                  Occlusal Examination
                </v-tab>
                <v-tab
                  class="medical-tab"
                >
                  Treatment
                </v-tab>
              </v-tabs>
              <div
                class="medical-tabs-box"
              >
                <v-tabs-items v-model="tab">
                  <v-tab-item>
                    <medical-condition-component @changed="onChanged" :histories="medicalHistory"/>
                  </v-tab-item>
                  <v-tab-item>
                    <dental-examination-component @changed="onChanged" :histories="medicalHistory"/>
                  </v-tab-item>
                  <v-tab-item>
                    <occlusal-examination-component @changed="onChanged" :histories="medicalHistory"/>
                  </v-tab-item>
                  <v-tab-item>
                    <treatment-component @changed="onChanged" :histories="medicalHistory"/>
                  </v-tab-item>
                </v-tabs-items>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            ></v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-spacer/>
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
            <v-col
              cols="12"
              sm="4"
              md="4"
            >
              <button
                class="main-button"
                @click="updateMedicalHistory"
              >
                ذخیره
              </button>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import MedicalConditionComponent from "~/components/panel/profile/medical/MedicalConditionComponent";
import DentalExaminationComponent from "~/components/panel/profile/medical/DentalExaminationComponent";
import OcclusalExaminationComponent from "~/components/panel/profile/medical/OcclusalExaminationComponent";
import TreatmentComponent from "~/components/panel/profile/medical/TreatmentComponent";

export default {
  name: "UserMedicalHistoryComponent",
  components: {TreatmentComponent, OcclusalExaminationComponent, DentalExaminationComponent, MedicalConditionComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      tab: null,
      histories: [],
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    updateMedicalHistory() {
      this.saveMedicalHistory()
    },
    saveMedicalHistory() {
      const data = {
        ...this.medicalHistory,
        user_id: parseInt(this.user.id),
      }
      console.log(data)
      this.$store.dispatch('users/createUserMedicalHistory', data)
        .finally(() => {
          this.close()
        })
    },
    onChanged(item) {
      const h = {
        ...this.histories,
        ...item
      }
      this.$store.dispatch('users/setUserMedicalHistory', h)
    },
  },
  computed: {
    show: {
      get() {
        return this.open;
      },
      set(val) {
        console.log(val)
      }
    },
    medicalHistory: {
      get() {
        return this.$store.getters['users/getMedicalHistory']
      },
      set(val) {
        console.log(val)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.medical-tab {
  transition: all 0.3s ease-in-out;
  &.v-tab--active, &:hover {
    background: #F6F7FF 0 0 no-repeat padding-box;
    border: 1px solid #5063FF;
    transition: all 0.3s ease-in-out;
    outline: none !important;
  }
}
</style>
