import { ILogObject, Logger } from "tslog";
import { appendFileSync } from "fs";
import { join } from 'path';
import { __root } from './path';

function logToTransport(logObject: ILogObject) {
  appendFileSync(join(__root(), "logs.txt"), JSON.stringify(logObject) + "\n");
}

export const logger: Logger = new Logger();

logger.attachTransport(
  {
    silly: logToTransport,
    debug: logToTransport,
    trace: logToTransport,
    info: logToTransport,
    warn: logToTransport,
    error: logToTransport,
    fatal: logToTransport,
  },
  "debug"
);
