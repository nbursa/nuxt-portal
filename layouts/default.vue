<template lang="pug">
  #app
    .cursor
    //Nuxt
    AppHeader(
      :header-is-dark="headerIsDark"
      :visible="headerIsVisible"
      @linkOver="hoverEvent"
      @linkLeave="leaveEvent"
    )
    NuxtChild(
      :position="currentScrollPosition"
      :font-size="fontSize"
      @cardOver="hoverEvent"
      @cardLeave="leaveEvent"
      @hoverEvent="hoverEvent"
      @leaveEvent="leaveEvent"
      @inputHoverEvent="inputHoverEvent"
      @inputLeaveEvent="inputLeaveEvent"
    )
    AppFooter(
      :footer-is-dark="footerIsDark"
      :visible="footerIsVisible"
      @linkOver="hoverEvent"
      @linkLeave="leaveEvent"
      :font-size="fontSize"
    )
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import { translate } from '@/plugins/translate'

export default {
  name: 'DefaultLayout',
  component: { AppFooter, AppHeader },
  mixins: [translate],
  data() {
    return {
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
    }
  },
  computed: {
    headerIsDark() {
      return this.lastScrollPosition > 90
    },
    footerIsDark() {
      return ['/work', '/contact'].includes(this.$route.path)
    },
    headerIsVisible() {
      return this.lastScrollPosition === 0 || this.scrollDirection === 'down'
    },
    footerIsVisible() {
      return this.lastScrollPosition === 0 || this.scrollDirection === 'up'
    },
    haveVoiceRecognition() {
      return (
        ('SpeechRecognition' in window ||
          'webkitSpeechRecognition' in window) &&
        this.enableSpeech
      )
    },
    // language: function () {
    //   return this.$lang
    // }
  },
  mounted() {
    // console.log('mounted : ', this)
    this.handleEvents(
      ['mousemove', 'scroll', 'load', 'resize'],
      'addEventListener'
    )
    this.checkMouse()
    this.haveVoiceRecognition && this.voiceRecognition()
    // this.playSound()
  },
  updated() {
    this.checkMouse()
  },
  beforeDestroy() {
    this.handleEvents(
      ['mousemove', 'scroll', 'load', 'resize'],
      'removeEventListener'
    )
  },
  methods: {
    checkMouse() {
      this.haveMouse = matchMedia('(pointer:fine)').matches
    },
    setFontSize() {
      // console.log('set font size: ', window, this, document)
      this.fontSize =
        window.innerWidth < window.innerHeight
          ? Math.floor(window.innerHeight / 20)
          : Math.floor(window.innerWidth / 20)
    },
    getScrollPosition(ev) {
      this.currentScrollPosition = parseInt(ev.target.scrollTop.toFixed())
      if (this.currentScrollPosition > this.lastScrollPosition) {
        this.scrollDirection = 'down'
      } else {
        this.scrollDirection = 'up'
      }
      this.lastScrollPosition = this.currentScrollPosition
    },
    handleEvents(events, process) {
      const nuxt = document.querySelector('#__nuxt')
      const layout = document.querySelector('#__layout')
      events.forEach((e) => {
        // console.log('handle events e : ', e, nuxt, layout, process)
        if (e === 'scroll') layout[process](e, this.getScrollPosition)
        if (['load', 'resize'].includes(e)) nuxt[process](e, this.setFontSize())
        if (e === 'mousemove') nuxt[process](e, this.cursor)
      })
    },
    cursor() {
      const cursor = document.querySelector('.cursor')
      if (cursor)
        cursor.style =
          'top: ' + (event.y - 10) + 'px; left: ' + (event.x - 10) + 'px;'
    },
    voiceRecognition() {
      if ('SpeechRecognition' in window) {
        // eslint-disable-next-line no-undef
        this.recognition = new SpeechRecognition()
      } else if ('webkitSpeechRecognition' in window) {
        // eslint-disable-next-line no-undef
        this.recognition = new webkitSpeechRecognition()
      } else {
        return console.log('No speech recognition found in navigator.')
      }
      this.recognition.lang = 'sr'
      this.recognition.continuous = true
      this.reset()
      this.recognition.onend = this.reset()
      this.recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            console.log('rec res: ', event.results[i][0].transcript)
            this.transcript.push(event.results[i][0].transcript)
          }
        }
      }
      this.recognition.onerror = (event) => {
        console.log('eeee: ', event)
        this.transcript.push('Error: ' + event)
      }
    },
    reset() {
      this.recognizing = false
      this.controls = 'Click to start listening'
    },
    toggleStartStop() {
      if (this.recognizing && this.recognition) {
        this.recognition.stop()
        this.reset()
      } else {
        this.recognition.start()
        this.recognizing = true
        this.controls = 'Stop'
      }
    },
    hoverEvent() {
      const cursor = document.querySelector('.cursor')
      if (cursor) cursor.classList.add('btn-hover')
    },
    leaveEvent() {
      const cursor = document.querySelector('.cursor')
      if (cursor) cursor.classList.remove('btn-hover')
    },
    inputHoverEvent() {
      const cursor = document.querySelector('.cursor')
      if (cursor) cursor.classList.add('input-hover')
    },
    inputLeaveEvent() {
      const cursor = document.querySelector('.cursor')
      if (cursor) cursor.classList.remove('input-hover')
    },
  },
}
</script>

<style lang="stylus">
@import "~@/assets/main.styl"
</style>
