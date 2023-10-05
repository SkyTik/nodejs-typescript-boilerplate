import app from "./app.js";
import logger from "./utils/logger.js";
app.listen(8000, () => { });
process.on("unhandledRejection", (reason, promise) => {
    logger.error({ reason, promise }, "Unhandled Promise Rejection");
});
process.on("uncaughtException", (err, source) => {
    logger.error({ err, source }, "Uncaught Exception");
    process.exit(1);
});
//# sourceMappingURL=server.js.map