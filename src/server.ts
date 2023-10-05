import mongoose from "mongoose";
import app from "./app.js";
import logger from "./utils/logger.js";
import redis from "./dbs/redis.js";

const server = app.listen(8000, () => {});

process.on("unhandledRejection", (reason, promise) => {
  logger.error({ reason, promise }, "Unhandled Promise Rejection");
});

process.on("uncaughtException", (err, source) => {
  logger.error({ err, source }, "Uncaught Exception");
  process.exit(1);
});

process.on("SIGTERM", async () => {
  await mongoose.disconnect();
  redis.disconnect(false);
  server.close();
});
