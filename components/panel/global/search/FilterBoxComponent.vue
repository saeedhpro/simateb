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
            @click="closeFilterModal"
            class="create-update-modal-close"
          >
            <v-icon>mdi-close</v-icon>
          </button>
          <span>جستجو پیشرفته</span>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="4"
              md="4"
            >
              <div class="create-update-model-input-box">
                <label>عبارت جستجو</label>
                <input type="text" v-model="search.q">
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="4"
            >
              <div class="create-update-model-input-box">
                <label>تاریخ ابتدا</label>
                <custom-date-input
                  :type="'date'"
                  v-model="search.start"
                  :initial-value="search.start"
                />
<!--                <date-picker-->
<!--                  v-model="search.start"-->
<!--                  format="YYYY-MM-DD"-->
<!--                  display-format="jYYYY/jMM/jDD"-->
<!--                  editable-->
<!--                  class="date-picker"-->
<!--                  type="date"-->
<!--                >-->
<!--                  <template v-slot:label>-->
<!--                    <img src="/images/form/datepicker.svg">-->
<!--                  </template>-->
<!--                </date-picker>-->
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="4"
            >
              <div class="create-update-model-input-box">
                <label>تاریخ انتها</label>
                <custom-date-input
                  :type="'date'"
                  v-model="search.end"
                  :initial-value="search.end"
                />
<!--                <date-picker-->
<!--                  v-model="search.end"-->
<!--                  format="YYYY-MM-DD"-->
<!--                  display-format="jYYYY/jMM/jDD"-->
<!--                  editable-->
<!--                  class="date-picker"-->
<!--                  type="date"-->
<!--                >-->
<!--                  <template v-slot:label>-->
<!--                    <img src="/images/form/datepicker.svg">-->
<!--                  </template>-->
<!--                </date-picker>-->
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
                @click="clearForm"
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
                @click="closeFilterModal"
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
                @click="doSearch"
              >
                جستجو
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
  name: "FilterBoxComponent",
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
  data() {
    return {
      search: {
        page: 1,
        start: this.$moment().format("YYYY-MM-DD"),
        end: this.$moment().format("YYYY-MM-DD"),
        q: '',
      },
    }
  },
  methods :{
    closeFilterModal() {
      this.$emit('close')
    },
    doSearch() {
      this.$emit('search', this.search)
    },
    clearForm() {
      this.search = {
        page: 1,
        start: this.$moment().format("YYYY-MM-DD"),
        end: this.$moment().format("YYYY-MM-DD"),
        q: '',
      }
    },
  },
  computed: {
    show: {
      get() {
        return this.open
      },
      set(val) {
      }
    }
  },
  watch: {
    open() {
      if (this.open) {
        this.clearForm()
      }
    }
  }
}
</script>

<style scoped>

</style>
