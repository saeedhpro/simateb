<template>
  <div class="prescription-action-form-component">
    <div class="title-box">
      {{ title }}
    </div>
    <div class="items-box">
      <div @click="selected(i.action)" class="item" v-for="(i,n) in items" :key="n">
        {{ i.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrescriptionActionFormComponent",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    }
  },
  methods: {
    selected(item) {
      if (item) {
        this.$emit('selected', item)
      }
    }
  }
}
</script>

<style scoped>

</style>
