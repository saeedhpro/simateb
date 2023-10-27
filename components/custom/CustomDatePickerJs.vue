<template>
  <div class="create-update-model-input-box" :class="{'has-error': error}">
    <label v-if="label">{{ label }}</label>
    <div class="custom-date-input-box">
      <div class="date-input-box">
        <img @click="openCalendar" alt="" src="/images/form/datepicker.svg">
        <input v-model="formattedDate" @input="onDateChange" maxlength="16" type="text" pattern="YYYY/MM/DD HH:mm"/>
      </div>
    </div>
    <date-picker
      v-model="dateTimeStr"
      format="YYYY-MM-DD HH:mm"
      display-format="jYYYY/jMM/jDD HH:mm"
      editable
      :show="show"
      class="date-picker"
      type="datetime"
      custom-input=".custom-input"
      ref="datepicker"
      @close="show=false"
      @change="onDateSelected"
      :disablePast="disablePast"
      :jumpMinute="jumpMinute"
    />
  </div>
</template>
<script>
import {debounce} from "lodash";
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
  mounted() {
    if (this.value) {
      this.dateTime = moment.from(this.value, 'en', this.getEnFormat).locale('en')
    } else {
      this.dateTime = moment()
    }
    this.dateTimeStr = this.dateTime.format(this.getEnFormat)
    this.formattedDate = this.dateTime.format(this.getFaFormat)
  },
  data() {
    return {
      open: false,
      show: false,
      dateTime: null,
      dateTimeStr: null,
      formattedDate: null,
      enFormats: {
        'time': 'HH:mm',
        'date': 'YYYY/MM/DD',
        'datetime': 'YYYY/MM/DD HH:mm',
      },
      faFormats: {
        'time': 'HH:mm',
        'date': 'jYYYY/jMM/jDD',
        'datetime': 'jYYYY/jMM/jDD HH:mm',
      }
    }
  },
  methods: {
    onDateChange: debounce(function ($e) {
      let value = $e.target.value;
      this.dateTime = moment.from(value, 'fa', this.getEnFormat).locale("en");
      this.dateTimeStr = this.dateTime.format(this.getEnFormat)
    }, 800),
    openCalendar() {
      this.show = true
    },
    onDateSelected(dateTime) {
      this.formattedDate = dateTime.format(this.getFaFormat)
    },
  },
  computed: {
    getEnFormat() {
      return this.enFormats[this.type]
    },
    getFaFormat() {
      return this.faFormats[this.type]
    }
  },
  watch: {
    dateTimeStr() {
      this.$emit('input', this.dateTimeStr)
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
