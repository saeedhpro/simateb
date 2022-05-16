import Vue from 'vue';
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
Vue.use(VuePersianDatetimePicker, {
  name: 'date-picker',
  props: {
    inputClass: 'form-control my-custom-class-name',
    placeholder: '',
    color: '#00acc1',
    autoSubmit: false,
  }
});
