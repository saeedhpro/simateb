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
  insurance: null,
  insurances: [],
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setInsurance(state, insurance) {
    state.insurance = insurance
  },
  setInsurances(state, insurances) {
    state.insurances = insurances
  },
}

export const actions = {
  getList(ctx, data) {
    return this.$axios.get(`/admin/insurances?page=${data.page}&q=${data.q}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getInsurances(ctx) {
    return this.$axios.get(`/admin/insurances`)
      .then(res => {
        const data = res.data.data;
        ctx.commit('setInsurances', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getInsurance(ctx, id) {
    return this.$axios.get(`/admin/insurances/${id}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setInsurance', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createInsurance(ctx, data) {
    return this.$axios.post(`/admin/insurances?`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateInsurance(ctx, data) {
    return this.$axios.put(`/admin/insurances/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeInsurance(ctx, id) {
    return this.$axios.delete(`/admin/insurances/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteInsurance(ctx, data) {
    return this.$axios.post(`/admin/insurances/delete`, data)
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
  getInsurance(state) {
    return state.insurance
  },
  getInsurances(state) {
    return state.insurances
  },
}
