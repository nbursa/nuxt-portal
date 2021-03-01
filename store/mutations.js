export default {
  SET_LANGUAGE(state, payload) {
    state.language = payload
  },
  CHANGE_ACTIVE_EL(state, payload) {
    state.activeEl = payload
  },
  SET_FONT_SIZE(state, payload) {
    state.w = payload.width
    state.fontSize = payload.fontSize
  },
  SET_DISPLAY(state, payload) {
    const { item, display } = payload
    state.displayState[item] = display
  },
}
