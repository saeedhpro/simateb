require('whatwg-fetch')
export const state = () => ({
  radiologyList: [],
  photographyList: [],
})

export const mutations = {
  setRadiologyList(state, radiologyList) {
    state.radiologyList = radiologyList
  },
  setPhotographyList(state, photographyList) {
    state.photographyList = photographyList
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
}

export const getters = {
  getRadiologyList(state) {
    return state.radiologyList
  },
  getPhotographyList(state) {
    return state.photographyList
  },
}
