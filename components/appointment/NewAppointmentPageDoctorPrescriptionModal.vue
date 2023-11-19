<template>
  <div v-if="show">
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
              @click="close"
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
            <v-row v-if="canSeeDent"  dir="ltr">
              <v-col
                cols="9"
              >
                <div class="dents-list">
                  <div class="dent-list">
                    <div class="dent-box d-flex flex-row relative">
                      <span class="dent-title ur">UR</span>
                      <span class="dent-title ul">UL</span>
                      <div
                        v-for="(i,n) in 8"
                        :key="n"
                        class="dent-item"
                        :class="{'selected': inList('UR', 8 - i + 1)}"
                      >
                        <img
                          @click="onDentClicked('UR', 8 - i + 1)"
                          :src="`/images/dents/${i}.png`"
                        >
                      </div>
                      <v-divider vertical class="mx-2 border-black"/>
                      <div
                        v-for="(i,n) in 8"
                        :key="n + 8"
                        class="dent-item"
                        :class="{'selected': inList('UL', i)}"
                      >
                        <img
                          @click="onDentClicked('UL', i)"
                          :src="`/images/dents/${i + 8}.png`"
                        >
                      </div>
                    </div>
                  </div>
                  <v-divider class="border-black"/>
                  <div class="dent-list">
                    <div class="dent-box bottom d-flex flex-row relative">
                      <span class="dent-title lr">LR</span>
                      <span class="dent-title ll">LL</span>
                      <div
                        v-for="(i,n) in 8"
                        :key="n + 16"
                        class="dent-item"
                        :class="{'selected': inList('LR', 8 - i + 1)}"
                      >
                        <img
                          @click="onDentClicked('LR', 8 - i + 1)"
                          :src="`/images/dents/${i + 16}.png`"
                        >
                      </div>
                      <v-divider vertical class="mx-2 border-black" />
                      <div
                        v-for="(i,n) in 8"
                        :key="n + 24"
                        class="dent-item"
                        :class="{'selected': inList('LL', i)}"
                      >
                        <img
                          @click="onDentClicked('LL', i)"
                          :src="`/images/dents/${i + 24}.png`"
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col
                cols="3"
              >
                <div class="d-flex flex-column align-center justify-center full-height">
                  <div class="selected-dent-list">
                    <div class="divided vertical"></div>
                    <div class="divided horizontal"></div>

                    <div class="selected-dent-top mr-2">
                      <div class="d-flex flex-row justify-end align-center dent-number-item">
                        {{urSelectedDents.join(',')}}
                      </div>
                      <div class="d-flex flex-row justify-end align-center dent-number-item">
                        {{lrSelectedDents.join(',')}}
                      </div>
                    </div>
                    <div class="selected-dent-bottom ml-2">
                      <div class="d-flex flex-row justify-start align-center dent-number-item">
                        {{ulSelectedDents.join(',')}}
                      </div>
                      <div class="d-flex flex-row justify-start align-center dent-number-item">
                        {{llSelectedDents.join(',')}}
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
            <hr v-if="canSeeDent" class="full-width mt-4 mb-4"/>
            <v-row>
              <v-col
                cols="12"
              >
                <h3 class="font-weight-bold mb-4">عنوان:</h3>
                <div
                  class="d-flex flex-row flex-wrap justify-start align-center "
                >
                  <div
                    v-for="(c, i) in categories"
                    :key="i"
                    @click="getCategoryTreatments(c)"
                    class="category-item d-flex flex-row justify-center align-center py-3 px-6"
                    :class="{'is-selected': selected == c.id, 'has-item': isCategorySelected(c)}"
                  >
                    {{ c.name }}
                  </div>
                </div>
                <hr v-if="selected" class="mt-4 mb-8"/>
                <h3 v-if="selected" class="font-weight-bold mb-4">شرح درمان:</h3>
                <div class="d-flex flex-row flex-wrap justify-start align-center">
                  <div
                    v-for="(c, i) in actions"
                    :key="i"
                    @click="selectAction(c)"
                    class="category-item d-flex flex-row justify-center align-center py-3 px-6"
                    :class="{'is-selected': isSelected(c)}"
                  >
                    {{ c.name }}
                  </div>
                </div>
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
                  @click="close"
                >
                  بستن
                </button>
              </v-col>
              <v-spacer />
              <v-col
                cols="12"
                sm="4"
                md="4"
              >
                <button
                  class="main-button"
                  @click="save"
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

