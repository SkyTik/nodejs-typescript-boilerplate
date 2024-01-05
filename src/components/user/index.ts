import { Router } from "express";

import { wrapAsync } from "../../utils/utils.js";
import { login, signup } from "./controller.js";
import { validateUserSignUp } from "./validation.js";

const router = Router();

router.post("/sign-up", validateUserSignUp, wrapAsync(signup));
router.post("/login", wrapAsync(login));

export default router;
