require('whatwg-fetch')
export const state = () => ({
  list: [],
  counties: [],
  cities: [],
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setCounties(state, counties) {
    state.counties = counties
  },
  setCities(state, cities) {
    state.cities = cities
  },
}

export const actions = {
  getList(ctx) {
    return this.$axios.get(`/provinces`)
      .then(res => {
        const data = res.data.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getCounties(ctx, id) {
    return this.$axios.get(`/provinces/${id}/counties`)
      .then(res => {
        const data = res.data.data;
        ctx.commit('setCounties', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getCities(ctx, id) {
    return this.$axios.get(`/counties/${id}/cities`)
      .then(res => {
        const data = res.data.data;
        ctx.commit('setCities', data)
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
  getCounties(state) {
    return state.counties
  },
  getCities(state) {
    return state.cities
  }
}
