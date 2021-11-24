import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const findById = async (id) => {
    try {
        return await prisma.profile.findUnique({
            where: { id },
        });
    } catch (err) {
        console.error(err);
    }
};

export const fineByUserId = async (userId) => {
    try {
        return await prisma.profile.findMany({
            where: {
                userId,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const createProfile = async (option) => {
    try {
        return await prisma.profile.create({
            data: option,
        });
    } catch (err) {
        console.error(err);
    }
};