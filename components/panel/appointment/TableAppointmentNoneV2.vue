<template>
  <div
    class="table-appointment-none"
    :class="{'is-friday': isFriday}"
  >
    <div
      class="time"
      v-if="showHour && !isFriday"
    >
      {{ startAt  }}
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
  name: "TableAppointmentNoneV2",
  props: {
    startAt: {
      type: String,
      default: '',
    },
    showHour: {
      type: Boolean,
      default: false,
    },
    isFriday: {
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
