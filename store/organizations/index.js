require('whatwg-fetch')
export const state = () => ({
  radiologyList: [],
  photographyList: [],
  relationDoctorList: [],
  organization: null,
  workHour: {
    start: '',
    end: '',
    period: 15,
    organization_id: 0,
  },
})

export const mutations = {
  setRadiologyList(state, radiologyList) {
    state.radiologyList = radiologyList
  },
  setPhotographyList(state, photographyList) {
    state.photographyList = photographyList
  },
  setRelationDoctorList(state, doctorList) {
    state.relationDoctorList = doctorList
  },
  setOrganization(state, organization) {
    state.organization = organization
  },
  setOrganizationWorkHour(state, workHour) {
    state.workHour = {
      start: workHour.start,
      end: workHour.end,
      period: parseInt(workHour.period),
      organization_id: workHour.organization_id,
    }
  },
}

export const actions = {
  getList(ctx, type) {
    return this.$axios.get(`/organizations/type?type=${type}`)
      .then(res => {
        const data = res.data.data;
        if (type === 'radiology') {
          ctx.commit('setRadiologyList', data)
        } else if (type === 'photography') {
          ctx.commit('setPhotographyList', data)
        } else if (type === 'doctor') {
          ctx.commit('setRelationDoctorList', data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganization(ctx, id) {
    ctx.commit('setOrganization', null)
    return this.$axios.get(`/organizations/${id}`)
      .then(res => {
        const data = res.data.data;
          ctx.commit('setOrganization', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizationWorkHour(ctx, id) {
    return this.$axios.get(`/organizations/${id}/work`)
      .then(res => {
        const data = res.data;
        ctx.commit('setOrganizationWorkHour', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateOrganizationAbout(ctx, data) {
    return this.$axios.put(`/organizations/${data.id}/about`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateOrganizationCases(ctx, data) {
    return this.$axios.put(`/organizations/${data.id}/cases`, data)
      .then(res => {
        ctx.commit('login/setOrganizationCases', data.cases);
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateOrganizationWorkHour(ctx, data) {
    return this.$axios.put(`/organizations/${data.organization_id}/work`, data)
      .then(res => {
        ctx.commit('setOrganizationWorkHour', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createCardToCard(ctx, data) {
    return this.$axios.post(`/organizations/payments`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getRadiologyList(state) {
    return state.radiologyList
  },
  getPhotographyList(state) {
    return state.photographyList
  },
  getRelationDoctorList(state) {
    return state.relationDoctorList
  },
  getOrganization(state) {
    return state.organization
  },
  getOrganizationWorkHour(state) {
    return state.workHour
  },
}
