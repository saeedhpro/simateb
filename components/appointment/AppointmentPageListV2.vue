<template>
  <v-row>
    <v-col
      cols="12"
      v-if="!isLaptop && ques.length > 0"
    >
      <div class="d-flex flex-row align-center justify-start ltr">
        <v-btn
          @click="goNext"
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
      <div style="overflow-x: scroll; -webkit-overflow-scrolling: touch" id="table-wrapper" ref="table-wrapper">
        <div class="appointment-table d-flex flex-column"
           id="appointment-table"
           :class="{'surgeries': isSurgery, 'is-time-based': isTimeBased}"
        >
          <table class="table table-bordered table-sm text-center m-0 fade " v-show="!loading && loaded"
                 v-cloak>
            <thead v-if="showCaseType">
              <tr v-for="(_, i) in limitList" :key="i" class="header-case-type-tr text-center">
                <th class="table-active"></th>
                <td class="text-sm text-nowrap py-0" v-for="(_, j) in limitList[i].length">
                  <div class="header-case-type-box">
                    <div class="header-case-type">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <div
                          v-bind="attrs"
                          v-on="on"
                        >
                          {{ limitList[i][j].name }}
                        </div>
                      </template>
                      <div>{{ limitList[i][j].name }}</div>
                    </v-tooltip>
                    <span class="ltr" v-if="limitList[i][j].is_limited"
                          :class="{ 'is-red': limitList[i][j].limitations < 0, 'is-zero': limitList[i][j].limitations == 0 }">
                      {{ limitList[i][j].limitations }}
                    </span>
                  </div>
                  </div>
                </td>
              </tr>
            </thead>
            <thead class="text-center sticky">
            <tr>
              <th class="table-active"></th>
              <th v-for="(i, n) in countList" :key="n">
                <div class="text-sm">
                  {{ i }}
                </div>
              </th>
            </tr>
            <tr class="">
              <th class="table-active"></th>
              <th class="header-date" v-for="(dayIndex, j) in shownMonthDates"
                  :class="{'is-friday':dayIndex && dayIndex.isFriday&&!dayIndex.today,'table-success is-today':dayIndex &&dayIndex.today}"
                  :id="`column_${j}`" @click="newAppointment(dayIndex)">
                <button class="btn btn-success btn-block btn-sm p-1 text-sm font-weight-normal"
                        :class="{'btn-light':dayIndex &&!dayIndex.today,'holiday':dayIndex &&dayIndex.holiday}"
                        v-if="dayIndex && !dayIndex.isFriday" >
                  {{dayIndex | toPersianDate('dddd')}} <br>
                  <span class="text-nowrap">{{dayIndex| toPersianDate('jD jMMMM')}}</span>
                </button>
                <button v-if="dayIndex && dayIndex.isFriday" class="text-sm font-weight-normal text-sm font-weight-normal">
                  <span>{{dayIndex | toPersianDate('dddd')}}</span>
                  <span class="text-nowrap">{{dayIndex | toPersianDate('jD jMMMM')}}</span>
                </button>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(queIndex, j) in queIndexMax" :key="j">
              <th class="align-middle text-center">
                {{j + 1}}
              </th>
              <td v-for="(dayIndex, i) in showLength" :key="i"
                  :class="{'is-friday':shownMonthDates[dayIndex - 1] &&shownMonthDates[dayIndex - 1].isFriday,
                  'table-success is-today':shownMonthDates[dayIndex - 1] && shownMonthDates[dayIndex - 1].today,
                   'is-holiday':shownMonthDates[dayIndex - 1] &&  shownMonthDates[dayIndex - 1].holiday}"
                  class="text-sm ">
                <button class="text-nowrap text-center btn btn-block btn-sm  p-1"
                        v-if="shownQues[i][j] && !shownQues[i][j].empty"
                        @click="summary(shownQues[i][j])">
                  <div class="m-0 ">
                    <span class="badge badge-secondary"
                      :style="{'background-color': statuses[shownQues[i][j].status].color}">{{statuses[shownQues[i][j].status].title}}</span>
                  </div>
                  <span class="user-full-name">{{shownQues[i][j].user_full_name}}</span><br>
                  <span class="badge badge-secondary" v-if="shownQues[i][j].case_type">{{shownQues[i][j].case_type}}</span><br>
                  <h6 class="m-0"><span class="user-full-name font-weight-bold badge badge-light"> {{shownQues[i][j].start_at | toPersianDate('HH:mm') }} </span>
                  </h6>
                  <h6 class="m-0 " v-if="shownQues[i][j].is_vip"><span class="badge badge-info">VIP</span>
                  </h6>
                </button>
                <button class="text-nowrap text-center text-secondary btn btn-block btn-sm p-1 "
                        :class="{'btn-clock-empty':!shownMonthDates[dayIndex - 1].isFriday && (!shownQues[i][j] || (shownQues[i][j].empty))}"
                        v-if="!shownQues[i][j] || (shownQues[i][j] && shownQues[i][j].empty && shownMonthDates[dayIndex - 1] &&!shownMonthDates[dayIndex - 1].isFriday)"
                        @click="shownQues[i][j] ? newFromEmptyTime(shownQues[i][j].start_at) : () => {}">
                  <span v-if="shownQues[i][j]">
                    {{shownQues[i][j].start_at | toPersianDate('HH:mm')}} </span>
                </button>
                <span v-if="shownMonthDates[dayIndex - 1] && shownMonthDates[dayIndex - 1].isFriday">{{queIndex}}</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import moment from "jalali-moment";

