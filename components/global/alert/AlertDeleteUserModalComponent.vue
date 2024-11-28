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
        @click="cancel"
      >
        <v-icon>mdi-close</v-icon>
      </button>
      <v-card-title class="accept-file-remove-title">
        <span>لطفا در انجام این عمل دقت کنید!</span>
      </v-card-title>

      <v-card-text
        class="accept-file-remove-text"
      >
        همه ی سوابق و مشخصات بیمار حذف خواهند شد!
      </v-card-text>

      <v-card-actions>
        <button
          class="action-button accept-button"
          @click="goNext"

        >
          ادامه بده
        </button>
        <v-spacer></v-spacer>
        <button
          class="action-button cancel-button"
          @click="cancel"
        >
          انصراف
        </button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AlertDeleteUserModalComponent",
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  methods: {
    goNext() {
      this.$emit('remove')
    },
    cancel() {
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
    }
  }
}
</script>

<style scoped>

</style>
