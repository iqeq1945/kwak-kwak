import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const createComment = async (data) => {
    try {
        return await prisma.comment.create({
            data,
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateComment = async (data) => {
    try {
        return await prisma.comment.update({
            where: { id: data.id },
            data,
        });
    } catch (err) {
        console.error(err);
    }
};

export const deleteComment = async (id) => {
    try {
        return await prisma.comment.delete({
            where: { id },
        });
    } catch (err) {
        console.error(err);
    }
};

export const checkMyComment = async (id, authorId) => {
    try {
        return await prisma.comment.findMany({
            where: {
                id,
                authorId,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const getCommentById = async (id) => {
    try {
        return await prisma.comment.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        email: true,
                        nickname: true,
                        image: true,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};