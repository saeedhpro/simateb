<template>
  <div class="profile-appointment-item-component">
    <v-row>
      <v-col
        cols="12"
        sm="4"
        md="2"
        v-if="forOrganization"
      >
        <div class="img-box">
          <span class="item-index">{{ index + 1 | persianDigit }}</span>
          <button
            class="edit-button"
            @click="openUpdateModal"
          >
            ویرایش
          </button>
        </div>
      </v-col>

      <v-col
        cols="12"
        :sm="forOrganization ? 8 : 12"
        :md="forOrganization ? 10 : 12"
      >
        <div class="appointment-details">
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <div class="time-box">
                <span>
                  {{
                    $moment.utc(start_at).local().format("YYYY/MM/DD HH:mm:ss") | toRelativeDate
                  }}
                </span>
                <span>
                  <span class="circle"/>
                  {{ $moment.utc(start_at).local().format("YYYY/MM/DD HH:mm:ss") | toPersianDate('YYYY/MM/DD') }}
                  <span class="circle"/>
                </span>
                <span
                  v-if="resulted"
                  class="status-box resulted"
                >نتایج ارسال شده</span>
                <span
                  v-else-if="waiting"
                  class="status-box waiting"
                >در انتظار مراجعه</span>
                <span
                  v-else
                  class="status-box"
                  :style="{
                  'background-color': `${statuses[status - 1].background}`,
                  'color': `${statuses[status - 1].color}`
                }"
                >{{ statuses[status - 1].title | toPersianNumber }}</span>
              </div>
              <div class="case-type" v-if="caseType">
                علت مراجعه: <span>{{ caseType | toPersianNumber }}</span>
              </div>
              <div class="code" v-if="info">
                توضیحات پذیرش: <span>{{ info | toPersianNumber }}</span>
              </div>
              <div class="code" v-if="code">
                کد پذیرش: <span>{{ code | toPersianNumber }}</span>
              </div>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <div class="prescription-box">
                اقدامات و دستورات پزشک:
                <span
                  v-for="(p, n) in prescriptionArray"
                  :key="n"
                  class="prescription"
                >
                  {{ p | toPersianNumber }}
                </span>
              </div>
              <div class="prescription-box" v-if="radiologyCases">
                رادیولوژی:
                <span
                  v-for="(p, n) in radiologyCasesArray"
                  :key="n"
                  class="prescription radiology"
                >
                  {{ p | toPersianNumber }}
                </span>
              </div>
              <div class="prescription-box" v-if="photographyCases">
                فوتوگرافی:
                <span
                  v-for="(p, n) in photographyCasesArray"
                  :key="n"
                  class="prescription photography"
                >
                  {{ p | toPersianNumber }}
                </span>
              </div>
              <v-container fluid>
                <v-row>
                  <v-col
                    cols="12"
                    sm="4"
                    md="2"
                    v-for="(i,n) in radiologyResultList"
                    :key="n"
                  >
                    <img class="prescription-image" :src="i" alt="">
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AppointmentItemComponent",
  props: {
    index: {
      type: Number,
      required: true,
    },
    created_at: {
      type: String,
      required: true,
    },
    start_at: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    organizationId: {
      type: Number,
      required: true,
    },
    radiologyId: {
      type: Number,
    },
    photographyId: {
      type: Number,
    },
    pAdmissionAt: {
      type: String,
    },
    pResultAt: {
      type: String,
    },
    rAdmissionAt: {
      type: String,
    },
    rResultAt: {
      type: String,
    },
    status: {
      type: Number,
      required: true,
    },
    caseType: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    prescription: {
      type: String,
      required: true,
    },
    radiologyCases: {
      type: String,
      required: true,
    },
    photographyCases: {
      type: String,
      required: true,
    },
    waiting: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      statuses: [
        {
          id: 1,
          title: 'رزرو شده',
          color: '#F5AC00',
          background: '#FFF9EB'
        },
        {
          id: 2,
          title: 'پذیرش شده',
          color: '#293366',
          background: '#EBEDFF'
        },
        {
          id: 3,
          title: 'کنسل شده',
          color: '#F44336',
          background: '#FFEDEB'
        },
        {
          id: 4,
          title: 'عدم حضور',
          color: '#424242',
          background: '#F1F2F5'
        },
        {
          id: 5,
          title: 'در انتظار',
          color: '#F5AC00',
          background: '#FFF9EB'
        }
      ],
      radiologyResultList: [],
      photographyResultList: [],
    }
  },
  mounted() {
    this.getResults()
  },
  methods: {
    getResults() {
      let type = ''
      type = "radiology"
      this.$store.dispatch('appointments/getAppointmentResults', {
        id: this.id,
        type: type
      })
        .then((res) => {
          this.radiologyResultList = res.data
        })
        .catch(err => {
          console.log(err, "error")
        })
      type = "photography"
      this.$store.dispatch('appointments/getAppointmentResults', {
        id: this.id,
        type: type
      })
        .then((res) => {
          this.photographyResultList = res.data
        })
      .catch(err => {
        console.log(err, "error")
      })
    },
    openUpdateModal() {
      this.$emit('updated')
    }
  },
  computed: {
    prescriptionArray() {
      return this.prescription && this.prescription.length ? this.prescription.split(' - ') : []
    },
    radiologyCasesArray() {
      return this.radiologyCases && this.radiologyCases.length ? this.radiologyCases.split(',') : []
    },
    photographyCasesArray() {
      return this.photographyCases && this.photographyCases.length ? this.photographyCases.split(',') : []
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    forOrganization() {
      const orgID = this.loginUser.organization_id
      return this.loginUser.is_admin || orgID == this.organizationId || orgID == this.radiologyId || orgID == this.photographyId
    },
    resulted() {
      const profession_id = this.loginUser.organization.profession_id;
      if (profession_id == 1) {
        return this.pAdmissionAt !== "" && this.pResultAt !== "" && this.pAdmissionAt != null && this.pResultAt != null
      } else if (profession_id == 3) {
        return this.rAdmissionAt !== "" && this.rResultAt !== "" && this.rAdmissionAt != null && this.rResultAt != null
      } else {
        return this.pAdmissionAt !== "" && this.pResultAt !== "" ||
          this.pAdmissionAt != null && this.pResultAt != null ||
          this.rAdmissionAt !== "" && this.rResultAt !== "" ||
          this.rAdmissionAt != null && this.rResultAt != null;
      }
    },
    admissioned() {
      const profession_id = this.loginUser.organization.profession_id;
      if (profession_id == 1) {
        return this.pAdmissionAt != "" && this.pAdmissionAt != null
      } else if (profession_id == 3) {
        return this.rAdmissionAt != "" && this.rAdmissionAt != null
      }
      return this.pAdmissionAt != "" && this.pAdmissionAt != null ||
        this.rAdmissionAt != "" && this.rAdmissionAt != null;
    }
  }
}
</script>

<style scoped>

</style>
