import { Post, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const createPost = async (data: Post): Promise<Post> => {
    const result = await prisma.post.create({
        data,
        include: {
            author: true,
            category: true
        }
    })
    return result;
}


const getAllPost = async (options: any) => {
    const { sortBy, sortOrder, searchTerm } = options;
    const result = await prisma.post.findMany({
        include: {
            author: true,
            category: true
        },
        orderBy: sortBy && sortOrder ? {
            // createdAt: 'desc'
            [sortBy]: sortOrder
        } : { createdAt: 'desc' },
        where: {
            // title: {
            //     contains: searchTerm,
            //     mode: 'insensitive'
            // }
            OR: [
                {
                    title: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                },
                {
                    author: {
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    }
                },
                {
                    category:{
                        name:{
                            contains:searchTerm,
                            mode: 'insensitive'
                        }
                    }
                }                        
            ]
        }
    });
    return result;
}

const getSinglePost = async (id: number) => {
    const result = await prisma.post.findUnique({
        where: {
            id
        },
        include: {
            author: true,
            category: true
        }
    });
    return result;
}

export const postService = {
    createPost,
    getAllPost,
    getSinglePost
}
