<template>
  <div class="create-update-model-input-box" :class="{'has-error': error}">
    <label v-if="label">{{ label }}</label>
<!--    <input v-money="money" :type="type" v-model.lazy="data" :autocomplete="type === 'password' ? 'new-password' : 'off'">-->
    <input v-model="data">
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
        suffix: ' ',
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
    },
    fa() {
      if (this.data) {
        return this.data + ' تومان'
      }
      return ''
    }
  }
}
</script>

<style scoped>

</style>
