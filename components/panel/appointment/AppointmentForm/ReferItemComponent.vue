<template>
  <div class="refer-item-component">
    <v-card
      outlined
      class="refer-item-box"
    >
      <div class="refer-item-header">
        {{ title }}
      </div>
      <div class="refer-item-content">
        <v-row>
          <v-col
            cols="12"
          >
            <v-select
              v-if="type === 'radiology'"
              outlined
              :items="radiologyList"
              label="رادیولوژی"
              item-value="id"
              item-text="name"
              v-model="selectedItem"
              class="refer-item-select"
              :error="notSelected"
              :clearable="true"
              :disabled="disableRadiologySelect"
            ></v-select>
            <v-select
              v-if="type === 'photography'"
              outlined
              :items="photographyList"
              label="فتوگرافی"
              item-value="id"
              item-text="name"
              v-model="selectedItem"
              class="refer-item-select"
              :error="notSelected"
              :clearable="true"
            ></v-select>
            <v-select
              v-if="type === 'doctor'"
              outlined
              :items="doctorList"
              label="متخصص"
              item-value="id"
              item-text="name"
              v-model="selectedItem"
              class="refer-item-select"
              :error="notSelected"
              :clearable="true"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
          >
            <button
              v-if="type === 'radiology'"
              class="main-button"
              @click="openRadiologyFrom"
              :disabled="disableRadiologySelect"
            >
              <v-icon color="#fff">mdi-radioactive-circle-outline</v-icon>
              فرم رادیولوژی
            </button>
            <button
              v-if="type === 'photography'"
              class="main-button"
              @click="openPhotographyFrom"
            >
              <v-icon color="#fff">mdi-camera-outline</v-icon>
              فرم فتوگرافی
            </button>
            <button
              v-if="type === 'doctor'"
              class="main-button"
              @click="openDoctorFrom"
            >
              <v-icon color="#fff">mdi-camera-outline</v-icon>
              ارسال عکس
            </button>
          </v-col>
          <v-col
            cols="12"
          >
            <div class="create-update-model-input-box">
              <textarea
                v-model="msg"
                rows="4"
                :disabled="!selectedItem"
              ></textarea>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <photography-select-form
      v-if="organization"
      :open="showPhotographyFrom"
      :organization="organization"
      :items="items"
      @close="closePhotographyFrom"
      @setPhotographyCases="setPhotographyCases"
    />
    <radiology-select-form
      v-if="organization"
      :open="showRadiologyFrom"
      :organization="organization"
      :items="items"
      @close="closeRadiologyForm"
      @setRadiologyCases="setRadiologyCases"
    />
    <v-dialog
      v-if="organization"
      v-model="showDoctorFrom"
      persistent
      max-width="800"
    >
      <v-card
        class="create-update-modal"
      >
        <v-card-title
          class="create-update-modal-title-box"
        >
          <div class="create-update-modal-title">
            <button
              @click="closeShowDoctorFrom"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>فرم ارسال نتایج</span>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text
          v-if="type"
          class="paziresh-form-box">
          <v-container fluid>
            <div class="send-image-list">
              <div class="send-image-item"
               :class="{'selected': isSelected(i.url)}"
               v-for="(i,n) in results"
               :key="n"
              >
                <input :id="`image_${n}`" type="checkbox" hidden :value="i.url" v-model="doctorImages">
                <label :for="`image_${n}`">
                    <img
                      :src="i.url"
                      alt=""
                    />
                </label>
                <label :for="`image_${n}`">
                <span class="d-flex flex-column align-start justify-start py-2 px-2">
                  <span class="organization-name mt-2 font-weight-bold">
                    {{ i.organization_name }}
                  </span>
                  <span class="organization-name mt-2 font-weight-bold">
                    {{ i.start_at_fa }}
                  </span>
                </span>
                </label>
              </div>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container fluid>
            <v-row>
              <v-spacer/>
              <v-col
                cols="12"
                sm="3"
                md="3"
              >
                <button
                  class="second-button full-width"
                  @click="closeShowDoctorFrom"
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
                  @click="saveCases"
                >
                  تایید
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
import PhotographySelectForm from "~/components/panel/appointment/AppointmentForm/PhotographySelectForm";
import RadiologySelectForm from "~/components/panel/appointment/AppointmentForm/RadiologySelectForm";

