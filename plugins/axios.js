import qs from 'qs'

export default function ({ $axios, store, app }) {
  $axios.interceptors.request.use(
    (config) => {
      config.headers.common.Language = app.i18n.locale
      config.headers.common.Authorization = `Bearer ${
        app.$cookies.get('auth_token') ||
        store.state.user.currentUser.access_token
      }`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  $axios.onRequest((config) => {
    config.paramsSerializer = (params) =>
      qs.stringify(params, { arrayFormat: 'indices' })
    return config
  })

  $axios.interceptors.response.use(
    (success) => {
      const template = require('~/templates/notifications/full')
      const data = JSON.stringify(success.data).replace(
        /{API_DOMAIN}/g,
        process.env.API_DOMAIN
      )
      success.data = JSON.parse(data)

      if (success.data?.messages && process.client) {
        const obj = success.data.messages
        if (typeof obj === 'string') {
          if (success.data.success) {
            if (process.client) app.$toast.success(obj)
          } else if (process.client) app.$toast.error(obj)
        } else {
          for (const key in obj) {
            if (success.data.success) {
              if (process.client)
                app.$toast.success(template(obj[key]), {
                  duration: obj[key]?.duration || 10000,
                })
            } else if (process.client)
              app.$toast.error(template(obj[key]), {
                duration: obj[key]?.duration || 10000,
              })
          }
        }
      }

      if (success.data.success && success.data?.redirect) {
        if (success.data.redirect.type === 'back') {
          app.router.go(-1)
        } else if (success.data.redirect.type === 'external') {
          if (process.client) document.location = success.data.redirect.link
        } else if (process.client) app.router.push(success.data.redirect.link)
        return
      }

      return Promise.resolve(success)
    },
    (error) => {
      const template = require('~/templates/notifications/full')
      if (error.response && error.response.status === 401) {
        // if (process.client) app.$toast.error(app.i18n.t('error.401'))
        store.commit('logout')
      } else if (
        error.response &&
        error.response.status === 403 &&
        !error.response.data.messages
      ) {
        if (process.client)
          app.$toast.error(
            template({
              text: app.i18n.t('errors.403'),
            })
          )
      } else if (
        !error.response.data.success &&
        error.response.data?.messages &&
        process.client
      ) {
        const obj = error.response.data.messages
        if (typeof obj === 'string') {
          app.$toast.error(template(obj), {
            duration: obj?.duration || 10000,
          })
        } else {
          for (const key in obj) {
            app.$toast.error(template(obj[key]), {
              duration: obj[key]?.duration || 10000,
            })
          }
        }
      } else if (error.response && error.response.status >= 500) {
        if (process.client)
          app.$toast.error(
            template({
              text: app.i18n.t('error.500'),
            })
          )
      }

      return Promise.reject(error)
    }
  )
}
