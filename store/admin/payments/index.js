import {commit} from "lodash/seq";

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
      total: 0
    }
  },
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
}

export const actions = {
  getList(ctx, data) {
    return this.$axios.get(`/admin/payments?page=${data.page}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  acceptOrReject(ctx, data) {
    return this.$axios.post(`/admin/payments/accept`, data)
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
}
