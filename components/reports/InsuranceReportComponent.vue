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
            <div id="chart center">
                <apexchart v-if="!loading" type="pie" width="450" :options="chartOptions" :series="series"></apexchart>
            </div>
        </client-only>
    </div>
</template>
<script>
export default {
    name: 'InsuranceReportComponent',
    data() {
        return {
          type: 0,
          loading: false,
          periods: {
            0: 'year',
            1: 'month',
            2: 'day',
          },
          series: [],
          chartOptions: {
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: [],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
        }
    },
    mounted() {
        this.getInsuranceReports()
    },
    methods: {
      getInsuranceReports() {
        this.loading = true
        this.$axios.post('/organizations/reports', {
          type: 'insurance',
          period: this.periods[this.type]
        })
          .then(res => {
            const data = res.data
            this.series = data.map(i => i.cnt)
            this.chartOptions.labels = data.map(i => i.name)
            this.loading = false
          })
      }
    },
    watch: {
        type(val) {
            this.getInsuranceReports()
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
.center {
    .apexcharts-canvas {
        margin: 0 auto !important;
    }
}
</style>
