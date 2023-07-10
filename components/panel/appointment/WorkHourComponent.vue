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
                <custom-date-input
                  :type="'time'"
                  v-model="work.start"
                  :initial-value="work.start"
                />
<!--                <date-picker-->
<!--                  v-model="work.start"-->
<!--                  format="HH:mm:ss"-->
<!--                  display-format="HH:mm:ss"-->
<!--                  editable-->
<!--                  class="date-picker"-->
<!--                  type="time"-->
<!--                >-->
<!--                  <template v-slot:label>-->
<!--                    <img src="/images/form/datepicker.svg">-->
<!--                  </template>-->
<!--                </date-picker>-->
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <div class="create-update-model-input-box">
                <label>ساعت پایان</label>
                <custom-date-input
                  :type="'time'"
                  v-model="work.end"
                  :initial-value="work.end"
                />
<!--                <date-picker-->
<!--                  v-model="work.end"-->
<!--                  format="HH:mm:ss"-->
<!--                  display-format="HH:mm:00"-->
<!--                  editable-->
<!--                  class="date-picker"-->
<!--                  type="time"-->
<!--                >-->
<!--                  <template v-slot:label>-->
<!--                    <img src="/images/form/datepicker.svg">-->
<!--                  </template>-->
<!--                </date-picker>-->
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <custom-text-input
                :label="'بازه زمانی'"
                v-model="work.period"
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
              sm="3"
              md="3"
            >
              <button
                class="second-button"
                @click="close"
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
    open: {
      type: Boolean,
      default: false,
    },
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
        start: this.start,
        end: this.end,
        period: this.period,
        organization_id: this.organizationId,
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    save() {
      this.$store.dispatch('organizations/updateOrganizationWorkHour', this.work)
      .finally((res) => {
        this.close()
      })
    }
  },
  computed: {
    show: {
      get() {
        return this.open
      },
      set(val) {
        if (!val) {
          this.close()
        }
      }
    }
  },
}
</script>

<style scoped>

</style>
