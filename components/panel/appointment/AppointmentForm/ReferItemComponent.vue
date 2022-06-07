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
                v-model="cases"
                rows="4"
              ></textarea>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ReferItemComponent",
  props: {
    type: {
      type: String,
      default: 'radiology',
    },
    title: {
      type: String,
      default: 'رادیولوژی',
    },
  },
  data() {
    return {
      selectedItem: null,
      showRadiologyFrom: false,
      showPhotographyFrom: false,
      cases: '',
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      return this.$store.dispatch('organizations/getList', this.type)
    },
    openPhotographyFrom() {
      this.toggleShowPhotographyFrom()
    },
    toggleShowPhotographyFrom() {
      this.showPhotographyFrom = !this.showPhotographyFrom
    },
    openRadiologyFrom() {
      this.toggleShowRadiologyFrom()
    },
    toggleShowRadiologyFrom() {
      this.showRadiologyFrom = !this.showRadiologyFrom
    },
    selected(val) {
      this.$emit('selected', {
        val: this.cases,
        type: this.type,
      })
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
      console.log(val)
      this.$emit('selected', this.selectedItem)
    }
  }
}
</script>

<style scoped>

</style>
