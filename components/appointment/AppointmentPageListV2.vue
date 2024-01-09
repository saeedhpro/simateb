<template>
  <v-row>
    <v-col cols="12">
      <div v-if="!loadList">
        <v-progress-circular />
      </div>
      <div v-else style="overflow-x: scroll" id="table-wrapper" ref="table-wrapper">
        <div class="appointment-table d-flex flex-column"
           id="appointment-table"
           :class="{'surgeries': isSurgery}"
           @scroll="onTableScroll"
        >
          <div class="d-flex flex-row" v-for="(_, i) in maxLength" :key="i">
            <div class="table-appointment-item" v-for="(_, j) in shownDays.length" :key="j">
              <div
                class="table-appointment-component"
                :class="{
                   'is-friday': shownDays[j][i].is_friday,
                   'is-holiday': shownDays[j][i].is_holiday,
                   'is-today': shownDays[j][i].is_today,
                   'is-reserved': shownDays[j][i].is_reserved,
                   'is-accepted': shownDays[j][i].is_accepted,
                   'is-canceled': shownDays[j][i].is_canceled,
                   'is-waiting': shownDays[j][i].is_waiting,
                   'is-time-based': false,
                }"
                v-if="shownDays[j][i] && !shownDays[j][i].is_empty"
                @click="openItem(shownDays[j][i].id)"
              >
                <div class="full-name">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <div
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ shownDays[j][i].user_full_name }}
                      </div>
                    </template>
                    <div>{{ shownDays[j][i].user_full_name }}</div>
                  </v-tooltip>
                </div>
                <span class="start-at mt-1">{{ shownDays[j][i].start_at_time_fa }}</span>
                <span class="case-type" v-if="shownDays[j][i].case_type">{{ shownDays[j][i].case_type }}</span>
                <div v-if="shownDays[j][i].is_vip" class="vip-tag">
                  VIP
                </div>
              </div>
              <div
                class="table-appointment-none"
                :class="{
                   'is-friday': shownDays[j][i].is_friday,
                   'is-holiday': shownDays[j][i].is_holiday,
                   'is-today': shownDays[j][i].is_today,
                   'is-reserved': shownDays[j][i].is_reserved,
                   'is-accepted': shownDays[j][i].is_accepted,
                   'is-canceled': shownDays[j][i].is_canceled,
                   'is-waiting': shownDays[j][i].is_waiting,
                   'is-time-based': false,
                }"
                v-else-if="shownDays[j][i] && shownDays[j][i].is_empty"
              >
                <div
                  class="start-at"
                  v-if="shownDays[j][i].is_friday"
                >
                  {{ shownDays[j][i].index + 1 }}
                </div>
                <div
                  class="time"
                  v-else-if="showHour"
                >
                  {{ shownDays[j][i].start_at_time_fa  }}
                </div>
              </div>
              <div v-else >
                {{ `${i - j}` }}
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
import TableAppointmentNoneV2 from "~/components/panel/appointment/TableAppointmentNoneV2.vue";
import TableAppointmentV2 from "~/components/panel/appointment/TableAppointmentV2.vue";
import LoadingCard from "~/components/global/LoadingCard.vue";

