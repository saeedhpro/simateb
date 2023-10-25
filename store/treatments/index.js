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
  categories: {
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
  treatment: null,
  treatments: [],
  treatment_categories: [],
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setCategoryList(state, list) {
    state.categories = list
  },
  setTreatment(state, treatment) {
    state.treatment = treatment
  },
  setTreatments(state, treatments) {
    state.treatments = treatments
  },
  setTreatmentCategories(state, categories) {
    state.treatment_categories = categories
  },
}

export const actions = {
  getList(ctx, data) {
    return this.$axios.get(`/treatments?page=${data.page}&q=${data.q}&organization_id=${data.organization_id}&category_id=${data.category_id}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getTreatments(ctx) {
    return this.$axios.get(`/treatments`)
      .then(res => {
        const data = res.data.data;
        ctx.commit('setTreatments', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getTreatment(ctx, id) {
    return this.$axios.get(`/treatments/${id}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setTreatment', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createTreatment(ctx, data) {
    return this.$axios.post(`/treatments?`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateTreatment(ctx, data) {
    return this.$axios.put(`/treatments/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeTreatment(ctx, id) {
    return this.$axios.delete(`/treatments/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteTreatment(ctx, data) {
    return this.$axios.post(`/treatments/delete`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createTreatmentList(ctx, data) {
    return this.$axios.post(`/treatments/create`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getCategory(ctx, id) {
    return this.$axios.get(`/categories/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getCategoryList(ctx, data) {
    return this.$axios.get(`/categories?page=${data.page}&q=${data.q}&organization_id=${data.organization_id}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setCategoryList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getTreatmentCategories(ctx) {
    return this.$axios.get(`/categories`)
      .then(res => {
        const data = res.data.data;
        ctx.commit('setTreatmentCategories', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getTreatmentCategory(ctx, id) {
    return this.$axios.get(`/categories/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createTreatmentCategory(ctx, data) {
    return this.$axios.post(`/categories?`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateTreatmentCategory(ctx, data) {
    return this.$axios.put(`/categories/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeTreatmentCategory(ctx, id) {
    return this.$axios.delete(`/categories/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteTreatmentCategory(ctx, data) {
    return this.$axios.post(`/categories/delete`, data)
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
  getTreatment(state) {
    return state.treatment
  },
  getTreatments(state) {
    return state.treatments
  },
  getCategoryList(state) {
    return state.categories
  },
  getTreatmentCategories(state) {
    return state.treatment_categories
  },
}
