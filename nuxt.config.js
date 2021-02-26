import { langConfig } from './config/langConfig'
import { bootstrapConfig } from './config/bootstrapConfig'
import { momentConfig } from './config/momentConfig'
import { toastConfig } from './config/toastConfig'
// import { PWAConfig } from './config/PWAConfig'

export default {
  env: {
    API_ROUTE: 'https://example.io/api',
    API_VERSION: 'v1',
  },

  render: {
    resourceHints: false,
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      },
    },
  },

  hooks: {
    'vue-renderer:ssr:context'(context) {
      const routePath = JSON.stringify(context.nuxt.routePath)
      context.nuxt = { serverRendered: true, routePath }
    },
  },

  head: {
    title: 'starter-pack',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['~/assets/scss/bootstrap.scss', '~/assets/scss/global.scss'],

  plugins: [
    { src: '~/plugins/localStorage', ssr: false },
    { src: '~/plugins/axios', ssr: false },
    // { src: '~/plugins/laravelPermissions', ssr: false },
    // { src: '~/plugins/init', ssr: false },
    { src: '~/plugins/lazySizes', ssr: true },
  ],

  components: false,

  buildModules: ['@nuxtjs/eslint-module'],

  modules: [
    ['@nuxtjs/toast', toastConfig],
    'cookie-universal-nuxt',
    ['bootstrap-vue/nuxt', bootstrapConfig],
    ['@nuxtjs/moment', momentConfig],
    ['nuxt-i18n', langConfig],
    '@nuxtjs/svg-sprite',
    '@nuxtjs/axios',
    // ['@nuxtjs/pwa', PWAConfig],
  ],

  loading: { color: '#a922d2', throttle: 0 },

  /*
  // Fallback (for example, for categories or news by categories)
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'fallback',
        path: '*',
        component: resolve(__dirname, 'pages/_fallback.vue'),
      })
    },
  },
  */

  build: {
    // analyze: true,
    extractCSS: process.env.NODE_ENV !== 'development',

    // Don't save cache in dev (for CloudFlare)
    devMiddleware: {
      headers: {
        'Cache-Control': 'no-store',
        Vary: '*',
      },
    },

    '@fullhuman/postcss-purgecss': {
      content: [
        './pages/**/*.vue',
        './layouts/**/*.vue',
        './components/**/*.vue',
        './content/**/*.md',
        './content/**/*.json',
      ],
      whitelist: [
        'html',
        'body',
        'has-navbar-fixed-top',
        'nuxt-link-exact-active',
        'nuxt-progress',
      ],
      whitelistPatternsChildren: [/svg-inline--fa/, /__layout/, /__nuxt/],
    },

    extend(config, { isDev, isClient, loaders: { vue } }) {
      // Image lazy load
      if (isClient) {
        vue.transformAssetUrls.img = ['data-src', 'src']
        vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }

      // ESLint tests
      if (isDev) {
        config.resolve.symlinks = false
      }

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
