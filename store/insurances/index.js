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
  own_insurances: [],
  own_insurance_list: {
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
  user_insurances: [],
  user_insurance_list: {
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
  setInsurance(state, insurance) {
    state.insurance = insurance
  },
  setInsurances(state, insurances) {
    state.insurances = insurances
  },
  setOwnInsurances(state, insurances) {
    state.own_insurances = insurances
  },
  setOwnInsuranceList(state, insurances) {
    state.own_insurance_list = insurances
  },
  setUserInsurances(state, insurances) {
    state.user_insurances = insurances
  },
  setUserInsuranceList(state, insurances) {
    state.user_insurance_list = insurances
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
  getInsurances(ctx, is_active) {
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
  },
  getOwnInsurances(ctx, data) {
    const d = Object.entries(data);
    const arr = [];
    for (let i = 0; i < d.length; i++) {
      if (d[i][1]) {
        arr.push(`${d[i][0]}=${d[i][1]}`)
      }
    }
    return this.$axios.get(`/organizations/insurances?${arr.join('&')}`)
      .then(res => {
        const insurances = res.data;
        if (data.page) {
          ctx.commit('setOwnInsuranceList', insurances)
        } else {
          ctx.commit('setOwnInsurances', insurances.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createOwnInsurance(ctx, data) {
    return this.$axios.post(`/organizations/insurances?`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateOwnInsurance(ctx, data) {
    return this.$axios.put(`/organizations/insurances/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeOwnInsurance(ctx, id) {
    return this.$axios.delete(`/organizations/insurances/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteOwnInsurance(ctx, data) {
    return this.$axios.post(`/organizations/insurances/delete`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUserIndexInsurances(ctx, data) {
    return this.$axios.get(`/users/${data.id}/insurances`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUserInsurances(ctx, data) {
    const d = Object.entries(data);
    const arr = [];
    for (let i = 0; i < d.length; i++) {
      if (d[i][1]) {
        arr.push(`${d[i][0]}=${d[i][1]}`)
      }
    }
    return this.$axios.get(`/insurances?${arr.join('&')}`)
      .then(res => {
        const insurances = res.data;
        if (data.page) {
          ctx.commit('setUserInsuranceList', insurances)
        } else {
          ctx.commit('setUserInsurances', insurances.data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createUserInsurance(ctx, data) {
    return this.$axios.post(`/insurances?`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateUserInsurance(ctx, data) {
    return this.$axios.put(`/insurances/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeUserInsurance(ctx, id) {
    return this.$axios.delete(`/insurances/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteUserInsurance(ctx, data) {
    return this.$axios.post(`/insurances/delete`, data)
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
  getOwnInsurances(state) {
    return state.own_insurances
  },
  getOwnInsuranceList(state) {
    return state.own_insurance_list
  },
  getUserInsurances(state) {
    return state.user_insurances
  },
  getUserInsuranceList(state) {
    return state.user_insurance_list
  },
}
