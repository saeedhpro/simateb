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
            <div class="about-org-img">
              <div class="image-box" v-if="new1">
                <v-btn
                  icon
                  @click="removeImage('new1')"
                  class="remove-image"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <img :src="new1" alt="">
              </div>
              <div class="image-box" v-else-if="image1">
                <v-btn
                  icon
                  @click="removeImage('image1')"
                  class="remove-image"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <img :src="image1_link" alt="">
              </div>
              <div class="plus-box" v-else  @click="chooseImage(1)">
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
            <div class="about-org-img">
              <div class="image-box" v-if="new2">
                <v-btn
                  icon
                  @click="removeImage('new2')"
                  class="remove-image"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <img :src="new2" alt="">
              </div>
              <div class="image-box" v-else-if="image2">
                <v-btn
                  icon
                  @click="removeImage('image2')"
                  class="remove-image"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <img :src="image2_link" alt="">
              </div>
              <div class="plus-box" v-else  @click="chooseImage(2)">
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
            <div class="about-org-img" >
              <div class="image-box" v-if="new3">
                <v-btn
                  icon
                  @click="removeImage('new3')"
                  class="remove-image"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <img :src="new3" alt="">
              </div>
              <div class="image-box" v-else-if="image3">
                <v-btn
                  icon
                  @click="removeImage('image3')"
                  class="remove-image"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <img :src="image3_link" alt="">
              </div>
              <div class="plus-box" v-else @click="chooseImage(3)">
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
            <div class="about-org-img">
              <div class="image-box" v-if="new4">
                <v-btn
                  icon
                  @click="removeImage('new4')"
                  class="remove-image"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <img :src="new4" alt="">
              </div>
              <div class="image-box" v-else-if="image4">
                <v-btn
                  icon
                  @click="removeImage('image4')"
                  class="remove-image"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <img :src="image4_link" alt="">
              </div>
              <div class="plus-box" v-else @click="chooseImage(4)">
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
      image1_link: this.organization.image1_link,
      image2_link: this.organization.image2_link,
      image3_link: this.organization.image3_link,
      image4_link: this.organization.image4_link,
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
        image1: this.image1,
        image2: this.image2,
        image3: this.image3,
        image4: this.image4,
        new1: this.new1,
        new2: this.new2,
        new3: this.new3,
        new4: this.new4,
        id: this.organization.id,
      }
      this.$store.dispatch('organizations/updateOrganizationAbout', data)
      .then(() => {
        this.$toast.success('با موفقیت انجام شد');
      })
      .catch(err => {
        this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
      })
    },
    removeImage(index) {
      switch (index) {
        case "new1":
          this.new1 = ''
          break
        case "new2":
          this.new2 = ''
          break
        case "new3":
          this.new3 = ''
          break
        case "new4":
          this.new4 = ''
          break
        case "image1":
          this.image1 = ''
          break
        case "image2":
          this.image2 = ''
          break
        case "image3":
          this.image3 = ''
          break
        case "image4":
          this.image4 = ''
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
