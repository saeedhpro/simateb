<template>
  <div class="create-update-model-input-box" :class="{ 'has-error': error }">
    <label v-if="label">{{ label }}</label>
    <div class="custom-date-input-box">
      <div class="date-input-box">
        <img @click="openCalendar" alt="" src="/images/form/datepicker.svg">
        <input v-model="formattedDate" @input="onDateChange" maxlength="16" type="text" pattern="YYYY/MM/DD HH:mm" />
      </div>
    </div>
    <date-picker :value="dateTimeStr" :format="getEnFormat" :display-format="getFaFormat" editable :show="show"
      class="date-picker" :type="type" :multiple="multiple" custom-input=".custom-input" ref="datepicker"
      @close="show = false" @change="onDateSelected" :disablePast="disablePast" :jumpMinute="jumpMinute"
      :roundMinute="roundMinute" />
  </div>
</template>
<script>
import { debounce } from "lodash";
import moment from 'jalali-moment'

export default {
  name: "CustomDatePickerJs",
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
    value: {
      type: String | Array,
      default: "",
    },
    jumpMinute: {
      type: Number,
      default: 1,
      max: 59,
      min: 1
    },
    roundMinute: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
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
  mounted() {
    this.$nextTick(() => {
      if (this.value) {
        if (Array.isArray(this.value)) {
          console.log(this.value, "value");
        } else {
          this.dateTime = moment.from(this.value, 'en', this.getEnFormat).locale('en')
        }
        // this.dateTimeStr = this.dateTime.locale('en').format(this.getEnFormat)
      }
    })
  },
  data() {
    return {
      open: false,
      show: false,
      dateTime: null,
      // dateTimeStr: null,
      // formattedDate: null,
      enFormats: {
        'time': 'HH:mm',
        'date': 'YYYY/MM/DD',
        'datetime': 'YYYY/MM/DD HH:mm',
      },
      faFormats: {
        'time': 'HH:mm',
        'date': 'jYYYY/jMM/jDD',
        'datetime': 'jYYYY/jMM/jDD HH:mm',
      },
      startDay: '',
      endDay: '',
      dates: [],
    }
  },
  methods: {
    onDateChange: debounce(function ($e) {
      let value = $e.target.value;
      if (value) {
        if (Array.isArray(this.value)) {
          console.log(this.value, "va");


        } else {
          this.dateTime = moment.from(value, 'fa', this.getEnFormat).locale("en");
        }
        // this.dateTimeStr = this.dateTime.format(this.getEnFormat)
      } else {
        this.dateTime = null
        // this.dateTimeStr = ''
      }
    }, 800),
    openCalendar() {
      this.show = true
    },
    onDateSelected(dateTime) {
      if (Array.isArray(dateTime)) {
        this.dates = dateTime
      } else {
        this.dateTime = dateTime
      }
      // this.formattedDate = dateTime.format(this.getFaFormat)
    },
  },
  computed: {
    getEnFormat() {
      return this.enFormats[this.type]
    },
    getFaFormat() {
      return this.faFormats[this.type]
    },
    formattedDate() {
      if (Array.isArray(this.dateTime)) {
        let dates = []
        for (let i = 0; i < this.dateTime.length; i++) {
          dates.push(this.dateTime[i].locale('en').format(this.getEnFormat))
        }
        return dates.join(' - ')
      } else {
        return this.dateTime ? this.dateTime.format(this.getFaFormat) : ''
      }
    },
    dateTimeStr() {
      if (Array.isArray(this.dateTime)) {
        return this.dateTime
      } else {
        return this.dateTime ? this.dateTime.locale('en').format(this.getEnFormat) : ''
      }
    }
  },
  watch: {
    dateTimeStr() {
      this.$emit('input', this.dateTimeStr)
    },
    value() {
      // console.log(this.value, 'dssdds')
      // if (!this.value) {
      //   this.dateTimeStr = ''
      //   this.formattedDate = null
      //   this.dateTime = null
      // }
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
      right: 8px;
      top: 8px;
      cursor: pointer;
    }

    input {
      height: 100%;
      outline: none !important;
      width: 100%;
      padding: 5px 25px 5px 10px;
      border-radius: 8px;
      direction: ltr;
      text-align: left;

      &:focus {
        outline: none !important;
      }
    }
  }
}
</style>
