import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = (labelFormat: string) =>
  createLogger({
    format: combine(
      label({ label: labelFormat }),
      format.json(),
      format.colorize(),
      timestamp(),
      myFormat,
    ),
    transports: [new transports.Console()],
  });
