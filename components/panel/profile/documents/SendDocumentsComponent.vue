<template>
  <div class="send-documents-component">
    <div class="action-box">
      <!--      <div class="choose-file"-->
      <!--           @click="saveList"-->
      <!--      >-->
      <!--        <img src="/images/profile/choosefile.svg">-->
      <!--        <span>ذخیره</span>-->
      <!--      </div>-->
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
      v-if="!loading"
      :files="fileList"
      @refresh="getUserFiles"
    />
    <crop-image-component
      ref="crop"
      @changed="cropped"
      @imaged="imaged"
      @newImage="openChooseImage"
    />
    <v-dialog
      v-model="showSendFileModal"
      persistent
      max-width="1056px"
    >
      <v-card
        class="create-update-modal"
      >
        <v-card-title
          class="create-update-modal-title-box"
        >
          <div class="create-update-modal-title">
            <button
              @click="closeForm"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>ارسال فایل</span>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="send-file-box">
                  <a :href="form.file" target="_blank" v-if="form.ext === 'pdf'">
                    <img src="/images/form/pdf.svg" alt="" style="height: 135px">
                  </a>
                  <img :src="form.file" alt="" v-else style="height: 135px">
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>توضیحات پزشک</label>
                  <textarea
                    :disabled="this.loginUser.id === userId"
                    rows="4"
                    v-model="form.info"
                  ></textarea>
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>نظر بیمار</label>
                  <textarea
                    :disabled="this.loginUser.id !== userId"
                    rows="4"
                    v-model="form.comment"
                  ></textarea>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-spacer/>
              <v-col
                cols="12"
                sm="3"
                md="3"
              >
                <button
                  class="second-button"
                  @click="closeForm"
                >
                  انصراف
                </button>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <button
                  class="main-button"
                  @click="sendFile"
                >
                  ذخیره
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
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
  mounted() {
    this.getUserFiles()
  },
  data() {
    return {
      form: {
        file: null,
        ext: null,
        comment: '',
        info: '',
        user_id: this.userId,
      },
      newFiles: [],
      show: false,
      loading: false,
      showSendFileModal: false,
    }
  },
  methods: {
    getUserFiles() {
      this.loading = true
      this.$store.dispatch('files/getList', this.userId)
      .finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 250)
      })
    },
    cropped(file) {
    },
    imaged(file) {
      if (!file) return
      this.form.file = file
      this.form.ext = file.split(",")[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0].split('/')[1]
      this.toggleShowSendFileModal()
    },
    updated(o) {
      this.form.file = o
      this.show = !this.show
    },
    async chooseFile(e) {
      let val = e.target.files[0]
      if (!val) return
      const reader = new FileReader();
      reader.onload = async (e) => {
        this.form.file = e.target.result
        this.form.ext = 'pdf'
      }
      reader.readAsDataURL(val);
      this.toggleShowSendFileModal()
    },
    chooseImage(e) {
      this.$refs.crop.setImage(e)
    },
    openChooseImage() {
      this.$refs.image.value = null
      this.$refs.image.click()
    },
    openChooseFile() {
      this.$refs.file.value = null
      this.$refs.file.click()
    },
    sendFile() {
      this.$store.dispatch('files/createFile', this.form)
        .then(res => {
          this.toggleShowSendFileModal()
          this.getUserFiles()

          this.form = {
            file: null,
            ext: null,
            comment: '',
            info: '',
            user_id: this.userId
          }
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
    },
    closeForm() {
      this.toggleShowSendFileModal()
      this.form = {
        file: null,
        ext: null,
        comment: '',
        info: '',
        user_id: this.userId,
      }
    },
    toggleShowSendFileModal() {
      this.showSendFileModal = !this.showSendFileModal
    }
  },
  computed: {
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    fileList() {
      return this.$store.getters['files/getList']
    }
  }
}
</script>

<style scoped>

</style>
