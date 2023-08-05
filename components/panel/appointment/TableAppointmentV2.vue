<template>
  <div
    class="table-appointment-component"
    :class="{'is-friday': isFriday, 'is-holiday': isHoliday}"
  >
    <div
      class="full-name"
    >
      {{ userFullName }}
    </div>
    <div
      class="start-at"
    >
      {{ startAtTimeFa }}
    </div>
    <div
      class="case-type"
    >
      {{ caseType }}
    </div>
    <div
      class="start-at"
      v-if="isFriday"
    >
      {{ index + 1 }}
    </div>
  </div>
</template>

<script>
import moment from "jalali-moment";

export default {
  name: "TableAppointmentV2",
  props: {
    startAtTimeFa: {
      type: String,
      default: null,
    },
    userFullName: {
      type: String,
      default: null,
    },
    caseType: {
      type: String,
      default: '',
    },
    day: {
      type: Number,
      default: 1,
      required: true,
    },
    month: {
      type: Number,
      default: 1,
      required: true,
    },
    year: {
      type: Number,
      default: 1398,
      required: true,
    },
    isFriday: {
      type: Boolean,
      default: false,
    },
    isHoliday: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  computed: {
    // isFriday() {
    //   const today = moment.from(`${this.year}/${this.month}/${this.day}`, "fa", "YYYY/MM/DD").local().format("dddd");
    //   return today === 'جمعه' || today === 'Friday';
    // },
    // isHoliday() {
    //   if (this.holidays.length < 1) {
    //     return false
    //   } else {
    //     for (let i = 0; i < this.holidays.length; i++) {
    //       const hdate = this.holidays[i].hdate
    //       const date = this.$moment.utc(hdate).local().format("jYYYY/jMM/jDD")
    //       const thisDate = moment.from(`${this.year}/${this.month}/${this.day}`, "fa", "YYYY/MM/DD").local().format("jYYYY/jMM/jDD")
    //       if (date === thisDate){
    //         return true
    //       }
    //     }
    //     return false
    //   }
    // },
    // holidays() {
    //   return this.$store.getters['holidays/getHolidays']
    // }
  }
}
</script>

<style scoped>

</style>
