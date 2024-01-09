import { createTerminus } from "@godaddy/terminus";
import mongoose from "mongoose";

import app from "./app.js";
import prisma from "./dbs/prisma.js";
import redis from "./dbs/redis.js";
import logger from "./utils/logger.js";

const server = app.listen(8000, () => {
  logger.info("Server is running on port 8000!");
});

createTerminus(server, {
  timeout: 1000,
  signals: ["SIGINT", "SIGTERM"],
  onSignal: () => {
    logger.info("server is starting cleanup");
    return Promise.all([redis.quit(), prisma.$disconnect(), mongoose.disconnect()]);
  },
  onShutdown: () => {
    logger.info("cleanup finished, server is shutting down");
    return Promise.resolve();
  },
  healthChecks: {
    "/health-check": () => Promise.resolve(),
  },
  logger: logger.info,
});

// handle uncaughtException
process.on("uncaughtException", (err) => {
  logger.error(err);
});

// handle unhandledRejection
process.on("unhandledRejection", (err) => {
  logger.error(err);
});
