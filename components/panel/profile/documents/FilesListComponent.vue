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
    userId: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.getUserFiles()
  },
  methods: {
    getUserFiles() {
      this.$store.dispatch('files/getList', this.userId)
    },
    remove(id) {
      this.$store.dispatch('files/removeFile', id)
    },
    onChange(data) {
      this.$store.dispatch('files/updateFile', data)
    }
  },
  computed: {
    files() {
      return this.$store.getters['files/getList']
    }
  }
}
</script>

<style scoped>

</style>
