import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { makeResponse } from "../../utils/utils.js";

const userSignupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(25).required()
});

function validateUserSignUp(req: Request, res: Response, next: NextFunction) {
  const { error } = userSignupSchema.validate(req.body);

  if (error) {
    return makeResponse(res, StatusCodes.BAD_REQUEST, error.details[0].message);
  }

  return next();
}

export { validateUserSignUp };
