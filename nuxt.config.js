export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: `EO Portfolio | ${process.env.npm_package_name || ''}`,
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
    { src: '~/plugins/youtube.js', ssr: false },
    '~/plugins/globalMethods.js',
    '~/plugins/directives.js'
  ],
  vuetify: {
    customVariables: ['~/assets/scss/_variables.scss'],
    optionsPath: '~/vuetify.options.js'
  },

  styleResources: {
    scss: ['@/assets/scss/_init.scss'] // alternative: scss
  },
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/global-components',
    '@nuxtjs/google-analytics',
    '@nuxtjs/style-resources'
  ],
  googleAnalytics: {
    id: 'G-7T0JLV856W'
  },
  modules: ['@nuxt/content'],
  content: {
    // Options
  },
  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content({ deep: true })
        .only(['path'])
        .fetch()
      return files.map((file) => (file.path === '/index' ? '/' : file.path))
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
    },
    postcss: {
      plugins: {
        'postcss-import': true
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true
        }
      }
    }
  }
}
