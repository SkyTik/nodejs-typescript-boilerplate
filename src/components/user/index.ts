import { Router } from "express";
import { wrapAsync } from "../../utils/utils.js";
import { login, signup } from "./controller.js";

const router = Router();

router.post("/sign-up", wrapAsync(signup));
router.post("/login", wrapAsync(login));

export default router;
