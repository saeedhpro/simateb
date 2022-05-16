<template>
  <div class="send-documents-component">
    <div class="action-box">
      <div class="choose-file"
           @click="saveList"
      >
        <img src="/images/profile/choosefile.svg">
        <span>ذخیره</span>
      </div>
      <div class="choose-file"
           @click="openChooseFile"
      >
        <input
          type="file"
          ref="file"
          hidden
          name="file"
          accept=".pdf"
          @change="chooseFile">
        <img src="/images/profile/choosefile.svg">
        <span>افزودن فایل</span>
      </div>
      <div class="choose-image"
        @click="openChooseImage"
      >
        <input
          type="file"
          ref="image"
          name="image"
          hidden
          accept="image/*"
          @change="chooseImage">
        <img src="/images/profile/chooseimg.svg">
        <span>افزودن عکس</span>
      </div>
    </div>
    <files-list-component
      :user-id="userId"
    />
    <crop-image-component
      ref="crop"
      @changed="updated"
    />
    <v-dialog
      v-model="show"
      >
      <img
        class="image"
        :src="form.file"/>

    </v-dialog>
  </div>
</template>

<script>
import CropImageComponent from "~/components/panel/global/CropImageComponent";
import FilesListComponent from "~/components/panel/profile/documents/FilesListComponent";
export default {
  name: "SendDocumentsComponent",
  components: {FilesListComponent, CropImageComponent},
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      form: {
        file: null,
      },
      show: false,
    }
  },
  methods: {
    updated(o) {
      this.form.file = o
      this.show = !this.show
    },
    chooseFile(e) {
      console.log(e)
    },
    chooseImage(e) {
      console.log(e)
    },
    openChooseImage() {
      this.$refs.image.click()
    },
    openChooseFile() {
      this.$refs.file.click()
    },
    saveList() {

    }
  }
}
</script>

<style scoped>

</style>
