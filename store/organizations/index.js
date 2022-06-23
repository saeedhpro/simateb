require('whatwg-fetch')
export const state = () => ({
  radiologyList: [],
  photographyList: [],
  organization: null,
})

export const mutations = {
  setRadiologyList(state, radiologyList) {
    state.radiologyList = radiologyList
  },
  setPhotographyList(state, photographyList) {
    state.photographyList = photographyList
  },
  setOrganization(state, organization) {
    state.organization = organization
  },
}

export const actions = {
  getList(ctx, type) {
    return this.$axios.get(`/organizations/type?type=${type}`)
      .then(res => {
        const data = res.data;
        if (type === 'radiology') {
          ctx.commit('setRadiologyList', data)
        } else if (type === 'photography') {
          ctx.commit('setPhotographyList', data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganization(ctx, id) {
    return this.$axios.get(`/organizations/${id}`)
      .then(res => {
        const data = res.data;
          ctx.commit('setOrganization', data)
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
  getOrganization(state) {
    return state.organization
  },
}
