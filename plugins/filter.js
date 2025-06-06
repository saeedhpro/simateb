import Vue from "vue";

export default function persianDigit (value) {
  const persian = {
    0: '۰',
    1: '۱',
    2: '۲',
    3: '۳',
    4: '۴',
    5: '۵',
    6: '۶',
    7: '۷',
    8: '۸',
    9: '۹'
  }
  let result = value ? value.toString() : ''
  if (value === 0) {
    result = value.toString()
  }
  for (let i = 0; i <= 9; i++) {
    result = result.replace(new RegExp(`${i}`, 'g'), persian[i])
  }
  return result
}
let VPlugin = {
  install: function () {
    Vue.filter('persianDigit', persianDigit)
  }
}
Vue.use(VPlugin)
