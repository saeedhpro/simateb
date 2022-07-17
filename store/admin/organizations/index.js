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
  sliders: [],
  organizationsByProfession: {
    laboratories: [],
    radiologies: [],
    photographies: [],
    doctors: [],
  },
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setSliders(state, sliders) {
    state.sliders = sliders
  },
  setOrganization(state, organization) {
    state.organization = organization
  },
  setOrganizations(state, organizations) {
    state.organizations = organizations
  },
  setOrganizationsByProfession(state, organizations) {
    state.organizationsByProfession = organizations
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
  getSliders(ctx, id) {
    ctx.commit('setSliders', [])
    return this.$axios.get(`/admin/organizations/${id}/sliders`)
      .then(res => {
        const data = res.data;
        ctx.commit('setSliders', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  addSliders(ctx, data) {
    return this.$axios.post(`/admin/organizations/${data.id}/sliders`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizationsByProfession(ctx, id) {
    return this.$axios.get(`/admin/organizations/${id}/prof`)
      .then(res => {
        const data = res.data;
        ctx.commit('setOrganizationsByProfession', data)
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
  updateOrganization(ctx, data) {
    return this.$axios.put(`/admin/organizations/${data.id}`, data)
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
  getSliders(state) {
    return state.sliders
  },
  getOrganization(state) {
    return state.organization
  },
  getOrganizations(state) {
    return state.organizations
  },
  getOrganizationsByProfession(state) {
    return state.organizationsByProfession
  },
}
