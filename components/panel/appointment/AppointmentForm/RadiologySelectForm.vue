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
                        <v-checkbox
                          v-model="cases"
                          label="Periapical (Parallel)"
                          value="INTRA_Periapical (Parallel)"
                          color="#5063FF"
                        />
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
                  class="second-button"
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
            <v-row>
              <v-col
                cols="12"
              >
                <div class="dent-list">
                  <div
                    v-for="(i,n) in 16"
                    :key="n"
                    class="dent-item"
                    :class="{'selected': inList(`${type}_${i}`)}"
                  >
                    <img
                      @click="onDentClicked(`${type}_${i}`)"
                      :src="`/images/dents/${i}.png`"
                    >
                  </div>
                </div>
              </v-col>
              <v-col
                cols="12"
              >
                <div class="dent-list">
                  <div
                    v-for="(i,n) in 16"
                    :key="n"
                    class="dent-item"
                    :class="{'selected': inList(`${type}_${i + 16}`)}"
                  >
                    <img
                      @click="onDentClicked(`${type}_${i + 16}`)"
                      :src="`/images/dents/${i + 16}.png`"
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
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
  mounted () {
    this.cases = this.items
  },
  data() {
    return {
      cases: [],
      type: null,
      periapical: null,
      showDentModal: false,
      dents: [],
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
    onDentClicked(item) {
      const i = this.cases.find(i => i == item)
      if (i) {
        this.cases = this.cases.filter(i => i != item)
      } else {
        this.cases.push(item)
      }
    },
  },
  computed: {
    show() {
      return this.open;
    },
  },
  watch: {
    items(val) {
      this.cases = val
    }
  }
}
</script>

<style scoped>

</style>
