require('whatwg-fetch')
export const state = () => ({
  radiologyList: [],
  photographyList: [],
  relationDoctorList: [],
  referedDoctorList: [],
  organization: null,
  workHour: {
    start: '',
    end: '',
    period: 15,
    organization_id: 0,
  },
  surgeryWorkHour: {
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
  setReferedDoctorList(state, referedDoctorList) {
    state.referedDoctorList = referedDoctorList
  },
  setOrganizationWorkHour(state, workHour) {
    state.workHour = {
      start: workHour.start,
      end: workHour.end,
      period: parseInt(workHour.period),
      organization_id: workHour.organization_id,
    }
  },
  setOrganizationSurgeryWorkHour(state, workHour) {
    state.surgeryWorkHour = {
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
  getOrganizationSurgeryWorkHour(ctx, id) {
    return this.$axios.get(`/organizations/${id}/work/surgery`)
      .then(res => {
        const data = res.data;
        ctx.commit('setOrganizationSurgeryWorkHour', data)
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
        const data = res.data;
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
        const data = res.data;
        ctx.commit('setOrganizationWorkHour', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateOrganizationSurgeryWorkHour(ctx, data) {
    return this.$axios.put(`/organizations/${data.organization_id}/work/surgery`, data)
      .then(res => {
        const data = res.data;
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
        const data = res.data;
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getCardToCard(ctx, data) {
    return this.$axios.get(`/organizations/payments?page=${data.page}&limit=${data.limit}`, data)
      .then(res => {
        const data = res.data;
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getReferedDoctorList(ctx, profession_id) {
    return this.$axios.get(`/organizations/professional?profession_id=${profession_id}`)
      .then(res => {
        const data = res.data.data;
        ctx.commit('setReferedDoctorList', data)
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
  getReferedDoctorList(state) {
    return state.referedDoctorList
  },
  getOrganization(state) {
    return state.organization
  },
  getOrganizationWorkHour(state) {
    return state.workHour
  },
}
