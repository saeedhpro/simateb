<template>

  <div class="create-update-model-input-box" :class="{'has-error': error}">
    <label v-if="label">{{ label }}</label>
    <multiselect
      searchable
      clearOnSelect
      allowEmpty
      v-model="data"
      placeholder=""
      :label="trackBy"
      :track-by="trackBy"
      :options="items"
      :option-height="104"
      :show-labels="false"
      :disabled="disabled"
    >
      <template slot="singleLabel" slot-scope="props"><span
        class="option__desc"><span
        class="option__title">{{ hasCustomLabel ? props.option.fname : `${props.option.fname} ${props.option.lname}` | toPersianNumber }}</span></span>
      </template>
      <template slot="option" slot-scope="props">
        <div class="option__desc"><span class="option__title">{{ hasCustomLabel ? `${props.option.fname} ${props.option.lname}` : props.option.name | toPersianNumber  }}</span></div>
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
    hasCustomLabel: {
      type: Boolean,
      default: false,
    },
    customLabel: {
      type: Function,
      default: item => item.fname,
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
    trackBy() {
      if (this.hasCustomLabel) {
        return 'fname'
      }
      return 'name'
    }
  }
}
</script>

<style scoped>

</style>
