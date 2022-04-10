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
  appointment: null
})

export const mutations = {
  setList(state, list) {
    state.list = list
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
  }
}

export const getters = {
  getList(state) {
    return state.list
  },
  getUser(state) {
    return state.user
  }
}
