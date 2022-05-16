<template>
  <div class="case-type-checkbox-component"
       :class="{checked: isChecked}"
       @click="toggleCheck">
    <span class="circle"></span>
    <span class="name">{{ name | toPersianNumber }}</span>
  </div>
</template>

<script>
export default {
  name: "CaseTypeCheckboxComponent",
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    toggleCheck() {
      setTimeout(() => {
        this.$emit('change', {
          name: this.name,
          checked: !this.isChecked
        })
      }, 50)
    }
  },
}
</script>

<style scoped>

</style>
