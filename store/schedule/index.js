require('whatwg-fetch')
export const state = () => ({
  list: {
    data: [],
    limit: 10,
    page: 1,
    sort: '',
    meta: {
      total: 0,
    },
    total_rows: 0,
    total_pages: 0
  },
  schedule: null,
  schedules: []
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setSchedules(state, schedules) {
    state.schedules = schedules
  },
  setSchedule(state, schedule) {
    state.schedule = schedule
  },
}

export const actions = {
  getList(ctx, data) {
    return this.$axios.get(`/organizations/schedules?page=${data.page}&date=${data.date}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getSchedules(ctx, data) {
    return this.$axios.get(`/organizations/schedules`)
      .then(res => {
        const data = res.data;
        ctx.commit('setSchedules', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  setSchedule(ctx, id) {
    return this.$axios.get(`/schedules/${id}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setSchedule', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createSchedule(ctx, data) {
    return this.$axios.post(`/organizations/schedules?`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateSchedule(ctx, data) {
    return this.$axios.put(`/organizations/schedules/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeSchedule(ctx, id) {
    return this.$axios.delete(`/schedules/${id}`)
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
  getSchedules(state) {
    return state.schedules
  },
  getSchedule(state) {
    return state.schedule
  }
}
