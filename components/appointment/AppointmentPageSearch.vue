<template>
  <v-row class="search-box" v-if="!loading">
    <v-col cols="12" sm="3" md="2">
      <div class="right-box">
        <v-select outlined :items="months" label="ماه" item-value="id" item-text="label" v-model="month"
          @change="onMonthChanged" height="44px"></v-select>
      </div>
    </v-col>
    <v-col cols="12" sm="3" md="2">
      <div class="right-box">
        <v-select outlined :items="years" label="سال" item-value="id" item-text="label" v-model="year"
          @change="onYearChanged"></v-select>
      </div>
    </v-col>
    <v-col cols="12" sm="4" md="2" lg="1" class="hidden-sm-and-down">
      <div class="right-box">
        <div class="mt-4 tafkik">نمایش به تفکیک:</div>
      </div>
    </v-col>
    <v-col cols="12" sm="2" md="2" lg="2">
      <div class="right-box">
        <button class="show-button" :class="{ 'active': showHour }" @click="toggleShowHour">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <defs>
              <style>
                .a {
                  fill: #424242;
                }
              </style>
            </defs>
            <path class="a"
              d="M2.1,0a3,3,0,0,0-3,3A2.977,2.977,0,0,0-.427,4.606L4.133.806A2.879,2.879,0,0,0,2.1,0Zm10,0a2.981,2.981,0,0,0-2.033.806l4.559,3.8A2.765,2.765,0,0,0,15.1,3,2.983,2.983,0,0,0,12.1,0ZM7.128,2A7,7,0,0,0,1.679,13.387L.348,14.718A.75.75,0,1,0,1.408,15.78l1.331-1.331a6.984,6.984,0,0,0,8.776,0l1.331,1.331a.75.75,0,1,0,1.062-1.061l-1.331-1.331A7,7,0,0,0,7.128,2Zm0,12.5a5.5,5.5,0,1,1,5.5-5.5A5.506,5.506,0,0,1,7.128,14.5Zm.75-5.375V5.75a.75.75,0,0,0-1.5,0V9.5a.75.75,0,0,0,.3.6l2,1.5a.676.676,0,0,0,.422.15A.75.75,0,0,0,9.551,10.4Z"
              transform="translate(0.9)" />
          </svg>
          ساعت
        </button>
      </div>
    </v-col>
    <v-col cols="12" sm="2" md="2" lg="1">
      <div class="right-box">
        <button class="show-button" :class="{ 'active': showCaseType }" @click="toggleShowCaseType">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13">
            <defs>
              <style>
                .a {
                  fill: #424242;
                }
              </style>
            </defs>
            <path class="a"
              d="M6.747,34.753h8.5a.75.75,0,0,0,0-1.5h-8.5a.75.75,0,0,0,0,1.5ZM1.5,43a1,1,0,1,0,1,1A1,1,0,0,0,1.5,43Zm13.748-4.75h-8.5a.75.75,0,1,0,0,1.5h8.5a.75.75,0,1,0,0-1.5Zm0,5h-9.5a.75.75,0,1,0,0,1.5h9.5a.75.75,0,1,0,0-1.5Zm-11.556-11L1.969,34.163l-.691-.691A.75.75,0,1,0,.217,34.532l1.25,1.25a.729.729,0,0,0,.5.221h.02a.75.75,0,0,0,.538-.248l2.25-2.5a.751.751,0,0,0-.056-1.06A.717.717,0,0,0,3.691,32.252Zm0,5L1.969,39.163l-.691-.691A.75.75,0,0,0,.217,39.532l1.25,1.25a.729.729,0,0,0,.5.221h.02a.75.75,0,0,0,.538-.248l2.25-2.5a.751.751,0,0,0-.056-1.06A.718.718,0,0,0,3.691,37.25Z"
              transform="translate(0.003 -32.004)" />
          </svg>
          علل مراجعه
        </button>
      </div>
    </v-col>
    <v-spacer v-if="!mini" />
    <v-col cols="12" sm="2" md="2">
      <v-select class="settings-select" outlined :items="actions" label="تنظیمات" item-value="id" item-text="label" v-model="action"
        @change="doAction"></v-select>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col>
      <loading-card />
    </v-col>
  </v-row>
