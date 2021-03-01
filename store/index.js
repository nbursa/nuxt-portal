import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = () => ({
  counter: 0,
  languages: ['sr', 'en'],
  language: 'en',
  transcript: [],
  recognizing: true,
  recognition: null,
  controls: '',
  cancelable: false,
  scrollDirection: '',
  lastScrollPosition: 0,
  currentScrollPosition: 0,
  fontSize: 0,
  haveMouse: false,
  enableSpeech: false,
  w: 0,
  displayState: {
    hello: 'none',
    this: 'none',
    website: 'none',
    is: 'none',
    about: 'none',
  },
  animationItems: ['hello', 'this', 'website', 'is', 'about', 'route'],
  activeEl: 'hello',
})

export { state, actions, mutations, getters }
