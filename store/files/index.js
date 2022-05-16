require('whatwg-fetch')
export const state = () => ({
  list: [],
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  updateFile(state, file) {
    const i = state.list.findIndex(f => f.id === file.id)
    if (i !== -1) {
      state.list[i] = {
        ...state.list[i],
        ...file
      }
    }
    state.list = [...state.list]
  },
  removeFile(state, id) {
    const i = state.list.findIndex(f => f.id === id)
    if (i !== -1) {
      state.list = state.list.splice(i, 1)
    }
    state.list = [...state.list]
  }
}

export const actions = {
  getList(ctx, id) {
    return this.$axios.get(`/files/${id}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(data)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  setList(ctx, files) {
    ctx.commit('setList', files)
  },
  updateFile(ctx, file) {
    ctx.commit('updateFile', file)
  },
  removeFile(ctx, id) {
    return this.$axios.delete(`/files/${id}`)
      .then(res => {
        ctx.commit('removeFile', id)
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
}
