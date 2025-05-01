<template>
    <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <div class="d-flex flex-column">
            <div class="report-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                <defs>
                  <style>.a,.b{fill:#5063ff;}.a{opacity:0.12;}</style>
                </defs>
                <g transform="translate(-1316 -132)">
                  <rect class="a" width="40" height="40" rx="20" transform="translate(1316 132)"/>
                  <path class="b"
                        d="M14.4,4.5a2.25,2.25,0,1,0-2.25-2.25A2.25,2.25,0,0,0,14.4,4.5Zm3.15,6.188H16.313V9.45a.45.45,0,0,0-.45-.45H14.737a.45.45,0,0,0-.45.45v1.238H13.05a.45.45,0,0,0-.45.45v1.125a.45.45,0,0,0,.45.45h1.238V13.95a.45.45,0,0,0,.45.45h1.125a.45.45,0,0,0,.45-.45V12.712H17.55a.45.45,0,0,0,.45-.45V11.137A.451.451,0,0,0,17.55,10.688ZM13.784,5.4a2.345,2.345,0,0,0-1.009.232,4.12,4.12,0,0,1,.044.443,3.792,3.792,0,0,1-.933,2.475h1.792a1.227,1.227,0,0,1,.947-.45h1.35a1.229,1.229,0,0,1,.946.45H17.5a.512.512,0,0,0,.5-.526A2.554,2.554,0,0,0,15.522,5.4ZM9,9A2.925,2.925,0,1,0,6.1,6.075,2.9,2.9,0,0,0,9,9ZM9,4.5A1.575,1.575,0,1,1,7.422,6.075,1.576,1.576,0,0,1,9,4.5Zm4.39,9.112h-.45A1.236,1.236,0,0,1,11.9,13.05H5.009a2.618,2.618,0,0,1,2.563-1.8H10.4a2.839,2.839,0,0,1,1.3.311v-.536a1.279,1.279,0,0,1,.306-.806A4.18,4.18,0,0,0,10.4,9.9H7.6a3.879,3.879,0,0,0-4,3.749.775.775,0,0,0,.8.751h9.042a1.21,1.21,0,0,1-.053-.337ZM5.172,6.075a3.747,3.747,0,0,1,.045-.447,2.037,2.037,0,0,0-1-.228H2.477A2.554,2.554,0,0,0,0,8.024a.512.512,0,0,0,.5.526H6.106A3.788,3.788,0,0,1,5.172,6.075ZM3.6,4.5A2.25,2.25,0,1,0,1.35,2.25,2.25,2.25,0,0,0,3.6,4.5Z"
                        transform="translate(1327 144.8)"/>
                </g>
              </svg>
              رده سنی بیماران
            </div>
            <div class="d-flex flex-column align-start justify-start mt-4">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <custom-date-picker-js
                    label="تاریخ ابتدا"
                    v-model="form.start"
                    type="date"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <custom-date-picker-js
                    label="تاریخ انتها"
                    v-model="form.end"
                    type="date"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <custom-number-input
                    v-model="form.age_start"
                    :max="100"
                    :min="0"
                    label="ابتدای سن"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <custom-number-input
                    v-model="form.age_end"
                    :max="100"
                    :min="0"
                    label="انتهای سن"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <div class="d-flex flex-row align-center justify-end">
                    <div class="result-age-box  d-flex flex-row">
                      <div class="result-age">
                        {{ age_result }}
                      </div>
                      <span class="result-title">نفر</span>
                    </div>
                    <div @click="getAgeReport" class="age-button">
                      <span v-if="age_loading">
                        <v-progress-circular color="#fff"/>
                      </span>
                      <span v-else>محاسبه</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <div class="d-flex flex-column">
            <div class="report-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                <defs>
                  <style>.a,.b{fill:#5063ff;}.a{opacity:0.12;}</style>
                </defs>
                <g transform="translate(-1316 -132)">
                  <rect class="a" width="40" height="40" rx="20" transform="translate(1316 132)"/>
                  <path class="b"
                        d="M14.4,4.5a2.25,2.25,0,1,0-2.25-2.25A2.25,2.25,0,0,0,14.4,4.5Zm3.15,6.188H16.313V9.45a.45.45,0,0,0-.45-.45H14.737a.45.45,0,0,0-.45.45v1.238H13.05a.45.45,0,0,0-.45.45v1.125a.45.45,0,0,0,.45.45h1.238V13.95a.45.45,0,0,0,.45.45h1.125a.45.45,0,0,0,.45-.45V12.712H17.55a.45.45,0,0,0,.45-.45V11.137A.451.451,0,0,0,17.55,10.688ZM13.784,5.4a2.345,2.345,0,0,0-1.009.232,4.12,4.12,0,0,1,.044.443,3.792,3.792,0,0,1-.933,2.475h1.792a1.227,1.227,0,0,1,.947-.45h1.35a1.229,1.229,0,0,1,.946.45H17.5a.512.512,0,0,0,.5-.526A2.554,2.554,0,0,0,15.522,5.4ZM9,9A2.925,2.925,0,1,0,6.1,6.075,2.9,2.9,0,0,0,9,9ZM9,4.5A1.575,1.575,0,1,1,7.422,6.075,1.576,1.576,0,0,1,9,4.5Zm4.39,9.112h-.45A1.236,1.236,0,0,1,11.9,13.05H5.009a2.618,2.618,0,0,1,2.563-1.8H10.4a2.839,2.839,0,0,1,1.3.311v-.536a1.279,1.279,0,0,1,.306-.806A4.18,4.18,0,0,0,10.4,9.9H7.6a3.879,3.879,0,0,0-4,3.749.775.775,0,0,0,.8.751h9.042a1.21,1.21,0,0,1-.053-.337ZM5.172,6.075a3.747,3.747,0,0,1,.045-.447,2.037,2.037,0,0,0-1-.228H2.477A2.554,2.554,0,0,0,0,8.024a.512.512,0,0,0,.5.526H6.106A3.788,3.788,0,0,1,5.172,6.075ZM3.6,4.5A2.25,2.25,0,1,0,1.35,2.25,2.25,2.25,0,0,0,3.6,4.5Z"
                        transform="translate(1327 144.8)"/>
                </g>
              </svg>
              شهرهای بیماران
            </div>
            <div class="d-flex flex-column align-start justify-start">
              <v-simple-table class="area-table">
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th class="text-right">

                    </th>
                    <th class="text-right">
                      استان
                    </th>
                    <th class="text-right">
                      تعداد
                    </th>
                    <th class="text-right">
                      شهرستان
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                    v-for="(p,i) in area_result"
                    :key="i"
                  >
                    <td class="main-cel">{{ i + 1 }}</td>
                    <td class="main-cel">{{ p.name }}</td>
                    <td class="main-cel">{{ p.count }}</td>
                    <td class="main-cel">
                      <v-simple-table class="my-4">
                        <template v-slot:default>
                          <tbody>
                          <tr
                            v-for="(c,i) in p.counties"
                            :key="i"
                          >
                            <td>{{ i + 1 }}</td>
                            <td>{{ c.name }}</td>
                            <td>{{ c.count }}</td>
                            <td>
                              <v-simple-table class="my-4">
                                <template v-slot:default>
                                  <tbody>
                                  <tr
                                    v-for="(ci,i) in c.cities"
                                    :key="i"
                                  >
                                    <td>{{ i + 1 }}</td>
                                    <td>{{ ci.name }}</td>
                                    <td>{{ ci.count }}</td>
                                  </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                            </td>
                          </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </div>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: 'AreaReportComponent',
    data() {
        return {
          type: 0,
          age_result: 0,
          area_result: [],
          age_loading: false,
          form: {
            start: '',
            end: '',
            age_start: '',
            age_end: '',
          }
        }
    },
    mounted() {
        this.getAreaReports()
        this.getAgeReport()
    },
    methods: {
      getAreaReports() {
        this.$axios.post('/organizations/reports', {
          type: 'area',
        })
          .then(res => {
            this.area_result = res.data
          })
      },
      getAgeReport() {
          this.age_loading = true
          this.$axios.post('/organizations/reports', {
            type: 'age',
            start: this.form.start,
            end: this.form.end,
            age_start: this.form.age_start,
            age_end: this.form.age_end,
          })
            .then(res => {
              this.age_result = res.data
            })
            .finally(() => {
              setTimeout(() => {
                this.age_loading = false
              }, 1)
            })
      }
    },
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
        letter-spacing: 0;
        color: #3D3D66;
    }
}
.report-title {
  text-align: right;
  font: normal normal normal 1rem/28px IRANYekanRegular;
  letter-spacing: 0;
  color: #5063FF;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #5063FF;
  border-radius: 8px;
  padding: 5px 8px;
  width: 170px;
  svg {
    margin-left: 6px;
    height: 36px;
    width: 36px;
  }
}
.result-age-box {
  position: relative;
  background: #FFFFFF 0 0 no-repeat padding-box;
  border: 1px solid #5063FF;
  border-radius: 8px;
  padding: 16px;
  width: 160px;
  height: 56px;
  .result-title {
    text-align: center;
    font: normal normal normal 16px/28px IRANYekanRegular;
    letter-spacing: 0;
    color: #3D3D66;
    position: absolute;
    left: 16px;
    top: 14px;
  }
  .result-age {
    text-align: center;
    font: normal normal bold 22px/38px IRANYekanRegular;
    letter-spacing: 3.08px;
    color: #141432;
    position: absolute;
    top: 11px;
    left: 50%;
  }
}
.age-button {
  text-align: center;
  font: normal normal bold 1rem/28px IRANYekanRegular;
  letter-spacing: 0;
  color: #FFFFFF;
  background: #5063FF 0 0 no-repeat padding-box;
  box-shadow: 0 12px 16px #5063FF28;
  border-radius: 8px;
  width: 112px;
  height: 56px;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.area-table {
  margin-top: 32px;
  width: 100%;
  td {
    padding: .75rem !important;
    vertical-align: top;
  }
}
</style>
