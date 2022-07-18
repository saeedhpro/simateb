<template>
  <div class="create-update-model-input-box" :class="{'has-error': error}">
    <label v-if="label">{{ label }}</label>
    <textarea
      v-model="data"
      :rows="rows"
      autocomplete="off"
    ></textarea>
    <span class="create-update-modal-input-error" v-if="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "CustomTextAreaInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Object, Number],
      default: "",
    },
    rows: {
      type: Number,
      default: 3,
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
