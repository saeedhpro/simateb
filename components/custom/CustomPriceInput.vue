<template>
  <div class="create-update-model-input-box" :class="{'has-error': error}">
    <label v-if="label">{{ label }}</label>
    <input style="letter-spacing: 2px"  :disabled="disabled" v-model="data" @focusin="onFocusIn" @focusout="onFocusOut">
    <span class="create-update-modal-input-error" v-if="error">{{ error }}</span>
    <span class="create-update-modal-input-error">{{ fa }}</span>
  </div>
</template>

<script>

export default {
  name: "CustomPriceInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    max: {
      type: Number,
      default: 2147483647,
    },
    min: {
      type: Number,
      default: -2147483646,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Object, Number],
      default: "",
    },
  },
  methods: {
    onFocusIn() {
      if (this.value == 0) {
        this.data = ''
      }
    },
    onFocusOut() {
      if (this.value == 0) {
        this.data = 0
      }
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
    fa() {
      if (typeof this.$num2persian == 'function') {
        if (this.data) {
          return this.$num2persian(this.data) + ' تومان'
        }
        return this.$num2persian(0) + ' تومان'
      }
      return this.data
    }
  }
}
</script>

<style scoped>

</style>
