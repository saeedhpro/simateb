<template>
  <div class="table-appointment-component"
   :class="{
     'is-friday': isFriday,
     'is-holiday': isHoliday,
     'is-today': isToday,
     'is-reserved': isReserved,
     'is-accepted': isAccepted,
     'is-canceled': isCanceled,
     'is-waiting': isWaiting,
     'is-time-based': isTimeBased,
   }">
    <div class="full-name">
      {{ userFullName }}
    </div>
    <div class="start-at">
      {{ startAtTimeFa }}
    </div>
    <div class="case-type" v-if="caseType">
      {{ caseType }}
    </div>
    <div v-if="isVip" class="vip-tag">
      VIP
    </div>
<!--    <div class="start-at" v-if="isFriday">-->
<!--      {{ index + 1 }}-->
<!--    </div>-->
  </div>
</template>
<script>
export default {
  name: "AppointmentPageTableItem",
  props: {
    startAtTimeFa: {
      type: String,
      default: null,
    },
    userFullName: {
      type: String,
      default: null,
    },
    holidayTitle: {
      type: String | null,
      default: '',
    },
    caseType: {
      type: String,
      default: '',
    },
    isVip: {
      type: Boolean | Number,
      default: false,
    },
    isToday: {
      type: Boolean,
      default: false,
    },
    isFriday: {
      type: Boolean,
      default: false,
    },
    isHoliday: {
      type: Boolean,
      default: false,
    },
    isTimeBased: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 0,
      required: false,
    },
    status: {
      type: Number,
      default: 0,
      required: false,
    },
    waiting: {
      type: Boolean | Number,
      default: false,
      required: false,
    },
  },
  computed: {
    isReserved() {
      return this.status == 1
    },
    isAccepted() {
      return this.status == 2
    },
    isCanceled() {
      return this.status == 3
    },
    isWaiting() {
      return this.waiting
    },
  }
}
</script>
<style scoped></style>
