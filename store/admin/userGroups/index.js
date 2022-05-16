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
  userGroup: null,
  userGroups: [],
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setUserGroup(state, userGroup) {
    state.userGroup = userGroup
  },
  setUserGroups(state, userGroups) {
    state.userGroups = userGroups
  },
}

export const actions = {
  getList(ctx, data) {
    return this.$axios.get(`/admin/groups?page=${data.page}&q=${data.q}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUserGroups(ctx) {
    return this.$axios.get(`/admin/groups`)
      .then(res => {
        const data = res.data;
        ctx.commit('setUserGroups', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUserGroup(ctx, id) {
    return this.$axios.get(`/admin/groups/${id}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setUserGroup', data)
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
  getUserGroup(state) {
    return state.userGroup;
  },
  getUserGroups(state) {
    return state.userGroups;
  },
}
