import mongoose from "mongoose";

import logger from "../utils/logger";

const serverSelectionTimeoutMS = 5000;
let retryCount = 0;

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS
    });
    logger.info("Connected to MongoDB");

    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
  } catch (err) {
    logger.info(`Failed to connect to MongoDB: ${err}`);
    if (retryCount < 3) {
      retryCount += 1;
      logger.info(`Retrying connection (${retryCount})...`);
      await connectToMongoDB();
    } else {
      throw new Error("Failed to connect to MongoDB after multiple retries");
    }
  }
}

export default connectToMongoDB;
