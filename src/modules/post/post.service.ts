import { Post, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const createPost = async(data: Post): Promise<Post> => {
    const result = await prisma.post.create({
        data,
        include: {
            author: true,
            category: true
        }
    })
    return result;
}


const getAllPost = async () => {
    const result = await prisma.post.findMany();
    return result;
}

export const postService = {
    createPost, getAllPost
}
