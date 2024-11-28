<template>
  <v-dialog
    v-model="show"
    v-if="show"
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
          <span>ساعت کاری</span>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <div class="create-update-model-input-box">
                <label>ساعت شروع</label>
<!--                <custom-date-input-->
<!--                  :type="'time'"-->
<!--                  v-model="work.start"-->
<!--                  :initial-value="work.start"-->
<!--                  @input="(val)=>onChange({name: 'start', val: val})"-->
<!--                />-->
                <date-picker
                  v-model="work.start"
                  format="HH:mm:ss"
                  display-format="HH:mm"
                  editable
                  class="date-picker"
                  type="time"
                  @input="(val)=>onChange({name: 'start', val: val})"
                >
                  <template v-slot:label>
                    <img src="/images/form/datepicker.svg">
                  </template>
                </date-picker>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <div class="create-update-model-input-box">
                <label>ساعت پایان</label>
<!--                <custom-date-input-->
<!--                  :type="'time'"-->
<!--                  v-model="work.end"-->
<!--                  :initial-value="work.end"-->
<!--                  @input="(val)=>onChange({name: 'end', val: val})"-->
<!--                />-->
                <date-picker
                  v-model="work.end"
                  format="HH:mm:ss"
                  display-format="HH:mm"
                  editable
                  class="date-picker"
                  type="time"
                  @input="(val)=>onChange({name: 'end', val: val})"
                >
                  <template v-slot:label>
                    <img src="/images/form/datepicker.svg">
                  </template>
                </date-picker>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <custom-text-input
                :label="'بازه زمانی'"
                v-model="work.period"
                @input="(val)=>onChange({name: 'period', val: val})"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-spacer/>
            <v-col
              cols="12"
              sm="4"
              md="3"
            >
              <button
                class="second-button full-width"
                @click="close"
              >
                بستن
              </button>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="3"
            >
              <button
                class="main-button"
                @click="save"
              >
                ذخیره
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
  name: "WorkHourComponent",
  props: {
    start: {
      type: String,
      default: "00:00:00",
    },
    end: {
      type: String,
      default: "00:00:00",
    },
    period: {
      type: Number,
      default: 15,
    },
    organizationId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      work: {
        start: '',
        end: '',
        period: 15,
        organization_id: 0,
      }
    }
  },
  methods: {
    close() {
      // this.$emit('close')
      this.$store.dispatch('appointment/setShowWorkHour', false)
    },
    save() {
      this.$store.dispatch('organizations/updateOrganizationWorkHour', this.workHour)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد')
        })
      .finally((res) => {
        this.close()
        this.$emit('done')
      })
    },
    onChange(e) {
      let work = {
        ...this.work,
      }
      work[e.name] = e.val
      return this.$store.dispatch('appointment/setWorkHour', work)
    }
  },
  computed: {
    show: {
      get() {
        return this.$store.getters['appointment/getShowWorkHour']
      },
      set(val) {
        if (!val) {
          this.close()
        }
      }
    },
    workHour: {
      get() {
        return this.$store.getters['appointment/getWorkHour']
      },
      set(val) {

      }
    }
  },
  watch: {
    workHour(val) {
      this.work = {
        start: val.start,
        end: val.end,
        period: val.period,
        organization_id: val.organization_id,
      }
    },
  }
}
</script>

<style scoped>

</style>
