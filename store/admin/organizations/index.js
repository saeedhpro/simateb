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
  organization: null,
  organizations: [],
  sliders: [],
  image_samples: [],
  video_samples: [],
  organizationsByProfession: {
    laboratories: [],
    radiologies: [],
    photographies: [],
    doctors: [],
  },
  faqs: {
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
  setSliders(state, sliders) {
    state.sliders = sliders
  },
  setImageSamples(state, sliders) {
    state.image_samples = sliders
  },
  setVideoSamples(state, sliders) {
    state.video_samples = sliders
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
  setFaqList(state, faqs) {
    state.faqs = faqs
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
        const data = res.data.data;
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
  getImageSamples(ctx, id) {
    ctx.commit('setImageSamples', [])
    return this.$axios.get(`/admin/organizations/${id}/samples?type=image`)
      .then(res => {
        const data = res.data;
        ctx.commit('setImageSamples', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getVideoSamples(ctx, id) {
    ctx.commit('setVideoSamples', [])
    return this.$axios.get(`/admin/organizations/${id}/samples?type=video`)
      .then(res => {
        const data = res.data;
        ctx.commit('setVideoSamples', data)
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
    return this.$axios.get(`/admin/organizations/${id}/profession`)
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
    return this.$axios.post(`/admin/organizations`, data)
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
  },
  deleteOrganizationFaqs(ctx, data) {
    return this.$axios.post(`/admin/organizations/faqs/deletes`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizationFaqs(ctx, data) {
    ctx.commit('setFaqList', {
      data: [],
      limit: 10,
      page: 1,
      sort: '',
      meta: {
        total: 0,
      },
      total_rows: 0,
      total_pages: 0
    })
    const d = Object.entries(data);
    const arr = [];
    for (let i = 0; i < d.length; i++) {
      if (d[i][1]) {
        arr.push(`${d[i][0]}=${d[i][1]}`)
      }
    }
    return this.$axios.get(`/organizations/${data.organization_id}/faqs?${arr.join('&')}`, data)
      .then(res => {
        ctx.commit('setFaqList', res.data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createOrganizationFaq(ctx, data) {
    return this.$axios.post(`/admin/organizations/faqs`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateOrganizationFaq(ctx, data) {
    return this.$axios.put(`/admin/organizations/faqs/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getSampleCategories(ctx, data) {
    const d = Object.entries(data);
    const arr = [];
    for (let i = 0; i < d.length; i++) {
      if (d[i][1]) {
        arr.push(`${d[i][0]}=${d[i][1]}`)
      }
    }
    return this.$axios.get(`/admin/organizations/${data.id}/categories?${arr.join('&')}`)
      .then(res => {
        const data = res.data;
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteOrganizationCategories(ctx, data) {
    return this.$axios.post(`/admin/organizations/${data.id}/categories/deletes`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createOrganizationCategories(ctx, data) {
    return this.$axios.post(`/admin/organizations/${data.id}/categories`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateOrganizationCategory(ctx, data) {
    return this.$axios.put(`/admin/organizations/${data.organization_id}/categories/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizationCategory(ctx, data) {
    return this.$axios.get(`/admin/organizations/${data.organization_id}/categories/${data.id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getSampleItems(ctx, data) {
    return this.$axios.get(`/admin/categories/${data.id}/samples?page=${data.page}&limit=${data.limit}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteOrganizationItems(ctx, data) {
    return this.$axios.post(`/admin/samples/deletes`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createOrganizationSample(ctx, data) {
    return this.$axios.post(`/admin/samples`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
    updateOrganizationSample(ctx, data) {
    return this.$axios.put(`/admin/samples/${data.id}`, data)
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
  getOrganizationFaqs(state) {
    return state.faqs
  },
  getImageSamples(state) {
    return state.image_samples
  },
  getVideoSamples(state) {
    return state.video_samples
  },
}
