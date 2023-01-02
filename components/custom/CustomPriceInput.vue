<template>
  <div class="create-update-model-input-box" :class="{'has-error': error}">
    <label v-if="label">{{ label }}</label>
    <input v-money="money" :type="type" v-model.lazy="data" :autocomplete="type === 'password' ? 'new-password' : 'off'">
    <span class="create-update-modal-input-error" v-if="error">{{ error }}</span>
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
    type: {
      type: String,
      default: "text",
    },
    max: {
      type: Number,
      default: 2147483647,
    },
    value: {
      type: [String, Object, Number],
      default: "",
    },
  },
  data() {
    return {
      money: {
        decimal: '.',
        thousands: ',',
        suffix: ' تومان',
        prefix: '',
        precision: 0,
        masked: false
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
    }
  }
}
</script>

<style scoped>

</style>
