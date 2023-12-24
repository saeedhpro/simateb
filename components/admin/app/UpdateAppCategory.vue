<template>
  <v-dialog
    v-model="show"
    max-width="1056px"
    persistent
  >
    <v-card
      class="create-update-modal"
      v-if="category"
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
          <span>فرم ایجاد دسته بندی {{title}}</span>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <div class="create-update-model-input-box">
                <label>عنوان</label>
                <input type="text" v-model="form.name">
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <div class="create-update-model-input-box">
                <label>دسته بندی والد</label>
                <custom-multi-select
                  :items="items"
                  v-model="parent"
                />
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <div class="create-update-model-input-box full-height" style="max-height: 175px">
                <label>تصویر لوگو</label>
                <div class="file-input full-height">
                  <input
                    type="file"
                    ref="image"
                    name="image"
                    hidden
                    accept="image/*"
                    @change="chooseImage"
                  >
                  <img
                    class="full-height"
                    :src="getLogo"
                    @click="openChooseImage"
                  >
                  <crop-image-component
                    ref="crop"
                    @imaged="imaged"
                    @newImage="openChooseImage"
                  />
                </div>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <div class="create-update-model-input-box full-height" style="max-height: 175px">
                <label>تصویر آیکون</label>
                <div class="file-input full-height">
                  <input
                    type="file"
                    ref="imageIcon"
                    name="image"
                    hidden
                    accept="image/*"
                    @change="chooseImageIcon"
                  >
                  <img
                    class="full-height"
                    :src="getIcon"
                    @click="openChooseImageIcon"
                  >
                  <crop-image-component
                    ref="cropIcon"
                    @imaged="imagedIcon"
                    @newImage="openChooseImageIcon"
                  />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="3"
              md="3"
            >
              <button
                class="second-button full-width"
                @click="clearForm"
              >
                پاک کردن فرم
              </button>
            </v-col>
            <v-spacer/>
            <v-col
              cols="12"
              sm="3"
              md="3"
            >
              <button
                class="second-button full-width"
                @click="closeForm"
              >
                بستن
              </button>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="4"
            >
              <button
                class="main-button"
                @click="updateCategory"
              >
                ذخیره
              </button>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
    <crop-image-component
      ref="crop"
      @changed="cropped"
      @imaged="imaged"
      @newImage="openChooseImage"
    />
  </v-dialog>
</template>

<script>

import FilesListComponent from "~/components/panel/profile/documents/FilesListComponent.vue";
import CropImageComponent from "~/components/panel/global/CropImageComponent.vue";

export default {
  name: "UpdateAppCategory",
  components: {CropImageComponent, FilesListComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true
    },
    category: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: "محتوا ثابت"
    },
    type: {
      type: String,
      default: "page"
    }
  },
  data() {
    return {
      form: {
        id: 0,
        name: '',
        type: this.type,
        logo: '',
        new_logo: '',
        ext: '',
        ext_icon: '',
        icon: '',
        new_icon: '',
        parent_id: null,
        organization_id: 1,
      },
      parent: null,
      items: [],
    }
  },
  mounted() {
    this.clearForm()
  },
  methods: {
    getCategories() {
      this.$store.dispatch('admin/app/getCategoryList', {
        type: this.type,
      })
        .then(res => {
          this.items = res.data.data
        })
    },
    updateCategory() {
      this.$store.dispatch('admin/app/updateCategory', this.form)
        .then(res => {
          this.$toast.success('دسته بندی با موفقیت ویرایش شد')
          this.done()
        })
        .catch(err => {
          if (err.response.status == 422) {
            if (err.response.data && err.response.data.errors && err.response.data.errors.appointment.length > 0) {
              this.$toast.error(err.response.data.errors.appointment[0])
            }
          }
        })
    },
    clearForm() {
      this.form = {
        id: this.category.id,
        name: this.category.name,
        type: this.category.type,
        logo: this.category.logo,
        new_logo: '',
        ext: '',
        ext_icon: '',
        icon: this.category.icon,
        new_icon: '',
        parent_id: this.category.parent_id,
        organization_id: 1,
      }
      this.parent = this.category.parent
    },
    closeForm() {
      this.close()
    },
    done() {
      this.getCategories()
      this.$emit('done')
      this.close()
    },
    close() {
      this.clearForm()
      this.$emit('close')
    },
    cropped(file) {
    },
    imaged(file) {
      if (!file) return
      this.form.new_logo = file
      this.form.ext = file.split(",")[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0].split('/')[1]
    },
    openChooseImage() {
      this.$refs.image.value = null
      this.$refs.image.click()
    },
    chooseImage(e) {
      this.$refs.crop.setImage(e)
    },
    croppedIcon(file) {
    },
    imagedIcon(file) {
      if (!file) return
      this.form.new_icon = file
      this.form.ext_icon = file.split(",")[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0].split('/')[1]
    },
    openChooseImageIcon() {
      this.$refs.imageIcon.value = null
      this.$refs.imageIcon.click()
    },
    chooseImageIcon(e) {
      this.$refs.cropIcon.setImage(e)
    }
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
    getLogo() {
      return this.form.new_logo ? this.form.new_logo : this.form.logo ? this.form.logo : '/images/pages/img.svg'
    },
    getIcon() {
      return this.form.new_icon ? this.form.new_icon : this.form.icon ? this.form.icon : '/images/pages/img.svg'
    }
  },
  watch: {
    open() {
      this.getCategories()
    },
    parent(parent) {
      this.form.parent_id = parent ? parent.id : null
    }
  }
}
</script>

<style scoped>

</style>
