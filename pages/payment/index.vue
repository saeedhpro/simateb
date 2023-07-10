<template>
  <div>
    {{ $route.query }}
  </div>
</template>

<script>
export default {
  name: "payment",
  mounted() {
    console.log(this.$route.query, "query")
  }
}
</script>
<style scoped>

</style>
