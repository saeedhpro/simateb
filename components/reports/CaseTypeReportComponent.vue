<template>
    <v-row>
        <v-col
            cols="12"
            md="6"
        >
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
                    <apexchart v-if="!loading" type="pie" width="450" :options="chartOptions" :series="series"></apexchart>
                </div>
            </client-only>
        </div>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
        <div class="report-component relative">
            <div class="type-selection-box">
                <v-btn-toggle
                    v-model="gender_type"
                    mandatory
                    color="#5063FF"
                    dense
                >
                  <v-btn>
                    همه
                  </v-btn>
                  <v-btn>
                      سال
                  </v-btn>
                  <v-btn>
                      ماه
                  </v-btn>
                </v-btn-toggle>
            </div>
            <client-only>
                <div id="chart">
                    <apexchart v-if="!genderLoading" type="pie" width="450" :options="genderChartOptions" :series="genderSeries"></apexchart>
                </div>
            </client-only>
        </div>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: 'CaseTypeReportComponent',
    data() {
        return {
          type: 0,
          gender_type: 0,
          loading: false,
          genderLoading: false,
          periods: {
            0: 'year',
            1: 'month',
            2: 'day',
          },
          genderPeriods: {
            0: 'all',
            1: 'year',
            2: 'month',
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
          genderSeries: [],
          genderChartOptions: {
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
        this.getCaseTypeReports()
        this.getGenderReports()
    },
    methods: {
      getGenderReports() {
        this.genderLoading = true
        this.$axios.post('/organizations/reports', {
          type: 'gender',
          period: this.genderPeriods[this.gender_type]
        })
          .then(res => {
            const data = res.data
            this.genderSeries = data.map(i => i.cnt)
            this.genderChartOptions.labels = data.map(i => i.gender)
            this.genderLoading = false
          })
      },
      getCaseTypeReports() {
        this.loading = true
        this.$axios.post('/organizations/reports', {
          type: 'case_type',
          period: this.periods[this.type]
        })
          .then(res => {
            const data = res.data
            this.series = data.map(i => i.count)
            this.chartOptions.labels = data.map(i => i.name)
            this.loading = false
          })
      }
    },
    watch: {
        type(val) {
            this.getCaseTypeReports()
        },
        gender_type(val) {
            this.getGenderReports()
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
