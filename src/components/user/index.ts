import { Router } from "express";

import { wrapAsync } from "../../utils/utils";
import { login, signup } from "./controller";
import { validateUserSignUp } from "./validation";

const router = Router();

router.post("/sign-up", validateUserSignUp, wrapAsync(signup));
router.post("/login", wrapAsync(login));

export default router;
