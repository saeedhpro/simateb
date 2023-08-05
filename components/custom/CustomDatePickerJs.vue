<template>

</template>
<script>
export default {
  name: "CustomDatePickerJs",
  props: {
    value: {
      type: String | Object,
      default: '' | {}
    },
  },
  mounted() {
    if (this.value) {
    }
  },
  data() {
    return {
      date: null,
      time: null,
      formattedDate: null,
    }
  },
  methods: {

  }
}
</script>
<style scoped>

</style>
