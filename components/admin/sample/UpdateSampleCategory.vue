<template>
  <v-dialog
    v-model="show"
    max-width="1056px"
    persistent
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
                <label>توضیحات</label>
                <textarea v-model="form.description" rows="4"></textarea>
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
                    :src="getLogo()"
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
                @click="createCategory"
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
  name: "CreateSampleCategory",
  components: {CropImageComponent, FilesListComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true
    },
    title: {
      type: String,
      default: "محتوا ثابت"
    },
    type: {
      type: String,
      default: "page"
    },
    organization_id: {
      type: Number,
      required: true
    },
    sample: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        id: 0,
        name: '',
        description: '',
        type: this.type,
        logo: '',
        new_logo: '',
        ext: '',
        ext_icon: '',
        icon: '',
        new_icon: '',
        parent_id: null,
        organization_id: this.organization_id,
      },
    }
  },
  mounted() {
    this.clearForm()
  },
  methods: {
    createCategory() {
      this.$store.dispatch('admin/organizations/updateOrganizationCategory', {
        ...this.form,
        organization_id: this.organization_id
      })
        .then(res => {
          this.$toast.success('دسته بندی با موفقیت ثبت شد')
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
        id: this.sample.id,
        name: this.sample.name,
        description: this.sample.description,
        type: this.type,
        logo: this.sample.logo,
        new_logo: '',
        ext: '',
        ext_icon: '',
        icon: '',
        new_icon: '',
        parent_id: null,
        organization_id: this.organization_id,
      }
    },
    closeForm() {
      this.close()
    },
    done() {
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
    getLogo() {
      if (this.form.new_logo) {
        return this.form.new_logo
      } else if (this.form.logo) {
        return this.form.logo
      }
      return '/images/pages/img.svg'
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
    }
  },
}
</script>

<style scoped>

</style>
