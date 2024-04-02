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
          <span>فرم ویرایش نمونه کار</span>
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
                <label>توضیحات</label>
                <textarea v-model="form.description" rows="4"></textarea>
              </div>
            </v-col>
            <v-col
                cols="6"
                sm="3"
                md="3"
                v-for="(i, n) in form.images"
                :key="n"
            >
              <div class="create-update-model-input-box full-height relative">
                <v-btn
                    icon
                    class="absolute cursor-pointer" style="top: 5px; right: 5px;"
                    @click="removeImage(n, i)"
                >
                  <v-icon color="red">mdi-close</v-icon>
                </v-btn>
                <img
                    :src="i"
                    alt=""
                    style="width: 100%; height: auto;border-radius: 15px"
                >
              </div>
            </v-col>
            <v-col
              cols="6"
              sm="3"
              md="3"
              v-for="(i, n) in form.new_images"
              :key="n"
            >
              <div class="create-update-model-input-box full-height relative">
                <v-btn
                    icon
                    class="absolute cursor-pointer" style="top: 5px; right: 5px;"
                    @click="removeNewImage(n)"
                >
                  <v-icon color="red">mdi-close</v-icon>
                </v-btn>
                <img
                  :src="i.image"
                  alt=""
                  style="width: 100%; height: auto;border-radius: 15px"
                >
              </div>
            </v-col>
            <v-col
              cols="6"
              sm="3"
              md="3"
              v-if="form.new_images.length < 5"
            >
              <div class="create-update-model-input-box full-height">
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
                    style="width: 100%; height: auto"
                    :src="'/images/pages/plus.svg'"
                    @click="openChooseImage"
                    alt=""
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
                @click="createSample"
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
  name: "UpdateSampleItem",
  components: {CropImageComponent, FilesListComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true
    },
    organization_id: {
      type: Number,
      required: true
    },
    category_id: {
      type: Number,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        id: 0,
        description: '',
        images: [],
        new_images: [],
        deleted_images: [],
      },
    }
  },
  mounted() {
    this.clearForm()
  },
  methods: {
    createSample() {
      this.$store.dispatch('admin/organizations/updateOrganizationSample', {
        ...this.form,
        category_id: this.category_id,
        organization_id: this.organization_id,
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
        id: this.item.id,
        description: this.item.description,
        images: [
            ...this.item.image_list
        ],
        new_images: [],
        deleted_images: [],
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
      let ext = file.split(",")[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0].split('/')[1]
      this.form.new_images.push({
        image: file,
        ext: ext
      })
    },
    openChooseImage() {
      this.$refs.image.value = null
      this.$refs.image.click()
    },
    chooseImage(e) {
      this.$refs.crop.setImage(e)
    },
    removeNewImage(index) {
      this.form.new_images.splice(index, 1)
    },
    removeImage(index, url) {
      this.form.images.splice(index, 1)
      this.form.deleted_images.push(url)
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