export default {
  name: "AppointmentPageListV2",
  props: {
    isSurgery: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: true,
      loaded: true,
      period: 42,
      default_duration: 16,
      max_length: 16,
      ques: [],
      monthDates: Array(this.period),
      queIndexMax: 0,
      startIndex: 0,
      endIndex: 0,
      todayDate: moment(),
      statuses: {
        1: {title: "رزرو شده", color: "#F5AC00"},
        2: {title: "پذیرش شده", color: "#5063FF"},
        3: {title: "کنسل", color: "#F44336"}
      }
    }
  },
  mounted() {
    this.endIndex = this.showLength
  },
  methods: {
    async getAppointments() {
      this.loading = true
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
        .then(async res => {
          this.appointments = res.data.appointments
          this.limits = res.data.limits
          this.default_duration = this.workHour.period
          this.max_length = res.data.max_length
          await this.renderQues()
        })
    },
    async renderQues() {
      this.loaded = false
      this.ques = [];
      if (this.isTimeBased) {
          let maxWorkTime = new Date('2019-01-10 ' + this.workHour.end);
          let minWorkTime = new Date('2019-01-10 ' + this.workHour.start);
          let duration = moment.duration(moment(maxWorkTime).diff(minWorkTime));
          let minutes = duration.asMinutes();
          this.queIndexMax = Math.floor(minutes / this.default_duration);
          let normalTimeSpan = this.queIndexMax;
          let queCounter = 0;
          for (let i = 0; i < this.period; i++) {
              this.ques[i] = [];
              let baseDate = moment(this.monthDates[i]).seconds(0).hours(moment(minWorkTime).hours()).minutes(moment(minWorkTime).minutes());
              let endDate = moment(this.monthDates[i]).seconds(59).hours(moment(maxWorkTime).hours()).minutes(moment(maxWorkTime).minutes());
              for (let k = 0; k < normalTimeSpan || (this.appointments[queCounter] && this.sameDay(new Date(this.appointments[queCounter].start_at), baseDate.toDate())); k++) {
                if (k < normalTimeSpan && (!this.appointments[queCounter] || !this.sameDay(new Date(this.appointments[queCounter].start_at), baseDate.toDate()))) {
                  if (this.ques[i].length > 0) {
                    let base = moment(this.ques[i][this.ques[i].length - 1].start_at).add(this.default_duration, 'minutes')
                    while (true) {
                      this.ques[i].push({
                        start_at: moment(base),
                        empty: true
                      });
                      base.add(this.default_duration, 'minutes');
                      k++
                      if (base.isAfter(endDate)) {
                        break;
                      }
                    }
                  }
                  continue
                }
                if (this.appointments[queCounter] &&
                    ((!baseDate.isBefore(this.appointments[queCounter].start_at))
                      || (k > normalTimeSpan)
                    )) {
                      this.ques[i].push(this.appointments[queCounter]);
                      baseDate = baseDate.add(this.appointments[queCounter].duration, 'minutes');
                      queCounter++;
                      this.monthDates[i].isWorkDay = true;
                  } else {
                    this.ques[i].push({
                      start_at: moment(baseDate),
                      empty: true
                    });
                    baseDate.add(this.default_duration, 'minutes');
                  }
              }
              if (this.ques[i].length === 0) {
                this.ques[i] = []
                for (let k = 0; k < normalTimeSpan || baseDate.isSameOrBefore(endDate); k++) {
                  this.ques[i].push({
                    start_at: moment(baseDate),
                    empty: true
                  });
                  baseDate.add(this.default_duration, 'minutes');
                }
              }
            this.queIndexMax = Math.max(this.ques[i].length, this.queIndexMax);
          }
      } else {
        this.queIndexMax = 4;
        let loopedQues = 0;
        for (let i = 0; i < this.period; i++) {
          this.ques[i] = [];
          for (let j = loopedQues; j < this.appointments.length; j++) {
              let que = this.appointments[j];
              if (this.sameDay(new Date(que.start_at), this.monthDates[i])) {
                this.ques[i].push(que);
                loopedQues++;
              } else {
                if (j > loopedQues) {
                  break;
                }
              }
          }
          this.queIndexMax = Math.max(this.ques[i].length, this.queIndexMax);
        }
      }
      this.loading = false;
      this.loaded = true;
    },
    sameDay(d1, d2) {
      if (!d2) return false;
      return d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear();
    },
    openItem(id) {
      this.appointmentID = id
      this.showItemModal = true
    },
    calcMonthDates() {
      for (let i = 0; i < this.period; i++) {
        let m = this.startDate.clone().add(i, 'days');
        // rounding minute
        m.seconds(0).minutes((Math.floor(m.minutes() / 15) * 15) % 60);
        let date = m.locale('en');
        date = date.toDate()
        if (date.getDay() === 5) date.isFriday = true;
        if (date.getDay() === 5) {
          alert(`${date.isFriday}, friday, ${m.toLocaleString()}`)
        }
        if (m.isSame(this.todayDate, 'day')) {
          date.today = true;
        }
        this.monthDates[i] = date;
      }
    },
    newAppointment(date) {
      let minWorkTime = new Date('2019-01-10 ' + this.workHour.start);
      this.openPazireshModal(moment(date).hours(moment(minWorkTime).hours()).minutes(moment(minWorkTime).minutes()))
    },
    summary(appointment) {
      this.openItem(appointment.id)
    },
    newFromEmptyTime(date) {
      this.openPazireshModal(date)
    },
    openPazireshModal(startAt) {
      this.initTime = startAt.locale('en').format('YYYY/MM/DD HH:mm')
      this.togglePazireshModal()
    },
    togglePazireshModal() {
      this.showPazireshModal = !this.showPazireshModal
    },
    goNext() {
      let index = this.startIndex + this.showLength
      if (index > this.ques.length - this.showLength) {
        index = this.ques.length - this.showLength
      }
      this.startIndex = index
      this.endIndex = this.startIndex + this.showLength
    },
    goPrev() {
      let index = this.startIndex - this.showLength
      if (index < 0) {
        index = 0
      }
      this.startIndex = index
      this.endIndex = this.startIndex + this.showLength
    },
    async setSlider() {
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
    isTimeBased: {
      get() {
        return this.$store.getters['appointment/getShowHour'];
      },
      set(val) {
        return this.$store.dispatch('appointment/setShowHour', val);
      }
    },
    isLaptop() {
      return this.$vuetify.breakpoint.lgAndUp
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
      let i = 0;
      this.limits.forEach(limit => {
        limitDays[i] = [i]
        for (let j = 0; j < this.shownQues.length; j++) {
          let count = limit.limitation - this.shownQues[i].filter(i => i.case_type == limit.name).length
          limitDays[i][j] = {
            ...this.limits[i],
            limitations: count
          }
        }
        i++
      })
      return limitDays
    },
    countList() {
      let list = []
      for (let j = 0; j < this.shownQues.length; j++) {
        list[j] = this.shownQues[j].filter(i => i && !i.empty).length
      }
      return list
    },
    shownQues() {
      return this.ques.slice(this.startIndex, this.endIndex)
    },
    shownMonthDates() {
      let dates = Array(this.showLength)
      if (!this.startDate) {
        return dates
      }
      let s = this.startDate.clone().add(this.startIndex, 'days')
      for (let i = 0; i < this.showLength; i++) {
        let m = s.clone().add(i, 'days');
        m.seconds(0).minutes((Math.floor(m.minutes() / 15) * 15) % 60);
        let date = m.toDate();
        if (date.getDay() === 5) date.isFriday = true;
        if (m.isSame(this.todayDate, 'day')) {
          date.today = true;
        }
        dates[i] = date;
      }
      return dates
    },
    showLength() {
      if (this.isLaptop) {
        return this.period
      }
      return 7
    }
  },
  watch: {
    async loadList(val) {
      if (val) {
        await this.calcMonthDates()
        await this.getAppointments()
        await this.setSlider()
      }
    },
    isTimeBased() {
      this.renderQues()
    }
  }
}
</script>
<style scoped>
.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}
#appointment-table .table-bordered td, #appointment-table .table-bordered th {
  border: 1px solid #c9c9ca !important;
}
#appointment-table .table-bordered td {
  &.is-friday {
    background: #FFF7EB 0 0 no-repeat padding-box !important;
  }
}
.text-sm {
  font-size: small;
}
.font-weight-normal {
  font-weight: 400!important;
}
.text-nowrap {
  white-space: nowrap!important;
}
.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
#appointment-table tbody tr td {
  vertical-align: middle;
  position: relative;
  height: 1px;
}
.btn-block {
  display: block;
  width: 100%;
}
.is-today {
  .btn-block {
    //background-color: #7cdf81;
    background-color: #EBFFEB;
  }
}
.table-responsive>.table-bordered {
  border: 0;
}
.text-center {
  text-align: center!important;
}
.m-0 {
  margin: 0!important;
}
.fade {
  transition: opacity .15s linear;
}
.btn .badge {
  position: relative;
  top: -1px;
}

.badge-secondary {
  color: #fff;
  background-color: #6d6d6d;
}
.badge {
  font-size: .565rem;
  font-weight: 700;
  display: inline-block;
  padding: 0.25em 0.4em;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.5rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
td > button {
  padding: 5px;
}
th {
  padding: 5px;
  //min-width: 86px;
}
table {
  border-collapse: collapse;
}
#appointment-table .btn-clock-empty {
  height: 100%;
  &.is-time-based {
    background: linear-gradient(180deg,#e5fff9,#c4dfe0) repeat-x #b4d8de;
    border-color: #cdeef9;
  }
  border-radius: 0;
}
button:focus {
  outline: none;
}
.appointment-table td {
  padding-left: 0 !important;
}
.user-full-name {
  font-size: .875rem;
  font-weight: bold;
  display: inline-flex;
  margin: 3px 0;
}
</style>