export default {
  name: "ReferItemComponent",
  components: {RadiologySelectForm, PhotographySelectForm},
  props: {
    type: {
      type: String,
      default: 'radiology',
    },
    title: {
      type: String,
      default: 'رادیولوژی',
    },
    message: {
      type: String,
      default: '',
    },
    refer: {
      type: Object,
      default: null,
    },
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      organization: null,
      selectedItem: null,
      showRadiologyFrom: false,
      showDoctorFrom: false,
      showPhotographyFrom: false,
      notSelected: false,
      doctorImages: [],
      msg: '',
    }
  },
  mounted() {
    this.msg = this.message
    this.getList()
    if (this.items.length > 0) {
      this.doctorImages = [
        ...this.items,
      ]
    }
  },
  methods: {
    getList() {
      this.$store.dispatch('organizations/getList', this.type)
      .finally(() => {
        if (this.refer) {
          this.selectedItem = this.refer.id
        }
      })
    },
    openPhotographyFrom() {
      if (!this.selectedItem) {
        this.notSelected = true
        return
      }
      this.toggleShowPhotographyFrom()
    },
    closePhotographyFrom() {
      this.toggleShowPhotographyFrom()
    },
    closeRadiologyForm() {
      this.toggleShowRadiologyFrom()
    },
    toggleShowPhotographyFrom() {
      this.showPhotographyFrom = !this.showPhotographyFrom
    },
    openRadiologyFrom() {
      if (!this.selectedItem) {
        this.notSelected = true
        return
      }
      this.toggleShowRadiologyFrom()
    },
    openDoctorFrom() {
      if (!this.selectedItem) {
        this.notSelected = true
        return
      }
      this.toggleShowDoctorFrom()
    },
    toggleShowDoctorFrom() {
      this.showDoctorFrom = !this.showDoctorFrom
    },
    closeShowDoctorFrom() {
      this.toggleShowDoctorFrom()
    },
    toggleShowRadiologyFrom() {
      this.showRadiologyFrom = !this.showRadiologyFrom
    },
    saveCases() {
      // const items = this.doctorImages.map(i => {
      //   const split = i.split('/');
      //   return `${split[split.length - 2]}/${split[split.length - 1]}`;
      // })
      const items = this.doctorImages
      this.$emit('setDoctorImagesCases', items)
      this.closeShowDoctorFrom()
    },
    selected(val) {
      this.$emit('selected', {
        val: val,
        type: this.type,
      })
    },
    setPhotographyCases(cases) {
      this.$emit('setPhotographyCases', cases)
      this.closePhotographyFrom()
    },
    setRadiologyCases(cases) {
      this.$emit('setRadiologyCases', cases)
      this.closeRadiologyForm()
    },
    isSelected(img) {
      const index = this.doctorImages.findIndex(i => i == img)
      return index > -1
    }
  },
  computed: {
    results() {
      return this.$store.getters['appointments/getAllResults']
    },
    radiologyList() {
      return this.$store.getters['organizations/getRadiologyList']
    },
    photographyList() {
      return this.$store.getters['organizations/getPhotographyList']
    },
    doctorList() {
      return this.$store.getters['organizations/getRelationDoctorList']
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    disableRadiologySelect() {
      if (!this.loginUser) return true
      const profession_id = this.loginUser.organization.profession_id
      return profession_id <= 3
    }
  },
  watch: {
    selectedItem(val) {
      if (!val) {
        if (this.type === 'photography') {
          this.$emit('setPhotographyCases', [])
        } else if(this.type === 'radiology') {
          this.$emit('setRadiologyCases', [])
        } else if(this.type === 'doctor') {
          this.$emit('setLaboratoryCases', [])
        }
      }
      this.selected(val)
      this.notSelected = false
      if (this.type === 'photography') {
        this.organization = this.photographyList.find(i => i.id === val)
      } else if(this.type === 'radiology') {
        this.organization = this.radiologyList.find(i => i.id === val)
      } else if(this.type === 'doctor') {
        this.organization = this.doctorList.find(i => i.id === val)
      }
    },
    msg(val) {
      this.$emit('setMsg', {
        val: val,
        type: this.type,
      })
    },
  }
}
</script>

<style scoped>

</style>
