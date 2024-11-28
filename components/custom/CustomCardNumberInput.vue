<template>
  <div class="create-update-model-input-box" :class="{'has-error': error}">
    <label v-if="label">{{ label }}</label>
    <input
      v-model="data"
      :disabled="disabled"
      maxlength="19"
      pattern="[0-9]*"
      inputmode="numeric"
      type="text"
      class="text-left"
    >
    <span style="letter-spacing: 2px"  class="create-update-modal-input-error" v-if="error">{{ error }}</span>
  </div>
</template>

<script>

export default {
  name: "CustomCardNumberInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String],
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
    },
  },
  watch: {
    value() {
      // Card number without dash (-)
      let realNumber = this.value.replace(/-/gi, '')

      // Generate dashed number
      let dashedNumber = realNumber.match(/.{1,4}/g)

      // Replace the dashed number with the real one
      this.value = dashedNumber.join('-')
    }
  }
}
</script>

<style scoped>

</style>
