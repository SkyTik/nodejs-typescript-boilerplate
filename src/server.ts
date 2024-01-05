import mongoose from "mongoose";

import app from "./app.js";
import prisma from "./dbs/prisma.js";
import redis from "./dbs/redis.js";
import logger from "./utils/logger.js";

const server = app.listen(8000, () => {
  logger.info("Server is running on port 8000!");
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error({ reason, promise }, "Unhandled Promise Rejection");
});

process.on("uncaughtException", (err, source) => {
  logger.error({ err, source }, "Uncaught Exception");
  process.exit(1);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  await mongoose.disconnect();
  redis.disconnect(false);
  server.close();
});
