require('dotenv').config()
export default {
  target: 'static',
  env: {
    $env: '',
    $baseUrl: 'https://nenadbursac.com',
    $lng: 'en',
    GA_ID: 'UA-70419632-4',
    BROWSER_BASE_URL: 'https://nenadbursac.com',
    WEATHER_ID: 'e4331cc37f866b6b58af862892bb0263',
    MAIL_URL: '/mail/send',
    MAIL_FROM: 'nenad@nenadbursac.com',
    MAIL_TO: 'nenad@nenadbursac.com',
    MAIL_HOST: 'mail.nenadbursac.com',
    MAIL_PORT: 465,
    MAIL_USER: 'nenad@nenadbursac.com',
    MAIL_KEY: 'eFge4yip9eBcs4r',
    MAIL_SERVICE: 'gmail',
    admin: 'test',
    admin_key: 'test'
  },
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
  css: [],
  plugins: ['~/plugins/translate.js'],
  components: true,
  middleware: ['auth'],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/google-analytics',
    '@nuxtjs/dotenv',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/dotenv',
    [
      'nuxt-mail',
      {
        message: [
          { name: 'contact', to: process.env.MAIL_TO, cc: '', bcc: '' },
        ],
        smtp: {
          // service: process.env.MAIL_SERVICE,
          // auth: {
          //   user: process.env.MAIL_TO,
          //   pass: process.env.MAIL_KEY,
          // },
          host: process.env.MAIL_HOST,
          port: process.env.MAIL_PORT,
          to: process.env.MAIL_TO,
          cc: '',
          bcc: '',
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_KEY,
          },
        },
      },
    ],
  ],
  axios: {
    baseURL: process.env.BASE_URL,
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.$baseUrl,
    },
  },
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  // content: {},
  build: {},
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
      baseURL:
        process.env.$baseUrl | process.env.BASE_URL | 'https://nenadbursac.com',
      browserBaseURL:
        process.env.$baseUrl | process.env.BASE_URL | 'https://nenadbursac.com',
    },
  },
}
