<template>
  <div class="appointment-form-component">
    <v-dialog
      v-model="show"
      persistent
      max-width="1056px"
    >
      <v-card
        class="create-update-modal paziresh-form"
        v-if="loaded"
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
        </v-card-title>
        <v-card-text
          class="paziresh-form-box">
          <v-container>
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
                      :src="appointment.user && appointment.user.logo ? appointment.user.logo : 'https://randomuser.me/api/portraits/men/88.jpg'">
                  </v-col>
                  <v-col
                    cols="12"
                    md="8"
                  >
                    <div class="detail-box">
                      <div class="name-box">
                        <span>{{
                            appointment.user ? `${appointment.user.fname} ${appointment.user.lname}` : '-' | persianDigit
                          }}</span>
                        <span class="small">
                          {{ `(${appointment.user ? appointment.user.age : '-'} سال)` }}
                        </span>
                      </div>
                      <div class="phone-box second">
                        <span>{{ appointment.user ? `${appointment.user.tel}` : '-' | persianDigit }}</span>
                      </div>
                      <div class="phone-box second">
                        <span class="small">کد پذیرش: </span>
                        <span>{{ appointment.user ? `${appointment.code}` : '-' | persianDigit }}</span>
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
                    <span>{{ appointment.start_at | toPersianDate('dddd - DD MMMM') }}</span>
                  </div>
                  <div class="phone-box second">
                    <span class="small">
                          پزشک:
                    </span>
                    <span>{{ appointment.organization ? appointment.organization.name : '-' | persianDigit }}</span>
                  </div>
                  <div class="phone-box second">
                    <span class="small">
                          وضعیت فعلی:
                    </span>
                    <span
                      v-if="appointment.status > 0"
                      class="status-box"
                      :style="{
                        'background-color': `${statuses[appointment.status - 1].background}`,
                        'color': `${statuses[appointment.status - 1].color}`
                      }"
                    >{{ statuses[appointment.status - 1].title }}</span>
                  </div>
                </div>
              </v-col>
            </v-row>
            <div v-if="!isDoctor">
              <v-divider
                class="my-5"/>
              <v-row
              >
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
              <v-row
              >
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
              >
                <v-col
                  cols="12"
                  sm="4"
                  md="2"
                >
                  <div class="detail-box">
                    <div class="phone-box">
                    <span class="small">
                          افدامات فعلی:
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
              <v-divider
                class="my-5"/>
              <v-row
              >
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <div class="flex flex-row align-items-center justify-space-between show-flex">
                    <div class="detail-box d-inline-flex">
                      <div class="phone-box">
                          <span class="small">
                            شرح اقدامات و دستور پزشک
                          </span>
                      </div>
                    </div>
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
              <v-row>
                <v-col
                  cols="12"
                >
                  <refer-box-component
                    :photography="appointment.photography"
                    :radiology="appointment.radiology"
                    :radio-items="radiologyCases"
                    :photo-items="photographyCases"
                    @selected="itemSelected"
                    @setMsg="setMsg"
                    @setPhotographyCases="setPhotographyCases"
                    @setRadiologyCases="setRadiologyCases"
                  />
                </v-col>
              </v-row>
            </div>
            <v-divider
              class="my-5"
            />
            <v-row
              v-if="!isDoctor"
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
                  <v-col
                    cols="12"
                    sm="4"
                    md="3"
                    v-for="(r,n) in results"
                    :key="n"
                  >
                    <img @click="openShowResult(r)" class="result-img" :src="r" alt=""/>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    md="3"
                    v-for="(r,n) in newFiles"
                    :key="n + 1000"
                  >
                    <img @click="openShowResult(r)" class="result-img" :src="r" alt=""/>
                  </v-col>
                </v-row>
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
                  v-if="appointment.status === 0"
                >
                  پاک کردن فرم
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
                v-if="!isDoctor && appointment.status === 2"
              >
                <button
                  class="main-button form-button"
                  @click="doAction('update')"
                >
                  ذخیره
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
                <v-row>
                  <v-col>
                    <button
                      v-if="appointment.status === 1"
                      class="main-button form-button"
                      @click="doAction('accept')"
                    >
                      پذیرش
                    </button>
                    <button
                      v-else-if="appointment.status === 2"
                      class="red-button form-button"
                      @click="doAction('cancel')"
                    >
                      کنسل
                    </button>
                    <button
                      v-else-if="appointment.status === 3"
                      class="reserve-button form-button"
                      @click="doAction('reserve')"
                    >
                      رزرو
                    </button>
                  </v-col>
                  <v-col
                    v-if="appointment.status === 2"
                  >
                    <button
                      class="main-button form-button"
                      @click="doAction('update')"
                    >
                      ذخیره
                    </button>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="doctorPrescription"
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
              @click="closeActionForm"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>اقدامات</span>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row dir="ltr">
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="items-box">
                  <prescription-action-form-component
                    title="Retraction & protraction"
                    :items="retractionProtractionList"
                    @selected="addToDoctorDo"
                  />
                  <prescription-action-form-component
                    title="Elastic Therapy"
                    :items="elasticTherapyList"
                    @selected="addToDoctorDo"
                  />
                  <prescription-action-form-component
                    title="Final evaluation"
                    :items="finalEvaluationList"
                    @selected="addToDoctorDo"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="items-box">
                  <prescription-action-form-component
                    title="Appliance adjustment"
                    :items="applianceAdjustmentList"
                    @selected="addToDoctorDo"
                  />
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div class="items-box">
                  <prescription-action-form-component
                    title="primary evaluation"
                    :items="primaryEvaluationList"
                    @selected="addToDoctorDo"
                  />
                  <prescription-action-form-component
                    title="Multi loop wire"
                    :items="multiLoopWireList"
                    @selected="addToDoctorDo"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <wire-box-component
                  @selected="addToDoctorDo"
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
                  @click="closeActionForm"
                >
                  بستن
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
    />
    <v-dialog
      v-model="showFile"
      max-width="500px"
    >
      <img
        alt=""
        @click="closeShowResult"
        class="image"
        :src="file"
      >
    </v-dialog>
  </div>
