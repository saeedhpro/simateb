<template>
  <div class="update-organization-form-component">
    <v-dialog
      v-model="show"
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
            <span>افزودن موسسه</span>
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
                <div class="create-update-model-input-box full-height" style="max-height: 175px">
                  <div class="file-input full-width full-height">
                    <input
                      type="file"
                      ref="image"
                      name="image"
                      hidden
                      accept="image/*"
                      @change="chooseImage"
                    >
                    <img
                      class="full-height full-width"
                      :src="getLogo(this.organization)"
                      @click="openChooseImage"
                    >
                    <crop-image-component
                      ref="crop"
                      @imaged="imaged"
                    />
                  </div>
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="8"
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <div class="create-update-model-input-box">
                      <label>نام</label>
                      <input type="text" v-model="organization.name">
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <div class="create-update-model-input-box">
                      <label>توضیح</label>
                      <input type="text" v-model="organization.known_as">
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <div class="create-update-model-input-box">
                      <label>تخصص</label>
                      <multiselect searchable clearOnSelect allowEmpty v-model="profession" placeholder="" label="name"
                                   track-by="name" :options="professions"
                                   :option-height="104" :show-labels="false">
                        <template slot="singleLabel" slot-scope="props"><span
                          class="option__desc"><span
                          class="option__title">{{ `${props.option.name}` }}</span></span>
                        </template>
                        <template slot="option" slot-scope="props">
                          <div class="option__desc"><span class="option__title">{{ props.option.name }}</span></div>
                        </template>
                      </multiselect>
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <div class="create-update-model-input-box">
                      <label>وبسایت</label>
                      <input type="url" v-model="organization.website">
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>شماره تماس ۱</label>
                  <input type="text" v-model="organization.phone">
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>شماره تماس ۲</label>
                  <input type="text" v-model="organization.phone1">
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>آدرس اینستاگرام</label>
                  <input type="text" v-model="organization.instagram">
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>هزینه پیامک</label>
                  <input v-money="money" type="text" v-model.lazy="organization.sms_price">
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>اعتبار پیامک</label>
                  <input v-money="money" type="text" v-model.lazy="organization.sms_credit">
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <div class="create-update-model-input-box">
                  <label>دسته بندی مراجعات بیماران</label>
                  <textarea
                    v-model="organization.case_types"
                    rows="3"
                  ></textarea>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
                v-if="organization.profession_id !== 1"
              >
                <rel-organization-item-component
                  title="فوتوگرافی"
                  :items="getOrganizationsByProfession.photographies"
                  :rel-list="photographyRelList"
                  type="photography"
                  @removeRel="removeRel"
                  @addRel="addRel"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
                v-if="organization.profession_id !== 2"
              >
                <rel-organization-item-component
                  title="آزمایشگاه"
                  :items="getOrganizationsByProfession.laboratories"
                  :rel-list="laboratoryRelList"
                  type="laboratory"
                  @removeRel="removeRel"
                  @addRel="addRel"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
                v-if="organization.profession_id !== 3"
              >
                <rel-organization-item-component
                  title="رادیولوژی"
                  :items="getOrganizationsByProfession.radiologies"
                  :rel-list="radiologyRelList"
                  type="radiology"
                  @removeRel="removeRel"
                  @addRel="addRel"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <rel-organization-item-component
                  title="مطب"
                  :items="getOrganizationsByProfession.doctors"
                  :rel-list="doctorRelList"
                  type="doctor"
                  @removeRel="removeRel"
                  @addRel="addRel"
                />
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
                  class="second-button"
                  @click="resetForm"
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
                  @click="createOrganization"
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
import RelOrganizationItemComponent from "~/components/panel/orgnization/RelOrganizationItemComponent";

