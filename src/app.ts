import express, { Express, json, NextFunction, Request, Response, urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";

import { parse } from "url";
import connectToMongoDB from "./dbs/mongodb.js";
import prisma from "./dbs/prisma.js";
import router from "./index.js";
import logger from "./utils/logger.js";

const app: Express = express();
app.use(helmet());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

// connect to MongoDB
await connectToMongoDB();
await prisma.$connect();
app.use((req: Request, res: Response, next: NextFunction) => {
  const { pathname, query } = parse(req.url, true);
  const logData = {
    remote_ip: req.ip,
    host: req.hostname,
    method: req.method,
    user_agent: req.headers["user-agent"],
    uri: pathname,
    query,
    body: req.body,
    status: 200
  };

  const originalSend = res.send;
  res.send = ((body: never) => {
    logData.status = res.statusCode;
    logger.info(logData);
    originalSend.call(this, body);
  }) as never;

  next();
});

app.use(router);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("404 Not Found");
});

export default app;
