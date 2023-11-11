<template>
  <div
    class="table-appointment-none"
    :class="{
      'is-friday': isFriday,
      'is-holiday': isHoliday,
      'is-today': isToday,
      'show-hour': showHour,
      'is-time-based': isTimeBased,
    }"
  >
    <div
      class="time"
      v-if="showHour && !isFriday"
    >
      {{ startAtTimeFa  }}
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
export default {
  name: "AppointmentPageTableEmptyItem",
  props: {
    startAtTimeFa: {
      type: String,
      default: null,
    },
    holidayTitle: {
      type: String | null,
      default: '',
    },
    showHour: {
      type: Boolean,
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
  },
}
</script>
<style scoped>

</style>
