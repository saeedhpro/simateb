<template>
  <div class="create-update-model-input-box" :class="{'has-error': error}">
    <label v-if="label">{{ label }}</label>
    <div class="custom-date-input-box">
      <div class="date-input-box">
        <input v-model="dateFormatted" @input="onDateChange" maxlength="16" type="text" pattern="YYYY/MM/DD HH:mm"/>
        <img @click="openCalendar" alt="" src="/images/form/datepicker.svg">
      </div>
    </div>
    <div class="appointment-form-component">
      <v-dialog
        transition="dialog-bottom-transition"
        width="auto"
        v-model="open"
        min-width="300px"
        max-width="450px"
      >
        <template v-slot:default="{ isActive }">
          <v-card
            class="create-update-modal paziresh-form"
            min-width="300px"
          >
            <v-card-title
              v-if="showDateBox"
              class="create-update-modal-title-box"
            >
              <div class="create-update-modal-title">
                <v-btn
                  dense
                  icon
                  @click="prevYear"
                >
                  <v-icon size="medium">mdi-arrow-right</v-icon>
                </v-btn>
                <span class="selected-year" @click="toggleYearBox">{{ jYear }}</span>
                <v-btn
                  dense
                  icon
                  @click="nextYear"
                >
                  <v-icon size="medium">mdi-arrow-left</v-icon>
                </v-btn>
              </div>
            </v-card-title>
            <v-card-text v-if="showYearBox">
              <div v-if="showDateBox" class="custom-date-picker-days-list">
                <div
                  v-for="(l, n) in listedYears"
                  :key="n"
                  class="custom-date-picker-days"
                >
                  <div
                    v-for="(y, n) in l"
                    :key="n"
                    class="custom-date-picker-day"
                    :class="{'selected': y == jYear}"
                    @click="selectYear(y)"
                  >
                    {{ y }}
                  </div>
                </div>
              </div>
            </v-card-text>
            <v-card-text
              v-else
            >
              <div v-if="showDateBox"  class="custom-date-picker-content-header d-flex flex-row align-center justify-space-between">
                <v-btn
                  dense
                  icon
                  @click="prevMonth"
                  class="custom-date-picker-content-arrow"
                >
                  <v-icon size="medium">mdi-arrow-right</v-icon>
                </v-btn>
                <span class="custom-date-picker-content-title" v-if="faDate">
                  <span>{{ faDateString }} {{jYear}}</span>
                </span>
                <v-btn
                  dense
                  icon
                  @click="nextMonth"
                >
                  <v-icon size="medium">mdi-arrow-left</v-icon>
                </v-btn>
              </div>
              <v-divider v-if="showDateBox" />
              <div v-if="showDateBox" class="custom-date-picker-days-list">
                <div
                  v-for="(l, n) in 1"
                  :key="n"
                  class="custom-date-picker-days"
                >
                  <div
                    v-for="(d, n) in jSmallDayNames"
                    :key="n"
                    class="custom-date-picker-day"
                  >
                    {{ d }}
                  </div>
                </div>
              </div>
              <div v-if="showDateBox" class="custom-date-picker-days-list">
                <div
                  v-for="(l, n) in monthDays"
                  :key="n"
                  class="custom-date-picker-days"
                >
                  <div
                    v-for="(d, n) in l"
                    :key="n"
                    class="custom-date-picker-day"
                    :class="{
                      'selected': isSelected(d),
                      'disabled': dayIsDisabled(d),
                      'today': isToday(d),
                      'is-friday': isFriday(d),
                      'none': d == '',
                    }"
                    @click="selectDay(d)"
                  >
                    {{ d }}
                  </div>
                </div>
              </div>

              <v-divider class="mt-4" v-if="showDateBox && showTimeBox" />
              <div class="custom-time-input" v-if="showTimeBox">
                <div class="time-box">
                  <v-btn
                    small
                    icon
                    @click="upHour"
                  >
                    <v-icon size="medium">mdi-arrow-up</v-icon>
                  </v-btn>
                  <input @input="onHourChange" class="time-input" v-model.number="hour" pattern="[0-9][0-9]">
                  <v-btn
                    small
                    icon
                    @click="downHour"
                  >
                    <v-icon size="medium">mdi-arrow-down</v-icon>
                  </v-btn>
                </div>
                <div class="time-box">
                  <v-btn
                    small
                    icon
                    @click="upMinute"
                  >
                    <v-icon size="medium">mdi-arrow-up</v-icon>
                  </v-btn>
                  <input @input="onMinuteChange" class="time-input" v-model.number="minute" pattern="[0-9][0-9]">
                  <v-btn
                    small
                    icon
                    @click="downMinute"
                  >
                    <v-icon size="medium">mdi-arrow-down</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <button
                    class="second-button  full-width"
                    @click="closeCalendar"
                  >
                    بستن
                  </button>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <button
                    class="main-button"
                    @click="acceptChosenDate"
                  >
                    تایید
                  </button>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
    <span class="create-update-modal-input-error" v-if="error">{{ error }}</span>
  </div>
