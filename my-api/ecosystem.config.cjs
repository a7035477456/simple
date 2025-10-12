module.exports = {
  apps: [{
    name: 'vsinglesclubweb',
    script: './app.js',
    exec_mode: 'cluster',
    instances: 'max',
    env: {
      NODE_ENV: 'production',
      PORT: 40000,
      PGWRITE_HOST: '192.168.230.203',
      PGREAD_HOST:  '127.0.0.1',
      PG_DATABASE:  'simple',
      PG_USER:      'simpleuser',
      PG_PASSWORD:  'CHANGE_ME',
      PG_PORT:      '5432'
    }
  }]
};

