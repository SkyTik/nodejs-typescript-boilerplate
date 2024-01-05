import jwt from "jsonwebtoken";

import { JWTPayload } from "../../types/types.js";

function generateToken(
  payload: JWTPayload,
  privateKey: string,
): { accessToken: string; refreshToken: string } {
  const accessToken = jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn: "1d" });
  const refreshToken = jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn: "7d" });
  return { accessToken, refreshToken };
}

export { generateToken };
