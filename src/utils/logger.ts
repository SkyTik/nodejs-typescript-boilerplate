import pino, { Logger } from "pino";

const config = {
  base: undefined,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
};

const logger: Logger = process.env.NODE_ENV === "development" ? pino(config) : pino({ base: undefined });

export default logger;
