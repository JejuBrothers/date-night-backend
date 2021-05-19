import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export function createCustomLogger() {
  return WinstonModule.createLogger({
    level: 'info',
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.simple(),
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
          winston.format.colorize({ all: true }),
          winston.format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`,
          ),
        ),
      }),
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
      }),
      new winston.transports.File({ filename: 'logs/all.log' }),
    ],
  });
}
