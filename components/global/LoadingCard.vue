<template>
  <div class="d-flex justify-center align-center loading-card">
    <v-progress-circular
      indeterminate
      color="#5063FF"
      :size="50"
      :width="8"
    />
  </div>
</template>
<script>
export default {
  name: "LoadingCard"
}
</script>

<style scoped>

</style>
