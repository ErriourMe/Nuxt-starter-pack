import Echo from 'laravel-echo'

export default function ({ app }) {
  window.io = require('socket.io-client')
  window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: process.env.WSS_LINK,
    encrypted: true,
    disableStats: true,
    transports: ['websocket'],
    auth: {
      headers: {
        Authorization: `Bearer ${app.$cookies.get('auth_token')}`,
      },
    },
  })
}
