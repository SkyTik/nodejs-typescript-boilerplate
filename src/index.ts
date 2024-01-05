import { Router } from "express";

import userRoute from "./components/user/index";

const router = Router();

router.use("/user", userRoute);

export default router;
