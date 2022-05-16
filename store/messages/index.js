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
  message: null,
  messages: [],
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setMessage(state, message) {
    state.message = message
  },
  setMessages(state, messages) {
    state.messages = messages
  },
}

export const actions = {
  getList(ctx, data) {
    return this.$axios.get(`/organizations/messages?page=${data.page}&q=${data.q}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getMessages(ctx) {
    return this.$axios.get(`/messages`)
      .then(res => {
        const data = res.data;
        ctx.commit('setMessages', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getMessage(ctx, id) {
    return this.$axios.get(`/messages/${id}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setMessage', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createMessage(ctx, data) {
    return this.$axios.post(`/messages?`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeMessage(ctx, id) {
    return this.$axios.delete(`/messages/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteMessages(ctx, data) {
    return this.$axios.post(`/messages/delete`, data)
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
  getMessage(state) {
    return state.message
  },
  getMessages(state) {
    return state.messages
  },
}
