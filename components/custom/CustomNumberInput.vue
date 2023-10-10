<template>
  <div class="create-update-model-input-box" :class="{'has-error': error}">
    <label v-if="label">{{ label }}</label>
    <input v-model="data" :disabled="disabled" :min="min" type="number" :max="max" @focusin="onFocusIn" @focusout="onFocusOut">
    <span class="create-update-modal-input-error" v-if="error">{{ error }}</span>
  </div>
</template>

<script>

export default {
  name: "CustomNumberInput",
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
    }
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
  }
}
</script>

<style scoped>

</style>
