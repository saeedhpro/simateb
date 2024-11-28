<template>
  <v-row>
    <v-col cols="12">
      <div v-if="loading">
        <v-progress-circular />
      </div>
      <div v-else style="overflow-x: scroll" id="table-wrapper" ref="table-wrapper">
        <div class="appointment-table d-flex flex-row"
           id="appointment-table"
           :class="{'surgeries': isSurgery}"
           @scroll="onTableScroll"
        >
          <div class="" v-for="(l, i) in shownDays" :key="i">
            <div class="table-appointment-item" v-for="(a, j) in l" :key="j">
              <div
                v-if="!a.is_empty"
                class="table-appointment-component"
                :class="{
                   'is-friday': a.is_friday,
                   'is-holiday': a.is_holiday,
                   'is-today': a.is_today,
                   'is-reserved': a.is_reserved,
                   'is-accepted': a.is_accepted,
                   'is-canceled': a.is_canceled,
                   'is-waiting': a.is_waiting,
                   'is-time-based': false,
                }"
                @click="openItem(a.id)"
              >
                <div class="full-name">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <div
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ a.user_full_name }}
                    </div>
                  </template>
                  <div>{{ a.user_full_name }}</div>
                </v-tooltip>
              </div>
              <span class="start-at mt-1">{{ a.start_at_time_fa }}</span>
              <span class="case-type" v-if="a.case_type">{{ a.case_type }}</span>
              <div v-if="a.is_vip" class="vip-tag">
                VIP
              </div>
              </div>
              <div
                v-else
                class="table-appointment-none"
                :class="{
                   'is-friday': a.is_friday,
                   'is-holiday': a.is_holiday,
                   'is-today': a.is_today,
                   'is-reserved': a.is_reserved,
                   'is-accepted': a.is_accepted,
                   'is-canceled': a.is_canceled,
                   'is-waiting': a.is_waiting,
                   'is-time-based': false,
                }"
              >
                <div
                  class="start-at"
                >
                </div>
                <div
                  class="time"
                  v-if="showHour"
                >
                  {{'-'}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import moment from "jalali-moment";
import LoadingCard from "~/components/global/LoadingCard.vue";

export default {
  name: "AppointmentPageListV3",
  components: { LoadingCard, },
  props: {
    isSurgery: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: true,
      maxLength: 0,
      maxDayLength: 0,
      maxTimeLength: 0,
      startDay: 0,
      endDay: 0,
    }
  },
  mounted() {
  },
  methods: {
    async getAppointments() {
      const start = this.startDate.clone().locale('en').format("YYYY/MM/DD")
      const period = 41
      let url = `/appointments/que/v5?start=${start}&period=${period}`
      if (this.isSurgery) {
        url += `&ct=جراحی`
        url += `&is_surgery=1`
      } else {
        url += `&is_surgery=0`
      }
      this.$axios.get(url)
        .then(res => {
          this.simpleDays = res.data.appointments
          this.maxLength = 41
          this.maxDayLength = res.data.max_length
          // this.limits = res.data.limits
          this.calcSimpleDays()
        })
    },
    calcSimpleDays() {
      if (!this.startDate) {
        return
      }
      let startDay = this.startDate.clone()
      let dayStart = startDay.clone()
      dayStart = dayStart.set({
        hour: this.workHour.start.substring(0, 2),
        minute: this.workHour.start.substring(3, 5),
        second: this.workHour.start.substring(6, 9),
      })
      let today = moment().locale('fa').format("YYYYMMDD")
      let holidays = this.holidays
      let period = this.workHour.period
      let i = 0;
      let keys = Object.keys(this.simpleDays)
      for (const key of keys) {
        let jDate = dayStart.clone().locale('fa')
        let isToday = jDate.format("YYYYMMDD") == today
        let isFriday = jDate.isoWeekday() == 5
        let isHoliday = false
        for (let h = 0; h < holidays.length; h++) {
          if (startDay.clone().format("YYYY-MM-DD") == holidays[h].hdate) {
            isHoliday = true
            break
          }
        }
        for (let j = 0; j < this.maxDayLength; j++) {
          if (this.simpleDays[key][j]) {
            this.simpleDays[key][j] = {
              ...this.simpleDays[key][j],
              is_empty: false,
              is_friday: isFriday,
              is_holiday: isHoliday,
              is_today: isToday,
              is_reserved: this.simpleDays[key][j].status == 1,
              is_accepted: this.simpleDays[key][j].status == 2,
              is_canceled: this.simpleDays[key][j].status == 3,
              is_waiting: this.simpleDays[key][j].waiting,
              index: j,
            }
          } else {
            let s = dayStart.clone().add(j * period, 'minute')
            this.simpleDays[key][j] = {
              is_empty: true,
              is_friday: isFriday,
              is_holiday: isHoliday,
              is_today: isToday,
              start_at: s.format('YYYY/MM/DD HH:mm:ss'),
              start_at_time_fa: s.format('HH:mm'),
              index: j,
            }
          }
        }
        dayStart = dayStart.add(1, 'day')
        dayStart = dayStart.set({
          hour: this.workHour.start.substring(0, 2),
          minute: this.workHour.start.substring(3, 5),
          second: this.workHour.start.substring(6, 9),
        })
      }
      this.loading = false
      this.setSlider()
    },
    setSlider() {
      setTimeout(() => {
        const slider = document.getElementById('table-wrapper');
        let isDown = false;
        let startX;
        let scrollLeft;
        if (slider) {
          slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
          });
          slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
          });
          slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
          });
          slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3;
            slider.scrollLeft = scrollLeft - walk;
          });
          slider.addEventListener('scroll', (e) => {
            const start = Math.abs(slider.scrollLeft) / 105
          });
        }
      }, 500)
    },
    openItem(id) {
      this.appointmentID = id
      this.showItemModal = true
    },
    onTableScroll(e) {
      return true
    }
  },
  computed: {
    startDate: {
      get() {
        return this.$store.getters['appointment/getStartDate']
      },
      set(val) {
        return this.$store.dispatch('appointment/setStartDate', val)
      }
    },
    endDate: {
      get() {
        return this.$store.getters['appointment/getEndDate']
      },
      set(val) {
        return this.$store.dispatch('appointment/setEndDate', val)
      }
    },
    loadList: {
      get() {
        return this.$store.getters['appointment/getLoadList']
      },
      set(val) {
        this.$store.dispatch('appointment/setLoadList', val)
      }
    },
    limits: {
      get() {
        return this.$store.getters['appointment/getLimits']
      },
      set(val) {
        this.$store.dispatch('appointment/setLimits', val)
      }
    },
    appointments: {
      get() {
        return this.$store.getters['appointment/getAppointments']
      },
      set(val) {
        this.$store.dispatch('appointment/setAppointments', val)
      }
    },
    holidays: {
      get() {
        return this.$store.getters['appointment/getHolidays']
      },
      set(val) {
        return this.$store.dispatch('appointment/setHolidays', val)
      }
    },
    simpleDays: {
      get() {
        return this.$store.getters['appointment/getSimpleDays']
      },
      set(val) {
        return this.$store.dispatch('appointment/setSimpleDays', val)
      }
    },
    workHour: {
      get() {
        return this.$store.getters['appointment/getWorkHour']
      },
      set(val) {
        return this.$store.dispatch('appointment/setWorkHour', val)
      }
    },
    showItemModal: {
      get() {
        return this.$store.getters['appointment/getShowItemModal']
      },
      set(val) {
        this.$store.dispatch('appointment/setShowItemModal', val)
      }
    },
    appointmentID: {
      get() {
        return this.$store.getters['appointment/getAppointmentID']
      },
      set(val) {
        this.$store.dispatch('appointment/setAppointmentID', val)
      }
    },
    showHour: {
      get() {
        return this.$store.getters['appointment/getShowHour'];
      },
      set(val) {
        return this.$store.dispatch('appointment/setShowHour', val);
      }
    },
    shownDays() {
      let index = this.startDay > 1 ? this.startDay - 2: this.startDay
      if (index > 27) {
        index = 27
      }
      // return this.simpleDays.slice(index, index + this.tableWidth)
      let keys = Object.keys(this.simpleDays)
      keys = keys.slice(index, index + this.tableWidth)
      const picked = (({ ...keys }) => ({ ...keys }))(this.simpleDays);
      return picked
    },
    tableWidth() {
      const slider = document.getElementById('table-wrapper');
      if (!slider) return 0
      const width = slider.offsetWidth;
      return parseInt(width / 105) + 2
    }
  },
  watch: {
    loadList(val) {
      if (val) {
        this.getAppointments()
      }
    },
  }
}
</script>
<style scoped>
.table-appointment-item {
  width: 101px !important;
  min-width: 101px !important;
  height: 86px !important;
  min-height: 86px !important;
  margin: 3px;
}
</style>
