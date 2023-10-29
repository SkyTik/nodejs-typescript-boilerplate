import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

function makeResponse(res: Response, status: number, message: string, data: object) {
  return res.status(status).json({ status, message, data });
}

function mapServiceResult(result: { code: number; message: string }): {
  statusCode: number;
  message: string;
} {
  const statusCode: number = result.code ?? StatusCodes.OK;
  const message: string = result.message ?? ReasonPhrases.OK;
  return { statusCode, message };
}

// eslint-disable-next-line @typescript-eslint/ban-types
function wrapAsync(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next);
}

export { makeResponse, mapServiceResult, wrapAsync };
