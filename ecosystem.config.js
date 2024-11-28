module.exports = {
  apps: [
    {
      name: 'Simateb',
      exec_name: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}