</template>

<script>
import moment from "jalali-moment";

export default {
  name: "CustomDateInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    format: {
      type: String,
      default: "",
    },
    displayFormat: {
      type: String,
      default: "",
    },
    disablePast: {
      type: Boolean,
      default: false,
    },
    initialValue: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: "",
    },
    jumpMinute: {
      type: Number,
      default: 1,
      max: 59,
      min: 1
    },
    type: {
      type: String,
      default: 'datetime'
    },
    error: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      open: false,
      date: "",
      dateFormatted: "",
      selectedDay: "",
      hour: "00",
      minute: "00",
      year: 1800,
      month: 1,
      day: 1,
      jYear: 1300,
      jMonth: 1,
      jDay: 1,
      jDayNames: [
        "شنبه",
        "یکشنبه",
        "دوشنبه",
        "سه شنبه",
        "چهار شنبه",
        "پنچ شنبه",
        "جمعه",
      ],
      jSmallDayNames: [
        "ش",
        "ی",
        "د",
        "س",
        "چ",
        "پ",
        "ج",
      ],
      showYearBox: false
    }
  },
  mounted() {
    moment.locale('en')
    this.setInitDateValue()
  },
  methods: {
    toggleYearBox() {
      this.showYearBox = !this.showYearBox
    },
    openYearBox() {
      this.showYearBox = true
    },
    closeYearBox() {
      this.showYearBox = false
    },
    setInitDateValue() {
      let date = this.initialValue
      if (this.type == 'time') {
        date = `${moment().format("YYYY/MM/DD")} ${date}`
      }
      if (date && this.isValidDate(date)) {
        this.date = date
        this.selectedDay = this.$moment(date).format(this.getEnFormat)
        const format = this.getFormat
        this.dateFormatted = this.$moment(this.date).format(format)
      } else {
        this.selectedDay = ""
        this.date = this.$moment().format(this.getEnFormat)
      }
    },
    isValidDate(date) {
      return this.$moment(date).isValid()
    },
    onDateChange(e) {
      if (this.dateFormatted.length !== 16) {
        return
      }
      const format = this.getFormat
      const enFormat = this.getEnFormat
      const date =  moment.from(this.dateFormatted, "fa", format).format(enFormat)
      const isValid = this.isValidDate(date)
      if (isValid) {
        this.date = this.$moment(date)
        const selectedDay = moment(`${this.dateFormatted}`, format).locale("en").format(enFormat)
        this.$emit('select', selectedDay)
        this.$emit('input', selectedDay)
      }
    },
    openCalendar() {
      this.open = true
    },
    closeCalendar() {
      this.open = false
    },
    acceptChosenDate() {
      if (this.selectedDay == '') {
        const day = moment.from(this.$moment().format("YYYY/MM/DD HH:mm:ss"), "en", "YYYY/MM/DD HH:mm:ss").format("jDD")
        this.selectDay(day)
      } else {
        if (this.type == 'datetime') {
          const day = moment.from(this.selectedDay, "en", "YYYY/MM/DD HH:mm:ss").format("jDD")
          this.selectDay(day)
        } else if (this.type == 'date') {
          const day = moment.from(`${this.selectedDay} 00:00:00`, "en", "YYYY/MM/DD HH:mm:ss").format("jDD")
          this.selectDay(day)
        } else if (this.type == 'time') {
          const day = moment.from(`${moment().format("YYYY/MM/DD")} ${this.selectedDay}`, "en", "YYYY/MM/DD HH:mm:ss").format("jDD")
          this.selectDay(day)
        }
      }
    },
    nextMonth() {
      this.date = moment(`${this.jYear}/${this.jMonth}/${this.jDay} ${this.hour}:${this.minute}:00`, "jYYYY/jMM/jDD HH:mm:ss").add(1, "jMonth").locale("en").format("YYYY/MM/DD HH:mm:ss")
    },
    prevMonth() {
      this.date = moment(`${this.jYear}/${this.jMonth}/${this.jDay} ${this.hour}:${this.minute}:00`, "jYYYY/jMM/jDD HH:mm:ss").subtract(1, "jMonth").locale("en").format("YYYY/MM/DD HH:mm:ss")
    },
    nextYear() {
      this.date = moment(`${this.jYear}/${this.jMonth}/${this.jDay} ${this.hour}:${this.minute}:00`, "jYYYY/jMM/jDD HH:mm:ss").add(1, "jYear").locale("en").format("YYYY/MM/DD HH:mm:ss")
    },
    prevYear() {
      this.date = moment(`${this.jYear}/${this.jMonth}/${this.jDay} ${this.hour}:${this.minute}:00`, "jYYYY/jMM/jDD HH:mm:ss").subtract(1, "jYear").locale("en").format("YYYY/MM/DD HH:mm:ss")
    },
    dayIsDisabled(day) {
      if(this.disabled) {
        return true
      }
      if (day && this.disablePast && this.date) {
        const dStr = this.$moment(this.date).format('jYYYY/jMM')
        const d = moment(`${dStr}/${day}`, "jYYYY/jMM/jDD").locale("en").format("YYYY/MM/DD")
        const r = this.$moment(d).diff(this.$moment(this.date))
        return r < 0
      }
      return false
    },
    isSelected(day) {
      if (this.selectedDay) {
        const dStr = this.$moment(this.date).format('jYYYY/jMM')
        const d = `${dStr}/${day}`.replaceAll('/', '')
        const date = moment.from(this.$moment(this.selectedDay).format("YYYY/MM/DD HH:mm:ss"), "en", "YYYY/MM/DD HH:mm:ss").locale('en').format("jYYYYjMMjDD")
        return date === d
      }
      return false
    },
    isToday(day) {
      if (this.date && day) {
        const dStr = this.$moment(this.date).format('jYYYY/jMM')
        const d = `${dStr}/${day}`.replaceAll('/', '')
        const date = moment.from(this.$moment().format("YYYY/MM/DD HH:mm:ss"), "en", "YYYY/MM/DD HH:mm:ss").locale('en').format("jYYYYjMMjDD")
       return date === d
      }
      return false
    },
    selectDay(day, accepted = false) {
      moment.locale('en')
      if (!day || this.disabled) return
      let hour = this.hour.toString().length === 2 ? this.hour.toString() : `0${this.hour}`
      let minute = this.minute.toString().length === 2 ? this.minute.toString() : `0${this.minute}`
      if (!this.dayIsDisabled(day)) {
        const dStr = this.$moment(this.date).format('jYYYY/jMM')
        let selectedDay = ''
        if (this.type === 'datetime') {
          this.dateFormatted = `${dStr}/${day} ${hour}:${minute}`
          selectedDay = moment(`${dStr}/${day} ${hour}:${minute}`, this.getFormat).locale("en").format(this.getEnFormat)
          this.selectedDay = moment(`${dStr}/${day} ${hour}:${minute}:00`, "jYYYY/jMM/jDD HH:mm:ss").locale("en").format("YYYY/MM/DD HH:mm:ss")
        } else if (this.type === 'date') {
          if (accepted) {
            const jDay = this.$moment(this.date).format('jDD')
            this.dateFormatted = `${dStr}/${jDay}`
            selectedDay = moment(`${dStr}/${jDay}`, this.getFormat).locale("en").format(this.getEnFormat)
            this.selectedDay = moment(`${dStr}/${jDay} ${hour}:${minute}:00`, "jYYYY/jMM/jDD HH:mm:ss").locale("en").format("YYYY/MM/DD HH:mm:ss")
          } else {
            this.dateFormatted = `${dStr}/${day}`
            selectedDay = moment(`${dStr}/${day}`, this.getFormat).locale("en").format(this.getEnFormat)
            this.selectedDay = moment(`${dStr}/${day} ${hour}:${minute}:00`, "jYYYY/jMM/jDD HH:mm:ss").locale("en").format("YYYY/MM/DD HH:mm:ss")
          }
        } else if (this.type === 'time') {
          let date = moment(`${this.$moment().format('YYYY/MM/DD')} ${hour}:${minute}:00`, "YYYY/MM/DD HH:mm:ss")
          this.dateFormatted = date.format("HH:mm")
          selectedDay = moment(`${moment().format('YYYY/MM/DD')} ${this.dateFormatted}`, this.getFormat)
          let hourMinute = this.dateFormatted.split(':')
          selectedDay = moment().locale('en').set({hour: parseInt(hourMinute[0]), minute: parseInt(hourMinute[1])}).format(this.getEnFormat)
          this.selectedDay = date.format("YYYY/MM/DD HH:mm:ss")
        }
        this.closeCalendar()
        this.$emit('select', selectedDay)
        this.$emit('input', selectedDay)
      }
    },
    upHour() {
      let jump = 1
      let hour = parseInt(this.hour) + jump
      if (hour >= 24) {
        hour -= 24
      }
      if (hour < 10) {
        hour = `0${hour}`
      }
      this.hour = hour
    },
    onHourChange(event) {
      const val = event.target.value
      if (!/\d/.test(val)) return event.preventDefault()
      if (parseInt(val) > 23) {
        this.hour = 0
      }
      if (parseInt(val) < 0) {
        this.hour = 23
      }
    },
    downHour() {
      let jump = 1
      let hour = parseInt(this.hour) - jump
      if (hour < 0) {
        hour = 23
      }
      if (hour < 10) {
        hour = `0${hour}`
      }
      this.hour = hour

    },
    upMinute() {
      let jump = this.jumpMinute
      if (jump >= 60) {
        jump = 15
      }
      let minute = parseInt(this.minute) + jump
      if (minute >= 60) {
        minute -= 60
      }
      if (minute < 10) {
        minute = `0${minute}`
      }
      this.minute = minute
    },
    onMinuteChange(event) {
      const val = event.target.value
      if (!/\d/.test(val)) return event.preventDefault()
      if (parseInt(val) > 59) {
        this.minute = 0
      }
      if (parseInt(val) < 0) {
        this.minute = 59
      }
    },
    downMinute() {
      let jump = this.jumpMinute
      if (jump >= 60) {
        jump = 15
      }
      let minute = parseInt(this.minute) - jump
      if (minute <= 0) {
        minute = 60 + minute
      }
      if (minute < 10) {
        minute = `0${minute}`
      }
      this.minute = minute
    },
    startDayIndex(date) {
      if (date) {
        return moment.from(date, "en", "YYYY/MM/DD").startOf("jMonth").jDay()
      }
      return 0
    },
    isFriday(day) {
      if (this.date && day) {
        const dStr = this.$moment(this.date).format('jYYYY/jMM')
        const d = moment(`${dStr}/${day}`, "jYYYY/jMM/jDD").jDay()
        return d == 6
      }
      return false
    },
    selectYear(jYear) {
      this.jYear = jYear
      this.date = moment(`${this.jYear}/${this.jMonth}/${this.jDay} ${this.hour}:${this.minute}:00`, "jYYYY/jMM/jDD HH:mm:ss").locale("en").format("YYYY/MM/DD HH:mm:ss")
      this.closeYearBox()
    }
  },
  computed: {
    data: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit("input", value)
      }
    },
    faDate() {
      if (!this.date) {
        return ""
      }
      return this.$moment(this.date).locale("en").format('jYYYY/jMM/jDD')
    },
    faDateString() {
      if (!this.faDate) {
        return ""
      }
      return moment.from(this.faDate, "fa", "jYYYY/jMM/jDD").locale('fa').format("jMMMM")
    },
    faDaysInMonth() {
      if (!this.faDate) {
        return 0
      }
      return moment.from(this.faDate, "fa", "jYYYY/jMM").locale('fa').jDaysInMonth()
    },
    monthDays() {
      let days = []
      if (!this.date) return
      let j = 0;
      let index = this.startDayIndex(this.date)
      let i = 1
      days[j] = Array(7).fill('')
      while (i <= this.faDaysInMonth) {
        while (index < 7) {
          if (i > this.faDaysInMonth) {
            break
          }
          let day = `${i}`
          if (i < 10) {
            day = `0${day}`
          }
          days[j][index] = day
          index++
          i++
        }
        index = 0
        if (i <= this.faDaysInMonth) {
          j++
          days[j] = Array(7).fill('')
        }
      }
      return days;
    },
    getLabel() {
      if (this.selectedDay) {
        return moment.from(this.selectedDay, "en", "YYYY/MM/DD").locale("fa").format("jYYYY/jMM/jDD")
      } else {
        return this.label
      }
    },
    showDateBox() {
      return this.type === 'datetime' || this.type == 'date'
    },
    showTimeBox() {
      return this.type === 'datetime' || this.type === 'time'
    },
    getFormat() {
      if (this.type === 'datetime') {
        return "jYYYY/jMM/jDD HH:mm"
      }
      if (this.type === 'date') {
        return "jYYYY/jMM/jDD"
      }
      if (this.type === 'time') {
        return "HH:mm"
      }
      return "jYYYY/jMM/jDD HH:mm"
    },
    getEnFormat() {
      if (this.type === 'datetime') {
        return "YYYY/MM/DD HH:mm"
      }
      if (this.type === 'date') {
        return "YYYY/MM/DD"
      }
      if (this.type === 'time') {
        return "HH:mm"
      }
      return "YYYY/MM/DD HH:mm"
    },
    listedYears() {
      let y = this.jYear - 20
      let list = [8]
      for (let i = 0; i < 6; i++) {
        list[i] = []
        for (let j = 0; j < 5; j++) {
          list[i][j] = y
          y++
        }
      }
      return list
    },
    placeholder() {
      if (this.type == 'datetime') {
        return '1374/11/23 11:00'
      } else if (this.type == 'date') {
        return '1374/11/23'
      } else if (this.type == 'time') {
        return '11:00'
      }
    }
  },
  watch: {
    date() {
      this.year = parseInt(this.$moment(this.date).format("YYYY"))
      this.month = parseInt(this.$moment(this.date).format("MM"))
      this.day = parseInt(this.$moment(this.date).format("DD"))
      this.jYear = parseInt(this.$moment(this.date).format("jYYYY"))
      this.jMonth = parseInt(this.$moment(this.date).format("jMM"))
      this.jDay = parseInt(this.$moment(this.date).format("jDD"))
      this.hour = parseInt(this.$moment(this.date).format("HH"))
      this.minute = parseInt(this.$moment(this.date).format("mm"))
      if (this.hour < 10) {
        this.hour = `0${this.hour}`
      }
      if (this.minute < 10) {
        this.minute = `0${this.minute}`
      }
    },
    initialValue(val) {
      this.setInitDateValue()
    }
  }
}
</script>

