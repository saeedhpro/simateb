<template>
  <div class="create-update-model-input-box" :class="{'has-error': error}">
    <label v-if="label">{{ label }}</label>
    <input :type="getType" v-model="data" :autocomplete="type === 'password' ? 'new-password' : 'off'">
    <client-only>
      <password-meter v-if="type === 'password'" :password="data" />
    </client-only>
    <span class="create-update-modal-input-error" v-if="error">{{ error }}</span>
    <span v-if="isPassword" class="icon" @click="toggleShowPassword">
      <v-icon v-if="showPassword">mdi-eye-closed</v-icon>
      <v-icon v-else>mdi-eye</v-icon>
    </span>
  </div>
</template>

<script>
export default {
  name: "CustomTextInput",
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
  },
  data() {
    return {
      showPassword: false,
    }
  },
  methods: {
    toggleShowPassword() {
      if (this.isPassword) {
        this.showPassword = !this.showPassword
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
    isPassword() {
      return this.type === 'password'
    },
    getType() {
      if (this.isPassword && this.showPassword) {
        return 'text'
      }
      return this.type
    }
  }
}
</script>

<style scoped>
.create-update-model-input-box {
  position: relative;
}
.icon {
  position: absolute;
  left: 10px;
  top: 44%;
  cursor: pointer;
}
</style>
