import colors from 'vuetify/es5/util/colors'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - simateb',
    title: 'simateb',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/filter.js',
    '~/plugins/functions.js',
    {src: '~/plugins/datepicker.js', ssr: false},
    {src: '~/plugins/multiselect.js', ssr: false},
    {src: '~/plugins/money.js', ssr: false},
    {src: '~/plugins/cropper.js', ssr: false},
    {src: '~/plugins/persianFilter.js', ssr: false},
    {src: '~/plugins/notification.js', ssr: false},
    {src: '~/plugins/vuelidate.js', ssr: false},
    {src: '~/plugins/topersian.js', ssr: false},
    {src: '~/plugins/apexchart.js', ssr: false},
    {src: '~/plugins/password-strength.js', ssr: false},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    ['@nuxtjs/vuetify', {rtl: true}],
    'nuxt-moment-jalaali',
    '@nuxtjs/pwa'
  ],

  moment: {
    defaultLocale: 'fa',
    locales: ['fa'],
    timezone: {
      matchZones: ['Asia/Tehran'],
      startYear: 1800,
      endYear: 2100
    }
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    'vue-toastification/nuxt',
    "nuxt-compress"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      title: 'سیماطب',
      author: 'سعید حیدری',
    },
    manifest: {
      name: 'سیماطب',
      short_name: 'سیماطب',
      lang: 'fa'
    },
    icon: {
      sizes: [64, 120, 144, 152, 192, 384, 512],
    },
    "icons": [
      {
        "src": "images/logo.png",
        "sizes": "48x48",
        "type": "image/png"
      },
      {
        "src": "images/logo.png",
        "sizes": "72x72",
        "type": "image/png"
      },
      {
        "src": "images/logo.png",
        "sizes": "96x96",
        "type": "image/png"
      },
      {
        "src": "images/logo.png",
        "sizes": "144x144",
        "type": "image/png"
      },
      {
        "src": "images/logo.png",
        "sizes": "168x168",
        "type": "image/png"
      },
      {
        "src": "images/logo.png",
        "sizes": "192x192",
        "type": "image/png"
      }
    ],
    targetDir: "static"
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    icons: {
      iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    theme: {
      rtl: true,
      dark: false,
      light: true,
      themes: {
        light: {
          primary: colors.blue.lighten2,
          accent: colors.grey.lighten3,
          secondary: colors.amber.lighten3,
          info: colors.teal.darken1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent1,
          success: colors.green.accent2
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: [
      'vue-cropper'
    ]
  },
  server: {
    port: 5000,
    host: '0.0.0.0'
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8000/api'
  }
}
