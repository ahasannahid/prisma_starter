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
    const { sortBy, sortOrder, searchTerm, page, limit } = options;
    const skip =parseInt(limit) * parseInt(page)  - parseInt(limit)
    const take = parseInt(limit)

    const result = await prisma.post.findMany({
        skip,
        take,
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

/*pagination
* limit = 5
* page = 3
* total = 20
* take = limit
* skip = limit * page - limit
         5 * 3 -5
* 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15
*/ 
