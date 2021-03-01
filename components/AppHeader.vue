<template lang="pug">
  //header(:class="[{ open: visible }, { dark: headerIsDark }]")
  header.open(:class="[{ dark: headerIsDark }]")
    .wrap
      ul.header-nav
        li.nav-btn(
          @mouseover="linkOver",
          @mouseleave="linkLeave"
          @click="toggleNav"
        )
          .hamburger
            span
            span
            span
        li.home-link
          NuxtLink.openpop(
            to="/",
            @mouseover.native="linkOver",
            @mouseleave.native="linkLeave"
          )
            | nb

        li.nav-container(v-if="screenSize <= 550 && navOpen")
          ul.nav
            li
              a.openpop(
                @mouseover="linkOver",
                @mouseleave="linkLeave",
                @click="navOpen = false; $router.push('/')"
              ) Home
            li(v-for="page in pages", :key="page.name")
              a.openpop(
                v-if="page.name && page.name !== 'Weather'",
                @mouseover="linkOver",
                @mouseleave="linkLeave",
                @click="navOpen = false; $router.push(page.path)"
              ) {{ $translation(`header.${page.name}`) }}
            .close-btn(
              @mouseover="linkOver",
              @mouseleave="linkLeave"
              @click="toggleNav"
            )
        li.nav-container(v-if="screenSize > 550")
          ul.nav
            li(v-for="page in pages", :key="page.name")
              a.openpop(
                v-if="page.name && page.name !== 'Weather'",
                @mouseover="linkOver",
                @mouseleave="linkLeave",
                @click="navOpen = false; $router.push(page.path)"
              ) {{ $translation(`header.${page.name}`) }}

        li
          .lang.openpop(
            @mouseover="linkOver",
            @mouseleave="linkLeave"
            @click="setLanguage"
          )
            | {{ $nuxt.$store.state.languages.filter((lng) => lng !== $nuxt.$store.state.language)[0] }}
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
  // computed: {
  //   lang() {
  //     console.log(
  //       'LANG; ',
  //       this.languages.filter((lng) => lng !== this.globalLang)[0]
  //     )
  //     return this.languages.filter((lng) => lng !== this.globalLang)[0]
  //   },
  // },
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
        if (['contact', 'work'].includes(route.name)) {
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
      this.navOpen = !this.navOpen
    },
  },
}
</script>

<style lang="stylus" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: -300px;
  left: 0;
  width: 100vw;
  height: 9vh;
  z-index: 1;
  transition: all 0.25s ease-in-out;
  background-size: 400% 400%;
  animation: Gradient 15s ease infinite;
  background-color: none;
  //color: red;

  &.open {
    top: 0;
  }

  &.dark {
    background-color: rgba(0, 0, 0, 0.6);
    a, .lang {
      color: #FFFFFF;
      text-shadow: 0 0 4px #FFFFFF;
    }
  }

  a {
    pointer-events: all;
    cursor: none;
  }

  .wrap {
    transition: all 0.25s ease-in-out;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    max-height: 100%;

    .header-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: transparent;
      margin: 0;
      list-style: none;
      padding: 0 40px;
      transition: all 0.3s ease-in-out;
      flex: 100%;

      .nav-btn {
        @media screen and (min-width: 550px) {
          display: none;
        }
        .hamburger {
          width: 43px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
          position: absolute;
          top: 14px;
          left: 23px;
          padding: 10px;
          span {
            width: 100%;
            height: 2px;
            background-color: #1a84cf;
          }
        }
      }

      li {
        display: inline-block;
        .lang {
          text-transform uppercase
        }
        &:last-child {
          float: right;
        }
      }

      .nav-container {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        .nav {
          list-style: none;
          padding: 0;
          margin-top: 10px;

          li {
            margin: 0;
            margin-left: 1vw;
            padding: 0;

            //&:first-child, &:last-child {
            //  display: none;
            //}

            a {
              font-size: 1.4vw;
              padding: 10px 20px;
              display: inline-block;
              text-align: center;
              justify-content: center;
              @media screen and (max-width: 550px) {
                font-size: 1em;
              }
            }
          }
          .close-btn {
            position: fixed;
            top: 20px;
            left: 20px
            width: 30px;
            height: 30px;
            &:before, &:after {
              position: absolute;
              left: 15px;
              content: ' ';
              height: 30px;
              width: 3px;
              background-color: #1a84cf;
            }
            &:before {
              transform: rotate(45deg);
            }
            &:after {
              transform: rotate(-45deg);
            }
          }
        }
        @media screen and (max-width: 550px) {
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 16;
          transform: none;
          transition all .45s ease-out
          background: linear-gradient(0, #111630, #000, #11162F);
          .nav {
            display: flex;
            flex-direction: column;
            font-size: 24px;
          }
        }
      }

      .home-link {
        font-size: 3.8vw;

        @media screen and (max-width: 550px) {
          display: none;
        }

        a {
          padding: 10px 20px;
          display: inline-block;

          span {
            display: inline-block;
            border: 3px solid $textColor;
            width: 20px;
            height: 20px;
            margin-left: 3px;
            border-radius: 5px;
          }
        }
      }


    }
  }

  @media screen and (max-width: 550px) {
    z-index: 1;
    transition: all 0.25s ease-in-out;

    .wrap {
      .header-nav {
        padding: 0 40px;

        > li {
          &.home-link {
            margin-left: -20px;
            font-size: 2rem;
            a {
              color: $textColor;
            }
          }

          .nav {
            width: 100%;
            display: block;
            position: absolute;
            top: 50px;
            left: 0;
            padding: 0;
            margin: 15px auto 0;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
