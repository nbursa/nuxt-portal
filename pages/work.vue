<template lang="pug">
  .work
    .project-preview(v-if="preview")
      div#project(v-html="project")
      button.close(@click="closePreview") X
    h2.work-title.animated.bounceInDown {{ $translation('work.title') }}
    p.work-subtitle.animated.bounceInDown
      em {{ $translation('work.subtitle') }}
    .projects
      a.project.animated.bounceInUp(
        v-for="(project, index) in projects",
        :key="index"
        :href="project.url"
        target="_blank"
      )
        //.project.animated.bounceInUp(
        //  v-for="(project, index) in projects",
        //  :key="index"
        //  @click="getProject(project)"
        //)
        .project-card(
          @mouseover="cardOver",
          @mouseleave="cardLeave"
        )
          .card.animated.bounceInUp
            .thumb
              img(:src="project.img", :alt="project.title")
            .right
              h3(:style="`font-size: ${0.5 * fontSize}px `") {{project.title && project.title }}
              p(:style="`font-size: ${0.3 * fontSize}px `") {{ project.description && $translation(project.description) }}
      hr
      .links.animated.bounceInBottom
        .links-title {{ $translation('work.links') }}:
        h3
          a.openpop(href="https://github.com/nbursa") GitHub.com
        h3
          a.openpop(href="https://codepen.io/nbursa") CodePen.io
      hr
      .contact
        NuxtLink.back.btn.animated.bounceInUp(to="/contact") {{ $translation('work.contact') }}
    | {{ $attrs.position }}
    .scroll(@click="scrollToTop" v-if="position > 350")
      i
</template>

<script>
import { translate } from '@/plugins/translate'
import axios from 'axios'
// import click from '@/assets/click-sound.mp3'

