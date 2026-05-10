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
  form: null,
  forms: [],
  form_categories: [],
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setCategoryList(state, list) {
    state.categories = list
  },
  setForm(state, form) {
    state.form = form
  },
  setForms(state, forms) {
    state.forms = forms
  },
  setFormCategories(state, categories) {
    state.form_categories = categories
  },
}

export const actions = {
  getList(ctx, data) {
    return this.$axios.get(`/organizations/forms?page=${data.page}&q=${data.q}&organization_id=${data.organization_id}&category_id=${data.category_id}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getForms(ctx) {
    return this.$axios.get(`/organizations/forms`)
      .then(res => {
        const data = res.data.data;
        ctx.commit('setForms', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getForm(ctx, id) {
    return this.$axios.get(`/organizations/forms/${id}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setForm', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createForm(ctx, data) {
    return this.$axios.post(`/organizations/forms?`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateForm(ctx, data) {
    return this.$axios.put(`/organizations/forms/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeForm(ctx, id) {
    return this.$axios.delete(`/organizations/forms/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteForm(ctx, data) {
    return this.$axios.post(`/organizations/forms/delete`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createFormList(ctx, data) {
    return this.$axios.post(`/organizations/forms/create`, data)
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
  getFormCategories(ctx, id) {
    let url = `/categories`
    if (id) {
      url += `?organization_id=${id}`
    }
    return this.$axios.get(url)
      .then(res => {
        const data = res.data.data;
        ctx.commit('setFormCategories', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getFormCategory(ctx, id) {
    return this.$axios.get(`/categories/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createFormCategory(ctx, data) {
    return this.$axios.post(`/categories?`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateFormCategory(ctx, data) {
    return this.$axios.put(`/categories/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeFormCategory(ctx, id) {
    return this.$axios.delete(`/categories/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteFormCategory(ctx, data) {
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
  getForm(state) {
    return state.form
  },
  getForms(state) {
    return state.forms
  },
  getCategoryList(state) {
    return state.categories
  },
  getFormCategories(state) {
    return state.form_categories
  },
}
