module.exports = {
  apps: [
    {
      name: 'vsinglesclubweb',
      script: './app.js',
      cwd: __dirname,              // run from my-api/
      instances: 1,                 // or 'max' if you want cluster
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 40000,
        HOST: '0.0.0.0'
      },
      max_memory_restart: '512M',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
};

