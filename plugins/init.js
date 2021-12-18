import Vue from 'vue'

export default function ({ $axios, store, app, route }) {
  if (app.$cookies.get('token')) {
    $axios
      .get(`${process.env.API_ROUTE}/${process.env.API_VERSION}/auth/me`)
      .then((res) => {
        const userData = res.data.data.credintails.user
        store.dispatch('user/refreshed', { user: userData })
        if (Object.keys(userData.roles).length > 0)
          Vue.prototype.$gates.setRoles(Object.keys(userData.roles))
        if (Object.keys(userData.permissions).length > 0)
          Vue.prototype.$gates.setPermissions(Object.keys(userData.permissions))

        if (process.client) {
          console.log(
            '%c%s',
            `
                background-color: red;
                color: #fff;
                padding: 10px 20px;
                font-size: 18px;
                border-radius: 5px;
              `,
            app.i18n.t('consoleSecurity')
          )
        }
      })
      .catch((err) => {
        console.log(err)
        if (err.response?.status === 401) {
          app.$cookies.remove('token')
          store.dispatch('user/logout')
        }
      })
  } else {
    store.dispatch('user/logout')
  }
}
