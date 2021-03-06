module.exports = {
  apps: [{
    name: 'ieeevr-server',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-34-193-90-224.compute-1.amazonaws.com',
      key: '~/.ssl/ieeevrawstoplevelserversshkey.pem',
      ref: 'origin/master',
      repo: 'git@github.com:blairmacintyre/ieeevr-main-online-server.git',
      path: '/home/ubuntu/ieeevr-server',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
