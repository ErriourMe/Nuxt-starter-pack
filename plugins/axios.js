/* eslint-disable no-prototype-builtins */
export default function ({ $axios, store, app }) {
  $axios.interceptors.request.use(
    (config) => {
      config.headers.common.Language = app.i18n.locale
      config.headers.common.Authorization = `Bearer ${
        app.$cookies.get('token') || store.state.user.currentUser.access_token
      }`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  $axios.interceptors.response.use(
    (success) => {
      if (success.data.hasOwnProperty('message')) {
        const obj = success.data.message
        if (typeof obj === 'string') {
          if (success.data.success) {
            if (process.client) app.$toast.success(obj)
          } else if (process.client) app.$toast.error(obj)
        } else {
          for (const key in obj) {
            if (success.data.success) {
              if (process.client) app.$toast.success(obj[key])
            } else if (process.client) app.$toast.error(obj[key])
          }
        }
      }

      if (success.data.success && success.data.hasOwnProperty('redirect')) {
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
      if (error.response && error.response.status === 401) {
        app.$toast.error('Необходим вход под своим аккаунтом')
        // store.commit('logout');
        // app.router.push('/login');
      } else if (
        !error.response.data.success &&
        error.response.data.hasOwnProperty('message') &&
        process.client
      ) {
        const obj = error.response.data.message
        if (typeof obj === 'string') {
          app.$toast.error(obj)
        } else {
          for (const key in obj) {
            app.$toast.error(obj[key])
          }
        }
      } else if (error.response && error.response.status >= 500) {
        if (process.client) app.$toast.error('Произошла ошибка сервера')
      }

      return Promise.reject(error)
    }
  )
}
