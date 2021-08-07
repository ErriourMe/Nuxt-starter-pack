export const actions = {
  async nuxtServerInit(store, context) {
    if (context.app.$cookies.get('auth_token')) {
      try {
        const credintails = await this.$axios.get(
          `${process.env.API_DOMAIN}/${process.env.API_VERSION}/auth/me`
        )
        store.commit('user/refreshed', { user: credintails.data.data.user })
      } catch (err) {
        if (err.response?.status === 401) {
          store.dispatch('user/logout')
        }
      }
    }
  },
}
