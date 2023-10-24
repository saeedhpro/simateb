<template>
  <div class="refer-box-component">
    <v-expansion-panels flat>
      <v-expansion-panel
        class="wire-box"
      >
        <v-expansion-panel-header
          class="wire-box-header"
        >
          ارجاعیات
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-0">
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <refer-item-component
                type="radiology"
                title="رادیولوژی"
                :refer="radiology"
                :message="radiologyMsg"
                :items="radioItems"
                @selected="itemSelected"
                @setMsg="setMsg"
                @setRadiologyCases="setRadiologyCases"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <refer-item-component
                type="photography"
                title="فتوگرافی"
                :refer="photography"
                :message="photographyMsg"
                :items="photoItems"
                @selected="itemSelected"
                @setMsg="setMsg"
                @setPhotographyCases="setPhotographyCases"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <refer-item-component
                type="doctor"
                title="متخصص"
                :refer="doctor"
                :message="doctorMsg"
                :items="doctorItems"
                @selected="itemSelected"
                @setMsg="setMsg"
                @setDoctorImagesCases="setDoctorImagesCases"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import ReferItemComponent from "~/components/panel/appointment/AppointmentForm/ReferItemComponent";
export default {
  name: "ReferBoxComponent",
  components: {ReferItemComponent},
  props: {
    photography: {
      type: Object,
      default: null,
    },
    doctor: {
      type: Object,
      default: null,
    },
    radiology: {
      type: Object,
      default: null,
    },
    doctorItems: {
      type: Array,
      default: () => []
    },
    photoItems: {
      type: Array,
      default: () => []
    },
    radioItems: {
      type: Array,
      default: () => []
    },
    radiologyMsg: {
      type: String,
      default: "",
    },
    photographyMsg: {
      type: String,
      default: "",
    },
    doctorMsg: {
      type: String,
      default: "",
    },
  },
  methods: {
    itemSelected(val) {
      this.$emit('selected', val)
    },
    setMsg(val) {
      this.$emit('setMsg', {
        val: val.val,
        type: val.type,
      })
    },
    setPhotographyCases(cases) {
      this.$emit('setPhotographyCases', cases)
    },
    setDoctorImagesCases(cases) {
      this.$emit('setDoctorImagesCases', cases)
    },
    setRadiologyCases(cases) {
      this.$emit('setRadiologyCases', cases)
    }
  }
}
</script>

<style scoped>

</style>
