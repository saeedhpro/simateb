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
              @click="closeForm(false)"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>ویرایش بیمار</span>
          </div>
          <v-spacer/>
          <div class="create-update-modal-regbox">
            ثبت در سیستم توسط:
            {{ item.staff ? `${item.staff.fname} ${item.staff.lname}` : '' }}
            ({{ item.created | toRelativeDate }} {{
              item.created | toPersianDate('YYYY/MM/DD HH:mm:ss')
            }})
          </div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="4"
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
                    ><img
                    v-if="form.new"
                    class="full-height"
                    :src="form.new"
                    @click="openChooseImage"
                  >
                    <img
                      v-else-if="item.logo"
                      class="full-height"
                      :src="item.logo"
                      @click="openChooseImage"
                    >
                    <img
                      v-else
                      class="full-height"
                      :src="'/images/pages/img.svg'"
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
                sm="8"
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
                <custom-price-input
                  :label="'هزینه درمان'"
                  v-model="form.due_payment"
                  @input="errors.due_payment = ''"
                  :error="errors.due_payment"
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
                  @click="closeForm(false)"
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
                  @click="updateUser"
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
import { debounce } from "lodash";
import CropImageComponent from "~/components/panel/global/CropImageComponent";
import GenderSwitchBoxComponent from "~/components/panel/profile/user/GenderSwitchBoxComponent";
import CustomTextInput from "~/components/custom/CustomTextInput";
import CustomMultiSelect from "~/components/custom/CustomMultiSelect";
import CustomTextAreaInput from "~/components/custom/CustomTextAreaInput";
import CustomPriceInput from "~/components/custom/CustomPriceInput";
import CustomToggleInput from "~/components/custom/CustomToggleInput";
import CustomNationalCodeInput from "~/components/custom/CustomNationalCodeInput";
import CustomPhoneNumberInput from "~/components/custom/CustomPhoneNumberInput";

export default {
  name: "UpdateUserFormComponent",
  components: {
    CustomPhoneNumberInput,
    CustomNationalCodeInput,
    CustomToggleInput,
    CustomPriceInput,
    CustomTextAreaInput, CustomMultiSelect, CustomTextInput, GenderSwitchBoxComponent, CropImageComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
    item: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      form: {
        id: 0,
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
        due_payment: '0',
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
        tel1: '',
        due_payment: '',
        logo: '',
        cardno: '',
      },
      city: this.item.city ? this.item.city : {
        id: 1225,
        name: "همدان",
        county_id: 419,
      },
      county: this.item.county ? this.item.county : {
        id: 419,
        name: "همدان",
        province_id: 30,
      },
      province: this.item.province ? this.item.province : {
        id: 30,
        name: "همدان",
      },
      userGroup: this.item.user_group ? this.item.user_group : {
        id: 1,
        name: 'بیمار'
      },
      organization: this.item.organization ? this.item.organization : {
        id: 1,
        name: "فتوگرافی سیما طب"
      },
    }
  },
  mounted() {
    this.resetForm()
    this.getProvinces()
      .then(() => {
        let provinceId = this.item.province_id ?? this.province.id
        this.getCounties(provinceId)
          .then(() => {
            let countyId = this.item.county_id ?? this.county.id
            this.getCities(countyId)
          })
      })
    this.getOrganizations()
    this.getUserGroups()
  },
  methods: {
    onTelChanged: debounce(function ($e) {
      let val = $e.target.value;
        if (val && val.length >= 11 && val.length <= 13) {
        this.getUser(val)
      }
    }, 500),
    getUser(tel) {
      if (tel) {
        this.$store.dispatch('users/getUserByTel', tel)
        .then(res => {
          const data = res.data.data
          if (data.id != this.form.id) {
            this.$toast.error(`این شماره پیشتر برای ${data.full_name} ثبت شده است!`)
          }
        })
      }
    },
    closeForm(updated = false) {
      if (updated) {
        this.$emit('updated')
      } else {
        this.$emit('close')
      }
      this.resetForm();
    },
    resetForm() {
      this.form = {
        id: this.item.id,
        fname: this.item.fname,
        lname: this.item.lname,
        email: this.item.email,
        user_group_id: this.item.user_group_id,
        gender: this.item.gender ? this.item.gender.toLowerCase() : null,
        tel: this.item.tel,
        tel1: this.item.tel1,
        cardno: this.item.cardno,
        birth_date: this.item.birth_date,
        file_id: this.item.file_id,
        province_id: null,
        county_id: null,
        city_id: null,
        address: this.item.address,
        introducer: this.item.introducer,
        known_as: this.item.known_as,
        info: this.item.info,
        due_payment: this.item.due_payment,
        pass: this.item.pass,
        new: null,
        has_surgery: this.item.has_surgery,
        surgery: this.item.surgery,
        organization_id: this.item.organization_id,
        logo: this.item.logo,
      }
      this.city = this.item.city ? this.item.city : {
        id: 1225,
        name: "همدان",
        county_id: 419,
      }
      this.county = this.item.county ? this.item.county : {
        id: 419,
        name: "همدان",
        province_id: 30,
      }
      this.province = this.item.province ? this.item.province : {
        id: 30,
        name: "همدان",
      }
      this.userGroup = this.item.user_group ? this.item.user_group : {
        id: 1,
        name: 'بیمار'
      }
      this.organization = this.item.organization ? this.organization : {
        id: 1,
        name: "فتوگرافی سیما طب"
      }
      this.form.province_id = this.province.id
      this.form.county_id = this.county.id
      this.form.city_id = this.city.id
      this.resetErrors()
    },
    resetErrors() {
      this.errors = {
        fname: '',
        lname: '',
        email: '',
        user_group_id: '',
        gender: '',
        tel: '',
        province_id: '',
        county_id: '',
        city_id: '',
        pass: '',
        has_surgery: '',
        surgery: '',
        tel1: '',
        due_payment: '',
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
      // if (this.form.tel1 && !this.$checkPhoneNumber(this.form.tel1, true)) {
      //   this.errors.tel1 = 'شماره تماس صحیح نیست'
      //   error = 'شماره تماس صحیح نیست'
      //   isValid = false
      // }
      if (this.has_surgery && !this.form.surgery) {
        this.errors.surgery = 'فیلد علت جراحی اجباری است'
        error = 'فیلد علت جراحی اجباری است'
        isValid = false
      }
      let p = parseInt(this.form.due_payment)
      if (p < 0 || p > 2147483647) {
        this.errors.due_payment = 'مبلغ هزینه جراحی باید بین 0 و 2147483647 باشد'
        error = 'مبلغ هزینه جراحی باید بین 0 و 2147483647 باشد'
        isValid = false
      }
      if (!isValid) {
        this.$toast.error(error)
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
    updateUser() {
      if (this.validateFrom()) {
        const data = {
          ...this.form,
          due_payment: parseInt(this.form.due_payment)
        }
        this.$store.dispatch('users/updateUser', data)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
          this.closeForm(true)
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
      }
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
        this.organizatioاستانn = this.org ? this.org : {
          id: 1,
          name: "فتوگرافی سیما طب"
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
