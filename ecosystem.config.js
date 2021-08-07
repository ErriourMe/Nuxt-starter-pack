module.exports = {
  apps: [
    {
      name: 'nuxt', // TODO: Rename for identification
      exec_mode: 'cluster',
      port: 3000,
      script: './node_modules/nuxt/bin/nuxt.js',
      cwd: './',
      args: 'start',
      instances: 4,
      autorestart: true,
      exp_backoff_restart_delay: 100,
      watch: true,
      ignore_watch: ['node_modules', 'static', '.git', 'app.html'],
      max_memory_restart: '512M',
    },
  ],
}
