<template>
  <div class="create-user-form-component">
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
            <span>فرم اطلاعات بیمار</span>
          </div>
          <v-spacer/>
          <div class="create-update-modal-regbox">
            ثبت در سیستم توسط: {{ `${loginUser.lname} ${loginUser.fname}` }}
            ({{ loginUser.created | toRelativeDate }} {{
              loginUser.created | toPersianDate('YYYY/MM/DD HH:mm:ss')
            }})
          </div>
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
                      :src="this.form.new ? this.form.new : '/images/pages/img.svg'"
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
                      <input type="text" v-model="form.fname">
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <div class="create-update-model-input-box">
                      <label>نام خانوادگی</label>
                      <input type="text" v-model="form.lname">
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <div class="create-update-model-input-box">
                      <label>توضیح</label>
                      <input type="text" v-model="form.known_as">
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <div class="create-update-model-input-box">
                      <label>جنسیت</label>
                      <gender-switch-box-component
                        v-model="form.gender"
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>شماره موبایل</label>
                  <input type="tel" v-model="form.tel">
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>شماره تماس</label>
                  <input type="tel" v-model="form.tel1">
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>کد ملی</label>
                  <input type="text" v-model="form.cardno">
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="4"
                v-if="isAdmin"
              >
                <div class="create-update-model-input-box">
                  <label>گروه</label>
                  <multiselect searchable clearOnSelect allowEmpty v-model="userGroup" placeholder="" label="name"
                               track-by="name" :options="userGroups"
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
                sm="4"
                md="4"
                v-if="isAdmin"
              >
                <div class="create-update-model-input-box">
                  <label>موسسه</label>
                  <multiselect searchable clearOnSelect allowEmpty v-model="organization" placeholder="" label="name"
                               track-by="name" :options="organizations"
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
                sm="4"
                md="4"
              >
                <date-picker
                  v-model="form.birth_date"
                  custom-input="#birth-date"
                  format="YYYY-MM-DD"
                  display-format="jYYYY/jMM/jDD"
                />
                <div class="create-update-model-input-box">
                  <label>تاریخ تولد</label>
                  <div class="date-picker">
                    <img src="/images/form/datepicker.svg">
                    <input id="birth-date" class="date-picker">
                  </div>
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>شماره پرونده</label>
                  <input type="text" v-model="form.file_id">
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>استان</label>
                  <multiselect searchable clearOnSelect allowEmpty v-model="province" placeholder="" label="name"
                               track-by="name" :options="provinces"
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
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>شهرستان</label>
                  <multiselect
                    :disabled="!province"
                    searchable clearOnSelect allowEmpty v-model="county" placeholder="" label="name"
                    track-by="name" :options="counties"
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
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>شهر</label>
                  <multiselect
                    :disabled="!county"
                    searchable clearOnSelect allowEmpty v-model="city" placeholder="" label="name"
                    track-by="name" :options="cities"
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
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <div class="create-update-model-input-box">
                  <label>آدرس</label>
                  <textarea
                    v-model="form.address"
                    rows="3"
                  ></textarea>
<!--                  <span class="create-update-modal-error red&#45;&#45;text">این یک ارور است</span>-->
                </div>
              </v-col>
              <v-col
                cols="12"
              >
                <div class="create-update-model-input-box">
                  <label>شرح حال</label>
                  <textarea
                    v-model="form.info"
                    rows="3"
                  ></textarea>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>معرف</label>
                  <input type="text" v-model="form.introducer">
                </div>
              </v-col>
              <v-col
              cols="12"
              sm="4"
              md="4"
              v-if="isAdmin"
            >
              <div class="create-update-model-input-box">
                <label>رمز عبور</label>
                <input type="password" v-model="form.pass">
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
                  @click="createUser"
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
import GenderSwitchBoxComponent from "~/components/panel/profile/user/GenderSwitchBoxComponent";

export default {
  name: "CreateUserFormComponent",
  components: {GenderSwitchBoxComponent, CropImageComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        fname: '',
        lname: '',
        email: '',
        user_group_id: 1,
        gender: '',
        tel: '',
        tel1: '',
        cardno: '',
        birth_date: '',
        file_id: '',
        province_id: 0,
        county_id: 0,
        city_id: 0,
        address: '',
        introducer: '',
        known_as: '',
        info: '',
        due_payment: '',
        pass: '',
        new: null,
      },
      province: null,
      county: null,
      city: null,
      userGroup: null,
      organization: null,
    }
  },
  mounted() {
    this.getProvinces()
    this.getOrganizations()
    this.getUserGroups()
  },
  methods: {
    closeForm() {
      this.$emit('close')
      this.resetForm();
    },
    resetForm() {
      this.form = {
        fname: '',
        lname: '',
        email: '',
        user_group_id: 1,
        gender: '',
        tel: '',
        tel1: '',
        cardno: '',
        birth_date: '',
        file_id: '',
        province_id: 0,
        county_id: 0,
        city_id: 0,
        address: '',
        introducer: '',
        known_as: '',
        info: '',
        due_payment: '',
        pass: '',
        new: null,
      }
      this.city = null
      this.county = null
      this.province = null
    },
    chooseImage(e) {
      this.$refs.crop.setImage(e)
    },
    openChooseImage() {
      this.$refs.image.value = null
      this.$refs.image.click()
    },
    imaged(file) {
      this.form.new = file
    },
    createUser() {
      this.$store.dispatch('users/createUser', this.form)
        .finally(() => {
          this.closeForm()
        })
    },
    getProvinces() {
      this.$store.dispatch('provinces/getList')
    },
    getCounties(id) {
      this.$store.dispatch('provinces/getCounties', id)
    },
    getCities(id) {
      this.$store.dispatch('provinces/getCities', id)
    },
    getOrganizations() {
      this.$store.dispatch('admin/organizations/getOrganizations')
    },
    getUserGroups() {
      this.$store.dispatch('admin/userGroups/getUserGroups')
    },
  },
  computed: {
    show() {
      return this.open;
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    provinces() {
      return this.$store.getters['provinces/getList']
    },
    counties() {
      return this.$store.getters['provinces/getCounties']
    },
    cities() {
      return this.$store.getters['provinces/getCities']
    },
    organizations() {
      return this.$store.getters['admin/organizations/getOrganizations']
    },
    userGroups() {
      return this.$store.getters['admin/userGroups/getUserGroups']
    },
  },
  watch: {
    province(item) {
      if (item) {
        this.form.province_id = item.id
        this.getCounties(item.id)
      } else {
        this.form.province_id = 0
        this.$store.commit('provinces/setCounties', [])
      }
    },
    county(item) {
      if (item) {
        this.form.county_id = item.id
        this.getCities(item.id)
      } else {
        this.form.county_id = 0
        this.$store.commit('provinces/setCities', [])
      }
    },
    city(item) {
      if (item) {
        this.form.city_id = item.id
      } else {
        this.form.city_id = 0
      }
    },
  }
}
</script>

<style scoped>

</style>
