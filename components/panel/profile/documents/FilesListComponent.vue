<template>
  <div class="files-list-component">
    <file-item-component
      v-for="(f,n) in files"
      :key="n"
      :id="f.id"
      :path="f.path"
      :ext="f.ext"
      :info="f.info"
      :comment="f.comment"
      @change="onChange"
      @remove="remove(f.id)"
    />
  </div>
</template>

<script>
import FileItemComponent from "~/components/panel/profile/documents/FileItemComponent";

export default {
  name: "FilesListComponent",
  components: {FileItemComponent},
  props: {
    files: {
      type: Array,
      required: true,
      default: () => []
    },
  },
  mounted() {
  },
  methods: {
    remove(id) {
      this.$store.dispatch('files/removeFile', id)
      .then(() => {
        this.$toast.success('با موفقیت انجام شد');
      })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
      setTimeout(() => {
        this.$emit('refresh')
      }, 250)
    },
    onChange(data) {
      this.$store.dispatch('files/updateFile', data)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
      setTimeout(() => {
        this.$emit('refresh')
      }, 250)
    }
  },
}
</script>

<style scoped>

</style>
