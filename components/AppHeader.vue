<template>
  <header class="open" :class="[{ dark: headerIsDark }]">
    <div class="wrap">
      <ul class="header-nav">
        <li class="auth" v-if="authorized">
          <p>{{ `Hello ${userName}` }}</p>
        </li>
        <li class="nav-btn" @mouseover="linkOver" @mouseleave="linkLeave">
          <div class="hamburger" @click="toggleNav">
            <span></span><span></span><span></span>
          </div>
        </li>
        <li class="home-link">
          <NuxtLink
            class="openpop"
            to="/"
            @mouseover.native="linkOver"
            @mouseleave.native="linkLeave"
            >nb</NuxtLink
          >
        </li>
        <Transition name="slide-fade" appear>
          <!-- <li class="nav-container" v-if="screenSize <= 768 && navOpen"> -->
          <li class="nav-container" v-if="navOpen">
            <ul class="nav">
              <li class="auth" v-if="authorized" key="autho">
                <div
                  class="openpop"
                  @click="logout"
                  @mouseover="linkOver"
                  @mouseleave="linkLeave"
                  >Logout</div
                >
              </li>
              <li>
                <a
                  class="openpop"
                  @mouseover="linkOver"
                  @mouseleave="linkLeave"
                  @click=";(navOpen = false), $router.push('/')"
                  >{{ $translation(`header.home`) }}</a
                >
              </li>
              <li v-for="page in pages" :key="page.name">
                <a
                  class="openpop"
                  v-if="page.name && page.name !== 'Weather'"
                  @mouseover="linkOver"
                  @mouseleave="linkLeave"
                  @click=";(navOpen = false), $router.push(page.path)"
                  >{{ $translation(`header.${page.name}`) }}</a
                >
              </li>
              <div
                class="close-btn"
                @mouseover="linkOver"
                @mouseleave="linkLeave"
                @click="toggleNav"
              ></div>
            </ul>
          </li>
        </Transition>
        <!-- <li class="nav-container" v-if="screenSize > 768">
          <ul class="nav">
            <li class="auth" v-if="authorized" key="auth">
              <div
                class="openpop"
                @click="logout"
                @mouseover="linkOver"
                @mouseleave="linkLeave"
                >Logout</div
              >
            </li>
            <li v-for="page in pages" :key="page.name">
              <a
                class="openpop"
                v-if="page.name && page.name !== 'Weather'"
                @mouseover="linkOver"
                @mouseleave="linkLeave"
                @click=";(navOpen = false), $router.push(page.path)"
                >{{ $translation(`header.${page.name}`) }}</a
              >
            </li>
          </ul>
        </li> -->
        <li>
          <div
            class="lang openpop"
            @mouseover="linkOver"
            @mouseleave="linkLeave"
            @click="setLanguage"
          >
            {{
              $nuxt.$store.state.languages.filter(
                (lng) => lng !== $nuxt.$store.state.language
              )[0]
            }}
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { translate } from '@/plugins/translate'

