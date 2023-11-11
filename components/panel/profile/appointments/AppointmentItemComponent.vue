<template>
  <div class="profile-appointment-item-component">
    <v-row>
      <v-col
        cols="12"
        sm="4"
        md="2"
      >
        <div class="img-box">
          <span class="item-index">{{ ((page - 1) * 10) + (index + 1) }}</span>
          <button
            class="edit-button"
            @click="openUpdateModal"
          >
            ویرایش
          </button>
        </div>
      </v-col>

      <v-col
        cols="12"
        sm="8"
        md="10"
      >
        <div class="appointment-details">
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <div class="time-box">
                <span v-if="!isReDoctor">
                  {{
                    start_at_ago_fa
                  }}
                </span>
                <div  v-if="!isReDoctor">
                  <span class="circle"/>
                  {{ start_at_fa }}
                  <span class="circle"/>
                </div>
                <div
                  v-if="waiting"
                  class="status-box waiting"
                >در انتظار مراجعه</div>
                <div
                  v-else
                  class="status-box"
                  :style="{
                  'background-color': `${statuses[status - 1].background}`,
                  'color': `${statuses[status - 1].color}`
                }"
                >{{ statuses[status - 1].title  }}</div>
                <div
                  v-if="isReDoctor"
                  class="status-box mr-2"
                  :style="{
                  'background-color': `#2BC4A9`,
                  'color': `#EBFFFB`
                }"
                >ارجاع شده ({{ organizationName }})</div>
              </div>
              <div class="case-type" v-if="caseType && !isReDoctor">
                علت مراجعه: <span>{{ caseType  }}</span>
              </div>
              <div class="code" v-if="info && canSeeInfo">
                توضیحات پذیرش: <span>{{ info  }}</span>
              </div>
              <div class="code" v-if="canShowCode">
                کد پذیرش: <span>{{ code  }}</span>
              </div>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <div class="prescription-box" v-if="!isReDoctor">
                اقدامات و دستورات پزشک:
                <span
                  v-for="(p, n) in selectedPrescriptionArray"
                  :key="n"
                  class="prescription"
                >
                  {{ p  }}
                </span>
              </div>
              <div class="prescription-box" v-if="isReDoctor">
                توضیحات پزشک:
                <span
                  class="prescription"
                  v-if="doctorMsg"
                >
                  {{ doctorMsg  }}
                </span>
              </div>
              <div class="prescription-box" v-if="!isDoctor && getMsg">
                توضیحات پزشک:
                <span
                  class="prescription"
                >
                  {{ getMsg }}
                </span>
              </div>
              <div class="prescription-box" v-if="!isReDoctor && radiologyCases">
                رادیولوژی {{ radiologyName }}:
                <span
                  v-for="(p, n) in radiologyCasesArray"
                  :key="n"
                  class="prescription radiology"
                  :class="{'resulted': resulted, 'admissioned': admissioned}"
                >
                  {{ p  }}
                </span>
              </div>
              <v-container v-if="!isReDoctor && radiologyResultList.length > 0" fluid>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <Fancybox
                      :options="options"
                    >
                      <a
                        v-for="(i,n) in radiologyResultList"
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
                  </v-col>
                </v-row>
              </v-container>
              <div class="prescription-box" v-if="!isReDoctor && photographyCases">
                فتوگرافی {{ photographyName }}:
                <span
                  v-for="(p, n) in photographyCasesArray"
                  :key="n"
                  class="prescription photography"
                  :class="{'resulted': resulted, 'admissioned': admissioned}"
                >
                  {{ p  }}
                </span>
              </div>
              <v-container v-if="!isReDoctor && photographyResultList.length > 0" fluid>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <Fancybox
                      :options="options"
                    >
                      <a
                        v-for="(i,n) in photographyResultList"
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
                  </v-col>
                </v-row>
              </v-container>
              <div class="prescription-box" v-if="doctorId">
                مطب {{ doctor ? doctor.name : '' }}:
                <span
                  class="prescription photography"
                  :class="{'resulted': resulted, 'admissioned': admissioned}"
                  v-if="doctorDesc"
                >
                  {{ doctorDesc  }}
                </span>
              </div>
              <v-container v-if="!isReDoctor && doctorResultList.length > 0" fluid>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <Fancybox
                      :options="options"
                    >
                      <a
                        v-for="(i,n) in doctorResultList"
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
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-dialog
      v-model="showSlides"
      fullscreen
      overlay-color="#000"
      overlay-opacity=".4"
    >
      <div class="slide-show-content">
        <div class="action-bar">
          <div class="actions">
            <v-btn
              icon
              color="#FFF"
              @click="closeSlideShow"
              large
            >
              <v-icon size="36px">mdi-close</v-icon>
            </v-btn>
            <v-btn
              icon
              color="#FFF"
              @click="onAutoPlaySlideClick"
              large
            >
              <v-icon v-if="autoPlaySlide" size="36px">mdi-pause</v-icon>
              <v-icon v-else size="36px">mdi-play</v-icon>
            </v-btn>
            <v-btn
              icon
              color="#FFF"
              @click="onShowSlideListClick"
              large
            >
              <v-icon size="36px">mdi-view-list</v-icon>
            </v-btn>
            <v-btn
              icon
              color="#FFF"
              @click="onMagnifyClick"
              large
            >
              <v-icon size="36px">mdi-magnify</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="slide-show-images-box">
          <div v-if="showList" class="slide-show-thumbnails">
            <div
              class="slide-show-thumbnail"
              v-for="(img, i) in selectedImages"
              :key="i"
              @click="selectedIndex = i"
              :class="{'selected': selectedIndex == i}"
            >
              <img :src="img">
            </div>
          </div>
          <div class="slide-show-image-content">
            <v-btn
              icon
              color="#FFF"
              @click="goNext"
              class="go-next-image"
              large
            >
              <v-icon size="36px">mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn
              icon
              color="#FFF"
              @click="goPrev"
              class="go-prev-image"
              large
            >
              <v-icon size="36px">mdi-arrow-left</v-icon>
            </v-btn>
            <div class="slide-show-image">
              <img :src="selectedImages[selectedIndex]" v-hammer:swipe.horizontal="onTouchStart">
            </div>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import Fancybox from "~/components/Fancybox";

