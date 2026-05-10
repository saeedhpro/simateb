<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="1056px"
  >
    <v-card
      class="create-update-modal photography-form"
    >
      <v-card-title
        class="create-update-modal-title-box"
      >
        <div class="create-update-modal-title">
          <button
            @click="closeForm"
            class="create-update-modal-close"
          >
            <img src="/images/login/close.svg">
          </button>
          <span>فرم آزمایشگاه</span>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-card-text
        class="paziresh-form-box">
        <v-container>
          <div
          >
            <div class="ortho-cases-form-top">
              <v-row class="rtl">
                <v-col
                  cols="4"
                  sm="3"
                  md="3"
                >
                  <div
                    v-for="(i,n) in categories"
                    class="ortho-case-list ltr"
                  >
                    <div class="ortho-case-list-header">
                      INTRA ORAL
                    </div>
                    <div
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
              </v-row>
            </div>
          </div>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col
              cols="4"
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
              cols="4"
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
              cols="4"
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
  name: "LaboratorySelectForm",
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
      categories: [],
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
      this.$emit('setLaboratoryCases', this.cases)
    }
  },
  computed: {
    show() {
      return this.open;
    },
  },
}
</script>

<style scoped>

</style>
