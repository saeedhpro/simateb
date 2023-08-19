<template>
  <v-row>
    <v-col
      cols="12"
    >
      <div
        v-if="loading"
      >
        <v-progress-circular />
      </div>
      <div
        v-else
        style="overflow-x: scroll" id="table-wrapper" ref="table-wrapper">
        <table
          class="appointment-table"
        >
          <thead>
            <tr>
              <th
                v-for="(d, n) in headerDays"
                :key="n"
                class="header-case-type-th text-center"
              >
                <div
                  class="header-date"
                  :class="{'is-today': d.is_today, 'is-friday': d.is_friday, 'is-holiday': d.is_holiday}"
                  @click="openPazireshModal(d.start_at)"
                >
                  {{ d.title }}
                  <br />
                  {{ d.sub_title }}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
          <tr
            v-for="(_, i) in maxLength"
            :key="i"
          >
            <td
              v-for="(_, j) in days.length"
              :key="j"
            >
              <appointment-page-table-item
                v-if="!days[j][i].is_empty"
                :case-type="days[j][i].case_type"
                :index="days[j][i].index"
                :is-friday="days[j][i].is_friday"
                :is-holiday="days[j][i].is_holiday"
                :is-today="days[j][i].is_today"
                :user-full-name="days[j][i].user_full_name"
                :start-at-time-fa="days[j][i].start_at_time_fa"
                @click.native="openItem(days[j][i].id)"
              />
              <appointment-page-table-empty-item
                v-else
                :index="days[j][i].index"
                :is-friday="days[j][i].is_friday"
                :is-holiday="days[j][i].is_holiday"
                :is-today="days[j][i].is_today"
                :show-hour="showHour"
                @click.native="showHour ? openPazireshModal(days[j][i].start_at) : () => {}"
              />
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
export default {
  name: "AppointmentPageList",
  components: {TableAppointmentV2, TableAppointmentNoneV2},
  data() {
    return {
      loading: false,
      headerDays: [],
      days: [],
      maxLength: 0,
    }
  },
  mounted() {
    const slider = this.$refs["table-wrapper"];
    let isDown = false;
    let startX;
    let scrollLeft;

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
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  },
  methods: {
    async getAppointmentList() {
      const start = this.startDate.format("YYYY/MM/DD")
      const end = this.endDate.format("YYYY/MM/DD")
      const res = await this.$axios.get(`/appointments/que/v4?start=${start}&end=${end}`)
      if (res.status == 200) {
        const appointments = res.data.data
        this.setDays(appointments)
      }
    },
    setDays(appointments) {
      this.loading = true
      let holidays = this.holidays
      let startDay = this.startDate.clone()
      let lastDay = this.endDate.clone().add(1, 'day').endOf("day")
      let i = 0;
      let period = this.workHour.period
      let dayStart = startDay.clone()
      dayStart = dayStart.set({
        hour: this.workHour.start.substring(0,2),
        minute: this.workHour.start.substring(3,5),
        second: this.workHour.start.substring(6,9),
      })
      let dayEnd = startDay.clone()
      dayEnd = dayEnd.set({
        hour: this.workHour.end.substring(0,2),
        minute: this.workHour.end.substring(3,5),
        second: this.workHour.end.substring(6,9),
      })
      let minutes = moment.duration(dayEnd.diff(dayStart)).asMinutes()
      let dayLength = this.showHour ? minutes / period : 13
      const days = []
      let list = appointments
      let today = moment().format("YYYYMMDD")
      let maxLength = dayLength
      while(startDay.isBefore(lastDay.format("YYYY/MM/DD"))) {
        days[i] = []
        let dayStart = startDay.clone()
        dayStart = dayStart.set({
          hour: this.workHour.start.substring(0,2),
          minute: this.workHour.start.substring(3,5),
          second: this.workHour.start.substring(6,9),
        })
        let dayEnd = startDay.clone()
        dayEnd = dayEnd.set({
          hour: this.workHour.end.substring(0,2),
          minute: this.workHour.end.substring(3,5),
          second: this.workHour.end.substring(6,9),
        })
        if (this.showHour) {

        } else {
          for (let j = 0; j < dayLength; j++) {
            if (list.length > 0) {
              do {
                let app = list[0]
                let startAt = moment(app.start_at,'YYYY/MM/DD HH:mm:ss')
                if (startAt.format("YYYYMMDD") === dayStart.format("YYYYMMDD")) {
                  let isHoliday = false
                  for (let h = 0; h < holidays.length; h++) {
                    if (startAt.format("YYYY-MM-DD") == holidays[h].hdate) {
                      isHoliday = true
                      break
                    }
                  }
                  days[i].push({
                    ...app,
                    is_empty: false,
                    is_friday: startAt.isoWeekday() == 5,
                    is_holiday: isHoliday,
                    is_today: startAt.format("YYYYMMDD") == today,
                    start_at: startAt.format('YYYY/MM/DD HH:mm:ss'),
                    index: j,
                  })
                  list.shift()
                } else {
                  break;
                }
              } while(list.length)
              let s = dayStart.clone().add(j * period, 'minute')
              let isHoliday = false
              for (let h = 0; h < holidays.length; h++) {
                if (s.format("YYYY-MM-DD") == holidays[h].hdate) {
                  isHoliday = true
                  break
                }
              }
              days[i].push({
                is_empty: true,
                is_friday: s.isoWeekday() == 5,
                is_holiday: isHoliday,
                is_today: s.format("YYYYMMDD") == today,
                start_at: s.format('YYYY/MM/DD HH:mm:ss'),
                index: j,
              })
            } else {
              let s = dayStart.clone().add(j * period, 'minute')
              let isHoliday = false
              for (let h = 0; h < holidays.length; h++) {
                if (s.format("YYYY-MM-DD") == holidays[h].hdate) {
                  isHoliday = true
                  break
                }
              }
              days[i].push({
                is_empty: true,
                is_friday: s.isoWeekday() == 5,
                is_holiday: isHoliday,
                is_today: s.format("YYYYMMDD") == today,
                start_at: s.format('YYYY/MM/DD HH:mm:ss'),
                index: j,
              })
            }
          }
        }
        startDay = startDay.add(1, 'day')
        if (days[i].length > maxLength) {
          maxLength = days[i].length
        }
        i++;
      }
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
          days[i].push({
            is_empty: true,
            is_friday: dayStart.isoWeekday() == 5,
            is_holiday: isHoliday,
            is_today: dayStart.format("YYYYMMDD") == today,
            start_at: dayStart.format('YYYY/MM/DD HH:mm:ss'),
            index: j,
          })
        }
      }
      this.days = days
      this.loading = false
    },
    setHeaderDays() {
      let holidays = this.holidays
      const days = []
      let day = this.startDate.clone().startOf("jMonth")
      while (day.isBefore(this.endDate.clone().format('YYYY/MM/DD HH:mm:ss'))) {
        let isHoliday = false
        for (let i = 0; i < holidays.length; i++) {
          if (day.format("YYYY-MM-DD") == holidays[i].hdate) {
            isHoliday = true
            break
          }
        }
        let jDate = day.clone()
        days.push({
          is_friday: jDate.locale('fa').isoWeekday() == 5,
          is_holiday: isHoliday,
          is_today: jDate.locale('fa').format("YYYYMMDD") == moment().locale('fa').format("YYYYMMDD"),
          title: jDate.locale('fa').format("dddd"),
          sub_title: jDate.locale('fa').format("jDD jMMMM"),
          start_at: `${jDate.locale('fa').format('YYYY/MM/DD')} ${this.workHour.start}`
        })
        day = day.add(1, 'jDay')
      }
      this.headerDays = days
    },
    openPazireshModal(startAt) {
      this.initTime = startAt
      this.showPazireshModal = true
    },
    openItem(id) {
      this.appointmentID = id
      this.showItemModal = true
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
      }
    },
    workHour: {
      get() {
        return this.$store.getters['appointment/getWorkHour']
      }
    },
    holidays: {
      get() {
        return this.$store.getters['appointment/getHolidays']
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
    },
    month: {
      get() {
        return this.$store.getters['appointment/getMonth']
      },
    },
  },
  watch: {
    loadList(val) {
        this.setHeaderDays()
        this.getAppointmentList()
    },
  }
}
</script>
<style scoped>

</style>
