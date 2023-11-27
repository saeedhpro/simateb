<template>
    <div class="report-component relative">
        <div class="type-selection-box">
            <v-btn-toggle
                v-model="type"
                mandatory
                color="#5063FF"
                dense
            >
                <v-btn>
                    سال
                </v-btn>
                <v-btn>
                    ماه
                </v-btn>
                <v-btn>
                    روز
                </v-btn>
            </v-btn-toggle>
        </div>
        <client-only>
            <div id="chart">
                <apexchart v-if="!loading" type="area" height="450" :options="chartOptions" :series="series"></apexchart>
            </div>
        </client-only>
    </div>
</template>
<script>
import fa from "apexcharts/dist/locales/fa.json"

export default {
    name: 'IncomeReportComponent',
    data() {
        return {
          type: 0,
          loading : false,
          periods: {
            0: 'year',
            1: 'month',
            2: 'day',
          },
          income_reports : {
            series: [],
            chartOptions: {
              chart: {
                type: 'area',
                height: 350,
                stacked: true,
                locales: [fa],
                defaultLocale: 'fa',
                events: {
                  selection: function (chart, e) {
                    // console.log(new Date(e.xaxis.min))
                  }
                },
              },
              labels: [],
              colors: ['#008FFB', '#00E396', '#CED4DC', 'red', 'yellow'],
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              fill: {
                type: 'gradient',
                gradient: {
                  opacityFrom: 0.6,
                  opacityTo: 0.8,
                }
              },
              legend: {
                position: 'top',
                horizontalAlign: 'right'
              },
              xaxis: {
                type: 'datetime',
                labels: {
                  // formatter: (value) => {
                  //   return new Date(value).toLocaleDateString('fa-IR')
                  // },
                  datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMMM',
                    day: 'dd MMMM',
                    hour: 'HH'
                  },
                },
              },
            },
          },
        }
    },
    mounted() {
        this.getIncomeReports()
    },
    methods: {
      getIncomeReports() {
        this.loading = true
        this.$axios.post('/organizations/reports', {
          type: 'income',
          period: this.periods[this.type],
        })
          .then(res => {
            const data = res.data
            let series = []
            series.push(this.makeData('هزینه کل درمان', data.all))
            series.push(this.makeData('سهم بیمار', data.patient))
            series.push(this.makeData('سهم بیمه', data.insurance))
            series.push(this.makeData('درصد تخفیف', data.discount))
            series.push(this.makeData('باقیمانده', data.debt))
            this.income_reports.series = series
            this.loading = false
          })
      },
      makeData(name, list) {
        let j = 0
        return {
          name: name,
          data: list.map(i => {
            j++;
            return [
              i.name,
              i.sum
            ]
          })
        }
      },
    },
    computed: {
        chartOptions() {
            return this.incomeReports.chartOptions
        },
        series() {
            return this.incomeReports.series
        },
        incomeReports() {
            return this.income_reports
        },
    },
    watch: {
        type(val) {
            this.getIncomeReports()
        }
    }
}
</script>
<style scoped lang="scss">
.type-selection-box {
    position: absolute !important;
    top: 0;
    left: 20px;
    .v-btn__content {
        text-align: center;
        font: normal normal normal 16px/28px IRANYekanRegular;
        letter-spacing: 0px;
        color: #3D3D66;
    }
}
</style>
