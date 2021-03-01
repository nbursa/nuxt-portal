<template lang="pug">
.request
  h2 {{$translation('request.title')}}
  form.animated.slideInLeft
    .input-field.rqmail
      input.in-fi(
        v-model="form.mail",
        type="email",
        name="mail",
        data-errormessage="Enter valid email address i.e. example@example.com",
        placeholder=" ",
        required="",
        @mouseover="inputOver()",
        @mouseleave="inputLeave()"
      )
      label(for="mail") {{$translation('request.email')}}
    br
    br
    br
    .form-messages
    .sender
      button.btn(
        type="submit",
        @click.prevent="submitForm",
        @mouseover="btnOver()",
        @mouseleave="btnLeave()"
      ) {{$translation('request.send')}}
</template>

<script>
import axios from 'axios'
import { translate } from '@/plugins/translate'

export default {
  name: 'Request',
  mixins: [translate],
  data() {
    return {
      url: '../scripts/request.php',
      form: {
        mail: '',
      },
    }
  },
  beforeDestroy() {
    this.inputLeave()
    this.btnLeave()
  },
  methods: {
    inputOver() {
      const cursor = document.documentElement.querySelector('.cursor')
      cursor.classList.add('input-hover')
    },
    inputLeave() {
      const cursor = document.documentElement.querySelector('.cursor')
      cursor.classList.remove('input-hover')
    },
    btnOver() {
      const cursor = document.documentElement.querySelector('.cursor')
      cursor.classList.add('btn-hover')
    },
    btnLeave() {
      const cursor = document.documentElement.querySelector('.cursor')
      cursor.classList.remove('btn-hover')
    },
    submitForm() {
      const self = this
      const qs = require('qs')
      axios
        .post(this.url, qs.stringify(this.form))
        .then((response) => {
          this.$el.querySelector('.form-messages').innerHTML = response.data
          self.form = {
            mail: '',
          }
        })
        .catch((error) => {
          this.$el.querySelector('.form-messages').innerHTML =
            error + ' ' + error.response.data
        })
    },
  },
}
</script>

<style lang="stylus">
.request
  padding 20px
  margin-top 50vh
  transform translateY(-50%)
  .in-fi,
  .btn
    cursor none
  .in-fi
    margin-bottom 10px
  @media screen and (min-width: 550px)
    max-width 400px
    margin 50vh auto 0
</style>
