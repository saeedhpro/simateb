<template>
  <div class="appointment-form-component" v-if="show">
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
          <div class="create-update-modal-edit-btn" @click="openEditModal">
            <v-icon small> mdi-pencil</v-icon>
            <span>ویرایش</span>
          </div>
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
                      :src="getLogo(appointment)">
                  </v-col>
                  <v-col
                    cols="12"
                    md="8"
                  >
                    <div class="detail-box">
                      <div class="name-box">
                        <nuxt-link :to="appointment.user ? `/profile/${appointment.user.id}` : '#'">{{
                            appointment.user ? `${appointment.user.fname} ${appointment.user.lname}` : '-' | persianDigit
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
                            appointment.user && appointment.user.file_id ? appointment.user.file_id : '-' | persianDigit
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
                    <span>{{
                        moment.from(appointment.start_at, "en", "YYYY/MM/DD HH:mm:ss").utc(true).format("YYYY/MM/DD HH:mm") | toPersianDate('dddd - DD MMMM')
                      }}</span>
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
                    <span>
                      {{
                        moment.from(appointment.start_at, "en", "YYYY/MM/DDTHH:mm:ssZ").format("HH:mm") | persianDigit
                      }}</span>
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
        <v-card-actions>
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
                  <v-col
                    cols="12"
                    sm="3"
                    v-if="isReDoctor && admissioned"
                  >
                    <button
                      class="send-button form-button"
                      @click="doAction('result')"
                    >
                      ارسال نتایج
                    </button>
                  </v-col>
<!--                  <button-->
<!--                    class="action-bar-button"-->
<!--                    @click="doAction('update')"-->
<!--                  >-->
<!--                    ذخیره-->
<!--                  </button>-->
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
    <v-dialog
      v-model="showPrescriptionList"
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
              @click="showPrescriptionList = false"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>لیست اقدامات قبلی</span>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row
            >
              <v-col
                cols="12"
              >
                <data-table-component
                  :headers="headers"
                  :page="1"
                  :total="prescriptionList.length"
                  @paginate="() => {}"
                >
                  <template v-slot:body>
                    <tr  v-for="(p,i) in prescriptionList" :key="i">
                      <td class="text-center">{{ i + 1 }}</td>
                      <td class="text-center">
                        <span
                          v-for="(p,i) in toList(p.prescription)"
                          :key="i"
                          class="file-id mx-1"
                        >
                        {{ p }}
                        </span>
                      </td>
                      <td class="text-center">
                        <span class="file-id">
                          {{
                            p.start_at_fa
                          }}
                        </span>
                      </td>
                    </tr>
                  </template>
                  <template v-slot:notfound>
                    <div v-if="prescriptionList.length == 0">اطلاعاتی یافت نشد</div>
                  </template>
                </data-table-component>
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
                  @click="showPrescriptionList = false"
                >
                  بستن
                </button>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
                  class="second-button"
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

    <update-appointment-form-component
      :open="showUpdateModal"
      v-if="item"
      :item="item"
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
import CaseTypeCheckboxComponent from "~/components/panel/appointment/CaseTypeCheckboxComponent";
import PrescriptionActionFormComponent
  from "~/components/panel/appointment/AppointmentForm/PrescriptionActionFormComponent";
import DataTableComponent from "~/components/panel/global/DataTableComponent";
import WireBoxComponent from "~/components/panel/appointment/AppointmentForm/WireBoxComponent";
import ReferBoxComponent from "~/components/panel/appointment/AppointmentForm/ReferBoxComponent";
import CropImageComponent from "~/components/panel/global/CropImageComponent";
import UpdateAppointmentFormComponent
  from "~/components/panel/appointment/AppointmentForm/UpdateAppointmentFormComponent";
import DeleteUserModalComponent from "~/components/global/delete/DeleteUserModalComponent";
import moment from "jalali-moment";

export default {
  name: "AppointmentFormComponent",
  components: {
    DeleteUserModalComponent,
    UpdateAppointmentFormComponent,
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
    isSurgery: {
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
      options: {
        showClass:"f-scaleIn",
        hideClass: "f-scaleOut",
        animated: true,
        thumbs: {
          autoStart : true,
          type: "classic",
          axis: 'y',
          parentEl: '.fancybox__container',
        },
      },
      moment: moment,
      loaded: false,
      showUpdateModal: false,
      showActions: false,
      showPrescriptionList: false,
      doctorPrescription: false,
      pType: 'prescription',
      prescription: '',
      file: null,
      showDeleteApp: false,
      showFile: false,
      showAddDescModal: false,
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
        },
        {
          id: 5,
          title: 'در انتظار',
          color: '#F5AC00',
          background: '#FFF9EB'
        }
      ],
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
      deletedResults: [],
      prescriptionList: [],
      headers: [
        '',
        'اقدام',
        'تاریخ',
      ],
    }
  },
  methods: {
    getReferedResults() {
      console.log('refered')
      this.$store.dispatch('appointments/getAppointmentReferedResults', {
        id: this.item.id,
      })
    },
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
      this.resetForm(true);
    },
    done() {
      this.$emit('done')
      setTimeout(() => {
        this.resetForm(true);
      }, 100)
    },
    resetForm(close = false) {
      if (!this.item) return
      this.newFiles = []
      if (!close) {
        this.getAppointment()
          .then(res => {
            const app = res.data.data;
            this.setAppointment(app)
            this.getResults()
            if(this.isReDoctor) {
              this.getReferedResults()
            }
          })
          .catch(err => {
          })
          .finally(() => {
            this.loaded = true
          })
      } else {
        this.loaded = true
      }
    },
    getAppointment() {
      return this.$store.dispatch('appointments/getAppointment', this.item.id)
    },
    setAppointment(item) {
      if (!item) {
        return
      }
      // let date = moment.from(this.item.start_at, "en", "YYYY/MM/DDTHH:mm:ssZ").utc(true).format("YYYY/MM/DD HH:mm:ss")
      // date = moment.from(date, 'fa', 'YYYY/MM/DD HH:mm:ss').locale('en').format("YYYY/MM/DD HH:mm:ss")
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
      this.getAppointmentPrescription()
    },
    getUsers() {
      this.$store.dispatch('users/getUsers')
    },
    getCaseTypes() {
      const type = this.isSurgery ? 2 : 1
      this.$store.dispatch('cases/getCaseTypes', {type: type})
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
    getLastPrescriptions() {
      this.$store.dispatch('appointments/getLastPrescriptions', this.appointment.id)
      .then(res => {
        if(res.data) {
          this.prescriptionList = res.data.data
        }
        this.showPrescriptionList = true
      })
    },
    getAppointmentPrescription() {
      this.$store.dispatch('appointments/getAppointmentPrescription', this.item.id)
      .then(res => {
        const p = res.data.data;
        this.prescription = p ?? '';
      })
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
        case 'accepted':
          this.doAccepted()
          break;
        case 'canceled':
          this.doCanceled()
          break;
        case 'result':
          this.sendResult()
          break;
        case 'appcode':
          this.createAppCode()
          break;
        case 'waiting':
          this.doWaiting()
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
        results: this.newFiles,
        start_at: this.item.start_at,
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
          this.loading()
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
        start_at: this.item.start_at,
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
          this.loading()
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
          this.loading()
        })
    },
    createAppCode() {
      if (this.appointment.appcode) {
        this.loading()
        return
      }
      this.$store.dispatch('appointments/createAppointmentAppCode', this.appointment.id)
        .then((res) => {
          this.appointment.appcode = res.data
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
          this.loading()
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
        })
    },
    doAccepted() {
      this.$store.dispatch('appointments/acceptedAppointment', this.appointment.id)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد');
          this.done()
          this.loading()
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          this.$emit('close')
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
          this.loading()
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
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
        .finally(() => {
          this.done()
          this.loading()
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
          this.loading()
          this.$toast.success('با موفقیت انجام شد');
        })
        .catch(err => {
          this.$toast.error('متاسفانه خطایی رخ داده است. لطفا دوباره امتحان کنید');
        })
    },
    openAddResultModal() {
      this.$refs.image.value = null
      this.$refs.image.click()
    },
    openAddDescModal() {
      this.showAddDescModal = true
    },
    closeAddDescModal() {
      this.appointment.d_desc = this.item.d_desc
      this.showAddDescModal = false
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
      if (this.pType == 'prescription') {
        const array = this.appointment.prescription.trim().split(' - ')
        if (array[0] == '') {
          array[0] = item
        } else {
          array.push(item)
        }
        this.appointment.prescription = array.length == 1 ? array.join('') : array.join(' - ')
      } else if ((this.pType == 'future_prescription')) {
        const array = this.appointment.future_prescription.trim().split(' - ')
        if (array[0] == '') {
          array[0] = item
        } else {
          array.push(item)
        }
        this.appointment.future_prescription = array.length == 1 ? array.join('') : array.join(' - ')
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
    openEditModal() {
      // this.$emit('openUpdate', this.item)
      this.toggleUpdateModal()
    },
    toggleUpdateModal() {
      this.showUpdateModal = !this.showUpdateModal
    },
    toggleShowActions() {
      this.showActions = !this.showActions
    },
    closeUpdateModal() {
      this.toggleUpdateModal()
    },
    doneUpdateModal() {
      this.toggleUpdateModal()
      this.done()
    },
    showRemoveAppointment() {
      this.showDeleteApp = true
    },
    cancelRemoveAppointment() {
      this.showDeleteApp = false
    },
    removeAppointment() {
      this.$store.dispatch('appointments/deleteAppointments', {
        ids: [this.appointment.id]
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
    toList(p) {
      return p.length > 0 ? p.split('-') : [];
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
    }
  },
  computed: {
    showCode() {
      return this.appointment.photography_cases.length > 0 || this.appointment.radiology_cases.length > 0 || this.appointment.doctor_id != null
    },
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
    show() {
      return this.open;
    },
    isDoctor() {
      if (!this.loginUser) return false;
      return this.loginUser.organization.is_doctor;
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
    resulted() {
      const profession_id = this.loginUser.organization.profession_id;
      if (profession_id == 1) {
        return this.appointment.p_admission_at != "" && this.appointment.p_result_at != "" &&  this.appointment.p_admission_at != null && this.appointment.p_result_at != null
      } else if (profession_id == 2) {
        return this.appointment.l_admission_at != "" && this.appointment.l_result_at != "" &&  this.appointment.l_admission_at != null && this.appointment.l_result_at != null
      } else if (profession_id == 3) {
        return this.appointment.r_admission_at != "" && this.appointment.r_result_at != "" &&  this.appointment.r_admission_at != null && this.appointment.r_result_at != null
      } else if (this.isReDoctor) {
        return this.appointment.d_admission_at != "" && this.appointment.d_result_at != "" &&  this.appointment.d_admission_at != null && this.appointment.d_result_at != null
      } else {
        return (this.appointment.r_admission_at != "" && this.appointment.r_result_at != "" &&  this.appointment.p_admission_at != null && this.appointment.p_result_at != null) ||
          (this.appointment.l_admission_at != "" && this.appointment.l_result_at != "" &&  this.appointment.l_admission_at != null && this.appointment.l_result_at != null) ||
          (this.appointment.p_admission_at != "" && this.appointment.p_result_at != "" &&  this.appointment.p_admission_at != null && this.appointment.p_result_at != null) ||
          (this.appointment.d_admission_at != "" && this.appointment.d_result_at != "" &&  this.appointment.d_admission_at != null && this.appointment.d_result_at != null)
      }
    },
    admissioned() {
      const profession_id = this.loginUser.organization.profession_id;
      if (profession_id == 1) {
        return this.appointment.p_admission_at != "" && this.appointment.p_admission_at != null
      } else if (profession_id == 2) {
        return this.appointment.l_admission_at != "" && this.appointment.l_admission_at != null
      } else if (profession_id == 3) {
        return this.appointment.r_admission_at != "" && this.appointment.r_admission_at != null
      } else if (this.isReDoctor) {
        return this.appointment.d_admission_at != "" && this.appointment.d_admission_at != null
      }
      return false;
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
    isReDoctor() {
      return this.loginUser.organization.id == this.appointment.doctor_id
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
  watch: {
    user() {
      if (this.user) {
        this.appointment.file_id = this.user.file_id
        this.appointment.cardno = this.user.cardno
        this.appointment.user_id = this.user.id
        this.appointment.tel = this.user.tel
      }
    },
    item(val) {
      if (val) {
        this.resetForm()
      }
    },
  }
}
</script>

<style scoped>

</style>
