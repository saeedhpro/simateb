import Vue from 'vue'

Vue.prototype.$checkPhoneNumber = (number, isTel = false) => {
  if (number.length === 11) {
    const regex = RegExp('09[\\d]{9}')
    const regex2 = RegExp('0[\\d]{10}')
    return regex.test(number) || (isTel && regex2.test(number));
  } else if (number.length === 13) {
    const regex = RegExp('\\+989[\\d]{9}')
    return regex.test(number);
  } else {
    return false
  }
}

Vue.prototype.$isNumeric = (str) => {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

Vue.prototype.$enDigit = (value) => {
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
    result = result.replace(new RegExp(`${persian[i]}`, 'g'), i)
  }
  return result
}
Vue.prototype.$roundUpTo = (date) => {
  const roundTo = 1000 * 60 * 15
  return Math.ceil(date / roundTo) * roundTo
}
