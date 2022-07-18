export const actions = {
  async nuxtServerInit({commit}) {
    const token = this.$cookies.get('access_token')
    if (token) {
      await this.$axios.setHeader('Authorization', `Bearer ${token}`)
      try {
        const res = await this.$axios.get('/own')
        if (res.status === 200) {
          const data = res.data
          commit('login/setToken', token)
          commit('login/setUser', data)
        } else {
          commit('login/setToken', null)
          commit('login/setUser', null)
          this.$cookies.remove('access_token')
        }
      } catch (e) {
        commit('login/setToken', null)
        commit('login/setUser', null)
        this.$cookies.remove('access_token')
      }
    } else {
      commit('login/setToken', null)
      commit('login/setUser', null)
      this.$cookies.remove('access_token')
    }
    return Promise.resolve()
  }
}
