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
  loading: '~/components/loading.vue',
  css: [],
  plugins: ['@/plugins/globalMethods.js', '@/plugins/updateClient.js'],
  vuetify: {
    customVariables: ['~/assets/scss/_variables.scss'],
    optionsPath: '~/vuetify.options.js'
  },

  styleResources: {
    scss: ['~/assets/scss/_init.scss'] // alternative: scss
  },
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources'
  ],
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
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

      return files.map((file) => (file.path === '/index' ? '/' : file.path))
    }
  },
  build: {
    extend(config, ctx) {}
  }
}
