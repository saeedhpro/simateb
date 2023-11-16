require('whatwg-fetch')
export const state = () => ({
  for_me_list: {
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
  for_others_list: {
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
  setForMeList(state, list) {
    state.for_me_list = list
  },
  setForOthersList(state, list) {
    state.for_others_list = list
  },
}

export const actions = {
  getForMeList(ctx, data) {
    return this.$axios.get(`/reserves/for_me?page=${data.page}&start=${data.start}&end=${data.end}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setForMeList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getForOthersList(ctx, data) {
    return this.$axios.get(`/reserves/for_others?page=${data.page}&start=${data.start}&end=${data.end}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setForOthersList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getForMeList(state) {
    return state.for_me_list
  },
  getForOthersList(state) {
    return state.for_others_list
  },
}
