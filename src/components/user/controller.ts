import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { makeResponse } from "../../utils/utils.js";
import { userLogin, userSignUp } from "./service.js";

async function signup(req: Request, res: Response) {
  const { email, username, password } = req.body;
  const result = await userSignUp(email, username, password);
  makeResponse(res, StatusCodes.OK, ReasonPhrases.OK, result);
}
async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await userLogin(email, password);
  makeResponse(res, StatusCodes.OK, ReasonPhrases.OK, result);
}

export { login, signup };
