import pino from "pino";
const logger = pino.pino({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true
        }
    }
});
export default logger;
//# sourceMappingURL=logger.js.map