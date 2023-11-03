import { Router } from "express";
import userRoute from "./components/user/index.js";

const router = Router();

router.use("/user", userRoute);

export default router;