</template>
<script>
import moment from "jalali-moment";
import LoadingCard from "~/components/global/LoadingCard.vue";
export default {
  name: "AppointmentPageSearch",
  components: { LoadingCard },
  props: {
    isSurgery: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      months: [
        {
          id: 1,
          label: 'فروردین',
        },
        {
          id: 2,
          label: 'اردیبهشت',
        },
        {
          id: 3,
          label: 'خرداد',
        },
        {
          id: 4,
          label: 'تیر',
        },
        {
          id: 5,
          label: 'مرداد',
        },
        {
          id: 6,
          label: 'شهریور',
        },
        {
          id: 7,
          label: 'مهر',
        },
        {
          id: 8,
          label: 'آبان',
        },
        {
          id: 9,
          label: 'آذر',
        },
        {
          id: 10,
          label: 'دی',
        },
        {
          id: 11,
          label: 'بهمن',
        },
        {
          id: 12,
          label: 'اسفند',
        },
      ],
      years: [],
      actions: [
        {
          id: 0,
          label: 'تنظیمات'
        },
        {
          id: 1,
          label: 'روزهای تعطیل'
        },
        {
          id: 2,
          label: 'تنظیمات نوبت دهی vip'
        },
        {
          id: 3,
          label: 'برنامه نوبت دهی vip'
        },
        {
          id: 4,
          label: 'تنظیمات علل مراجعه'
        },
        {
          id: 5,
          label: 'ساعت کاری'
        },
      ],
      action: null,
    }
  },
  async mounted() {
    this.loading = true
    await this.getOrganizationWorkHour()
    await this.calcStartDate()
  },
  methods: {
    async calcStartDate() {
      this.year = parseInt(moment().format("jYYYY"))
      this.month = parseInt(moment().format("jMM"))
      this.years = []
      for (let i = 1398; i < this.year + 10; i++) {
        this.years.push(i)
      }
      this.startDate = moment().startOf("jMonth")
      // this.endDate = moment().endOf("jMonth").add(11, 'jDay')
      this.endDate = this.startDate.clone().add(41, 'day')
      await this.getOrganizationHolidays(this.startDate, this.endDate)
      this.loadList = true
      this.loading = false
    },
    async onMonthChanged() {
      await this.$store.dispatch('appointment/setMonth', this.month)
      this.loadList = false
      let date = this.startDate.clone()
      date = date.jMonth(this.month - 1)
      this.startDate = date.clone()
      date = date.endOf('jMonth').clone()
      this.endDate = date.clone()
      await this.getOrganizationHolidays(this.startDate, this.endDate)
      setTimeout(() => {
        this.loadList = true
      }, 200)
    },
    async onYearChanged() {
      await this.$store.dispatch('appointment/setYear', this.year)
      this.loadList = false
      let date = this.startDate.clone()
      date = date.jYear(this.year)
      this.startDate = date.clone()
      let thisMonth = moment().locale('fa')
      if (thisMonth.jYear() == this.year && thisMonth.jMonth() == (this.month - 1)) {
        this.endDate = date.clone().endOf("jMonth").add(11, 'jDay')
      } else {
        this.endDate = date.clone().endOf('jMonth').clone()
      }
      await this.getOrganizationHolidays(this.startDate, this.endDate)
      setTimeout(() => {
        this.loadList = true
      }, 200)
    },
    toggleShowHour() {
      this.showHour = !this.showHour
    },
    toggleShowCaseType() {
      this.showCaseType = !this.showCaseType
    },
    doAction() {
      switch (this.action) {
        case 1:
          this.$router.push({
            path: '/holidays'
          })
          break;
        case 2:
          this.$router.push({
            path: '/schedule'
          })
          break;
        case 3:
          this.$router.push({
            path: '/schedule/reserves'
          })
          break;
        case 4:
          if (this.isSurgery) {
            this.$router.push({
              path: '/cases/surgeries'
            })
          } else {
            this.$router.push({
              path: '/cases'
            })
          }
          break;
        case 5:
          this.openShowWorkHour()
          break;
      }
    },
    async openShowWorkHour() {
      await this.getOrganizationWorkHour()
      await this.$store.dispatch('appointment/setShowWorkHour', true)
    },
    async getOrganizationWorkHour() {
      await this.$store.dispatch('appointment/getOrganizationWorkHour', this.loginUser.organization_id)
    },
    async getOrganizationHolidays(start, end) {
      await this.$store.dispatch('appointment/getOrganizationHolidays', {
        start: start.format('YYYY/MM/DD'),
        end: end.format('YYYY/MM/DD'),
      })
    },
  },
  computed: {
    showWorkHour: {
      get() {
        return this.$store.getters['appointment/getShowWorkHour'];
      },
      set(val) {
        return this.$store.dispatch('appointment/setShowWorkHour', val);
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
    showCaseType: {
      get() {
        return this.$store.getters['appointment/getShowCaseType'];
      },
      set(val) {
        return this.$store.dispatch('appointment/setShowCaseType', val);
      }
    },
    month: {
      get() {
        return this.$store.getters['appointment/getMonth'];
      },
      set(val) {
        return this.$store.dispatch('appointment/setMonth', val);
      }
    },
    year: {
      get() {
        return this.$store.getters['appointment/getYear'];
      },
      set(val) {
        return this.$store.dispatch('appointment/setYear', val);
      }
    },
    startDate: {
      get() {
        return this.$store.getters['appointment/getStartDate'];
      },
      set(val) {
        return this.$store.dispatch('appointment/setStartDate', val);
      }
    },
    endDate: {
      get() {
        return this.$store.getters['appointment/getEndDate'];
      },
      set(val) {
        return this.$store.dispatch('appointment/setEndDate', val);
      }
    },
    loadList: {
      get() {
        return this.$store.getters['appointment/getLoadList'];
      },
      set(val) {
        return this.$store.dispatch('appointment/setLoadList', val);
      }
    },
    loginUser() {
      return this.$store.getters['login/getUser'];
    },
    mini() {
      return this.$vuetify.breakpoint.mobile
    }
  },
  watch: {
    showWorkHour(val) {
      if (!val) {
        this.action = null
      }
    }
  }
}
</script>
<style scoped lang="scss">

</style>
