<template lang="pug">
.login
  .form-body
    form.form.animated.bounceInLeft
      h2 {{ $translation("login.title") }}
      .form-inputs
        .input__field
          input#name.form-inputs__field-input.in-fi(
            v-model='form.name',
            type='text',
            name='name',
            data-errormessage-value-missing='Required',
            data-errormessage-type-mismatch='Too short',
            placeholder='',
            required,
            @mouseenter='inputHoverEvent',
            @mouseleave='inputLeaveEvent'
          )
          .error(v-if='formErrors.name') {{ errorMessage }}
          label.name(
            for='name',
            :class='{ "in-focus": form.name && form.name.length }'
          ) {{ $translation("login.form_name") }}
        .input__field
          input#password.form-inputs__field-input.in-fi(
            v-model='form.password',
            type='password',
            name='password',
            placeholder=' ',
            required,
            @mouseenter='inputHoverEvent',
            @mouseleave='inputLeaveEvent'
          )
          .error(v-if='formErrors.password') {{ errorMessage }}
          label.password(
            for='password',
            :class='{ "in-focus": form.password && form.password.length }'
          ) {{ $translation("login.form_password") }}

  .form-controls.animated.bounceInRight
    a.btn(
      type='submit',
      @click.prevent='submitForm()',
      @mouseover='hoverEvent',
      @mouseleave='leaveEvent'
    ) {{ $translation("login.form_submit") }}
    .form-messages(ref='formReport')
    .error(v-if='authError') {{ errorMessage }}
</template>

<script>
import { translate } from '@/plugins/translate'
import FormModel from '@/models/login'
import { thisExpression } from '@babel/types'

const form = new FormModel('', '')

export default {
  name: 'Login',
  mixins: [translate],
  data() {
    return {
      env: {
        baseUrl: '',
      },
      form,
      formErrors: {
        name: false,
        password: false,
      },
      authError: false,
      errorMessage: '',
    }
  },
  mounted() {
    if (this.$store.state.user.isAuthorized) {
      return this.$router.push('/documents')
    }
    this.$el.scrollTo(0, 0)
    if (process.env.$baseUrl) this.env.baseUrl = process.env.$baseUrl
  },
  methods: {
    hoverEvent(e) {
      this.$emit('hoverEvent', e)
    },
    leaveEvent(e) {
      this.$emit('leaveEvent', e)
    },
    inputHoverEvent(e) {
      this.$emit('inputHoverEvent', e)
    },
    inputLeaveEvent(e) {
      this.$emit('inputLeaveEvent', e)
    },
    submitForm() {
      console.log(this.$store, this.form)
      this.$store.dispatch('login', this.form).then(() => {
        if (this.$store.state.user.isAuthorized) {
          return this.$router.push('/documents')
        }
        this.authError = true
        this.errorMessage = 'Not authorized!'
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/styles/Login.styl'
</style>
