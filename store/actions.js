export default {
  setLang({ commit }, payload) {
    commit('SET_LANGUAGE', payload)
  },
  changeActiveEl({ commit }, payload) {
    commit('CHANGE_ACTIVE_EL', payload)
  },
  setFontSize({ commit }, payload) {
    const width = payload.width
    const fontSize =
      payload.width > payload.height
        ? Math.floor(payload.height / 10)
        : Math.floor(payload.width / 10)
    commit('SET_FONT_SIZE', { width, fontSize })
  },
  setDisplay({ commit }, payload) {
    commit('SET_DISPLAY', payload)
  },
  login({ commit }, payload) {
    const { name, password } = payload
    // console.log('login: ', payload, process.env.admin, process.env.admin_key)
    if (name === process.env.admin && password === process.env.admin_key) {
      return commit('LOGIN', payload)
    }
    return
  },
}
