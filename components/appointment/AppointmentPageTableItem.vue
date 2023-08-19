<template>
  <div
    class="table-appointment-component"
    :class="{'is-friday': isFriday, 'is-holiday': isHoliday, 'is-today': isToday}"
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
    caseType: {
      type: String,
      default: '',
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
