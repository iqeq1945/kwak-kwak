import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const findLike = async (userId, postId) => {
    try {
        return await prisma.Like.findUnique({
            where: {
                LikeKey : {
                    userId,
                    postId,
                }
            },
        });
    } catch (err) {
        console.error(err);
    }
};


export const Like = async (userId, postId) => {
    try {
        return await prisma.like.create({
            data: {
                user : {
                    connect : {
                        id : userId,
                    }
                },
                post : {
                    connect : {
                        id : postId,
                    }
                }
            },
        });
    } catch (err) {
        console.error(err);
    }
  };
  
  export const UnLike = async (userId, postId) => {
    try {
        return await prisma.like.deleteMany({
            where: {
                userId: userId,
                postId: postId,
                },
            });
        }
    catch (err) {
        console.error(err);
    }
  };