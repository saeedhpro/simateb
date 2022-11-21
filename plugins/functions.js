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
