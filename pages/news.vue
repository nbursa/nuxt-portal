<template lang="pug">
.news
  h2.animated.bounceInDown Subscribe
  p.animated.bounceInLeft
    | Drop your email down there
    br
    em
      small ...for no reason at all!
  form.animated.bounceInRight
    .input-field
      input.in-fi(
        v-model='form.mail'
        name='mail'
        placeholder=' '
        type='email'
        data-errormessage='Enter valid email address i.e. example@example.com'
        required=''
      )
      label(for='email') Enter your email
    .form-messages
    button.btn(
      type='submit'
      @click.prevent='submitForm()'
    ) And ship it

</template>

<script>
import axios from 'axios'

export default {
  name: 'News',
  data() {
    return {
      url: '/mail.php',
      form: {
        mail: '',
      },
    }
  },
  methods: {
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
