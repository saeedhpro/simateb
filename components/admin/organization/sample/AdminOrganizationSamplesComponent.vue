<template>
  <v-card
    class="page-main-box"
  >
    <v-row
    >
      <v-col
      >
        <div class="save-about"
             @click="save"
        >
          <img src="/images/profile/choosefile.svg" alt="">
          <span>ذخیره</span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <h2>ویدئو نمونه کار</h2>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <div
          class="organization-slider-image none"
        >
          <custom-text-area-input
            v-model="sample_video"
            :rows="8"
          />
        </div>
      </v-col>
<!--      <v-col-->
<!--        cols="12"-->
<!--        md="3"-->
<!--      >-->
<!--        <div class="about-org-img small" @click="addNewVideoInput">-->
<!--          <div class="plus-box">-->
<!--            <img src="/images/pages/circle-plus.svg" alt="">-->
<!--            <div class="choose-image">افزودن ویدئو</div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </v-col>-->
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <h2>تصاویر نمونه کار</h2>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <div class="about-org-img" @click="openChooseImage">
          <div class="plus-box">
            <img src="/images/pages/circle-plus.svg" alt="">
            <div class="choose-image">افزودن تصویر</div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="3"
        v-for="(s,i) in images"
        :key="i"
      >
        <div
          class="organization-slider-image"
        >
          <v-btn
            icon
            @click="removeImage(i)"
            class="remove-image"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <img :src="s" alt="">
        </div>
      </v-col>
      <v-col
        cols="12"
        md="3"
        v-for="(s,i) in image_samples"
        :key="i + 1000"
      >
        <div
          class="organization-slider-image"
        >
          <v-btn
            icon
            @click="removeSlider(s)"
            class="remove-image"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <img :src="s" alt="">
        </div>
      </v-col>
    </v-row>
    <crop-image-component
      ref="crop"
      @changed="cropped"
      @imaged="imaged"
      @newImage="openChooseImage"
    />
    <input
      type="file"
      ref="file"
      name="image"
      hidden
      accept="image/*"
      @change="setCropImage"
    >
  </v-card>
</template>

<script>
import CropImageComponent from "~/components/panel/global/CropImageComponent";

export default {
  name: "AdminOrganizationSliderComponent",
  components: {CropImageComponent,},
  props: {
    organization: {
      type: Object,
      default: null,
      required: true,
    }
  },
  mounted() {
    if (this.organization) {
      this.getImageSamples()
      this.getVideoSamples()
    }
  },
  data() {
    return {
      images: [],
      videos: [],
      sample_video: '',
      image_samples: [],
      deleted_images: false,
      deleted_videos: false,
    }
  },
  methods: {
    getImageSamples() {
      this.$store.dispatch('admin/organizations/getImageSamples', this.organization.id)
        .then(res => {
          const data = res.data;
          this.image_samples = [
            ...data,
          ]
        })
    },
    getVideoSamples() {
      this.$store.dispatch('admin/organizations/getVideoSamples', this.organization.id)
        .then(res => {
          const data = res.data;
          this.sample_video = data.length > 0 ? data[0] : ''
        })
    },
    openChooseImage() {
      this.$refs.file.value = null
      this.$refs.file.click()
    },
    setCropImage(e) {
      this.$refs.crop.setImage(e)
    },
    cropped(file) {
    },
    imaged(file) {
      if (!file) return
      this.images.push(file)
    },
    removeSlider(slider) {
      this.deleted_images = true
      this.image_samples = this.image_samples.filter(i => i != slider)
    },
    removeImage(index) {
     this.images.splice(index, 1)
    },
    save() {
      this.$store.dispatch('admin/organizations/addMedias', {
        id: this.organization.id,
        image_samples: this.images,
        video_samples: [this.sample_video],
        old_image_samples: this.image_samples,
        old_video_samples: this.video_samples,
        deleted_images: this.deleted_images,
        deleted_videos: this.deleted_videos,
      })
        .then(() => {
          this.images = []
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(e => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          this.getImageSamples()
          this.getVideoSamples()
        })
    },
    addNewVideoInput() {
      this.videos.push('')
    }
  },
}
</script>

<style scoped lang="scss">

</style>
