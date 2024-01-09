require('whatwg-fetch')

export const state = () => ({
  showWorkHour: false,
  showHour: false,
  showCaseType: false,
  workHour: {
    start: '15:00:00',
    end: '20:00:00',
    period: 15,
    organization_id: 0,
  },
  month: 1,
  year: 1398,
  startDate: null,
  endDate: null,
  loadList: false,
  holidays: [],
  initTime: '',
  showPazireshModal: false,
  appointmentID: 0,
  showItemModal: false,
  appointments: [],
  limits: [],
  simpleDays: [],
})

export const mutations = {
  setShowWorkHour(state, showWorkHour) {
    state.showWorkHour = showWorkHour
  },
  setShowHour(state, showHour) {
    state.showHour = showHour
  },
  setShowCaseType(state, showCaseType) {
    state.showCaseType = showCaseType
  },
  setWorkHour(state, workHour) {
    state.workHour = {
      start: workHour.start,
      end: workHour.end,
      period: workHour.period,
      organization_id: workHour.organization_id,
    }
  },
  setMonth(state, month) {
    state.month = month
  },
  setYear(state, year) {
    state.year = year
  },
  setStartDate(state, startDate) {
    state.startDate = startDate
  },
  setEndDate(state, endDate) {
    state.endDate = endDate
  },
  setLoadList(state, loadList) {
    state.loadList = loadList
  },
  setHolidays(state, holidays) {
    state.holidays = holidays
  },
  setInitTime(state, initTime) {
    state.initTime = initTime
  },
  setShowPazireshModal(state, showPazireshModal) {
    state.showPazireshModal = showPazireshModal
  },
  setAppointmentID(state, id) {
    state.appointmentID = id
  },
  setShowItemModal(state, showItemModal) {
    state.showItemModal = showItemModal
  },
  setAppointments(state, appointments) {
    state.appointments = appointments
  },
  setLimits(state, limits) {
    state.limits = limits
  },
  setSimpleDays(state, days) {
    state.simpleDays = days
  },
}

export const actions = {
  setShowWorkHour(ctx, val) {
    ctx.commit('setShowWorkHour', val)
  },
  setWorkHour(ctx, val) {
    ctx.commit('setWorkHour', val)
  },
  setShowHour(ctx, val) {
    ctx.commit('setShowHour', val)
  },
  setShowCaseType(ctx, val) {
    ctx.commit('setShowCaseType', val)
  },
  getOrganizationWorkHour(ctx, id) {
    return this.$axios.get(`/organizations/${id}/work`)
      .then(res => {
        const data = res.data;
        ctx.commit('setWorkHour', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  getOrganizationHolidays(ctx, data) {
    return this.$axios.get(`/organizations/holidays?start=${data.start}&end=${data.end}`)
      .then(res => {
        const data = res.data.data;
        ctx.commit('setHolidays', data)
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  },
  setMonth(ctx, val) {
    ctx.commit('setMonth', val)
  },
  setYear(ctx, val) {
    ctx.commit('setYear', val)
  },
  setStartDate(ctx, val) {
    ctx.commit('setStartDate', val)
  },
  setEndDate(ctx, val) {
    ctx.commit('setEndDate', val)
  },
  setLoadList(ctx, val) {
    ctx.commit('setLoadList', val)
  },
  setInitTime(ctx, val) {
    ctx.commit('setInitTime', val)
  },
  setShowPazireshModal(ctx, val) {
    ctx.commit('setShowPazireshModal', val)
  },
  setAppointmentID(ctx, val) {
    ctx.commit('setAppointmentID', val)
  },
  setShowItemModal(ctx, val) {
    ctx.commit('setShowItemModal', val)
  },
  setAppointments(ctx, val) {
    ctx.commit('setAppointments', val)
  },
  setLimits(ctx, val) {
    ctx.commit('setLimits', val)
  },
  setHolidays(ctx, val) {
    ctx.commit('setHolidays', val)
  },
  setSimpleDays(ctx, val) {
    ctx.commit('setSimpleDays', val)
  },
}

export const getters = {
  getShowWorkHour(state) {
    return state.showWorkHour
  },
  getWorkHour(state) {
    return state.workHour
  },
  getShowHour(state) {
    return state.showHour
  },
  getShowCaseType(state) {
    return state.showCaseType
  },
  getMonth(state) {
    return state.month
  },
  getYear(state) {
    return state.year
  },
  getStartDate(state) {
    return state.startDate
  },
  getEndDate(state) {
    return state.endDate
  },
  getLoadList(state) {
    return state.loadList
  },
  getHolidays(state) {
    return state.holidays
  },
  getInitTime(state) {
    return state.initTime
  },
  getShowPazireshModal(state) {
    return state.showPazireshModal
  },
  getAppointmentID(state) {
    return state.appointmentID
  },
  getShowItemModal(state) {
    return state.showItemModal
  },
  getAppointments(state) {
    return state.appointments
  },
  getLimits(state) {
    return state.limits
  },
  getSimpleDays(state) {
    return state.simpleDays
  }
}
