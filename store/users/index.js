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
  patients: {
    data: [],
    limit: 10,
    page: 1,
    sort: '',
    total_rows: 0,
    total_pages: 0
  },
  organizationPatients: {
    data: [],
    limit: 10,
    page: 1,
    sort: '',
    total_rows: 0,
    total_pages: 0
  },
  user: null,
  users: [],
  medicalHistory: null,
  photographyList: {
    data: [],
    limit: 10,
    page: 1,
    sort: '',
    total_rows: 0,
    total_pages: 0
  },
  radiologyList: {
    data: [],
    limit: 10,
    page: 1,
    sort: '',
    total_rows: 0,
    total_pages: 0
  }
})

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setPatients(state, patients) {
    state.patients = patients
  },
  setOrganizationPatients(state, patients) {
    state.organizationPatients = patients
  },
  setUsers(state, users) {
    state.users = users
  },
  setUser(state, user) {
    state.user = user
  },
  setMedicalHistory(state, medicalHistory) {
    state.medicalHistory = medicalHistory
  },
  setPhotographyList(state, list) {
    state.photographyList = list
  },
  setRadiologyList(state, list) {
    state.radiologyList = list
  },
}

export const actions = {
  getList(ctx, data) {
    return this.$axios.get(`/organizations/users?page=${data.page}&q=${data.q}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setList', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getPatients(ctx, data) {
    const d = Object.entries(data);
    const arr = ['group=1'];
    for (let i = 0; i < d.length; i++) {
      if (d[i][1]) {
        arr.push(`${d[i][0]}=${d[i][1]}`)
      }
    }
    return this.$axios.get(`/organizations/users?${arr.join('&')}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setPatients', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizationPatients(ctx, data) {
    return this.$axios.get(`/organizations/${data.id}/users?page=${data.page}&q=${data.q}&group=1`)
      .then(res => {
        const data = res.data;
        ctx.commit('setOrganizationPatients', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUserResultedAppointmentsList(ctx, data) {
    return this.$axios.get(`/users/${data.id}/appointments/resulted?page=${data.page}&type=${data.type}&limit=10`)
      .then(res => {
        const data = res.data;
        if(data.type === 'photography') {
          ctx.commit('setPhotographyList', data)
        } else {
          ctx.commit('setRadiologyList', data)
        }
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUsers(ctx, data) {
    return this.$axios.get(`/organizations/users`)
      .then(res => {
        const data = res.data;
        ctx.commit('setUsers', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizationUsers(ctx, id) {
    return this.$axios.get(`/organizations/${id}/users/all`)
      .then(res => {
        const data = res.data;
        ctx.commit('setUsers', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getUser(ctx, id) {
    return this.$axios.get(`/users/${id}`)
      .then(res => {
        const data = res.data;
        ctx.commit('setUser', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  createUser(ctx, data) {
    return this.$axios.post(`/users?`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  updateUser(ctx, data) {
    return this.$axios.put(`/users/${data.id}`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  removeUser(ctx, id) {
    return this.$axios.delete(`/users/${id}`)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  deleteUsers(ctx, data) {
    return this.$axios.post(`/users/delete`, data)
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getMedicalHistory(ctx, id) {
    return this.$axios.get(`/users/${id}/histories`)
      .then(res => {
        const data = res.data
        const h = {
          accident_to_Head: "",
          adenoid_tonsile_reduction: "",
          chief_complaint: "",
          consumable_medicine: "",
          crossbite: "",
          crowding_md: "",
          crowding_mx: "",
          diagnosis: "",
          frontal: "",
          general_health: "",
          ie_anomalies: "",
          ie_caries: "",
          ie_extracted: "",
          ie_impacted: "",
          ie_missing: "",
          ie_rct: "",
          ie_supernumerary: "",
          left_canine: "",
          left_molar: "",
          length_active_treatment: "",
          medical_condition: "",
          operations: "",
          oral_hygiene: "",
          overbite: "",
          overjet: "",
          others: "",
          previous_orthodontic: "",
          profile: "",
          retention: "",
          right_canine: "",
          right_molar: "",
          spacing_md: "",
          spacing_mx: "",
          teeth_present: "",
          treatment_plan: "",
          un_erupted: "",
          under_physician_care: "",
          midlines: "",
          user_id: id,
          ...data
        }
        ctx.commit('setMedicalHistory', h)
        return Promise.resolve(h)
      })
      .catch(err => {
        const h = {
          accident_to_Head: "",
          adenoid_tonsile_reduction: "",
          chief_complaint: "",
          consumable_medicine: "",
          crossbite: "",
          crowding_md: "",
          crowding_mx: "",
          diagnosis: "",
          frontal: "",
          general_health: "",
          ie_anomalies: "",
          ie_caries: "",
          ie_extracted: "",
          ie_impacted: "",
          ie_missing: "",
          ie_rct: "",
          ie_supernumerary: "",
          left_canine: "",
          left_molar: "",
          length_active_treatment: "",
          medical_condition: "",
          operations: "",
          oral_hygiene: "",
          overbite: "",
          overjet: "",
          others: "",
          previous_orthodontic: "",
          profile: "",
          retention: "",
          right_canine: "",
          right_molar: "",
          spacing_md: "",
          spacing_mx: "",
          teeth_present: "",
          treatment_plan: "",
          un_erupted: "",
          under_physician_care: "",
          midlines: "",
          user_id: id,
        }
        ctx.commit('setMedicalHistory', h)
        return Promise.reject(err)
      })
  },
  createUserMedicalHistory(context, data) {
    return this.$axios.post(`/users/${data.user_id}/histories`, data)
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return Promise.resolve(res)
        }
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  setUserMedicalHistory(context, data) {
    context.commit('setMedicalHistory', data)
  },
}

export const getters = {
  getList(state) {
    return state.list
  },
  getPatients(state) {
    return state.patients
  },
  getOrganizationPatients(state) {
    return state.organizationPatients
  },
  getUsers(state) {
    return state.users
  },
  getUser(state) {
    return state.user
  },
  getMedicalHistory(state) {
    return state.medicalHistory
  },
  photographyList(state) {
    return state.photographyList
  },
  radiologyList(state) {
    return state.radiologyList
  },
}
