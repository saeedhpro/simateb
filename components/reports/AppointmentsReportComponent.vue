<template>
  <div class="report-component px-16 py-16 relative">
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
        <apexchart v-if="!loading" type="bar" height="450" :options="chartOptions" :series="series"></apexchart>
      </div>
    </client-only>
  </div>
</template>
<script>
export default {
  name: 'AppointmentsReportComponent',
  data() {
    return {
      loading: false,
      periods: {
        0: 'year',
        1: 'month',
        2: 'day',
      },
      type: 0,
      series: [],
      chartOptions: {
        colors: ['#293366', '#F5AC00', '#F44336'],
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: '13px',
                  fontWeight: 900
                }
              }
            }
          },
        },
        xaxis: {
          type: 'category',
          categories: [],
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      }
    }
  },
  mounted() {
    this.getAppointmentReports()
  },
  methods: {
    getAppointmentReports() {
      this.loading = true
      this.$axios.post('/organizations/reports', {
        period: this.periods[this.type]
      })
        .then(res => {
          const data = res.data
          this.chartOptions.xaxis.categories = data.categories.map(i => i.name)
          this.series = data.series
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  watch: {
    type(val) {
      this.getAppointmentReports()
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
