module.exports = {
  apps: [
    {
      name: 'Evangelickyzpevnik',
      port: '3000',
      exec_mode: 'cluster',
      instances: process.env.N_INSTANCES || '1', // Or a number of instances
      script: './.output/server/index.mjs'
    }
  ]
}