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
      total: 0,
    }
  },
  total: {
    total: 0,
    due_total: 0,
  },
  price: {
    patient_price: 0,
    insurance_price: 0,
    discount_price: 0,
  }
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setUserPaymentsTotal(state, total) {
    state.total = total
  },
  getUserPriceTotal(state, price) {
    state.price = price
  },
}

export const actions = {
  getList(ctx, data) {
    return this.$axios.get(`/users/${data.id}/payments?page=${data.page}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUserPaymentsTotal(ctx, id) {
    return this.$axios.get(`/users/${id}/payments/total`)
      .then(res => {
        const data = res.data;
        ctx.commit('setUserPaymentsTotal', data)
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUserPriceTotal(ctx, id) {
    return this.$axios.get(`/users/${id}/prices/total`)
      .then(res => {
        const data = res.data;
        ctx.commit('getUserPriceTotal', data)
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createPayment(ctx, data) {
    return this.$axios.post(`/payments`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updatePayment(ctx, data) {
    return this.$axios.put(`/payments/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deletePayments(ctx, data) {
    return this.$axios.post(`/payments/delete`, data)
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
  getUserPaymentsTotal(state) {
    return state.total
  },
  getPrice(state) {
    return state.price
  },
}
