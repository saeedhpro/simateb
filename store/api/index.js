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
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
}

export const actions = {
  getApiKeysList(ctx, data) {
    return this.$axios.get(`/admin/organizations/${data.id}/keys?page=${data.page}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createApiKey(ctx, data) {
    return this.$axios.post(`/key?`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteApiKeys(ctx, data) {
    return this.$axios.post(`/admin/organizations/${data.id}/keys/delete?`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateApiKey(ctx, data) {
    return this.$axios.put(`/users/${data.id}`, data)
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