export default {
  name: 'Work',
  key(route) {
    // console.log('key: ', route, this.$attrs)
    return route.fullPath
  },
  mixins: [translate],
  props: {
    position: {
      type: Number,
      required: true,
      default: () => 0,
    },
    fontSize: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },
  data() {
    return {
      preview: false,
      project: null,
      projects: [
        {
          url: 'https://news.nenadbursac.com',
          img: require('@/static/images/Vue Node Local News Scraper.png'),
          title: 'Local News Scraper',
          description: 'work.scraper_app',
        },
        {
          url: 'https://pwanewsapi.nenadbursac.com',
          img: require('@/static/images/pwa-news-api.png'),
          title: 'News app',
          description: 'work.news_app',
        },
        {
          url: 'https://pwa.nenadbursac.com',
          img: require('@/static/images/pwa.jpg'),
          title: 'E-Book Reader',
          description: 'work.reader_app',
        },
        {
          url: 'https://crypto.nenadbursac.com',
          img: require('@/static/images/React Criptocurrency Tracker App.png'),
          title: 'React Cryptocurrency Tracker App',
          description: 'work.crypto_app',
        },
        {
          url: 'https://tcdashboard.nenadbursac.com',
          img: require('@/static/images/TC.png'),
          title: 'TextCafe.com new home page',
          description: 'work.textcafe_app',
        },
        {
          url: 'https://bajka.nenadbursac.com',
          img: require('@/static/images/bajka.jpg'),
          title: 'Smrdljiva bajka - movie',
          description: 'work.bajka_app',
        },
      ],
    }
  },
  // mounted() {
  //   console.log('work: ', this.$nuxt, process.env.$lng)
  // },
  methods: {
    scrollToTop() {
      const main = document.documentElement.querySelector('#__layout')
      main.scrollTop = 0
    },
    cardOver(e) {
      this.$emit('cardOver', e)
    },
    cardLeave(e) {
      this.$emit('cardLeave', e)
    },
    closePreview() {
      this.preview = false
    },
    getProject(project) {
      // console.log('getting project: ', project)
      axios.defaults.baseURL = 'api'
      const config = {
        method: 'get',
        url: project.url,
        headers: {
          'Content-Type': 'application/xml',
        },
      }
      axios(config)
        .then((response) => {
          const res = response.data
          this.preview = true
          if (!res) {
            throw new Error('error in res!')
          }
          // console.log('res: ', res)
          this.project = res
        })
        .catch((error) => {
          throw new Error(error)
        })
      this.playSound()
      // const audio = new Audio(click)
      // audio.play()
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/colors.styl"

.work
  margin 150px auto
  width 78vw
  @media screen and (max-width: 550px)
    width 100%
    padding 20px
  .project-preview
    position fixed
    background-color alpha(#ffffff, 50%)
    top 0
    left 0
    right 0
    bottom 0
    padding 50px
    //pointer-events none
    z-index 3
    #project
      width 100%
      height 100%
      border-radius 15px
      background-color #FFFFFF
      overflow hidden
      overflow-y auto
      z-index 4
      //pointer-events all
      //cursor auto
      &::-webkit-scrollbar
        width 10px
        transition all .25s ease-in
      &:hover
        background rgba(255, 255, 255, .5)
      &::-webkit-scrollbar-track
        background transparent
      &::-webkit-scrollbar-thumb
        background alpha($textColor, .5)
      &::-webkit-scrollbar-thumb:hover
        background $textColor
    .close
      position fixed
      top 10px
      right 10px
      z-index 4000
      font-size 30px
      width 30px
      height 30px
      border-radius 15px
      display flex
      align-items center
      justify-content center
      padding 5px
      background-color transparent
      color #FFFFFF
      cursor none
      border 0
  &-title
    text-align center
    margin-bottom 20px
    font-weight 300
  &-subtitle
    text-align center
    font-weight 400
  a
    pointer-events all
    cursor none
  .projects
    margin-bottom 50px
    hr
      border-color $textColor
      height 1px
      width 80%
      margin 50px auto
      @media screen and (min-width: 551px)
        display none
    .project
      .card
        display flex
        flex-direction column
        align-items flex-start
        padding 20px
        width 100%
        height auto
        margin-top 50px
        border-radius 15px
        transform scale(1)
        transition all 0.3s ease-in-out
        &:hover
          transform scaleY(1.5)
          box-shadow 0 0 35px rgba(255, 255, 255, .15)
          border 1px solid rgba(255, 255, 255, 0.2)
        .thumb
          box-sizing border-box
          border-radius 15px
          overflow hidden
          width 100%
          img
            width 100%
            transform scale 1.3s ease-in-out
        .right
          box-sizing border-box
          width 100%
          padding 20px
          h3
            margin-top 0
            @media screen and (max-width: 550px)
              font-size 20px !important
          p
            text-align left
            margin-bottom 15px
            @media screen and (max-width: 550px)
              font-size 22px !important
          a
            display block
            width 150px
            margin 0 auto
            padding 10px 15px
            font-size 16px
    .links
      display flex
      align-items center
      justify-content space-evenly
      flex-wrap wrap
      text-align center
      @media screen and (min-width: 551px)
        margin-top 100px
      &-title
        width 100%
      h3
        flex 0
    .contact
      display flex
      align-items center
      justify-content center
      .back.btn
        font-size 22px !important
      @media screen and (min-width: 551px)
        display flex
        margin-top 100px
        .back.btn
          font-size 22px !important
    @media screen and (max-width: 550px)
      width 100%
      .project .card
        padding 0
    @media screen and (min-width: 551px) and (max-width: 768px)
      width 90vw
      margin-top 150px
      margin-bottom 150px
      h2
        text-align center
        margin 0 auto
      .project .card
        .thumb
          width 100%
          padding 20px 0
        .right
          width 100%
          padding 20px 0
          a
            display block
            width 150px
            float none
            margin 0 auto
      .links
        width 100%
        text-align center
        display flex
        margin-top 100px
      a.back
        margin 100px auto 10px
    @media screen and (min-width: 1440px)
      display flex
      flex-wrap wrap
      .project
        display inline-flex
        flex-wrap wrap
        width 32%
        margin-right 20px
        &:nth-child(3n + 3)
          margin-right 0
      .links
        width 100%
        text-align center
        display flex
        margin-top 100px
      .contact
        width 100%
        display flex
        align-items center
        justify-content center
  .scroll
    width 40px
    height 40px
    border 5px solid rgba(255, 255, 255, .5)
    border-radius 50%
    background-color rgba(0, 0, 0, .5)
    box-shadow 0 0 15px rgba(0, 0, 0, .5)
    position fixed
    bottom 65px
    right 20px
    z-index 2
    animation 1s puls ease-out
    i
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -40%) rotate(-135deg)
      border solid rgba(255, 255, 255, .75)
      border-width 0 4px 4px 0
      display inline-block
      padding 4px
    &:hover
      transition 0.3s ease-in-out
      transform scale(1.1)
      box-shadow 0 0 20px rgba(0, 0, 0, .5)
    @keyframes puls
      0%
        transform scale(10)
        opacity 0
      100%
        transform scale(1)
        opacity 1
</style>
