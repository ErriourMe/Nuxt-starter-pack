// import Vue from 'vue'

export default function ({ $axios, store }) {
  if (Object.keys(store.getters['user/currentUser']).length) {
    $axios
      .post(`${process.env.API_ROUTE}/${process.env.API_VERSION}/auth/me`)
      .then((res) => {
        store.dispatch('user/refreshed', { user: res.data.data })
        // if (Object.keys(res.data.data.roles).length > 0)
        //   Vue.prototype.$gates.setRoles(Object.keys(res.data.data.roles))
        // if (Object.keys(res.data.data.permissions).length > 0)
        //   Vue.prototype.$gates.setPermissions(
        //     Object.keys(res.data.data.permissions)
        //   )
      })
  }
}
