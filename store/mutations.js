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
  LOGIN(state, payload) {
    // console.log('LOGIN: ', payload)
    const { name, password } = payload
    state.user.name = name
    state.user.key = password
    state.user.isAuthorized = true
    // dispatch('redirect')
  },
}
