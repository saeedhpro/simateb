require('whatwg-fetch')
export const state = () => ({

})

export const mutations = {
}

export const actions = {
  getArticleList(ctx, data) {
    const d = Object.entries(data);
    const arr = [];
    for (let i = 0; i < d.length; i++) {
      if (d[i][1]) {
        arr.push(`${d[i][0]}=${d[i][1]}`)
      }
    }
    return this.$axios.get(`/app/articles?${arr.join('&')}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getCategoryList(ctx, data) {
    const d = Object.entries(data);
    const arr = [];
    for (let i = 0; i < d.length; i++) {
      if (d[i][1]) {
        arr.push(`${d[i][0]}=${d[i][1]}`)
      }
    }
    return this.$axios.get(`/app/categories?${arr.join('&')}`)
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
