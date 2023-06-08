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
  name: "TableAppointmentNoneV2",
  props: {
    startAt: {
      type: String,
      default: '',
    },
    showHour: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<style scoped>

</style>
