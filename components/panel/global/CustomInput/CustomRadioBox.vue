<template>
  <div @click="check" class="item-checkbox-component cursor-pointer" :class="{'selected': value, 'rtl': rtl}">
    <span class="img" :class="{'selected': value}"></span>
    <input ref="input" v-model="model" hidden type="checkbox" class="item-checkbox">
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "CustomRadioBox",
  props: {
    label: String,
    value: [Boolean, Number],
    rtl: Boolean,
  },
  methods: {
    check() {
      this.$refs.input.click();
    },
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
}
</script>

<style scoped>

</style>
