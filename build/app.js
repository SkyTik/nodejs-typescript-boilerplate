import express, { json, urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import connectToMongoDB from "./dbs/mongodb.js";
const app = express();
app.use(helmet());
app.use(cors());
app.use(urlencoded());
app.use(json());
// connect to MongoDB
await connectToMongoDB();
export default app;
//# sourceMappingURL=app.js.map