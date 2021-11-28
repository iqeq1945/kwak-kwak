import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const findById = async (id) => {
    try {
        return prisma.post.findUnique({
            where: { id },
            include: {
                author: true,
                like: true,
                scrap: true,
                comment :true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const createPost = async (data) => {
    try {
        return await prisma.post.create({
            data,
        });
    } catch (err) {
        console.error(err);
    }
};

export const updatePost = async (id, data) => {
    try {
        return await prisma.post.update({
            where: { id },
            data,
        });
    } catch (err) {
        console.error(err);
    }
};

export const deletePost = async (id) => {
    try {
        return await prisma.post.delete({
            where: { id },
        });
    } catch (err) {
        console.error(err);
    }
};

export const checkMyPost = async (id, authorId) => {
    try {
        return await prisma.post.findMany({
            where: {
                id,
                authorId,
            },
        });
    } catch (err) {
        console.error(err);
    }
};