import axios from 'axios'

require('dotenv').config();
const { API_KEY } = process.env;

export default {
  privateRuntimeConfig: {
    apiKey: API_KEY
  },
  publicRuntimeConfig: {
    apiKey: process.env.NODE_ENV !== 'production' ? API_KEY : undefined
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - pgkuroneru's pjsekai playlog` : 'pgkuroneru\'s pjsekai playlog';
    },
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'pgkuroneru\'s pjsekai playlog' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://playlog-for-pjsekai.pgkuroneru.blog' },
      { hid: 'og:title', property: 'og:title', content: 'pgkuroneru blog' },
      { hid: 'og:description', property: 'og:description', content: 'PGクロネルのプロセカプレイ日記' },
      { hid: 'og:image', property: 'og:image', content: '' },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', property: 'twitter:site', content: '@pgkuroneru' },
      { hid: 'twitter:creator', property: 'twitter:creator', content: '@pgkuroneru' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      presets({ isServer }, [preset, options]) {
        options.loose = true
      },
    },
  },

  generate: {
    async routes() {
      const pages = await axios
        .get('https://playlog-for-pjsekai.microcms.io/api/v1/blog/?limit=100', {
          headers: { 'X-API-KEY': API_KEY }
        })
        .then((res) =>
          res.data.contents.map((content) => ({
            route: `/${content.id}`,
            payload: content
          }))
        )
      return pages
    }
  }
}
