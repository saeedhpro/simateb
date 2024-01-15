<template>
  <v-row>
    <v-col
      cols="12"
      v-if="!isLaptop && simpleDays.length > 0"
    >
      <div class="d-flex flex-row align-center justify-start ltr">
        <v-btn
          @click="goNext"
          :disabled="isGoNextDisabled"
          icon
          class="mr-3"
        >
          <v-icon
            large
          >
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-btn
          @click="goPrev"
          :disabled="isGoPrevDisabled"
          class="ml-3"
          icon
        >
          <v-icon
            large
          >
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12">
      <div style="overflow-x: scroll" id="table-wrapper" ref="table-wrapper">
        <div class="appointment-table d-flex flex-column"
           id="appointment-table"
           :class="{'surgeries': isSurgery}"
        >
          <div v-if="showCaseType && shownDays.length > 0">
            <div class="d-flex flex-row">
              <div v-for="(limits, n) in limitList" :key="n" class="header-case-type-th text-center">
                <div class="header-case-type-box">
                  <div class="header-case-type" v-for="(limit, n2) in limits" :key="n2">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <div
                          v-bind="attrs"
                          v-on="on"
                        >
                            {{ limit.name }}
                        </div>
                      </template>
                      <div>{{ limit }}</div>
                    </v-tooltip>
                    <span class="ltr" v-if="limit.is_limited"
                      :class="{ 'is-red': limit.limitations < 0, 'is-zero': limit.limitations == 0 }">
                      {{ limit.limitations }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="day-count-main" class="none" v-if="shownDays.length">
<!--            <div class="d-flex flex-row">-->
<!--                <div v-for="(i, n) in shownDayCounts" class="header-case-type-th text-center" :key="n">-->
<!--                    <div class="day-count-box header-date">-->
<!--                        {{ i }}-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

          </div>
          <div class="d-flex flex-row" v-if="shownDays.length">
            <div v-for="(d, n) in showHeaderDays" :key="n" class="header-case-type-th text-center"
               :class="{ 'is-today': d.is_today }">
                  <div
                    v-if="!d.is_holiday"
                    class="header-date"
                    :class="{ 'is-today': d.is_today, 'is-friday': d.is_friday, 'is-holiday': d.is_holiday }"
                    @click="openPazireshModal(d.start_at, true)"
                  >
                    {{ d.title }}
                    <br />
                    {{ d.sub_title }}
                  </div>
                  <v-tooltip v-else top>
                <template v-slot:activator="{ on, attrs }">
                  <span
                    v-bind="attrs"
                    v-on="on"
                    class="header-date"
                    :class="{ 'is-today': d.is_today, 'is-friday': d.is_friday, 'is-holiday': d.is_holiday }"
                    @click="openPazireshModal(d.start_at, true)"
                  >
                  {{ d.title }}
                    <br />
                    {{ d.sub_title }}
                  </span>
                </template>
                <span>{{ d.holiday_title }}</span>
              </v-tooltip>
            </div>
          </div>
          <div class="d-flex flex-row" >
            <div class="d-flex flex-column" v-for="(row, i) in shownDays" :key="i">
              <div class="table-appointment-item" v-for="(a, j) in row" :key="j">
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
      </div>
    </v-col>
    <v-col
      cols="12"
      v-if="!isLaptop && simpleDays.length > 0"
    >
      <div class="d-flex flex-row align-center justify-start ltr">
        <v-btn
          @click="goNext"
          :disabled="isGoNextDisabled"
          icon
          class="mr-3"
        >
          <v-icon
            large
          >
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <v-btn
          @click="goPrev"
          :disabled="isGoPrevDisabled"
          class="ml-3"
          icon
        >
          <v-icon
            large
          >
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import moment from "jalali-moment";
import LoadingCard from "~/components/global/LoadingCard.vue";

export default {
  name: "AppointmentPageListV4",
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
      endDay: 0,
      startIndex: 0,
      endIndex: 0,
      tableW: 0,
      headerDays: [],
      tableHtml: ''
    }
  },
  methods: {
    async getAppointments() {
      const start = this.startDate.clone().locale('en').format("YYYY/MM/DD")
      const period = 40
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
          this.maxLength = 40
          this.maxDayLength = res.data.max_length
          this.limits = res.data.limits
          this.calcSimpleDays()
        })
    },
    calcSimpleDays() {
      const start = Date.now();
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
      const millis = Date.now() - start;
      alert(`seconds elapsed = ${Math.floor(millis)}`);
      this.simpleDays = Object.values(this.simpleDays)
      setTimeout(() => {
          this.dayCountsHtml()
      }, 500)
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
    goNext() {
      let index = this.startIndex + this.tableW
      if (index > this.simpleDays.length - this.tableW) {
        index = this.simpleDays.length - this.tableW
      }
      this.startIndex = index
    },
    goPrev() {
      let index = this.startIndex - this.tableW
      if (index < 0) {
        index = 0
      }
      this.startIndex = index
    },
    setHeaderDays() {
      let holidays = this.holidays
      const days = []
      let day = this.startDate.clone().startOf("jMonth")
      while (day.locale('en').isBefore(this.endDate.clone().locale('en').format('YYYY/MM/DD HH:mm:ss'))) {
        let isHoliday = false
        let holiday_title = ''
        for (let i = 0; i < holidays.length; i++) {
          if (day.format("YYYY-MM-DD") == holidays[i].hdate) {
            isHoliday = true
            holiday_title = holidays[i].title
            break
          }
        }
        let jDate = day.clone()
        days.push({
          is_friday: jDate.locale('fa').isoWeekday() == 5,
          is_holiday: isHoliday,
          holiday_title: holiday_title,
          is_today: jDate.locale('fa').format("YYYYMMDD") == moment().locale('fa').format("YYYYMMDD"),
          title: jDate.locale('fa').format("dddd"),
          sub_title: jDate.locale('fa').format("jDD jMMMM"),
          start_at: `${day.format('YYYY/MM/DD')}`,
        })
        day = day.add(1, 'jDay')
      }
      this.headerDays = days
    },
    openPazireshModal(startAt, header = false) {
      if (header) {
          this.initTime = `${startAt} ${moment().format("HH:mm:ss")}`
          const start = moment(this.initTime);
          const remainder = 15 - (start.minute() % 15);
          this.initTime = moment(start)
              .add(remainder, "minutes")
              .format("YYYY/MM/DD HH:mm:ss")
      } else {
          this.initTime = startAt
      }
      this.showPazireshModal = true
    },
    transposeArray(array) {
        return array[0].map((col, i) => array.map(row => row[i]));
    },
    reduceArraySize(array, start, end) {
        return array.map(innerArray => innerArray.slice(start, end));
    },
    dayCountsHtml() {
        let box = document.getElementById('day-count-main')
        // let div = `<div class="d-flex flex-row">`
        let div = document.createElement('div')
        div.classList.add('d-flex')
        div.classList.add('flex-row')
        for (const c of this.shownDayCounts) {
          let d1 = document.createElement('div')
          d1.classList.add('header-case-type-th')
          d1.classList.add('day-count-parent')
          d1.classList.add('text-center')
          let d2 = document.createElement('div')
          d2.classList.add('day-count-box')
          d2.classList.add('header-date')
          d2.innerHTML = c
          d1.appendChild(d2)
          div.appendChild(d1)
        }
        box.appendChild(div)
      },
      calcSimpleDayHtml() {

      },
      createAppNode(app) {

      }
  },
  computed: {
    isGoNextDisabled() {
      if (this.loading) return true
      return this.startIndex + this.tableW >= this.simpleDays.length
    },
    isGoPrevDisabled() {
      if (this.loading) return true
      return this.startIndex === 0
    },
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
      if (this.isLaptop) {
        return this.simpleDays
      }
      // return this.reduceArraySize(this.simpleDays, this.startIndex, this.startIndex + this.tableW)
      return this.simpleDays.slice(this.startIndex, this.startIndex + this.tableW)
    },
    showHeaderDays() {
      if (this.isLaptop) {
        return this.headerDays
      }
      return this.headerDays.slice(this.startIndex, this.startIndex + this.tableW)
    },
    shownDayCounts() {
      if (this.isLaptop) {
        return this.dayCounts
      }
      return this.dayCounts.slice(this.startIndex, this.startIndex + this.tableW)
    },
    isLaptop() {
      return this.$vuetify.breakpoint.lgAndUp
    },
    tableWidth() {
      const slider = document.getElementById('table-wrapper');
      const width = slider.offsetWidth;
      this.tableW = parseInt(width / 105)
      return parseInt(width / 105)
    },
    dayCounts() {
      let list = Array(this.simpleDays.length).fill(0);
      for (let i = 0; i < this.simpleDays.length; i++) {
          list[i] = this.simpleDays[i].filter(i => !i.is_empty).length
      }
      return list;
    },
    showCaseType: {
      get() {
        return this.$store.getters['appointment/getShowCaseType']
      },
      set(val) {
        this.$store.dispatch('appointment/setShowCaseType', val)
      }
    },
    limitList() {
      let limitDays = []
      for (let i = 0; i < this.shownDays.length; i++) {
        limitDays[i] = []
        for (let j = 0; j < this.limits.length; j++) {
          let count =this.limits[j].limitation - this.shownDays[i].filter(i => i.case_type == this.limits[j].name).length
          limitDays[i][j] = {
            ...this.limits[j],
            limitations: count
          }
        }
      }
      return limitDays
    },
  },
  watch: {
    loadList(val) {
      if (val) {
        this.startIndex = 0
        this.startDay = 0
        this.setHeaderDays()
        this.getAppointments()
        this.setSlider()
      }
    },
  }
}
</script>
<style scoped>
.table-appointment-item  {
  width: 101px !important;
  min-width: 101px !important;
  height: 86px !important;
  min-height: 86px !important;
  margin: 3px;
}
.header-case-type-th {
  width: 101px !important;
  min-width: 101px !important;
  margin: 0 3px;
}
</style>