export default {
  name: "AppointmentItemComponent",
  props: {
    page: {
      type: Number,
      required: true,
      default: 1,
    },
    index: {
      type: Number,
      required: true,
    },
    created_at: {
      type: String,
      required: true,
    },
    start_at: {
      type: String,
      required: true,
    },
    start_at_ago_fa: {
      type: String,
      required: true,
    },
    start_at_fa: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    organizationId: {
      type: Number,
      required: true,
    },
    organizationName: {
      type: Number,
      default: ''
    },
    radiologyId: {
      type: Number,
    },
    photographyId: {
      type: Number,
    },
    radiology: {
      type: Object,
    },
    photography: {
      type: Object,
    },
    doctorId: {
      type: Number,
    },
    doctor: {
      type: Object | null,
    },
    doctorDesc: {
      type: String | null,
    },
    doctorMsg: {
      type: String | null,
    },
    pAdmissionAt: {
      type: String,
    },
    dAdmissionAt: {
      type: String,
    },
    lAdmissionAt: {
      type: String,
    },
    pResultAt: {
      type: String,
    },
    dResultAt: {
      type: String,
    },
    lResultAt: {
      type: String,
    },
    rAdmissionAt: {
      type: String,
    },
    rResultAt: {
      type: String,
    },
    status: {
      type: Number,
      required: true,
    },
    caseType: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    prescription: {
      type: String,
      required: true,
    },
    radiologyCases: {
      type: String,
      required: true,
    },
    photographyCases: {
      type: String,
      required: true,
    },
    radiologyMsg: {
      type: String,
      required: true,
    },
    photographyMsg: {
      type: String,
      required: true,
    },
    selectedDents: {
      type: Array,
      default: () => [],
    },
    selectedActions: {
      type: Array,
      default: () => [],
    },
    waiting: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    Fancybox,
  },
  mounted() {
    this.getResults()
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
      radiologyResultList: [],
      photographyResultList: [],
      doctorResultList: [],
      images: [],
      showSlides: false,
      autoPlaySlide: false,
      showList: false,
      selectedImg: null,
      selectedIndex: 0,
      selectedImages: [],
      interval: null,
      professionMsg: {
        photography_msg: this.photographyMsg,
        radiology_msg: this.radiologyMsg,
      }
    }
  },
  methods: {
    getResults() {
      let type = ''
      type = "radiology"
      this.$store.dispatch('appointments/getAppointmentResults', {
        id: this.id,
        type: type
      })
        .then((res) => {
          this.radiologyResultList = res.data
        })
        .catch(err => {
          console.log(err, "error")
        })
      type = "photography"
      this.$store.dispatch('appointments/getAppointmentResults', {
        id: this.id,
        type: type
      })
        .then((res) => {
          this.photographyResultList = res.data
        })
      .catch(err => {
        console.log(err, "error")
      })
      type = "doctor"
      this.$store.dispatch('appointments/getAppointmentResults', {
        id: this.id,
        type: type
      })
        .then((res) => {
          this.doctorResultList = res.data
        })
      .catch(err => {
        console.log(err, "error")
      })
    },
    openUpdateModal() {
      this.$emit('updated')
    },
    showImages(i, list) {
      this.selectedImages = list
      this.selectedIndex = i
      this.showSlides = true
    },
    closeSlideShow() {
      this.selectedIndex = 0
      this.selectedImages = []
      this.showSlides = false
      this.autoPlaySlide = false
      this.showList = false
    },
    onAutoPlaySlideClick() {
      this.autoPlaySlide = !this.autoPlaySlide
      if (!this.autoPlaySlide) {
        clearInterval(this.interval)
      } else {
        const self = this
        this.interval = setInterval(function(){
          if (self.selectedIndex == self.selectedImages.length - 1) {
            self.selectedIndex = 0
          } else {
            self.selectedIndex += 1
          }
        }, 1300);
      }
    },
    onShowSlideListClick() {
      this.showList = !this.showList
    },
    goNext() {
      if (this.selectedIndex == this.selectedImages.length - 1) {
        this.selectedIndex = 0
      } else {
        this.selectedIndex += 1
      }
    },
    goPrev() {
      if (this.selectedIndex == 0) {
        this.selectedIndex = this.selectedImages.length - 1
      } else {
        this.selectedIndex -= 1
      }
    },
    onTouchStart(e) {
      if (e.direction == 4) {
        this.goNext()
      } else {
        this.goPrev()
      }
    },
    onMagnifyClick() {

    }
  },
  computed: {
    canSeeInfo() {
      return this.loginUser.organization_id == this.organizationId || this.isReDoctor
    },
    prescriptionArray() {
      return this.prescription && this.prescription.length ? this.prescription.split(' - ') : []
    },
    selectedPrescriptionArray() {
      let list = [...this.prescriptionArray,]
      if (this.selectedActions) {
        list = [
          ...list,
          ...this.selectedActions,
        ]
      }
      if (this.selectedDents) {
        list = [
          ...list,
          ...this.selectedDents,
        ]
      }
      return list
    },
    radiologyCasesArray() {
      return this.radiologyCases && this.radiologyCases.length ? this.radiologyCases.split(',') : []
    },
    photographyCasesArray() {
      return this.photographyCases && this.photographyCases.length ? this.photographyCases.split(',') : []
    },
    photographyName() {
      return this.photography ? this.photography.name : ''
    },
    radiologyName() {
      return this.radiology ? this.radiology.name : ''
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    isReDoctor() {
      return this.loginUser.organization_id == this.doctorId
    },
    isDoctor() {
      return this.loginUser.organization_id == this.organizationId
    },
    resulted() {
      const type = this.loginUser.organization.profession_id;
      if (type == 1) {
        return this.pAdmissionAt != "" && this.pResultAt != "" && this.pAdmissionAt != null && this.pResultAt != null
      } else if (type == 2) {
        return this.lAdmissionAt != "" && this.lResultAt != "" && this.lAdmissionAt != null && this.lResultAt != null
      } else if (type == 3) {
        return this.rAdmissionAt != "" && this.rResultAt != "" && this.rAdmissionAt != null && this.rResultAt != null
      } else if (this.isReDoctor) {
        return this.dAdmissionAt != "" && this.dResultAt != "" && this.dAdmissionAt != null && this.dResultAt != null
      } else {
        return (this.pAdmissionAt != "" && this.pResultAt != "" && this.pAdmissionAt != null && this.pResultAt != null) ||
          (this.lAdmissionAt != "" && this.lResultAt != "" && this.lAdmissionAt != null && this.lResultAt) ||
          (this.rAdmissionAt != "" && this.rResultAt != "" && this.rAdmissionAt != null && this.rResultAt != null);
      }
    },
    admissioned() {
      const type = this.loginUser.organization.profession_id;
      if (type == 1) {
        return this.pAdmissionAt != "" && this.pAdmissionAt != null
      } else if (type == 2) {
        return this.lAdmissionAt != "" && this.lAdmissionAt != null
      } else if (type == 3) {
        return this.rAdmissionAt != "" && this.rAdmissionAt != null
      } else if (this.isReDoctor) {
        return this.dAdmissionAt != "" && this.dAdmissionAt != null
      }
      return this.pAdmissionAt != "" && this.pAdmissionAt != null ||
        this.lAdmissionAt != "" && this.lAdmissionAt != null ||
        this.rAdmissionAt != "" && this.rAdmissionAt != null;
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
    getMsg() {
      return this.professionMsg[this.profession+'_msg']
    },
    canShowCode() {
      return this.code &&
        (
          this.photographyId ||
          this.radiologyId
        )
    }
  }
}
</script>

<style scoped>

</style>
