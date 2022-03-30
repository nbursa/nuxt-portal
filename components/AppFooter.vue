<template lang="pug">
  footer(:class="[{ open: visible }, { dark: footerIsDark }]")
    .copy
      .copy-wrap
        span.date-year {{getYear}}
        router-link.openpop(
          to="/",
          @mouseover.native="linkOver",
          @mouseleave.native="linkLeave"
        ) nenadbursac.com
    //.weather-container-small
    //  .button.openpop(
    //    v-if="weather",
    //    @click="toggleWeather",
    //    @mouseover="linkOver",
    //    @mouseleave="linkLeave"
    //  )
    //    span(v-if="fontSize > 37") {{$translation('footer.weather_prefix')}}
    //    span {{$translation('footer.weather')}}
    //weather(v-if="!weather && !isWeatherRoute" @linkOver="linkOver" @linkLeave="linkLeave")
    .social-share
      ul
        span {{$translation('footer.share')}}:
        li(v-for="social in socials", :key="social.title")
          a(
            target="_blank",
            :href="social.url",
            @mouseover="linkOver",
            @mouseleave="linkLeave"
          )
            span(:class="social.icon")
</template>

<script>
import { translate } from '@/plugins/translate'
import weather from './Weather'

export default {
  name: 'AppFooter',
  components: {
    weather,
  },
  mixins: [translate],
  props: {
    footerIsDark: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    visible: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    fontSize: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },
  data() {
    return {
      socials: [
        {
          title: 'Facebook',
          url:
            'https://www.facebook.com/sharer/sharer.php?u=https%3A//nenadbursac.com',
          icon: 'ion-social-facebook',
        },
        {
          title: 'Twitter',
          url: 'https://twitter.com/home?status=https%3A//nenadbursac.com',
          icon: 'ion-social-twitter',
        },
        {
          title: 'LinkedIn',
          url:
            'https://www.linkedin.com/shareArticle?mini=true&url=https://nenadbursac.com&title=Web Frontend Developer https://nenadbursac.com',
          icon: 'ion-social-linkedin',
        },
      ],
      weather: true,
    }
  },
  computed: {
    isWeatherRoute() {
      return this.$route.name === 'Weather'
    },
    getYear() {
      return new Date().getFullYear()
    },
  },
  methods: {
    toggleWeather() {
      this.weather = !this.weather
    },
    linkOver(e) {
      this.$emit('linkOver', e)
    },
    linkLeave(e) {
      this.$emit('linkLeave', e)
    },
  },
}
</script>

<style lang="stylus" scoped>
footer
  position fixed
  bottom -300px
  left 0
  width 100vw
  height 50px
  padding 0 40px
  // z-index 2
  transition all 0.25s ease-in-out
  background-size 400% 400%
  animation Gradient 15s ease infinite
  background-color none
  display flex
  align-items center
  justify-content space-between
  &.open
    bottom 0
  &.dark
    background-color: rgba(0, 0, 0, 0.6);
    >>> a, .copy, span, .weather-link .desc span, .weather-link .title
      color: #FFFFFF;
      text-shadow: 0 0 4px #FFFFFF;
  .social-share
    z-index 5
    height 50px
    display flex
    align-items center
    justify-content space-between
    ul
      list-style none
      padding 0
      margin 0
      display flex
      align-items center
      > span
        margin-right 20px
      li
        display inline-block
        margin-left 1vw
        a span
          font-size 1.8vw
          padding 0 10px
          cursor none
          @media screen and (max-width : 550px)
            font-size 1.4em
  .copy
    height 50px
    display flex
    align-items center
    justify-content center
    a.openpop
      color $textColor
      display inline-block
      cursor none
      margin-left 5px

.weather-container-small {
  position: absolute;
  left: 50%;
  transform translateX(-50%)
}

@media screen and (max-width: 550px)
  footer .weather-container-small
    position fixed
    left auto
    right 0

@media screen and (max-width: 850px)
  footer .weather-container-small
    p.title, span.description
      display none !important

@media screen and (max-width: 550px)
  footer
    padding 0 20px
    text-align center
    .social-share
      // display none
      // position fixed
      // bottom 15px
      // right 25px
      // top auto
      // left auto
      // color #1a84cf
      margin-left auto
      height auto
      transform translate(0, 0)
      z-index 1000 !important
      //display block
      transition all 0.25s ease-in-out
      > ul > span
        display none
    .copy
      left 20px
      display none
@media screen and (max-width: 550px)
  footer .weather-container-small
    left 50%
    right auto
    transform translateX(-50%)
</style>
