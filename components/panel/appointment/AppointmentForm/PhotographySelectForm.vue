<template>
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
          <span>فرم فتوگرافی</span>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-card-text
        class="paziresh-form-box">
        <v-container>
          <v-row
            v-if="isOrthodontic"
          >
            <div class="ortho-cases-box">
              <div class="ortho-cases-item">
                <v-checkbox
                  v-model="cases"
                  label="قبل از درمان"
                  value="قبل از درمان"
                  color="#5063FF"
                />
              </div>
              <div class="ortho-cases-item">
                <v-checkbox
                  v-model="cases"
                  label="در حین درمان"
                  value="در حین درمان"
                  color="#5063FF"
                />
              </div>
              <div class="ortho-cases-item">
                <v-checkbox
                  v-model="cases"
                  label="بعد از درمان"
                  value="بعد از درمان"
                  color="#5063FF"
                />
              </div>
            </div>
          </v-row>
          <div
            v-else
          >
            <div class="ortho-cases-form-top">
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                >
                  <div class="ortho-case-list">
                    <div class="ortho-case-list-header">
                      INTRA ORAL
                    </div>
                    <div
                      v-for="(i,n) in intraOral"
                      :key="n"
                      class="ortho-cases-item">
                      <v-checkbox
                        v-model="cases"
                        :label="i"
                        :value="i"
                        color="#5063FF"
                      />
                    </div>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <div class="ortho-case-list">
                        <div class="ortho-case-list-header">
                          نیم رخ
                          <img src="/images/form/half.png" alt="">
                        </div>
                        <div
                          v-for="(i,n) in half"
                          :key="n"
                          class="ortho-cases-item rtl">
                          <v-checkbox
                            v-model="cases"
                            :label="i"
                            :value="`نیمرخ - ${i}`"
                            color="#5063FF"
                          />
                        </div>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <div class="ortho-case-list">
                        <div class="ortho-case-list-header">
                          روبرو
                          <img src="/images/form/front.png" alt="">
                        </div>
                        <div
                          v-for="(i,n) in front"
                          :key="n"
                          class="ortho-cases-item rtl">
                          <v-checkbox
                            v-model="cases"
                            :label="i"
                            :value="`روبرو - ${i}`"
                            color="#5063FF"
                          />
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <div class="ortho-case-list">
                        <div class="ortho-case-list-header">
                          سه رخ
                          <img src="/images/form/thriple.png" alt="">
                        </div>
                        <div
                          v-for="(i,n) in three"
                          :key="n"
                          class="ortho-cases-item rtl">
                          <v-checkbox
                            v-model="cases"
                            :label="i"
                            :value="`سه رخ - ${i}`"
                            color="#5063FF"
                          />
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                  <div class="ortho-case-list">
                    <div
                      v-for="(i,n) in others"
                      :key="n"
                      class="ortho-cases-item rtl">
                      <v-checkbox
                        v-model="cases"
                        :label="i"
                        :value="i"
                        color="#5063FF"
                      />
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
            <div class="ortho-cases-form-bottom">
              <v-row>
                <v-col
                  cols="12"
                  md="2"
                  v-for="(i,n) in bottomCases"
                  :key="n"
                >
                  <v-checkbox
                    v-model="cases"
                    :label="i"
                    :value="i"
                    color="#5063FF"
                  />
                </v-col>
              </v-row>
            </div>
          </div>
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
</template>

<script>
export default {
  name: "PhotographySelectForm",
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
  data() {
    return {
      cases: [],
      bottomCases: [
        'قبل از درمان',
        'بعد از درمان',
        'رنگی',
        'سیاه و سفید',
        'ارسال آرشیو',
        'CD',
      ],
      intraOral: [
        'Occlusion',
        'Right Occlusion',
        'Left Occlusion',
        'Upper Occlusal',
        'Lower Occlusal',
        'Overjet',
        'Close up smile',
      ],
      half: [
        'راست',
        'چپ',
        'راست در حال خنده',
        'چپ در حال خنده',
      ],
      front: [
        'روبروی کامل',
        'روبروی سر بالا',
        'روبروی سر پایین',
        'روبروی با خنده',
      ],
      three: [
        'راست',
        'چپ',
        'راست در حال خنده',
        'چپ در حال خنده',
      ],
      others: [
        'بینی',
        'فک و چانه',
        'ایمپلنت و پروتز',
        'صورت',
        'پلک و ابرو',
        'پیشانی',
        'گوش',
        'گردن',
        'لب',
        'بازو',
        'کاشت مو',
        'لیپوماتیک',
        'ارتودنسی',
      ],
    }
  },
  mounted() {
    this.cases = this.items
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
      this.$emit('setPhotographyCases', this.cases)
    }
  },
  computed: {
    show() {
      return this.open;
    },
    isOrthodontic() {
      if (!this.organization) return false
      const profession_id = this.organization.profession_id;
      return profession_id === 5;
    }
  },
}
</script>

<style scoped>

</style>
