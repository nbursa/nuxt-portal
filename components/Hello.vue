<template lang="pug">
.hello
  .h
    .h-hello.animated.bounceInLeft(
      :style="`font-size: ${(w < 750 ? 1.75 : w < 1025 ? 2.25 : 3) * fontSize}px; display: ${displayState.hello}`"
    ) {{ $translation('hello.hello') }}
    .h-this.animated(
      :style="`font-size: ${(w < 1025 ? 0.7 : 1.1) * fontSize}px; display: ${displayState.this};`"
    ) {{ $translation('hello.this') }}
    .h-website.animated.bounceInRight(
      :style="`font-size: ${(w < 1025 ? 1.75 : 2.5) * fontSize}px; display: ${displayState.website}`"
    ) {{ $translation('hello.website') }}
    .h-is.animated.bounceInLeft(
      :style="`font-size: ${(w < 1025 ? 2 : 2.5) * fontSize}px; display: ${displayState.is}`"
    ) {{ $translation('hello.is') }}
    .h-about.animated.bounceInUp(
      :style="`font-size: ${(w < 1025 ? 2 : 2.5) * fontSize}px; display: ${displayState.about}`"
    ) {{ $translation('hello.about') }}
</template>

<script>
import { translate } from '@/plugins/translate'

export default {
  name: 'Hello',
  mixins: [translate],
  props: ['end'],
  data() {
    return {
      w: 0,
      fontSize: 0,
      displayState: {
        hello: 'none',
        this: 'none',
        website: 'none',
        is: 'none',
        about: 'none',
      },
      animationItems: ['hello', 'this', 'website', 'is', 'about', 'route'],
    }
  },
  created() {
    window.addEventListener('load', this.setFontSize)
    window.addEventListener('resize', this.setFontSize)
    this.setFontSize()
  },
  updated() {
    this.setFontSize()
  },
  mounted() {
    this.animateHello()
  },
  beforeDestroy() {
    window.removeEventListener('load', this.setFontSize)
    window.removeEventListener('resize', this.setFontSize)
  },
  methods: {
    setFontSize() {
      this.w = window.innerWidth
      // console.log(this.w)
      this.fontSize =
        window.innerWidth > window.innerHeight
          ? Math.floor(window.innerHeight / 10)
          : Math.floor(window.innerWidth / 10)
    },
    animateHello() {
      this.animationItems.map((item, index) => {
        setTimeout(() => {
          this.changeItem(item)
        }, index * 500)
      })
    },
    changeItem(item) {
      if (item === 'route') {
        setTimeout(() => {
          //  this.$router.push('/home')
          this.$emit('ended')
        }, 1000)
      }
      this.displayState[item] = 'inline-block'
    },
  },
}
</script>

<style lang="scss">
.hello {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .h {
    position: relative;
    width: 90vw;
    height: 80vh;
    color: red;
    margin-top: 50px;
    @media screen and (max-width: 1066px) {
      margin-top: 30vh;
    }

    [class^='h-'] {
      font-weight: bold;
      line-height: 1;
    }
    &-hello {
      color: white;
      display: inline-block;
      font-size: 1140%;
      margin-right: 0;
      margin-left: auto;
    }
    &-this {
      color: white;
      font-size: 430%;
      position: absolute;
      right: -2vw;
      top: 6vh;
      animation-name: bounceInDownThere;
      @keyframes bounceInDownThere {
        from,
        60%,
        75%,
        90%,
        to {
          animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        0% {
          opacity: 0;
          transform: translate3d(0, -3000px, 0) rotate(-90deg);
        }

        60% {
          opacity: 1;
          transform: translate3d(0, 25px, 0) rotate(-90deg);
        }

        75% {
          transform: translate3d(0, -10px, 0) rotate(-90deg);
        }

        90% {
          transform: translate3d(0, 5px, 0) rotate(-90deg);
        }

        to {
          transform: translate3d(0, 0, 0) rotate(-90deg);
        }
      }
    }
    &-is {
      color: white;
      font-size: 25vh;
      position: absolute;
      bottom: -5vh;
      left: 0;
      @media screen and (max-width: 1066px) {
        position: relative;
      }
    }
    &-website {
      color: white;
      font-size: 25vh;
      top: 7.5vh;
      display: inline-block;
      right: 6.5vw;
      @media screen and (max-width: 1066px) {
        margin-top: 5vh;
      }
    }
    &-about {
      position: absolute;
      color: white;
      font-size: 25vh;
      bottom: -5vh;
      right: 1vw;
      @media screen and (max-width: 1066px) {
        position: relative;
      }
    }
  }
}
</style>
