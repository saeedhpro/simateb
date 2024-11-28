<template>
  <div class="create-update-model-input-box" :class="{'has-error': error}">
    <label v-if="label">{{ label }}</label>
    <div class="input-box">
      <v-icon v-if="status === 'valid'" color="#2BC4A9">mdi-check</v-icon>
      <v-icon v-if="status === 'invalid'" color="#F44336">mdi-alert-circle</v-icon>
      <input style="letter-spacing: 2px" :max="max" :type="type" v-model="data" @focusout="check" :class="{'has-status': status !== 'none', 'invalid': status === 'invalid', 'valid': status === 'valid'}">
    </div>
    <span class="create-update-modal-input-error" v-if="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "CustomNationalCodeInput",
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
    max: {
      type: Number,
      default: 1000000000,
    }
  },
  data() {
    return {
      status: 'none',
    }
  },
  methods: {
    checkNationalCode(code) {
      const L = code.length;
      if (L === 0) return  true
      if (L < 8 || L > 10 || parseInt(code, 10) === 0) {
        return false
      }
      code = ('0000' + code).substr(L + 4 - 10);
      if (parseInt(code.substr(3, 6), 10) === 0) {
        return false
      }
      const c = parseInt(code.substr(9, 1), 10);
      let s = 0;
      for (let i = 0; i < 9; i++) {
        s += parseInt(code.substr(i, 1), 10) * (10 - i);
      }
      s = s % 11;
      return (s < 2 && c === s) || (s >= 2 && c === (11 - s));
    },
    check() {
      if (this.data.length > 0) {
        if (this.checkNationalCode(this.data)) {
          this.status = 'valid'
        } else {
          this.status = 'invalid'
        }
      } else {
        this.status = 'none'
      }
      this.$emit('error', this.status)
    }
  },
  computed: {
    data: {
      get() {
        return this.value ?? ''
      },
      set(value) {
        this.$emit("input", value)
      }
    }
  },
  watch: {
    data() {
      if (this.data.length > 6) {
        if (this.checkNationalCode(this.data)) {
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
