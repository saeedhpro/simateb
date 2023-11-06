<template>
  <div>
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
              @click="closeForm"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>فرم رادیولوژی</span>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text
          class="paziresh-form-box">
          <v-container fluid>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <div class="radiology-form-item">
                  <div class="radiology-form-item-header">
                    EXTRA ORAL
                  </div>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <div class="radio-item">
                        <v-checkbox
                          v-model="cases"
                          label="Panoramic (OPG)"
                          value="INTRA_Panoramic (OPG)"
                          color="#5063FF"
                        />
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <div class="radio-item">
                        <v-checkbox
                          v-model="cases"
                          label="Lateral Ceph. :"
                          value="INTRA_Lateral Ceph."
                          color="#5063FF"
                        />
                        <div class="radio-item-second">
                          <v-row>
                            <v-col
                              cols="12"
                            >
                              <v-checkbox
                                v-model="cases"
                                label="Standard"
                                value="INTRA_Standard"
                                color="#5063FF"
                              />
                            </v-col>
                            <v-col
                              cols="12"
                            >
                              <v-checkbox
                                v-model="cases"
                                label="NHP"
                                value="INTRA_NHP"
                                color="#5063FF"
                              />
                            </v-col>
                          </v-row>
                        </div>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <div class="radio-item">
                        <v-checkbox
                          v-model="cases"
                          label="P.A Ceph."
                          value="INTRA_P.A Ceph."
                          color="#5063FF"
                        />
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <div class="radio-item">
                        <v-checkbox
                          v-model="cases"
                          label="Water's"
                          value="INTRA_Water's"
                          color="#5063FF"
                        />
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <div class="radio-item">
                        <v-checkbox
                          v-model="cases"
                          label="TMJ"
                          value="INTRA_TMJ"
                          color="#5063FF"
                        />
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <div class="radio-item">
                        <v-checkbox
                          v-model="cases"
                          label="Reverse Towne"
                          value="INTRA_Reverse Towne"
                          color="#5063FF"
                        />
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <div class="radio-item">
                        <v-checkbox
                          v-model="cases"
                          label="SMV"
                          value="INTRA_SMV"
                          color="#5063FF"
                        />
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <div class="radio-item">
                        <v-row>
                          <v-col
                            cols="12"
                            md="6"
                          >
                            <v-checkbox
                              v-model="cases"
                              label="Lateral Oblique:"
                              value="INTRA_Lateral Oblique:"
                              color="#5063FF"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            md="3"
                          >
                            <v-checkbox
                              v-model="cases"
                              label="L"
                              value="INTRA_L"
                              color="#5063FF"
                            />
                          </v-col>
                          <v-col
                            cols="12"
                            md="3"
                          >
                            <v-checkbox
                              v-model="cases"
                              label="R"
                              value="INTRA_R"
                              color="#5063FF"
                            />
                          </v-col>
                        </v-row>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <div class="radiology-form-item">
                  <div class="radiology-form-item-header">
                    INTRA ORAL
                  </div>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <div class="radio-item">
                        <div class="selected-items">
                          <v-checkbox
                            v-model="cases"
                            label="Periapical (Parallel)"
                            value="INTRA_Periapical (Parallel)"
                            color="#5063FF"
                          />
                          <div class="selected-items-box">
                            <div class="selected-items-row top">
                              <div class="left">{{ selectedLeftTopDents.join(',') }}</div>
                              <v-divider vertical/>
                              <div class="right">{{ selectedRightTopDents.join(',') }}</div>
                            </div>
                            <div class="selected-items-row">
                              <div class="left">{{ selectedLeftBottomDents.join(',') }}</div>
                              <v-divider vertical/>
                              <div class="right">{{ selectedRightBottomDents.join(',') }}</div>
                            </div>
                            <div class="remove-dents" @click="removeDents('Periapical')"><v-icon>mdi-close</v-icon></div>
                          </div>
                        </div>
                        <button class="radio-select-button" @click="showSelectDent('Periapical')">انتخاب</button>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <div class="radio-item">
                        <v-checkbox
                          v-model="cases"
                          label="P.A Full mouth"
                          value="INTRA_P.A Full mouth"
                          color="#5063FF"
                        />
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <div class="radio-item">
                        <v-checkbox
                          v-model="cases"
                          label="Occlusal:"
                          value="INTRA_Occlusal"
                          color="#5063FF"
                        />
                        <div class="radio-item-second">
                          <v-row>
                            <v-col
                              cols="12"
                            >
                              <v-checkbox
                                v-model="cases"
                                label="Maxilla"
                                value="INTRA_Maxilla"
                                color="#5063FF"
                              />
                            </v-col>
                            <v-col
                              cols="12"
                            >
                              <v-checkbox
                                v-model="cases"
                                label="Mandible"
                                value="INTRA_Mandible"
                                color="#5063FF"
                              />
                            </v-col>
                          </v-row>
                        </div>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <div class="radio-item">
                        <v-checkbox
                          v-model="cases"
                          label="BiteWing:"
                          value="INTRA_BiteWing"
                          color="#5063FF"
                        />
                        <div class="radio-item-second">
                          <v-row>
                            <v-col
                              cols="12"
                              md="6"
                            >
                              <v-checkbox
                                v-model="cases"
                                label="Left premolars"
                                value="INTRA_Left premolars"
                                color="#5063FF"
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              md="6"
                            >
                              <v-checkbox
                                v-model="cases"
                                label="Right premolars"
                                value="INTRA_Right premolars"
                                color="#5063FF"
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              md="6"
                            >
                              <v-checkbox
                                v-model="cases"
                                label="Left molars"
                                value="INTRA_Left molars"
                                color="#5063FF"
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              md="6"
                            >
                              <v-checkbox
                                v-model="cases"
                                label="Right molars"
                                value="INTRA_Right molars"
                                color="#5063FF"
                              />
                            </v-col>
                          </v-row>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <div class="radiology-form-item">
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-row>
                        <v-col
                          cols="12"
                        >
                          <div class="radio-item">
                            <v-checkbox
                              v-model="cases"
                              label="CBCT"
                              value="CBCT"
                              color="#5063FF"
                            />
                            <div class="radio-item-second">
                              <v-row>
                                <v-col
                                  cols="12"
                                >
                                  <v-checkbox
                                    v-model="cases"
                                    label="Maxilla"
                                    value="CBCT_Maxilla"
                                    color="#5063FF"
                                  />
                                </v-col>
                                <v-col
                                  cols="12"
                                >
                                  <v-checkbox
                                    v-model="cases"
                                    label="Mandible"
                                    value="CBCT_Mandible"
                                    color="#5063FF"
                                  />
                                </v-col>
                              </v-row>
                            </div>
                          </div>
                        </v-col>
                        <v-col
                          cols="12"
                        >
                          <div class="radio-item">
                            <div class="selected-items start">
                              <v-checkbox
                                v-model="cases"
                                label="Implant"
                                value="Implant"
                                color="#5063FF"
                              />
                              <div class="selected-items-box">
                                <div class="selected-items-row top">
                                  <div class="left">{{ selectedCBCTLeftTopDents.join(',') }}</div>
                                  <v-divider vertical/>
                                  <div class="right">{{ selectedCBCTRightTopDents.join(',') }}</div>
                                </div>
                                <div class="selected-items-row">
                                  <div class="left">{{ selectedCBCTLeftBottomDents.join(',') }}</div>
                                  <v-divider vertical/>
                                  <div class="right">{{ selectedCBCTRightBottomDents.join(',') }}</div>
                                </div>
                                <div class="remove-dents" @click="removeDents('CBCT')"><v-icon>mdi-close</v-icon></div>
                              </div>
                            </div>
                            <button class="radio-select-button" @click="showSelectDent('CBCT')">انتخاب</button>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-row>
                        <v-col
                          cols="12"
                        >
                          <div class="radio-item">
                            <v-checkbox
                              v-model="cases"
                              label="Impacted tooth"
                              value="CBCT_Impacted tooth"
                              color="#5063FF"
                            />
                          </div>
                        </v-col>
                        <v-col
                          cols="12"
                        >
                          <div class="radio-item">
                            <v-checkbox
                              v-model="cases"
                              label="Paranasal sinus and nasal fossa"
                              value="CBCT_Paranasal sinus and nasal fossa"
                              color="#5063FF"
                            />
                          </div>
                        </v-col>
                        <v-col>
                          <div class="radio-item">
                            <v-checkbox
                              v-model="cases"
                              label="TMJ"
                              value="CBCT_TMJ"
                              color="#5063FF"
                            />
                            <div class="radio-item-second">
                              <v-row>
                                <v-col
                                  cols="12"
                                >
                                  <v-checkbox
                                    v-model="cases"
                                    label="L"
                                    value="CBCT_L"
                                    color="#5063FF"
                                  />
                                </v-col>
                                <v-col
                                  cols="12"
                                >
                                  <v-checkbox
                                    v-model="cases"
                                    label="R"
                                    value="CBCT_R"
                                    color="#5063FF"
                                  />
                                </v-col>
                              </v-row>
                            </div>
                          </div>
                        </v-col>
                        <v-col
                          cols="12"
                        >
                          <div class="radio-item">
                            <v-checkbox
                              v-model="cases"
                              label="Lesion"
                              value="CBCT_Lesion"
                              color="#5063FF"
                            />
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-container fluid>
            <v-row>
              <v-col
                cols="12"
                sm="3"
                md="3"
              >
                <button
                  class="second-button full-width"
                  @click="resetForm"
                >
                  پاک کردن فرم
                </button>
              </v-col>
              <v-spacer/>
              <v-col
                cols="12"
                sm="3"
                md="3"
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
    <v-dialog
      v-model="showDentModal"
      persistent
      max-width="90%"
    >
      <v-card
        class="create-update-modal"
      >
        <v-card-title
          class="create-update-modal-title-box"
        >
          <div class="create-update-modal-title">
            <button
              @click="toggleShowDentModal"
              class="create-update-modal-close"
            >
              <v-icon>mdi-close</v-icon>
            </button>
            <span>فرم رادیولوژی</span>
          </div>
          <v-spacer/>
        </v-card-title>
        <v-card-text
          v-if="type"
          class="paziresh-form-box">
          <v-container fluid>
            <div class="dent-list">
              <div
                v-for="(i,n) in 8"
                :key="n"
                class="dent-item"
                :class="{'selected': inList(`${type}_${i}`)}"
              >
                <img
                  @click="onDentClicked(`${type}_${i}`, type, i)"
                  :src="`/images/dents/${i}.png`"
                >
              </div>
              <v-divider vertical class="mx-2 border-black"/>
              <div
                v-for="(i,n) in 8"
                :key="n"
                class="dent-item"
                :class="{'selected': inList(`${type}_${i + 8}`)}"
              >
                <img
                  @click="onDentClicked(`${type}_${i + 8}`, type, i + 8)"
                  :src="`/images/dents/${i + 8}.png`"
                >
              </div>

            </div>
            <v-divider class="border-black"/>
            <div class="dent-list">
              <div
                v-for="(i,n) in 8"
                :key="n"
                class="dent-item"
                :class="{'selected': inList(`${type}_${i + 16}`)}"
              >
                <img
                  @click="onDentClicked(`${type}_${i + 16}`,  type,i + 16)"
                  :src="`/images/dents/${i + 16}.png`"
                >
              </div>
              <v-divider vertical class="mx-2 border-black" />
              <div
                v-for="(i,n) in 8"
                :key="n"
                class="dent-item"
                :class="{'selected': inList(`${type}_${i + 24}`)}"
              >
                <img
                  @click="onDentClicked(`${type}_${i + 24}`,  type,i + 24)"
                  :src="`/images/dents/${i + 24}.png`"
                >
              </div>
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "RadiologySelectForm",
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    },
    organization: {
      type: Object,
      default: null,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  mounted() {
    this.cases = this.items
  },
  data() {
    return {
      cases: [],
      type: null,
      periapical: null,
      showDentModal: false,
      dents: [],
      selectedDents: [],
      selectedRightTopDents: [],
      selectedLeftTopDents: [],
      selectedRightBottomDents: [],
      selectedLeftBottomDents: [],
      selectedCBCTRightTopDents: [],
      selectedCBCTLeftTopDents: [],
      selectedCBCTRightBottomDents: [],
      selectedCBCTLeftBottomDents: []
    }
  },
  methods: {
    closeForm() {
      this.$emit('close')
    },
    resetForm() {
      this.cases = []
      this.$emit('resetForm')
    },
    saveCases() {
      this.$emit('setRadiologyCases', this.cases)
    },
    showSelectDent(type) {
      this.type = type
      this.toggleShowDentModal()
    },
    toggleShowDentModal() {
      this.showDentModal = !this.showDentModal
    },
    inList(item) {
      return this.cases.find(i => i == item)
    },
    onDentClicked(item, type = 'Periapical', index) {
      const i = this.cases.find(i => i == item)
      if (i) {
        this.cases = this.cases.filter(i => i != item)
        if (type === 'Periapical') {
          if (index < 9) {
            this.selectedRightTopDents = this.selectedRightTopDents.filter(i => i != index).sort()
          } else if (index < 17) {
            this.selectedLeftTopDents = this.selectedLeftTopDents.filter(i => i != index - 8).sort()
          } else if (index < 25) {
            this.selectedRightBottomDents = this.selectedRightBottomDents.filter(i => i != index - 16).sort()
          } else {
            this.selectedLeftBottomDents = this.selectedLeftBottomDents.filter(i => i != index - 24).sort()
          }
        } else {
          if (index < 9) {
            this.selectedCBCTRightTopDents = this.selectedCBCTRightTopDents.filter(i => i != index).sort()
          } else if (index < 17) {
            this.selectedCBCTLeftTopDents = this.selectedCBCTLeftTopDents.filter(i => i != index - 8).sort()
          } else if (index < 25) {
            this.selectedCBCTRightBottomDents = this.selectedCBCTRightBottomDents.filter(i => i != index - 16).sort()
          } else {
            this.selectedCBCTLeftBottomDents = this.selectedCBCTLeftBottomDents.filter(i => i != index - 24).sort()
          }
        }
      } else {
        this.cases.push(item)
        if (type === 'Periapical') {
          if (index < 9) {
            this.selectedRightTopDents.push(index)
            this.selectedRightTopDents.sort()
          } else if (index < 17) {
            this.selectedLeftTopDents.push(index - 8)
            this.selectedLeftTopDents.sort((a, b) => a > b ? -1 : 1)
          } else if (index < 25) {
            this.selectedRightBottomDents.push(index - 16)
            this.selectedRightBottomDents.sort()
          } else {
            this.selectedLeftBottomDents.push(index - 24)
            this.selectedLeftBottomDents.sort().sort((a, b) => a > b ? -1 : 1)
          }
        } else {
          if (index < 9) {
            this.selectedCBCTRightTopDents.push(index)
            this.selectedCBCTRightTopDents.sort()
          } else if (index < 17) {
            this.selectedCBCTLeftTopDents.push(index - 8)
            this.selectedCBCTLeftTopDents.sort((a, b) => a > b ? -1 : 1)
          } else if (index < 25) {
            this.selectedCBCTRightBottomDents.push(index - 16)
            this.selectedCBCTRightBottomDents.sort()
          } else {
            this.selectedCBCTLeftBottomDents.push(index - 24)
            this.selectedCBCTLeftBottomDents.sort().sort((a, b) => a > b ? -1 : 1)
          }
        }
      }
    },
    removeDents(type) {
      if(type === 'Periapical') {
        let values = this.selectedRightTopDents.map(i => `${type}_${i}`)
        this.cases = this.cases.filter(i => !values.includes(i))
        this.selectedRightTopDents = []
        values = this.selectedLeftTopDents.map(i => `${type}_${(i + 8)}`)
        this.cases = this.cases.filter(i => !values.includes(i))
        this.selectedLeftTopDents = []
        values = this.selectedRightBottomDents.map(i => `${type}_${(i + 16)}`)
        this.cases = this.cases.filter(i => !values.includes(i))
        this.selectedRightBottomDents = []
        values = this.selectedLeftBottomDents.map(i => `${type}_${(i + 24)}`)
        this.cases = this.cases.filter(i => !values.includes(i))
        this.selectedLeftBottomDents = []
      } else {
        let values = this.selectedCBCTRightTopDents.map(i => `${type}_${i}`)
        this.cases = this.cases.filter(i => !values.includes(i))
        this.selectedCBCTRightTopDents = []
        values = this.selectedCBCTLeftTopDents.map(i => `${type}_${i + 8}`)
        this.cases = this.cases.filter(i => !values.includes(i))
        this.selectedCBCTLeftTopDents = []
        values = this.selectedCBCTRightBottomDents.map(i => `${type}_${i + 16}`)
        this.cases = this.cases.filter(i => !values.includes(i))
        this.selectedCBCTRightBottomDents = []
        values = this.selectedCBCTLeftBottomDents.map(i => `${type}_${i + 24}`)
        this.cases = this.cases.filter(i => !values.includes(i))
        this.selectedCBCTLeftBottomDents = []
      }
    },
    onPeriapicalChanged(values) {
      let index = values.findIndex(i => i == "INTRA_Periapical (Parallel)")
      if (index == -1) {
        this.removeDents("Periapical")
      } else {
        for (let i = 1; i <= 32; i++) {
          this.cases.push(`Periapical_${i}`)
          if (i < 9) {
            this.selectedRightTopDents.push(i)
            this.selectedRightTopDents.sort()
          } else if (i < 17) {
            this.selectedLeftTopDents.push(i - 8)
            this.selectedLeftTopDents.sort((a, b) => a > b ? -1 : 1)
          } else if (i < 25) {
            this.selectedRightBottomDents.push(i - 16)
            this.selectedRightBottomDents.sort()
          } else {
            this.selectedLeftBottomDents.push(i - 24)
            this.selectedLeftBottomDents.sort().sort((a, b) => a > b ? -1 : 1)
          }
        }
      }
    },
    onImplantChanged(values) {
      let index = values.findIndex(i => i == "Implant")
      if (index == -1) {
        this.removeDents("Implant")
      } else {
        for (let i = 1; i <= 32; i++) {
          this.cases.push(`Implant_${i}`)
          if (i < 9) {
            this.selectedCBCTRightTopDents.push(i)
            this.selectedCBCTRightTopDents.sort()
          } else if (i < 17) {
            this.selectedCBCTLeftTopDents.push(i - 8)
            this.selectedCBCTLeftTopDents.sort((a, b) => a > b ? -1 : 1)
          } else if (i < 25) {
            this.selectedCBCTRightBottomDents.push(i - 16)
            this.selectedCBCTRightBottomDents.sort()
          } else {
            this.selectedCBCTLeftBottomDents.push(i - 24)
            this.selectedCBCTLeftBottomDents.sort().sort((a, b) => a > b ? -1 : 1)
          }
        }
      }
    }
  },
  computed: {
    show() {
      return this.open;
    }
  },
  watch: {
    items(val) {
      this.cases = val
    }
  }
}
</script>

<style scoped lang="scss">
.selected-items-box {
  position: relative;
  padding-right: 10px;
  .remove-dents {
    position: absolute;
    right: -10px;
    top: 7px;
    cursor: pointer;
  }
}
</style>
