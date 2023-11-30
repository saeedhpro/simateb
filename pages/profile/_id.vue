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
              نتایج فتوگرافی
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
            <v-tab
              class="insurance-tab"
              v-if="canSee('doctor')"
            >
              <img src="/images/profile/pay.svg">
              اطلاعات بیمه
            </v-tab>
          </v-tabs>
        </v-container>
        <div
          class="profile-tabs-box"
        >
          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <appointment-list-component
                :user-id="user.id"
              />
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
              <send-documents-component
                :user-id="user.id"
              />
            </v-tab-item>
            <v-tab-item v-if="canSee('doctor')">
              <user-payment-component
                :user-id="user.id"
                :due-payment="user.due_payment"
                :organization-id="user.organization_id"
                :fullName="`${user.fname} ${user.lname}`"
              />
            </v-tab-item>
            <v-tab-item v-if="canSee('doctor')">
              <user-insurance-component
                :user-id="user.id"
              />
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-col>
    </v-row>
    <update-user-form-component
      :item="user"
      :open="showUpdateModal"
      @close="closeUpdateModal"
    />
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
import UserDerailsComponent from "~/components/panel/profile/user/UserDerailsComponent";
import UserPaymentComponent from "~/components/panel/profile/payments/UserPaymentComponent";
import DeleteUserModalComponent from "~/components/global/delete/DeleteUserModalComponent";
import UserInsuranceComponent from "~/components/panel/profile/insurance/UserInsuranceComponent.vue";

export default {
  name: "profile.vue",
  layout: "panel",
  middleware: "auth",
  components: {
    UserInsuranceComponent,
    DeleteUserModalComponent,
    UserPaymentComponent,
    UserDerailsComponent,
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
      this.$store.dispatch('users/createUserMedicalHistory', {
        ...this.medicalHistory,
        user_id: parseInt(this.$route.params.id),
      })
        .finally(() => {
          this.toggleHistoryModal()
        })
    },
    getMedicalHistory() {
      return this.$store.dispatch('users/getMedicalHistory', this.$route.params.id)
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
          this.$router.go(-1)
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
    },
    canSee(tabName) {
      if (!this.loginUser.organization) return false
      const professionID = this.loginUser.organization.profession_id
      switch (tabName) {
        case 'photography':
          return professionID != 2 && professionID != 3
        case 'laboratory':
          return professionID != 1 && professionID != 3
        case 'radiology':
          return professionID != 1 && professionID != 2
        case 'doctor':
          return professionID != 1 && professionID != 2 && professionID != 3
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
