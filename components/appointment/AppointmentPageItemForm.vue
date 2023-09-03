<template>
  <div class="appointment-form-component" v-if="show">
    <v-dialog
      v-model="show"
      persistent
      max-width="1056px"
    >
      <v-card
        class="create-update-modal paziresh-form"
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
            <span>فرم پذیرش</span>
          </div>
          <v-spacer/>
          <div class="create-update-modal-edit-btn" @click="openEditModal">
            <v-icon small> mdi-pencil</v-icon>
            <span>ویرایش</span>
          </div>
        </v-card-title>
        <v-card-text
          class="paziresh-form-box">
          <v-container
            v-if="loading"
          >
          </v-container>
          <v-container
            v-else
          >
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-row>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <img
                      class="profile-image"
                      :src="getLogo(appointment)">
                  </v-col>
                  <v-col
                    cols="12"
                    md="8"
                  >
                    <div class="detail-box">
                      <div class="name-box">
                        <nuxt-link :to="appointment.user ? `/profile/${appointment.user.id}` : '#'">{{
                            appointment.user ? `${appointment.user.fname} ${appointment.user.lname}` : '-'
                          }}</nuxt-link>
                        <span class="small" v-if="appointment.user && appointment.user.age > 0">
                          {{ `(${appointment.user.age} سال)` }}
                        </span>
                      </div>
                      <div class="phone-box second">
                        <span>{{ appointment.user ? `${appointment.user.tel}` : '-' }}</span>
                      </div>
                      <div class="phone-box second"
                           v-if="isDoctor && !isReDoctor"
                      >
                        <span class="small">شماره پرونده: </span>
                        <span class="file-id">{{
                            appointment.user && appointment.user.file_id ? appointment.user.file_id : '-'
                          }}</span>
                      </div>
                      <div class="phone-box second"
                           v-if="!isReDoctor"
                      >
                        <span class="small">کد پذیرش: </span>
                        <span>{{ showCode ? `${appointment.code}` : '-' }}</span>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <div class="detail-box">
                  <div class="phone-box">
                    <span class="small">
                          تاریخ ویزیت:
                    </span>
                    <span>{{ visitDate }}</span>
                  </div>
                  <div class="phone-box second" v-if="!isDoctor">
                    <span class="small">
                          پزشک:
                    </span>
                    <span>{{ appointment.organization ? appointment.organization.name : '-' }}</span>
                  </div>
                  <div class="phone-box second" v-else>
                    <span class="small">
                          ساعت:
                    </span>
                    <span>{{ visitHour }}</span>
                  </div>
                  <div
                    v-if="isDoctor && !isReDoctor"
                    class="phone-box second">
                    <span class="small">
                          علت مراجعه:
                    </span>
                    <span class="file-id">{{
                        appointment.case_type ? appointment.case_type : '-'
                      }}</span>
                  </div>
                  <div class="phone-box second">
                    <span class="small">
                          وضعیت فعلی:
                    </span>
                    <span
                      v-if="resulted"
                      class="status-box resulted"
                    >نتایج ارسال شده</span>
                    <span
                      v-else-if="waiting"
                      class="status-box waiting"
                    >در انتظار مراجعه</span>
                    <span
                      v-else
                      class="status-box"
                      :style="{
                          'background-color': `${statuses[appointment.status - 1].background}`,
                          'color': `${statuses[appointment.status - 1].color}`
                        }"
                    >{{ statuses[appointment.status - 1].title }}</span>
                  </div>
                  <div class="phone-box second d-flex flex-row align-center" style="width: 100%" v-if="admissioned && !isReDoctor">
                    <span class="small" style="width: 50px">
                          کد اپ:
                    </span>
                    <span v-if="appointment.appcode">
                      {{ appointment.appcode }}
                    </span>
                    <div class="d-flex flex-row align-center" style="width: 100%" v-else>
                      <div>غیر فعال</div>
                      <button
                        class="main-button form-button mr-1"
                        style="max-width: 180px"
                        @click="doAction('appcode')"
                      >
                        ایجاد کد جدید
                      </button>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
            <div v-if="!isDoctor">
              <v-divider class="my-5"/>
              <v-row>
                <v-col
                  cols="12"
                  sm="4"
                  md="2"
                >
                  <div class="detail-box">
                    <div class="phone-box">
                    <span class="small">
                          درخواست پزشک:
                    </span>
                    </div>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  md="2"
                  v-if="profession && appointment[profession+'_cases'].length > 0"
                  v-for="(c,i) in appointment[profession+'_cases'].split(',')"
                  :key="i"
                >
                  <div class="item-case-box">{{ c }}</div>
                </v-col>
              </v-row>
              <v-divider class="my-5"/>
              <v-row>
                <v-col
                  cols="12"
                  sm="4"
                  md="2"
                >
                  <div class="detail-box">
                    <div class="phone-box">
                    <span class="small">
                          توضیحات پزشک:
                    </span>
                    </div>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  sm="8"
                  md="10"
                >
                  <div class="detail-box">
                    <div class="phone-box">
                      <span>{{ appointment.prescription }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
            <div v-else>
              <v-divider class="my-5"/>
              <v-row
                v-if="prescription"
              >
                <v-col
                  cols="12"
                  sm="4"
                  md="2"
                >
                  <div class="detail-box">
                    <div class="phone-box">
                    <span class="small">
                          اقدامات فعلی:
                    </span>
                    </div>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  sm="8"
                  md="10"
                >
                  <div class="detail-box">
                    <div class="phone-box">
                      <span>{{ prescription }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-divider
                class="my-5"
                v-if="appointment.prescription && !isReDoctor"
              />
              <v-row
                v-if="!isReDoctor"
              >
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <div class="flex flex-row align-items-center justify-space-between show-flex">
                    <v-btn
                      icon
                      @click="getLastPrescriptions"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                    <div class="detail-box d-inline-flex">
                      <div class="phone-box">
                          <span class="small">
                            شرح اقدامات و دستور پزشک
                          </span>
                      </div>
                    </div>
                    <v-spacer></v-spacer>
                    <button @click="openDoctorPrescriptionModal('prescription')" class="add-more-button">
                      <v-icon>mdi-plus</v-icon>
                      اضافه کردن
                    </button>
                  </div>
                  <div class="mt-2 create-update-model-input-box">
                      <textarea
                        class="prescription-textarea"
                        v-model="appointment.prescription"
                        rows="5"
                      ></textarea>
                  </div>
                </v-col>
                <v-divider vertical inset/>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <div class="flex flex-row align-items-center justify-space-between show-flex">
                    <div class="detail-box d-inline-flex">
                      <div class="phone-box">
                          <span class="small">
                            اقدامات در ویزیت بعدی
                          </span>
                      </div>
                    </div>
                    <button @click="openDoctorPrescriptionModal('future_prescription')" class="add-more-button">
                      <v-icon>mdi-plus</v-icon>
                      اضافه کردن
                    </button>
                  </div>
                  <div class="mt-2 create-update-model-input-box">
                      <textarea
                        class="prescription-textarea"
                        v-model="appointment.future_prescription"
                        rows="5"
                      ></textarea>
                  </div>
                </v-col>
              </v-row>
              <v-row
                v-if="!isReDoctor"
              >
                <v-col
                  cols="12"
                >
                  <refer-box-component
                    :photography="appointment.photography"
                    :radiology="appointment.radiology"
                    :doctor="appointment.doctor"
                    :radio-items="radiologyCases"
                    :photo-items="photographyCases"
                    :doctor-items="doctorImages"
                    @selected="itemSelected"
                    @setMsg="setMsg"
                    @setPhotographyCases="setPhotographyCases"
                    @setRadiologyCases="setRadiologyCases"
                    @setDoctorImages="setDoctorImages"
                    @setDoctorImagesCases="setDoctorImagesCases"
                  />
                </v-col>
              </v-row>
            </div>
            <v-divider
              v-if="!isReDoctor"
              class="my-5"
            />
            <v-row
              v-if="isDoctor && !isReDoctor && resulted"
            >
              <v-col
                cols="12"
                v-if="appointment.d_desc"
              >
                <div class="detail-box">
                  <div class="phone-box">
                    <span class="small">
                      توضیحات متخصص:
                    </span>
                  </div>
                </div>
              </v-col>
              <v-col
                cols="12"
                v-if="appointment.d_desc"
              >
                <div class="detail-box text-right">
                  <p>{{ appointment.d_desc }}</p>
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="2"
              >
                <div class="detail-box">
                  <div class="phone-box">
                    <span class="small">
                      نتایج:
                    </span>
                  </div>
                </div>
              </v-col>
              <v-col
                cols="12"
              >
                <v-row>
                  <Fancybox
                    :options="options"
                  >
                    <a
                      v-for="(i,n) in allResults"
                      :key="n"
                      data-fancybox="gallery"
                      :href="i"
                      class="fancybox-item"
                      :data-fancybox-index="n"
                    >
                      <img
                        class="prescription-image"
                        :src="i"
                        alt=""
                        width="100" height="75"
                      />
                    </a>
                  </Fancybox>
                </v-row>
              </v-col>
            </v-row>
            <v-row
              v-if="!isDoctor && admissioned"
            >
              <v-col
                cols="12"
                sm="4"
                md="2"
              >
                <div class="detail-box">
                  <div class="phone-box">
                    <span class="small">
                      نتایج {{ professionName }}:
                    </span>
                  </div>
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="4"
                v-if="!waiting"
              >
                <button
                  @click="openAddResultModal"
                  class="add-doc-button">
                  <v-icon right color="#ffffff">
                    mdi-plus
                  </v-icon>
                  افزودن تصویر
                </button>
              </v-col>
              <v-col
                cols="12"
              >
                <v-row>
                  <Fancybox
                    :options="options"
                  >
                    <a
                      v-for="(i,n) in allResults"
                      :key="n"
                      data-fancybox="gallery"
                      :href="i"
                      class="fancybox-item result-image"
                      :data-fancybox-index="n"
                    >
                      <v-icon @click.prevent="removeResultImage(i, n)" class="remove-result-image" color="red">mdi-delete</v-icon>
                      <img
                        class="prescription-image"
                        :src="i"
                        alt=""
                        width="100" height="75" />
                    </a>
                  </Fancybox>
                </v-row>
              </v-col>
            </v-row>
            <v-row
              v-if="isReDoctor"
            >
              <v-col
                cols="12"
                sm="4"
                md="2"
              >
                <div class="detail-box">
                  <div class="phone-box">
                    <span class="small">
                      تصاویر ارجاع شده:
                    </span>
                  </div>
                </div>
              </v-col>
              <v-col
                cols="12"
              >
                <v-row>
                  <Fancybox
                    :options="options"
                  >
                    <a
                      v-for="(i,n) in listReferedResults"
                      :key="n"
                      data-fancybox="gallery"
                      :href="i"
                      class="fancybox-item"
                      :data-fancybox-index="n"
                    >
                      <img
                        class="prescription-image"
                        :src="i"
                        alt=""
                        width="100" height="75" />
                    </a>
                  </Fancybox>
                </v-row>
              </v-col>
            </v-row>
            <v-row
              v-if="isReDoctor && admissioned"
            >
              <v-col
                cols="12"
                sm="4"
                md="2"
              >
                <div class="detail-box">
                  <div class="phone-box">
                    <span class="small">
                      ارسال نتایج:
                    </span>
                  </div>
                </div>
              </v-col>
              <v-col
                cols="12"
                v-if="!waiting"
              >
                <button
                  @click="openAddResultModal"
                  class="add-doc-button">
                  <v-icon right color="#ffffff">
                    mdi-plus
                  </v-icon>
                  افزودن تصویر
                </button>
                <button
                  @click="openAddDescModal"
                  class="add-doc-button">
                  <v-icon right color="#ffffff">
                    mdi-plus
                  </v-icon>
                  افزودن توضیحات
                </button>
              </v-col>
              <v-col
                cols="12"
              >
                <v-row>
                  <Fancybox
                    :options="options"
                  >
                    <a
                      v-for="(i,n) in allReferedResults"
                      :key="n"
                      data-fancybox="gallery"
                      :href="i"
                      class="fancybox-item"
                      :data-fancybox-index="n"
                    >
                      <img
                        class="prescription-image"
                        :src="i"
                        alt=""
                        width="100" height="75" />
                    </a>
                  </Fancybox>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions
          v-if="!loading"
        >
          <v-container>
            <v-row
              v-if="isDoctor"
            >
              <v-col
                cols="12"
                sm="2"
                md="2"
                v-if="appointment.status == 0"
              >
                <button
                  class="second-button"
                  @click="resetForm"
                >
                  پاک کردن فرم
                </button>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                md="2"
              >
                <button
                  class="remove-button"
                  @click="showRemoveAppointment"
                  v-if="!isReDoctor"
                >
                  حذف
                </button>
              </v-col>
              <v-spacer/>
              <v-col
                cols="12"
                sm="3"
                v-if="!isDoctor"
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
                sm="3"
                v-if="!isDoctor && waiting"
              >
                <button
                  class="main-button form-button"
                  @click="doAction('accepted')"
                >
                  پذیرش شد
                </button>
              </v-col>
              <v-col
                cols="12"
                sm="3"
                md="3"
                v-if="isDoctor"
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
                v-if="isDoctor"
              >
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <button
                      class="action-bar main-button"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span class="action-bar-content">
                        <span class="text-box">
                          <span
                            v-if="resulted"
                          >
                            نتایج ارسال شده
                          </span>
                          <span
                            v-else-if="waiting"
                          >
                            در انتظار مراجعه
                          </span>
                          <span
                            v-else
                          >
                            {{ statuses[appointment.status - 1].title  }}
                          </span>
                        </span>
                        <span class="icon-box">
                          <v-icon color="white">mdi-chevron-down</v-icon>
                        </span>
                      </span>
                    </button>
                  </template>
                  <button
                    class="action-bar-button"
                    @click="doAction('accept')"
                    v-if="!isReDoctor || !appointment.d_admission_at"
                  >
                    پذیرش
                  </button>
                  <button
                    v-if="appointment.status == 2 && !isReDoctor"
                    class="action-bar-button"
                    @click="doAction('update')"
                  >
                    ذخیره تغییرات
                  </button>
                  <button
                    class="action-bar-button"
                    @click="doAction('cancel')"
                    v-if="!isReDoctor"
                  >
                    کنسل
                  </button>
                  <button
                    class="action-bar-button"
                    @click="doAction('waiting')"
                    v-if="!isReDoctor"
                  >
                    در انتظار
                  </button>
                  <button
                    class="action-bar-button"
                    @click="doAction('reserve')"
                    v-if="!isReDoctor"
                  >
                    رزرو
                  </button>
                  <button
                    v-if="isReDoctor && admissioned"
                    class="send-button form-button"
                    @click="doAction('result')"
                  >
                    ارسال نتایج
                  </button>
                </v-menu>
              </v-col>
            </v-row>
            <v-row
              v-else
            >
              <v-col
                cols="12"
                sm="3"
                v-if="!resulted"
              >
                <button
                  class="canceled-button form-button"
                  @click="doAction('canceled')"
                >
                  لغو پذیرش
                </button>
              </v-col>
              <v-spacer/>
              <v-col
                cols="12"
                sm="3"
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
                sm="3"
                v-if="waiting"
              >
                <button
                  class="main-button form-button"
                  @click="doAction('accepted')"
                >
                  پذیرش شد
                </button>
              </v-col>
              <v-col
                cols="12"
                sm="3"
                v-if="admissioned"
              >
                <button
                  class="send-button form-button"
                  @click="doAction('result')"
                >
                  ارسال نتایج
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <input
      type="file"
      ref="image"
      name="image"
      hidden
      accept="image/*"
      @change="chooseImage"
    >
    <crop-image-component
      ref="crop"
      @changed="cropped"
      @imaged="imaged"
      @newImage="chooseImage"
    />
    <appointment-page-prescription-list-modal
      :open="showPrescriptionList"
      :prescription-list="prescriptionList"
      @close="closePrescriptionListModal"
    />
    <appointment-page-doctor-prescription-modal
      :open="showDoctorPrescription"
      :type="pType"
      :prescription="appointment.prescription"
      :future-prescription="appointment.future_prescription"
      @close="closeDoctorPrescription"
      @done="addDoctorPrescription"
    />
    <update-appointment-form-component
      :open="showUpdateModal"
      v-if="appointment"
      :item="appointment"
      @close="closeUpdateModal"
      @done="doneUpdateModal"
    />
    <delete-user-modal-component
      :title="'پذیرش'"
      :open="showDeleteApp"
      @close="cancelRemoveAppointment"
      @remove="removeAppointment"
    />
  </div>
</template>
<script>
import LoadingCard from "~/components/global/LoadingCard.vue";
import moment from "jalali-moment";
import ReferBoxComponent from "~/components/panel/appointment/AppointmentForm/ReferBoxComponent.vue";
import CropImageComponent from "~/components/panel/global/CropImageComponent.vue";
import DeleteUserModalComponent from "~/components/global/delete/DeleteUserModalComponent.vue";
import UpdateAppointmentFormComponent
  from "~/components/panel/appointment/AppointmentForm/UpdateAppointmentFormComponent.vue";

export default {
  name: "AppointmentPageItemForm",
  components: {
    UpdateAppointmentFormComponent,
    DeleteUserModalComponent, CropImageComponent, ReferBoxComponent, LoadingCard},
  props: {
    id: {
      type: Number,
      required: true
    },
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
    isSurgery: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      appointment: {
        start_at: this.$moment().format("YYYY/MM/DD HH:mm:ss"),
        tel: '',
        d_desc: '',
        cardno: '',
        income: 0,
        user_id: null,
        case_type: '',
        info: '',
        status: 0,
        user: null,
        appcode: null,
        future_prescription: '',
        doctor_id: null,
      },
      prescription: '',
      prescriptionList: [],
      newFiles: [],
      deletedResults: [],
      showPrescriptionList: false,
      showDoctorPrescription: false,
      pType: 'prescription',
      showDeleteApp: false,
      showUpdateModal: false,
    }
  },
  mounted() {
    this.getAppointment(this.id)
  },
  methods: {
    closeForm() {
      this.$emit('close')
    },
    openEditModal() {
      this.showUpdateModal = true
    },
    closeUpdateModal() {
      this.showUpdateModal = false
    },
    doneUpdateModal() {
      this.showUpdateModal = false
      this.done()
    },
    done() {
      this.$emit('done')
      this.loading = true
      setTimeout(() => {
        this.getAppointment(this.id)
      }, 200)
    },
    getAppointment(id) {
      this.$store.dispatch('appointments/getAppointment', id)
        .then(res => {
          const app = res.data.data;
          this.setAppointment(app)
        })
        .catch(err => {
        })
    },
    setAppointment(item) {
      if (!item) {
        return
      }
      try{
        let date = item.start_at
        this.appointment = {
          case_type: item.case_type ? item.case_type : '',
          code: item.code ? item.code : '',
          appcode: item.appcode ? item.appcode : '',
          created_at: item.created_at ? item.created_at : '',
          end_at: item.end_at ? item.end_at : '',
          future_prescription: item.future_prescription ? item.future_prescription : '',
          id: item.id,
          income: item.income,
          info: item.info ? item.info : '',
          is_vip: item.is_vip ? item.is_vip : false,
          d_admission_at: item.d_admission_at ? item.d_admission_at : '',
          d_result_at: item.d_result_at ? item.d_result_at : '',
          l_admission_at: item.l_admission_at ? item.l_admission_at : '',
          l_imgs: item.l_imgs ? item.l_imgs : '',
          l_result_at: item.l_result_at ? item.l_result_at : '',
          l_rnd_img: item.l_rnd_img ? item.l_rnd_img : '',
          laboratory: item.laboratory,
          laboratory_cases: item.laboratory_cases ? item.laboratory_cases : '',
          laboratory_id: item.laboratory_id,
          laboratory_msg: item.laboratory_msg ? item.laboratory_msg : '',
          organization: item.organization,
          organization_id: item.organization_id,
          p_admission_at: item.p_admission_at ? item.p_admission_at : '',
          p_imgs: item.p_imgs ? item.p_imgs : '',
          p_result_at: item.p_result_at ? item.p_result_at : '',
          p_rnd_img: item.p_rnd_img ? item.p_rnd_img : '',
          photography: item.photography,
          photography_cases: item.photography_cases ? item.photography_cases : '',
          photography_id: item.photography_id,
          photography_msg: item.photography_msg ? item.photography_msg : '',
          prescription: item.prescription ? item.prescription : '',
          r_admission_at: item.r_admission_at ? item.r_admission_at : '',
          r_imgs: item.r_imgs ? item.r_imgs : '',
          r_result_at: item.r_result_at ? item.r_result_at : '',
          r_rnd_img: item.r_rnd_img ? item.r_rnd_img : '',
          radiology: item.radiology,
          radiology_cases: item.radiology_cases ? item.radiology_cases : '',
          radiology_id: item.radiology_id,
          doctor: item.doctor,
          doctor_id: item.doctor_id,
          doctor_images: item.doctor_images ? item.doctor_images : [],
          radiology_msg: item.radiology_msg,
          staff: item.staff ?? null,
          staff_id: item.staff_id ?? null,
          start_at: date,
          status: item.status,
          subject: item.subject ?? '',
          updated_at: item.updated_at ?? '',
          user: item.user,
          user_id: item.user_id,
          vip_introducer: item.vip_introducer ?? '',
          waiting: item.waiting,
          last_prescription: item.last_prescription ? item.last_prescription : '',
          d_desc: item.d_desc ? item.d_desc : '',
        }
        this.newFiles = []
        this.getAppointmentPrescription()
        this.getResults()
        if(this.isReDoctor) {
          this.getReferedResults()
        }
      } catch (e) {
        console.log(e, "e")
      }
      this.loading = false
    },
    getAppointmentPrescription() {
      this.$store.dispatch('appointments/getAppointmentPrescription', this.id)
        .then(res => {
          const p = res.data.data;
          this.prescription = p ?? '';
        })
    },
    getResults() {
      this.$store.dispatch('appointments/getAppointmentResults', {
        id: this.id,
        type: ''
      })
    },
    getLogo(app) {
      if (app.user && app.user.logo) {
        return app.user.logo
      } else {
        if (app.user && app.user.gender == 'female') {
          return '/images/profile/woman.svg'
        } else {
          return '/images/profile/man.svg'
        }
      }
    },
    doAction(action) {
      this.loading = true
      switch (action) {
        case 'accept':
          this.doAccept()
          break;
        case 'cancel':
          this.doCancel()
          break;
        case 'update':
          this.doUpdate()
          break;
        case 'reserve':
          this.doReserve()
          break;
        case 'accepted':
          this.doAccepted()
          break;
        case 'canceled':
          this.doCanceled()
          break;
        case 'result':
          this.sendResult()
          break;
        case 'waiting':
          this.doWaiting()
          break;
        case 'appcode':
          this.createAppCode()
          break;
      }
    },
    getLastPrescriptions() {
      this.$store.dispatch('appointments/getLastPrescriptions', this.id)
        .then(res => {
          if(res.data) {
            this.prescriptionList = res.data.data
          }
          this.showPrescriptionList = true
        })
    },
    openDoctorPrescriptionModal(type) {
      switch (type) {
        case 'prescription':
          this.pType = 'prescription'
          this.toggleDoctorPrescription()
          break
        case 'future_prescription':
          this.pType = 'future_prescription'
          this.toggleDoctorPrescription()
          break
      }
    },
    closePrescriptionListModal() {
      this.showPrescriptionList = false
    },
    toggleDoctorPrescription() {
      this.showDoctorPrescription = !this.showDoctorPrescription
    },
    closeDoctorPrescription() {
      this.showDoctorPrescription = false
    },
    addDoctorPrescription(data) {
      if (data.type == 'prescription') {
        this.appointment.prescription = data.prescription
      } else {
        this.appointment.future_prescription = data.future_prescription
      }
      this.closeDoctorPrescription()
    },
    itemSelected(item) {
      switch (item.type) {
        case 'photography':
          this.appointment.photography_id = item.val
          break;
        case 'radiology':
          this.appointment.radiology_id = item.val
          break;
        case 'doctor':
          this.appointment.doctor_id = item.val
          break;
      }
    },
    setMsg(item) {
      switch (item.type) {
        case 'photography':
          this.appointment.photography_msg = item.val
          break;
        case 'radiology':
          this.appointment.radiology_msg = item.val
          break;
      }
    },
    setPhotographyCases(cases) {
      this.appointment.photography_cases = cases.join(',')
    },
    setRadiologyCases(cases) {
      this.appointment.radiology_cases = cases.join(',')
    },
    setDoctorImages(images) {
      this.appointment.doctor_images = images
    },
    setDoctorImagesCases(images) {
      this.appointment.doctor_images = images
    },
    openAddResultModal() {
      this.$refs.image.value = null
      this.$refs.image.click()
    },
    openAddDescModal() {
      this.showAddDescModal = true
    },
    removeResultImage(image, index) {
      const first = image.split(':')[0]
      if (first == 'data') {
        this.newFiles = this.newFiles.splice(index, 1)
      } else {
        this.$store.dispatch('appointments/removeResult', {
          image: image,
          index: index
        })
        const list = image.split('/');
        this.deletedResults.push(list[list.length - 1])
      }
    },
    imaged(file) {
      this.newFiles.push(file)
    },
    chooseImage(e) {
      this.$refs.crop.setImage(e)
    },
    async cropped(o) {
      // const blob = await this.blobToBase64(o)
      // console.log(blob)
      // this.newFiles.push(o)
    },
    resetForm() {
      if (this.id == 0) return
      this.loading = true
      this.getAppointment(this.id)
    },
    showRemoveAppointment() {
      this.showDeleteApp = true
    },
    cancelRemoveAppointment() {
      this.showDeleteApp = false
    },
    removeAppointment() {
      this.$store.dispatch('appointments/deleteAppointments', {
        ids: [this.id]
      })
        .then(() => {
          this.closeForm()
          this.showDeleteApp = false
          this.$emit('remove')
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          this.showDeleteApp = true
        })
    },
    doAccept() {
      const data = {
        ...this.appointment,
        status: 2,
      }
      delete data.staff
      delete data.organization
      delete data.user
      delete data.radiology
      delete data.photography
      this.$store.dispatch('appointments/acceptAppointment', data)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
          this.done()
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          this.loading = false
          this.closeForm()
        })
    },
    doCancel() {
      this.$store.dispatch('appointments/cancelAppointment', this.appointment)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          this.done()
          this.loading = false
          this.closeForm()
        })
    },
    doCanceled() {
      this.$store.dispatch('appointments/canceledAppointment', this.appointment.id)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          this.done()
          this.loading = false
          this.closeForm()
        })
    },
    doReserve() {
      const data = {
        ...this.appointment,
        status: 1,
      }
      delete data.staff
      delete data.organization
      delete data.user
      delete data.radiology
      delete data.photography
      this.$store.dispatch('appointments/reserveAppointment', data)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          this.done()
          this.loading = false
          this.closeForm()
        })
    },
    doUpdate() {
      if (!this.appointment.user_id) {
        this.loading()
        return
      }
      const data = {
        ...this.appointment,
        results: this.newFiles,
        start_at: this.appointment.start_at,
      }
      delete data.staff
      delete data.organization
      delete data.user
      delete data.radiology
      delete data.photography
      this.$store.dispatch('appointments/updateAppointment', data)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          this.done()
          this.loading = false
          this.closeForm()
        })
    },
    doAccepted() {
      this.$store.dispatch('appointments/acceptedAppointment', this.appointment.id)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
          this.done()
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          this.loading = false
          this.getAppointment(this.id)
        })
    },
    createAppCode() {
      if (this.appointment.appcode) {
        this.loading = false
        return
      }
      this.$store.dispatch('appointments/createAppointmentAppCode', this.appointment.id)
        .then((res) => {
          this.appointment.appcode = res.data
        })
    },
    doWaiting() {
      const data = {
        id: this.appointment.id,
        waiting: !this.appointment.waiting
      }
      this.$store.dispatch('appointments/doWaiting', data)
        .then(() => {
          this.done()
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          this.loading = false
          this.closeForm()
        })
    },
    saveDesc() {
      if (!this.appointment.user_id) {
        this.loading()
        return
      }
      const data = {
        ...this.appointment,
        results: this.newFiles,
        start_at: this.appointment.start_at,
      }
      delete data.staff
      delete data.organization
      delete data.user
      delete data.radiology
      delete data.photography
      this.$store.dispatch('appointments/sendDescAppointment', data)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          this.done()
          this.loading = false
          this.closeAddDescModal()
        })
    },
    sendResult() {
      // if (this.newFiles.length == 0) {
      //   return
      // }
      if (!this.appointment.user_id) {
        this.loading()
        return
      }
      const data = {
        id: this.appointment.id,
        results: this.newFiles,
        deleted_results: this.deletedResults
      }
      this.$store.dispatch('appointments/sendAppointmentResults', data)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          this.done()
          this.loading = false
          this.closeForm()
        })
    },
  },
  computed: {
    moment() {
      return moment
    },
    visitDate() {
      return moment.from(this.appointment.start_at,'en','YYYY/MM/DD HH:mm:ss').locale('fa').format('dddd - DD MMMM')
    },
    visitHour() {
      return moment.from(this.appointment.start_at,'en','YYYY/MM/DD HH:mm:ss').format('HH:mm')
    },
    show() {
      return this.open;
    },
    showCode() {
      return (this.appointment.photography_id && this.appointment.photography_cases.length > 0) || (this.appointment.radiology_id && this.appointment.radiology_cases.length > 0) || this.appointment.doctor_id != null
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    isReDoctor() {
      return this.loginUser.organization.id == this.appointment.doctor_id
    },
    isDoctor() {
      if (!this.loginUser) return false;
      return this.loginUser.organization.is_doctor;
    },
    results() {
      return this.$store.getters['appointments/getResults']
    },
    admissioned() {
      const profession_id = this.loginUser.organization.profession_id;
      if (profession_id == 1) {
        return !!this.appointment.p_admission_at
      } else if (profession_id == 2) {
        return !!this.appointment.l_admission_at
      } else if (profession_id == 3) {
        return !!this.appointment.r_admission_at
      } else if (this.isReDoctor) {
        return !!this.appointment.d_admission_at
      }
      return false;
    },
    resulted() {
      const profession_id = this.loginUser.organization.profession_id;
      if (profession_id == 1) {
        return !!this.appointment.p_admission_at && !!this.appointment.p_result_at
      } else if (profession_id == 2) {
        return !!this.appointment.l_admission_at && !!this.appointment.l_result_at
      } else if (profession_id == 3) {
        return !!this.appointment.r_admission_at && !!this.appointment.r_result_at
      } else if (this.isReDoctor) {
        return !!this.appointment.d_admission_at && !!this.appointment.d_result_at
      } else {
        return (!!this.appointment.r_admission_at && !!this.appointment.r_result_at) ||
          (!!this.appointment.p_admission_at && !!this.appointment.p_result_at) ||
          (!!this.appointment.l_admission_at && !!this.appointment.l_result_at) ||
          (!!this.appointment.d_admission_at && !!this.appointment.d_result_at)
      }
    },
    waiting() {
      if (!this.isDoctor) {
        const profession_id = this.loginUser.organization.profession_id;
        if (profession_id == 1) {
          return !this.appointment.p_admission_at
        } else if (profession_id == 2) {
          return !this.appointment.l_admission_at
        } else if (profession_id == 3) {
          return !this.appointment.r_admission_at
        }
        return false
      }
      if (this.isReDoctor) {
        return !this.appointment.d_admission_at
      }
      return this.appointment.waiting
    },
    statuses() {
      return [
        {
          id: 1,
          title: 'رزرو شده',
          color: '#F5AC00',
          background: '#FFF9EB'
        },
        {
          id: 2,
          title: 'پذیرش شده',
          color: '#293366',
          background: '#EBEDFF'
        },
        {
          id: 3,
          title: 'کنسل شده',
          color: '#F44336',
          background: '#FFEDEB'
        },
        {
          id: 4,
          title: 'عدم حضور',
          color: '#424242',
          background: '#F1F2F5'
        },
        {
          id: 5,
          title: 'در انتظار',
          color: '#F5AC00',
          background: '#FFF9EB'
        }
      ]
    },
    photographyCases() {
      if (this.appointment.photography_cases == "") {
        return []
      }
      return this.appointment.photography_cases.split(',')
    },
    radiologyCases() {
      if (this.appointment.radiology_cases == "") {
        return []
      }
      return this.appointment.radiology_cases.split(',')
    },
    doctorImages() {
      return this.appointment.doctor_images
    },
    profession() {
      const profession_id = this.loginUser.organization.profession_id;
      switch (profession_id) {
        case 1:
          return 'photography';
        case 2:
          return 'laboratory';
        case 3:
          return 'radiology';
      }
      return 'photography';
    },
    professionName() {
      const profession_id = this.loginUser.organization.profession_id;
      switch (profession_id) {
        case 1:
          return 'فتوگرافی';
        case 2:
          return 'ازمایشگاه';
        case 3:
          return 'رادیولوژی';
        case 4:
          return 'جراح و فک و صورت';
        case 5:
          return 'ارتودنسی';
        case 6:
          return 'متخصص گوش و حلق و بینی';
        case 7:
          return 'دندان پزشک';
      }
      return 'فتوگرافی';
    },
    options() {
      return {
        showClass: "f-scaleIn",
        hideClass: "f-scaleOut",
        animated: true,
        thumbs: {
          autoStart: true,
          type: "classic",
          axis: 'y',
          parentEl: '.fancybox__container',
        },
      }
    },
    allResults() {
      return this.results.concat(this.newFiles)
    },
    allReferedResults() {
      return this.results.concat(this.newFiles)
    },
    listReferedResults() {
      return this.$store.getters['appointments/getReferedResults']
    }
  },
}
</script>
<style scoped>

</style>