export default {
  name: "NewAppointmentPageDoctorPrescriptionModal",
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    prescription: {
      type: String,
      default: '',
    },
    selectedActions: {
      type: Array,
      default: () => [],
    },
    selectedDents: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      categories: [],
      selected_dents: [],
      actions: [],
      selected_actions: [],
      selected: null,
    }
  },
  mounted() {
    this.selected_actions = this.selectedActions
    this.selected_dents = this.selectedDents
    this.getCategories();
  },
  methods: {
    close() {
      // this.$emit('save', {
      // selected_dents: this.selectedDents,
      // selected_actions: this.selectedActions,
      // })
      this.$emit('close')
    },
    addToDoctorDo(item) {
      let prescription = ''
      const array = this.prescription.trim().split(' - ')
      if (array[0] == '') {
        array[0] = item
      } else {
        array.push(item)
      }
      prescription = array.length == 1 ? array.join('') : array.join(' - ')
      // this.$emit('done', {
      //   type: 'prescription',
      //   prescription: prescription,
      // })
    },
    getCategories() {
      this.$store.dispatch('treatments/getTreatmentCategories')
        .then(res => {
          this.categories = {
            ...res.data.data
          }
        })
    },
    getCategoryTreatments(c) {
      if (this.selected == c.id) {
        this.selected = null
        this.actions = []
      } else {
        this.selected = c.id
        this.actions = [
          ...c.actions,
        ]
        // this.$store.dispatch('treatments/getCategory', id)
        //   .then(res => {
        //     this.selected = id
        //     this.actions = [
        //       ...res.data.data.actions,
        //     ]
        //   })
      }
    },
    inList(type, item) {
      return this.selected_dents.find(i => i == `${type} dent: ${item}`)
    },
    selectAction(item) {
      const i = this.selected_actions.find(i => i == item.name)
      if (i) {
        this.selected_actions = this.selected_actions.filter(i => i != item.name)
      } else {
        this.selected_actions.push(item.name)
      }
    },
    isSelected(item) {
      return this.selected_actions.find(i => i == item.name)
    },
    onDentClicked(type, item) {
      const i = this.selected_dents.find(i => i == `${type} dent: ${item}`)
      if (i) {
        this.selected_dents = this.selected_dents.filter(i => i != `${type} dent: ${item}`)
      } else {
        this.selected_dents.push(`${type} dent: ${item}`)
      }
    },
    save() {
      this.$emit('save', {
        selected_dents: this.selected_dents,
        selected_actions: this.selected_actions,
      })
    },
    isCategorySelected(category) {
      return this.selected_actions.some(r => category.actions.map(i => i.name).includes(r))
    }
  },
  computed: {
    show() {
      return this.open
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    canSeeDent() {
      const profession_id = this.loginUser.organization.profession_id
      return [5, 7, "5", "7"].includes(profession_id)
    },
    urSelectedDents() {
      return this.selected_dents.filter(i => {
        return i.startsWith('UR')
      }).map(i => parseInt(i.replace('UR dent: ', ''))).sort().reverse()
    },
    ulSelectedDents() {
      return this.selected_dents.filter(i => {
        return i.startsWith('UL')
      }).map(i => parseInt(i.replace('UL dent: ', ''))).sort()
    },
    lrSelectedDents() {
      return this.selected_dents.filter(i => {
        return i.startsWith('LR')
      }).map(i => parseInt(i.replace('LR dent: ', ''))).sort().reverse()
    },
    llSelectedDents() {
      return this.selected_dents.filter(i => {
        return i.startsWith('LL')
      }).map(i => parseInt(i.replace('LL dent: ', ''))).sort()
    }
  }
}
</script>
<style scoped lang="scss">
.dents-list {
  margin: 0 25px;
}
.category-item {
  text-align: center;
  letter-spacing: 0;
  color: #000000;
  border: 1px solid #5981ff;
  border-radius: 12px;
  font: normal normal bold 14px/14px IRANYekanRegular !important;
  margin-left: 5px;
  cursor: pointer;
  &.has-item {
    background-color: #2BC4A9;
    color: #FFFFFF;
    border: 1px solid #388E3C;
  }
  &.is-selected {
    background-color: #5981ff;
    color: #FFFFFF;
    border: 1px solid #141432;
  }
}

.selected-dent-list {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  font: normal normal bold 1rem/1.4rem IRANYekanRegular !important;
  position: relative;
  .divided {
    position: absolute;
    background-color: #1A1A1A;
    &.vertical {
      height: 100%;
      width: 1px;
      left: 50%;
    }
    &.horizontal {
      height: 1px;
      width: 100%;
      top: 48%;
    }
  }
  .selected-dent-top, .selected-dent-bottom {
    display: grid;
    grid-auto-columns: auto auto;
    div {
      width: 100px !important;
    }
  }
  .dent-number-item {
    height: 23px !important;
  }
}
</style>
