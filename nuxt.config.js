export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Lato|Unica+One|Material+Icons'
      }
    ]
  },
  loading: { color: '#fff' },
  css: [],
  plugins: [
    { src: '~/plugins/starRating.js', mode: 'client' },
    '~/plugins/globalMethods.js',
    '~/plugins/updateClient.js'
  ],
  vuetify: {
    customVariables: ['@/assets/scss/_variables.scss'],
    optionsPath: '@/vuetify.options.js'
  },

  styleResources: {
    scss: ['@/assets/scss/_init.scss'] // alternative: scss
  },
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/global-components',
    '@nuxtjs/style-resources',
    '@nuxtjs/vuetify'
  ],
  modules: ['@nuxt/content'],
  content: {
    // Options
  },
  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content()
        .only(['path'])
        .fetch()
      return files
    }
  },
  build: {
    extend: (config) => {
      const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))

      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      config.module.rules.push({
        test: /\.svg$/,
        use: ['babel-loader', 'vue-svg-loader']
      })
    }
  }
}
