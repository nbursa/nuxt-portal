<template lang="pug">
.not-found
  H1 NOT FOUND
</template>

<script>
import { translate } from '@/plugins/translate'

export default {
  name: 'NotFound',
  mixins: [translate],
  props: ['end'],
  data() {
    return {}
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
    // this.animateHello()
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
    // animateHello() {
    //   this.animationItems.map((item, index) => {
    //     setTimeout(() => {
    //       this.changeItem(item)
    //     }, index * 500)
    //   })
    // },
    // changeItem(item) {
    //   if (item === 'route') {
    //     setTimeout(() => {
    //       //  this.$router.push('/home')
    //       this.$emit('ended')
    //     }, 1000)
    //   }
    //   this.displayState[item] = 'inline-block'
    // },
  },
}
</script>

<style lang="stylus">
.not-found
  width 100vw
  //height calc(100vh - 100px)
  height 100vh
  display flex
  align-items center
  justify-content center
</style>
