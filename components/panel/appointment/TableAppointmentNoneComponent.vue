<template>
  <div
    class="table-appointment-none"
  >
    <div
      class="time"
      v-if="showHour"
    >
      {{ startAt  }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TableAppointmentNoneComponent",
  props: {
    startAt: {
      type: String,
      default: '',
    },
    showHour: {
      type: Boolean,
      default: false,
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
}
</script>

<style scoped>

</style>
