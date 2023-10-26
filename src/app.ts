import express, { Express, json, NextFunction, Request, Response, urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";

import connectToMongoDB from "./dbs/mongodb.js";

const app: Express = express();
app.use(helmet());
app.use(cors());
app.use(urlencoded());
app.use(json());

// connect to MongoDB
await connectToMongoDB();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("404 Not Found");
});

export default app;
