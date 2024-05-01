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
          <div v-if="isOwnDoctor"  class="create-update-modal-edit-btn" @click="openEditModal">
            <v-icon small> mdi-pencil</v-icon>
            <span>ویرایش</span>
          </div>
        </v-card-title>
        <v-card-text
          class="paziresh-form-box">
          <v-container
            v-if="loading"
          >
            <LoadingCard />
          </v-container>
          <v-container
            v-else
          >
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-row>
                  <v-col
                    cols="6"
                    sm="6"
                    md="4"
                  >
                    <img
                      class="profile-image"
                      :src="getLogo(appointment)">
                  </v-col>
                  <v-col
                    cols="6"
                    sm="6"
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
                sm="6"
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
                    <div
                      v-if="resulted && canSeeResulted"
                      class="status-box resulted"
                    >نتایج ارسال شده</div>
                    <div
                      v-else-if="waiting"
                      class="status-box waiting"
                    >در انتظار مراجعه</div>
                    <div
                      v-else
                      class="status-box"
                      :style="{
                          'background-color': `${statuses[appointment.status - 1].background}`,
                          'color': `${statuses[appointment.status - 1].color}`
                        }"
                    >{{ statuses[appointment.status - 1].title }}</div>
                  </div>
<!--                  <div class="phone-box second d-flex flex-row align-center" style="width: 100%" v-if="admissioned && !isReDoctor">-->
<!--                    <span class="small" style="width: 50px">-->
<!--                          کد اپ:-->
<!--                    </span>-->
<!--                    <span v-if="appointment.appcode">-->
<!--                      {{ appointment.appcode }}-->
<!--                    </span>-->
<!--&lt;!&ndash;                    <div class="d-flex flex-row align-center" style="width: 100%" v-else>&ndash;&gt;-->
<!--&lt;!&ndash;                      <div>غیر فعال</div>&ndash;&gt;-->
<!--&lt;!&ndash;                      <button&ndash;&gt;-->
<!--&lt;!&ndash;                        class="main-button form-button mr-1"&ndash;&gt;-->
<!--&lt;!&ndash;                        style="max-width: 180px"&ndash;&gt;-->
<!--&lt;!&ndash;                        @click="doAction('appcode')"&ndash;&gt;-->
<!--&lt;!&ndash;                      >&ndash;&gt;-->
<!--&lt;!&ndash;                        ایجاد کد جدید&ndash;&gt;-->
<!--&lt;!&ndash;                      </button>&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--                  </div>-->
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
                  v-if="isDoctor"
                >
                  <div class="detail-box">
                    <div class="phone-box">
                      <span>{{ appointment.prescription }}</span>
                    </div>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  sm="8"
                  md="10"
                  v-else
                >
                  <div class="detail-box">
                    <div class="phone-box">
                      <span>{{ appointment[profession+'_msg'] }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-divider
                v-if="canSeeInfo"
                class="my-5"/>
              <v-row
                v-if="canSeeInfo"
              >
                <v-col
                  cols="12"
                  sm="4"
                  md="2"
                >
                  <div class="detail-box">
                    <div class="phone-box">
                    <span class="small">
                          توضیحات پذیرش:
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
                      <span>{{ appointment.info }}</span>
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
                            اقدامات پزشک
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
                        :disabled="true"
                        class="prescription-textarea"
                        v-model="doctorPrescription"
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
                    <!-- <button @click="openDoctorPrescriptionModal('future_prescription')" class="add-more-button">
                      <v-icon>mdi-plus</v-icon>
                      اضافه کردن
                    </button> -->
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
                  <appointment-insurance-box
                    :total-price="appointment.total_price"
                    :discount-price="appointment.discount_price"
                    :insurance-id="appointment.insurance_id"
                    :user-insurance-id="appointment.user_insurance_id"
                    :user-id="appointment.user_id"
                    :insurance="appointment.user_insurance"
                    :insurance-price="appointment.insurance_price"
                    :patient-price="appointment.patient_price"
                    @onInsuranceChanged="onInsuranceChanged"
                    @onInsurancePriceChanges="onInsurancePriceChanges"
                  />
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
                    :radiology-msg="appointment.radiology_msg"
                    :photography-msg="appointment.photography_msg"
                    :doctor-msg="appointment.doctor_msg"
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
              v-if="isReDoctor || isDoctor"
            >
              <v-col
                cols="12"
                sm="4"
                md="2"
              >
                <div class="detail-box">
                  <div class="phone-box">
                    <span v-if="isReDoctor" class="small">
                      توضیحات پزشک:
                    </span>
                    <span v-else class="small">
                      توضیحات من:
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
                    {{ appointment.doctor_msg }}
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row
              v-if="(isDoctor || !isReDoctor) && resulted"
            >
              <v-col
                cols="12"
                sm="4"
                md="2"
              >
                <div class="detail-box">
                  <div class="phone-box">
                      <span v-if="isReDoctor" class="small">
                        توضیحات من:
                      </span>
                      <span v-else class="small">
                        توضیحات متخصص:
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
                    {{ appointment.d_desc }}
                  </div>
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                md="2"
                v-if="!isReDoctor"
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
                v-if="!isReDoctor"
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
                        :alt="n"
                        width="100" height="75" />
                    </a>
                  </Fancybox>
                </v-row>
              </v-col>
              <v-col cols="12">
                <dropzone
                  @vdropzone-success="onSuccess"
                  @vdropzone-removed-file="onRemove"
                  id="foo"
                  ref="dropzone"
                  :options="dropzoneOptions"
                  :destroyDropzone="true"
                />
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
                  class="second-button full-width"
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
                  class="second-button full-width"
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
                            v-if="resulted && canSeeResulted"
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
                  class="second-button full-width"
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
      @newImage="openAddResultModal"
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
    <new-appointment-page-doctor-prescription-modal
      v-if="showNewDoctorPrescription"
      :open="showNewDoctorPrescription"
      :selected-actions="appointment.selected_actions"
      :selected-dents="appointment.selected_dents"
      @close="closeNewDoctorPrescription"
      @save="saveNewPrescription"
      @done="addDoctorPrescription"
    />
    <update-appointment-form-component
      :open="showUpdateModal"
      v-if="appointment && showUpdateModal"
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
    <v-dialog
      v-model="showAddDescModal"
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
              @click="closeAddDescModal"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>توضیحات</span>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row
            >
              <div class="create-update-model-input-box">
                <custom-text-area-input
                  v-model="appointment.d_desc"
                  label="توضیحات"
                  :rows="6"
                />
              </div>
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
                  @click="closeAddDescModal"
                >
                  بستن
                </button>
              </v-col>
              <v-col
                cols="12"
                sm="3"
                md="3"
              >
                <button
                  class="main-button"
                  @click="saveDesc"
                >
                  ارسال
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <input type="hidden" value="1" id="index"/>
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
import NewAppointmentPageDoctorPrescriptionModal
  from "~/components/appointment/NewAppointmentPageDoctorPrescriptionModal.vue";
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

export default {
  name: "AppointmentPageItemForm",
  components: {
    Dropzone,
    NewAppointmentPageDoctorPrescriptionModal,
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
      dropzoneOptions: {
        // url: "https://api.sabaapp.ir/api/upload",
        url: "http://127.0.0.1:8000/api/upload",
        thumbnailWidth: 100,
        thumbnailHeight: 100,
        addRemoveLinks: true,
        init: function() {
          this.on('sending', function(file, xhr, formData) {
            let index = document.getElementById('index')
            let random = parseInt(index.value)
            index.value = random + 1
            formData.append('index', random);
          });
        }
      },
      loading: true,
      removed_items: [],
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
        insurance_price: 0,
        patient_price: 0,
        discount_price: 0,
        insurance_id: null,
        insurance: null,
        user_insurance_id: null,
        user_insurance: null,
        selected_actions: [],
        selected_dents: [],
      },
      prescription: '',
      prescriptionList: [],
      newFiles: [],
      deletedResults: [],
      showPrescriptionList: false,
      showDoctorPrescription: false,
      showNewDoctorPrescription: false,
      pType: 'prescription',
      showDeleteApp: false,
      showUpdateModal: false,
      showAddDescModal: false,
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
      this.closeForm()
    },
    done() {
      this.$emit('done')
      // this.loading = true
      this.closeUpdateModal()
      // this.closeForm()
      // setTimeout(() => {
      //   this.getAppointment(this.id)
      // }, 200)
    },
    onSuccess(e, l) {
      e.url = l.url
      e.index = parseInt(l.index)
      this.newFiles.push(e)
      this.newFiles = this.newFiles.sort((a, b) => a.index < b.index ? -1 : a.index > b.index ? 1 : 0)
    },
    onRemove(e) {
      this.newFiles = this.newFiles.filter(i => i.upload.uuid != e.upload.uuid)
    },
    addFile(base64) {
      const file = this.dataURLtoFile(base64, `${this.$moment().format('YYYY_MM_DD_HH_mm_ss')}_temp.png`)
      this.$refs.dropzone.addFile(file);
    },
    dataURLtoFile(dataurl, filename) {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime })
    },
    removeFile(image, index) {
      const list = []
      for (let i = 0; i < this.newFiles.length; i++) {
        if (i !== index - this.results.length) {
          list.push(this.newFiles[i])
        }
      }
      this.$refs.dropzone.removeAllFiles();
      this.newFiles = []
      this.$nextTick(() => {
        list.forEach(file => {
          this.$refs.dropzone.addFile(file);
        })
      })
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
          doctor_msg: item.doctor_msg ? item.doctor_msg : '',
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
          insurance_id: item.insurance_id,
          user_insurance_id: item.user_insurance_id,
          insurance_price: item.insurance_price,
          patient_price: item.patient_price,
          total_price: item.total_price,
          discount_price: item.discount_price,
          insurance: item.insurance,
          user_insurance: item.user_insurance,
          selected_actions: item.selected_actions ?? [],
          selected_dents: item.selected_dents ?? [],
        }
        this.newFiles = []
        this.getAppointmentPrescription()
        this.getResults()
        this.getUserAppointmentResults()
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
    getReferedResults() {
      this.$store.dispatch('appointments/getAppointmentReferedResults', {
        id: this.id,
      })
    },
    getResults() {
      this.$store.dispatch('appointments/getAppointmentResults', {
        id: this.id,
        type: this.getType
      })
    },
    getUserAppointmentResults() {
      this.$store.dispatch('appointments/getUserAppointmentResults', this.appointment.user_id)
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
          this.toggleNewDoctorPrescription()
          // this.toggleDoctorPrescription()
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
    toggleNewDoctorPrescription() {
      this.showNewDoctorPrescription = !this.showNewDoctorPrescription
    },
    saveNewPrescription(item) {
      this.appointment.selected_dents = item.selected_dents
      this.appointment.selected_actions = item.selected_actions
      this.closeNewDoctorPrescription()
    },
    closeDoctorPrescription() {
      if (this.type == 'prescription') {
        this.closeNewDoctorPrescription()
      } else {
        this.showDoctorPrescription = false
      }
    },
    closeNewDoctorPrescription() {
      this.showNewDoctorPrescription = false
    },
    addDoctorPrescription(data) {
      if (data.type == 'prescription') {
        this.appointment.prescription = data.prescription
      } else {
        this.appointment.future_prescription = data.prescription
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
        case 'doctor':
          this.appointment.doctor_msg = item.val
          break;
      }
    },
    onInsuranceChanged(insurance) {
      this.appointment.insurance_price = insurance.insurance_price
      this.appointment.patient_price = insurance.patient_price
      this.appointment.insurance_id = insurance.insurance_id
      this.appointment.user_insurance_id = insurance.user_insurance_id
      this.appointment.total_price = insurance.total_price
      this.appointment.discount_price = insurance.discount_price
    },
    onInsurancePriceChanges(data) {
      this.appointment.insurance_price = data.insurance_price
      this.appointment.patient_price = data.patient_price
      this.appointment.insurance_id = data.insurance_id
      this.appointment.user_insurance_id = data.user_insurance_id
      this.appointment.total_price = data.total_price
      this.appointment.discount_price = data.discount_price
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
    closeAddDescModal() {
      this.getAppointment(this.id)
      this.showAddDescModal = false
    },
    removeResultImage(image, index) {
      const first = image.split(':')[0]
      if (first == 'data') {
        this.removeFile(image, index)
      } else {
        this.results = this.results.filter(i => i !== image)
        this.deletedResults.push(image)
      }
    },
    imaged(file) {
      this.addFile(file)
    },
    chooseImage(e) {
      this.$refs.crop.setImage(e)
    },
    async cropped(o) {
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
          this.$emit('done')
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
      delete data.insurance
      delete data.user_insurance
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
        this.loading = false
        return
      }
      // results: this.newFiles.map(i => i.name),
      const data = {
        ...this.appointment,
        results: this.newFiles.map(i => i.url),
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
        .finally(() => {
          this.loading = false
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
        this.loading = false
        return
      }
      // results: this.newFiles.map(i => i.name),
      const data = {
        ...this.appointment,
        results: this.newFiles.map(i => i.url),
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
      if (this.newFiles.length == 0 && this.deletedResults.length == 0) {
        this.$toast.error('لطفا حداقل یک تصویر جدید بارگذاری نمایید')
        this.loading = false
        return
      }
      if (!this.appointment.user_id) {
        this.loading = false
        return
      }
      // results: this.newFiles.map(i => i.name),
      const data = {
        id: this.appointment.id,
        results: this.newFiles.map(i => i.url),
        deleted_results: this.deletedResults
      }
      this.$axios.post(`/appointments/${this.appointment.id}/result`, data, {
        headers: {
          'Content-Encoding': 'gzip',
          'Content-Type': 'application/json',
        }
      })
        .then((res) => {
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
    removeReferedItem(e, item) {
      e.preventDefault()
      if (this.results.find(i => i === item)) {
        this.results = this.results.filter(i => i !== item)
        this.removed_items.push(item)
      } else {
        this.newFiles = this.newFiles.filter(i => i !== item)
      }
    }
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
    results: {
      get() {
        return this.$store.getters['appointments/getResults']
      },
      set(list = []) {
        this.$store.commit('appointments/setResults', list)
      }
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
    canSeeResulted() {
      return this.loginUser.organization_id == this.appointment.photography_id ||
        this.loginUser.organization_id == this.appointment.radiology_id ||
        this.loginUser.organization_id == this.appointment.laboratory_id ||
        this.loginUser.organization_id == this.appointment.doctor_id
    },
    isOwnDoctor() {
      return this.loginUser.organization_id == this.appointment.organization_id
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
        case "1":
          return 'photography';
        case 2:
        case "2":
          return 'laboratory';
        case 3:
        case "3":
          return 'radiology';
      }
      return 'photography';
    },
    professionName() {
      const profession_id = parseInt(this.loginUser.organization.profession_id);
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
      return this.results.concat(this.newFiles.map(i => i.dataURL))
    },
    allReferedResults() {
      return this.results.concat(this.newFiles.map(i => i.dataURL))
    },
    listReferedResults() {
      return this.$store.getters['appointments/getReferedResults']
    },
    canSeeInfo() {
      return this.loginUser.organization_id == this.appointment.organization_id
    },
    doctorPrescription() {
      let list = [
        ...this.appointment.selected_actions,
        ...this.appointment.selected_dents,
      ]
      return list.join('\n')
    },
    getType() {
      let type = ''
      if (this.appointment.doctor_id == this.loginUser.organization_id) {
        type = 'doctor'
      } else if (this.appointment.photography_id == this.loginUser.organization_id) {
        type = 'photography'
      } else if (this.appointment.radiology_id == this.loginUser.organization_id) {
        type = 'radiology'
      } else if (this.appointment.laboratory_id == this.loginUser.organization_id) {
        type = 'laboratory'
      }
      return type
    }
  },
}
</script>
<style scoped lang="scss">
.refered-items {
  .remove-button {
    position: absolute;
    top: -8px;
    right: -8px;
  }
}
</style>
