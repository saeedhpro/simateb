<template>
  <div class="files-list-component">
    <file-item-component
      v-for="(f,n) in files"
      :key="n"
      :index="n"
      :id="f.id"
      :path="f.url"
      :ext="f.ext"
      :info="f.info"
      :comment="f.comment"
      @change="onChange"
      @input="onInput"
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
  methods: {
    remove(id) {
      this.$emit('remove', id)
    },
    onChange(data) {
      this.$emit('change', data)
    },
    onInput(data) {
      this.$emit('input', data)
    }
  },
}
</script>

<style scoped>

</style>