export default {
  name: 'AppHeader',
  mixins: [translate],
  props: {
    headerIsDark: {
      type: Boolean,
      required: true,
      default: false,
    },
    visible: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
  data() {
    return {
      pages: [],
      navOpen: false,
      screenSize: 0,
    }
  },
  computed: {
    authorized() {
      if (process.client) {
        return !!localStorage.getItem('user')
      }
      return false
    },
    userName() {
      if (process.client) {
        // console.log('authorizedd? : ', localStorage.getItem('user').name)
        const name = JSON.parse(localStorage.getItem('user')).name
        return name.charAt(0).toUpperCase() + name.slice(1, name.length)
      }
      return false
    },
  },
  created() {
    this.setPages()
  },
  mounted() {
    window.addEventListener('load', this.setScreenSize)
    window.addEventListener('resize', this.setScreenSize)
  },
  destroyed() {
    window.removeEventListener('load', this.setScreenSize)
    window.addEventListener('resize', this.setScreenSize)
  },
  methods: {
    setScreenSize() {
      this.screenSize = window.innerWidth
    },
    setPages() {
      this.$router.options.routes.forEach((route) => {
        // console.log('router', this.$router)
        if (['work', 'weather'].includes(route.name)) {
          this.pages.push({
            path: route.path,
            name: route.name,
            component: route.component,
          })
        }
      })
    },
    linkOver(e) {
      this.$emit('linkOver', e)
    },
    linkLeave(e) {
      this.$emit('linkLeave', e)
    },
    toggleNav() {
      console.log('togglena: ')
      this.navOpen = !this.navOpen
    },
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.slide-fade-enter-active
  height 100%
  max-height 100%
  max-width 100%
  border-radius 0 0 50vw 0

.slide-fade-leave-active
  height 100%
  max-height 100%
  max-width 100%
  border-radius 0 0 50vw 0

.slide-fade-enter, .slide-fade-leave-to
  max-height 0
  max-width 0
  opacity 0

header
  display flex
  align-items center
  justify-content center
  position fixed
  top -300px
  left 0
  width 100vw
  height 9vh
  z-index 1
  transition all 0.25s ease-in-out
  background-size 400% 400%
  animation Gradient 15s ease infinite
  background-color none

  &.open
    top 0

  &.dark
    background-color rgba(0, 0, 0, 0.6)
    // a, .lang
    // color #FFFFFF
    // text-shadow 0 0 4px #FFFFFF

  a
    pointer-events all
    cursor none

  .wrap
    transition all 0.25s ease-in-out
    display flex
    flex-direction column
    flex 1
    align-items center
    justify-content center
    max-height 100%
    width 100%
    position relative

    .auth
      position absolute
      top 1.4rem
      left 28px
      right 0

      // padding 0 40px
      @media screen and (min-width 768px)
        top 2.2rem
        left 50px

    .header-nav
      display flex
      justify-content space-between
      align-items center
      background-color transparent
      margin 0
      list-style none
      padding 0 40px
      transition all 0.3s ease-in-out
      flex 100%
      width 100%

      .nav-btn
        // @media screen and (min-width 768px)
        //   display none

        .hamburger
          width 43px
          height 38px
          display flex
          align-items center
          justify-content space-between
          flex-direction column
          // position absolute
          // top 40px
          // left 23px
          padding 10px
          // transform translateY(-50%)

          span
            width 100%
            height 2px
            background-color #1a84cf

      li
        display inline-block

        .lang
          text-transform uppercase

        &:last-child
          float right

      .nav-container
        z-index 10000 !important
        position absolute
        left 50%
        transform translateX(-50%)
        min-width fit-content

        .nav
          list-style none
          padding 0
          margin-top 10px

          li
            margin 0
            margin-left 1rem
            padding 0

            a
              font-size 1.5rem
              padding 10px 20px
              display inline-block
              text-align center
              justify-content center

              @media screen and (min-width 551px) and (max-width 1210px)
                font-size 1rem

              @media screen and (max-width 550px)
                font-size 1.5rem

          .close-btn
            position fixed
            top 32px
            left 45px
            width 30px
            height 30px

            &:before, &:after
              position absolute
              left 15px
              content ' '
              height 30px
              width 3px
              background-color #1a84cf

            &:before
              transform rotate(45deg)

            &:after
              transform rotate(-45deg)

        // @media screen and (max-width 768px)
        display flex
        flex 1
        align-items center
        justify-content center
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        transition all 0.45s ease-out
        transform translateX(0)
        // background linear-gradient(0, #111630, #000, #11162F)
        background-color #fff
        overflow hidden
        z-index 10001 !important

        .nav
          display flex
          flex-direction column
          font-size 24px
          // width 100%
          justify-self center

      .home-link
        font-size 3.8vw

        @media screen and (max-width 768px)
          display none

        a
          padding 10px 20px
          display inline-block

          span
            display inline-block
            border 3px solid $textColor
            width 20px
            height 20px
            margin-left 3px
            border-radius 5px

  @media screen and (max-width 768px)
    z-index 1
    transition all 0.25s ease-in-out

    .wrap
      .header-nav
        padding 0 40px

        > li
          &.home-link
            margin-left -20px
            font-size 2rem

            a
              color $textColor

          .nav
            width 100%
            display block
            padding 0
            margin 15px auto 0
            text-align center
</style>
