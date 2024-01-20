<template>
  <v-row>
    <v-col
      cols="12"
      v-if="!isLaptop && simpleDays.length > 0"
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
           :class="{'surgeries': isSurgery}"
        >
          <table class="table table-bordered table-sm text-center m-0 fade " v-show="!loading && loaded"
                 v-cloak>
            <thead v-if="displayLimits">
            <tr class="" v-for="(limit, i) in limits" :key="i">
              <th class="table-active"></th>
              <td class="text-sm text-nowrap py-0" v-for="dayIndex in monthDates">
                <span class="text-nowrap">{{limit.name}}</span>
                <span class="badge badge-secondary"
                      :class="{'badge-danger':(limit.limitation-dayIndex['limit'+limit.id].total)<1}">{{limit.limitation-dayIndex['limit'+limit.id].total}}</span>
              </td>
            </tr>
            </thead>
            <thead class="text-center sticky">
            <tr class="">
              <th class="table-active"></th>
              <td class="" v-for="dayIndex in showLength">
                <span class=" text-sm" v-if="dayIndex && !dayIndex.isFriday">{{dayIndex.total}}</span>
              </td>
            </tr>
            <tr class="">
              <th class="table-active"></th>
              <th class="" v-for="(dayIndex, j) in showLength"
                  :class="{'table-warning':dayIndex && dayIndex.isFriday&&!dayIndex.today,'table-success is-today':dayIndex &&dayIndex.today}"
                  :id="`column_${j}`" @click="newAppointment(monthDates[j])">
                <button class="btn btn-success btn-block btn-sm p-1 text-sm font-weight-normal"
                        :class="{'btn-light':dayIndex &&!dayIndex.today,'holiday':dayIndex &&dayIndex.holiday}"
                        v-if="dayIndex && !dayIndex.isFriday" >
                  {{monthDates[j] | toPersianDate('dddd')}} <br>
                  <span class="text-nowrap">{{monthDates[j]| toPersianDate('jD jMMMM')}}</span>
                </button>
                <span v-if="dayIndex && dayIndex.isFriday" class="text-sm font-weight-normal">
                            <span>{{dayIndex | toPersianDate('dddd')}}</span>
                            <span class="text-nowrap">{{dayIndex | toPersianDate('jD jMMMM')}}</span>
                    </span>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(queIndex) in queIndexMax" :key="queIndex">
              <th class="align-middle text-center">
                {{queIndex}}
              </th>
              <td v-for="(dayIndex, i) in showLength" :key="i"
                  :class="{'table-warning':dayIndex &&dayIndex.isFriday&&!dayIndex.today,'table-success':dayIndex && dayIndex.today, 'holiday':dayIndex &&  dayIndex.holiday}"
                  class="text-sm ">
                <button class="text-nowrap text-center btn btn-block btn-sm  p-1"
                        v-if="shownQues[i][queIndex] && !shownQues[i][queIndex].empty"
                        @click="summary(shownQues[i][queIndex])">
                  <h6 class="m-0 "><span class="badge badge-secondary"
                                         :style="{'background-color': statuses[shownQues[i][queIndex].status].color}">{{statuses[shownQues[i][queIndex].status].title}}</span>
                  </h6>
                  <span>{{shownQues[i][queIndex].user_full_name}}</span><br>
                  <span class="badge badge-secondary" v-if="shownQues[i][queIndex].case_type">{{shownQues[i][queIndex].case_type}}</span><br>
                  <h6 class="m-0"><span class="font-weight-bold badge badge-light"> {{shownQues[i][queIndex].start_at | toPersianDate('HH:mm') }} </span>
                  </h6>
                  <h6 class="m-0 " v-if="shownQues[i][queIndex].is_vip"><span class="badge badge-info">VIP</span>
                  </h6>

                </button>
                <button class="text-nowrap text-center text-secondary btn btn-block btn-sm p-1 "
                        :class="{'btn-clock-empty':!dayIndex.isFriday && (!shownQues[i][queIndex] || (shownQues[i][queIndex].empty))}"
                        v-if="!shownQues[i][queIndex] || (shownQues[i][queIndex] && shownQues[i][queIndex].empty && dayIndex &&!dayIndex.isFriday)"
                        @click="newFromEmptyTime(shownQues[i][queIndex].start_at)">
                  <span v-if="shownQues[i][queIndex]">
                    <span>{{ dayIndex.isFriday }}</span>
                    {{shownQues[i][queIndex].start_at | toPersianDate('HH:mm')}} </span>
                </button>
                <span v-if="dayIndex &&dayIndex.isFriday">{{queIndex}}</span>
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
      displayLimits: false,
      queIndexMax: 0,
      startIndex: 0,
      endIndex: 0,
      todayDate: moment(),
      statuses: {
        1: {title: "رزرو شده", color: "#ff981e"},
        2: {title: "پذیرش شده", color: "#008daf"},
        3: {title: "کنسل", color: "#ff2c1b"}
      }
    }
  },
  mounted() {
    this.endIndex = this.showLength
  },
  methods: {
    async getAppointments() {
      const started = Date.now();
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
        .then(res => {
          this.appointments = res.data.appointments
          this.limits = res.data.limits
          this.default_duration = res.data.default_duration
          this.max_length = res.data.max_length
          this.renderQues()
          const millis = Date.now() - started;
          alert(`seconds elapsed = ${Math.floor(millis)}`);
          // this.calcSimpleDays()
        })
    },
    renderQues() {
      this.ques = [];
      if (this.isTimeBased) {
        let fixedDate = new Date();
        let maxWorkTime = new Date('2019-01-10 ' + this.workHour.end);
        let minWorkTime = new Date('2019-01-10 ' + this.workHour.start);

        let duration = moment.duration(moment(maxWorkTime).diff(minWorkTime));
        let minutes = duration.asMinutes();
        this.queIndexMax = Math.floor(minutes / this.default_duration);
        let normalTimeSpan = this.queIndexMax;

        let queCounter = 0;
        for (let i = 0; i < 41; i++) {
          this.ques[i] = [];
          let baseDate = moment(this.monthDates[i]).seconds(0).hours(moment(minWorkTime).hours()).minutes(moment(minWorkTime).minutes());
          for (let k = 0; k <= normalTimeSpan || (this.appointments[queCounter] && this.sameDay(new Date(this.appointments[queCounter].start_at), baseDate.toDate())); k++) {
            if (this.appointments[queCounter] &&
              (!baseDate.isBefore(this.appointments[queCounter].start_at)
                || (k > normalTimeSpan)
              )) {//day matches to this gap
              this.ques[i].push(this.appointments[queCounter]);
              baseDate.add(this.appointments[queCounter].duration, 'minutes');
              queCounter++;
              this.monthDates[i].isWorkDay = true;
              if (k > normalTimeSpan) {
                // $scope.queIndexMax++;
              }
            } else {
              this.ques[i].push({
                start_at: moment(baseDate),
                empty: true
              });
              baseDate.add(this.default_duration, 'minutes');
            }
          }
        }
        this.queIndexMax = Math.max.apply(Math, this.ques.map(function (a) {
          return a.length;
        }));
      } else {
        this.queIndexMax = 4;
        let loopedQues = 0;
        for (let i = 0; i < 42; i++) {
          this.ques[i] = [];
          for (let j = loopedQues; j < this.appointments.length; j++) {
            let que = this.appointments[j];
            if (this.sameDay(new Date(que.start_at), this.monthDates[i])) {
              this.ques[i].push(que);
              loopedQues++;
            } else {
              if (j > loopedQues) { // to account for empty days with no reservation
                break;
              }
            }
          }
          this.queIndexMax = Math.max(this.ques[i].length - 1, this.queIndexMax);
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
        let date = m.toDate();
        if (date.getDay() === 5) date.isFriday = true;
        if (m.isSame(this.todayDate, 'day')) {
          date.today = true;
        }
        this.monthDates[i] = date;
      }
    },
    newAppointment(dayIndex) {
      this.initTime = dayIndex
      this.showPazireshModal = true
    },
    summary(appointment) {
      this.openItem(appointment.id)
    },
    newFromEmptyTime(date) {
      this.openPazireshModal(moment(date).seconds(0).format('YYYY-MM-DD HH:mm'))
    },
    goNext() {
      let index = this.startIndex + this.showLength
      if (index > this.ques.length - this.showLength) {
        index = this.ques.length - this.showLength
      }
      this.startIndex = index
    },
    goPrev() {
      let index = this.startIndex - this.showLength
      if (index < 0) {
        index = 0
      }
      this.startIndex = index
    },
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
    isTimeBased: {
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
      return this.simpleDays.slice(this.startIndex, this.startIndex + this.tableWidth)
    },
    showHeaderDays() {
      if (this.isLaptop) {
        return this.headerDays
      }
      return this.headerDays.slice(this.startIndex, this.startIndex + this.tableWidth)
    },
    shownDayCounts() {
      if (this.isLaptop) {
        return this.dayCounts
      }
      return this.dayCounts.slice(this.startIndex, this.startIndex + this.tableWidth)
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
    shownQues() {
      return this.ques.slice(this.startIndex, this.endIndex)
    },
    showLength() {
      if (this.isLaptop) {
        return this.ques.length
      }
      return 7
    }
  },
  watch: {
    async loadList(val) {
      if (val) {
        await this.calcMonthDates()
        await this.getAppointments()
      }
    },
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
  background-color: #56565a;
}
.badge {
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
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
  min-width: 86px;
}
table {
  border-collapse: collapse;
}
#appointment-table .btn-clock-empty {
  height: 100%;
  background: linear-gradient(180deg,#e5fff9,#c4dfe0) repeat-x #b4d8de;
  border-color: #cdeef9;
  border-radius: 0;
}
button:focus {
  outline: none;
}
.appointment-table td {
  padding-left: 0 !important;
}
</style>
