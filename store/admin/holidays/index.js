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
  holiday: null,
  holidays: [],
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setMessage(state, holiday) {
    state.holiday = holiday
  },
  setMessages(state, holidays) {
    state.holidays = holidays
  },
}

export const actions = {
  getList(ctx, data) {
    return this.$axios.get(`/admin/holidays?page=${data.page}&q=${data.q}&start=${data.start}&end=${data.end}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getHolidays(ctx) {
    return this.$axios.get(`/admin/holidays`)
      .then(res => {
        const data = res.data;
        ctx.commit('setHolidays', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getHoliday(ctx, id) {
    return this.$axios.get(`/admin/holidays/${id}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setHoliday', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createHoliday(ctx, data) {
    return this.$axios.post(`/admin/holidays?`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateHoliday(ctx, data) {
    return this.$axios.put(`/admin/holidays/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeHoliday(ctx, id) {
    return this.$axios.delete(`/admin/holidays/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteHoliday(ctx, data) {
    return this.$axios.post(`/admin/holidays/delete`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

export const getters = {
  getList(state) {
    return state.list
  },
  getHoliday(state) {
    return state.holiday
  },
  getHolidays(state) {
    return state.holidays
  },
}
