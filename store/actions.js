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
}
