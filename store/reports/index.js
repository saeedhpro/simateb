require('whatwg-fetch')
export const state = () => ({
})

export const mutations = {
  setAppointmentReports(state, reports) {
    state.appointment_reports = reports
  },
  setIncomeReports(state, reports) {
    state.income_reports = reports
  },
}

export const actions = {
  getAppointmentReports(ctx, data) {
    return this.$axios.post(`/organizations/reports`, data)
      .then(res => {
        console.log(res, "res");
        // ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getIncomeReports(ctx, data) {
    
    // ctx.commit('setIncomeReports', report)
    // return this.$axios.post(`/organizations/reports`, data)
    //   .then(res => {
    //     console.log(res, "res");
        
    //     return Promise.resolve(res)
    //   })
    //   .catch(err => {
    //     return Promise.reject(err)
    //   })
  },
}

export const getters = {
  getAppointmentReports(state) {
    return state.appointment_reports
  },
  getIncomeReports(state) {
    return state.income_reports
  },
}
