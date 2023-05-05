<template>
  <v-dialog
    v-model="show"
    max-width="680"
  >
    <v-card
      class="accept-file-remove-model"
    >
      <button
        class="close"
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </button>
      <v-card-title class="accept-file-remove-title">
        <span>رزرو وقت</span>
      </v-card-title>

      <v-card-text
        class="accept-file-remove-text d-flex flex-column align-center justify-center"
      >
        <span>آیا از رزرو وقت برای </span>
        <span>
          <span class="font-weight-bold blue-color">{{ fullName  }}</span>
          <span>در روز </span> <span class="blue-color">{{ getDayName  }} </span>
          <span>ساعت </span> <span class="blue-color">{{ getTime  }} </span>
        </span>
        <span>اطمینان دارید؟ </span>
      </v-card-text>

      <v-card-actions>
        <button
          class="action-button accept-button"
          @click="close"

        >
          خیر
        </button>
        <v-spacer></v-spacer>
        <button
          class="action-button cancel-button"
          @click="accept"
        >
          بله، رزرو کن
        </button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "jalali-moment";
export default {
  name: "AcceptCreateAppointmentModal",
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true
    },
    fullName: {
      type: String,
      default: "",
      required: true
    },
    startAt: {
      type: String,
      default: "",
      required: true
    }
  },
  methods: {
    accept() {
      this.$emit('accept')
    },
    close() {
      this.$emit('close')
    },
  },
  computed: {
    show: {
      get() {
        return this.open
      },
      set(val) {
        this.$emit('close')
      }
    },
    getDayName() {
      if (!this.startAt) return ""
      return moment.from(this.startAt, "en", "YYYY/MM/DDTHH:mm:ssZ").locale("fa").format("dddd")
    },
    getTime() {
      if (!this.startAt) return ""
      return moment.from(this.startAt, "en", "YYYY/MM/DDTHH:mm:ssZ").locale("en").format("HH:mm")
    }
  }
}
</script>

<style scoped>

</style>
