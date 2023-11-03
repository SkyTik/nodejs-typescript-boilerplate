import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import crypto from "crypto";
import { findUser, insertUser, updateUser } from "./repository.js";
import CustomError from "../../utils/error.js";
import { generateToken } from "../auth/utils.js";

async function userSignUp(email: string, username: string, password: string): Promise<User> {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  const user: User = await insertUser({ email, username, password: hashedPassword });
  return user;
}

async function userLogin(email: string, password: string) {
  const user: User | null = await findUser(email);
  if (!user) {
    throw new CustomError(StatusCodes.NOT_FOUND, "User not found!");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid password!");
  }

  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem"
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem"
    }
  });

  const { accessToken, refreshToken } = generateToken({ email, name: user.username }, privateKey);
  await updateUser(user.id, { refreshToken, publicKey });
  return { accessToken };
}

export { userSignUp, userLogin };
