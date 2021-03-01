<template lang="pug">
.home
  hello(@ended="switchView", v-if="this.activeEl === 'hello'")
  .home-wrap(v-else)
    .home-top
      h1.animated.bounceInDown Nenad Bursa&cacute;
    .home-content
      h2.animated.bounceInLeft Frontend Developer
      a.enter-btn.btn.animated.bounceInRight(
        @click="ctaClick",
        @mouseover="btnOver",
        @mouseleave="btnLeave"
      ) {{$translation('home.work')}}
    .home-actions.animated.bounceInRight
      //.action
      //  a.cv(@mouseover="btnOver()",
      //    @mouseleave="btnLeave()") CV
      .action
        a.github(href="https://github.com/nbursa" @mouseover="btnOver",
          @mouseleave="btnLeave")
          span(class="ion-social-github")
      .action
        a.linkedin(href="https://www.linkedin.com/in/nenadbursac" @mouseover="btnOver",
          @mouseleave="btnLeave")
          span(class="ion-social-linkedin")
</template>

<script>
// import sound from '@/static/sounds/click-sound.mp3'
import { translate } from '@/plugins/translate'
import Hello from './Hello'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Hello,
  },
  mixins: [translate],
  computed: {
    ...mapState(['activeEl']),
  },
  beforeDestroy() {
    this.btnLeave()
  },
  methods: {
    ...mapActions(['changeActiveEl']),
    btnOver() {
      const cursor = document.documentElement.querySelector('.cursor')
      cursor && cursor.classList.add('card-hover')
    },
    btnLeave() {
      const cursor = document.documentElement.querySelector('.cursor')
      cursor && cursor.classList.remove('card-hover')
    },
    switchView() {
      this.changeActiveEl('home')
    },
    ctaClick() {
      this.$router.push('/work')
      // const player = new Audio(sound)
      // const playPromise = () => player.play()
      // const pausePromise = () => player.pause()
      // const resetPromise = () => (player.currentTime = 0)
      // if (playPromise) {
      //   playPromise()
      //     .then(() => {
      //       pausePromise()
      //       resetPromise()
      //       playPromise()
      //       this.$router.push('/work')
      //     })
      //     .catch((error) => {
      //       console.log('error: ', error)
      //     })
      // }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/components/styles/Contact.styl"

.home
  width 80vw
  margin 0 auto
  &-top
    h1
      font-size 6vw
      font-weight 300
      margin 37vh 0 1vh
  &-content
    display flex
    h2
      font-size 4.25vw
      font-weight 100
      font-family Roboto
      line-height 3.5rem
      font-style italic
      margin 0 0 1vh 0
  h3
    font-weight 400
  &-actions
    display flex
    align-items center
    @media screen and (max-width: 550px)
      justify-content flex-end
    .action
      border none
      font-size 2.5vw
      margin-right 1vw
      padding 1.5vw
      a
        cursor none
        @media screen and (max-width: 550px)
          font-size 3.3em
      .cv
        font-size 1.8vw
  .enter-btn
    font-size 2vw
    display block
    max-width 14vw
    padding 1.5vw 2vw
    pointer-events all
    cursor none
    margin 0
    margin-left auto
  @media screen and (max-width 550px)
    width 90%
    margin-top 100px
    margin-bottom 100px
    h1
      font-size 2rem
    .home-content
      flex-direction column
      margin-bottom 7vw
      a
        border 2px solid
        padding .5vw 10vw
      h2
        font-size 2.5rem
        margin-bottom 7vw
    .enter-btn
      max-width 40vw
      @media screen and (max-width 550px)
        font-size 1.4em
        max-width 100%
        padding 2vw 10vw
</style>
