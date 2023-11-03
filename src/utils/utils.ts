import { Types } from "mongoose";
import { NextFunction, Request, Response } from "express";

function makeResponse(res: Response, status: number, message: string, data?: object) {
  return res.status(status).json({ status, message, data });
}

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;
function wrapAsync(fn: AsyncFunction) {
  return (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next);
}

function newObjectId(value: string) {
  return new Types.ObjectId(value);
}

export { makeResponse, wrapAsync, newObjectId };