export default {
  name: "CreateOrganizationFromComponent",
  components: {RelOrganizationItemComponent, CropImageComponent},
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  mounted() {
    this.resetForm()
    this.getProfessions()
    this.getOrganizationsByProfessionList(this.organization.id)
  },
  data() {
    return {
      organization: {
        id: 0,
        new: null,
        name: '',
        profession_id: null,
        website: '',
        phone: '',
        phone1: '',
        instagram: '',
        sms_price: 0,
        sms_credit: 0,
        case_types: '',
        known_as: '',
        created_at: '',
        logo: '',
        info: '',
        slider_rnd_img: '',
        slider_imgs: 0,
        sliders: '',
        work_hour_start: '',
        work_hour_end: '',
        about_us_html: '',
        text1: '',
        image1: '',
        image2: '',
        text2: '',
        image3: '',
        text3: '',
        rel_organizations: [],
      },
      profession: null,
      money: {
        decimal: '.',
        thousands: ',',
        suffix: ' تومان',
        prefix: '',
        precision: 0,
        masked: false /* doesn't work with directive */
      }
    }
  },
  methods: {
    closeForm() {
      this.$emit('close')
    },
    resetForm() {
      this.organization = {
        id: 0,
        new: null,
        name: '',
        profession_id: null,
        website: '',
        phone: '',
        phone1: '',
        instagram: '',
        sms_price: 0,
        sms_credit: 0,
        case_types: '',
        known_as: '',
        created_at: '',
        logo: '',
        info: '',
        slider_rnd_img: '',
        slider_imgs: 0,
        sliders: '',
        work_hour_start: '',
        work_hour_end: '',
        about_us_html: '',
        text1: '',
        image1: '',
        image2: '',
        text2: '',
        image3: '',
        text3: '',
        rel_organizations: [],
      }
      this.profession = null
    },
    createOrganization() {
      const data = {
        ...this.organization,
        rel_organizations: [
          ...this.organization.rel_organizations.map(i => {
            return {
              organization_id: i.organization.id,
              profession_id: i.profession.id,
              rel_organization_id: i.rel_organization.id,
            }
          }),
        ],
        sms_price: parseFloat(this.organization.sms_price.split(' ')[0].split(',').join('')),
        sms_credit: parseFloat(this.organization.sms_credit.split(' ')[0].split(',').join('')),
      }
      delete data.logo
      this.$store.dispatch('admin/organizations/createOrganization', data)
      this.closeForm()
    },
    chooseImage(e) {
      this.$refs.crop.setImage(e)
    },
    openChooseImage() {
      this.$refs.image.value = null
      this.$refs.image.click()
    },
    imaged(file) {
      this.organization.new = file
    },
    getProfessions() {
      this.$store.dispatch('admin/professions/getProfessions')
    },
    getOrganizationsByProfessionList(id) {
      this.$store.dispatch('admin/organizations/getOrganizationsByProfession', id)
    },
    removeRel(val) {
      this.organization.rel_organizations = this.organization.rel_organizations.filter(i => i.rel_organization.id !== val.id)
    },
    addRel(val) {
      this.organization.rel_organizations.push({
        organization: this.organization,
        organization_id: this.organization.id,
        profession: val.profession,
        profession_id: val.profession_id,
        rel_organization: val,
        rel_organization_id: val.id,
      })
    },
    inList(array, item) {
      return array.findIndex(i => i.id === item.id) > -1
    },
    getLogo(organization) {
      if (this.organization.new) {
        return organization.new
      } else if (organization.logo) {
        return organization.logo
      } else {
        return '/images/pages/img.svg'
      }
    }
  },
  computed: {
    professions() {
      return this.$store.getters['admin/professions/getProfessions']
    },
    getOrganizationsByProfession() {
      return this.$store.getters['admin/organizations/getOrganizationsByProfession']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    photographyRelList() {
      return this.organization.rel_organizations.filter(i => i.profession_id === 1)
    },
    laboratoryRelList() {
      return this.organization.rel_organizations.filter(i => i.profession_id === 2)
    },
    radiologyRelList() {
      return this.organization.rel_organizations.filter(i => i.profession_id === 3)
    },
    doctorRelList() {
      return this.organization.rel_organizations.filter(i => i.profession_id !== 1 && i.profession_id !== 2 && i.profession_id !== 3)
    }
  },
  watch: {
    profession(val) {
      if (val) {
        this.organization.profession_id = val.id
      } else {
        this.organization.profession_id = null
      }
    }
  }
}
</script>

<style scoped>

</style>
