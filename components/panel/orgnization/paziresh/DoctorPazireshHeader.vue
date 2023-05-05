<template>
  <v-row>
    <v-col>
      <div class="doctor-paziresh-header">
        <div class="circle"></div>
        <div class="text">برای امروز، <span>{{ total  }}</span> مورد پذیرش ثبت شده است</div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DoctorPazireshHeader",
  props: {
    total: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>

</style>
