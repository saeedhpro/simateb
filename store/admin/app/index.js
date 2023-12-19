require('whatwg-fetch')
export const state = () => ({

})

export const mutations = {
}

export const actions = {
  getArticleList(ctx, data) {
    return this.$axios.get(`/app/articles?page=${data.page}&q=${data.q}&limit=${data.limit}&type=${data.type}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
}

export const getters = {
}
