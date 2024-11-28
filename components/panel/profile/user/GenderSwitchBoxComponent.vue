<template>
  <div class="gender-switch-box-component">
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <div
          class="gender-switch-item"
          :class="{'selected': value === 'female', 'has-error': error}"
          @click="select('female')"
        >
          <span class="img-box">
            <img v-if="value === 'female'" src="/images/profile/woman2.svg" alt="">
            <img v-else src="/images/profile/woman.svg" alt="">
          </span>
          <span class="gender-title">خانم</span>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <div
          class="gender-switch-item"
          :class="{'selected': value === 'male', 'has-error': error}"
          @click="select('male')"
        >
          <span class="img-box">
            <img v-if="value === 'male'" src="/images/profile/man2.svg" alt="">
            <img v-else src="/images/profile/man.svg" alt="">
          </span>
          <span class="gender-title">آقا</span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "GenderSwitchBoxComponent",
  props: {
    value: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      default: ""
    },
  },
  methods: {
    select(val) {
      this.$emit('input', val)
    }
  },
}
</script>

<style scoped>

</style>
