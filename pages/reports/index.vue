<template>
 <v-container fluid>
    <v-row>
        <v-col align-self="center">
            <div class="page-header-box reports profile-page">
                <v-container>
                    <v-tabs
                        v-model="tabs"
                        centered
                        class="profile-tabs-header"
                    >
                        <v-tab
                            class="profile-tab"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                width="40" 
                                height="40" 
                                viewBox="0 0 40 40"
                                >
                                <defs><style>.a,.b{fill:#26264e;}.a{opacity:0.12;}</style></defs>
                                <g transform="translate(-1316 -132)">
                                    <rect class="a" width="40" height="40" rx="20" transform="translate(1316 132)"/>
                                    <path class="b" d="M19.063,47.625H1.875V32.938a.938.938,0,0,0-1.875,0V48.25A1.254,1.254,0,0,0,1.25,49.5H19.063a.938.938,0,0,0,0-1.875ZM6.563,44.5a.935.935,0,0,0,.938-.937V41.688a.938.938,0,0,0-1.875,0v1.875A.938.938,0,0,0,6.563,44.5Zm3.75,0a.938.938,0,0,0,.938-.937V36.688a.938.938,0,0,0-1.875,0v6.875A.938.938,0,0,0,10.313,44.5Zm3.75,0A.938.938,0,0,0,15,43.563V39.188a.938.938,0,0,0-1.875,0v4.375A.938.938,0,0,0,14.063,44.5Zm3.75,0a.938.938,0,0,0,.938-.937V35.438a.938.938,0,0,0-1.875,0v8.125A.938.938,0,0,0,17.813,44.5Z" transform="translate(1326 111)"/>
                                </g>
                            </svg>
                            <span class="mr-2">توزیع فراوانی پذیرش‌ها</span>
                        </v-tab>
                        <v-tab
                            class="profile-tab"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="40" 
                                height="40" 
                                viewBox="0 0 40 40"
                                >
                                <defs><style>.a,.b{fill:#26264e;}.a{opacity:0.04;}</style></defs><g transform="translate(-1316 -132)"><rect class="a" width="40" height="40" rx="20" transform="translate(1316 132)"/><path class="b" d="M7.148,15.941a.939.939,0,0,0,.663.275h.035a.937.937,0,0,0,.676-.326l3.75-4.375a.937.937,0,0,0-1.423-1.221L7.759,13.9,6.6,12.741a.937.937,0,0,0-1.326,1.326ZM15,2.5H13.438V.938a.938.938,0,1,0-1.875,0V2.5H5.938V.938a.938.938,0,0,0-1.875,0V2.5H2.5A2.5,2.5,0,0,0,0,5V17.5A2.5,2.5,0,0,0,2.5,20H15a2.5,2.5,0,0,0,2.5-2.5V5A2.5,2.5,0,0,0,15,2.5Zm.625,15a.626.626,0,0,1-.625.625H2.5a.626.626,0,0,1-.625-.625V7.5h13.75Z" transform="translate(1327 142)"/>
                                </g>
                            </svg>
                            <span class="mr-2">براساس درآمد</span>
                        </v-tab>
                        <v-tab
                            class="profile-tab"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><defs><style>.a,.b{fill:#26264e;}.a{opacity:0.04;}</style></defs><g transform="translate(-1316 -132)"><rect class="a" width="40" height="40" rx="20" transform="translate(1316 132)"/><path class="b" d="M16,5a2.5,2.5,0,1,0-2.5-2.5A2.5,2.5,0,0,0,16,5Zm3.5,6.875H18.125V10.5a.5.5,0,0,0-.5-.5h-1.25a.5.5,0,0,0-.5.5v1.375H14.5a.5.5,0,0,0-.5.5v1.25a.5.5,0,0,0,.5.5h1.375V15.5a.5.5,0,0,0,.5.5h1.25a.5.5,0,0,0,.5-.5V14.125H19.5a.5.5,0,0,0,.5-.5v-1.25A.5.5,0,0,0,19.5,11.875ZM15.316,6a2.606,2.606,0,0,0-1.121.258,4.578,4.578,0,0,1,.049.492A4.213,4.213,0,0,1,13.207,9.5H15.2A1.364,1.364,0,0,1,16.25,9h1.5a1.366,1.366,0,0,1,1.052.5h.648A.569.569,0,0,0,20,8.916,2.838,2.838,0,0,0,17.247,6ZM10,10A3.25,3.25,0,1,0,6.775,6.75,3.227,3.227,0,0,0,10,10Zm0-5a1.75,1.75,0,1,1-1.75,1.75A1.751,1.751,0,0,1,10,5Zm4.878,10.125h-.5a1.373,1.373,0,0,1-1.15-.625H5.566a2.909,2.909,0,0,1,2.848-2h3.146A3.154,3.154,0,0,1,13,12.845v-.6a1.421,1.421,0,0,1,.34-.9A4.644,4.644,0,0,0,11.559,11H8.441A4.31,4.31,0,0,0,4,15.166.861.861,0,0,0,4.887,16H14.934a1.345,1.345,0,0,1-.059-.375ZM5.747,6.75a4.163,4.163,0,0,1,.05-.5A2.263,2.263,0,0,0,4.684,6H2.753A2.838,2.838,0,0,0,0,8.916.569.569,0,0,0,.551,9.5H6.785A4.209,4.209,0,0,1,5.747,6.75ZM4,5A2.5,2.5,0,1,0,1.5,2.5,2.5,2.5,0,0,0,4,5Z" transform="translate(1326 144)"/></g></svg>
                            <span class="mr-2">پراکندگی جنسیت و علل مراجعه</span>    
                        </v-tab>
                        <v-tab
                            class="profile-tab"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><defs><style>.a,.b{fill:#26264e;}.a{opacity:0.04;}</style></defs><g transform="translate(-1316 -132)"><rect class="a" width="40" height="40" rx="20" transform="translate(1316 132)"/><path class="b" d="M7,0A7,7,0,0,0,0,7c0,2.822.983,3.61,6.282,11.291a.875.875,0,0,0,1.437,0C13.016,10.609,14,9.822,14,7A7,7,0,0,0,7,0ZM7,16.253c-.645-.928-1.218-1.745-1.727-2.47C2.1,9.264,1.75,8.71,1.75,7a5.25,5.25,0,0,1,10.5,0c0,1.709-.349,2.263-3.523,6.785C8.218,14.478,7.645,15.327,7,16.253Zm0-12.2A2.917,2.917,0,1,0,9.917,6.967,2.917,2.917,0,0,0,7,4.051ZM7,8.167A1.167,1.167,0,1,1,8.167,7,1.17,1.17,0,0,1,7,8.167Z" transform="translate(1329 143)"/></g></svg>
                            <span class="mr-2">رده سنی و شهر بیماران</span>    
                        </v-tab>
                        <v-tab
                            class="profile-tab"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="40" 
                                height="40" 
                                viewBox="0 0 40 40"
                                >
                                <defs><style>.a,.b{fill:#26264e;}.a{opacity:0.04;}</style></defs><g transform="translate(-1316 -132)"><rect class="a" width="40" height="40" rx="20" transform="translate(1316 132)"/><path class="b" d="M7.148,15.941a.939.939,0,0,0,.663.275h.035a.937.937,0,0,0,.676-.326l3.75-4.375a.937.937,0,0,0-1.423-1.221L7.759,13.9,6.6,12.741a.937.937,0,0,0-1.326,1.326ZM15,2.5H13.438V.938a.938.938,0,1,0-1.875,0V2.5H5.938V.938a.938.938,0,0,0-1.875,0V2.5H2.5A2.5,2.5,0,0,0,0,5V17.5A2.5,2.5,0,0,0,2.5,20H15a2.5,2.5,0,0,0,2.5-2.5V5A2.5,2.5,0,0,0,15,2.5Zm.625,15a.626.626,0,0,1-.625.625H2.5a.626.626,0,0,1-.625-.625V7.5h13.75Z" transform="translate(1327 142)"/>
                                </g>
                            </svg>
                            <span class="mr-2">براساس بیمه</span>
                        </v-tab>
                    </v-tabs>
                </v-container>
                    <div
                        class="profile-tabs-box"
                    >
                    <v-tabs-items v-model="tabs">
                        <v-tab-item>
                            <appointments-report-component v-if="tabs == 0" />
                        </v-tab-item>
                        <v-tab-item>
                            <income-report-component v-if="tabs == 1"/>
                        </v-tab-item>
                        <v-tab-item>
                            <case-type-report-component v-if="tabs == 2"/>
                        </v-tab-item>
                        <v-tab-item>
                            <area-report-component v-if="tabs == 3"/>
                        </v-tab-item>
                        <v-tab-item>
                            <insurance-report-component v-if="tabs == 4"/>
                        </v-tab-item>
                    </v-tabs-items>
                </div>
            </div>
        </v-col>
    </v-row>
</v-container>
        
</template>

<script>
import AppointmentsReportComponent from '../../components/reports/AppointmentsReportComponent.vue';
import IncomeReportComponent from '../../components/reports/IncomeReportComponent.vue';
import CaseTypeReportComponent from '../../components/reports/CaseTypeReportComponent.vue'
import AreaReportComponent from '../../components/reports/AreaReportComponent.vue'
import InsuranceReportComponent from '../../components/reports/InsuranceReportComponent.vue'
export default {
    name: "ReportIndex",
    layout: "panel",
    middleware: 'auth',
    components: {
        AppointmentsReportComponent,
        IncomeReportComponent,
        CaseTypeReportComponent,
        AreaReportComponent,
        InsuranceReportComponent,
    },
    data() {
        return {
            tabs: null,
        }
    },
}
</script>

<style lang="scss" scoped>
.profile-tab {
    span {
        text-align: right;
        font: normal normal normal 12px/22px IRANYekanRegular;
        letter-spacing: 0px;
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