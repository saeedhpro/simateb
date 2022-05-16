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
  profession: null,
  professions: [],
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setProfession(state, profession) {
    state.profession = profession
  },
  setProfessions(state, professions) {
    state.professions = professions
  },
}

export const actions = {
  getList(ctx, data) {
    return this.$axios.get(`/admin/professions?page=${data.page}&q=${data.q}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getProfessions(ctx) {
    return this.$axios.get(`/admin/professions`)
      .then(res => {
        const data = res.data;
        ctx.commit('setProfessions', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getProfession(ctx, id) {
    return this.$axios.get(`/admin/professions/${id}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setProfessions', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
  getList(state) {
    return state.list;
  },
  getProfession(state) {
    return state.profession;
  },
  getProfessions(state) {
    return state.professions;
  },
}
