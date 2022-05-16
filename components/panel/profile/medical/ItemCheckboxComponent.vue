<template>
  <div @click="check" class="item-checkbox-component cursor-pointer" :class="{'selected': selected}">
    <span class="img" :class="{'selected': selected}"></span>
    <input ref="input" v-model="model" :value="inputValue" hidden type="checkbox" class="item-checkbox">
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "ItemCheckboxComponent",
  props: {
    label: String,
    value: Array,
    inputValue: String,
  },
  methods: {
    check() {
      this.$refs.input.click();
    }
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    selected() {
      return this.model.findIndex(i => i == this.inputValue) > -1;
    }
  }
}
</script>

<style scoped>

</style>
