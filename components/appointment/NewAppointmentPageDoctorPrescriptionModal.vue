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
            <v-row dir="ltr">
              <div v-if="canSeeDent" class="dents-list">
                <div class="dent-box overflow-x-auto">
                  <div class="dent-top">
                    <img :class="{'selected': inList(i)}" @click="onDentClicked(i)" v-for="(i, n) in 16"
                         :src="`/images/dents/${i}.png`" :key="n">
                  </div>
                  <div class="dent-bottom">
                    <img :class="{'selected': inList(i + 16)}" @click="onDentClicked(i + 16)" v-for="(i, n) in 16"
                         :src="`/images/dents/${i+16}.png`" :key="n">
                  </div>
                </div>
              </div>
              <hr v-if="canSeeDent" class="full-width mt-4 mb-4"/>
            </v-row>
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
      this.$emit('save', {
        selected_dents: this.selectedDents,
        selected_actions: this.selectedActions,
      })
      // this.$emit('close')
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
      this.$emit('done', {
        type: 'prescription',
        prescription: prescription,
      })
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
    inList(item) {
      return this.selected_dents.find(i => i == `dent: ${item}`)
    },
    selectAction(item) {
      const i = this.selected_actions.find(i => i == item.name)
      if (i) {
        this.selected_actions = this.selected_actions.filter(i => i != item.name)
      } else {
        this.selected_actions.push(item.name)
      }
      // this.$emit('actionClicked', this.selected_actions)
    },
    isSelected(item) {
      return this.selected_actions.find(i => i == item.name)
    },
    onDentClicked(item) {
      const i = this.selected_dents.find(i => i == `dent: ${item}`)
      if (i) {
        this.selected_dents = this.selected_dents.filter(i => i != `dent: ${item}`)
      } else {
        this.selected_dents.push(`dent: ${item}`)
      }
      // this.$emit('dentClicked', this.dents.join())
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
    }
  }
}
</script>
<style scoped lang="scss">
.dents-list {
  .dent-top, .dent-bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    img {
      cursor: pointer;
      width: calc(100% /25);
      &.selected {
        background: #EBF0FF 0 0 no-repeat padding-box;
        border: 1px solid #5063FF;
        border-radius: 8px;
        opacity: 1;
      }
    }
  }
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
</style>
