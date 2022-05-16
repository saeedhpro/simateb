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
  organization: null,
  organizations: [],
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setOrganization(state, organization) {
    state.organization = organization
  },
  setOrganizations(state, organizations) {
    state.organizations = organizations
  },
}

export const actions = {
  getList(ctx, data) {
    return this.$axios.get(`/admin/organizations?page=${data.page}&q=${data.q}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizations(ctx) {
    return this.$axios.get(`/admin/organizations`)
      .then(res => {
        const data = res.data;
        ctx.commit('setOrganizations', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganization(ctx, id) {
    return this.$axios.get(`/admin/organizations/${id}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setOrganization', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createOrganization(ctx, data) {
    return this.$axios.post(`/admin/organizations?`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeOrganization(ctx, id) {
    return this.$axios.delete(`/admin/organizations/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteOrganizations(ctx, data) {
    return this.$axios.post(`/admin/organizations/delete`, data)
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
  getOrganization(state) {
    return state.organization
  },
  getOrganizations(state) {
    return state.organizations
  },
}
