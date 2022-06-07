require('whatwg-fetch')
export const state = () => ({
  list: {
    data: [],
    limit: 10,
    page: 1,
    sort: '',
    total_rows: 0,
    total_pages: 0
  },
  appointment: null,
  que: {
    default_duration: 20,
    limits: [],
    ques: [],
    work_hour: {
      start: '16:00:00',
      end: '21:00:00',
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
    return this.$axios.get(`/organizations/appointments?start=${data.start}&end=${data.end}&page=${data.page}`)
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
        console.log(data)
        ctx.commit('setUser', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getQue(ctx, data) {
    return this.$axios.get(`/appointments/que?start=${data.start}&end=${data.end}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setQue', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  search(ctx, data) {
    let route = `/appointments/search?start=${data.start}&end=${data.end}&q=${data.q}&page=${data.page}`
    if (data.status) {
      route += `&status=${data.status}`
    }
    return this.$axios.get(route)
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
    return this.$axios.post('/organizations/appointments?', data)
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
  cancelAppointment(ctx, data) {
    return this.$axios.post(`/appointments/${data.id}/cancel`, data)
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
  }
}
