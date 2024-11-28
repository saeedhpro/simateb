require('whatwg-fetch')
export const state = () => ({
  list: {
    data: [],
    limit: 10,
    page: 1,
    sort: '',
    total_rows: 0,
    total_pages: 0,
    meta: {
      total: 0,
      last_page: 1,
    }
  },
  priceList: {
    data: [],
    limit: 10,
    page: 1,
    sort: '',
    total_rows: 0,
    total_pages: 0,
    meta: {
      total: 0,
      last_page: 1,
    }
  },
  appointment: null,
  que: {
    default_duration: 20,
    limits: [],
    ques: [],
    work_hour: {
      start: '15:00:00',
      end: '20:00:00',
    }
  },
  results: [],
  allResults: [],
  referedResults: [],
  referedAppointments: {
    data: [],
    limit: 10,
    page: 1,
    sort: '',
    total_rows: 0,
    total_pages: 0,
    meta: {
      total: 0,
      last_page: 1,
    }
  },
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setQue(state, que) {
    state.que = que
  },
  setAppointment(state, user) {
    state.user = user
  },
  setResults(state, results) {
    state.results = results
  },
  removeResult(state, data) {
    state.results = state.results.filter(i => i != data.image)
  },
  setReferedResults(state, results) {
    state.referedResults = results
  },
  setAllResults(state, results) {
    state.allResults = results
  },
  setPriceList(state, priceList) {
    state.priceList = priceList
  },
  setReferedAppointments(state, appointments) {
    state.referedAppointments = appointments
  }
}

export const actions = {
  getUserAppointmentsList(ctx, data) {
    return this.$axios.get(`/users/${data.id}/appointments?page=${data.page}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizationAppointmentsList(ctx, data) {
    const d = Object.entries(data);
    const arr = [];
    for (let i = 0; i < d.length; i++) {
      if (d[i][1]) {
        arr.push(`${d[i][0]}=${d[i][1]}`)
      }
    }
    ctx.commit('setList', {
      data: [],
      limit: 10,
      page: 1,
      sort: '',
      total_rows: 0,
      total_pages: 0,
      meta: {
        total: 0,
      }
    })
    return this.$axios.get(`/organizations/appointments?${arr.join('&')}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getAppointment(ctx, id) {
    return this.$axios.get(`/appointments/${id}`)
      .then(res => {
        const data = res.data;
        // ctx.commit('setAppointment', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getLastPrescriptions(ctx, id) {
    return this.$axios.get(`/appointments/${id}/prescriptions`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getAppointmentResults(ctx, data) {
    ctx.commit('setResults', [])
    return this.$axios.get(`/appointments/${data.id}/results?type=${data.type}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setResults', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUserAppointmentResults(ctx, id) {
    ctx.commit('setAllResults', [])
    return this.$axios.get(`/users/${id}/appointments/results`)
      .then(res => {
        const data = res.data;
        ctx.commit('setAllResults', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeResult(ctx, data) {
    ctx.commit('removeResult', data)
  },
  getAppointmentReferedResults(ctx, data) {
    return this.$axios.get(`/appointments/${data.id}/results/refered`)
      .then(res => {
        const data = res.data;
        ctx.commit('setReferedResults', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getAppointmentPrescription(ctx, id) {
    return this.$axios.get(`/appointments/${id}/prescription`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getQue(ctx, data) {
    return this.$axios.get(`/appointments/que?start=${data.start}&end=${data.end}&ct=${data.case_type}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setQue', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getQueV2(ctx, data) {
    return this.$axios.get(`/appointments/que/v2?start=${data.start}&end=${data.end}&ct=${data.case_type}`)
      .then(res => {
        // const data = res.data;
        // ctx.commit('setQue', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getQueV3(ctx, data) {
    return this.$axios.get(`/appointments/que/v3?start=${data.start}&end=${data.end}&ct=${data.case_type}`)
      .then(res => {
        // const data = res.data;
        // ctx.commit('setQue', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  search(ctx, data) {
    ctx.commit('setList', {
      data: [],
      limit: 10,
      page: 1,
      sort: '',
      total_rows: 0,
      total_pages: 0,
      meta: {
        total: 0,
      }
    },)
    const d = Object.entries(data);
    const arr = [];
    for (let i = 0; i < d.length; i++) {
      if (d[i][1]) {
        arr.push(`${d[i][0]}=${d[i][1]}`)
      }
    }
    return this.$axios.get(`/appointments/search?${arr.join('&')}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createAppointment(ctx, data) {
    return this.$axios.post('/organizations/appointments', data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  reserveAppointmentForDoctor(ctx, data) {
    return this.$axios.post('/organizations/appointments/reserve', data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createAppointmentAppCode(ctx, id) {
    return this.$axios.post(`/appointments/${id}/appcode`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createAppointmentCode(ctx, id) {
    return this.$axios.post(`/appointments/${id}/code`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateAppointment(ctx, data) {
    return this.$axios.put(`/appointments/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  sendDescAppointment(ctx, data) {
    return this.$axios.patch(`/appointments/${data.id}/desc`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  sendAppointmentResults(ctx, data) {
    return this.$axios.post(`/appointments/${data.id}/result`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  acceptAppointment(ctx, data) {
    return this.$axios.post(`/appointments/${data.id}/accept`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  acceptedAppointment(ctx, id) {
    return this.$axios.post(`/appointments/${id}/accepted`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  cancelAppointment(ctx, data) {
    return this.$axios.post(`/appointments/${data.id}/cancel`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  canceledAppointment(ctx, id) {
    return this.$axios.post(`/appointments/${id}/canceled`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  reserveAppointment(ctx, data) {
    return this.$axios.post(`/appointments/${data.id}/reserve`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  doWaiting(ctx, data) {
    return this.$axios.post(`/appointments/${data.id}/waiting`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteAppointments(ctx, data) {
    return this.$axios.post(`/appointments/delete`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getPriceList(ctx, data) {
    return this.$axios.get(`/users/${data.id}/prices?page=${data.page}`)
      .then(res => {
        const data = res.data
        ctx.commit('setPriceList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getReferedAppointments(ctx, data) {
    const d = Object.entries(data);
    const arr = [];
    for (let i = 0; i < d.length; i++) {
      if (d[i][1]) {
        arr.push(`${d[i][0]}=${d[i][1]}`)
      }
    }
    ctx.commit('setReferedAppointments', {
      data: [],
      limit: 10,
      page: 1,
      sort: '',
      total_rows: 0,
      total_pages: 0,
      meta: {
        total: 0,
      }
    })
    return this.$axios.get(`/organizations/appointments/refered?${arr.join('&')}`)
      .then(res => {
        const data = res.data
        ctx.commit('setReferedAppointments', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getList(state) {
    return state.list
  },
  getUser(state) {
    return state.user
  },
  getQue(state) {
    return state.que
  },
  getResults(state) {
    return state.results
  },
  getAllResults(state) {
    return state.allResults
  },
  getReferedResults(state) {
    return state.referedResults
  },
  getReferedAppointments(state) {
    return state.referedAppointments
  },
  getPriceList(state) {
    return state.priceList
  }
}
