<template>
  <v-card
    class="page-main-box"
  >
    <v-row
      v-if="images.length > 0 || deleted"
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
            @click="removeImage(s)"
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
        v-for="(s,i) in sliders"
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
      this.getSliders()
    }
  },
  data() {
    return {
      images: [],
      sliders: [],
      deleted: false,
    }
  },
  methods: {
    getSliders() {
      this.$store.dispatch('admin/organizations/getSliders', this.organization.id)
      .then(res => {
        const data = res.data;
        this.sliders = [
          ...data,
        ]
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
      this.deleted = true
      this.sliders = this.sliders.filter(i => i != slider)
    },
    removeImage(slider) {
      this.images = this.images.filter(i => i == slider)
    },
    save() {
      this.$store.dispatch('admin/organizations/addSliders', {
        id: this.organization.id,
        sliders: this.images,
        old_sliders: this.sliders,
        deleted: this.deleted,
      })
        .then(() => {
          this.images = []
          this.$toast.success('با موفقیت انجام شد');
        })
      .catch(e => {
        this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
      })
      .finally(() => {
        this.getSliders()
      })
    }
  },
}
</script>

<style scoped lang="scss">

</style>
