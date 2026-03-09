import { createLogger, format, transports, addColors } from "winston"
import fs from 'fs';
import path from 'path';


const logDir = 'logs';
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const customColors = {
  error: 'red',
  warn: 'yellow',
  info: 'white',
  debug: 'cyan',
};

addColors(customColors);

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [

    new transports.File({ filename: path.join(logDir, 'all.log') }),

    new transports.File({ filename: path.join(logDir, 'info.log'), level: 'info' }),

    new transports.File({ filename: path.join(logDir, 'errors.log'), level: 'error' }),

    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
      )
    })
  ]
});

export default logger;