import { mapState, mapActions } from 'vuex'
import translations from '~/lang'

export const translate = {
  computed: {
    ...mapState(['language', 'languages']),
    langTranslation() {
      return translations[this.languages.indexOf(this.language)]
    },
  },
  methods: {
    ...mapActions(['setLang']),
    $translation(string) {
      const [moduleName, property] = string.split('.')
      return this.langTranslation[moduleName][property]
    },
    setLanguage(lang) {
      if (this.languages.includes(lang)) return this.setLang(lang)
      const lng = this.languages.filter((l) => l !== this.language)[0]
      this.setLang(lng)
    },
  },
}
