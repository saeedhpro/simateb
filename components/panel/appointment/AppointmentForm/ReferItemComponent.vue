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
            ></v-select>
            <v-select
              v-if="type === 'photography'"
              outlined
              :items="photographyList"
              label="فوتوگرافی"
              item-value="id"
              item-text="name"
              v-model="selectedItem"
              class="refer-item-select"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
          >
            <button
              v-if="type === 'radiology'"
              class="main-button"
              @click="openRadiologyFrom"
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
          </v-col>
          <v-col
            cols="12"
          >
            <div class="create-update-model-input-box">
              <textarea
                v-model="msg"
                rows="4"
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
      showPhotographyFrom: false,
      msg: '',
    }
  },
  mounted() {
    this.getList()
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
      if (!this.selectedItem) return
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
      if (!this.selectedItem) return
      this.toggleShowRadiologyFrom()
    },
    toggleShowRadiologyFrom() {
      this.showRadiologyFrom = !this.showRadiologyFrom
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
    }
  },
  computed: {
    radiologyList() {
      return this.$store.getters['organizations/getRadiologyList']
    },
    photographyList() {
      return this.$store.getters['organizations/getPhotographyList']
    },
  },
  watch: {
    selectedItem(val) {
      this.selected(val)
      if (this.type === 'photography') {
        this.organization = this.photographyList.find(i => i.id === val)
      } else {
        this.organization = this.radiologyList.find(i => i.id === val)
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
