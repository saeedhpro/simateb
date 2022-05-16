<template>
  <div class="profile-appointment-item-component">
    <v-row>
      <v-col
        cols="12"
        sm="4"
        md="2"
      >
        <div class="img-box">
          <button
            class="edit-button"
          >
            ویرایش
          </button>
        </div>
      </v-col>

      <v-col
        cols="12"
        sm="8"
        md="10"
      >
        <div class="appointment-details">
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <div class="time-box">
                <span>{{ created_at | toRelativeDate }}</span>
                <span><span class="circle"></span>{{ created_at | toPersianDate('YYYY/MM/DD') }}<span
                  class="circle"></span></span>
                <span
                  class="status-box"
                  :style="{
                  'background-color': `${statuses[status - 1].background}`,
                  'color': `${statuses[status - 1].color}`
                }"
                >{{ statuses[status - 1].title }}</span>
              </div>
              <div class="case-type" v-if="caseType">
                علت مراجعه: <span>{{ caseType }}</span>
              </div>
              <div class="code" v-if="info">
                توضیحات پذیرش: <span>{{ info }}</span>
              </div>
              <div class="code" v-if="code">
                کد پذیرش: <span>{{ code }}</span>
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
                  {{ p }}
                </span>
              </div>
              <div class="prescription-box" v-if="radiologyCases">
                رادیولوژی:
                <span
                  v-for="(p, n) in radiologyCasesArray"
                  :key="n"
                  class="prescription radiology"
                >
                  {{ p }}
                </span>
              </div>
              <div class="prescription-box" v-if="photographyCases">
                فوتوگرافی:
                <span
                  v-for="(p, n) in photographyCasesArray"
                  :key="n"
                  class="prescription photography"
                >
                  {{ p }}
                </span>
              </div>
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
    created_at: {
      type: String,
      required: true,
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
          title: 'کنسل',
          color: '#F44336',
          background: '#FFEDEB'
        },
        {
          id: 4,
          title: 'عدم حضور',
          color: '#424242',
          background: '#F1F2F5'
        }
      ],
    }
  },
  computed: {
    prescriptionArray() {
      return this.prescription.length ? this.prescription.split(' - ') : []
    },
    radiologyCasesArray() {
      return this.radiologyCases.length ? this.radiologyCases.split(',') : []
    },
    photographyCasesArray() {
      return this.photographyCases.length ? this.photographyCases.split(',') : []
    },
  }
}
</script>

<style scoped>

</style>
