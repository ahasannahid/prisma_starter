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
    const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0;
    const take = parseInt(limit) || 10;

    return await prisma.$transaction(async (tx) => {
        const result = await tx.post.findMany({
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
                        category: {
                            name: {
                                contains: searchTerm,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
            }
        });

        const total = await tx.post.count();
        return { data: result, total };
    })


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


const updatePost = async (id: number, payload: Partial<Post>): Promise<Post | number> => {
    // const result = await prisma.post.update({
    //     where: {
    //         id
    //     },
    //     data: payload
    // })

    // update post using raw query
    const result = await prisma.$executeRaw`update posts set title = ${payload.title} where id = ${id}`
    return result;
}


const deletePost = async (id: number): Promise<Post> => {
    const result = await prisma.post.delete({
        where: {
            id
        }
    })

    return result;
}


const learnAggregateAndGrouping = async () => {
    const result = await prisma.post.aggregate({
        _avg: {
            authorId: true,
            categoryId: true
        },
        _count: {
            authorId: true
        },
        _sum: {
            authorId: true
        }
    })

    // const result = await prisma.post.groupBy({
    //     by: ["title"],
    //     _count: {
    //         title: true
    //     }
    // })
    return result;
}



export const postService = {
    createPost,
    getAllPost,
    getSinglePost,
    updatePost,
    deletePost,
    learnAggregateAndGrouping
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
