export const state = () => ({
  currentUser: {},
  isLoggedIn: false,
})

export const mutations = {
  logined(state, payload) {
    state.isLoggedIn = true
    state.currentUser = Object.assign({}, payload)
  },
  refreshed(state, payload) {
    state.currentUser = Object.assign(state.currentUser, payload)
  },
  setProperty(state, payload) {
    state.currentUser.user[payload.property] = payload.payload
  },
  logout(state) {
    state.isLoggedIn = false
    state.currentUser = {}
  },
}

export const actions = {
  logined(context, content) {
    context.commit('logined', content)
  },
  refreshed(context, content) {
    context.commit('refreshed', content)
  },
  setProperty(context, content) {
    context.commit('setProperty', content)
  },
  logout(context) {
    context.commit('logout')
  },
}

export const getters = {
  isLoggedIn(state) {
    return state.isLoggedIn
  },
  currentUser(state) {
    return state.currentUser
  },
}
