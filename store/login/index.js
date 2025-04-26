import {NotFoundError} from "core-js/internals/dom-exception-constants";

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
  },
  setOrganizationCases(state, cases) {
    state.user.organization.case_type = cases
  }
}

export const actions = {
  login(ctx, data) {
    return this.$axios.post('/auth/login', data)
      .then(res => {
        const data = res.data.data;
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
  resetPassword(ctx, data) {
    return this.$axios.post('/password', data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  verifyResetPassword(ctx, data) {
    return this.$axios.post('/password/verify', data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  changePassword(ctx, data) {
    return this.$axios.post('/password/change', data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  exit(ctx) {
    ctx.commit('setToken', null)
    ctx.commit('setUser', null)
    this.$axios.setHeader('Authorization', `Bearer`)
    this.$cookies.set('access_token', null)
  },
}

export const getters = {
  getToken(state) {
    return state.token
  },
  getUser(state) {
    return state.user
  }
}
