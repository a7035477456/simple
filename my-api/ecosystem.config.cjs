module.exports = {
  apps: [{
    name: 'vsinglesclubweb',
    script: './app.js',
    exec_mode: 'cluster',
    instances: '2', //max is for all avail core*cpus*threads
    env: {
      NODE_ENV: 'production',
      PORT: 40000,
      PGWRITE_HOST: '192.168.230.203',
      PGREAD_HOST:  '127.0.0.1',
      PG_DATABASE:  'simple',
      PG_USER:      'postgres',
      PG_PASSWORD:  'zassamjkkj4$',
      PG_PORT:      '50010'
    }
  }]
};

