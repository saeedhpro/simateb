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
                      :src="form.new ? form.new : '/images/pages/img.svg'"
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
                    sm="12"
                    md="6"
                  >
                    <custom-text-input
                      :label="'توضیح'"
                      v-model="form.known_as"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
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
                <custom-multi-select
                  v-model="userGroup"
                  :items="userGroups"
                  :error="errors.user_group_id"
                  @input="errors.user_group_id = ''"
                  label="گروه"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-multi-select
                  v-model="organization"
                  :items="organizations"
                  :error="errors.organization_id"
                  @input="errors.organization_id = ''"
                  label="موسسه"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-phone-number-input
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
                <custom-phone-number-input
                  :label="'شماره تماس'"
                  v-model="form.tel1"
                  :check-value="false"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <custom-national-code-input
                  :label="'کد ملی'"
                  v-model="form.cardno"
                  :error="errors.cardno"
                  @input="errors.cardno = ''"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <div class="create-update-model-input-box">
                  <label>تاریخ تولد</label>
<!--                  <custom-date-input-->
<!--                    :type="'date'"-->
<!--                    v-model="form.birth_date"-->
<!--                    :initial-value="form.birth_date"-->
<!--                  />-->
                  <date-picker
                    v-model="form.birth_date"
                    format="YYYY-MM-DD"
                    display-format="jYYYY/jMM/jDD"
                    editable
                    class="date-picker"
                    :jump-minute="15"
                    :round-minute="true"
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
                  @change="changeProvince"
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
                  @change="changeCounty"
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
                  @change="changeCity"
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
                v-if="form.user_group_id === 1"
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
                <custom-text-input
                  :label="'رمز عبور'"
                  :error="errors.pass"
                  v-model="form.pass"
                  @input="errors.pass = ''"
                  type="password"
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
                  class="second-button full-width"
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
                  @click="createUser"
                  :disabled="createUserLoading"
                >
                  <v-progress-circular
                    indeterminate
                    color="white"
                    :size="17"
                    :width="4"
                    v-if="createUserLoading"/>
                  <span v-else>ذخیره</span>
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
import CustomToggleButton from "~/components/admin/global/CustomToggleButton";
import CustomTextInput from "~/components/custom/CustomTextInput";
import CustomMultiSelect from "~/components/custom/CustomMultiSelect";
import CustomDateInput from "~/components/custom/CustomDateInput";
import CustomTextAreaInput from "~/components/custom/CustomTextAreaInput";
import CustomToggleInput from "~/components/custom/CustomToggleInput";
import CustomNationalCodeInput from "~/components/custom/CustomNationalCodeInput";
import CustomPhoneNumberInput from "~/components/custom/CustomPhoneNumberInput";

