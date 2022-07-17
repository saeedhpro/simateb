require('whatwg-fetch')
export const state = () => ({
  onlineUsers: [],
  onlinePatients: [],
  users: [],
  list: {
    data: [],
    limit: 10,
    page: 1,
    sort: '',
    total_rows: 0,
    total_pages: 0
  }
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setUsers(state, users) {
    state.users = users
  },
  setOnlineUsers(state, onlineUsers) {
    state.onlineUsers = onlineUsers
  },
  setOnlinePatients(state, onlinePatients) {
    state.onlinePatients = onlinePatients
  },
}

export const actions = {
  getList(ctx, data) {
    return this.$axios.get(`/admin/users?page=${data.page}&q=${data.q}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUsers(ctx,) {
    return this.$axios.get(`/admin/users`)
      .then(res => {
        const data = res.data;
        ctx.commit('setUsers', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createUser(ctx, data) {
    return this.$axios.post(`/admin/users`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOnlineUsers(ctx) {
    return this.$axios.get(`/admin/users/online`)
      .then(res => {
        const data = res.data;
        ctx.commit('setOnlineUsers', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOnlinePatients(ctx) {
    return this.$axios.get(`/admin/patients/online`)
      .then(res => {
        const data = res.data;
        ctx.commit('setOnlinePatients', data)
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
  getUsers(state) {
    return state.users
  },
  getOnlineUsers(state) {
    return state.onlineUsers
  },
  getOnlinePatients(state) {
    return state.onlinePatients
  },
}
