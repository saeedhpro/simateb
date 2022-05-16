<template>
  <div
    class="table-appointment-component"
    :class="{'is-friday': isFriday, 'is-holiday': isHoliday}"
  >
    <div
      class="full-name"
    >
      {{ fullName | toPersianNumber }}
    </div>
    <div
      class="start-at"
    >
      {{ startAt | toPersianNumber }}
    </div>
    <div
      class="case-type"
    >
      {{ caseType | toPersianNumber }}
    </div>
  </div>
</template>

<script>
import moment from "jalali-moment";

export default {
  name: "TableAppointmentComponent",
  props: {
    item: {
      type: Object,
      default: null,
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
  },
  computed: {
    fullName() {
      return this.item.user ? `${this.item.user.fname} ${this.item.user.lname}` : ''
    },
    startAt() {
      return this.$moment(this.item.start_at).format("HH:mm")
    },
    caseType() {
      return this.item.case_type || ''
    },
    isFriday() {
      const today = moment.from(`${this.year}/${this.month}/${this.day}`, "fa", "YYYY/MM/DD").locale("fa").format("dddd");
      return today === 'جمعه' || today === 'Friday';
    },
    isHoliday() {
      if (this.holidays.length < 1) {
        return false
      } else {
        for (let i = 0; i < this.holidays.length; i++) {
          const hdate = this.holidays[i].hdate
          const date = this.$moment(hdate).format("jYYYY/jMM/jDD")
          const thisDate = moment.from(`${this.year}/${this.month}/${this.day}`, "fa", "YYYY/MM/DD").format("jYYYY/jMM/jDD")
          if (date === thisDate){
            return true
          }
        }
        return false
      }
    },
    holidays() {
      return this.$store.getters['holidays/getHolidays']
    }
  }
}
</script>

<style scoped>

</style>
