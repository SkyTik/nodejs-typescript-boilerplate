import { User, Prisma } from "@prisma/client";
import prisma from "../../dbs/prisma.js";
// import userModel, { User } from "./model.js";

async function insertUser(data: Prisma.UserCreateInput): Promise<User> {
  // const user: User = (await userModel.create({ email, username, password })).toObject();
  return prisma.user.create({ data });
}

async function findUser(email: string): Promise<User | null> {
  return prisma.user.findFirst({ where: { email } });
}

async function updateUser(id: number, data: Prisma.UserUpdateInput) {
  return prisma.user.update({ where: { id }, data });
}

export { insertUser, findUser, updateUser };
