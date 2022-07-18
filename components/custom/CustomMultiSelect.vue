<template>

  <div class="create-update-model-input-box" :class="{'has-error': error}">
    <label v-if="label">{{ label }}</label>
    <multiselect
      searchable
      clearOnSelect
      allowEmpty
      v-model="data"
      placeholder=""
      label="name"
      track-by="name"
      :options="items"
      :option-height="104"
      :show-labels="false"
      :disabled="disabled"
    >
      <template slot="singleLabel" slot-scope="props"><span
        class="option__desc"><span
        class="option__title">{{ `${props.option.name}` }}</span></span>
      </template>
      <template slot="option" slot-scope="props">
        <div class="option__desc"><span class="option__title">{{ props.option.name }}</span></div>
      </template>
    </multiselect>
    <span class="create-update-modal-input-error" v-if="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "CustomMultiSelect",
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
    },
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
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
