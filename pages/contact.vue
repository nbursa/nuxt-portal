<template lang="pug">
.contact
  .form-body
    form.form.animated.bounceInLeft
      h2 {{ $translation("contact.title") }}
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
          ) {{ $translation("contact.form_name") }}
        .input__field
          input#mail.form-inputs__field-input.in-fi(
            v-model='form.mail',
            type='email',
            name='mail',
            placeholder=' ',
            required,
            @mouseenter='inputHoverEvent',
            @mouseleave='inputLeaveEvent'
          )
          .error(v-if='formErrors.email') {{ errorMessage }}
          label.mail(
            for='mail',
            :class='{ "in-focus": form.mail && form.mail.length }'
          ) {{ $translation("contact.form_email") }}
        .input__field
          textarea#message.form-inputs__field-textarea.in-fi(
            v-model='form.message',
            name='message',
            cols='50',
            rows='4',
            placeholder=' ',
            required='',
            @mouseenter='inputHoverEvent',
            @mouseleave='inputLeaveEvent',
            data-gramm_editor='false',
            :class='{ "have-content": form.message && form.message.length }'
          )
          .error(v-if='formErrors.message') {{ errorMessage }}
          label.message(
            for='message',
            :class='{ "in-focus": form.message && form.message.length }'
          ) {{ $translation("contact.form_message") }}
  .form-controls.animated.bounceInRight
    a.btn(
      type='submit',
      @click.prevent='submitForm()',
      @mouseover='hoverEvent',
      @mouseleave='leaveEvent'
    ) {{ $translation("contact.form_send") }}
    .form-messages(ref='formReport')
    //- .inline
    //-   NuxtLink.link.openpop(
    //-     to='/request',
    //-     @mouseover.native='hoverEvent',
    //-     @mouseleave.native='leaveEvent'
    //-   ) {{ $translation("contact.form_contact") }}
</template>

<script>
import { translate } from '@/plugins/translate'
import FormModel from '@/models/form'

const form = new FormModel('', '', '')

export default {
  name: 'Contact',
  mixins: [translate],
  data() {
    return {
      form,
      formErrors: {
        name: false,
        email: false,
        message: false,
      },
      errorMessage: '',
    }
  },
  mounted() {
    this.$el.scrollTo(0, 0)
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
      if (!this.form.name || this.form.name.length < 3) {
        this.formErrors.name = true
        this.errorMessage = 'Name is required, must have at least 3 characters.'
        return
      }
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      // console.log('test: ', re.test(String(this.form.mail).toLowerCase()))
      if (!this.form.mail) {
        this.formErrors.email = true
        this.errorMessage = 'Email is required.'
        return
      } else if (!re.test(String(this.form.mail).toLowerCase())) {
        this.formErrors.email = true
        this.errorMessage =
          'Email ust be in email format(for example: name@emailprovider.com)'
        return
      }
      if (!this.form.message) {
        this.formErrors.message = true
        this.errorMessage = 'Message is required, please type your message.'
        return
      }
      this.$nuxt.$axios
        .$post('/mail/send', {
          config: 'contact',
          from: process.env.MAIL_FROM,
          subject: 'Message from nenadbursac.com',
          text: `New contact message from "${this.form.name}, <${this.form.mail}>":\n\n${this.form.message}`,
          to: process.env.MAIL_TO,
        })
        .then((response) => {
          if (response === 'OK') {
            this.$refs.formReport.innerHTML = 'Message successfully sent!'
            this.form = new FormModel('', '', '')
            this.formErrors = {
              name: false,
              email: false,
              message: false,
            }
            this.errorMessage = ''
            return
          }
          this.$refs.formReport.innerHTML = response
        })
        .catch((error) => {
          this.$refs.formReport.innerHTML = `${error}
            ${JSON.stringify(error.response.data.response)}`
        })
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/styles/Contact.styl'

.contact
  padding 20px
  margin-top 50vh
  transform translateY(-50%)

  .form-body
    margin-bottom 50px

    .input__field
      position relative

      .error
        color red

      textarea
        margin-top 50px
        height 50px

        &:focus, &.have-content
          height auto
          min-height 50px

      label
        font-size 10px
        transform scale(1.5) translateY(0)
        transform-origin top left
        position absolute
        bottom 30px
        left 0px
        transition bottom 0.25s ease-out, transform 0.15s ease-in

      label.in-focus, input:focus + label
        bottom 60px
        transform scale(1) translateY(0)

      textarea + label.in-focus, textarea:focus + label
        top 0
        bottom auto
        transform scale(1) translateY(0)

  .form-controls
    .form-messages
      margin 40px 0 20px

  .in-fi, .btn, .link
    cursor none

  .inline
    display inline-block

  .in-fi
    margin-bottom 10px

  @media screen and (min-width 550px)
    max-width 400px
    margin 50vh auto 0
</style>
