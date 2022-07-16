<template>
  <div class="create-update-model-input-box" :class="{'has-error': error}">
    <label v-if="label">{{ label }}</label>
    <custom-toggle-button
      v-model="data"
      :off-label="offLabel"
      :on-label="onLabel"
    />
    <span class="create-update-modal-input-error" v-if="error">{{ error }}</span>
  </div>
</template>

<script>
import CustomToggleButton from "~/components/admin/global/CustomToggleButton";
export default {
  name: "CustomToggleInput",
  components: {CustomToggleButton},
  props: {
    label: {
      type: String,
      default: "",
    },
    onLabel: {
      type: String,
      default: "",
    },
    offLabel: {
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
      type: Boolean,
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
