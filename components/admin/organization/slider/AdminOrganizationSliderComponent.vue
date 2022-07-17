<template>
  <v-card
    class="page-main-box"
  >
    <v-row
      v-if="images.length > 0"
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
          <img :src="s" alt="">
        </div>
      </v-col>
    </v-row>
    <crop-image-component
      ref="crop"
      @changed="cropped"
      @imaged="imaged"
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
    }
  },
  methods: {
    getSliders() {
      this.$store.dispatch('admin/organizations/getSliders', this.organization.id)
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
    save() {
      this.$store.dispatch('admin/organizations/addSliders', {
        id: this.organization.id,
        sliders: this.images
      })
        .then(() => {
          this.getSliders()
        })
    }
  },
  computed: {
    sliders() {
      return this.$store.getters['admin/organizations/getSliders']
    }
  },
}
</script>

<style scoped>

</style>
