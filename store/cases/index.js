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
  case_type: null,
  case_types: []
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setCaseTypes(state, caseTypes) {
    state.case_types = caseTypes
  },
  setCaseType(state, caseType) {
    state.case_type = caseType
  },
}

export const actions = {
  getList(ctx, data) {
    return this.$axios.get(`/organizations/cases?page=${data.page}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getCaseTypes(ctx, data) {
    return this.$axios.get(`/organizations/cases`)
      .then(res => {
        const data = res.data;
        ctx.commit('setCaseTypes', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getCaseType(ctx, id) {
    return this.$axios.get(`/cases/${id}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setCaseType', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createCaseType(ctx, data) {
    return this.$axios.post(`/organizations/cases?`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateCaseType(ctx, data) {
    return this.$axios.put(`/cases/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeCaseType(ctx, id) {
    return this.$axios.delete(`/cases/${id}`)
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
  getCaseTypes(state) {
    return state.case_types
  },
  getCaseType(state) {
    return state.case_type
  }
}