export default {
  name: "AppointmentPageList2",
  components: { LoadingCard, },
  props: {
    isSurgery: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      maxLength: 0,
      maxTimeLength: 0,
      startDay: 0,
    }
  },
  mounted() {
  },
  methods: {
    async getAppointments() {
      const start = this.startDate.clone().locale('en').format("YYYY/MM/DD")
      const end = this.endDate.clone().locale('en').format("YYYY/MM/DD")
      let url = `/appointments/que/v4?start=${start}&end=${end}`
      if (this.isSurgery) {
        url += `&ct=جراحی`
        url += `&is_surgery=1`
      } else {
        url += `&is_surgery=0`
      }
      this.$axios.get(url)
        .then(res => {
          this.appointments = res.data.appointments
          this.limits = res.data.limits
          this.calcSimpleDays()
        })
    },
    calcSimpleDays() {
      const start = Date.now();
      if (!this.startDate) {
        return
      }
      let holidays = this.holidays
      let startDay = this.startDate.clone()
      let lastDay = this.endDate.clone().add(1, 'day').endOf("day")
      let i = 0;
      let period = this.workHour.period
      let dayStart = startDay.clone()
      dayStart = dayStart.set({
        hour: this.workHour.start.substring(0, 2),
        minute: this.workHour.start.substring(3, 5),
        second: this.workHour.start.substring(6, 9),
      })
      let dayEnd = startDay.clone()
      dayEnd = dayEnd.set({
        hour: this.workHour.end.substring(0, 2),
        minute: this.workHour.end.substring(3, 5),
        second: this.workHour.end.substring(6, 9),
      })
      let minutes = moment.duration(dayEnd.diff(dayStart)).asMinutes()
      let dayLength = this.showHour ? minutes / period : 8
      const days = []
      let list = [
        ...this.appointments,
      ]
      let today = moment().locale('fa').format("YYYYMMDD")
      let maxLength = dayLength
      moment.locale('en')
      while (startDay.locale('en').isBefore(lastDay.locale('en').format("YYYY/MM/DD"))) {
        days[i] = []
        let dayStart = startDay.clone()
        dayStart = dayStart.set({
          hour: this.workHour.start.substring(0, 2),
          minute: this.workHour.start.substring(3, 5),
          second: this.workHour.start.substring(6, 9),
        })
        let dayEnd = startDay.clone()
        dayEnd = dayEnd.set({
          hour: this.workHour.end.substring(0, 2),
          minute: this.workHour.end.substring(3, 5),
          second: this.workHour.end.substring(6, 9),
        })
        let jDate = dayStart.clone().locale('fa')
        let isToday = jDate.format("YYYYMMDD") == today
        if (isToday) {
          this.startDay = i
        }
        let isFriday = jDate.isoWeekday() == 5
        let isHoliday = false
        for (let h = 0; h < holidays.length; h++) {
          if (dayStart.format("YYYY-MM-DD") == holidays[h].hdate) {
            isHoliday = true
            break
          }
        }
        for (let j = 0; j < dayLength; j++) {
          if (list.length > 0) {
            while (list.length > 0) {
              let app = list[0]
              let startAt = moment(app.start_at, 'YYYY/MM/DD HH:mm:ss')
              if (startAt.format("YYYYMMDD") === dayStart.format("YYYYMMDD")) {
                days[i].push({
                  id: j,
                  ...app,
                  is_empty: false,
                  is_friday: isFriday,
                  is_holiday: isHoliday,
                  is_today: isToday,
                  is_reserved: app.status == 1,
                  is_accepted: app.status == 2,
                  is_canceled: app.status == 3,
                  is_waiting: app.waiting,
                  start_at: startAt.format('YYYY/MM/DD HH:mm:ss'),
                  index: j,
                })
                list.shift()
                j++;
              } else {
                break;
              }
            }
            if (j < dayLength) {
              let s = dayStart.clone().add(j * period, 'minute')
              let jDate = s.clone().locale('fa')
              days[i].push({
                id: j,
                is_empty: true,
                is_friday: isFriday,
                is_holiday: isHoliday,
                is_today: isToday,
                is_reserved: app.status == 1,
                is_accepted: app.status == 2,
                is_canceled: app.status == 3,
                is_waiting: app.waiting,
                start_at: s.format('YYYY/MM/DD HH:mm:ss'),
                start_at_time_fa: jDate.locale('en').format('HH:mm'),
                index: j,
              })
            }
          } else {
            let s = dayStart.clone().add(j * period, 'minute')
            days[i].push({
              id: j,
              is_empty: true,
              is_friday: isFriday,
              is_holiday: isHoliday,
              is_today: isToday,
              is_reserved: app.status == 1,
              is_accepted: app.status == 2,
              is_canceled: app.status == 3,
              is_waiting: app.waiting,
              start_at: s.format('YYYY/MM/DD HH:mm:ss'),
              start_at_time_fa: s.format('HH:mm'),
              index: j,
            })
          }
        }
        startDay = startDay.add(1, 'days')
        i++;
      }
      maxLength = days.reduce((maxSize, subArray) => {
        const subArraySize = subArray.length;
        return Math.max(maxSize, subArraySize);
      }, 0)
      this.maxLength = maxLength
      for (let i = 0; i < days.length; i++) {
        let dayStart = this.startDate.clone().add(i, 'day')
        for (let j = days[i].length; j < maxLength; j++) {
          let isHoliday = false
          for (let h = 0; h < holidays.length; h++) {
            if (dayStart.format("YYYY-MM-DD") == holidays[h].hdate) {
              isHoliday = true
              break
            }
          }
          let jDate = dayStart.clone().locale('fa')
          days[i].push({
            id: j,
            is_empty: true,
            is_friday: jDate.isoWeekday() == 5,
            is_holiday: isHoliday,
            is_reserved: app.status == 1,
            is_accepted: app.status == 2,
            is_canceled: app.status == 3,
            is_waiting: app.waiting,
            is_today: jDate.format("YYYYMMDD") == today,
            start_at: dayStart.format('YYYY/MM/DD HH:mm:ss'),
            start_at_time_fa: dayStart.locale('en').format('HH:mm'),
            index: j,
          })
        }
      }
      this.loading = false
      this.simpleDays = days
      const millis = Date.now() - start;
      alert(`seconds elapsed = ${Math.floor(millis)}`);
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
            console.log(start + 2, "start")

          });
        }
      }, 500)
    },
    openItem(id) {
      this.appointmentID = id
      this.showItemModal = true
    },
    onTableScroll(e) {
      console.log(e , "e")
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
      return this.simpleDays
      let index = this.startDay > 1 ? this.startDay - 2: this.startDay
      if (index > 27) {
        index = 27
      }
      return this.simpleDays.slice(index, index + 14)
    },
    tableWidth() {
      const slider = document.getElementById('table-wrapper');
      const width = slider.offsetWidth;
      console.log(parseInt(width / 105) + 2)
      return width
    }
  },
  watch: {
    loadList(val) {
      if (val) {
        this.getAppointments()
        this.setSlider()
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
