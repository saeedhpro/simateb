<template>
  <div class="photography-item-component" v-if="appointment">
    <div class="top-box">
      <span class="right-box">
        <span class="appcode">کد پذیرش:</span>
        <span class="appcode-number">{{ appointment.code | toPersianNumber }}</span>
      </span>
      <span class="time-box">{{
          appointment.p_result_at ? $moment(appointment.p_result_at).locale("fa").format("jYYYY/jMM/jDD") : '' | toPersianNumber
        }}</span>
    </div>
    <div class="images-box">
      <v-container fluid>
        <v-row>
          <v-col
            col="12"
            sm="4"
            md="2"
            v-for="(r, n) in results"
            :key="n"
          >
            <img @click="showImage(r)" class="result-image" alt="" :src="r">
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-dialog
      v-model="showFile"
      max-width="500px"
    >
      <img
        alt=""
        @click="closeShowResult"
        class="image"
        :src="file"
      >
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "PhotographyItemComponent",
  props: {
    appointment: {
      type: Object,
      required: true,
      default: null,
    }
  },
  data() {
    return {
      showFile: false,
      file: null,
      results: [],
    }
  },
  mounted() {
    this.getResults()
  },
  methods: {
    getResults() {
      this.$store.dispatch('appointments/getAppointmentResults', {
        id: this.appointment.id,
        type: 'photography'
      })
        .then(res => {
          this.results = res.data
        })
    },
    showImage(file) {
      this.file = file
      this.showFile = true
    },
    closeShowResult() {
      this.showFile = false
      this.file = null
    }
  }
}
</script>

<style scoped>

</style>
