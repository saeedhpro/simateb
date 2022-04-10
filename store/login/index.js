require('whatwg-fetch')
export const state = () => ({
  token: null,
  user: null
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  login(ctx, data) {
    return this.$axios.post('/auth/login', data)
      .then(res => {
        const data = res.data;
        ctx.commit('setToken', data.token)
        ctx.commit('setUser', data.user)
        this.$cookies.set('access_token', data.token)
        this.$axios.setHeader('Authorization', `Bearer ${data.token}`)
        return Promise.resolve(res)
      })
      .catch(err => {
        ctx.commit('setToken', null)
        ctx.commit('setUser', null)
        this.$axios.setHeader('Authorization', `Bearer`)
        this.$cookies.set('access_token', null)
        return Promise.reject(err)
      })
  },
  exit(ctx) {
    ctx.commit('setToken', null)
    ctx.commit('setUser', null)
    this.$axios.setHeader('Authorization', `Bearer`)
    this.$cookies.set('access_token', null)
  }
}

export const getters = {
  getToken(state) {
    return state.token
  },
  getUser(state) {
    return state.user
  }
}
