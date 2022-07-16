<template>
  <div class="organization-page" v-if="organization">
    <v-row>
      <v-col
        cols="12"
      >
        <div class="organization-details">
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                >
                  <img
                    class="profile-image"
                    :src="organization.logo ? organization.logo : '/images/pages/img.svg'">
                </v-col>
                <v-col
                  cols="12"
                  md="9"
                >
                  <div class="detail-box">
                    <div class="name-box">
                      <span>{{ `${organization.name}` | persianDigit }}</span>
                    </div>
                    <div class="name-box">
                      <span>{{ organization.phone | persianDigit }}</span>
                    </div>
                    <div class="name-box">
                      <span>{{ organization.profession.name | persianDigit }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <div class="description-box">
                <div class="title">توضیحات</div>
                <div class="description">
                  {{ organization.info | persianDigit }}
                </div>
                <div class="action-box">
                  <v-spacer/>
                  <div class="action-button" @click="showUpdate">
                    <v-icon>
                      mdi-pencil-outline
                    </v-icon>
                    <span>ویرایش اطلاعات</span>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="organization-content">
          <div class="page-header-box">
            <nuxt-link :to="`/admin/organizations/${organization.id}`" class="page-header">
              <img src="/images/pages/users.svg" alt="users">
              <span class="title">بیماران</span>
            </nuxt-link>
            <nuxt-link :to="`/admin/organizations/${organization.id}/slider`" class="page-header">
              <img src="/images/pages/sliders.svg" alt="users">
              <span class="title">تصاویر اسلایدر</span>
            </nuxt-link>
            <nuxt-link :to="`/admin/organizations/${organization.id}/about`" class="page-header">
              <img src="/images/pages/about.svg" alt="users">
              <span class="title">درباره موسسه</span>
            </nuxt-link>
            <v-divider v-if="!mini" inset style="margin-left: 0 !important"/>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <v-card
          class="page-main-box"
        >
          <v-row>
            <v-col
              align-self="space-between"
            >
              <div class="save-about"
                   @click="save"
              >
                <img src="/images/profile/choosefile.svg">
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
                    <div class="image-box" v-if="image1">
                      <img :src="image1" alt="">
                    </div>
                    <div class="image-box" v-else-if="organization.image1" @click="chooseImage(1)">
                      <img :src="organization.image1" alt="">
                    </div>
                    <div class="plus-box" v-else @click="chooseImage(1)">
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
                    <div class="image-box" v-if="image2">
                      <img :src="image2" alt="">
                    </div>
                    <div class="image-box" v-else-if="organization.image2" @click="chooseImage(2)">
                      <img :src="organization.image2" alt="">
                    </div>
                    <div class="plus-box" v-else @click="chooseImage(2)">
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
                  <div class="about-org-img">
                    <div class="image-box" v-if="image3">
                      <img :src="image3" alt="">
                    </div>
                    <div class="image-box" v-else-if="organization.image3" @click="chooseImage(3)">
                      <img :src="organization.image3" alt="">
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
                    <div class="image-box" v-if="image4">
                      <img :src="image4" alt="">
                    </div>
                    <div class="image-box" v-else-if="organization.image4" @click="chooseImage(4)">
                      <img :src="organization.image4" alt="">
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
        </v-card>
      </v-col>
    </v-row>
    <crop-image-component
      ref="crop"
      @changed="cropped"
      @imaged="imaged"
    />
    <update-organization-from-component
      @close="showUpdate"
      :show="showUpdateModal"
      :item="organization"
    />
    <input
      type="file"
      ref="file"
      name="image"
      hidden
      accept="image/*"
      @change="setCropImage"
    >
  </div>
</template>

<script>
import UpdateOrganizationFromComponent from "~/components/panel/orgnization/UpdateOrganizationFromComponent";
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import CreateUserFormComponent from "~/components/panel/profile/user/CreateUserFormComponent";
import CropImageComponent from "~/components/panel/global/CropImageComponent";

export default {
  name: "ShowOrganizationComponent.vue",
  components: {CropImageComponent, CreateUserFormComponent, DataTableComponent, UpdateOrganizationFromComponent},
  layout: "admin",
  middleware: "admin",
  mounted() {
    this.getOrganization()
      .then(r => {
        this.text1 = r.data.text1
        this.text2 = r.data.text2
        this.text3 = r.data.text3
        this.text4 = r.data.text4
        this.image1 = r.data.image1
        this.image2 = r.data.image2
        this.image3 = r.data.image3
        this.image4 = r.data.image4
      })
  },
  data() {
    return {
      showUpdateModal: false,
      index: 0,
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
    }
  },
  methods: {
    async getOrganization() {
      const id = this.$route.params.id
      return this.$store.dispatch('organizations/getOrganization', id)
    },
    showUpdate() {
      this.toggleShowUpdateModal()
    },
    toggleShowUpdateModal() {
      this.showUpdateModal = !this.showUpdateModal
    },
    chooseImage(n) {
      this.index = n
      this.$refs.file.click()
    },
    setCropImage(e) {
      console.log(e)
      this.$refs.crop.setImage(e)
    },
    cropped(file) {
      console.log(file)
    },
    imaged(file) {
      if (!file) return
      switch (this.image) {
        case 1:
          this.image1 = file
          break;
        case 2:
          this.image2 = file
          break;
        case 3:
          this.image3 = file
          break;
        case 4:
          this.image4 = file
          break;
      }
    },
    save() {
      let data = {
        text1: this.organization.text1,
        text2: this.organization.text2,
        text3: this.organization.text3,
        text4: this.organization.text4,
        image1: this.organization.image1,
        image2: this.organization.image2,
        image3: this.organization.image3,
        image4: this.organization.image4,
        id: this.organization.id,
      }
      if (this.text1) {
        data.text1 = this.text1
      }
      if (this.text2) {
        data.text2 = this.text2
      }
      if (this.text3) {
        data.text3 = this.text3
      }
      if (this.text4) {
        data.text4 = this.text4
      }
      if (this.image1) {
        data.image1 = this.image1
      }
      if (this.image2) {
        data.image2 = this.image2
      }
      if (this.image3) {
        data.image3 = this.image3
      }
      if (this.image4) {
        data.image4 = this.image4
      }
      this.$store.dispatch('organizations/updateOrganizationAbout', data)
    }
  },
  computed: {
    organization() {
      return this.$store.getters['organizations/getOrganization']
    },
    users() {
      return this.$store.getters['users/getOrganizationPatients']
    },
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    }
  },
}
</script>

<style scoped>

</style>
