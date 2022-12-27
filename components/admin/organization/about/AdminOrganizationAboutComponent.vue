<template>
  <v-card
    class="page-main-box"
  >
    <v-row>
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
        sm="6"
        md="3"
      >
        <div class="org-about-box">
          <div class="create-update-model-input-box about-org-input">
            <label>متن یک</label>
            <textarea
              rows="5"
              v-model="text1"
            ></textarea>
          </div>
          <div class="create-update-model-input-box">
            <label>عکس یک</label>
            <div class="about-org-img" @click="chooseImage(1)">
              <div class="image-box" v-if="new1">
                <img :src="new1" alt="">
              </div>
              <div class="image-box" v-else-if="organization.image1">
                <img :src="organization.image1" alt="">
              </div>
              <div class="plus-box" v-else>
                <img src="/images/pages/circle-plus.svg" alt="">
                <div class="choose-image">افزودن تصویر</div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="org-about-box">
          <div class="create-update-model-input-box about-org-input">
            <label>متن دو</label>
            <textarea
              rows="5"
              v-model="text2"
            ></textarea>
          </div>
          <div class="create-update-model-input-box">
            <label>عکس دو</label>
            <div class="about-org-img" @click="chooseImage(2)">
              <div class="image-box" v-if="new2">
                <img :src="new2" alt="">
              </div>
              <div class="image-box" v-else-if="organization.image2">
                <img :src="organization.image2" alt="">
              </div>
              <div class="plus-box" v-else>
                <img src="/images/pages/circle-plus.svg" alt="">
                <div class="choose-image">افزودن تصویر</div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="org-about-box">
          <div class="create-update-model-input-box about-org-input">
            <label>متن سه</label>
            <textarea
              rows="5"
              v-model="text3"
            ></textarea>
          </div>
          <div class="create-update-model-input-box">
            <label>عکس سه</label>
            <div class="about-org-img" @click="chooseImage(3)">
              <div class="image-box" v-if="new3">
                <img :src="new3" alt="">
              </div>
              <div class="image-box" v-else-if="organization.image3">
                <img :src="organization.image3" alt="">
              </div>
              <div class="plus-box" v-else>
                <img src="/images/pages/circle-plus.svg" alt="">
                <div class="choose-image">افزودن تصویر</div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div class="org-about-box">
          <div class="create-update-model-input-box about-org-input">
            <label>متن چهار</label>
            <textarea
              rows="5"
              v-model="text4"
            ></textarea>
          </div>
          <div class="create-update-model-input-box">
            <label>عکس چهار</label>
            <div class="about-org-img" @click="chooseImage(4)">
              <div class="image-box" v-if="new4">
                <img :src="new4" alt="">
              </div>
              <div class="image-box" v-else-if="organization.image4">
                <img :src="organization.image4" alt="">
              </div>
              <div class="plus-box" v-else>
                <img src="/images/pages/circle-plus.svg" alt="">
                <div class="choose-image">افزودن تصویر</div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <crop-image-component
      ref="crop"
      @changed="cropped"
      @imaged="imaged"
      @newImage="chooseImage(index)"
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
  name: "AdminOrganizationAboutComponent",
  components: {CropImageComponent,},
  props: {
    organization: {
      type: Object,
      default: null,
      required: true,
    }
  },
  data() {
    return {
      index: 0,
      text1: this.organization.text1,
      text2: this.organization.text2,
      text3: this.organization.text3,
      text4: this.organization.text4,
      image1: this.organization.image1,
      image2: this.organization.image2,
      image3: this.organization.image3,
      image4: this.organization.image4,
      new1: '',
      new2: '',
      new3: '',
      new4: '',
    }
  },
  methods: {
    chooseImage(n) {
      this.index = n
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
      switch (this.index) {
        case 1:
          this.new1 = file
          break;
        case 2:
          this.new2 = file
          break;
        case 3:
          this.new3 = file
          break;
        case 4:
          this.new4 = file
          break;
      }
    },
    save() {
      let data = {
        text1: this.text1 ? this.text1 : this.organization.text1,
        text2: this.text2 ? this.text2 : this.organization.text2,
        text3: this.text3 ? this.text3 : this.organization.text3,
        text4: this.text4 ? this.text4 : this.organization.text4,
        new1: this.new1,
        new2: this.new2,
        new3: this.new3,
        new4: this.new4,
        id: this.organization.id,
      }
      this.$store.dispatch('organizations/updateOrganizationAbout', data)
    }
  }
}
</script>

<style scoped>

</style>
