<template>
  <v-row>
    <v-col cols="12" v-if="loadList">
      <div v-if="!loadList">
        <v-progress-circular />
      </div>
      <div v-else style="overflow-x: scroll" id="table-wrapper" ref="table-wrapper">
        <table class="appointment-table"
         id="appointment-table"
         :class="{'surgeries': isSurgery}"
        >
          <thead v-if="showCaseType" v-once>
            <tr>
              <th v-for="(limits, n) in limitList" :key="n" class="header-case-type-th text-center">
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
                      <div>{{ limit.name }}</div>
                    </v-tooltip>
                    <span class="ltr" v-if="limit.is_limited"
                      :class="{ 'is-red': limit.limitations < 0, 'is-zero': limit.limitations == 0 }">
                      {{ limit.limitations }}
                    </span>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <thead class="none">
            <tr>
              <th v-for="(i, n) in dayCounts" :key="n">
                <div class="day-count-box">
                  {{ i }}
                </div>
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th v-for="(d, n) in headerDays" :key="n" class="header-case-type-th text-center"
                :class="{ 'is-today': d.is_today }">
                <div
                  v-if="!d.is_holiday"
                  class="header-date"
                  :class="{ 'is-today': d.is_today, 'is-friday': d.is_friday, 'is-holiday': d.is_holiday }"
                  @click="openPazireshModal(d.start_at, true)">
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
              </th>
            </tr>
          </thead>
          <tbody v-if="loading">
            <loading-card />
          </tbody>
          <tbody v-else-if="showHour">
            <tr v-for="(_, i) in maxTimeLength" :key="i">
              <td v-for="(_, j) in timeBaseDays.length" :key="j">
                <appointment-page-table-item v-if="timeBaseDays[j][i] && !timeBaseDays[j][i].is_empty"
                  :case-type="timeBaseDays[j][i].case_type" :index="timeBaseDays[j][i].index"
                  :is-friday="timeBaseDays[j][i].is_friday" :is-holiday="timeBaseDays[j][i].is_holiday"
                  :is-today="timeBaseDays[j][i].is_today" :user-full-name="timeBaseDays[j][i].user_full_name"
                  :start-at-time-fa="timeBaseDays[j][i].start_at_time_fa"
                  :is-vip="timeBaseDays[j][i].is_vip"
                  :waiting="timeBaseDays[j][i].waiting"
                  :status="timeBaseDays[j][i].status"
                  :is-time-based="true"
                  @click.native="openItem(timeBaseDays[j][i].id)"
                />
                <appointment-page-table-empty-item v-else-if="timeBaseDays[j][i]" :index="i"
                  :is-friday="timeBaseDays[j][i].is_friday" :is-holiday="timeBaseDays[j][i].is_holiday"
                  :is-today="timeBaseDays[j][i].is_today" :show-hour="true"
                  :start-at-time-fa="timeBaseDays[j][i].start_at_time_fa"
                  :is-vip="timeBaseDays[j][i].is_vip"
                  :is-time-based="true"
                  @click.native="openPazireshModal(timeBaseDays[j][i].start_at)" />
                <div v-else>{{ `${i} - ${j}` }} </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(_, i) in maxLength" :key="i">
              <td v-for="(_, j) in simpleDays.length" :key="j">
                <appointment-page-table-item v-if="simpleDays[j][i] && !simpleDays[j][i].is_empty"
                  :case-type="simpleDays[j][i].case_type" :index="simpleDays[j][i].index"
                  :is-friday="simpleDays[j][i].is_friday" :is-holiday="simpleDays[j][i].is_holiday"
                  :is-today="simpleDays[j][i].is_today" :user-full-name="simpleDays[j][i].user_full_name"
                  :start-at-time-fa="simpleDays[j][i].start_at_time_fa"
                  :is-vip="simpleDays[j][i].is_vip"
                  :waiting="simpleDays[j][i].waiting"
                  :status="simpleDays[j][i].status"
                  @click.native="openItem(simpleDays[j][i].id)" />
                <appointment-page-table-empty-item v-else-if="simpleDays[j][i]" :index="i"
                  :is-friday="simpleDays[j][i].is_friday" :is-holiday="simpleDays[j][i].is_holiday"
                  :is-today="simpleDays[j][i].is_today" :show-hour="false"
                  :start-at-time-fa="simpleDays[j][i].start_at_time_fa"
                  :is-vip="simpleDays[j][i].is_vip"
                />
                <div v-else>{{ `${i} - ${j}` }} </div>
              </td>
            </tr>
          </tbody>
        </table>
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
  name: "AppointmentPageList",
  components: { LoadingCard, TableAppointmentV2, TableAppointmentNoneV2 },
  props: {
    isSurgery: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      headerDays: [],
      simpleDays: [],
      timeBaseDays: [],
      maxLength: 0,
      maxTimeLength: 0,
    }
  },
  mounted() {
    if (this.loadList) {
      this.$nextTick(() => {
      })
    }
  },
  methods: {
    async getAppointmentList() {
      const start = this.startDate.clone().locale('en').format("YYYY/MM/DD")
      const end = this.endDate.clone().locale('en').format("YYYY/MM/DD")
      let url = `/appointments/que/v4?start=${start}&end=${end}`
      if (this.isSurgery) {
        url += `&ct=جراحی`
        url += `&is_surgery=1`
      } else {
        url += `&is_surgery=0`
      }
      const res = await this.$axios.get(url)
      if (res.status == 200) {
        const data = res.data
        await this.$store.dispatch('appointment/setAppointments', data.appointments)
        await this.$store.dispatch('appointment/setLimits', data.limits)
        if (this.showHour) {
          this.timeBaseDays = this.calcTimeBaseDays()
        } else {
          this.simpleDays = this.calcSimpleDays()
        }
        let todays = document.getElementsByClassName('is-today')
        if (todays.length > 0) {
          todays[0].scrollIntoView({
            inline: "end",
            behavior: 'smooth'
          })
        }
      }
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
    openItem(id) {
      this.appointmentID = id
      this.showItemModal = true
    },
    getLimit(limit, index) {
      if (this.simpleDays.length < index) {
        return limit.limitation
      }
      return limit.limitation - this.simpleDays[index].filter(i => i.case_type == limit.name).length
    },
    calcSimpleDays() {
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
      // moment.updateLocale('en', 'en')
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
        let dayEndTime = dayEnd.clone().set({
          hour: 23,
          minute: 59,
          second: 59,
        })

        let jDate = dayStart.clone().locale('fa')
        let isToday = jDate.format("YYYYMMDD") == today
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
                  ...app,
                  is_empty: false,
                  is_friday: isFriday,
                  is_holiday: isHoliday,
                  is_today: isToday,
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
                is_empty: true,
                is_friday: jDate.isoWeekday() == 5,
                is_holiday: isHoliday,
                is_today: jDate.format("YYYYMMDD") == today,
                start_at: s.format('YYYY/MM/DD HH:mm:ss'),
                start_at_time_fa: jDate.locale('en').format('HH:mm'),
                index: j,
              })
            }
          } else {
            let s = dayStart.clone().add(j * period, 'minute')
            days[i].push({
              is_empty: true,
              is_friday: isFriday,
              is_holiday: isHoliday,
              is_today: isToday,
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
            is_empty: true,
            is_friday: jDate.isoWeekday() == 5,
            is_holiday: isHoliday,
            is_today: jDate.format("YYYYMMDD") == today,
            start_at: dayStart.format('YYYY/MM/DD HH:mm:ss'),
            start_at_time_fa: dayStart.locale('en').format('HH:mm'),
            index: j,
          })
        }
      }
      this.loading = false
      return days;
    },
    calcTimeBaseDays() {
      let default_duration = this.workHour.period
      let holidays = this.holidays
      let startDay = this.startDate.clone()
      let lastDay = this.endDate.clone().add(1, 'day').endOf("day")
      let i = 0;
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
      let maxLength = parseInt(minutes / default_duration)
      const days = []
      let list = [
        ...this.appointments,
      ]
      let today = moment().locale('fa').format("YYYYMMDD")
      while (startDay.locale('en').isBefore(lastDay.locale('en').format("YYYY/MM/DD"))) {
        days[i] = []
        let boxDuration = default_duration
        let boxStart = dayStart.clone().locale('en')
        let jDate = dayStart.clone().locale('fa')
        let isToday = jDate.format("YYYYMMDD") == today
        let isFriday = jDate.isoWeekday() == 5
        let isHoliday = false
        for (let h = 0; h < holidays.length; h++) {
          if (dayStart.format("YYYY-MM-DD") == holidays[h].hdate) {
            isHoliday = true
            break
          }
        }
        if (list.length > 0) {
          let j = 0;
          while (list.length > 0) {
            boxDuration = default_duration
            let app = list[0]
            let startAt = moment(app.start_at, 'YYYY/MM/DD HH:mm:ss')
            if (startAt.locale('en').format("YYYYMMDD") === dayStart.format("YYYYMMDD")) {
              if (startAt.locale('en').isBefore(dayStart.locale('en').format('YYYY/MM/DD HH:mm'))) {
                days[i].push({
                  ...app,
                  is_empty: false,
                  is_friday: isFriday,
                  is_holiday: isHoliday,
                  is_today: isToday,
                  start_at: startAt.locale('en').format('YYYY/MM/DD HH:mm:ss'),
                  index: j,
                })
                j++
                list.shift()
              } else if (startAt.locale('en').isBefore(dayEnd.locale('en').format('YYYY/MM/DD HH:mm'))) {
                if (startAt.locale('en').isSameOrBefore(boxStart.locale('en').format('YYYY/MM/DD HH:mm'))) {
                  days[i].push({
                    ...app,
                    is_empty: false,
                    is_friday: isFriday,
                    is_holiday: isHoliday,
                    is_today: isToday,
                    start_at: startAt.locale('en').format('YYYY/MM/DD HH:mm:ss'),
                    index: j,
                  })
                  j++
                  list.shift()
                  boxDuration = app.duration
                  boxStart = boxStart.add(boxDuration, 'minutes')
                } else {
                  days[i].push({
                    is_empty: true,
                    is_friday: isFriday,
                    is_holiday: isHoliday,
                    is_today: isToday,
                    start_at: boxStart.locale('en').format('YYYY/MM/DD HH:mm:ss'),
                    start_at_time_fa: boxStart.locale('en').format('HH:mm'),
                    index: j,
                  })
                  boxStart = boxStart.add(boxDuration, 'minutes')
                  j++
                }
              } else {
                if (startAt.locale('en').isAfter(dayEnd.locale('en').format('YYYY/MM/DD HH:mm'))) {
                  while (boxStart.isBefore(startAt.format('YYYY/MM/DD HH:mm'))) {
                    days[i].push({
                      is_empty: true,
                      is_friday: isFriday,
                      is_holiday: isHoliday,
                      is_today: isToday,
                      start_at: boxStart.locale('en').format('YYYY/MM/DD HH:mm:ss'),
                      start_at_time_fa: boxStart.locale('en').format('HH:mm'),
                      index: j,
                    })
                    j++
                    boxStart = boxStart.add(boxDuration, 'minutes')
                  }
                  days[i].push({
                    ...app,
                    is_empty: false,
                    is_friday: isFriday,
                    is_holiday: isHoliday,
                    is_today: isToday,
                    start_at: startAt.locale('en').format('YYYY/MM/DD HH:mm:ss'),
                    index: j,
                  })
                  j++
                  list.shift()
                } else {
                  days[i].push({
                    ...app,
                    is_empty: false,
                    is_friday: isFriday,
                    is_holiday: isHoliday,
                    is_today: isToday,
                    start_at: startAt.locale('en').format('YYYY/MM/DD HH:mm:ss'),
                    index: j,
                  })
                  j++
                  list.shift()
                }
              }
            } else {
              while (boxStart.isSameOrBefore(dayEnd.format('YYYY/MM/DD HH:mm'))) {
                days[i].push({
                  is_empty: true,
                  is_friday: isFriday,
                  is_holiday: isHoliday,
                  is_today: isToday,
                  start_at: boxStart.locale('en').format('YYYY/MM/DD HH:mm:ss'),
                  start_at_time_fa: boxStart.locale('en').format('HH:mm'),
                  index: j,
                })
                j++
                boxStart = boxStart.add(boxDuration, 'minutes')
              }
              dayStart = dayStart.add(1, 'days')
              dayEnd = dayEnd.add(1, 'days')
              break;
            }
          }
          while (boxStart.isSameOrBefore(dayEnd.clone().add(-1, 'days').format('YYYY/MM/DD HH:mm'))) {
            days[i].push({
              is_empty: true,
              is_friday: isFriday,
              is_holiday: isHoliday,
              is_today: isToday,
              start_at: boxStart.locale('en').format('YYYY/MM/DD HH:mm:ss'),
              start_at_time_fa: boxStart.locale('en').format('HH:mm'),
              index: j,
            })
            j++
            boxStart = boxStart.add(boxDuration, 'minutes')
          }
        } else {
          let j = 0;
          if (this.appointments.length != 0) {
            dayStart = dayStart.add(1, 'days')
            dayEnd = dayEnd.add(1, 'days')
            boxStart = dayStart.clone().locale('en')

            jDate = dayStart.clone().locale('fa')
            isToday = jDate.format("YYYYMMDD") == today
            isFriday = jDate.isoWeekday() == 5
            isHoliday = false
            for (let h = 0; h < holidays.length; h++) {
              if (dayStart.format("YYYY-MM-DD") == holidays[h].hdate) {
                isHoliday = true
                break
              }
            }
          }
          while (boxStart.isSameOrBefore(dayEnd.format('YYYY/MM/DD HH:mm'))) {
            days[i].push({
              is_empty: true,
              is_friday: isFriday,
              is_holiday: isHoliday,
              is_today: isToday,
              start_at: boxStart.locale('en').format('YYYY/MM/DD HH:mm:ss'),
              start_at_time_fa: boxStart.locale('en').format('HH:mm'),
              index: j,
            })
            j++
            boxStart = boxStart.add(boxDuration, 'minutes')
          }
          if (this.appointments.length == 0) {
            dayStart = dayStart.add(1, 'days')
            dayEnd = dayEnd.add(1, 'days')
          }
        }
        if (days[i].length > maxLength) {
          maxLength = days[i].length
        }
        startDay = startDay.add(1, 'days')
        i++;
      }
      for (let i = 0; i < days.length; i++) {
        for (let j = days[i].length - 1; j < maxLength; j++) {
          if (days[i][j]) {
            let startAt = moment(days[i][j].start_at).locale('en').add(default_duration, 'minutes')
            days[i][j + 1] = {
              ...days[i][j],
              is_empty: true,
              start_at: startAt.format('YYYY/MM/DD HH:mm:ss'),
              start_at_time_fa: startAt.locale('en').format('HH:mm'),
              index: j,
            }
          }
        }
      }
      this.maxTimeLength = maxLength
      return days;
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
        }
      }, 500)
    }
  },
  computed: {
    loadList: {
      get() {
        return this.$store.getters['appointment/getLoadList']
      },
      set(val) {
        this.$store.dispatch('appointment/setLoadList', val)
      }
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
    workHour: {
      get() {
        return this.$store.getters['appointment/getWorkHour']
      },
      set(val) {
        return this.$store.dispatch('appointment/setWorkHour', val)
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
    showHour: {
      get() {
        return this.$store.getters['appointment/getShowHour'];
      },
      set(val) {
        return this.$store.dispatch('appointment/setShowHour', val);
      }
    },
    showCaseType: {
      get() {
        return this.$store.getters['appointment/getShowCaseType'];
      },
      set(val) {
        return this.$store.dispatch('appointment/setShowCaseType', val);
      }
    },
    initTime: {
      get() {
        return this.$store.getters['appointment/getInitTime']
      },
      set(val) {
        this.$store.dispatch('appointment/setInitTime', val)
      }
    },
    showPazireshModal: {
      get() {
        return this.$store.getters['appointment/getShowPazireshModal']
      },
      set(val) {
        this.$store.dispatch('appointment/setShowPazireshModal', val)
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
    showItemModal: {
      get() {
        return this.$store.getters['appointment/getShowItemModal']
      },
      set(val) {
        this.$store.dispatch('appointment/setShowItemModal', val)
      }
    },
    year: {
      get() {
        return this.$store.getters['appointment/getYear']
      },
      set(val) {
        return this.$store.dispatch('appointment/setYear', val)
      },
    },
    month: {
      get() {
        return this.$store.getters['appointment/getMonth']
      },
      set(val) {
        return this.$store.dispatch('appointment/setMonth', val)
      },
    },
    limitList() {
      let limitDays = []
      for (let i = 0; i < this.simpleDays.length; i++) {
        limitDays[i] = []
        for (let j = 0; j < this.limits.length; j++) {
          limitDays[i][j] = {
            ...this.limits[j],
            limitations: this.limits[j].limitation - this.simpleDays[i].filter(i => i.case_type == this.limits[j].name).length
          }
        }
      }
      return limitDays
    },
    appointments: {
      get() {
        return this.$store.getters['appointment/getAppointments']
      },
      set(val) {
        this.$store.dispatch('appointment/setAppointments', val)
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
    dayCounts() {
      let list = Array(this.simpleDays.length).fill(0);
      for (let i = 0; i < this.simpleDays.length; i++) {
        list[i] = this.simpleDays[i].filter(i => !i.is_empty).length
      }
      return list;
    }
  },
  watch: {
    loadList(val) {
      if (val) {
        this.setHeaderDays()
        this.getAppointmentList()
        this.setSlider()
      }
    },
    showHour(val) {
      if (val) {
        this.timeBaseDays = this.calcTimeBaseDays()
      } else {
        this.simpleDays = this.calcSimpleDays()
      }
    },
  }
}
</script>
<style scoped></style>
