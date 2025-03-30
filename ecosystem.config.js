module.exports = {
    apps: [{
      name: 'app',
      script: 'dist/main.js',
      instances: 1,
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'production'
      }
    }]
  }