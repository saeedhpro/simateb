<template>
  <div class="profile-page" v-if="user">
    <v-row>
      <v-col
        cols="12"
      >
        <show-user-derails-component
          :user="user"
          @updated="getUser"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <v-container>
          <v-tabs
            v-model="tabs"
            centered
            class="profile-tabs-header"
          >
            <v-tab
              class="profile-tab"
            >
              <img src="/images/profile/list.svg">
              لیست پذیرش ها
            </v-tab>
            <v-tab
              class="profile-tab"
              v-if="canSee('radiology')"
            >
              <img src="/images/profile/radio.svg">
              نتایج رادیولوژی
            </v-tab>
            <v-tab
              class="profile-tab"
              v-if="canSee('photography')"
            >
              <img src="/images/profile/photo.svg">
              نتایج فوتوگرافی
            </v-tab>
            <v-tab
              class="profile-tab"
              v-if="canSee('doctor')"
            >
              <img src="/images/profile/doc.svg">
              ارسال مستندات
            </v-tab>
            <v-tab
              class="profile-tab"
              v-if="canSee('doctor')"
            >
              <img src="/images/profile/pay.svg">
              پرداخت ها
            </v-tab>
          </v-tabs>
        </v-container>
        <div
          class="profile-tabs-box"
        >
          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <appointment-list-component :user-id="user.id"/>
            </v-tab-item>
            <v-tab-item v-if="canSee('radiology')">
              <radiology-list-component
                :user-id="user.id"
              />
            </v-tab-item>
            <v-tab-item v-if="canSee('photography')">
              <photography-list-component
                :user-id="user.id"
              />
            </v-tab-item>
            <v-tab-item v-if="canSee('doctor')">
              <send-documents-component :user-id="user.id"/>
            </v-tab-item>
            <v-tab-item v-if="canSee('doctor')">
              <div class="hi">Salam 3</div>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
    </v-row>
    <v-dialog
      v-model="showHistoryModal"
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
              @click="toggleHistoryModal"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>تاریخچه درمان</span>
          </div>
          <v-spacer/>
          <div class="create-update-modal-regbox">
            {{ `${loginUser.fname} ${loginUser.staff.lname}` }}
          </div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-tabs
                  v-model="mTabs"
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
                  <v-tabs-items v-model="mTabs">
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
                  class="second-button"
                  @click="toggleHistoryModal"
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
    <v-dialog
      v-model="showDelete"
      max-width="680"
    >
      <v-card
        class="accept-file-remove-model"
      >
        <button
          class="close"
          @click="remove"
        >
          <v-icon>mdi-close</v-icon>
        </button>
        <v-card-title class="accept-file-remove-title">
          <span>حذف کاربر</span>
        </v-card-title>

        <v-card-text
          class="accept-file-remove-text"
        >
          آیا از حذف کردن این کاربر اطمینان دارید؟<br/>
          لطفا دقت کنید که پس از حذف، اطلاعات کاربر قابل بازگشت نیست
        </v-card-text>

        <v-card-actions>
          <button
            class="action-button accept-button"
            @click="remove"

          >
            خیر
          </button>
          <v-spacer></v-spacer>
          <button
            class="action-button red-button"
            @click="deleteUser"
          >
            بله، حذف کن
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <update-user-form-component
      :item="user"
      :open="showUpdateModal"
      @close="closeUpdateModal"
    />
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import AppointmentListComponent from "~/components/panel/profile/appointments/AppointmentListComponent";
import SendDocumentsComponent from "~/components/panel/profile/documents/SendDocumentsComponent";
import MedicalConditionComponent from "~/components/panel/profile/medical/MedicalConditionComponent";
import DentalExaminationComponent from "~/components/panel/profile/medical/DentalExaminationComponent";
import OcclusalExaminationComponent from "~/components/panel/profile/medical/OcclusalExaminationComponent";
import TreatmentComponent from "~/components/panel/profile/medical/TreatmentComponent";
import PhotographyListComponent from "~/components/panel/profile/photography/PhotographyListComponent";
import RadiologyListComponent from "~/components/panel/profile/radiology/RadiologyListComponent";
import UpdateUserFormComponent from "~/components/panel/profile/user/UpdateUserFormComponent";
import ShowUserDerailsComponent from "~/components/panel/profile/user/ShowUserDerailsComponent";

export default {
  name: "profile.vue",
  layout: "panel",
  middleware: "auth",
  components: {
    ShowUserDerailsComponent,
    UpdateUserFormComponent,
    RadiologyListComponent,
    PhotographyListComponent,
    TreatmentComponent,
    OcclusalExaminationComponent,
    DentalExaminationComponent,
    MedicalConditionComponent,
    SendDocumentsComponent,
    AppointmentListComponent
  },
  mounted() {
    this.getUser()
  },
  data() {
    return {
      tabs: null,
      mTabs: null,
      overlay: false,
      showDelete: false,
      showHistoryModal: false,
      showUpdateModal: false,
    }
  },
  methods: {
    showUpdate() {
      this.toggleShowUpdateModal()
    },
    closeUpdateModal() {
      this.getUser(this.$route.params.id)
      this.toggleShowUpdateModal()
      this.item = null
    },
    toggleShowUpdateModal() {
      this.showUpdateModal = !this.showUpdateModal
    },
    toggleOverLay() {
      this.overlay = !this.overlay
    },
    showMedicalHistory() {
      this.getMedicalHistory()
      this.toggleHistoryModal()
    },
    toggleHistoryModal() {
      this.showHistoryModal = !this.showHistoryModal
    },
    updateMedicalHistory() {
      this.saveMedicalHistory()
    },
    saveMedicalHistory() {
      this.toggleOverLay()
      this.$store.dispatch('users/createUserMedicalHistory', {
        ...this.medicalHistory,
        user_id: parseInt(this.$route.params.id),
      })
        .finally(() => {
          this.toggleHistoryModal()
          this.toggleOverLay()
        })
    },
    async getMedicalHistory() {
      this.toggleOverLay()
      this.$store.dispatch('users/getMedicalHistory', this.$route.params.id)
        .finally(() => {
          this.toggleOverLay()
        })
      return Promise.resolve()
    },
    getUser() {
      this.$store.dispatch('users/getUser', this.$route.params.id)
    },
    remove() {
      this.showDelete = !this.showDelete
    },
    deleteUser() {
      this.$store.dispatch('users/removeUser', this.user.id)
        .then(() => {
          this.$router.push({
            path: '/organization',
          })
        })
        .catch(err => {

        })
    },
    canSee(tabName) {
      if (!this.loginUser.organization) return false
      const professionID = this.loginUser.organization.profession_id
      switch (tabName) {
        case 'photography':
          return professionID !== 2 && professionID !== 3
        case 'laboratory':
          return professionID !== 1 && professionID !== 3
        case 'radiology':
          return professionID !== 1 && professionID !== 2
        case 'doctor':
          return professionID !== 1 && professionID !== 2 && professionID !== 3
      }
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
    user() {
      return this.$store.getters['users/getUser']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
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

<style scoped>

</style>
