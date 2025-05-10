<template>
 <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" align-self="center">
          <div class="page-header-box reports profile-page">
            <div
                class="profile-tabs-box"
            >
              <div class="d-flex flex-column">
                <span class="d-flex font-weight-bold mb-4">
                  <span class="">۸٬۰۷۱٬۰۴۵</span>
                  <span class="">ریال</span>
                </span>
                <span class="">مصرف کل ({{today}} الی {{monthStart}})</span>
              </div>
            </div>
          </div>
      </v-col>
      <v-col cols="12" sm="6" align-self="center">
        <div class="page-header-box reports profile-page">
          <div
            class="profile-tabs-box"
          >
            <div class="d-flex flex-column">
                <span class="d-flex font-weight-bold mb-4">
                  <span class="">{{ wallet.amount }}</span>
                  <span class="">ریال</span>
                </span>
              <span class="">اعتبار باقی مانده</span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
   <v-row>
     <v-col
       cols="12"
     >
       <v-card
         class="page-main-box"
       >
         <v-row>
           <v-col
             cols="12"
           >
             <div class="d-flex flex-column">
                <span class="d-flex font-weight-bold mb-4">
                  <span class="">جزئیات مصرف این ماه</span>
                </span>
             </div>
             <v-row>
               <v-col cols="12" sm="6" md="7" lg="8">
                 <v-simple-table >
                   <template v-slot:default>
                     <thead class="font-weight-bold black-color">
                       <tr>
                         <th class="text-right font-weight-bold black-color">
                           محصول
                         </th>
                         <th class="text-right font-weight-bold black-color">
                           هزینه
                         </th>
                       </tr>
                     </thead>
                     <tbody>
                       <tr
                       >
                         <td>ایتم 1</td>
                         <td>120.000.000 ریال</td>
                       </tr>
                     </tbody>
                   </template>
                 </v-simple-table>
               </v-col>
               <v-col cols="12" sm="6" md="5" lg="4">
                 <client-only>
                   <div id="chart">
                     <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
                   </div>
                 </client-only>
               </v-col>
             </v-row>
           </v-col>
         </v-row>
       </v-card>
     </v-col>
   </v-row>
 </v-container>

</template>

<script>
import moment from "jalali-moment";

export default {
  name: "ReportIndex",
  layout: "panel",
  middleware: 'auth',
  components: {
  },
  data() {
      return {
        moment: moment,
        series: [44, 55, 41, 17, 15],
        chartOptions: {
          chart: {
            type: 'donut',
          },
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
    this.getOrganization()
  },
  methods: {
    getOrganization() {
      if (this.loginUser) {
        this.$store.dispatch('organizations/getOrganization', this.loginUser.organization_id)
      }
    }
  },
  computed: {
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    organization() {
      return this.$store.getters['organizations/getOrganization']
    },
    wallet() {
      return this.organization?.wallet ?? {
        amount: 0
      }
    },
    monthStart() {
      return moment.from("2025/05/05", "en", "YYYY/MM/DD").utc(true).format("jYYYY/jMM/jDD")
    },
    today() {
      return moment.from("2025/05/05", "en", "YYYY/MM/DD").startOf("jMonth").utc(true).format("jYYYY/jMM/jDD")
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-tab {
    span {
        text-align: right;
        font: normal normal normal 12px/22px IRANYekanRegular;
        letter-spacing: 0;
        color: #26264E;
    }
    svg {
        height: 30px;
        width: 30px;
    }
    .a {
        fill: #26264e !important;
        opacity: .2 !important;
    }
    .b {
        fill: #26264e !important;
        opacity: 1 !important;
    }
    &.v-tab--active, &:hover {
        span {
            color: #5063FF !important;
        }
        svg {
            .a {
                fill: #5063ff !important;
                opacity: .2 !important;
            }
            .b {
                fill: #5063FF !important;
                opacity: 1 !important;
            }
        }
    }
}
</style>
