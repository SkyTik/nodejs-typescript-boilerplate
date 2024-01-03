import { Prisma, User } from "@prisma/client";

import prisma from "../../dbs/prisma";

// import userModel, { User } from "./model";

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

export { findUser, insertUser, updateUser };