export default {
  name: "AdminCreateUserFormComponent",
  components: {
    CustomPhoneNumberInput,
    CustomNationalCodeInput,
    CustomToggleInput,
    CustomTextAreaInput,
    CustomDateInput,
    CustomMultiSelect, CustomTextInput, CustomToggleButton, GenderSwitchBoxComponent, CropImageComponent
  },
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
    org: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        fname: '',
        lname: '',
        email: '',
        user_group_id: 1,
        organization_id: this.org ? this.org.id : 1,
        gender: '',
        tel: '',
        tel1: '',
        nid: '',
        birth_date: '',
        file_id: '',
        province_id: 30,
        county_id: 419,
        city_id: 1225,
        address: '',
        introducer: '',
        known_as: '',
        info: '',
        surgery_price: '0',
        pass: '',
        new: null,
        has_surgery: false,
        surgery: '',
        cardno: '',
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
        surgery_price: '',
        tel1: '',
        cardno: '',
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
      userGroup: {
        id: 1,
        name: 'بیمار'
      },
      organization: this.org ? this.org : {
        id: 1,
        name: "فتوگرافی سیما طب"
      },
      createUserLoading: false
    }
  },
  mounted() {
    this.getProvinces()
      .then(() => {
        this.getCounties(this.province.id)
          .then(() => {
            this.getCities(this.county.id)
          })
      })
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
        organization_id: this.org ? this.org.id : 1,
        gender: '',
        tel: '',
        tel1: '',
        nid: '',
        birth_date: '',
        file_id: '',
        province_id: 0,
        county_id: 0,
        city_id: 0,
        address: '',
        introducer: '',
        known_as: '',
        info: '',
        surgery_price: '0',
        pass: '',
        new: null,
        has_surgery: false,
        surgery: '',
        cardno: '',
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
      this.userGroup = {
        id: 1,
        name: 'بیمار'
      }
      this.organization = this.org ? this.org : {
        id: 1,
        name: "فتوگرافی سیما طب"
      }
      this.resetErrors()
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
      this.createUserLoading = true
      if (this.validateFrom()) {
        this.$store.dispatch('admin/users/createUser', this.form)
          .then(() => {
            this.$toast.success('با موفقیت انجام شد');
            setTimeout(() => {
              this.createUserLoading = false
              this.closeForm()
            }, 4000)
          })
          .catch(err => {
            this.createUserLoading = false
            this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
          })
      } else {
        this.createUserLoading = false
      }
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
        surgery_price: '',
        tel1: '',
        cardno: '',
      }
    },
    codeMelliCheck(code) {
      if (!code) return true
      const L = code.length;
      if (L < 8 || L > 10 || parseInt(code, 10) === 0) {
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
    },
    validateFrom() {
      this.resetErrors()
      let isValid = true
      let error = ""
      if (!this.form.fname) {
        this.errors.fname = 'فیلد نام اجباری است'
        error = 'فیلد نام اجباری است'
        isValid = false
      }
      if (!this.form.lname) {
        this.errors.lname = 'فیلد نام خانوادگی اجباری است'
        error = 'فیلد نام خانوادگی اجباری است'
        isValid = false
      }
      if (!this.form.gender) {
        this.errors.gender = 'فیلد جنسیت اجباری است'
        error = 'فیلد جنسیت اجباری است'
        isValid = false
      }
      if (!this.form.user_group_id) {
        this.errors.user_group_id = 'فیلد گروه اجباری است'
        error = 'فیلد گروه اجباری است'
        isValid = false
      }
      if (!this.form.organization_id) {
        this.errors.organization_id = 'فیلد موسسه اجباری است'
        error = 'فیلد موسسه اجباری است'
        isValid = false
      }
      if (!this.form.tel) {
        this.errors.tel = 'فیلد شماره موبایل اجباری است'
        error = 'فیلد شماره موبایل اجباری است'
        isValid = false
      }
      if (!this.form.province_id) {
        this.errors.province_id = 'فیلد استان اجباری است'
        error = 'فیلد استان اجباری است'
        isValid = false
      }
      // if (this.form.tel1 && !this.$checkPhoneNumber(this.form.tel1, true)) {
      //   this.errors.tel1 = 'شماره تماس صحیح نیست'
      //   error = 'شماره تماس صحیح نیست'
      //   isValid = false
      // }
      if (!this.form.county_id) {
        this.errors.county_id = 'فیلد شهرستان اجباری است'
        error = 'فیلد شهرستان اجباری است'
        isValid = false
      }
      if (!this.form.city_id) {
        this.errors.city_id = 'فیلد شهر اجباری است'
        error = 'فیلد شهر اجباری است'
        isValid = false
      }
      if (!this.codeMelliCheck(this.form.cardno)) {
        this.errors.cardno = 'فیلد کدملی صحیح نیست'
        error = 'فیلد کدملی صحیح نیست'
        isValid = false
      }
      if (!this.form.pass) {
        this.errors.pass = 'فیلد پسورد اجباری است'
        isValid = false
      }
      if (this.has_surgery && !this.form.surgery) {
        this.errors.surgery = 'فیلد علت جراحی اجباری است'
        error = 'فیلد علت جراحی اجباری است'
        isValid = false
      }
      let p = parseInt(this.form.surgery_price)
      if (p < 0 || p > 2147483647) {
        this.errors.surgery_price = 'مبلغ هزینه جراحی باید بین 0 و 2147483647 باشد'
        error = 'مبلغ هزینه جراحی باید بین 0 و 2147483647 باشد'
        isValid = false
      }
      if (!isValid) {
        this.$toast.error(error)
      }
      return isValid;
    },
    getProvinces() {
      return this.$store.dispatch('provinces/getList')
    },
    getCounties(id) {
      return this.$store.dispatch('provinces/getCounties', id)
    },
    getCities(id) {
      return this.$store.dispatch('provinces/getCities', id)
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
    },
    changeProvince(item) {
      if (item) {
        this.getCounties(item.id)
        this.form.province_id = item.id
        this.county = null
        this.city = null
      } else {
        this.province = null
        this.county = null
        this.city = null
        this.form.province_id = 0
        this.$store.commit('provinces/setCounties', [])
      }
      this.province = item
    },
    changeCounty(item) {
      if (item) {
        this.getCities(item.id)
        this.form.county_id = item.id
        this.city = null
      } else {
        this.county = null
        this.city = null
        this.form.county_id = 0
        this.$store.commit('provinces/setCities', [])
      }
      this.county = item
    },
    changeCity(item) {
      if (item) {
        this.city = item
        this.form.city_id = item.id
      } else {
        this.city = null
        this.form.city_id = 0
      }
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
    organizations() {
      return this.$store.getters['admin/organizations/getOrganizations']
    },
    userGroups() {
      return this.$store.getters['admin/userGroups/getUserGroups']
    },
  },
  watch: {
    userGroup(val) {
      if (val) {
        this.form.user_group_id = val.id
      } else {
        this.form.user_group_id = 1
        this.userGroup = {
          id: 1,
          name: 'بیمار'
        }
      }
    },
    organization(val) {
      if (val) {
        this.form.organization_id = val.id
      } else {
        this.form.organization_id = this.org ? this.org.id : 1
        this.organization = this.org ? this.org : {
          id: 1,
          name: "فتوگرافی سیما طب"
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
