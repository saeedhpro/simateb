<template>
  <div class="create-update-model-input-box">
    <label v-if="label">{{ label }}</label>
    <date-picker
      v-model="data"
      :format="format"
      :display-format="displayFormat"
      editable
      class="date-picker"
    >
      <template v-slot:label>
        <img src="/images/form/datepicker.svg">
      </template>
      <span class="create-update-modal-input-error">{{ error }}</span>
    </date-picker>
  </div>
</template>

<script>
export default {
  name: "CustomDateInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    format: {
      type: String,
      default: "",
    },
    displayFormat: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Object, Number, Array],
      default: "",
    },
  },
  computed: {
    data: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit("input", value)
      }
    }
  }
}
</script>

<style scoped>

</style>
