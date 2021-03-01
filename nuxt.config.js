export default {
  baseUrl: process.env.BASE_URL,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Nenad Bursać - Frontend Developer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Nenad Bursać - Web Frontend Developer playing with JavaScript, Nuxt, Vue, Angular, React, Node, typescript, stylus, Pug...(Vue.js, Angular, React.js)...👋🤚🖐✋🖖👌🤌🤏✌️🤞🤟🤘🤙👈👉👆🖕👇☝️👍👎✊👊🤛🤜👏🙌👐🤲🤝🙏✍️💅🤳💪🦾🦵🦿🦶👣👂🦻👃🫀🫁🧠🦷🦴👀👁👅👄💋🩸👋🤚🖐✋🖖👌🤌🤏✌️🤞🤟🤘🤙👈👉👆🖕👇☝️👍👎✊👊🤛🤜👏🙌👐🤲🤝🙏✍️💅🤳💪🦾🦵🦿🦶👣👂🦻👃🫀🫁🧠🦷🦴👀👁👅👄💋🩸',
      },
      { httpEquiv: 'Content-Type', content: 'text/html', charset: 'utf-8' },
      { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:title',
        content: 'Nenad Bursać - Web Frontend Developer',
      },
      {
        property: 'og:description',
        content: 'Web front-end developer | nenadbursac.com',
      },
      {
        property: 'og:url',
        content: 'https://nenadbursac.com/',
      },
      {
        property: 'og:image',
        content: 'https://nenadbursac.com/images/thumb.png',
      },
      {
        property: 'og:image:secure_url',
        content: 'https://nenadbursac.com/images/thumb.png',
      },
      {
        property: 'og:image:width',
        content: '1921',
      },
      {
        property: 'og:image:height',
        content: '872',
      },
      {
        property: 'og:image:alt',
        content: 'Web Frontend Developer | nenadbursac.com',
      },
      {
        property: 'og:image:type',
        content: 'image/png',
      },
      {
        property: 'fb:app_id',
        content: '788699524603971',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      { name: 'twitter:site', content: '@nbursac77' },
      { name: 'twitter:creator', content: '@nbursac77' },
      {
        name: 'twitter:title',
        content: 'Web Frontend Developer | nenadbursac.com',
      },
      { name: 'twitter:description', content: 'https://nenadbursac.com' },
      {
        name: 'twitter:image',
        content: 'https://nenadbursac.com/images/thumb.png',
      },
      {
        name: 'twitter:image:alt',
        content: 'Front-end designer-developer | nenadbursac.com',
      },
      {
        name: 'msapplication-TileColor',
        content: 'deepskyblue',
      },
      {
        name: 'theme-color',
        content: 'deepskyblue',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/translate.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://google-analytics.nuxtjs.org/setup
    '@nuxtjs/google-analytics',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    [
      'nuxt-mail',
      {
        smtp: {
          host: process.env.MAIL_HOST,
          port: 465,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_KEY,
          },
        },
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:4000', // Used as fallback if no runtime config is provided
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // ENV
  env: { $lng: 'en' },

  loading: {
    color: 'deepskyblue',
    failedColor: 'crimson',
    height: '5px',
    duration: 200,
    rtl: true,
    throttle: 0,
    continuous: true,
  },

  googleAnalytics: {
    id: process.env.GA_ID,
  },

  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GA_ID,
    },
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
  },

  target: 'static',
}