</template>

<script>
import CaseTypeCheckboxComponent from "~/components/panel/appointment/CaseTypeCheckboxComponent";
import PrescriptionActionFormComponent
  from "~/components/panel/appointment/AppointmentForm/PrescriptionActionFormComponent";
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import WireBoxComponent from "~/components/panel/appointment/AppointmentForm/WireBoxComponent";
import ReferBoxComponent from "~/components/panel/appointment/AppointmentForm/ReferBoxComponent";
import CropImageComponent from "~/components/panel/global/CropImageComponent";

export default {
  name: "AppointmentFormComponent",
  components: {
    ReferBoxComponent,
    WireBoxComponent,
    DataTableComponent,
    PrescriptionActionFormComponent,
    CaseTypeCheckboxComponent,
    CropImageComponent,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
    item: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      overlay: false,
      loaded: false,
      doctorPrescription: false,
      pType: 'prescription',
      file: null,
      showFile: false,
      statuses: [
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
        }
      ],
      appointment: {
        start_at: this.$moment().format("YYYY/MM/DD HH:mm:ss"),
        tel: '',
        cardno: '',
        income: 0,
        user_id: null,
        case_type: '',
        info: '',
        status: 0,
        user: null,
      },
      money: {
        decimal: '.',
        thousands: ',',
        suffix: ' تومان',
        prefix: '',
        precision: 0,
        masked: false
      },
      user: null,
      retractionProtractionList: [
        {
          title: 'Anterior Retraction Loop 14',
          action: 'Anterior Retraction'
        },
        {
          title: 'Canin Retraction',
          action: 'Canin Retraction'
        },
        {
          title: 'posterior protraction',
          action: 'posterior protraction'
        },
      ],
      elasticTherapyList: [
        {
          title: 'CII',
          action: 'CII'
        },
        {
          title: 'CIII',
          action: 'CIII'
        },
        {
          title: 'Box',
          action: 'Box'
        },
        {
          title: 'Criss Cross',
          action: 'Criss Cross'
        },
      ],
      finalEvaluationList: [
        {
          title: 'Debond',
          action: 'Debond'
        },
        {
          title: 'Retainer Delivery',
          action: 'Retainer Delivery'
        },
      ],
      applianceAdjustmentList: [
        {
          title: 'Band & Bond',
          action: 'Band & Bond'
        },
        {
          title: 'Midline Screw Expansion',
          action: 'Midline Screw Expansion'
        },
        {
          title: 'Appliance Delivery',
          action: 'Appliance Delivery'
        },
        {
          title: 'Appliance Adjustment',
          action: 'Appliance Adjustment'
        },
        {
          title: 'Hawley Z Spring',
          action: 'Hawley Z Spring'
        },
        {
          title: 'Lingual Arch',
          action: 'Lingual Arch'
        },
        {
          title: 'Quad Helix',
          action: 'Quad Helix'
        },
        {
          title: 'W Arch',
          action: 'W Arch'
        },
        {
          title: 'TPT',
          action: 'TPT'
        },
        {
          title: 'Spring Activation',
          action: 'Spring Activation'
        },
        {
          title: 'Rapid Palatal Expansion',
          action: 'Rapid Palatal Expansion'
        },
      ],
      primaryEvaluationList: [
        {
          title: 'Clinical Examination',
          action: 'Clinical Examination'
        },
        {
          title: 'Doucumentation',
          action: 'Doucumentation'
        },
        {
          title: 'Consultation',
          action: 'Consultation'
        },
        {
          title: 'Radiography',
          action: 'Radiography'
        },
        {
          title: 'Photography',
          action: 'Photography'
        },
        {
          title: 'Impression',
          action: 'Impression'
        },
      ],
      multiLoopWireList: [
        {
          title: 'Multil Loop 14',
          action: 'Multil Loop 14'
        },
        {
          title: 'Multil Loop 16',
          action: 'Multil Loop 16'
        },
        {
          title: 'Multil Loop 18',
          action: 'Multil Loop 18'
        },
      ],
      newFiles: [],
    }
  },
  methods: {
    getResults() {
      this.$store.dispatch('appointments/getAppointmentResults', {
        id: this.item.id,
        type: ''
      })
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
    openShowResult(o) {
      this.file = o
      this.showFile = !this.showFile
    },
    closeShowResult() {
      this.showFile = !this.showFile
      this.file = null
    },
    closeForm() {
      this.$emit('close')
      this.resetForm();
    },
    resetForm() {
      this.newFiles = []
      this.setAppointment()
      this.getResults()
      this.loaded = true
    },
    setAppointment() {
      this.appointment = {
        case_type: this.item.case_type,
        code: this.item.code,
        created_at: this.item.created_at,
        end_at: this.item.end_at,
        future_prescription: this.item.future_prescription,
        id: this.item.id,
        income: this.item.income,
        info: this.item.info,
        is_vip: this.item.is_vip,
        l_admission_at: this.item.l_admission_at,
        l_imgs: this.item.l_imgs,
        l_result_at: this.item.l_result_at,
        l_rnd_img: this.item.l_rnd_img,
        laboratory: this.item.laboratory,
        laboratory_cases: this.item.laboratory_cases,
        laboratory_id: this.item.laboratory_id,
        laboratory_msg: this.item.laboratory_msg,
        organization: this.item.organization,
        organization_id: this.item.organization_id,
        p_admission_at: this.item.p_admission_at,
        p_imgs: this.item.p_imgs,
        p_result_at: this.item.p_result_at,
        p_rnd_img: this.item.p_rnd_img,
        photography: this.item.photography,
        photography_cases: this.item.photography_cases,
        photography_id: this.item.photography_id,
        photography_msg: this.item.photography_msg,
        prescription: this.item.prescription,
        r_admission_at: this.item.r_admission_at,
        r_imgs: this.item.r_imgs,
        r_result_at: this.item.r_result_at,
        r_rnd_img: this.item.r_rnd_img,
        radiology: this.item.radiology,
        radiology_cases: this.item.radiology_cases,
        radiology_id: this.item.radiology_id,
        radiology_msg: this.item.radiology_msg,
        staff: this.item.staff,
        staff_id: this.item.staff_id,
        start_at: this.item.start_at,
        status: this.item.status,
        subject: this.item.subject,
        updated_at: this.item.updated_at,
        user: this.item.user,
        user_id: this.item.user_id,
        vip_introducer: this.item.vip_introducer,
      }
    },
    getUsers() {
      this.$store.dispatch('users/getUsers')
    },
    getCaseTypes() {
      this.$store.dispatch('cases/getCaseTypes')
    },
    customLabel(item) {
      return item.fname
    },
    onChecked(item) {
      this.appointment.case_type = item.checked ? item.name : ''
    },
    loading() {
      this.$emit('loading')
    },
    doAction(action = 'accept') {
      this.loading()
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
      }
    },
    doUpdate() {
      if (!this.appointment.user_id) {
        this.loading()
        return
      }
      const data = {
        ...this.appointment,
        status: 2,
        results: this.newFiles
      }
      delete data.staff
      delete data.organization
      delete data.user
      delete data.radiology
      delete data.photography
      this.$store.dispatch('appointments/updateAppointment', data)
        .then(() => {
        })
        .finally(() => {
          this.closeForm()
          this.loading()
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
        })
        .catch(err => {
        })
        .finally(() => {
          this.closeForm()
          this.loading()
        })
    },
    doCancel() {
      this.$store.dispatch('appointments/cancelAppointment', this.appointment)
        .then(() => {
        })
        .catch(err => {
        })
        .finally(() => {
          this.closeForm()
          this.loading()
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
        })
        .catch(err => {
        })
        .finally(() => {
          this.closeForm()
          this.loading()
        })
    },
    openAddResultModal() {
      this.$refs.image.value = null
      this.$refs.image.click()
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
    toggleDoctorPrescription() {
      this.doctorPrescription = !this.doctorPrescription
    },
    closeActionForm() {
      this.toggleDoctorPrescription()
    },
    addToDoctorDo(item) {
      if (this.pType === 'prescription') {
        const array = this.appointment.prescription.trim().split(' - ')
        if (array[0] === '') {
          array[0] = item
        } else {
          array.push(item)
        }
        this.appointment.prescription = array.length === 1 ? array.join('') : array.join(' - ')
      } else if ((this.pType === 'future_prescription')) {
        const array = this.appointment.future_prescription.trim().split(' - ')
        if (array[0] === '') {
          array[0] = item
        } else {
          array.push(item)
        }
        this.appointment.future_prescription = array.length === 1 ? array.join('') : array.join(' - ')
      }
      this.toggleDoctorPrescription()
    },
    itemSelected(item) {
      switch (item.type) {
        case 'photography':
          this.appointment.photography_id = item.val
          break;
        case 'radiology':
          this.appointment.radiology_id = item.val
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
    }
  },
  computed: {
    results() {
      return this.$store.getters['appointments/getResults']
    },
    users() {
      return this.$store.getters['users/getUsers']
    },
    cases() {
      return this.$store.getters['cases/getCaseTypes']
    },
    photographyCases() {
      if (this.appointment.photography_cases === "") {
        return []
      }
      return this.appointment.photography_cases.split(',')
    },
    radiologyCases() {
      if (this.appointment.radiology_cases === "") {
        return []
      }
      return this.appointment.radiology_cases.split(',')
    },
    show() {
      return this.open;
    },
    isDoctor() {
      const profession_id = this.loginUser.organization.profession_id;
      return profession_id !== 1 && profession_id !== 2 && profession_id !== 3
    },
    loginUser() {
      return this.$store.getters['login/getUser']
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
          return 'فوتوگرافی';
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
      return 'فوتوگرافی';
    },
  },
  watch: {
    user() {
      this.appointment.file_id = this.user.file_id
      this.appointment.cardno = this.user.cardno
      this.appointment.user_id = this.user.id
      this.appointment.tel = this.user.tel
    },
    item() {
      this.resetForm()
    },
  }
}
</script>

<style scoped>

</style>
