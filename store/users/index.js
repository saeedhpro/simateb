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
  user: null
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  getList(ctx, data) {
    return this.$axios.get(`/organizations/users?page=${data.page}&q=${data.q}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOwn(ctx) {
    return this.$axios.get(`/own`)
      .then(res => {
        const data = res.data;
        console.log(data)
        // ctx.commit('setUser', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUser(ctx, id) {
    return this.$axios.get(`/users/${id}`)
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