<style scoped lang="scss">
.custom-date-input-box {
  display: flex;
  flex-direction: column;
  height: 42px;
  width: 100%;
  .date-input-box {
    height: 42px;
    background: #FFFFFF 0 0 no-repeat padding-box;
    border: 1px solid #DBDBDB;
    position: relative;
    border-radius: 8px;
    img {
      position: absolute;
      left: 8px;
      top: 8px;
      cursor: pointer;
    }
    input {
      height: 100%;
      outline: none !important;
      width: 100%;
      padding: 5px 10px 5px 10px;
      margin-left: 25px;
      border-radius: 8px;
      direction: ltr;
      text-align: right;
      &:focus {
        outline: none !important;
      }
    }
  }
}
.main-button, .second-button, .remove-button {
  padding: 4px 12px !important;
  font: normal normal bold 12px/18px IRANYekanRegular !important;
  min-width: 60px !important;
  height: 28px !important;
}
.create-update-modal-title {
  width: 100% !important;
  .selected-year {
    cursor: pointer;
    padding: 2px 8px;
    margin: 0 auto !important;
    font: normal normal bold 16px/22px IRANYekanRegular !important;
    border: 1px solid #DBDBDB;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:hover {
      border-color: #808080;
    }
  }
  .create-update-modal-close {
    width: 24px !important;
    height: 24px !important;
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
.custom-date-picker-content-header {
  width: 100% !important;
}
.custom-date-picker-days-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  direction: rtl;
  padding: 0 10px;

  .custom-date-picker-days {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-top: 5px;

    //&:last-child {
    //  width: 108px;
    //}

    .custom-date-picker-day {
      font-family: 'IRANYekanRegular', sans-serif !important;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #1A1A1A;
      height: 24px;
      width: 100px;
      cursor: pointer;

      &.is-friday {
        background: red;
        color: #fff;
        border-radius: 5px;
      }

      &:last-child {
        margin-right: 0;
      }

      &.disabled {
        color: #B4B4B4;
        cursor: not-allowed;
      }

      &.none {
        color: #B4B4B4;
        cursor: default;
      }

      &.today {
        background: rgba(231, 109, 45, 0.15);
        border-radius: 5px;
      }

      &.selected {
        background: #07ca07 !important;
        border-radius: 5px;
        color: #FFFFFF !important;
      }
    }
  }
}
.custom-time-input {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  .time-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 50px;
    input {
      width: 50px;
      text-align: center;
      outline: none !important;
      &:focus {
        outline: none !important;
      }
    }
  }
}
</style>
