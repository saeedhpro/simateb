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
        <span>حذف {{ title }}</span>
      </v-card-title>

      <v-card-text
        class="accept-file-remove-text"
      >
        آیا از حذف کردن {{ title }} اطمینان دارید؟<br/>
        لطفا دقت کنید که پس از حذف، اطلاعات {{ title }} قابل بازگشت نیست
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
          class="action-button red-button"
          @click="remove"
        >
          بله، حذف کن
        </button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AdminDeleteUsersComponent",
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true
    },
    title: {
      type: String,
      default: "کاربران"
    }
  },
  methods: {
    remove() {
      this.$emit('remove')
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
    }
  }
}
</script>

<style scoped>

</style>
