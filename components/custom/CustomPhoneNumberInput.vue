<template>
  <div class="create-update-model-input-box" :class="{'has-error': error}">
    <label v-if="label">{{ label }}</label>
    <div class="input-box">
      <v-icon v-if="status === 'valid'" color="#2BC4A9">mdi-check</v-icon>
<!--      <v-icon v-if="status === 'invalid'" color="#F44336">mdi-alert-circle</v-icon>-->
      <input :type="type" v-model="data" @focusout="check" :class="{'has-status': status !== 'none', 'invalid': status === 'invalid', 'valid': status === 'valid'}">
    </div>
    <span class="create-update-modal-input-error" v-if="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "CustomPhoneNumberInput",
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
    value: {
      type: [String, Object, Number],
      default: "",
    },
    checkValue: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      status: 'none',
    }
  },
  methods: {
    checkPhoneNumber(number) {
      if (number.length === 11) {
        const regex = RegExp('09[\\d]{9}')
        return regex.test(number);
      } else if (number.length === 13) {
        const regex = RegExp('\\+989[\\d]{9}')
        return regex.test(number);
      } else {
        return false
      }
    },
    check() {
      if (!this.checkValue) {
        this.status = 'none'
        return
      }
      if (this.data.length > 0) {
        if (this.checkPhoneNumber(this.data)) {
          this.status = 'valid'
        } else {
          this.status = 'invalid'
        }
      } else {
        this.status = 'none'
      }
    }
  },
  computed: {
    data: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      }
    }
  },
  watch: {
    data() {
      if (!this.checkValue) {
        this.status = 'none'
        return
      }
      if (this.data.length > 6) {
        if (this.checkPhoneNumber(this.data)) {
          this.status = 'valid'
        } else {
          this.status = 'invalid'
        }
      } else {
        this.status = 'none'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.create-update-model-input-box {
  .input-box {
    display: flex;
    width: 100%;
    position: relative;

    .v-icon {
      position: absolute;
      right: 5px;
      top: 9px;
    }

    input {
      &.invalid {
        outline: none !important;
        border: 1px solid #F44336 !important;
      }

      &.valid {
        outline: none !important;
        border: 1px solid #2BC4A9 !important;
      }

      &.has-status {
        padding-right: 30px;
      }
    }
  }
}
</style>
