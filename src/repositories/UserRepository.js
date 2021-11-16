import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { dbNow } from "../utils/dayUtils.js";
const prisma = new PrismaClient();

export const createLocal = async (nickname, email, password) => {
  try {
    return await prisma.user.create({
      data: {
        email: email,
        password: password,
        nickname: nickname,
        createdAt: dbNow(),
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const findByEmail = async (email) => {
  try {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const findById = async (id) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const findByNickname = async (nickname) => {
  try {
    return await prisma.user.findUnique({
      where: { nickname },
    });
  } catch (err) {
    console.error(err);
  }
};
