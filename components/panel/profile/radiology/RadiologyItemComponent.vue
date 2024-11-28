<template>
  <div class="photography-item-component" v-if="appointment">
    <div class="top-box">
      <span class="right-box">
        <span class="appcode">کد پذیرش:</span>
        <span class="appcode-number">{{ appointment.code  }}</span>
      </span>
      <span class="time-box">{{
          appointment.p_result_at ? $moment(appointment.p_result_at).format("jYYYY/jMM/jDD") : ''
        }}</span>
    </div>
    <div class="images-box">
      <v-container fluid>
        <v-row>
          <Fancybox
            :options="options"
          >
            <a
              v-for="(i,n) in results"
              :key="n"
              data-fancybox="gallery"
              :href="i"
              class="fancybox-item"
              :data-fancybox-index="n"
            >
              <img
                class="prescription-image"
                :src="i"
                alt=""
                width="100" height="75" />
            </a>
          </Fancybox>
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
  name: "RadiologyItemComponent",
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
      options: {
        showClass:"f-scaleIn",
        hideClass: "f-scaleOut",
        animated: true,
        thumbs: {
          autoStart : true,
          type: "classic",
          axis: 'y',
          parentEl: '.fancybox__container',
        },
      },
    }
  },
  mounted() {
    this.getResults()
  },
  methods: {
    getResults() {
      this.$store.dispatch('appointments/getAppointmentResults', {
        id: this.appointment.id,
        type: 'radiology'
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
