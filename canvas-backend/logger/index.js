const winston = require('winston');

winston.loggers.add('development', {
  console: {
    level: 'debug',
    colorize: true,
    label: 'Dash Server',
    json: false,
    timestamp: true,
  },
});

winston.loggers.add('production', {
  console: {
    level: 'info',
    colorize: true,
    label: 'Dash Server',
    json: false,
    timestamp: true,
  },
  file: {
    filename: './prod.log',
    level: 'error',
    json: false,
    timestamp: true,
  },
});

module.exports = winston.loggers.get(process.env.NODE_ENV || 'development');
