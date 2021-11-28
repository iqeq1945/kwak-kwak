import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const findScrap = async (userId, postId) => {
  try {
    return await prisma.Scrap.findUnique({
      where: {
        LikeKey: {
          userId,
          postId,
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const Scrap = async (userId, postId) => {
  try {
    return await prisma.Scrap.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const UnScrap = async (userId, postId) => {
  try {
    return await prisma.scrap.deleteMany({
      where: {
        userId: userId,
        postId: postId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
