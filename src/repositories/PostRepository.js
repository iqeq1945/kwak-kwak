import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const findById = async (id) => {
  try {
    return prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        like: true,
        scrap: true,
        comment: {
          include: {
            author: {
              include: {
                profile: true,
              },
            },
          },
        },
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

export const GetPostList = async (keyword, category) => {
  try {
    console.log(keyword, category);
    const whereQuery = {
      AND: [
        {
          category: {
            equals: category,
          },
        },
        {
          title: {
            contains: keyword,
          },
        },
      ],
    };
    const query = {
      where: whereQuery,
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
      include: {
        author: true,
        like: true,
        scrap: true,
        comment: true,
      },
    };
    const posts = await prisma.post.findMany(query);
    const totalCount = await prisma.post.count({
      where: whereQuery,
    });
    return {
      posts,
      totalCount,
      query: { keyword, category },
    };
  } catch (err) {
    console.error(err);
  }
};
