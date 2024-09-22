import log4js from 'log4js';

log4js.configure({
  appenders: {
    out: { type: 'console' },
    file: { type: 'file', filename: 'logs/application.log' },
  },
  categories: {
    default: { appenders: ['out'], level: 'info' },
    file: { appenders: ['file'], level: 'info' },
  },
});

const logger = log4js.getLogger();
logger.level = 'info';

export default logger;
