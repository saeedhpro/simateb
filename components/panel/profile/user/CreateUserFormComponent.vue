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
            <span>افزودن کاربر</span>
          </div>
          <v-spacer/>
          <div class="create-update-modal-regbox">
            ثبت در سیستم توسط: {{ `${loginUser.lname} ${loginUser.fname}` }}
            ({{ $moment() | toRelativeDate }} {{
              $moment() | toPersianDate('YYYY/MM/DD HH:mm:ss')
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
                      @newImage="openChooseImage"
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
                    <custom-text-input
                      :label="'نام'"
                      :error="errors.fname"
                      v-model="form.fname"
                      @input="errors.fname = ''"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <custom-text-input
                      :label="'نام خانوادگی'"
                      :error="errors.lname"
                      v-model="form.lname"
                      @input="errors.lname = ''"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <custom-text-input
                      :label="'توضیح'"
                      v-model="form.known_as"
                    />
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
                        :error="errors.gender"
                        @input="errors.gender = ''"
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
                <custom-text-input
                  :label="'شماره موبایل'"
                  :error="errors.tel"
                  v-model="form.tel"
                  @input="errors.tel = ''"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-text-input
                  :label="'شماره تماس'"
                  v-model="form.tel1"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-text-input
                  :label="'کد ملی'"
                  v-model="form.cardno"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>تاریخ تولد</label>
                  <date-picker
                    v-model="form.birth_date"
                    format="YYYY-MM-DD"
                    display-format="jYYYY/jMM/jDD"
                    editable
                    class="date-picker"
                  >
                    <template v-slot:label>
                      <img src="/images/form/datepicker.svg">
                    </template>
                  </date-picker>
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-text-input
                  :label="'شماره پرونده'"
                  v-model="form.file_id"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-multi-select
                  v-model="province"
                  :items="provinces"
                  :error="errors.province_id"
                  @input="errors.province_id = ''"
                  label="استان"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-multi-select
                  v-model="county"
                  :items="counties"
                  :error="errors.county_id"
                  @input="errors.county_id = ''"
                  label="شهرستان"
                  :disabled="!province"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-multi-select
                  v-model="city"
                  :items="cities"
                  :error="errors.city_id"
                  @input="errors.city_id = ''"
                  label="شهر"
                  :disabled="!county"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <custom-text-area-input
                  :label="'آدرس'"
                  v-model="form.address"
                />
              </v-col>
              <v-col
                cols="12"
              >
                <custom-text-area-input
                  :label="'شرح حال'"
                  v-model="form.info"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-text-input
                  :label="'معرف'"
                  v-model="form.introducer"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-toggle-input
                  :label="'سابقه جراحی'"
                  :error="errors.has_surgery"
                  v-model="form.has_surgery"
                  @input="errors.has_surgery = ''"
                  :off-label="`ندارد`"
                  :on-label="`دارد`"
                />
              </v-col>
              <v-col
                cols="12"
                v-if="form.has_surgery"
              >
                <custom-text-area-input
                  :label="'علت جراحی'"
                  :error="errors.surgery"
                  v-model="form.surgery"
                  @input="errors.surgery = ''"
                  :rows="4"
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
import CustomTextInput from "~/components/custom/CustomTextInput";
import CustomMultiSelect from "~/components/custom/CustomMultiSelect";
import CustomTextAreaInput from "~/components/custom/CustomTextAreaInput";
import CustomToggleInput from "~/components/custom/CustomToggleInput";

export default {
  name: "CreateUserFormComponent",
  components: {
    CustomToggleInput,
    CustomTextAreaInput, CustomMultiSelect, CustomTextInput, GenderSwitchBoxComponent, CropImageComponent
  },
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
        province_id: 30,
        county_id: 419,
        city_id: 1225,
        address: '',
        introducer: '',
        known_as: '',
        info: '',
        due_payment: '',
        pass: '',
        new: null,
        has_surgery: false,
        surgery: '',
      },
      errors: {
        fname: '',
        lname: '',
        email: '',
        user_group_id: '',
        organization_id: '',
        gender: '',
        tel: '',
        province_id: '',
        county_id: '',
        city_id: '',
        pass: '',
        has_surgery: '',
        surgery: '',
      },
      province: {
        id: 30,
        name: "همدان",
      },
      county: {
        id: 419,
        name: "همدان",
        province_id: 30,
      },
      city: {
        id: 1225,
        name: "همدان",
        county_id: 419,
      },
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
        organization_id: this.loginUser.organization ? this.loginUser.organization.id : 1,
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
        has_surgery: false,
        surgery: '',
      }
      this.city = {
        id: 1225,
        name: "همدان",
        county_id: 419,
      }
      this.county = {
        id: 419,
        name: "همدان",
        province_id: 30,
      }
      this.province = {
        id: 30,
        name: "همدان",
      }
      this.resetErrors()
    },
    resetErrors() {
      this.errors = {
        fname: '',
        lname: '',
        email: '',
        user_group_id: '',
        organization_id: '',
        gender: '',
        tel: '',
        province_id: '',
        county_id: '',
        city_id: '',
        pass: '',
        has_surgery: '',
        surgery: '',
      }
    },
    validateFrom() {
      this.resetErrors()
      let isValid = true
      if (!this.form.fname) {
        this.errors.fname = 'فیلد نام اجباری است'
        isValid = false
      }
      if (!this.form.lname) {
        this.errors.lname = 'فیلد نام خانوادگی اجباری است'
        isValid = false
      }
      if (!this.form.gender) {
        this.errors.gender = 'فیلد جنسیت اجباری است'
        isValid = false
      }
      if (!this.form.tel) {
        this.errors.tel = 'فیلد شماره موبایل اجباری است'
        isValid = false
      }
      if (!this.form.province_id) {
        this.errors.province_id = 'فیلد استان اجباری است'
        isValid = false
      }
      if (!this.form.county_id) {
        this.errors.county_id = 'فیلد شهرستان اجباری است'
        isValid = false
      }
      if (!this.form.city_id) {
        this.errors.city_id = 'فیلد شهر اجباری است'
        isValid = false
      }
      if (this.has_surgery && !this.form.surgery) {
        this.errors.surgery = 'فیلد علت جراحی اجباری است'
        isValid = false
      }
      return isValid;
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
      if (this.validateFrom()) {
        this.$store.dispatch('users/createUser', this.form)
          .then(() => {
            this.closeForm()
          })
      }
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
    checkNationalCode(code) {
      const L = code.length;
      if (L < 8 || parseInt(code, 10) === 0) {
        return false
      }
      code = ('0000' + code).substr(L + 4 - 10);
      if (parseInt(code.substr(3, 6), 10) === 0) {
        return false
      }
      const c = parseInt(code.substr(9, 1), 10);
      let s = 0;
      for (let i = 0; i < 9; i++) {
        s += parseInt(code.substr(i, 1), 10) * (10 - i);
      }
      s = s % 11;
      return (s < 2 && c === s) || (s >= 2 && c === (11 - s));
    }
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
  },
  watch: {
    province(item) {
      if (item) {
        this.form.province_id = item.id
        this.getCounties(item.id)
      } else {
        this.form.province_id = 0
        this.province = null
        this.county = null
        this.$store.commit('provinces/setCounties', [])
      }
    },
    county(item) {
      if (item) {
        this.form.county_id = item.id
        this.getCities(item.id)
      } else {
        this.form.county_id = 0
        this.county = null
        this.city = null
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
